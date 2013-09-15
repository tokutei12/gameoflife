(function () {
	// initialize the life board
	var life = new Life(64, 40, 0.4);

	// initialize timer object to play the simulation continuously
	var timer = undefined;

	// define some colors
	var black = Color(0,0,0);
	var grey = Color(34,34,34);
	var white = Color(255,255,255);
    
	// create the drawing pad object and associate with the canvas
	pad = Pad(document.getElementById('canvas'));
	pad.clear();
    
	// size of Life board - default 64x40
	var grid_x = 64;
	var grid_y = 40;

	var grid_thickness = 1;

	// define paint function to paint the current state of the board
	var paint = function(){
		var currState = life.container();
		for (var i = 0; i < grid_x; i++) {
			//draw vertical grid lines
			pad.draw_line(Coord(pad.get_width()*i/grid_x, 0), Coord(pad.get_width()*i/grid_x, 
				pad.get_height()), grid_thickness, grey);
			for (var j = 0; j < grid_y; j++) {
				//draw horizontal grid lines
				pad.draw_line(Coord(0, pad.get_height()*j/grid_y), Coord(pad.get_width(), 
					pad.get_height()*j/grid_y), grid_thickness, grey);
				// draw white squares for cells that are alive, black for nonliving
				if (currState[i][j] === true) {
					pad.draw_rectangle(Coord(pad.get_width()*i/grid_x+grid_thickness, pad.get_height()*j/grid_y+grid_thickness), 
						pad.get_width()/grid_x-2*grid_thickness, pad.get_height()/grid_y-2*grid_thickness, 0, white, white );
				} else {
					pad.draw_rectangle(Coord(pad.get_width()*i/grid_x+grid_thickness, pad.get_height()*j/grid_y+grid_thickness), 
						pad.get_width()/grid_x-2*grid_thickness, pad.get_height()/grid_y-2*grid_thickness, 0, black, black );
				}
			}
		}
	};

	paint();

	// define repaint to clear and redraw the board
	// if the board has reached endgame, pause the simulation if the timer is running
	var repaint = function(){
		var endgame = life.step();
		pad.clear();
		paint();
		if(endgame){
			if(timer !== undefined){
				pause();
			}

		}
	};

	// construct a new Life board and redraw the simulation
	// if the timer is still running, leave it on "play" mode
	var reset = function(){
		life = new Life(64, 40, 0.4);
		pad.clear();
		paint();
	};

	// start the timer for continuous play
	var play = function(){
		timer = setInterval(repaint, 250);
		// switch the play button to a pause button
		document.getElementById("play").innerHTML = "Pause";
		document.getElementById("play").id = "pause";
		// add event listener to pause button
		document.getElementById("pause").removeEventListener("click", play, false);
		document.getElementById("pause").addEventListener("click", pause, false);
	};

	// stop the timer
	var pause = function(){
		clearInterval(timer);
		timer = undefined;
		// switch pause button to play
		document.getElementById("pause").innerHTML = "Play";
		document.getElementById("pause").id = "play";
		// add event listener back to play button
		document.getElementById("play").removeEventListener("click", pause, false)
		document.getElementById("play").addEventListener("click", play, false);
	}

	// add event listener to step button 
	var step_button = document.getElementById("nextstep");
	step_button.addEventListener("click", repaint, false);

	//add event listener to reset button
	var reset_button = document.getElementById("reset");
	reset_button.addEventListener("click", reset, false);

	//add event listener to reset button
	var play_button = document.getElementById("play");
	play_button.addEventListener("click", play, false);
	}) ()
