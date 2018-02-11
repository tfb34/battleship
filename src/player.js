import Gameboard from './gameboard';


const Player = () => {

	let turn;
	let gameboard = Gameboard();
    let successfulAttacks = [];
    let missedAttacks = [];

	function damage(enemy,pos){

        if(enemy.recieveAttack(pos)){
            this.successfulAttacks.push(pos);
            return true;
        }else{
            this.missedAttacks.push(pos);
            return false;
        }
	};

	function stop(playerMap){
        playerMap.disable();
	};

	function go(playerMap){
        playerMap.enable();
	};

    function recieveAttack(pos){
        return this.gameboard.recieveAttack(pos) ? true : false;
    };

    function isShipSunk(ship){
        return ship.isSunk();
    }

    function getShip(pos){ 
        return this.gameboard.getShip(pos);
    }

    function showShipSunk(ship,id){

        for(let i = 0; i< ship.length; i++){
            let col = ship.coordinates[i][0];
            let row = ship.coordinates[i][1];
            let cell = document.querySelectorAll('#'+id+' #c'+col+'r'+row)[0];
            cell.className += ' wrecked';
        }
    }

    function getNextMove(){
        let pos = _getRandomCoordinate();
        
        while(!_isValid(this, pos)){
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
        isDead,
        isShipSunk,
        showShipSunk,
        getShip,
        successfulAttacks,
        missedAttacks
	}

};


export default Player;

// prevents AI from making the same move twice
function _isValid(player, pos){
    let sA = player.successfulAttacks;
    
    for(let i = 0; i< sA.length; i++){
        if(sA[i][0] === pos[0] &&  sA[i][1] === pos[1]){
            return false;
        }
    }
    let missedHits = player.missedAttacks;
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
