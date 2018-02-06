const Player = require('./player');

test('player should contain a gameboard', () => {
	let player = Player();
	expect(player.gameboard).toBeTruthy();
});

// command message, return nothing, assert side effects
test('damage(enemy,pos) should be able to damage enemy at given position', () => {
	let player1 = Player(); // attacker
	let player2 = Player(); 

	player2.gameboard.ships[9].setPosition([[5,5]]); 

	player2.gameboard.recieveAttack([5,5]);

	let totalHits = player2.gameboard.ships[9].totalHits;
	let bodyHits = player2.gameboard.ships[9].bodyHits;

	expect(totalHits).toBe(1);
	expect(bodyHits[bodyHits.length-1]).toBeTruthy();

});