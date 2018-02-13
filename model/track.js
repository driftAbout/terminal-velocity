'use strict';

const mongoose = require('mongoose');
const Album = require('./album');

const Track = mongoose.Schema({
  path: {type: String, required: true},
  title: {type: String, required: true},
  albun_name: {type: String},
  album_id: {type: mongoose.Schema.Types.ObjectId, ref: 'album'},
}, {timestamps: true});


module.exports = mongoose.model('track', Track);

Track.pre('save', function(next){
  let query = this.album_id;
  if(!this.album_id) query = {name: this.album_name};
  Album.findOne(query)
    .then(album => {
      if(!album) return;
      album.track_ids.push(this._id);
      if(!this.album_id) this.album_id = album._id;
      album.save();
    })
    .then(next)
    .catch(err => err);
});

Track.post('remove', function(track, next){
  Album.findOne(track.album_id)
    .then(album => {
      album.track_ids = album.track_ids.filter(id => id.toString() !== track._id.toString());
    })
    .then(next)
    .catch(err => err);
});