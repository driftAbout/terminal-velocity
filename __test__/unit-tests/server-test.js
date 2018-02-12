'use strict';

const server = require('../../lib/server');

describe('Server tests', function(){

  beforeAll(() => server.start());

  describe('Server errors', () => {

    test('Should', () => {
      return server.start().catch((err) => {
        expect(err.message).toMatch();
      });
    });

    test('Should', () => {
      server.stop();
      return server.stop().catch((err) => {
        expect(err.message).toMatch();
      });
    });
  });


});
