'use strict';

const Node = class {
  constructor (value) {
    this.value = value;
    this.next = null;
  }
};

module.exports = class {
  constructor() {
    this.top = null;
  }
  push(value) {
    let node = new Node(value);

    node.next = this.top;
    this.top = node;
    return this.top.value;
  }

  pop() {
    let temp = this.top;
    this.top = temp.next;
    temp.next = null;

    return temp.value;
  }

  peek() {
    return this.top;
  }
};
