
const server = require('../../../lib/server');
const superagent = require('superagent');
const debug = require('debug')('http:import-post-test');
const tempDir = `${__dirname}/../../temp`;

debug('tempDir', tempDir);
describe('Import POST ', () => { 

  this.url = `:${process.env.PORT}/api/v1`;

  beforeAll(server.start);
  afterAll(server.stop);

  describe('import a music library', () => {

    it('should import a music library', () => {

      let file = `${tempDir}/import.txt`;

      return superagent.post(`${this.url}/import`)
        .attach('import', file) 
        .then(res => debug('res.body', res.body))
        .catch(err => debug('err', err)); 
      
    });
  });

});