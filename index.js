'use strict';

const Queue = require('./lib/queue.js');
const Collection = require('./lib/collection.js');

const rootDirectory = './music';
// const rootDirectory = '/home/jordan/Music';

let collection = new Collection (rootDirectory);

collection.import(collection.root);
// console.log("tree", tree); // NOTE needs to be called asynchronously

// let queue = new Queue ();
// queue.enqueue('./music/1.mp3');
// queue.enqueue('./music/1.mp3');
// queue.dequeue();
