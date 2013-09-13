(function () {
	// initialize the life board
	var life = new LifeContainer(10);

	// define some colors
	var black = Color(0,0,0);
	var grey = Color(34,34,34);
	var white = Color(255,255,255);
    
	// create the drawing pad object and associate with the canvas
	pad = Pad(document.getElementById('canvas'));
	pad.clear();
    
	// set constants to be able to scale to any canvas size
	var MAX_X = 110;
	var MAX_Y = 110;
	var x_factor = pad.get_width() / MAX_X;
	var y_factor = pad.get_height() / MAX_Y;

	// draw some circles and squares inside
	var RADIUS = 5;
	var LINE_WIDTH = 2;

	var paint = function(){
		for (var i = 10; i < MAX_X; i = i + 10) {
			pad.draw_line({x:pad.get_width()*i/100, y:0}, {x:pad.get_width()*i/100, y:400}, 5, grey);
			for (var j = 10; j < MAX_Y; j = j + 10) {
				pad.draw_line({x:0, y:pad.get_height()*j/100}, {x:400, y:pad.get_height()*j/100}, 5, grey);
				// draw white squares for cells that are alive
				if (life.container[i / 10 - 1][j / 10 - 1]===true) {
					pad.draw_rectangle({x:pad.get_width()*(i/10-1)/10+5, y:pad.get_height()*(j/10-1)/10+5}, pad.get_width()/10-10, pad.get_height()/10-10, 0, white, white );
				} else {
					pad.draw_rectangle({x:pad.get_width()*(i/10-1)/10+5, y:pad.get_height()*(j/10-1)/10+5}, pad.get_width()/10-10, pad.get_height()/10-10, 0,black, black );
					}
				}
		}
	};

	paint();

	var repaint = function(){
		pad.clear();
		life.step();
		paint();
	};

	var reset = function(){
		life = new LifeContainer(10);
		pad.clear();
		paint();
	};

	// add event listener to step button 
	var step_button = document.getElementById("nextstep");
	step_button.addEventListener("click", repaint, false);

	//add event listener to reset button
	var reset_button = document.getElementById("reset");
	reset_button.addEventListener("click", reset, false);
	}) ()
