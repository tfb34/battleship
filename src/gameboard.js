import Ship from './ship';

const Gameboard = () => {
	let grid = _createGrid();
	let ships = _createShips();
	let missedAttacks = [];

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
	};

	function recieveAttack(pos){
		for(let i=0;i<this.ships.length; i++){
			let ship = this.ships[i];
			console.log("traversing ships..."+(i+1));
			if(ship.isHit(pos)){
				console.log("yes it got hit");
				ship.hit(pos);
				return;
			}
		}
		this.missedAttacks.push(pos);
	};

	// private


	return{
		grid,
		ships,
		missedAttacks,
		setCoordinates,
		isGameOver,
		recieveAttack,

	}
};

module.exports = Gameboard;

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

	let battleship = Ship({ length: 4 });

	let cruiser = Ship({ length: 3 });
	let cruiser2 = Ship({ length: 3 });

	let destroyer = Ship({ length: 2 });
	let destroyer2 = Ship({ length: 2 });
	let destroyer3 = Ship({ length: 2 });

	let submarine = Ship({ length: 1 });
	let submarine2 = Ship({ length: 1 });
	let submarine3 = Ship({ length: 1 });
	let submarine4 = Ship({ length: 1 });

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
			// check if col,row is empty otherwise do over
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
		_displayBoard(grid);
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

			// create some coords
			coordinates.push([col,row]);

			for(let i = 1; i<length; i++){
				coordinates.push( [col, row+i] );
			}
		}else if( (row - (length-1) > -1) && _isPathClear(grid, col,row,length,"up")){
			// create some coords
			coordinates.push( [col,row]);
			for(let i = 1; i<length; i++){
				coordinates.push( [col, row-i] );
			}
		}

		return coordinates;
	};

	function _isPathClear(grid, col,row,length, dir){
		if(dir === "down"){
			for(let i = 0; i<length; i++){
				if(grid[col][row + i] === 'o'){
					return false
				}
			}
		}else if(dir === "up"){
			for(let i = 0; i<length; i++){
				if(grid[col][row - i] === 'o'){
					return false
				}
			}
		}else if(dir === "right"){
			for(let i = 0; i<length; i++){
				if(grid[col + i][row] === 'o'){
					return false;
				}
			}
		}else{
			for(let i = 0; i<length; i++){
				if(grid[col - i][row] === 'o'){
					return false;
				}
			}
		}
		return true;
	
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

	function _displayBoard(grid){
		console.log(grid);
	};

