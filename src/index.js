//import _ from 'lodash';
import Ship from './ship';
import Grid from './grid';
import Player from './player';

let player = Player();
let opponent = Player();
let playerGrid;
let playerMap;

function playerInputHandler(coordinate) {
        console.log(coordinate);
        let col = parseInt(coordinate[1]);
        let row = parseInt(coordinate[3]);
        console.log("you clicked on c:"+col+" r: "+row);
        // if player makes a hit
        if(player.damage(opponent, [col,row])){
            console.log("You got a hit!");
            playerMap.markHit([col,row], "opponent");

            if(opponent.isDead()){
                player.stop(playerMap);
                console.log("You won!");
            }

        }else{
            console.log("oponnent's turn");
            player.stop(playerMap);
            playerMap.markMiss([col,row], "opponent");

            let pos = opponent.getNextMove();
            console.log("opponent's move: "+pos);
            while(opponent.damage(player, pos)){
                player.gameboard.gridDOM.markHit(pos,"player");
                if(player.isDead()){
                    console.log("You Lost. The machine has won");
                    return;// ensures that player does not get enabled
                }
                pos = opponent.getNextMove();
                console.log("opponent's move: "+pos);
            }
            console.log("opponent's move was a miss!");
            player.gameboard.gridDOM.markMiss(pos,"player");// 
            player.go(playerMap);
        }
        // body...
    }

window.onload = function(){

	let gameOver = false;
	// create and set gameboard and its ships
	
	// player
	player.gameboard.setCoordinates(); // for now
	// opponent/computer
	opponent.gameboard.setCoordinates();// we will need to see its gameboard in console to test it out
	// create and display player's grid DOM
	playerGrid = document.getElementById('playerGrid');
	player.gameboard.createGridDOM("player", playerGrid);// shows ships
	// player's opponent Map
	playerMap = Grid({ playerName: "opponent"}, "playerInputHandler(this.id)");
	playerMap.display(document.getElementById('opponentGrid'));

}


//window.Grid = Grid;
window.opponent = opponent;
window.player = player;
window.playerInputHandler = playerInputHandler;
//window.opponentMap = opponentMap;
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
