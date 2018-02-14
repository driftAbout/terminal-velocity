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

  debug('Mock Data Test');

  describe('bulid artist', () => {
    this.artist_1 = {
      name: 'artist_1',
    };
    new Artist(this.artist_1).save();
    
    it('should create a new artist', () => {
      Artist.find({name: this.artist_1.name})
        .then(artist => {
          debug('artist', artist);
          expect(artist.name).toEqual(this.artist_1.name);
        })
        .catch(console.error);
    });

  });

  describe('bulid album', () => {
    this.album_1 = {
      artist_name: 'artist_1',
      title: 'album_1',
    };
    new Album(this.album_1).save();
    
    it('should create a new album', () => {
      Album.find({title: this.album_1.title})
        .then(album => {
          debug('album', album);
          expect(album.title).toEqual(this.album_1.title);
        })
        .catch(console.error);
    });

  });


  describe('bulid tracks', () => {

    this.track_1 = {
      path: '/home/music/artist/album/track_1.mp3',
      album_title: 'album_1',
      artist_name: 'artist_1',
    };
    new Track(this.track_1).save();
    this.track_2 = {
      path: '/home/music/artist/album/track_2.mp3',
      album_title: 'album_1',
      artist_name: 'artist_1',
    };
    new Track(this.track_2).save();
    debug('added tracks');
  });

  it('should create a new album', () => {
    Artist.findOne({name: this.album_1.artist_name})
      .populate({
        path: 'album_ids',
        model: 'album',
        populate: { 
          path: 'track_ids',
          model: 'track',
        },
      })
      .then(artist => {
        debug('artistpop', JSON.stringify(artist));
      })
      .catch(console.error);

    Track.find({path: this.track_1.path})
      .populate('album_id')
      .then(track => {
        debug('track_pop', track);
        expect(track.path).toEqual(this.track_1.path);
      })
      .catch(console.error);
  });

});

