'use strict';

const bodyParser = require('body-parser').json();
const errorHandler = require('../lib/error-handler');
const Track = require('../model/track');
const Playlist = require('../model/playlist');


module.exports = router => {

  router.route('/play/playlist/:name?')

    .get(bodyParser, (req, res) => {
      if(req.params.name) {
        return Playlist.findOne({ name: `${req.params.name}` })
          .populate('tracks')
          .exec(function(err, playlist) {
            if(err) {console.log(err);
              return errorHandler(new Error('Item Not Found'), res);
            }console.log(playlist);
            res.status(200).json(playlist);
          });
      }
    });

}
