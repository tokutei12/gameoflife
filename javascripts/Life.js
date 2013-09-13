LifeContainer = function(width, height){
    //initialize grid
    var grid = new Array(width);
    for (var i = 0; i < width; i++){
      grid[i] = new Array(height);
      for (var j = 0; j < height; j++){
      	if(Math.random()>0.5){ grid[i][j] = true; }
      	else{ grid[i][j] = false; }
      }
    }

    var neighborLocs = [-1, 0, 1];

	return {
	  container: grid,
	  checkNeighbors: function(x, y){
	  	if(!this.validLocation(x, y)){
	  	  return undefined;
	  	}
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
	  meetsLivingCond: function(x, y){
	  	var liveNeighbors = this.checkNeighbors(x, y);
	  	if(grid[x][y]===true && (liveNeighbors===2 || liveNeighbors===3)){
	  		return true;
	  	}
	  	else if (!(grid[x][y]===true) && liveNeighbors===3){
	  		return true;
	  	}
	  	return false;
	  },
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
	  	grid = newgrid;
	  	this.container = grid;
	  	this.printGrid();
	  }, 
	  validLocation: function(x, y){
	  	if(0 > x || x >= width || 0 > y || y >= height){
	  		return false;
	  	}
	  	return true;
	  }
	}
}
