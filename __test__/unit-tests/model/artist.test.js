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


describe('Artist module', () => { 
  
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
        return new Artist({
          name: faker.name.firstName(),
        }).save()
          .then(artist => {
            a = artist;
            return Artist.findOne(artist._id)
              .then(artist => {
                expect(artist.name).toEqual(a.name);
              })
          })
      });

  });
});
