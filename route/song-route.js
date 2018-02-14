'use strict';

const Track = require('../model/track');
const Artist = require('../model/artist');
const Album = require('../model/album');
const Playlist = require('../model/playlist');
const bodyParser = require('body-parser').json();
const errorHandler = require('../lib/error-handler');
const debug = require('debug')('');
var mpg = require('mpg123');


module.exports = function (router) {

  router.route('api/v1/play/artist/')       // artist
    .get((req, res) => {
      debug('artist');
      let request = '';
      if(Artist.find({name: value}) === request) {
        return Artist.find() 
          .then(artist => artist.map(artist => artist.name))
          .then(artist => res.status(200).artist)
          .catch(err => errorHandler(err, res));
      }
    });
  router.route('api/v1/play/album/')          //album
    .get((req, res) => {
      debug('album');
      let request = '';
      if(Album.find({title: value}) === request) {
        return Album.find()
          .then(album => album.map(album => album.name))
          .then(album => res.status(200).album)
          .catch(err => errorHandler(err, res));
      }

      //   router.route('api/v1/play/playlist/')      //playlist
      //   .get((req, res) => {
      //   debug('playlist')
  
      //         if(...) {

      //       }
    });
  router.route('api/v1/play/track')   // track
    .get((req, res) => {
      debug('track');
      let songPath = './music/1.mp3';
      let songName = songPath.split('/').pop();
      let request = '';
    
      if(request === songName) { 
        return Track.findById(req.params._id)
          .then(track => res.status(200).json(track))
          .catch(err => errorHandler(err, res));
        // callback(track, err);         
      }
    });
  router.route('api/v1/play/:type/:_id?')      // id
    .get((req, res) => {
      debug('id');
      let request = '';
    
      if(request.match(/^[0-9a-fA-F]{24}$/)) { 
        return Track.findById(req.params._id)
          .then(track => res.status(200).json(track))
          .catch(err => errorHandler(err, res));
        // callback(track, err);         
      }
    });
};