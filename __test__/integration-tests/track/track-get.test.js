'use strict';

const path = require('path');
require('dotenv').config({path: path.resolve(process.cwd(), '__test__/.test.env')});
const PORT = process.env.PORT;
const superagent = require('superagent');
const faker = require('faker');
const mock = require('../../lib/mock');
const server = require('../../../lib/server');


describe('GET /api/v1/play/track/:name?', () => { 
  
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
        return superagent.get(`:${PORT}/api/v1/play/track/${this.mockTrack.name}`)
          .then(res =>
            expect(res.status).toBe(200)
          );
      });

    test(
      'should return a file path for a requested track',
      () => {
        return superagent.get(`:${PORT}/api/v1/play/track/${this.mockTrack.name}`)
          .then(res =>
            expect(res.body.path).toEqual(this.mockTrack.path)
          );
      });

  });

  describe('Invalid request', () => {

    test(
      'should throw an error 404 if passing track name does not exist',
      () => {
        return superagent.get(`:${PORT}/api/v1/play/track/nonexisting`)
          .catch(err => 
            expect(err.status).tobe(404);
            expect(err.message).toEqual('Item Not Found');
          );
      });

  });

});
