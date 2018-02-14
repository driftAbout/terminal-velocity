'use strict';

const faker = require('faker');
const Track = require('../../model/track');
//const Playlist = require('../../model/playlist');
const Artist = require('../../model/artist');
const Album = require('../../model/album');


const mock = module.exports = {};
/*

let mockAlbum = new Album({
  title: faker.lorem.word(),
});


let mockArtist = new Artist({
  name: faker.name.firstName(),
});


let mockTrack = new Track({
  path: faker.lorem.words(5),
  title: faker.lorem.word(),
  album_title: mockAlbum.title,
});


mockArtist
  .save()
  .then(artist => {
    mockAlbum.artist_id = artist;
    mockAlbum.artist_name = artist.name;
    mockAlbum
      .save()
      .then(album => {
        mockTrack.album_id = album;
        mockTrack.album_title = album.title;
        mockTrack
          .save()
          .then(track => {
            mockArtist.album_ids.push(track.album_id);
            mockArtist.save();

            mock.album = mockAlbum;
            mock.artist = mockArtist;
            mock.track = mockTrack;

            return mock;
          })
      })
  })
*/
//mock.playlist = {};





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
    name: faker.name.userName(),
  });
  artist.album_ids.push(album);

  artist
    .save()
    .then(artist => {
      album.artist_name = artist.name;
      album.artist_id = artist._id;
      album
        .save()
        .then(album => {
          track.album_title = album.title;
          track.album_id = album._id;
          track
            .save()
            .then(track => {
              return track;
            })
        })
    })
};

mock.track.removeAll = () => Promise.all([Track.remove()]);

/*
// Playlist mock - Create one, remove all
mock.playlist = {};

mock.playlist.createOne = () => {

  let trackOne, trackTwo;

  return mock.track.createOne()
    .then(track => {
        trackOne = track;
        return mock.track.createOne()
          .then(track => {
            trackTwo = track;
            return new Playlist({
              name: faker.lorem.word(),
            })
          })
          .then(playlist => {
            playlist.track_ids.push(trackOne);
            playlist.track_ids.push(trackTwo);
            playlist.save();
            return playlist;
          });
    });
};

mock.playlist.removeAll = () => Promise.all([Playlist.remove()]);


// Album mock - Create one, remove all
mock.album = {};

mock.album.createOne = () => {
  let artistOne = new Artist({
    name: faker.name.firstName(),
  });
  let trackOne = new Track({
    path: faker.lorem.words(5),
    title: faker.lorem.word(),
  });
  let trackTwo = new Track({
    path: faker.lorem.words(5),
    title: faker.lorem.word(),
  });

  let album = new Album({
    title: faker.lorem.word(),
    artist_name: artistOne.name,
    artist_id: artistOne,
  });

  album.track_ids.push(trackOne);
  album.track_ids.push(trackTwo);

  artistOne.album_ids.push(album);
  artistOne.save();

  trackOne.album_title = album.title;
  trackOne.album_id = album;
  trackOne.save();

  trackTwo.album_title = album.title;
  trackTwo.album_id = album;
  trackTwo.save();

  return album.save();
};

mock.album.removeAll = () => Promise.all([Album.remove()]);


// Artist mock - Create one, remove all
mock.artist = {};

mock.artist.createOne = () => {
  let artistOne = new Artist({
    name: faker.name.firstName(),
  });

  let album = new Album({
    title: faker.lorem.word(),
    artist_name: artistOne.name,
    artist_id: artistOne,
  });

  artistOne.album_ids.push(album);
  return artistOne.save();
};

mock.artist.removeAll = () => Promise.all([Artist.remove()]);
*/
