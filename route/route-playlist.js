'use strict';

const bodyParser = require('body-parser').json();
const errorHandler = require('../lib/error-handler');
const Track = require('../model/track');
const Playlist = require('../model/playlist');


module.exports = router => {

  router.route('/play/playlist/:name?')

    .get(bodyParser, (req, res) => {
      if(req.body.name){
        return Playlist.findOne({ 'name': `${req.body.name}` }, 'tracks', (err, tracks))
          if(err){
            return errorHandler(err, res);
          }
          res.status(200).json(tracks);
      }
    });

};
