'use strict';

const mongoose = require('mongoose');
const Track = require('./track');

const Playlist = mongoose.Schema({
  name: {type: String, required: true, unique: true},
  tracks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Track' }]
}, {timestamps: true});


module.exports = mongoose.model('playlist', Playlist);
