'use strict';

const listen = process.stdin;
const reply = process.stdout;

const translate = module.exports = {};

translate.listen = () => {

  listen.setEncoding('utf8');
  listen.on('data', commandHandler);

  const commandHandler = (data) => {
    //process.pid
    reply.write(data);
  };

};


translate.quit = () => {
  process.exit();
};