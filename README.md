
	
	 ______                                                ___       __  __          ___                       __                
	/\__  _\                          __                  /\_ \     /\ \/\ \        /\_ \                   __/\ \__             
	\/_/\ \/    __   _ __    ___ ___ /\_\    ___      __  \//\ \    \ \ \ \ \     __\//\ \     ___     ___ /\_\ \ ,_\  __  __    
	   \ \ \  /'__`\/\`'__\/' __` __`\/\ \ /' _ `\  /'__`\  \ \ \    \ \ \ \ \  /'__`\\ \ \   / __`\  /'___\/\ \ \ \/ /\ \/\ \   
	    \ \ \/\  __/\ \ \/ /\ \/\ \/\ \ \ \/\ \/\ \/\ \L\.\_ \_\ \_   \ \ \_/ \/\  __/ \_\ \_/\ \L\ \/\ \__/\ \ \ \ \_\ \ \_\ \  
	     \ \_\ \____\\ \_\ \ \_\ \_\ \_\ \_\ \_\ \_\ \__/.\_\/\____\   \ `\___/\ \____\/\____\ \____/\ \____\\ \_\ \__\\/`____ \ 
	      \/_/\/____/ \/_/  \/_/\/_/\/_/\/_/\/_/\/_/\/__/\/_/\/____/    `\/__/  \/____/\/____/\/___/  \/____/ \/_/\/__/ `/___/> \
	                                                                                                                       /\___/
	                                                                                                                       \/__/ 

[BADGES HERE]

## General information
**_Authors_**: 
* Jeremy Pearson: https://github.com/jpjazzy
* Kevin Miller: https://github.com/driftAbout
* Jordan Van Ness: https://github.com/Jordanwvn
* Jamie Williams: https://github.com/jlwilliams46
* Rima Hiraoka: https://github.com/Sobacha

**_Version_**: 1.0.0

**_Libraries_**: debug, faker, jest, body-parser, cors, dotenv, eslint, express, mongoose, mpg123, superagent

**_Last modified_**: 2/13/2018

## About the app

Terminal velocity music player that you can store playlists to save to a database for persistance and see what kind of music your friends are into. Terminal velocity will allow you to play music from your terminal, however if you don't have the music stored locally you will not be able to listen. 

## How to use

**NOTE**: To use this player you will need to install mpg123
*For install instructions on mpg123, please visit*: https://www.npmjs.com/package/mpg123

 1. Open new terminal window to be used for the music player (will take up command line listener while playing)
 2. Install mpg123 
 3. Install project dependencies
 4. Use the following commands to control your music:


		-	play (path) - [Plays a file given a path]
		-	import (path) - [imports a library given the folder structure Artist >> Album >> Track.mp3]
		-	pause - [Pauses current song]
		-	resume - [Resumes current song]
		-	volume up [Increases volume 20% if possible]
		-	volume down [Decreases volume 20% if possible]
		-	track info [Gets information on track in the terminal]
 		-	help or ? [Displays a list of commands]

## Tests

## Basic Structure

![Structure Overview](./images/terminal-velocity-diagram.png)

### Tree structure

[PROJECT TREE STRUCTURE WILL GO HERE]

## Routes

api/v1/play/:category/:id?


## Stretch goals

 - Add alternative music sources to pull music from
	 - Spotify
	 - YouTube
	 
 - Add music handling for multiple users