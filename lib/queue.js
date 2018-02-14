'use strict'

const player = require('./song-player.js');

class Song {
  constructor(path) {
    this.path = path;
    this.next;
  }
}

class History {
  constructor() {
    this.top = null;
  }
  push(path) {
    let song = new Song(path);
    song.next = this.top;
    this.top = song;
    return this.top.path;
  }
  pop() {
    let temp = this.top;
    this.top = temp.next;
    temp.next = null;
    return temp.path;
  }
};

module.exports = class Queue {
  constructor() {
    this.front;
    this.back;
    this.history = new History();
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
    player.play(`${currentSong}`);
    this.history.push(currentSong);
  }

  revert() {
    if (!this.history.top) throw new Error('History is empty.');
    this.front = this.history.pop();
    this.dequeue();
  }
};
