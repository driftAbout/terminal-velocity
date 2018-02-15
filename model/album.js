'use strict';

const mongoose = require('mongoose');
const debug = require('debug')('http:album-model');
debug('Album Schema');

const Album = mongoose.Schema({
  title: {type: String, required: true},
  artist_name: {type: String},
},
{timestamps: true}
);

module.exports = mongoose.model('album', Album);

