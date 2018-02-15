'use strict';

const path = require('path');
require('dotenv').config({path: path.resolve(process.cwd(), '__test__/.test.env')});
const PORT = process.env.PORT;
const superagent = require('superagent');
const faker = require('faker');
const mock = require('../../lib/mock');
const server = require('../../../lib/server');
require('jest');


describe('GET /play/artist/:artist', () => {
  beforeAll(() => { return mock.artist.createOne()
    .then(artist => this.mockArtist = artist);});
  beforeAll(() => server.start());
  afterAll(() => server.stop());
  afterAll(() => Promise.all[Track.remove()]);


  describe('Valid Requests', () => {
    test('should correctly get artist and return status of 200', () => {
      return superagent.get(`${PORT}/api/v1/play/artist/:artist`)
        .then(res => expect(res.status).toBe(200));
    });
  });
});

describe('Invalid Requests', () => {
  it('should return a status of 404 for an invalid request', () => {
    return superagent.get(`${PORT}/api/v1/play/artist/:awesome`)
      .send({artist: ''})
      .catch(err => {
        expect(err.status).toBe(404);
      });
  });
});

describe('Missing Req/Res', () => {
  it('should return a status of 400 when req/res are missing', () => {
    return superagent.get(`${PORT}/api/v1/play/`)
      .send()
      .catch(err => {
        expect(err.status).toBe(404);
      });
  });
});