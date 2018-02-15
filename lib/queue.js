'use strict';

class Song {
  constructor(path) {
    this.path = path;
    this.next;
  }
}

class History {
  constructor() {
    this.top = null;
    this.bottom = null;
    this.size = 0;
  }
  push(path) {
    let song = new Song(path);
    this.top ? this.top.next = song : this.bottom = song;
    this.top = song;
    this.size++;

    if (this.size > 10) {
      let temp = this.bottom;
      this.bottom = this.bottom.next;
      temp.next = null;
      this.size--;
    }
    // return this.top.path;
  }
  pop() {
    for (var cur = this.bottom; cur.next.next; cur = cur.next);
    let temp = this.top;
    this.top = cur;
    cur.next = null;
    return temp.path;
  }
}

module.exports = class Queue {
  constructor() {
    this.front;
    this.back;
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
