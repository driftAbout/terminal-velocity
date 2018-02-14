'use strict';

const errorHandler = require('../lib/error-handler');
const Track = require('../model/track');


module.exports = router => {

  router.route('/play/artist/:artist')

    .get((req, res) => {
      return Track.find({artist_name: req.param.artist})
        .then(tracks => {
          if (!tracks) return Promise.reject(new Error('Error: ENOENT:  Not Found'));
          res.status(200).json(tracks);
        })
        .catch(err => errorHandler(err, res));
    });
};