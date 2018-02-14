'use strict';

const server = require('../../lib/server');
const mock = requiere('../lib/mock');
const debug = require('debug')('http:album-get-test');
const superagent = require('superagent');


describe('Album get route testing', () => {

  beforeAll(server.start);
  afterAll(server.stop);

});
