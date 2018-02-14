'use strict';

const bodyParser = require('body-parser').json();
const errorHandler = require('../lib/error-handler');

module.exports = function(router) {
  router.post('/import', bodyParser, (req, res) => {
    //use collection setup to generate tree
    //
  });
};