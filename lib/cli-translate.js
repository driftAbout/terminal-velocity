'use strict';

require('dotenv').config();
const superagent = require('superagent');
const debug = require('debug')('http:cli-translate'); 
const EventEmitter = require('events');
class CommandEvent extends EventEmitter {};
const commandEvent = new CommandEvent();
const listen = process.stdin;
const reply = process.stdout;
const player = require('./audio-player');
const child_process = require('child_process')

const url_base = (`:${process.env.PORT}/api/v1`);

debug('url_base', url_base);

const translate = module.exports = {};

translate.listen = () => {
  reply.write('\nwillkommen!\nVas ist das musik?\n');
  listen.setEncoding('utf8');
  listen.on('data', commandHandler);
};


translate.quit = () => {
  reply.write('Goodbye...\n');
  process.exit();
};

function commandHandler(data){
  //reply.write(`process.pid: ${process.pid} `);
  if (/^play/i.test(data.trim()) ) return commandEvent.emit('play', data);
  if (data.match(/quit/i)) return translate.quit();
  reply.write(`I don't know how to ${data}`);
}

commandEvent.on('play', (cmdline) => {

  let cmd = cmdline.replace(/play /i, '').trim().split(' ').join('/'); 
  
  return superagent.get(`${url_base}/play/${cmd}`) 
    .then(res => {
      reply.write(`${JSON.stringify(res.body)}\n`);
     // player.play();
      //childProcess.spawn("<cmd>", [], {shell: true, detached: true});
      const newPlayer = child_process.spawn(`${__dirname}/audio-player.js`, [], {detached: true});
    })
    .catch(console.error);

});