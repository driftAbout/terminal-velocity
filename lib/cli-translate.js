'use strict';

const listen = process.stdin;
const reply = process.stdout;

const translate = module.exports = {};

translate.listen = () => {

  listen.setEncoding('utf8');
  listen.on('data', commandHandler);
};


translate.quit = () => {
  reply.write('Goodbye...\n');
  process.exit();
};

function commandHandler(data){
  //reply.write(`process.pid: ${process.pid} `);
  if ( data.match(/play/i))  return reply.write(data);
  if (data.match(/quit/i)) return translate.quit();
  reply.write(`I don't know how to ${data}`);
}