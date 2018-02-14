'use strict'; 

const  server = require('../../lib/server');
const Playlist = require('../../model/playlist');
const faker = require('faker');
const debug = require('debug')('http:playlist-test');
require('jest');

describe('Playlist model test', () => {
  beforeAll(server.start);
  afterAll(server.stop);
  //afterAll(Playlist.remove);

  debug('Playlist test');

  this.req = {
    body: {name: faker.hacker.noun().replace(' ', '_')},
    file: {path: `${__dirname}/../temp/playlist.txt`},
  };

  describe('parse file and make playlist', () => {

    it('should parse a file and make a playlist', () => {
      return  Playlist.parse_playlist(this.req)
        .then(playlist => {
          new Playlist(playlist).save();
          expect(true).toBe(true);
        })
        .catch(console.error);
      
    });

  });

});