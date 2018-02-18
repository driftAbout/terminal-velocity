'use strict';

const fs = require('fs');

module.exports = class {
  constructor (rootDirectory) {
    this.rootPath = rootDirectory;
    this.rootName = 'Music';
    this.process_files = [];
    this.artists = [];
    this.albums = [];
    this.tracks = [];
  }
  create (filepath) {
    //depth is the number of folders deep from root path
    this.depth = filepath.replace(new RegExp(`${this.rootPath}?/`, 'i'), '').split('/');
    let [artist, album, track] = this.depth;

    //depth of 1 is artist
    if(this.depth.length === 1) this.artists.push({name: artist});
    
    //depth of 2 is album
    if(this.depth.length === 2){
      this.albums.push({
        title: album,
        artist_name: artist,
      });
    } 

    //depth of 3 is track
    if(this.depth.length === 3){
      this.tracks.push({
        path: track,
        album_title: album,
        artist_name: artist,
      });
    } 
    
    // if the filepath has children...
    return new Promise((resolve, reject) => {
      fs.readdir(filepath, (err, files) => {
        //create array of full paths with found filenames and add to process_files array
        if (files) this.process_files.push(...files.filter(file => !/^\./.test(file)).map(fileName => `${filepath}/${fileName}`));
        //pop the first item off the array and invoke create
        this.child = this.process_files.pop();
        //if this.child has a value then there are still files to process, else the array is empty and you are done
        if (this.child) return resolve(this.create(this.child)); 
        //once the traverse is finished, write the data to a file
        return this.write()
          .then(resolve)
          .catch(reject);
      });
    });
  }

  write(){  
    return new Promise((resolve, reject) => {
      return fs.writeFile('./import-data/collection.json', JSON.stringify({
        artists: this.artists,
        albums: this.albums,
        tracks: this.tracks,
      }),
      (err) => {
        if (err) return reject(new Error('Failure to write import data'));
        return resolve('./import-data/collection.json');
      });
    });
  }
};