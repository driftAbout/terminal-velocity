'use strict';

const Track = require('../model/track');
const bodyParser = require('body-parser').json();
const errorHandler = require('../lib/error-handler');
const debug = require('debug')('http:route-play');

var mpg = require('mpg123');

module.exports = function (router) {

/*  router.route('api/v1/play/artist/:name?')       // artist

    .get(bodyParser, (req, res) => {
      if(Artist.find({artist} === request)) {
        return Artist.find() 
          .then(artist => artist.map(artist => artist.name))
          .then(artist => res.status(200).artist)
          .catch(err => errorHandler(err, res));
      }
    })

  router.route('api/v1/play/album/:title?')          //album
    .get((req, res) => {
      let album = {title: value};
      if(Album.find(album) === request) {
        return Album.find()
          .then(album => album.map(album => album.name))
          .then(album => res.status(200).album)
          .catch(err => errorHandler(err, res));
      }
    })
*/
  router.route('/play/track/:title?')   // track
    .get(bodyParser, (req, res) => {
      if(req.params.title){
        return Track.findOne()
          .then(track => res.status(200).json(track))
          .catch(err => errorHandler(err, res));
      }
    })
/*
  router.route('api/v1/play/:type/:_id?')      // id
    .get((req, res) => {
      let request = '';
      if(request.match(/^[0-9a-fA-F]{24}$/)) { 
        return Track.findById(req.params._id)
          .then(track => res.status(200).json(track))
          .catch(err => errorHandler(err, res));
      }
    })*/
}
