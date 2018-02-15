'use strict';

//const  server = require('../../lib/server');
const  Artist = require('../../model/artist');
const  Album = require('../../model/album');
const  Track = require('../../model/track');
const faker = require('faker');
const debug = require('debug')('http:mock');
const tempDir = `${__dirname}/../temp`;
require('jest');

debug('mock');

const mock = module.exports = {};

mock.track = {};

mock.track.createOne = () => {

  return new Track({
    path: 'music/artist/album/title.mp3',
    album_title: faker.lorem.word(),
    artist_name: faker.name.firstName(),
  }).save();

};

mock.music_data = {
  artists: [{name: 'Artist_01'},{name: 'Artist_02'},{name: 'Artist_03'}],
  albums: [{title: '10_Album', artist_name: 'Artist_01'},{title: '11_Album', artist_name: 'Artist_02'},{title: '12_Album', artist_name: 'Artist_03'}],
  tracks: [{artist_name: 'Artist_01', album_title: '10_Album', path:  '/Users/driftabout/music/Artist_01/10_Album/Track_3817.mp3' },
    {artist_name: 'Artist_01', album_title: '10_Album', path:               '/Users/driftabout/music/Artist_01/10_Album/Track_3809.mp3' },
    {artist_name: 'Artist_01', album_title: '10_Album', path: '/Users/driftabout/music/Artist_01/10_Album/Track_3869.mp3' },
    {artist_name: 'Artist_01', album_title: '10_Album', path: '/Users/driftabout/music/Artist_01/10_Album/Track_3806.mp3' },
    {artist_name: 'Artist_01', album_title: '10_Album', path: '/Users/driftabout/music/Artist_01/10_Album/Track_3805.mp3' },
    {artist_name: 'Artist_01', album_title: '10_Album', path: '/Users/driftabout/music/Artist_01/10_Album/Track_3801.mp3' },
    {artist_name: 'Artist_01', album_title: '10_Album', path: '/Users/driftabout/music/Artist_01/10_Album/Track_3984.mp3' },
    {artist_name: 'Artist_01', album_title: '10_Album', path: '/Users/driftabout/music/Artist_01/10_Album/Track_3985.mp3' },
    {artist_name: 'Artist_01', album_title: '10_Album', path: '/Users/driftabout/music/Artist_01/10_Album/Track_3952.mp3' },
    {artist_name: 'Artist_02', album_title: '11_Album', path: '/Users/driftabout/music/Artist_02/11_Album/Track_4817.mp3' },
    {artist_name: 'Artist_02', album_title: '11_Album', path: '/Users/driftabout/music/Artist_02/11_Album/Track_4809.mp3' },    
    {artist_name: 'Artist_02', album_title: '11_Album', path: '/Users/driftabout/music/Artist_02/11_Album/Track_4869.mp3' },
    {artist_name: 'Artist_02', album_title: '11_Album', path: '/Users/driftabout/music/Artist_02/11_Album/Track_4806.mp3' },
    {artist_name: 'Artist_02', album_title: '11_Album', path: '/Users/driftabout/music/Artist_02/11_Album/Track_4805.mp3' },
    {artist_name: 'Artist_02', album_title: '11_Album', path: '/Users/driftabout/music/Artist_02/11_Album/Track_4801.mp3' },
    {artist_name: 'Artist_02', album_title: '11_Album', path: '/Users/driftabout/music/Artist_02/11_Album/Track_4984.mp3' },
    {artist_name: 'Artist_02', album_title: '11_Album', path: '/Users/driftabout/music/Artist_02/11_Album/Track_4985.mp3' },
    {artist_name: 'Artist_02', album_title: '11_Album', path: '/Users/driftabout/music/Artist_02/11_Album/Track_4952.mp3' },
    {artist_name: 'Artist_03', album_title: '12_Album', path: '/Users/driftabout/music/Artist_03/12_Album/Track_5817.mp3' },
    {artist_name: 'Artist_03', album_title: '12_Album', path: '/Users/driftabout/music/Artist_03/12_Album/Track_5809.mp3' },
    {artist_name: 'Artist_03', album_title: '12_Album', path: '/Users/driftabout/music/Artist_03/12_Album/Track_5869.mp3' },
    {artist_name: 'Artist_03', album_title: '12_Album', path: '/Users/driftabout/music/Artist_03/12_Album/Track_5806.mp3' },
    {artist_name: 'Artist_03', album_title: '12_Album', path: '/Users/driftabout/music/Artist_03/12_Album/Track_5805.mp3' },
    {artist_name: 'Artist_03', album_title: '12_Album', path: '/Users/driftabout/music/Artist_03/12_Album/Track_5801.mp3' },
    {artist_name: 'Artist_03', album_title: '12_Album', path: '/Users/driftabout/music/Artist_03/12_Album/Track_5984.mp3' },
    {artist_name: 'Artist_03', album_title: '12_Album', path: '/Users/driftabout/music/Artist_03/12_Album/Track_5985.mp3' },
    {artist_name: 'Artist_03', album_title: '12_Album', path: '/Users/driftabout/music/Artist_03/12_Album/Track_5952.mp3' },
  ],
};

mock.import_data = () => {
  return Promise.all([
    Artist.create(mock.music_data.artists),
    Album.create(mock.music_data.albums),
    Track.create(mock.music_data.tracks),
  ]);
};

mock.remove_all_data = () => {
  return Promise.all([
    Artist.remove(),
    Album.remove(),
    Track.remove(),
  ]);
};
  
mock.remove_Artist_data = () => {
  return Promise.all([
    Artist.remove(),
  ]);
};

mock.remove_Album_data = () => {
  return Promise.all([
    Album.remove(),
  ]);
};

mock.remove_Track_data = () => {
  return Promise.all([
    Track.remove(),
  ]);
};

mock.playlist_import_data = {name: faker.random.word(), file: `${tempDir}/playlist.txt`};
mock._music_import_file = `${tempDir}/import.txt`;
