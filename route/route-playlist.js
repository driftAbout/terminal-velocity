'use strict';

const bodyParser = require('body-parser').json();
const errorHandler = require('../lib/error-handler');
const Playlist = require('../model/playlist');
const debug = require('debug')('http:route-playlist');
const multer = require('multer');
const tempDir = `${__dirname}/../temp`;
const upload = multer({dest:  `${tempDir}`});

debug('route-playlist');

module.exports = router => {

  router.route('/playlist/:name?')

    .get(bodyParser, (req, res) => {
      if(req.params.name) {
        return Playlist.findOne({ name: `${req.params.name}` })
          .then(playlist => {
            if(!playlist) return Promise.reject(new Error('Item Not Found'));
            res.status(200).json(playlist.playlist_objects);
          })
          .catch(err =>errorHandler(err, res));
      }
    })

    .post(bodyParser, upload.single('playlist'), (req, res) =>{
      if(!req.file) return errorHandler(new Error('Multi-part form error: missing file'), res);
      if (!req.body) return errorHandler(new Error('Bad request'), res);
      return  Playlist.parse_playlist(req)
        .then(playlist => {
          new Playlist(playlist).save();
        })
        .then(playlist => res.status(201).json(playlist))
        .catch(err => errorHandler(err, res));
    });

};