'use strict';

const fs = require('fs');

// const File = class {
//   constructor (title, path) {
//     this.path = path;
//     this.title = title;
//     this.children = [];
//   }
// };

module.exports = class {
  constructor (rootDirectory) {
    this.rootPath = rootDirectory;
    this.rootName = 'Music';
    this.process_files = [];
    this.artists = [];
    this.albums = [];
    this.tracks = [];
  }
  create (current, filepath, parent, grandparent) {
    // skip over the following if the file is the root directory
    if (filepath !== this.rootPath) {
      // if the file is an artist directory...
      if (parent === this.rootName) {
        // add the artist to the artist array
        this.artists.push({
          name: current,
        });
        // if the file is an album directory...
      } else if (grandparent === this.rootName) {
        // add the album to the album array
        this.albums.push({
          title: current,
          artist_name: parent,
        });
        // otherwise, it must be a track, so...
      } else {
        // add the track to the track array
        this.tracks.push({
          path: filepath,
          album_title: parent,
          artist_name: grandparent,
        });
      }

    }
    // if the file has children...
    return new Promise((resolve, reject) => {
      fs.readdir(filepath, (err, files) => {
      if (files) {
        this.process_files.push(...files.filter(file => !/^\./.test(file)));
        this.process_files.forEach((childName) => {
        // run the function again with each child
          resolve(this.create( childName, `${filepath}/${childName}`, current, parent)); 
        });
      }
      //if (this.process_files.length) return;
      //resolve('hello')
      if (this.process_files.length) return resolve(this.process_files.pop());
      return resolve();
     // console.log('DONE')
    });
    
    })
    .then(file => {
      console.log('FILE', file)
      if (!file) return this.write();
    });
      //then(resolve)
     //.catch(reject);
    
   
   
  }
  write(){  
   //return new Promise((resolve, reject) => {
     return fs.writeFile('./import-data/collection.json', JSON.stringify({
      artists: this.artists,
      albums: this.albums,
      tracks: this.tracks,
    }),
    (err) => {
      if (err) return new Error('Failure to write import data');
     // if (err) return reject(new Error('Failure to write import data'));
      console.log('WRITE');
     // return resolve('./import-data/collection.json');
      return './import-data/collection.json';
   // });
  });
  }
};