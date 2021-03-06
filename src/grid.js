
const Grid = ({playerName}) => {

	let grid = _renderGrid(playerName);

	function display(x){
		if(x){
			x.appendChild(this.grid);
		}else{
			document.getElementsByTagName('body')[0].appendChild(this.grid);
		}
	};

	// called when it's player's turn
	function enable(){
		document.getElementById('cover').className = "hide";
	}

	// called when it's opponent's turn
	function disable(){
		document.getElementById('cover').className = "show";
	};

	function markHit(pos, id){
		let col = pos[0];
		let row = pos[1];
		let cell = document.querySelectorAll('#'+id+' #c'+col+'r'+row)[0];
		cell.innerHTML = 'X';
		cell.className += ' hit';
		if(id === "opponent"){
			cell.setAttribute("onclick", "");
		}
	}

	function markMiss(pos, id){
		let col = pos[0];
		let row = pos[1];
		let cell = document.querySelectorAll('#'+id+' #c'+col+'r'+row)[0];
		cell.innerHTML = '&#9679;';
		cell.className += ' miss';
		if(id === "opponent"){
			cell.setAttribute("onclick", "");
		}
	}
	// use this function in gameboard module. traverse all the coordinates and update gameboard's grid
	function markShip(pos){
		let col = pos[0];
		let row = pos[1];
		let cell = document.querySelectorAll('#player #c'+col+'r'+row)[0];
		cell.className += ' ship';
	}

	return {
		playerName,
		grid,
		display,
		enable,
		disable,
		markShip,
		markMiss,
		markHit
	}
};


function _renderGrid(playerName){
	let table = document.createElement('table');
	table.setAttribute('id',playerName);//player or opponent

	let tbody = document.createElement('tbody');

	let header_tr = document.createElement('tr');
	header_tr.setAttribute('class', 'table-header');

	let null_td = document.createElement('td');
	header_tr.appendChild(null_td);

	for(let l = 65; l<75;l++){
		let td = document.createElement('td');
		td.innerHTML = String.fromCharCode(l); 
		header_tr.appendChild(td);
	}

	tbody.appendChild(header_tr);
	// 11 rows // 11 columns
	for(let r = 0; r<10; r++){
		let tr = document.createElement('tr');
		tr.setAttribute('id','battleship-row-'+r);

		let rowNum = document.createElement('td');
		rowNum.setAttribute('class', 'table-y-values');
		rowNum.innerHTML = r;

		tr.appendChild(rowNum);

		for(let c = 0; c<10; c++){// 11 columns
			let td = document.createElement('td');
			td.setAttribute('id','c'+c+'r'+r);
			if(playerName === 'opponent'){
				td.setAttribute('class', 'clickable');
				td.setAttribute('onclick', "playerInputHandler(this.id)");
			}
			tr.appendChild(td);
		}
		tbody.appendChild(tr);
	}

	table.appendChild(tbody);
	return table;
}

module.exports = Grid;

