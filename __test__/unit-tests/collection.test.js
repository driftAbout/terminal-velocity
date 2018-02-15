'use strict';

const Collection = require('../../lib/collection.js');
const fs = require('fs');
require('jest');

describe('Collection creation test', () => {
  beforeAll(() => {
    let music = new Collection ('../lib/test-music-directory');
    music.create(music.rootName, music.rootPath);
    fs.readFile(`${__dirname}/../import-data/collection.json`, callback);
  });
  it('should return the correct artists', () => {
    fs.readFile(`${__dirname}/../import-data/collection.json`, (err, data) => {
      expect(JSON.parse(data).artists).toBe('a thing');
    });
  });
  it('should return the correct artists (no JSON)', () => {
    fs.readFile(`${__dirname}/../import-data/collection.json`, (err, data) => {
      expect(data.artists).toBe('a thing');
    });
  });
});
