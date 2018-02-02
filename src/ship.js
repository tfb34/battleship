

const Ship = ({ length }) => ({
	length,

	totalHits : 0,

	bodyHits : new Array(this.length),

	isSunk(){
		return this.totalHits === this.length ? true : false;
	},

	hit(x){
		this.bodyHits[x] = true;
		this.totalHits += 1;
	}

});

module.exports = Ship;