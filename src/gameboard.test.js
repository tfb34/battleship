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
test('recieveAttack() should increase missedAttacks to 1 when no ships are hit', () => {
	let gb = Gameboard();
	let isHit = gb.recieveAttack([5,5]);
	expect(gb.successfulAttacks.length).toBe(0);
	expect(gb.missedAttacks.length).toBe(1);
	expect(isHit).toBeFalsy();
});


test('recieveAttack() should return true if hit damages a ship,assert side effects', () => {
	let gb = Gameboard();
	gb.ships[9].setPosition([[5,5]]);
	let isHit = gb.recieveAttack([5,5]);
	expect(gb.successfulAttacks.length).toBe(1);
	expect(gb.missedAttacks.length).toBe(0);
	expect(isHit).toBeTruthy();
});