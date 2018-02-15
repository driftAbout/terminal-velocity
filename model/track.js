'use strict';

const mongoose = require('mongoose');
const debug = require('debug')('http:track-model');

const Track = mongoose.Schema({
  path: {type: String, required: true},
  title: {type: String},
  artist_name: {type: String, required: true},
  album_title: {type: String},
}, {timestamps: true});

debug('Track Schema');

//hooks
Track.pre('save', function(next){
  this.title = this.path.match(/[^/]+$/g)[0].split('.').slice(0,-1).join('');
  if (!this.album_id && !this.album_title) return next(new Error('Validation Error. album id or album title required.'));
  next();
});

module.exports = mongoose.model('track', Track);
