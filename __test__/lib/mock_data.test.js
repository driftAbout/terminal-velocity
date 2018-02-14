'use strict'; 

const  server = require('../../lib/server');
const  Artist = require('../../model/artist');
const  Album = require('../../model/album');
const  Track = require('../../model/track');
const debug = require('debug')('http:mock_data_test');
require('jest');

describe('data model test', () => {
  beforeAll(server.start);
  afterAll(server.stop);

  
  this.music_data = {
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

  // this.music_data.artists.forEach(artist => new Artist(artist).save());
  // this.music_data.albums.forEach(album => new Album(album).save());
  // this.music_data.tracks.forEach(track => new Track(track).save());
  // beforeAll(() => {
  //   return Artist.create(this.music_data.artists);
  // });
  // beforeAll(() => {
  //   return  Album.create(this.music_data.albums);
  // });

  // beforeAll(() => {
  //   return   Track.create(this.music_data.tracks);
  // });

  beforeAll(() => {
    return Promise.all([
      Artist.create(this.music_data.artists),
      Album.create(this.music_data.albums),
      Track.create(this.music_data.tracks),
    ]);
  });
    
   
   

  

  debug('Mock Data Test');

  describe('find artist', () => {
  
    it('should create a new artist', () => {
      return Artist.find({name: this.music_data.artists[0].name})
        .then(artist => {
          debug('artist', artist);
          expect(artist.name).toEqual(this.music_data.artists[0].name);
        })
        .catch(err => debug('Artist error:', err));
    });

  });

  describe('find album', () => {
   
    it('should create a new album', () => {
      return Album.find({title: this.music_data.albums[0].title, artist_name: this.music_data.albums[0].artist_name})
        .then(album => {
          debug('album', album);
          expect(album.title).toEqual(this.music_data.albums[0].title);
        })
        .catch(console.error);
    });

  });


  describe('find and populate artist', () => {

    beforeAll(() =>{
      Artist.findOne({name: this.music_data.artists[0].name})
        .populate({
          path: 'album_ids',
          model: 'album',
          populate: { 
            path: 'track_ids',
            model: 'track',
          },
        })
        .then(artist => {
          debug('artist_pop', JSON.stringify(artist));
        })
        .catch(console.error);
    });

    it('should create a new album', () => {
      return  Track.find({path:  this.music_data.tracks[0].path})
        .populate('album_id')
        .then(track => {
          debug('track_pop', track);
          expect(track.path).toEqual(this.track_1.path);
        })
        .catch(console.error);
    });

  });

});
