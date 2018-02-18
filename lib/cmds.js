'use strict';

const Collection = require('./collection');
const superagent = require('superagent');
const mpg_player = require('./mpg-player');
//const player = mpg_player.player;

const write = process.stdout.write;

const cmd = module.exports = {};

cmd.play_track = (artist, album, track) => {
  //if(args.length !== 4) return errmesg()
  mpg_player.pauseFlag = null;
  superagent.get(`:${process.env.PORT}/api/v1/play/track/${artist}/${album}/${track}`) 
    .then(trackObj => mpg_player.play_track(trackObj.body.path))
    .catch((err) => write(`There was an error when getting the track\n, \t${err}\n`));
};

cmd.play_album = (artist, album) => { 
  //if (data.length !== 3)
  mpg_player.pauseFlag = null;
  superagent.get(`:${process.env.PORT}/api/v1/play/album/${artist}/${album}`)
    .then(res => mpg_player.play_queue(res.body))
    .catch(err => write(`ERR: ${err}\n`));
};

cmd.play_artist = (artist) => {
  //if length === 2)  // Needs args in order of Artist, Album, Track
  mpg_player.pauseFlag = null;
  superagent.get(`:${process.env.PORT}/api/v1/play/artist/${artist}`) //artist playing
    .then(res => mpg_player.play_queue(res.body))
    .catch(err => write(`ERR: ${err}\n`));
};

cmd.pause = () => {
  if(mpg_player.pauseFlag) write('\nNothing to pause...\n');
  mpg_player.pauseFlag = true;
  mpg_player.player.pause();
};

cmd.resume = () => {
  if(!mpg_player.pauseFlag) write('\nNothing to pause...\n');
  mpg_player.pauseFlag = false;
  mpg_player.player.pause();
};

cmd.prev = () => {
  mpg_player.play_prev();
};

cmd.volume = (direction) => {
  if(cmd[`volume_${direction}`]) write(`Volume ${direction} is not a valid volume command`);
  cmd[`volume_${direction}`]();
  mpg_player.plyer.volume(mpg_player.vol);
  console.log(`New volume level: ${mpg_player.vol}%`);
};

cmd.volume_down = () =>  {
  if (mpg_player.vol >= 20) mpg_player.vol -= 20;
};

cmd.volume_up = () => {
  if (mpg_player.vol <= 80) mpg_player.vol += 20; 
};

cmd.track = () => {
  let trackInfo = [
    `\nTrack: ${mpg_player.track}`,
    `Location: ${mpg_player.file}`,
    `Song length: ${Math.floor(mpg_player.length/60)} minutes and ${Math.floor(mpg_player.length%60)} seconds (${Math.floor(mpg_player.length/60)}:${Math.floor(mpg_player.length%60)}\n`,
  ]; 
  write(trackInfo.join('\n'));
};

cmd.import = (music_path) => {
  console.log('music path', music_path);
  let music = new Collection(music_path); 
  return music.create('', music_path)
    .then(import_file_path => {
      console.log('import_file_path', import_file_path);
      return  superagent.post(`:${process.env.PORT}/api/v1/import`)
        .attach('import', import_file_path)
        .then(() => console.log('music collection inported'))
        .catch(err => write(`Error importing collection ${err}`));
    })
    .catch(err => write(`Error importing collection ${err}`));

};

cmd.import_track = (track) => {
  superagent.post(`:${process.env.PORT}/api/v1/import`) //imported with form field due to multer
    .field('import', track)
    .then(() => write(`\nTRACK IMPORTED\n`))
    .catch(() => write('\nERROR: COULD NOT IMPORT TRACK\n'));
};


cmd.create_playlist = (name, playlist) => {
  if(!name || !playlist) return write('Error: Please specify name and path');
  superagent.post(`:${process.env.PORT}/api/v1/playlist`) //imported with form field due to multer
    .field('name', name)
    .attach('playlist', playlist)
    .then(() => write('\nPLAYLIST SAVED\n'))
    .catch(() => write('\nERROR: COULD NOT SAVE PLAYLIST\n'));
};


cmd.play_playlist = (playlist) => {
  if(!playlist) return write('Error: Please specify playlist');
  mpg_player.pauseFlag = null;
  superagent.get(`:${process.env.PORT}/api/v1/playlist/${playlist}`) //playlist playing
    .then(res => mpg_player.play_queue(res.body))
    .catch(() => write('\nERROR: COULD NOT PLAY PLAYLIST\n'));
};

cmd.help = () => {
  let helpMenu = [
    `\nplay: plays the designated song`,
    `pause or resume: toggles pause/resume`,
    `volume up: volume up 20% if possible`,
    `volume down: volume down 20% if possible`,
    `track info:  lists track information`,
    `help or ?: displays help prompt\n`,
  ];
  write(helpMenu.join('\n'));
}; 

cmd.quit = () => process.exit();
