
const server = require('../../../lib/server');
const superagent = require('superagent');
const mock= require('../../lib/mock');
const debug = require('debug')('http:playlist-post-test');
const tempDir = `${__dirname}/../../temp`;

debug('tempDir', tempDir);

describe('Playlist POST ', () => { 

  this.url = `:${process.env.PORT}/api/v1`;

  beforeAll(server.start);
  afterAll(server.stop);
  beforeAll(mock.import_data);
  //afterAll(mock.remove_all_data);

  describe('upload and create a playlist', () => {

    it('should post and create a playlist', () => {

      let {name, file} = mock.playlist_import_data;
      return superagent.post(`${this.url}/playlist`)
        .field('name', name)
        .attach('playlist', file) 
        .then(res => debug('res.body', res.body))
        .catch(err => debug('err', err)); 
      
    });
  });

});