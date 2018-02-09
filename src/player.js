import Gameboard from './gameboard';


const Player = () => {

	let turn;
	let gameboard = Gameboard();

	function damage(enemy,pos){
        return enemy.recieveAttack(pos) ? true : false;
	};

	function stop(playerMap){
		//this.gameboard.grid.disable();
        playerMap.disable();
	};

	function go(playerMap){
		//this.gameboard.grid.enable();
        playerMap.enable();
	};

    function recieveAttack(pos){
        return this.gameboard.recieveAttack(pos) ? true : false;
    };

    // for now make a random move
    // return it only if it doesn't exist in missedMoves or hitMoves
    function getNextMove(){
        let pos = _getRandomCoordinate();

        while(!_isValid(this.gameboard, pos)){
            pos = _getRandomCoordinate();
        }

        return pos;
    };

    function isDead(){
        return this.gameboard.isGameOver();
    };
    
	return {
		gameboard,
		damage,
		stop,
        go,
        recieveAttack,
        getNextMove,
        isDead
	}

};


export default Player;

// prevents AI from making the same move twice
function _isValid(gameboard, pos){
    let sA = gameboard.successfulAttacks;
    console.log(sA);
    for(let i = 0; i< sA.length; i++){
        if(sA[i][0] === pos[0] &&  sA[i][1] === pos[1]){
            return false;
        }
    }
    let missedHits = gameboard.missedAttacks;
    for(let x =0; x< missedHits.length; x++){
        if(missedHits[x][0] === pos[0] && missedHits[x][1] === pos[1]){
            return false;
        }
    }
    return true;
};

function _getRandomCoordinate(){
    let col = Math.floor(Math.random() * 10);
    let row = Math.floor(Math.random() * 10);
    return [col,row];
}
