'use strict';

const mongoose = require('mongoose');


const Track = mongoose.Schema({
//  _id: {type: Number, required: true, unique: true},
  title: {type: String, required: true},
}, {timestamps: true});


module.exports = mongoose.model('track', Track);
