'use strict'

class Song {
  constructor(path) {
    this.path = path;
    this.next;
  }
}

module.exports = class {
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
  }
  pop() {
    let temp = this.top;
    if (this.top === this.bottom) {
      this.top = null;
      this.bottom = null;
    } else {
      for (var cur = this.bottom; cur.next.next; cur = cur.next);
      this.top = cur;
      cur.next = null;
    }
    return temp.path;
  }
};
