import Ship from './ship';

const board = _createGrid();
const allShips = _createShips();

const Gameboard = () => ({
	grid : board,
	ships : allShips

});

module.exports = Gameboard;

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
	let destroyer2 = Ship({ length: 2});
	let destroyer3 = Ship({ length: 2});

	let submarine = Ship({ length: 1});
	let submarine2 = Ship( {length: 1});
	let submarine3 = Ship({ length: 1});
	let submarine4 = Ship( {length: 1});

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