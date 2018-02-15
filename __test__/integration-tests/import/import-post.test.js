'use strict';

const server = require('../../../lib/server');
const superagent = require('superagent');
const mock= require('../../lib/mock');
const debug = require('debug')('http:import-post-test');

const tempDir = `${__dirname}/../../temp`;

debug('tempDir', tempDir);
describe('Import POST ', () => { 
  this.file = mock._music_import_file;
  this.url = `:${process.env.PORT}/api/v1`;

  beforeAll(server.start);
  afterAll(server.stop);

  beforeAll(mock.remove_all_data);
  afterAll(mock.remove_all_data);


  describe('Valid input: import a music library from a file', () => {
    beforeAll(() => {
      return superagent.post(`${this.url}/import`)
        .attach('import', this.file) 
        .then(res => this.resPostFile = res)
        .catch(err => debug('err', err)); 
    });

    beforeAll(() => {
      let path = '/Users/driftabout/music/Artist_02/11_Album/Track_4984.mp3';
      return superagent.post(`${this.url}/import`)
        .field('import', path) 
        .then(res => this.resPath = res)
        .catch(err => debug('err', err)); 
    });
    
    it('should return a status of 201', () => {
      expect(this.resPostFile.status).toBe(201);
    });

    it('should import a music library from a path', () => {
      expect(this.resPath.status).toBe(201);
    });
  });

  describe('Invalid input', () => {

    it('should return an duplicate key error', () => {
      return superagent.post(`${this.url}/import`)
        .attach('import', this.file) 
        .then(res => this.resPostFile = res)
        .catch(err => expect(err.status).toBe(409)); 
    }); 

    it('should return a bad request for a post with an array' , () => {
      let path = '/Users/driftabout/music/Artist_02/11_Album/Track_4984.mp3';
      return superagent.post(`${this.url}/import`)
        .field('import', [path]) 
        .then(res => this.resPostFile = res)
        .catch(err => expect(err.status).toBe(400)); 
    }); 

    it('should throw an error for bad a path', () => {
      let path = '/Users/driftabout/images/Artist_02/11_Album';
      return superagent.post(`${this.url}/import`)
        .field('import', path) 
        .then(res => debug('res.body', res.body))
        .catch(err => expect(err.status).toBe(400)); 
    });

  });

});