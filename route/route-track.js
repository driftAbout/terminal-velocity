'use strict';

const Track = require('');
const bodyParser = require('body-parser').json();
const errorHandler = require('../lib/error-handler');
const debug = require('debug')('');

module.exports = function (router) {

  router.route('/play/:name');
  debug('track')
    .get((req, res) => {
      if (req.params.name) {
        return Track.findById(req.params.name)
          .then(track => res.status(200).load)
          .catch(err => errorHandler(err, res));
      }
      //   return Track.find()
      //     .then(track => track.map(track => track.name))
      //     .then(track => res.status(200).load)
      //     .catch(err => errorHandler(err, res));
      // });

    //   play.play = pause.play = play;
    //   play.pause = pause.pause = pause;
    //   play.repeat = play.goback = repeat;

    //   let isPlaying = false;

    //   return how.autoplay != false ? play() : play;

    //   function play() {
    //     if (isPlaying) return;

    //     isPlaying = true;

    //     function repeat() {
    //       if (err) {
    //         return cb(err);
    //       }
    //       if (!isPlaying) return;
            
    //       return pause;

    //       function pause() {
    //         if (!isPlaying) return;
    //         isPlaying = false;
    //         cb();
        
    //         return play;
    //       }
    //     }
    //   }
    });
};