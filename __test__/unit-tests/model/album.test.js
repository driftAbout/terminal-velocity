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


describe('Album module', () => { 
  
  beforeAll(() => server.start(PORT, () => console.log(`Listening on ${PORT}`)));
  afterAll(() => server.stop());
  afterAll(() => Track.remove());
  afterAll(() => Album.remove());
  afterAll(() => Artist.remove());
  
  
  describe('Valid request', () => {

    test(
      'should create a data in mongoDB',
      () => {
        let a;
        return new Album({
          title: faker.lorem.word(),
          artist_name: faker.name.firstName(),
        }).save()
          .then(album => {
            a = album;
            return Album.findOne(a._id)
              .then(album => {
                expect(album.title).toEqual(a.title);
                expect(album.artist_name).toEqual(a.artist_name);
              })
          })
      });

  });
});
