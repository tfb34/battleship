

const ship = ({ length }) => ({
	length,

	totalHits : 0,

	bodyHits : new Array(this.length),

	isSunk(){
		if(this.totalHits === this.length){
			return true;
		}else{
			return false;
		}
	},

	hit(x){
		this.bodyHits[x] = true;
	}

});

module.exports = ship;