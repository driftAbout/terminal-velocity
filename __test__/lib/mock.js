'use strict';

const faker = require('faker');
const Track = require('../../model/track');

const mock = module.exports = {};



// Track mock - Create one, remove all
mock.track = {};

mock.track.createOne = () => {

  let createdTrack = {};

  return new Track({
  })
    .then(() => {return createdTrack;});
};

mock.track.removeAll = () => Promise.all([Track.remove()]);


