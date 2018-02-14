
'use strict';

const songPlayer = require('./lib/song-player');
const collectionGen = require('./lib/jeremycollection');


//collection.import needs to return structure:
// {
//   Artists:[{Artist Schema Object}, {Artist Schema Object}, {Artist Schema Object}, ...],      FOLDERS IN SPECIFIED DIR (TOP LEVEL)
//   Albums:[{Album Schema Object}, {Album Schema Object}, {Album Schema Object}, ...],          FOLDERS IN ARTIST FOLDERS (2ND LEVEL)
//   Tracks:[{Track Schema Object}, {Track Schema Object}, {Track Schema Object}, ...]           MP3 FILES IN ALBUM FOLDERS (3RD LEVEL)
// }