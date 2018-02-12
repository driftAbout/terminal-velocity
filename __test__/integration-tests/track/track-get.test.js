'use strict';

const path = require('path');
require('dotenv').config({path: path.resolve(process.cwd(), '__test__/.test.env')});
const server = require('../../lib/server');
const superagent = require('superagent');
const PORT = process.env.PORT;
const mock = require('../lib/mock');


describe('GET /api/v1/play/:_id', () => { 
  
  beforeAll(() => server.start(PORT, () => console.log(`Listening on ${PORT}`)));
  afterAll(() => server.stop());
  afterAll(() => mock.track.removeAll());
  
  
  describe('Valid request', () => {

    beforeAll(() => {
      return mock.track.createOne()
        .then(track => this.mockTrack = track);
    });

    test(
      'should respond with http res status 200',
      () => {
        return superagent.get(`:${PORT}/api/v1/play/${this.mockTrack._id}`)
          .then(res => 
            expect(res.status).toBe(200);
          );
      });

  });

  describe('Invalid request', () => {

    test(
      '',
      () => {
      });

    test(
      '',
      () => {
      });

    test(
      '',
      () => {
      });
  });

  describe('Invalid route', () => {

    test(
      '',
      () => {
      });
  });

});
