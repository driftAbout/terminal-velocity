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


describe('GET /api/v1/play/track/:title?', () => { 
  
  beforeAll(() => server.start(PORT, () => console.log(`Listening on ${PORT}`)));
  afterAll(() => server.stop());
  afterAll(() => Track.remove());
  afterAll(() => Album.remove());
  afterAll(() => Artist.remove());
  
  
  describe('Valid request', () => {

    test(
      'should respond with http res status 200',
      () => {
        let mockTrack;
        return mock.track.createOne()
          .then(track => {
            mockTrack = track;
            return superagent.get(`:${PORT}/api/v1/play/track/${mockTrack.artist_name}/${mockTrack.album_title}/${mockTrack.title}`)
              .then(res =>
                expect(res.status).toBe(200)
              );
          });
      });

    test(
      'should return a track obj for a requested track',
      () => {
        let mockTrack;
        return mock.track.createOne()
          .then(track => {
            mockTrack = track;
            return superagent.get(`:${PORT}/api/v1/play/track/${mockTrack.artist_name}/${mockTrack.album_title}/${mockTrack.title}`)
              .then(res =>
                expect(res.body._id).toEqual(mockTrack._id.toString())
              );
          });
      });

  });

  describe('Invalid request', () => {

    test(
      'should throw an error 404 if passing track name does not exist',
      () => {
        let mockTrack;
        return mock.track.createOne()
          .then(track => {
            mockTrack = track;
            return superagent.get(`:${PORT}/api/v1/play/track/${mockTrack.artist_name}/${mockTrack.album_title}/nonexisting`)
              .catch(err => {
                expect(err.status).tobe(404);
                expect(err.message).toEqual('Item Not Found');
              });
          });
      });
/*
    test(
      'should throw an error 404 if track title is not passed',
      () => {
        let mockTrack;
        return mock.track.createOne()
          .then(track => {
            mockTrack = track;
            return superagent.get(`:${PORT}/api/v1/play/track/${mockTrack.artist_name}/${mockTrack.album_title}`)
              .catch(err => {
                expect(err.status).tobe(404);
                expect(err.message).toEqual('Item Not Found');
              });
        });
    });
*/
    test(
      'should throw an error 404 if passing album title does not exist',
      () => {
        let mockTrack;
        return mock.track.createOne()
          .then(track => {
            mockTrack = track;
            return superagent.get(`:${PORT}/api/v1/play/track/${mockTrack.artist_name}/nonexisting}/${mockTrack.title}`)
              .catch(err => {
                expect(err.status).tobe(404);
                expect(err.message).toEqual('Item Not Found');
              });
        });
    });

  });
});
