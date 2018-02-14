'use strict';

const path = require('path');
require('dotenv').config({path: path.resolve(process.cwd(), '__test__/.test.env')});
const server = require('../../../lib/server');
const superagent = require('superagent');
const PORT = process.env.PORT;
const mock = require('../../lib/mock');
const faker = require('faker');


describe('GET /api/v1/play/artist/:name', () => { 
  
  beforeAll(() => server.start(PORT, () => console.log(`Listening on ${PORT}`)));
  afterAll(() => server.stop());
  afterAll(() => mock.track.removeAll());
  afterAll(() => mock.artist.removeAll());
  
  
  describe('Valid request', () => {

    beforeAll(() => {
      return mock.artist.createOne()
        .then(artist => {
          this.trackOne = artist.trackOne;
          this.trackTwo = artist.trackTwo;
          this.mockArtist = artist.artist);
    });

    test(
      'should respond with http res status 200',
      () => {
        return superagent.get(`:${PORT}/api/v1/play/artist/${this.mockArtist.name}`)
          .then(res =>
            expect(res.status).toBe(200)
          );
      });

    test(
      'should return a list of file paths for a requested artist',
      () => {
        return superagent.get(`:${PORT}/api/v1/play/artist/${this.mockArtist.name}`)
          .then(res =>
            expect(res.body.track_paths).toContain(this.trackOne.path);
            expect(res.body.track_paths).toContain(this.trackTwo.path);
          );
      });

  });

  describe('Invalid request', () => {

    test(
      'should throw an error 404 if passing artist does not exist',
      () => {
        return superagent.get(`:${PORT}/api/v1/play/artist/nonexist`)
          .catch(err =>
            expect(err.status).toBe(404);
          );
      });

    test(
      'should throw an error 400 with no artist/:title?',
      () => {
        return superagent.get(`:${PORT}/api/v1/play`)
          .catch(err =>
            expect(err.status).toBe(400);
          );
      });
  });

});
