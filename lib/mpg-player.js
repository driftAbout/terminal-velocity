'use strict';

const mpg = require('mpg123');
const Queue = require('./queue');
const write = process.stdout.write;

const mpg_player = module.exports = {}; // Create object and attach needed information

mpg_player.player = new mpg.MpgPlayer();
mpg_player.trackQueue = null;
mpg_player.vol = 100; // variable to keep track of the volume level
mpg_player.pauseFlag = null; //variable to keep track if the song is paused
mpg_player.songQueue = new Queue();
mpg_player.exit = process.exit;

mpg_player.play_track = (track) => {
  write(`\nNow playing: ${this.player.track}\n`);
  this.player.play(`/${track}`); // Enqueue the single track
};   

mpg_player.play_queue = (tracks) => {
  mpg_player.trackQueue = this.trackQueue(tracks);
  let track = this.trackQueue.dequeue();
  if (!track)  write(`\nNo next song...\n`);
  this.player.play(track.path); // dequeues first track and plays in the dequeue
  mpg_player.writeTrack();
};

mpg_player.trackQueue = (tracks) => {
  let tq = new Queue();
  for (let trackObj of tracks) {
    tq.enqueue(trackObj); // Enqueue the tracks
  }
};

mpg_player.play_prev = () => {
  let track = this.trackQueue.requeue();
  this.player.play(track.path); // dequeues first track and plays in the dequeue
  mpg_player.writeTrack();
};

mpg_player.writeTrack = (track) => {
  write(`\nNow playing: ${track.artist_name} - ${track.album_name} - ${track.name}\n`);
};

mpg_player.player.on('pause', function(){
  write('\nSONG PAUSED\n');
});

mpg_player.player.on('resume', function(){
  if (mpg_player.pauseFlag === null) return mpg_player.pauseFlag = false;
  write('\nSONG RESUMED\n');
});

mpg_player.player.on('error', function(){
  write('\nError: Couldnt play song.\n');
});

mpg_player.player.on('end', function(){ //Dequeues playlist song and keeps playing next song
  write('\nSong ended - Playing next song\n');
  mpg_player.player.play(mpg_player.songQueue.dequeue()); 
});
