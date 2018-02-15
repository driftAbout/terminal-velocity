'use strict';

const server = require('./lib/server');
const songPlayer = require('./lib/song-player');
const Queue = require('./lib/queue');

let myQueue = new Queue();
myQueue.enqueue('/home/jeremy/Music/pseudo-artist2/Some-album2/1.mp3');
myQueue.enqueue('/home/jeremy/Music/pseudo-artist2/Some-album2/1.mp3');
myQueue.enqueue('/home/jeremy/Music/pseudo-artist2/Some-album2/1.mp3');
myQueue.enqueue('/home/jeremy/Music/pseudo-artist2/Some-album2/1.mp3');
console.log('My Dequeue:', myQueue.dequeue().path)


server.start();

