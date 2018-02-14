'use strict';

const bodyParser = require('body-parser').json();
const errorHandler = require('../lib/error-handler');
const collection = require('../lib/collection');

module.exports = function(router) {
  router.post('/import', bodyParser, (req, res) => {
    //use collection setup to generate tree
    //save all artist schemas to db
    //save all album schemas to db
    //save all track schemas to db
  });
};