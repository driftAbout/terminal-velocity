'use strict';

const path = require('path');
require('dotenv').config({path: path.resolve(process.cwd(), '__test__/.test.env')});
const server = require('../../../lib/server');
const superagent = require('superagent');
const PORT = process.env.PORT;
const mock = require('../../lib/mock');
const faker = require('faker');
const Track = require('../../../model/track');
const Artist = require('../../../model/artist');


describe('GET /api/v1/play/artist/:artist', () => { 
  
  beforeAll(() => server.start(PORT, () => console.log(`Listening on ${PORT}`)));
  afterAll(() => server.stop());
  afterAll(() => Track.remove());
  afterAll(() => Artist.remove());
  
  
  describe('Valid request', () => {

    test(
      'should respond with http res status 200',
      () => {
        return new Artist({
          name: faker.name.firstName(), 
        }).save()
          .then(artist => {
            return superagent.get(`:${PORT}/api/v1/play/artist/${artist.name}`)
              .then(res =>
                expect(res.status).toBe(200)
              );
          });
    });

    test(
      'should return a list of track objects for a requested artist',
      () => {
        let a, tOne, tTwo;
        return new Artist({
          name: faker.name.firstName(), 
        }).save()
          .then(artist => {
            a = artist;
            return new Track({
              path: 'music/artist/album/trackone.mp3',
              album_title: faker.lorem.word(),
              artist_name: a.name,
            }).save()
              .then(track => {
                tOne = track;
                return new Track({
                  path: 'music/artist/album/tracktwo.mp3',
                  album_title: faker.lorem.word(),
                  artist_name: a.name,
                }).save()
                  .then(track => {
                    tTwo = track;
                    return superagent.get(`:${PORT}/api/v1/play/artist/${a.name}`)
                      .then(res => {
                        let ids = [res.body[0]._id, res.body[1]._id];
                        expect(ids.includes(tOne._id.toString())).toBe(true);
                        expect(ids.includes(tTwo._id.toString())).toBe(true);
                      });
                  });
              });
          });
      });

  });

});
