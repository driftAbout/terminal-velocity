'use strict';

const songPlayer = require('../../lib/song-player');

require('jest');

describe('CLI Tests', () => {  
  
  describe('Valid listeners', () => {
    test('Should with true if there is an event listener for the data method', () => {
      expect(songPlayer.listen.emit('data')).toBe(true);
    });
    test('Should with true if there is an event listener for the pause method', () => {
      expect(songPlayer.listen.emit('pause')).toBe(true);
    });
    //Resume not tested due to being handled by the same event as pause
    test('Should with true if there is an event listener for the end method', () => {
      expect(songPlayer.listen.emit('end')).toBe(true);
    });
  });

  describe('Invalid listeners', () => {
    test('Should with true if there is an event listener for the data method', () => {
      expect(songPlayer.listen.emit('data123')).toBe(false);
    });
    test('Should with true if there is an event listener for the pause method', () => {
      expect(songPlayer.listen.emit('pause123')).toBe(false);
    });
    test('Should with true if there is an event listener for the end method', () => {
      expect(songPlayer.listen.emit('end123')).toBe(false);
    });
  });
});