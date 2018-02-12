'use strict';

const faker = require('faker');
const Track = require('../../model/track');

const mock = module.exports = {};



// Track mock - Create one, remove all
mock.track = {};

mock.track.createOne = () => {

  return new Track({
    title: faker.lorem.words(2),
  })
    .save();

};

mock.track.removeAll = () => Promise.all([Track.remove()]);


