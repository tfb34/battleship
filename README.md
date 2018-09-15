# Battleship

Battleship is a guessing game for two players. In this game you will be playing against the computer. Each player gets a 10x10 grid to place their fleets of ships on. The locations of the fleet are concealed from the other player. Players take turns calling "shots" at the other player's ships. The objective of the game is to destroy the other player's fleet. For more information, <a href="https://en.wikipedia.org/wiki/Battleship_(game)">Battleship(game) wikipedia.</a>

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development purposes. See deployment for notes on how to deploy the project on a live system. 

## Prerequisites

Before you begin, make sure you have the latest version of <a href="https://nodejs.org/en/download/">Node.js</a> installed. You will need Node.js to use the module bundler, Webpack. You will also need a text editor (i.e. Notepad++, Sublime, etc).

## Installing

1. On GitHub, click on the <b>clone or download</b> button and copy  URL.
2. Open your terminal or command line.
3. Change the current working directory to the location where you want the project.
4. Type git clone, and then paste the URL you copied earlier.
```
$ git clone https://github.com/tfb34/battleship.git
```
5. Press Enter. You should now have a copy of the project on your computer.
## Development
1. Open your text editor and open the folder where the project resides. 
2. When making changes to any of the files in /src make sure to save and run npx webpack in terminal/cmd. 
```
$ npx webpack
```
3. To see your changes, go to /dist and open index.html with browser of your choice. 
## Problems
If by any chance you are getting errors when trying to bundle the files, then delete node_modules and package-lock.json. 
Now make a local installation of webpack :
```
npm install --save-dev webpack
```
Install the webpack-cli(the tool used to run webpack on the command line):
```
npm install webpack webpack-cli --save-dev
```
Now trying running npx webpack again and it should now successfully create a bundle. 

## Deployment
<a href="https://tfb34.github.io/battleship/">Play in Browser</a>



