
'use strict';

const play = require('audio-play');
const load = require('audio-loader');

const player = module.exports = {};

load(`./music/1.mp3`).then(play);

player.play = () => {
  load(`./music/1.mp3`).then(play);
};

