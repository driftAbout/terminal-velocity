'use strict';

var mpg = require('mpg123');
 
var player = new mpg.MpgPlayer();
let listen = process.stdin; //listener for when the music starts
let vol = 100; //Default 100%
let songPath = './music/1.mp3'; //Default for testing purposes
let pauseFlag = null;


listen.on('data', (data) => {
  data = data.toString().trim(); //changes from buffer to string and removes line at end
  if (data === 'play') {
    player.play(songPath);
  } else if (data === 'pause' && pauseFlag === false) {
    player.pause();
    pauseFlag = true;
  } else if (data === 'pause') {
    console.log('\ncant pause something that isnt running...');
  } else if (data === 'resume' && pauseFlag === true) {
    player.pause();
    pauseFlag = false;
  } else if (data === 'resume') {
    console.log('\ncant resume something that is already running...');
  } else if (data === 'volume down') {
    if (vol >= 20) vol -= 20;
    player.volume(vol);
  } else if (data === 'volume up') {
    if (vol <= 80) vol += 20; 
    player.volume(vol);
  } else if (data === 'track info') {
    console.log('\nTrack:', player.track);
    console.log('Location:', player.file);
    console.log('Song length:', `${Math.floor(player.length/60)} minutes and ${Math.floor(player.length%60)} seconds (${Math.floor(player.length/60)}:${Math.floor(player.length%60)})`);
  }  else if (data === 'help' || data === '?') {
    console.log('\nplay:', 'plays the designated song');
    console.log('pause or resume:', 'toggles pause/resume');
    console.log('volume up:', 'volume up 20% if possible');
    console.log('volume down:', 'volume down 20% if possible');
    console.log('track info:', 'lists track information');
    console.log('help or ?:', 'displays help prompt\n');
  } else {
    console.log('\nCommand not recognized. Type help for commands.');
  }
});

player.on('pause', function(){
  console.log('\n- SONG PAUSED -');
});
player.on('resume', function(){
  console.log('\n- SONG RESUMED -');
});
