'use strict';

const mongoose = require('mongoose');

const Album = mongoose.Schema({
  name: {type: String, required: true},
  track_ids: {type: mongoose.Schema.Types.ObjectId, ref: 'track'},
  artist_id: {type: mongoose.Schema.Types.ObjectId, ref: 'artist'},  
},
{timestamps: true}
);

module.exports = mongoose.model('album', Album);