'use strict';

const server = require('../../../lib/server');
const mock = require('../../lib/mock');
const debug = require('debug')('http:album-get-test');
const superagent = require('superagent');

debug('album-get-test');

describe('Album get route testing', () => {

  beforeAll(server.start);
  afterAll(server.stop);
  afterAll(mock.remove_all_data);

  this.url = `:${process.env.PORT}/api/v1`;

  beforeAll(() => {
    this.data =  mock.music_data;
  });
  //debug('this.data', this.data);

  beforeAll(() => {
    return  mock.import_data();
  });

  describe('Album GET valid input', () => {
    beforeAll(() => {
      let artist = this.data.artists[0].name;
      let album = this.data.albums[0].title;
      return superagent.get(`${this.url}/play/album/${artist}/${album}`)
        .then(res => this.resGetAlbum = res)
        .catch(console.error);
    });

    it('Should fetch all tracks for an album', () => {
      expect(this.resGetAlbum.body[0].album_title).toEqual(this.data.albums[0].title);
    });

  });

});
