'use strict';

const bodyParser = require('body-parser').json();
const errorHandler = require('../lib/error-handler');
const Track = require('../model/track');
const Artist = require('../model/artist');
const Album = require('../model/album');
const fs = require('fs');
const del = require('del');
const debug = require('debug')('http:route-playlist');
const multer = require('multer');
const tempDir = `${__dirname}/../temp`;
const upload = multer({dest:  `${tempDir}`});

module.exports  = function(router) {

  debug('import-post-route');

  router.route('/import')
    .post(bodyParser, upload.single('import'), (req, res) => {
      if (req.file) {
        fs.readFile(req.file.path, 'utf8', (err, data) => {
          if (err) return errorHandler(err, res);
          del(`${tempDir}/${req.file.filename}`);
          return importData(JSON.parse(data));
        });
        return;
      }
      
      let body_import = req.body.import;
      if ( body_import.toLowerCase().includes('music')){
        let music_path = body_import.split(/music/i);
        let [artist, album ] =  music_path[1].match(/[^/]+/g); 
        body_import = { 
          tracks: [{path: body_import, album_title: album, artist_name: artist}],
        };
        importData(body_import);
        return;
      }

      return errorHandler(new Error('Bad request'), res);
    
      function importData(import_data) {
        Promise.all([
          Artist.create(import_data.artists),
          Album.create(import_data.albums),
          Track.create(import_data.tracks),
        ])
          .then(() => res.status(201).send('Import complete'))
          .catch(err => errorHandler(err, res));
      }
    });

};


