'use strict';

const faker = require('faker');
const Artist = require('../../../model/artist');
//const mock = require('../../lib/mock');
const path = require('path');
require('dotenv').config({path: path.resolve(process.cwd(), '__test__/.test.env')});



describe('Artist module', function () {

  afterAll(() => Artist.remove());

  describe('Valid input', () => {

    test('Create an artist model', (done) => {
      new Artist({name: 'name'})
        .save()
        .then(artist => {
          console.log(artist);
          done();
        })
    });

  });
/*
  describe('Invalid input', () => {

    test.skip('throws an error if empty string for name', () => {
      new Artist('')
        .catch(err => expect(err.message).toBe('Validation Error. Name required.'));
    });

  });
*/
});
