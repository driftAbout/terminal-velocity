'use strict';

const mongoose = require('mongoose');
const Album = require('./album');
const debug = require('debug')('http:track-model');

const Track = mongoose.Schema({
  path: {type: String, required: true},
  title: {type: String},
  artist_name: {type: String, required: true},
  album_title: {type: String},
  album_id: {type: mongoose.Schema.Types.ObjectId, ref: 'album'},
}, {timestamps: true});


//hooks
Track.pre('save', function(next){
  this.title = this.path.match(/[^/]+$/g)[0].split('.').slice(0,-1).join('');
  debug('album_id:', this.album_id, 'this.album_title:', this.album_title );
  if (!this.album_id && !this.album_title) return next(new Error('Validation Error. album id or album title required.'));
  let query = this.album_id;
  //if(!this.album_id) query = {title: this.album_title};
  if(!this.album_id) query = {title: this.album_title, artist_name: this.artist_name};
  debug('query', query);
  Album.findOne(query)
    .then(album => {
      debug('album', album);
      if(!album) return;
      album.track_ids = [...new Set(album.track_ids).add(this._id)];
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
      album.save();
    })
    .then(next)
    .catch(err => err);
});


module.exports = mongoose.model('track', Track);