//import _ from 'lodash';
import Ship from './ship';
import Grid from './grid';
import Player from './player';

let player = Player();
let opponent = Player();

window.onload = function(){
	/**
	let g = Grid({ playerName: 'player1'});
	g.display(document.getElementById('playerGrid'));

	let o = Grid({playerName: 'opponent'});
	o.display(document.getElementById('opponentGrid'));
*/

	let gameOver = false;
	// create and set gameboard and its ships
	

	player.gameboard.setCoordinates(); // for now
	opponent.gameboard.setCoordinates();// we will need to see its gameboard in console to test it out
	let playerGrid = document.getElementById('playerGrid');
	player.gameboard.createGridDOM("player", playerGrid);// shows ships

	/**
	let opponentMap = Grid({ playerName: "opponent" });

	let currentPlayer = player;
	while(!gameOver){

	}
	console.log("game is over");
	*/
}


//window.Grid = Grid;
window.opponent = opponent;
window.player = player;
/*
let battleship = ship({length: 5});
console.log(battleship);

function component() {
  var element = document.createElement('div');

 // lodash, now imported by this script
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');

  return element;
}*/

/**
	creates players and sets coordinates for now without user input

	randomly assign players turn, changes 
	let gameOver = false;
	while game is not over
	if(player1.turn){

         let them attack,
         check if other players all ships r sunk then game is over = true, 
         until no hits
         next player's turn

	}else{
		AI
	}*/
/**
let gameOver = false;

while(!gameOver){
	if(player1.turn){

	}else{
		//disable board by adding something over it where player cant click on anything
	}
}

*/

//document.body.appendChild(component());
