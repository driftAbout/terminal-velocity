'use strict';

const player = require('./song-player.js');

class Song {
  constructor(file) {
    this.file = file;
    this.next;
  }
}

module.exports = class Queue {
  constructor(stack) {
    this.front;
    this.back;
    this.history = stack;
  }


  enqueue(filePath) {
    let song = new Song(filePath); // takes in a File object, with a title, path, and children
    this.back ? this.back.next = song : this.front = song;
    this.back = song;
  }

  dequeue() {
    if(!this.front && !this.back) throw new Error('Queue is empty.');

    let currentSong = this.front;
    this.front = this.front.next;
    if(!this.front) this.back = null;
    currentSong.next = null;
    // console.log(`now playing ${currentSong.title}`);
    player.play(`${currentSong}`);
    this.history.push(currentSong);
  }
};
