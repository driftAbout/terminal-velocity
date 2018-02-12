'use strict';

const bodyParser = require('body-parser').json();
const errorHandler = require('../lib/error-handler');
const Track = require('../model/track');


module.exports = router => {

  router.route('/play/:_id?')

    .get(bodyParser, (req, res) => {
      // fetch one track
      if(req.params._id){
        return Track.findById(req.params._id)
          .then(track => res.status(200).json(track))
          .catch(err => errorHandler(err, res));
      }

      // fetch all tracks
      /*      return Track.find()
        .then(tracks => {
          let tracksIds = tracks.map(track => track._id);

          res.status(200).json(tracksIds);
        })
        .catch(err => errorHandler(err, res));
*/    });

};
