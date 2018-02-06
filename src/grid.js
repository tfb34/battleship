
const Grid = ({playerName}) => {

	let grid = _renderGrid(playerName);

	function display(x){
		if(x){
			x.appendChild(this.grid);
		}else{
			document.getElementsByTagName('body')[0].appendChild(this.grid);
		}
	};

	function enable(){
		//remove class
	}
	function disable(){
		//add class
	};

	return {
		playerName,
		grid,
		display
		//enable,
		//disable,
		//addHit,
		//addMiss,
		//addWrecked 
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
		td.innerHTML = String.fromCharCode(l); //A
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
				td.addEventListener("click", function(){ console.log('you clicked on '+this.id)});
			}
			tr.appendChild(td);
		}
		tbody.appendChild(tr);
	}

	table.appendChild(tbody);


	//let frame = document.createElement('div');
	//frame.setAttribute('class', 'tableWrapper');
	//frame.setAttribute('id', playerName);
	//frame.appendChild(table);

	return table;
}

function _addListener(cell){
	cell.addEventListener('click', function(){console.log("you clicked on "+this.id)});
}

module.exports = Grid;

