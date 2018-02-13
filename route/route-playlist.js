'use strict';

const bodyParser = require('body-parser').json();
const errorHandler = require('../lib/error-handler');
const Track = require('../model/track');
const Playlist = require('../model/playlist');


module.exports = router => {

  router.route('/play/playlist/:name?')

    .get(bodyParser, (req, res) => {
      if(req.params.name) {
        let query = Playlist.findOne({ 'name': `${req.params.name}` });
        query.select('tracks');
        query.exec(function(err, playlist) {
          if(err) {
            return errorHandler(new Error('Item Not Found'), res);
          }
          res.status(200).json(playlist.tracks);
        });
      }
    });

}
