'use strict';

const path = require('path');
require('dotenv').config({path: path.resolve(process.cwd(), '__test__/.test.env')});
const server = require('../../../lib/server');
const superagent = require('superagent');
const Playlist = require('../../../model/playlist');
const PORT = process.env.PORT;
const mock = require('../../lib/mock');

this.url = `:${PORT}/api/v1`;

describe('GET /api/v1/playlist/:name', () => { 
  
  beforeAll(server.start);
  beforeAll(mock.import_data);
  afterAll(() => server.stop());
  afterAll(mock.remove_all_data);
  
  describe('Valid request', () => {
  //create a play list to get
    beforeAll(() => {
      this.req = {
        body: {name: mock.playlist_import_data.name},
        file: {path: mock.playlist_import_data.file},
      };

      return Playlist.parse_playlist(this.req)
        .then(playlist => new Playlist(playlist).save())
        .then(playlist => this.trackCount = playlist.playlist_objects.length)
        .catch(console.error);
    });

  
    describe('Get Playlist', () => {
      beforeAll(() => {
        return superagent.get(`${this.url}/playlist/${this.req.body.name}`)
          .then(res => this.resGet = res)
          .catch(console.error);
      });
      
      it('should return a 200 status', () => {
        expect(this.resGet.status).toBe(200)
      });

      it('should return an array of tracks', () => {
        expect(this.resGet.body.length).toEqual(this.trackCount)
      });

    });

  });

  describe('Invalid request', () => {

    test(
      'should throw an error 404 if passing playlist does not exist',
      () => {
        return superagent.get(`${this.url}/playlist/nonexist`)
          .catch(err =>
            expect(err.status).toBe(404)
          );
      });

    test(
      'should throw an error 400 with no playlist/:title?',
      () => {
        return superagent.get(`${this.url}/playlist`)
          .catch(err =>
            expect(err.status).toBe(400)
          );
      });
  });

});
