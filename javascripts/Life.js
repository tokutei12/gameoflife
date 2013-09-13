Cell = function(living){
	return {
	  alive: living
	  //changeState: function(){living = (living ? false : true);}
	};
}

//Life.prototype = {}

LifeContainer = function(size){
    //initialize grid
    var grid = new Array(size);
    for (var i = 0; i < size; i++){
      grid[i] = [];
      for (var j = 0; j < size; j++){
      	if(Math.random()>0.5){ grid[i][j] = new Cell(true); }
      	else{ grid[i][j] = new Cell(false); }
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
        			if(grid[x + neighborLocs[i]][y + neighborLocs[j]].alive){ aliveNeighbors++; }
        		}
        	}
        }
        return aliveNeighbors;
	  },
	  meetsLivingCond: function(x, y){
	  	var liveNeighbors = this.checkNeighbors(x, y);
	  	if(grid[x][y].alive && (liveNeighbors===2 || liveNeighbors===3)){
	  		return true;
	  	}
	  	else if (!(grid[x][y].alive) && liveNeighbors===3){
	  		return true;
	  	}
	  	return false;
	  },
	  printGrid: function(){
	  	var line = "";
	  	for(var i = 0; i < size; i++){
	  		for(var j = 0; j < size; j++){
	  			if(grid[i][j].alive){
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
	  	var newgrid = new Array(size);
	    for (var i = 0; i < size; i++){
	      newgrid[i] = new Array(size);
	    }
	    //iterate through old grid
	  	for(var i = 0; i < size; i++){
	  		for(var j = 0; j < size; j++){
	  			if(this.meetsLivingCond(i, j)){
				  newgrid[i][j] = new Cell(true);
				}
				else{
				  newgrid[i][j] = new Cell(false);
				}
	  		}
	  	}
	  	grid = newgrid;
	  	this.container = grid;
	  	this.printGrid();
	  }, 
	  validLocation: function(x, y){
	  	if(0 > x || x >= size || 0 > y || y >= size){
	  		return false;
	  	}
	  	return true;
	  }
	}
}
