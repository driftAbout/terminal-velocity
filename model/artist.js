'use strict';

const mongoose = require('mongoose');

const Artist = mongoose.Schema({
  name: {type: String, required: true},
},
{timestamps: true}
);

module.exports = mongoose.model('artist', Artist);

