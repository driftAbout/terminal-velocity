'use strict';

const Song = class {
  constructor (path) {
    this.path = path;
    this.next = null;
  }
}

module.exports = class {
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
