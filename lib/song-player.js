'use strict';

var mpg = require('mpg123');
 
var player = new mpg.MpgPlayer();
let listen = process.stdin; //listener for when the music starts

const songPlayer = module.exports = {}; // Create object and attach needed information
songPlayer.listen = listen;
songPlayer.player = player;
songPlayer.vol = 100;
songPlayer.pauseFlag = null;

songPlayer.listen.on('data', (data) => {
  data = data.toString().trim(); //changes from buffer to string and removes line at end
  data = data.split(' ');
  let songPath;
  data[1] ? songPath = data[1] : songPath = './music/1.mp3'; //setting default for testing purposes
  data = data[0];
  // console.log('YOU SAID:', data); //For debugging purposes;
  if (data === 'play') {
    songPlayer.pauseFlag = false;
    player.play(songPath);
  } else if (data === 'pause' && songPlayer.pauseFlag === false) {
    player.pause();
    songPlayer.pauseFlag = true;
  } else if (data === 'pause') {
    console.log('\ncant pause something that isnt running...');
  } else if (data === 'resume' && songPlayer.pauseFlag === true) {
    player.pause();
    songPlayer.pauseFlag = false;
  } else if (data === 'resume') {
    console.log('\ncant resume something that is already running...');
  } else if (data === 'volume-down') {
    if (songPlayer.vol >= 20) songPlayer.vol -= 20;
    player.volume(songPlayer.vol);
  } else if (data === 'volume-up') {
    if (songPlayer.songPlayer.vol <= 80) songPlayer.vol += 20; 
    player.volume(songPlayer.vol);
  } else if (data === 'track-info') {
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

songPlayer.player.on('pause', function(){
  console.log('\n- SONG PAUSED -');
});

songPlayer.player.on('resume', function(){
  console.log('\n- SONG RESUMED -');
});

songPlayer.player.on('error', function(){
  console.log('\nError: Couldnt play song.');
});