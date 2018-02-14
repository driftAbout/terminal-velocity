const bodyParser = require('body-parser').json();
const errorHandler = require('../lib/error-handler');
const Track = require('../model/track');
const Artist = require('../model/playlist');
const Album = require('../model/album');
const fs = require('fs');
const debug = require('debug')('http:route-playlist');
const multer = require('multer');
const tempDir = `${__dirname}/../temp`;
const upload = multer({dest:  `${tempDir}`});


module.exports  = function(router) {

  debug('import-post-route');

  router.route('/import')
    .post(bodyParser, upload.single('import'), (req, res) => {
      console.log(req.body);
      //if (!req.file) return errorHandler(new Error('Multi-part form data error: Missing file'), res);
      if (!req.body.import && !req.body) return errorHandler(new Error('Bad request'), res);
      
      //let import_data = req.body.import;
      if (req.file) {
        fs.readFile(req.file.path, 'utf8', (err, data) => {
          if (err) errorHandler(err, res);
          return importData(JSON.parse(data));
        });
        return;
      }

      let body_import = req.body.import;

      console.log(body_import);
      if ( typeof body_import  === 'string'){
        let music_path = body_import.split(/music/i);
        let [artist, album ] =  music_path[1].match(/[^/]+/g); 
        body_import = { 
          tracks: [{path: body_import, album_title: album, artist_name: artist}],
        };
        importData(body_import);
      }
      
    
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


