'use strict';

const History = require('./history.js');

class Song {
  constructor(path) {
    this.path = path;
    this.next;
  }
}

module.exports = class Queue {
  constructor() {
    this.front = null;
    this.back = null;
    this.lastPlayed;
    this.history = new History();
  }

  enqueue(filePath) {
    let song = new Song(filePath);
    this.back ? this.back.next = song : this.front = song;
    this.back = song;
  }

  dequeue() {
    if(!this.front && !this.back) return;

    let currentSong = this.front;
    this.front = this.front.next;
    if(!this.front) this.back = null;
    currentSong.next = null;
    if (this.lastPlayed) this.history.push(this.lastPlayed);
    this.lastPlayed = currentSong;
    return currentSong;
  }

  requeue() {
    if (!this.history.top) return;

    let current = this.lastPlayed;
    current.next = this.front;
    this.front = current;

    let previous = this.history.pop();
    previous.next = this.front;
    this.front = previous;

    this.lastPlayed = null;
    return this.dequeue();
  }
};
