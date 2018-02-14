'use strict';

// App dependencies
require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const errorHandler = require('./error-handler');
const debug = require('debug')('http:server');

// App setup
const app = express();
const PORT = process.env.PORT;
const router = express.Router();
const MONGODB_URI = process.env.MONGODB_URI;

debug('PORT', PORT);

// Middleware
app.use(cors());
app.use('/api/v1', router);
//require('../route/route-track')(router);
require('../route/route-import')(router);
require('../route/route-playlist')(router);
app.all('/{0,}', (req, res) => errorHandler(new Error('Path Error'), res));

// Server controls
const server = module.exports = {};
server.start = () => {
  return new Promise((resolve, reject) => {
    if(server.isOn) return reject(new Error('Server Error. Cannot start server on the same port when it is already running.'));

    debug('Server started!');
    server.http = app.listen(PORT, () => {
      console.log(`Listening on ${PORT}`);
      server.isOn = true;
      mongoose.connect(MONGODB_URI);
      debug('Mongo started!');
      return resolve(server);
    });
  });
};

// server.stop = () => {
//   return new Promise((resolve, reject) => {
//     if(!server.isOn) return reject(new Error('Server Error. Cannot stop server that is not running.'));
//     server.isOn = false;
//     debug('Server stopped!');
//     server.http.close(() => {
//       //server.isOn = false;
//       mongoose.disconnect();
//       return resolve();
//     });
//   });
// };

server.stop = () => {
  return new Promise((resolve, reject) => {
    if(!server.isOn) return reject(new Error('Server Error: Server is already stopped.')); 
    server.isOn = false; 
    server.http.close(() => { 
      console.log('Server has stopped listening');
      setTimeout( function () {
        mongoose.disconnect(() => console.log('Mongoose connection closed'));
      }, 500);
    });
  });
};