

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
		console.log("inside of isHit()");
		console.log(this);
		for(let i=0; i<this.coordinates.length; i++){
			let col = this.coordinates[i][0];
			//console.log(col);
			let row = this.coordinates[i][1];
			//console.log(row);

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