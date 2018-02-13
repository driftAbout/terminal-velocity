'use strict';

const path = require('path');
require('dotenv').config({path: path.resolve(process.cwd(), '__test__/.test.env')});
const server = require('../../../lib/server');
const superagent = require('superagent');
const PORT = process.env.PORT;
const mock = require('../../lib/mock');
const faker = require('faker');


describe('GET /api/v1/play/playlist/:name', () => { 
  
  beforeAll(() => server.start(PORT, () => console.log(`Listening on ${PORT}`)));
  afterAll(() => server.stop());
  afterAll(() => mock.track.removeAll());
  afterAll(() => mock.playlist.removeAll());
  
  
  describe('Valid request', () => {

    beforeAll(() => {
      return mock.playlist.createOne()
        .then(playlist => this.mockPlaylist = playlist);
    });

    test(
      'should respond with http res status 200',
      () => {
        return superagent.get(`:${PORT}/api/v1/play/playlist/${this.mockPlaylist.name}`)
          .then(res =>
            expect(res.status).toBe(200)
          );
      });

    test(
      'should return a list of file paths for a requested playlist',
      () => {
      });

  });

  describe('Invalid request', () => {

    test(
      'should throw an error 404 if passing playlist does not exist',
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
