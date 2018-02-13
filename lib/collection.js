'use strict';

const fs = require('fs');

const File = class {
  constructor (title, path) {
    this.path = path;
    this.title = title;
    this.children = [];
  }
};

module.exports = class {
  constructor (rootDirectory) {
    this.root = new File ('Music', rootDirectory);
  }
  import (current, parent) { // O(n)
    if (parent) parent.children.push(current);
    fs.readdir(current.path, (err, files) => {
      if (files) files.forEach((fileName) => {
        this.import(new File (fileName, `${current.path}/${fileName}`), current);
      });
    });
  }
};