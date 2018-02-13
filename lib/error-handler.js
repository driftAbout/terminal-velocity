'use strict';

module.exports = function (err, res) {
  let msg = err.message.toLowerCase();

  if(msg.includes('item not found')) {
    return res.status(404).send(`${err.name}: ${err.message}`);
  }

  return res.status(500).send(`${err.name}: ${err.message}`);
};