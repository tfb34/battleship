//const Gameboard = require('./gameboard');

import Gameboard from './gameboard';
//testing a command message, assert side effects
test('should create a gameboard object', () => {
	let gb = Gameboard();
	expect(gb.grid.length).toBe(10);
	expect(gb.grid[0].length).toBe(10);
	expect(gb.ships.length).toBe(10);
});

// incoming command, assert changes
test('set coordinates() should set coordinates of all ships and update gameboard', () => {
	let gb2 = Gameboard();
	gb2.setCoordinates(); 
	let cells_occupied = 0;
	for(let i=0;i<gb2.grid.length; i++){
		for(let x=0;x<gb2.grid[i].length;x++){
			if(gb2.grid[i][x] === 'o'){
				cells_occupied += 1;
			}
		}
	}
	expect(cells_occupied).toBe(20);
});

// command, assert side effects=(record missed coordinates, OR call hit on correct ship)
test('recieveAttack() should update record of missed shot when no ships are hit', () => {
	let gb = Gameboard();
	gb.recieveAttack([5,5]);
	expect(gb.missedAttacks.length).toBe(1);
});

test('recieveAttack() should not record missed shot if ship is hit', () => {
	let gb = Gameboard();
	gb.ships[0].setPosition([5,5]);
	expect(gb.missedAttacks.length).toBe(0);
});