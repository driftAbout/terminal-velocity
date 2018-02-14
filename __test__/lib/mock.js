'use strict';

const faker = require('faker');
const Track = require('../../model/track');
//const Playlist = require('../../model/playlist');
const Artist = require('../../model/artist');
const Album = require('../../model/album');


const mock = module.exports = {};

// Track mock - Create one, remove all
mock.track = {};

mock.track.createOne = () => {

  let track = new Track({
    path: faker.lorem.words(5),
    title: faker.lorem.words(2),
  });

  let album = new Album({
    title: faker.lorem.words(2),
  });
  album.track_ids.push(track);

  let artist = new Artist({
    name: faker.name.firstName(),
  });
  artist.album_ids.push(album);

  artist.save()
    .then(artist => {
      album.artist_name = artist.name;
      album.artist_id = artist._id;
      album.save()
        .catch(err => console.log(err))
        .then(album => {console.log(album);
          track.album_title = album.title;
          track.album_id = album._id;
          track
            .save()
            .then(track => {
console.log(track);
              return track;
            })
        })
    })
    .catch(err => console.log(err));
};

mock.track.removeAll = () => Promise.all([Track.remove()]);

