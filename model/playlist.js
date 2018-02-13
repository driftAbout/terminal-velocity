'use strict';

const fs = require('fs');
const Track = require('./track');
const Artist = require('./track');
const Album = require('./track');
const mongoose = require('mongoose');

const tempArray = [];

const Playlist = mongoose.Schema({
  name: {type: String, required: true},
  playlist_objects: [{type: Object}],
},
{timestamps: true}
);

module.exports = mongoose.model('playlist',  Playlist);

Playlist.statics.parse_playlist = (req) => {
  if (!req.filepath) return new Error('Error: File Not Found');

  fs.readFile(req.filepath, 'utf8', (err, data) => {
    parseText(data);
  });

};

function parseText(text) {
  let lines = text.split('\n');
  lines.map(line => {
    let itemName = line.match(/[^/]+$/g)[0];
    if (itemName.split('.') > 1){
      searchTracks(line);
      return;
    }

    let artistTracks = searchArist(itemName);
    if (artistTracks) return;

    return searchAlbum(itemName);

  });
}

function searchTracks(path){
  Track.findOne({path: path})
    .populate({
      path: 'album_id',
      model: 'album',
      populate: {
        path: 'artist_id',
        model: 'artist',
      },
    })
    .then(track => {
      if(!track) return;
      tempArray.push({
        title: track.title,
        path: path,
        album_title: track.album_id.album.title,
        artist_name: track.album_id.album.artist_id.artist.name,
      });
      return;     
    })
    .catch(err => err);
}

function searchArist(name) {

  Artist.findOne({name: name})
    .populate({
      path: 'album_ids',
      model: 'album',
      populate: {
        path: 'track_ids',
        model: 'tracks',
      },
    })
    .then(artist => {
      if (!artist) return;
      artist.album_ids.forEach(album_id => {
        album_id.track_ids.forEach(track_id => {
          tempArray.push({
            title: track_id.track.title,
            path: track_id.track.path,
            album_title: album_id.album.title,
            artist_name: artist.name,
          });    
        });
      });
      return true;
    })
    .catch(err => err);
}

function searchAlbum(title) {
  Album.findOne({title: title})
    .populate('track_ids')
    .then(album => {
      return album.track_ids.forEach(track_id => {
        tempArray.push({
          title: track_id.track.title,
          path: track_id.track.path,
          album_title: album.title,
          artist_name: album.artist_name,
        });    
      });
    })
    .catch(err => err);
}