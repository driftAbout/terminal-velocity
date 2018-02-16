
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
  afterAll(mock.remove_all_data);

  describe('Valid input: Upload and create a playlist', () => {

    beforeAll(() => {
      this.data = mock.playlist_import_data;
      let {name, file} = this.data;
      return superagent.post(`${this.url}/playlist`)
        .field('name', name)
        .attach('playlist', file) 
        .then(res => this.resPost = res)
        .catch(err => debug('err', err)); 
    });

    it('should return a status of 201', () => {
      expect(this.resPost.status).toBe(201);
    });

    it('should post and create a playlist', () => {
      expect(this.resPost.body.name).toEqual(this.data.name);
    });
 
  });
  describe('Inalid input', () => {

    it('should return 400 for a missing name in the body', () => {
      this.data = mock.playlist_import_data;
      return superagent.post(`${this.url}/playlist`)
        .attach('playlist', this.data.file) 
        .then(res => this.resPost = res)
        .catch(err => expect(err.status).toBe(400)); 
    }); 

    it('should return an error for an missing file', () => {
      this.data = mock.playlist_import_data;
      return superagent.post(`${this.url}/playlist`)
        .field('name', `${this.data.name}`)
        .then(res => this.resPost = res)
        .catch(err => expect(err.status).toBe(400)); 
    }); 

    it('should return an error for an empty file', () => {
      this.data = mock.playlist_import_data;
      return superagent.post(`${this.url}/playlist`)
        .field('name', `${this.data.name}error`)
        .attach('playlist', `${tempDir}/empty.txt`) 
        .then(res => this.resPost = res)
        .catch(err => expect(err.status).toBe(400)); 
    }); 

    it('should return an error for a duplicate key', () => {
      this.data = mock.playlist_import_data;
      return superagent.post(`${this.url}/playlist`)
        .field('name', this.data.name)
        .attach('playlist', `${this.data.file}`) 
        .then(res => this.resPost = res)
        .catch(err => expect(err.status).toBe(409)); 
    }); 
  });

});