'use strict';

const Track = require('../model/track');
const errorHandler = require('../lib/error-handler');
const debug = require('debug')('http:route-play');

debug('Album route');

module.exports = function (router) {

  router.route('/play/album/:artist/:album')
    .get((req, res) => {
      let {artist, album} = req.params; 
      Track.find({artist_name: artist, album_title: album})
        .then(tracks => {
          if (!tracks.length) return Promise.reject(new Error('Error ENOENT: Requested resource not found'));
          res.status(200).json(tracks);
        })
        .catch(err => errorHandler(err, res));
    });  
};
