'use strict';

const path = require('path');
require('dotenv').config({path: path.resolve(process.cwd(), '__test__/.test.env')});
const PORT = process.env.PORT;
const superagent = require('superagent');
const faker = require('faker');
const mock = require('../../lib/mock');
const server = require('../../../lib/server');
const Track = require('../../../model/track');
const Album = require('../../../model/album');
const Artist = require('../../../model/artist');


describe('Track module', () => { 
  
  beforeAll(() => server.start(PORT, () => console.log(`Listening on ${PORT}`)));
  afterAll(() => server.stop());
  afterAll(() => Track.remove());
  afterAll(() => Album.remove());
  afterAll(() => Artist.remove());
  
  
  describe('Valid request', () => {

    test(
      'should create a data in mongoDB',
      () => {
        let t;
        return new Track({
          path: 'music/artist/album/track.mp3',
          album_title: faker.lorem.word(2),
          artist_name: faker.name.firstName(),
        }).save()
          .then(track => {
            t = track;
            return Track.findOne(t._id)
              .then(track => {
                expect(track.path).toEqual(t.path);
                expect(track.title).toEqual(t.title);
                expect(track.album_title).toEqual(t.album_title);
                expect(track.artist_name).toEqual(t.artist_name);
              })
          })
      });

  });
});
