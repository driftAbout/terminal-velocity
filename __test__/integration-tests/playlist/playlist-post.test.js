
const server = require('../../../lib/server');
const superagent = require('superagent');
const faker = require('faker');
const debug = require('debug')('http:plylist-post-test');
const tempDir = `${__dirname}/../../temp`;

debug('tempDir', tempDir);
describe('Playlist POST ', () => { 

  this.url = `:${process.env.PORT}/api/v1`;

  beforeAll(server.start);
  afterAll(server.stop);


  describe('upload and create a playlist', () => {

    it('should post and create a playlist', () => {

      let name = faker.random.word();
      let file = `${tempDir}/playlist.txt`;

      return superagent.post(`${this.url}/playlist`)
        .field('name', name)
        .attach('playlist', file) 
        .then(res => debug('res.body', res.body))
        .catch(err => debug('err', err)); 
      
    });
  });

});