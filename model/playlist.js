'use strict';

const Track = require('./track');
const Artist = require('./artist');
const Album = require('./album');
const mongoose = require('mongoose');
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});
const debug = require('debug')('http:playlist-model');

let tempArray = [];

const Playlist = mongoose.Schema({
  name: {type: String, required: true},
  playlist_objects: [{type: Object}],
},
{timestamps: true}
);


Playlist.statics.parse_playlist = (req) => {
  return new Promise((resolve, reject) => { 
    if (!req.file.path) return new Error('Error: File Not Found');
    return fs.readFileProm(req.file.path, 'utf8')
      .then(data => parseText(data))
      .then(tracks => {
         // debug('tracks', tracks)
        return resolve({name: req.body.name, playlist_objects: tracks});
        });
      });
};


function parseText(text) {
  let lines = text.split('\n');
  
  // for(let line of lines ){
  let queries = lines.map(line => {
    let music_path = line.split('music');
    let [artist, album, track ] =  music_path[1].match(/[^/]+/g); 
    // debug('artist:', artist, ', album:', album, ', track:', track);
    let track_query = {artist_name: artist};
    if (artist && album ) track_query = {album_title: album, artist_name: artist};
    if (artist && album && track) track_query = {path: line};
    return track_query;
    //return searchTracks(track_query);
  });
  return Promise.all(queries.map(query => Track.find(query)))
    .then(tracks => {
      return tracks;
    });
} 




// function searchTracks(query){
//   //debug('query', query);
//   return Track.find(query)
//     .then(tracks => {
//       //debug('tracks:', tracks);
//       if (tracks.length) tempArray.concat(tracks);
//     })
//     .catch(err => err);
// }

module.exports = mongoose.model('playlist',  Playlist); 

// function parseText(text) {
//   let lines = text.split('\n');
//   let line = lines[0];
//   let i = lines.length;
//   let j = 0;
//     parseLine(lines[0])


  // lines.forEach(line => {
  //   let music_path = line.split('music');
  //   let [artist, album, track ] =  music_path[1].match(/[^/]+/g); 
  //   // debug('artist:', artist, ', album:', album, ', track:', track);
  //   let track_query = {artist_name: artist};
  //   if (artist && album ) track_query = {album_title: album, artist_name: artist};
  //   if (artist && album && track) track_query = {path: line};
    
  //   searchTracks(track_query);
    //Promise.all([searchTracks(track_query)]);

    // Track.find(track_query)
    //   .then(tracks => {
    //     //debug('tracks:', tracks);
    //     if (tracks.length) tempArray.concat(tracks);
    //   })
    //   .catch(err => err);
//   });
// });
//     //.then(() => tempArray);
//   //return tempArray;
//   //return resolve({name: req.body.name , playlist_objects:  tempArray});
// }



  // function parseLine(path) {
  //   if (j > i) return tempArray; 
  //   let music_path = path.split('music');
  //   let [artist, album, track ] =  music_path[1].match(/[^/]+/g); 
  //   // debug('artist:', artist, ', album:', album, ', track:', track);
  //   let track_query = {artist_name: artist};
  //   if (artist && album ) track_query = {album_title: album, artist_name: artist};
  //   if (artist && album && track) track_query = {path: path};
    
  //   searchTracks(track_query);
  // }

  // function searchTracks(query){
  //   //debug('query', query);
  //   return Track.find(query)
  //     .then(tracks => {
  //       //debug('tracks:', tracks);
  //       if (tracks.length) tempArray.concat(tracks);
  //     })
  //     .catch(err => err);
  // }



// function searchTracks(path){
//   Track.findOne({path: path})
//     .populate({
//       path: 'album_id',
//       model: 'album',
//       populate: {
//         path: 'artist_id',
//         model: 'artist',
//       },
//     })
//     .then(track => {
//       if(!track) return;
//       tempArray.push({
//         title: track.title,
//         path: path,
//         album_title: track.album_id.album.title,
//         artist_name: track.album_id.album.artist_id.artist.name,
//       });
//       return;     
//     })
//     .catch(err => err);
// }

// function searchArist(name) {

//   Artist.findOne({name: name})
//     .populate({
//       path: 'album_ids',
//       model: 'album',
//       populate: {
//         path: 'track_ids',
//         model: 'tracks',
//       },
//     })
//     .then(artist => {
//       if (!artist) return;
//       artist.album_ids.forEach(album => {
//         album.track_ids.forEach(track => {
//           tempArray.push({
//             title: track.title,
//             path: track.path,
//             album_title: album.title,
//             artist_name: artist.name,
//           });    
//         });
//       });
//       return true;
//     })
//     .catch(err => err);
// }

// function searchAlbum(title, artist_name) {
//   Album.findOne({title: title, artist_name: artist_name})
//     .populate('track_ids')
//     .then(album => {
//       return album.track_ids.forEach(track_id => {
//         tempArray.push({
//           title: track_id.track.title,
//           path: track_id.track.path,
//           album_title: album.title,
//           artist_name: album.artist_name,
//         });    
//       });
//     })
//     .catch(err => err);
// }



