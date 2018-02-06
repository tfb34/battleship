import _ from 'lodash';
import ship from './ship';
import Grid from './grid';


window.onload = function(){
	let g = Grid({ playerName: 'player1'});
	g.display(document.getElementById('playerGrid'));

	let o = Grid({playerName: 'opponent'});
	o.display(document.getElementById('opponentGrid'));
}


window.Grid = Grid;
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
