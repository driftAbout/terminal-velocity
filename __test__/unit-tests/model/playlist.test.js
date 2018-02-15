'use strict';

const faker = require('faker');
const Playlist = require('../../../model/playlist');
const  server = require('../../../lib/server');
const mock= require('../../lib/mock');
const debug = require('debug')('http:playlist-test');
require('jest');

describe('Playlist model test', () => {
  beforeAll(server.start);
  afterAll(server.stop);
  afterAll(Playlist.remove);

  it('should be an object', () => {
    expect(new Playlist({
      name: faker.random.word(), 
      playlist_objects: [
        {title: faker.random.word(), 
          album_title: faker.random.word(), 
          artist_name: faker.name.lastName(),
        },
      ],
    })).toBeInstanceOf(Object);
  });


  debug('Playlist test');

  

  describe('parse file and make playlist', () => {

    this.req = {
      body: {name: faker.hacker.noun().replace(' ', '_')},
      file: {path: mock.playlist_import_data.file},
    };

    it('should parse a file and make a playlist', () => {
      return  Playlist.parse_playlist(this.req)
        .then(playlist => {
          new Playlist(playlist).save()
            .then(playlist =>  expect(playlist.playlist_objects).toBeInstanceOf(Array))
            .catch(console.error);
        });
    });
  });

  describe('Invalid parse file to make playlist', () => {

    this.badReq = {
      body: {name: faker.hacker.noun().replace(' ', '_')},
      file: {},
    };

    it('should throw an error', () => {
      return  Playlist.parse_playlist(this.badReq)
        .then(playlist => {
          return  new Playlist(playlist).save();
        })
        .catch(err => expect(err.message).toMatch(/not found/i));
    });
  });

});