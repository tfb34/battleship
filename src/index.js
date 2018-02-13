import Ship from './ship';
import Grid from './grid';
import Player from './player';

let player = Player();
let opponent = Player();
let playerGrid;
let playerMap;

function playerInputHandler(coordinate) {

    let col = parseInt(coordinate[1]);
    let row = parseInt(coordinate[3]);
        
    // if player makes a hit
    if(player.damage(opponent, [col,row])){
    
        playerMap.markHit([col,row], "opponent");
        
        let ship = opponent.getShip([col,row]);
        if(opponent.isShipSunk(ship)){
            opponent.showShipSunk(ship, "opponent");
        }
        if(opponent.isDead()){
            player.stop(playerMap);
            let displayWinner = document.getElementById('display-winner');
            displayWinner.innerHTML = "You Win!";
            displayWinner.appendChild(getRestartBtn());
        }

    }else{// computer's turn
            
        player.stop(playerMap);
        playerMap.markMiss([col,row], "opponent");

        let refreshId = setInterval(function(){
            
            // AI thinks of a move
            let pos = opponent.getNextMove();
            // makes move 
            if(!opponent.damage(player, pos)){// no hit
                
                player.gameboard.gridDOM.markMiss(pos,"player"); 
                player.go(playerMap);
                clearInterval(refreshId);
            }else{// hit
                player.gameboard.gridDOM.markHit(pos,"player");
                opponent.workspace.push(pos);// increase workspace
                // check if this pos led to a ship sinking
                if(opponent.isFinalBlow(player,pos)){
                    opponent.clearWorkspace();
                }

                if(player.isDead()){
                    let displayWinner = document.getElementById('display-winner');
                    displayWinner.innerHTML = "You Lose.";
                    displayWinner.appendChild(getRestartBtn());
                    clearInterval(refreshId);// ensures that player does not get enabled
                }
            }
        }, 2000);

    }
       
}


window.onload = function(){
	
	// player
	player.gameboard.setCoordinates(); // for now
	// opponent/computer
	opponent.gameboard.setCoordinates();

	playerGrid = document.getElementById('playerGrid');
    // player grid
	player.gameboard.createGridDOM("player", playerGrid);// shows ships
	// opponent grid
	playerMap = Grid({ playerName: "opponent"}, "playerInputHandler(this.id)");
	playerMap.display(document.getElementById('opponentGrid'));

}

function play(){
    console.log("clicked on play");
    let cover = document.getElementById('cover');
    cover.className += " hide";
    cover.style.backgroundColor = "rgba(0, 0, 0, 0)";
    let playBtn = document.getElementsByClassName('play-btn')[0];
    playBtn.className += " hide";
    let randomizeBtn = document.getElementsByClassName('options')[0];
    randomizeBtn.className += " hide";
}

function getRestartBtn(){
    let restartBtn = document.createElement('a');
    restartBtn.innerHTML = "&#8634;";
    restartBtn.setAttribute("class", "restart-btn");
    restartBtn.setAttribute("onclick", "restart()");
    return restartBtn;
};

function randomize(){
    clearPlayerGrid();
    player = Player();
    player.gameboard.setCoordinates();
    player.gameboard.createGridDOM("player", playerGrid);

}

function clearPlayerGrid(){
    let grid = document.getElementById('playerGrid');
    while(grid.firstChild){
        grid.removeChild(grid.firstChild);
    }
}

function restart(){
    location.reload();
}

window.opponent = opponent;
window.player = player;
window.playerInputHandler = playerInputHandler;
window.randomize = randomize;
window.play = play;
window.restart = restart;