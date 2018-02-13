'use strict';

const mongoose = require('mongoose');

const Artist= mongoose.Schema({
  name: {type: String, required: true},
  album_ids: {type: mongoose.Schema.Types.ObjectId, ref: 'album'},  
},
{timestamps: true}
);

module.exports = mongoose.model('album', Artist);