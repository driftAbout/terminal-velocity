'use strict';

const path = require('path');
require('dotenv').config({path: path.resolve(process.cwd(), '__test__/.test.env')});
const server = require('../../../lib/server');
const superagent = require('superagent');
const PORT = process.env.PORT;
const mock = require('../../lib/mock');
const faker = require('faker');


describe('GET /api/v1/play/album/:title?', () => { 
  
  beforeAll(() => server.start(PORT, () => console.log(`Listening on ${PORT}`)));
  afterAll(() => server.stop());
  afterAll(() => mock.track.removeAll());
  afterAll(() => mock.album.removeAll());
  
  
  describe('Valid request', () => {

    beforeAll(() => {
      return mock.album.createOne()
        .then(album => {
          this.trackOne = album.trackOne;
          this.trackTwo = album.trackTwo;
          this.mockAlbum = album.album);
    });

    test(
      'should respond with http res status 200',
      () => {
        return superagent.get(`:${PORT}/api/v1/play/album/${this.mockAlbum.title}`)
          .then(res =>
            expect(res.status).toBe(200)
          );
      });

    test(
      'should return a list of file paths for a requested album',
      () => {
        return superagent.get(`:${PORT}/api/v1/play/album/${this.mockAlbum.title}`)
          .then(res =>
            expect(res.body.track_paths).toContain(this.trackOne.path);
            expect(res.body.track_paths).toContain(this.trackTwo.path);
          );
      });

  });

  describe('Invalid request', () => {

    test(
      'should throw an error 404 if passing album does not exist',
      () => {
        return superagent.get(`:${PORT}/api/v1/play/album/nonexist`)
          .catch(err =>
            expect(err.status).toBe(404);
          );
      });

    test(
      'should throw an error 400 with no album/:title?',
      () => {
        return superagent.get(`:${PORT}/api/v1/play`)
          .catch(err =>
            expect(err.status).toBe(400);
          );
      });
  });

});
