'use strict';

var mpg = require('mpg123');
 
var player = new mpg.MpgPlayer();
 
player.play("./music/1.mp3");