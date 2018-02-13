/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {



const Ship = ({length}) => {

	let totalHits = 0;

	let bodyHits = [];

	let coordinates = [];

	function isSunk(){
		return this.totalHits === length ? true : false;
	};

	function hit(x){
		this.bodyHits.push(x);
		this.totalHits += 1;
	};

	function setPosition(arr){
		for(let i=0; i<arr.length; i++){
			this.coordinates.push(arr[i]);
		}
	};

	function isHit(pos){
		for(let i=0; i<this.coordinates.length; i++){
			let col = this.coordinates[i][0];
			let row = this.coordinates[i][1];

			if(pos[0] === col && pos[1] === row){
				return true;
			}
		}
		return false;
	};

	return{
		length,
		bodyHits,
		totalHits,
		coordinates,
		isSunk,
		hit,
		setPosition,
		isHit
	}

};

module.exports = Ship;

/***/ }),
/* 1 */
/***/ (function(module, exports) {


const Grid = ({playerName}) => {

	let grid = _renderGrid(playerName);

	function display(x){
		if(x){
			x.appendChild(this.grid);
		}else{
			document.getElementsByTagName('body')[0].appendChild(this.grid);
		}
	};

	// called when it's player's turn
	function enable(){
		document.getElementById('cover').className = "hide";
	}

	// called when it's opponent's turn
	function disable(){
		document.getElementById('cover').className = "show";
	};

	function markHit(pos, id){
		let col = pos[0];
		let row = pos[1];
		let cell = document.querySelectorAll('#'+id+' #c'+col+'r'+row)[0];
		cell.innerHTML = 'X';
		cell.className += ' hit';
		if(id === "opponent"){
			cell.setAttribute("onclick", "");
		}
	}

	function markMiss(pos, id){
		let col = pos[0];
		let row = pos[1];
		let cell = document.querySelectorAll('#'+id+' #c'+col+'r'+row)[0];
		cell.innerHTML = '&#9679;';
		cell.className += ' miss';
		if(id === "opponent"){
			cell.setAttribute("onclick", "");
		}
	}
	// use this function in gameboard module. traverse all the coordinates and update gameboard's grid
	function markShip(pos){
		let col = pos[0];
		let row = pos[1];
		let cell = document.querySelectorAll('#player #c'+col+'r'+row)[0];
		cell.className += ' ship';
	}

	return {
		playerName,
		grid,
		display,
		enable,
		disable,
		markShip,
		markMiss,
		markHit
	}
};


function _renderGrid(playerName){
	let table = document.createElement('table');
	table.setAttribute('id',playerName);//player or opponent

	let tbody = document.createElement('tbody');

	let header_tr = document.createElement('tr');
	header_tr.setAttribute('class', 'table-header');

	let null_td = document.createElement('td');
	header_tr.appendChild(null_td);

	for(let l = 65; l<75;l++){
		let td = document.createElement('td');
		td.innerHTML = String.fromCharCode(l); 
		header_tr.appendChild(td);
	}

	tbody.appendChild(header_tr);
	// 11 rows // 11 columns
	for(let r = 0; r<10; r++){
		let tr = document.createElement('tr');
		tr.setAttribute('id','battleship-row-'+r);

		let rowNum = document.createElement('td');
		rowNum.setAttribute('class', 'table-y-values');
		rowNum.innerHTML = r;

		tr.appendChild(rowNum);

		for(let c = 0; c<10; c++){// 11 columns
			let td = document.createElement('td');
			td.setAttribute('id','c'+c+'r'+r);
			if(playerName === 'opponent'){
				td.setAttribute('class', 'clickable');
				td.setAttribute('onclick', "playerInputHandler(this.id)");
			}
			tr.appendChild(td);
		}
		tbody.appendChild(tr);
	}

	table.appendChild(tbody);
	return table;
}

module.exports = Grid;



/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ship__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ship___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__ship__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__grid__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__grid___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__grid__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__player__ = __webpack_require__(3);




let player = Object(__WEBPACK_IMPORTED_MODULE_2__player__["a" /* default */])();
let opponent = Object(__WEBPACK_IMPORTED_MODULE_2__player__["a" /* default */])();
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
	playerMap = __WEBPACK_IMPORTED_MODULE_1__grid___default()({ playerName: "opponent"}, "playerInputHandler(this.id)");
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
    player = Object(__WEBPACK_IMPORTED_MODULE_2__player__["a" /* default */])();
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

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__gameboard__ = __webpack_require__(4);



const Player = () => {

	let turn;
	let gameboard = Object(__WEBPACK_IMPORTED_MODULE_0__gameboard__["a" /* default */])();
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


/* harmony default export */ __webpack_exports__["a"] = (Player);

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

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ship__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ship___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__ship__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__grid__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__grid___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__grid__);



const Gameboard = () => {
	let grid = _createGrid();
	let ships = _createShips();
	let gridDOM;

	function setCoordinates(){
		for(let i =0;i<this.ships.length; i++){
			let ship = this.ships[i];
			let coordinates = _getCoordinates(this.grid, ship.length);
			ship.setPosition(coordinates);
		}
	};

	function isGameOver(){
		for(let i=0;i<this.ships.length;i++){
			let ship = this.ships[i];
			if(!ship.isSunk()){
				return false;
			}
		}
        return true;
	};

    function getShip(pos){
        for(let i=0;i<this.ships.length;i++){
            let ship = this.ships[i];
            if(ship.isHit(pos)){
                return ship; 
            }
        }
    };

	function recieveAttack(pos){
		for(let i=0;i<this.ships.length; i++){
			let ship = this.ships[i];
			if(ship.isHit(pos)){
				ship.hit(pos);
				return true;
			}
		}
        return false;
	};

	function createGridDOM(name, location){
		this.gridDOM = __WEBPACK_IMPORTED_MODULE_1__grid___default()({ playerName : name });
		this.gridDOM.display(location);

		for(let i = 0;i<this.ships.length;i++){
			let coordinates = this.ships[i].coordinates;
			for(let x = 0; x < coordinates.length; x++){
				this.gridDOM.markShip(coordinates[x]);
			}
		}
	};
	

	return{
		grid,
		ships,
		setCoordinates,
		isGameOver,
		recieveAttack,
		gridDOM,
		createGridDOM,
        getShip
	}
};

/* harmony default export */ __webpack_exports__["a"] = (Gameboard);


// private

function _createGrid(){
	let arr = [];
	for(let i=0; i<10;i++){
		let a = [];
		for(let x = 0; x<10; x++){
			a.push('e');
		}
		arr.push(a);
	}
	return arr;
}

function _createShips(){
	let arr = [];

	let battleship = __WEBPACK_IMPORTED_MODULE_0__ship___default()({ length: 4 });

	let cruiser = __WEBPACK_IMPORTED_MODULE_0__ship___default()({ length: 3 });
	let cruiser2 = __WEBPACK_IMPORTED_MODULE_0__ship___default()({ length: 3 });

	let destroyer = __WEBPACK_IMPORTED_MODULE_0__ship___default()({ length: 2 });
	let destroyer2 = __WEBPACK_IMPORTED_MODULE_0__ship___default()({ length: 2 });
	let destroyer3 = __WEBPACK_IMPORTED_MODULE_0__ship___default()({ length: 2 });

	let submarine = __WEBPACK_IMPORTED_MODULE_0__ship___default()({ length: 1 });
	let submarine2 = __WEBPACK_IMPORTED_MODULE_0__ship___default()({ length: 1 });
	let submarine3 = __WEBPACK_IMPORTED_MODULE_0__ship___default()({ length: 1 });
	let submarine4 = __WEBPACK_IMPORTED_MODULE_0__ship___default()({ length: 1 });

	arr.push(battleship);
	arr.push(cruiser);
	arr.push(cruiser2);
	arr.push(destroyer);
	arr.push(destroyer2);
	arr.push(destroyer3);
	arr.push(submarine);
	arr.push(submarine2);
	arr.push(submarine3);
	arr.push(submarine4);
	return arr;
}


function _getCoordinates(grid, length){
	let found = false;
	let coords;
	while(!found){

		let col = Math.floor(Math.random() * 10);// 0 to 9
		let row = Math.floor(Math.random() * 10);
			
		if(grid[col][row] === 'e'){
			let dir = Math.floor(Math.random() * 2) ? "vertical" : "horizontal";
			if(dir === "vertical"){
				coords = _getVerticalCoords(grid, col,row,length);
				if(coords.length >0){
					found = true;
				}
			}else{
				coords = _getHorizontalCoords(grid, col,row,length);
				if(coords.length > 0){
					found = true;
				}
			}
		}
	}

	_updateBoard(grid, coords);
	return coords;
};

function _updateBoard(grid, coords){
	for(let i = 0; i < coords.length; i++){
		let col = coords[i][0];
		let row = coords[i][1];
		grid[col][row] = 'o'; // occupied
	}
};

function _getVerticalCoords(grid, col, row, length){

	let coordinates = [];
	if( (row + (length-1) < 10) && _isPathClear(grid,col,row,length,"down")){
		coordinates.push([col,row]);
		for(let i = 1; i<length; i++){
			coordinates.push( [col, row+i] );
		}
	}else if( (row - (length-1) > -1) && _isPathClear(grid, col,row,length,"up")){
		coordinates.push( [col,row]);
		for(let i = 1; i<length; i++){
			coordinates.push( [col, row-i] );
		}
	}

	return coordinates;
};


function _isPathClear(grid, col,row,length, dir){
    let coordinates = [];
	if(dir === "down"){
		for(let i = 0; i<length; i++){
			if(grid[col][row + i] === 'o'){
				return false
			}
            coordinates.push([col,row + i]);
		}
	}else if(dir === "up"){
		for(let i = 0; i<length; i++){
			if(grid[col][row - i] === 'o'){
				return false
			}
            coordinates.push([col,row - i]);
		}
	}else if(dir === "right"){
		for(let i = 0; i<length; i++){
			if(grid[col + i][row] === 'o'){
				return false;
			}
            coordinates.push([col + i, row]);
		}
	}else{
		for(let i = 0; i<length; i++){
			if(grid[col - i][row] === 'o'){
				return false;
			}
            coordinates.push([col - i,row]);
		}
	}

    let axis = dir === "up" || dir === "down" ? "vertical" : "horizontal";

    return _isBorderClear(grid,coordinates, axis);
	
};

function _getHorizontalCoords(grid, col, row, length){
		let coordinates = [];
		if( (col + (length-1) < 10) && _isPathClear(grid, col,row,length,"right")){
			// create some coords
			coordinates.push([col,row]);
			for(let i = 1; i<length; i++){
				coordinates.push( [col+i, row] );
			}
		}else if( (col - (length-1) > -1) && _isPathClear(grid, col,row,length, "left")){
			// create some coords
			coordinates.push( [col,row]);
			for(let i = 1; i<length; i++){
				coordinates.push( [col-i, row] );
			}
		}

		return coordinates;
};

function _isBorderClear(grid, coordinates, axis){
    return _isLeftSideEmpty(grid, coordinates,axis) && _isUpSideEmpty(grid, coordinates,axis) && _isRightSideEmpty(grid, coordinates,axis) && _isDownSideEmpty(grid, coordinates,axis) ? true : false
}
// given a [c,r] returns true only if it finds 'o' 
function _isCellTaken(grid,pos){
	let col = pos[0];
	let row = pos[1];

    if(col < 0 || col > 9){
        return false;
    }else if(row < 0 || row > 9){
        return false;
    }

	let cell = grid[col][row];

	let isTaken;
	if(cell){
		isTaken = cell === 'e' ? false : true;
	}else{
		isTaken = false;
	}
	// cell is out of bounds. so cell is not taken. 
	return isTaken;
}


function _isLeftSideEmpty(grid,coordinates, axis){

	let startPos;
	let lastPos;
    let col;

	if(coordinates.length === 1){
		col = coordinates[0][0];
		let row = coordinates[0][1];
		startPos = [col-1,row-1];
		lastPos = [col-1,row+1];
	}else if(axis === "horizontal"){
		let firstCoord = coordinates[0];
		let secCoord = coordinates[coordinates.length-1];
		col = Math.min(firstCoord[0], secCoord[0]);
		let row = firstCoord[1];
		startPos = [col-1,row-1];
		lastPos = [col-1,row+1];
	}else{// "vertical ?"
		let firstCoord = coordinates[0];
		let secCoord = coordinates[coordinates.length-1];
		let minRow = Math.min(firstCoord[1],secCoord[1]);
		let maxRow = Math.max(firstCoord[1],secCoord[1]);
		col = firstCoord[0];
		startPos = [col-1,minRow-1];
		lastPos = [col-1,maxRow+1];
	}

	if(col < 0){
        return true;
    }

	if(_isCellTaken(grid, startPos) || _isCellTaken(grid, lastPos)){
		return false;
	}
	col = startPos[0];
	let firstRow = Math.min(startPos[1], lastPos[1])+1;
	let lastRow = Math.max(startPos[1], lastPos[1]);

	for(let r = firstRow; r< lastRow; r++){
        if(_isCellTaken(grid, [col,r])){
            return false;
        }
	}
	return true;
}


function _isRightSideEmpty(grid, coordinates, axis) {
	let startPos;
	let lastPos;
    let col;

	if(coordinates.length === 1){
		col = coordinates[0][0];
		let row = coordinates[0][1];
		startPos = [col+1,row-1];
		lastPos = [col+1,row+1];
	}else if(axis === "horizontal"){
		let firstCoord = coordinates[0];
		let secCoord = coordinates[coordinates.length-1];
	    col = Math.max(firstCoord[0], secCoord[0]);
		let row = firstCoord[1];
		startPos = [col+1,row-1];
		lastPos = [col+1,row+1];
	}else{
		let firstCoord = coordinates[0];
		let secCoord = coordinates[coordinates.length-1];
		let minRow = Math.min(firstCoord[1],secCoord[1]);
		let maxRow = Math.max(firstCoord[1],secCoord[1]);
		col = firstCoord[0];
		startPos = [col+1,minRow-1];
		lastPos = [col+1,maxRow+1];
	}

    if(col > 9){
        return true;
    }
	
	if(_isCellTaken(grid, startPos) || _isCellTaken(grid, lastPos)){
		return false;
	}
	col = startPos[0];
	let firstRow = Math.min(startPos[1], lastPos[1])+1;
	let lastRow = Math.max(startPos[1], lastPos[1]);

	for(let r = firstRow; r< lastRow; r++){
        if(_isCellTaken(grid, [col,r])){
            return false;
        }
	}
	return true;
	

}

function _isUpSideEmpty(grid, coordinates, axis){
	let minCol;
	let maxCol;
	let row;

	if(coordinates.length === 1){
		minCol = coordinates[0][0]; // first coord, col
		maxCol = minCol + 1;
		row = coordinates[0][1] - 1;
	}else if(axis === "vertical"){
        minCol = coordinates[0][0];
        maxCol = minCol + 1;
        let firstCoord = coordinates[0];
        let lastCoord = coordinates[coordinates.length-1];
        let minRow = Math.min(firstCoord[1], lastCoord[1]);
        row = minRow - 1;
	}else{// all coordinates have the same row
        let firstCoord = coordinates[0];
        let lastCoord = coordinates[coordinates.length-1];
        minCol = Math.min(firstCoord[0], lastCoord[0]);
        maxCol = Math.max(firstCoord[0], lastCoord[0]);
        row = coordinates[0][1] - 1;
	}
    // nothing to check, on edge of grid
    if(row < 0){
        return true;
    }
	//traversing the top border
	for(let i = minCol; i<=maxCol;i++){
        if(_isCellTaken(grid, [i, row])){
            return false;
        }
	}
    return true;
}

// good
function _isDownSideEmpty(grid, coordinates, axis){
    let minCol;
    let maxCol;
    let row;

    if(coordinates.length === 1){
        minCol = coordinates[0][0];
        maxCol = minCol + 1;
        row = coordinates[0][1] + 1;
    }else if(axis === "vertical"){
        minCol = coordinates[0][0];
        maxCol = minCol + 1;
        let firstCoord = coordinates[0];
        let lastCoord = coordinates[coordinates.length-1];
        let maxRow = Math.max(firstCoord[1], lastCoord[1]);// we want the bottom coord
        row = maxRow + 1;
    }else{
        let firstCoord = coordinates[0];
        let lastCoord = coordinates[coordinates.length-1];
        minCol = Math.min(firstCoord[0], lastCoord[0]);
        maxCol = Math.max(firstCoord[0], lastCoord[0]);
        row = coordinates[0][1] + 1;
    }

    if(row > 9){
        return true;
    }

    //traversing the bottom border
    for(let i = minCol; i<=maxCol;i++){
        if(_isCellTaken(grid, [i, row])){
            return false;
        }
    }
    return true;

}





/***/ })
/******/ ]);