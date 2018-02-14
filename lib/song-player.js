'use strict';

let mpg = require('mpg123');
let collectionGen = require('./collection');
const superagent = require('superagent');
 
let player = new mpg.MpgPlayer();
let listen = process.stdin; //listener for when the music starts

const songPlayer = module.exports = {}; // Create object and attach needed information
songPlayer.listen = listen;
songPlayer.player = player;
songPlayer.vol = 100; // variable to keep track of the volume level
songPlayer.pauseFlag = null; //variable to keep track if the song is paused

songPlayer.listen.on('data', (data) => {
  data = data.toString().trim(); //changes from buffer to string and removes line at end
  data = data.split(' ');
  // console.log('YOU SAID:', data.join(' ')); //For debugging purposes;
  if (data[0] === 'play') {
    songPlayer.pauseFlag = null;
    data[1] ? player.play(data[1]) : player.play('./music/1.mp3');
    console.log(`\nNow playing: ${player.track}`);
  } else if (data[0] === 'pause' && songPlayer.pauseFlag === false) {
    player.pause();
    songPlayer.pauseFlag = true;
  } else if (data[0] === 'pause') {
    console.log('\ncant pause something that isnt running...');
  } else if (data[0] === 'resume' && songPlayer.pauseFlag === true) {
    player.pause();
    songPlayer.pauseFlag = false;
  } else if (data[0] === 'resume') {
    console.log('\ncant resume something that is already running...');
  } else if (data.join(' ') === 'volume down') {
    if (songPlayer.vol >= 20) songPlayer.vol -= 20;
    player.volume(songPlayer.vol);
    console.log(`New volume level: ${songPlayer.vol}%`);
  } else if (data.join(' ') === 'volume up') {
    if (songPlayer.vol <= 80) songPlayer.vol += 20; 
    player.volume(songPlayer.vol);
    console.log(`New volume level: ${songPlayer.vol}%`);
  } else if (data.join(' ') === 'track info') {
    console.log('\nTrack:', player.track);
    console.log('Location:', player.file);
    console.log('Song length:', `${Math.floor(player.length/60)} minutes and ${Math.floor(player.length%60)} seconds (${Math.floor(player.length/60)}:${Math.floor(player.length%60)})`);
  } else if (data[0] === 'import' && data.length === 2) {
    console.log(`\nImporting from path: ${data[1]}`);
    let importedCollection = collectionGen(data[1]);
    importedCollection.import(importedCollection.rootName, importedCollection.rootFile);
    //superagent call to post imported data
    // return superagent.post(`:${process.env.PORT}/api/v1/import`)
    // .send(importedCollection)
    // .then(() => console.log('imported collection'));
  } else if (data[0] === 'help' || data[0] === '?') {
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
  console.log('\nSONG PAUSED');
});

songPlayer.player.on('resume', function(){
  if (songPlayer.pauseFlag === null) {
    songPlayer.pauseFlag = false;
  } else {
    console.log('\nSONG RESUMED');
  }
});

songPlayer.player.on('error', function(){
  console.log('\nError: Couldnt play song.');
});