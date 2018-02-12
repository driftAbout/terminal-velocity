'use strict';

const play = require('audio-play');
const load = require('audio-loader');

load(`./music/1.mp3`).then(play);
