'use strict';

const fs = require('fs');

module.exports = class {
  constructor (rootDirectory) {
    this.rootPath = rootDirectory;
    this.rootName = 'Music'
    this.artists = [];
    this.albums = [];
    this.tracks = [];
  }
  create (current, filepath, parent, grandparent) {
    // if the file is the root directory, skip over the following:
    if (filepath !== this.rootPath) {

      // if the file is an artist directory...
      if (parent === this.rootName) {
        // add the artist to the artist array
        this.artists.push({
          name: current
        })
         // if the file is an album directory...
      } else if (grandparent === this.rootName) {
        // add the album to the album array
        this.albums.push({
          title: current,
          artist_name: parent
        })
        // otherwise, it must be a track, so...
      } else {
        // add the track to the track array
        this.tracks.push({
          path: filepath,
          album_title: parent,
          artist_name: grandparent
        })
      }

    }
    // if the file has children...
    fs.readdir(filepath, (err, files) => {
      if (files) files.forEach((childName) => {
        // run the function again with each child
        this.create(childName, `${filepath}/${childName}`, current, parent);
      })
    })
    // write the contents of the arrays to a file
    fs.writeFile('./import-data/collection.json', JSON.stringify({
      artists: this.artists,
      albums: this.albums,
      tracks: this.tracks
    }))
  }
};
