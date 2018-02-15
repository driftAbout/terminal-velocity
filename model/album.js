'use strict';

const mongoose = require('mongoose');
// const Artist = require('./artist');
const debug = require('debug')('http:album-model');

const Album = mongoose.Schema({
  title: {type: String, required: true},
  //track_ids: [{type: mongoose.Schema.Types.ObjectId, ref: 'track'}],
  artist_name: {type: String},
  //artist_id: {type: mongoose.Schema.Types.ObjectId, ref: 'artist'},  
},
{timestamps: true}
);

debug('Album Sxchema');

module.exports = mongoose.model('album', Album);

/*
Album.pre('save', function(next){
  if (!this.artist_id && !this.artist_name) return next(new Error('Validation Error. artist id or artist name required.'));
  let query = this.artist_id;
  if(!this.artist_id) query = {name: this.artist_name};
  Artist.findOne(query)
    .then(artist => {
      debug('artist', artist);
      if(!artist) return;
      artist.album_ids = [...new Set(artist.album_ids).add(this._id)];
      if(!this.album_id) this.artist_id = artist._id;
      artist.save();
    })
    .then(next)
    .catch(err => err);
});

Album.post('remove', function(album, next){
  Artist.findOne(album.artist_id)
    .then(artist => {
      artist.album_ids = artist.album_ids.filter(id => id.toString() !== album._id.toString());
      artist.save();
    })
    .then(next)
    .catch(err => err);
});


module.exports = mongoose.model('album', Album);
*/
// Album.pre('save', function(next){
//   if (!this.artist_id && !this.artist_name) return next(new Error('Validation Error. artist id or artist name required.'));
//   let query = this.artist_id;
//   if(!this.artist_id) query = {name: this.artist_name};
//   Artist.findOne(query)
//     .then(artist => {
//       debug('artist', artist);
//       if(!artist) return;
//       artist.album_ids = [...new Set(artist.album_ids).add(this._id)];
//       if(!this.album_id) this.artist_id = artist._id;
//       artist.save();
//     })
//     .then(next)
//     .catch(err => err);
// });

// Album.post('remove', function(album, next){
//   Artist.findOne(album.artist_id)
//     .then(artist => {
//       artist.album_ids = artist.album_ids.filter(id => id.toString() !== album._id.toString());
//       artist.save();
//     })
//     .then(next)
//     .catch(err => err);
// });


