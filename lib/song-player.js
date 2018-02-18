'use strict';
const cmd = require('./cmds');

const songPlayer = module.exports = {}; // Create object and attach needed information
songPlayer.listen = process.stdin;
songPlayer.listen.setEncoding('utf8');

songPlayer.listen.on('data', (data) => {
  if (!data) return new Error('Error: No data.');
  data = data.trim().split(' '); 
  if(!cmd[data[0]]) return songPlayer.error();
  let parsedParams = songPlayer.parseData(data.join(' '));
  cmd[data[0]](...parsedParams);
});
  
songPlayer.parseData = function(str) {
  if (! /"/.test(str) ) return str;
  let ret = str.match(/"(.*?)"/g);
  ret = ret.map(quotedString => quotedString.split('"')[1]);
  return ret;
};

songPlayer.error = () => {
  process.stdout.write('\nCommand not recognized or invalid. Type help for commands.\n');
};

 