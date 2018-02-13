
'use strict';

const cli_translate = require('./lib/cli-translate'); 
const server = require('./lib/server');

server.start();

cli_translate.listen();


