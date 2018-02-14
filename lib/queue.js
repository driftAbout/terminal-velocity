'use strict'

const player = require('./song-player.js');

class Song {
  constructor(path) {
    this.path = path;
    this.next;
  }
}

module.exports = class Queue {
  constructor(stack) {
    this.front;
    this.back;
    this.history = stack;
  }

  enqueue(path) {
    let song = new Song (path);
    this.back ? this.back.next = song : this.front = song;
    this.back = song;
  }

  dequeue() {
    if(!this.front && !this.back) throw new Error('Queue is empty.');

    let currentSong = this.front;
    this.front = this.front.next;
    if(!this.front) this.back = null;
    currentSong.next = null;
    console.log(`now playing ${currentSong.title}`);
    player.play(`${currentSong.filePath}`);
    this.history.push(currentSong);
  }

  revert() {
    if (!this.history.top) throw new Error('History is empty.');
    this.front = this.history.pop();
    this.dequeue();
  }
};
