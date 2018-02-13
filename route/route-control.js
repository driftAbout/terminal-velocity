'use strict';

const bodyParser = require('body-parser').json();
const debug = require('debug')('http:route-control');

debug('route-control');

module.exports = function(router){

  router.route('/play/:type/:_id?')

    .get(bodyParser, (req,res) => {
      res.status(200).json(req.params);
    });
};