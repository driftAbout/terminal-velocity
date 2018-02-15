'use strict';

let mpg = require('mpg123');
let collectionGen = require('./collection');
const superagent = require('superagent');
const Queue = require('./queue');

let player = new mpg.MpgPlayer();
let listen = process.stdin; //listener for when the music starts

const songPlayer = module.exports = {}; // Create object and attach needed information
songPlayer.listen = listen;
songPlayer.player = player;
songPlayer.vol = 100; // variable to keep track of the volume level
songPlayer.pauseFlag = null; //variable to keep track if the song is paused
songPlayer.songQueue = new Queue();

songPlayer.listen.on('data', (data) => {
  if (!data) return new Error('Error: No data.');
  data = data.toString().trim(); //changes from buffer to string and removes line at end
  data = data.split(' ');
  // console.log('YOU SAID:', data.join(' ')); //For debugging purposes;

  // console.log('data:', data);
  if (data[0] === 'play_track' && data.length === 4) { // Needs args in order of Artist, Album, Track
    songPlayer.pauseFlag = null;
    // data[1] ? player.play(data[1]) : player.play('./music/1.mp3'); //Old songplayer direct route


    superagent.get(`:${process.env.PORT}/api/v1/play/track/${data[1]}/${data[2]}/${data[3]}`) //data[1] = artist, data[2] = album, data[3] = track;
      .then(trackObj => {
        player.play(trackObj.body.path); // Enqueue the single track
        // player.play(songPlayer.songQueue.dequeue()); // dequeues first track and plays in the dequeue
        console.log(`\nNow playing: ${player.track}`);
      })
      .catch(err => console.log('there was an error when getting the track'));

  } else if (data[0] === 'play_album' && data.length === 3) { // Needs args in order of Artist, Album, Track
    songPlayer.pauseFlag = null;
    superagent.get(`:${process.env.PORT}/api/v1/album/${data[1]}/${data[2]}`) //album playing
      .then(trackObjs => {
        songPlayer.songQueue = new Queue(); // Create new blank queue
        for (let i in trackObjs.body) {
          songPlayer.songQueue.enqueue(trackObjs.body[i][0].path); // Enqueue the tracks
        }
        player.play(songPlayer.songQueue.dequeue().path); // dequeues first track and plays in the dequeue
        console.log(`\nNow playing: ${player.track}`);
      })
      .then(data => console.log('ALBUM NOW PLAYING'))
      .catch(err => console.log('ERROR: COULD NOT PLAY ALBUM'));
  } else if (data[0] === 'play_artist' && data.length === 2) { // Needs args in order of Artist, Album, Track
    songPlayer.pauseFlag = null;
    superagent.get(`:${process.env.PORT}/api/v1/artist/${data[1]}`) //artist playing
      .then(trackObjs => {
        songPlayer.songQueue = new Queue(); // Create new blank queue
        for (let i in trackObjs.body) {
          songPlayer.songQueue.enqueue(trackObjs.body[i][0].path); // Enqueue the tracks
        }
        player.play(songPlayer.songQueue.dequeue().path); // dequeues first track and plays in the dequeue
        console.log(`\nNow playing: ${player.track}`);
      })
      .then(data => console.log('ARTIST NOW PLAYING'))
      .catch(err => console.log('ERROR: COULD NOT PLAY ARTIST'));
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
  } else if (data[0] === 'skip' || data[0] === 'next') {
    player.play(songPlayer.songQueue.dequeue().path); // dequeues first track and plays in the dequeue
    console.log(`\nSong skipped\nNow playing: ${player.track}`);
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
    // IMPORT ROUTE FOR ALL LIBRARY TEMPORARILY NOT WORKING
    // console.log(`\nImporting from path: ${data[1]}`);
    // let importedCollection = collectionGen(data[1]);
    // importedCollection.import(importedCollection.rootName, importedCollection.rootFile);
    //superagent call to post imported data
    // superagent.post(`:${process.env.PORT}/api/v1/import`)
    // .attach('import', file)
    // .then(() => console.log('imported collection'));
  } else if (data[0] === 'import_track' && data.length === 2) {
    //superagent call to post single track
    superagent.post(`:${process.env.PORT}/api/v1/import`) //imported with form field due to multer
      .field('import', data[1])
      .then(data => console.log('\nTRACK IMPORTED'))
      .catch(err => console.log('\nERROR: COULD NOT IMPORT TRACK'));
  } else if (data[0] === 'create_playlist' && data.length === 3) {
    //superagent call to post playlist
    superagent.post(`:${process.env.PORT}/api/v1/playlist`) //imported with form field due to multer
      .field('name', data[1])
      // .attach('playlist', '/home/jeremy/playlistTest.txt')
      .attach('playlist', data[2])
      .then(data => console.log('PLAYLIST SAVED'))
      .catch(err => console.log('ERROR: COULD NOT SAVE PLAYLIST'));
  } else if (data[0] === 'play_playlist' && data.length === 2) {
    //superagent call to get playlist
    songPlayer.pauseFlag = null;
    superagent.get(`:${process.env.PORT}/api/v1/playlist/${data[1]}`) //playlist playing
      .then(trackObjs => {
        songPlayer.songQueue = new Queue(); // Create new blank queue
        
        for (let i in trackObjs.body) {
          console.log('TRACK PATHS:', trackObjs.body[i][0].path);
          songPlayer.songQueue.enqueue(trackObjs.body[i][0].path); // Enqueue the tracks
        }
        player.play(songPlayer.songQueue.dequeue().path); // dequeues first track and plays in the dequeue
        console.log(`\nNow playing: ${player.track}`);
      })
      .then(data => console.log('PLAYLIST NOW PLAYING'))
      .catch(err => console.log('ERROR: COULD NOT PLAY PLAYLIST'));
  } else if (data[0] === 'help' || data[0] === '?') {
    console.log('\nplay:', 'plays the designated song');
    console.log('pause or resume:', 'toggles pause/resume');
    console.log('volume up:', 'volume up 20% if possible');
    console.log('volume down:', 'volume down 20% if possible');
    console.log('track info:', 'lists track information');
    console.log('help or ?:', 'displays help prompt\n');
  } else {
    console.log('\nCommand not recognized or invalid. Type help for commands.');
    return new Error('Error: Invalid input');
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

songPlayer.player.on('end', function(){ //Dequeues playlist song and keeps playing next song
  console.log('\nSong ended - dequeuing to next song');
  player.play(songPlayer.songQueue.dequeue()); 
});