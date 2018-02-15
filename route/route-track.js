'use strict';

const bodyParser = require('body-parser').json();
const errorHandler = require('../lib/error-handler');
const Track = require('../model/track');
const Playlist = require('../model/playlist');
const debug = require('debug')('http:route-track');
//const multer = require('multer');
//const tempDir = `${__dirname}/../temp`;
//const upload = multer({dest:  `${tempDir}`});

debug('route-track');

module.exports = router => {

  router.route('/play/track/:artist?/:album?/:title?')
/*.get((req, res) => {
 12       return Track.find({artist_name: req.param.artist})
 13         .then(tracks => {
 14           if (!tracks) return Promise.reject(new Error('Error: ENOENT:  Not Found'));
 15           res.status(200).json(tracks);
 16         })
 17         .catch(err => errorHandler(err, res));
 18     });
*/    .get(bodyParser, (req, res) => {
      if(req.params.artist && req.params.album && req.params.title) {
        return Track.findOne({
          artist_name: `${req.params.artist}`, 
          album_title: `${req.params.album}`,
          title: `${req.params.title}`,
        })
          .exec(function(err, track) {
            if(err) {
              return errorHandler(new Error('ENOENT: Item not found'), res);
            }
            res.status(200).json(track);
          });
      }else{
        return errorHandler(new Error('Bad request'), res);
      }
    });

};

