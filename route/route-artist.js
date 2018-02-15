'use strict';

const bodyParser = require('body-parser').json();
const errorHandler = require('../lib/error-handler');
const Track = require('../model/track');


module.exports = router => {

  router.route('/play/artist/:artist')

    .get(bodyParser, (req, res) => {
      return Track.find({artist_name: req.params.artist})
        .then(tracks => {
          if (!tracks) return Promise.reject(new Error('Error: ENOENT:  Not Found'));
          res.status(200).json(tracks);
        })
        .catch(err => errorHandler(err, res));
    });
};