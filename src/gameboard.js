import Ship from './ship';
import Grid from './grid';

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
		this.gridDOM = Grid({ playerName : name });
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

export default Gameboard;


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



