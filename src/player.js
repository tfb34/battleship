import Gameboard from './gameboard';

const Player = () => {

	let turn;
	let gameboard = Gameboard();

	function damage(enemy,pos){
		enemy.gameboard.recieveAttack(pos);
	};

	return {
		gameboard,
		damage
	}

};

module.exports = Player;