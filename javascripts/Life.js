// Constructs a Life object given a width, height
// and density, where 0<density<=1
// If not specified, density is a default of 0.5
// Cells are placed randomly over the board with a 
// population size given by the density percentage
// User can use a preset grid by passing in a value 
// for preset and zero for all other parameters
Life = function(width, height, density, preset){
	// initialize grid for preset, preset array must be a valid rectangular array where width/height > 0
	if(width === 0 && height === 0 && density === 0){
		if(!(preset instanceof Array))
			return undefined;
		var grid = preset;
		width = grid.length;
		height = grid[0].length;
	}
	// handle parameter exceptions
	else if((width <= 0) || (height <= 0) || (density <= 0) || (density > 1)){
		return undefined;
	}
	// generate random board
	else{
		if(density === undefined){
			density = 0.5;
		}
		var grid = new Array(width);
		for (var i = 0; i < width; i++){
			grid[i] = new Array(height);
			for (var j = 0; j < height; j++){
				if(Math.random() < density){ 
					grid[i][j] = true; 
				}
				else{ 
					grid[i][j] = false; 
				}
			}
		}
	}

	var life = {
		// function to return current state of Life board
		container: function(){
			return grid.deepClone();
		},
		// return the number of live neighboring cells
		checkNeighbors: function(x, y){
		// return undefined to set off an error if the given loc is invalid
		if(!this.validLocation(x, y)){
			return undefined;
		}
		var neighborLocs = [-1, 0, 1];
		var aliveNeighbors = 0;
		for (var i = 0; i < neighborLocs.length; i++){
			for(var j = 0; j < neighborLocs.length; j++){
			if(!(i===1 && j===1) && this.validLocation(x + neighborLocs[i]) && this.validLocation(y + neighborLocs[j])){
					if(grid[x + neighborLocs[i]][y + neighborLocs[j]]===true){ aliveNeighbors++; }
				}
			}
		}
		return aliveNeighbors;
		},
		// returns whether a cell in a given location should live in the next stage
		meetsLivingCond: function(x, y){
			if(!this.validLocation(x, y)){
			 	return undefined;
			}
			var liveNeighbors = this.checkNeighbors(x, y);
			if(grid[x][y]===true && (liveNeighbors===2 || liveNeighbors===3)){
				return true;
			}
			else if (!(grid[x][y]===true) && liveNeighbors===3){
				return true;
			}
			return false;
		},
		// prints current state of game in console
		// the printed grid is rotated 90 degrees 
		// relative to the UI grid
		printGrid: function(){
			var line = "";
			for(var i = 0; i < width; i++){
				for(var j = 0; j < height; j++){
					if(grid[i][j]===true){
						line+="o ";
					}
					else{
						line+=". ";
					}
				}
				console.log(line);
				line="";
			}
			console.log("\n");
		},
		// steps the Life board to the next stage of the game
		// returns true if there is no more cell movement possible
		step: function(){
			var newgrid = new Array(width);
			for (var i = 0; i < width; i++){
				newgrid[i] = new Array(height);
			}
			//iterate through old grid
			for(var i = 0; i < width; i++){
				for(var j = 0; j < height; j++){
					if(this.meetsLivingCond(i, j)){
						newgrid[i][j] = true;
					}
					else{
						newgrid[i][j] = false;
					}
				}
			}
			var endgame = (grid.compare2d(newgrid));
			grid = newgrid;
			return endgame;
		}, 
		// returns true if (x, y) is a valid location
		validLocation: function(x, y){
			if(0 > x || x >= width || 0 > y || y >= height){
				return false;
			}
			return true;
			}
		}
	
	// prevent object slots from being overwritten
	Object.freeze(life);

	return life;
}
