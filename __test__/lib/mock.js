'use strict';

const faker = require('faker');
const Track = require('../../model/track');


const mock = module.exports = {};

// Mock track - Create one
mock.track = {};

mock.track.createOne = () => {

  return new Track({
    path: 'music/artist/album/title.mp3',
    album_title: faker.lorem.word(),
    artist_name: faker.name.firstName(),
  }).save();

};


