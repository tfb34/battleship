const Gameboard = require('./gameboard');

//testing a command message, assert side effects
test('should create a gameboard object', () => {
	let gb = Gameboard();
	expect(gb.grid.length).toBe(10);
	expect(gb.grid[0].length).toBe(10);
	//expect(gb.ships.length).toBe(10);
});
