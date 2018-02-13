'use strict';

const path = require('path');
require('dotenv').config({path: path.resolve(process.cwd(), '__test__/.test.env')});
const PORT = process.env.PORT;
const superagent = require('superagent');
const faker = require('faker');
const mock = require('../../lib/mock');
const server = require('../../../lib/server');


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
            expect(res.status).toBe(200)
          );
      });

    test(
      'should return a file path for a requested track',
      () => {
      });

  });

  describe('Invalid request', () => {

    test(
      'should throw an error 404 if passing id does not exist',
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

});
