'use strict';

const Queue = require('./lib/queue.js');
const Stack = require('./lib/stack.js');
const Collection = require('./lib/collection.js');
// const newCollection = require('./lib/iterativeCollection.js');

// const rootDirectory = './music';
const rootDirectory = '/home/jordan/Music';

let collection = new Collection (rootDirectory);
let history = new Stack ();
let queue = new Queue (history);


// newCollection('music', rootDirectory).then(console.log);

collection.create(collection.rootName, collection.rootPath);
// console.log(collection.create(collection.rootName, collection.rootPath));

// console.log("tree", tree); // NOTE needs to be called asynchronously

// queue.enqueue(collection.children[0].children[0].children[0]);
// queue.enqueue('./music/King Gizzard & The Lizard Wizard/Polygondwanaland/01 - Crumbling Castle.mp3');
// queue.enqueue('./music/King Gizzard & The Lizard Wizard/Polygondwanaland/02 - Polygondwanaland.mp3');
// queue.dequeue();
