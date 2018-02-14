'use strict';

const Track = require('./track');
const mongoose = require('mongoose');
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});
const del = require('del');
const debug = require('debug')('http:playlist-model');

const tempDir = `${__dirname}/../temp`;

debug('playlist model');

const Playlist = mongoose.Schema({
  name: {type: String, required: true},
  playlist_objects: [{type: Array}],
},
{timestamps: true}
);


Playlist.statics.parse_playlist = (req) => {
  return new Promise((resolve, reject) => { 
    if (!req.file.path) return reject(new Error('Error: File Not Found'));
    return fs.readFileProm(req.file.path, 'utf8')
      .then(data => parseText(data))
      .then(tracks => {
        del(`${tempDir}/${req.file.filename}`);
        tracks = tracks.reduce((pl, tracks) => pl.concat(tracks), []);
        return resolve({name: req.body.name, playlist_objects: tracks});
      });
  });
};


function parseText(text) {
  let lines = text.split('\n');

  let queries = lines.map(line => {
    let music_path = line.split('music');
    let [artist, album, track ] =  music_path[1].match(/[^/]+/g); 
    let track_query = {artist_name: artist};
    if (artist && album ) track_query = {album_title: album, artist_name: artist};
    if (artist && album && track) track_query = {path: line};
    return track_query;
  });
  return Promise.all(queries.map(query => Track.find(query)))
    .then(tracks => {
      return tracks;
    });
} 

module.exports = mongoose.model('playlist',  Playlist); 


