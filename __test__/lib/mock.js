'use strict';

const faker = require('faker');
const Track = require('../../model/track');
const Playlist = require('../../model/playlist');

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


// Playlist mock - Create one, remove all
mock.playlist = {};

mock.playlist.createOne = () => {

  let trackOne, trackTwo;
  return mock.track.createOne()
    .then(track => {
        trackOne = track;
        return mock.track.createOne()
          .then(track => {
            trackTwo = track
              return new Playlist({
                name: faker.lorem.word(),
                tracks: [trackOne._id, trackTwo._id]
              })
                .save();
          });
    });
};

mock.playlist.removeAll = () => Promise.all([Playlist.remove()]);


