import Gameboard from './gameboard';


const Player = () => {

	let turn;
	let gameboard = Gameboard();
    let successfulAttacks = [];
    let missedAttacks = [];
    // ai
    let workspace = [];

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

    function isFinalBlow(enemy, hit){
        let ship = enemy.getShip(hit);
        return enemy.isShipSunk(ship);
    }

    function showShipSunk(ship,id){

        for(let i = 0; i< ship.length; i++){
            let col = ship.coordinates[i][0];
            let row = ship.coordinates[i][1];
            let cell = document.querySelectorAll('#'+id+' #c'+col+'r'+row)[0];
            cell.className += ' wrecked';
        }
    }
    // utilize workspace
    function getNextMove(){
        let pos;
        if(this.workspace.length > 0){// hit?
            let latestHitPos = this.workspace[this.workspace.length - 1];
            // get array of adj. positions to latest hit position
            let adjPositions = _getValidAdjPositions(this,latestHitPos);
            while(adjPositions.length === 0){
                this.workspace.pop();
                latestHitPos = this.workspace[this.workspace.length - 1];
                adjPositions = _getValidAdjPositions(this,latestHitPos);
            }
            // choose among valid adjacent positions
            pos = _getEducatedGuess(adjPositions);
        }else{
            pos = _getRandomCoordinate();
            while(!_isValid(this, pos)){
                pos = _getRandomCoordinate();
            }
        }
        
        return pos;
    };

    function isDead(){
        return this.gameboard.isGameOver();
    };

    function clearWorkspace(){
        while(this.workspace.length>0){
            this.workspace.pop();
        }
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
        missedAttacks,
        clearWorkspace,
        workspace,
        isFinalBlow
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
// problem: not getting valid adj positions
function _getValidAdjPositions(player,pos){
    let validAdjPos = [];
    let col = pos[0];
    let row = pos[1];
    // cell above
    if(!_isOutOfBounds([col,row-1]) && _isValid(player,[col,row-1])){
        validAdjPos.push([col,row-1]);
    }
    // cell on right side
    if(!_isOutOfBounds([col+1,row]) && _isValid(player,[col+1,row])){
        validAdjPos.push([col+1,row]);   
    }
    // cell below
    if(!_isOutOfBounds([col,row+1]) && _isValid(player,[col,row+1])){
        validAdjPos.push([col,row+1]);
    }
    // cell on left side
    if(!_isOutOfBounds([col-1,row]) && _isValid(player,[col-1,row])){
        validAdjPos.push([col-1,row]);
    }

    return validAdjPos;
}

function _isOutOfBounds(pos){
    
    if(pos[0] > 9 || pos[0] < 0 || pos[1] > 9 || pos[1] < 0){
        return true;
    }
    return false;
}

function _getEducatedGuess(arr){
    let i = Math.floor(Math.random() * arr.length);
    return arr[i];
}