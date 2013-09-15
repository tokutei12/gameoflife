// Qunit tests for project0
// Author: Kimberly Toy

test("Test Life Constructor -- Intializes interal array to correct dimensions and contains correct types", function() {
	var life = Life(5, 3, 0.4);
	ok(life instanceof Life, "object is initialized to type Life");
	var state = life.container();
	equal(state.length, 5, "array width correct");
	var correctHeight = true;
	var correctValues = true;
	for(var i = 0; i < 5; i++){
		if(state[i].length !== 3){
			correctHeight = false;
		}
		for(var j = 0; j < 3; j++){
			if(typeof state[i][j] !== "boolean"){
				correctValues = false;
			}
		}
	}
	equal(correctHeight, true, "array height correct");
	equal(correctValues, true, "array values correct");
});

test("Test Life Constructor -- Initializes Life with preset array", function() {
	var preset = [[false, true, false],
				  [true, false, true]];
	var life = Life(0, 0, 0, preset);
	ok(life.container().compare2d(preset), "properly initialized to same values as preset array");
});

test("Test Life Constructor -- robust error handling", function(){
	equal(Life(-1, 0), undefined, "bad dimensions, (-1, 0)");
	equal(Life(0, 0), undefined, "bad dimensions, (0, 0)");
	equal(Life(3, 0), undefined, "bad dimensions, (3, 0)");
	equal(Life(5, 5, -1), undefined, "density parameter out of range (-1)");
	equal(Life(3, 1, 1.1), undefined, "density parameter out of range (1)");
	equal(Life(3, 1, 0), undefined, "density parameter out of range (0)");
	equal(Life(3, 1, 2), undefined, "density parameter out of range (2)");
});

test("Test validLocation function", function() {
	var life = Life(2, 2);
	equal(life.validLocation(0, 0), true, "(0,0) is a valid location");
	equal(life.validLocation(1, 1), true, "(1,1) is a valid location");
	equal(life.validLocation(1, 0), true, "(1,0) is a valid location");
	equal(life.validLocation(0, -1), false, "(0,-1) is an invalid location");
	equal(life.validLocation(-1, -1), false, "(-1,-1) is an invalid location");
	equal(life.validLocation(2, 2), false, "(2,2) is an invalid location");
});

test("Test checkNeighbors function", function() {
	// initialize 4x4 board
	var preset = [[true, false, false, false],
				  [true, false, true, false],
				  [false, true, false, false],
				  [true, true, false, true]];
	var life = Life(0, 0, 0, preset);
	equal(life.checkNeighbors(-1,-1), undefined, "returns undefined for invalid locations");
	equal(life.checkNeighbors(0, 3), 1, "returns correct value for neighbors of dead cell in corner (0,3)");
	equal(life.checkNeighbors(0, 0), 1, "returns correct value for live cell (doesn't count itself) in corner (0,0)");
	equal(life.checkNeighbors(1, 2), 1, "correctly checks value for cell with eight neighbors");
	// initialize 1x1 board
	var preset2 = [[true]];
	var life2 = Life(0, 0, 0, preset2);
	equal(life2.checkNeighbors(0, 0), 0, "returns correct value for a cell with no neighbors");
	//initialize 3x3 board
	var preset3 = [[true, true, true], 
				   [true, true, true], 
				   [true, true, true]];
	var life3 = Life(0, 0, 0, preset3);
	equal(life3.checkNeighbors(1, 1), 8, "returns correct value for cell with maximum of eight live neighbors");
});

test("Test meetLivingConditions function", function(){
	var preset = [[true, false, true, true],
				  [true, true, true, false],
				  [false, true, false, false],
				  [true, true, false, true]];
	var life = Life(0, 0, 0, preset);
	equal(life.meetsLivingCond(0, 0), true, "test that live cell with two neighbors should live");
	equal(life.meetsLivingCond(1, 0), true, "test that live cell with three neighbors should live");
	equal(life.meetsLivingCond(3, 3), false, "test that live cell with no neighbors should die");
	equal(life.meetsLivingCond(1, 2), false, "test that live cell with four neighbors should die");
	equal(life.meetsLivingCond(2, 0), false, "test that dead cell with five neighbors should not live");
	equal(life.meetsLivingCond(3, 2), true, "test that dead cell with three neighbors should live");
});

test("Test step function", function(){
	var preset = [[true]];
	var life = Life(0, 0, 0, preset);
	equal(life.step(), false, "test that endgame condition has not been reached yet on 1x1");
	ok(life.container().compare2d([[false]]), "test that next stage is correct");
	equal(life.step(), true, "test that endgame condition is reached");
	var preset2 = [[true, true],
				   [true, true]];
	var life2 = Life(0, 0, 0, preset2);
	equal(life2.step(), true, "test that square pattern is at endgame");
	ok(life2.container().compare2d(preset2), "test that grid remains unchanged");
	var preset3 = [[false, true],
				   [true, true]];
	var life3 = Life(0, 0, 0, preset3);
	equal(life3.step(), false, "test that endgame is not reached for 2x2");
	ok(life3.container().compare2d([[true, true],
								   [true, true]]), "test that next state is correct");
	var toad = [[false, false, true, false],
				[true, false, false, true],
				[true, false, false, true],
				[false, true, false, false]];
	var toadOsc = [[false, false, false, false],
				   [false, true, true, true],
				   [true, true, true, false],
				   [false, false, false, false]];
	var life4 = Life(0, 0, 0, toad);
	equal(life4.step(), false, "test that toad pattern (2 step oscillator) has next step");
	ok(life4.container().compare2d(toadOsc), "test that next stage pattern is correct");
	equal(life4.step(), false, "test that pattern still has another step");
	ok(life4.container().compare2d(toad), "test that pattern has returned to original state");
});

test("Test representation exposure", function(){
	//try to mutate grid object from container function
	var life = Life(4, 4, 0.4);
	life.container()[0][0] = 42;
	ok(typeof life.container()[0][0] === "boolean", "test that grid variable cannot be mutated from container function");
});

test("Test object mutability", function(){
	//must add freeze, try to change methods
	var life = Life(2, 2);
	var aTrickyFunction = function(){return "a trick!";};
	var checkNeighborsFunc = life.checkNeighbors;
	var validLocationFunc = life.validLocation;
	var meetsLivingCondFunc = life.meetsLivingCond;
	var stepFunc = life.step;
	var printGridFunc = life.printGrid;
	life.checkNeighbors = aTrickyFunction;
	life.validLocation = aTrickyFunction;
	life.meetsLivingCond = aTrickyFunction;
	life.step = aTrickyFunction;
	life.printGrid = aTrickyFunction;
	equal(life.checkNeighbors, checkNeighborsFunc, "test that object functions cannot be overwritten");
	equal(life.validLocation, validLocationFunc, "test that object functions cannot be overwritten");
	equal(life.meetsLivingCond, meetsLivingCondFunc, "test that object functions cannot be overwritten");
	equal(life.step, stepFunc, "test that object functions cannot be overwritten");
	equal(life.printGrid, printGridFunc, "test that object functions cannot be overwritten");
});

test("Time large case: 100x100", function(){
	// time large cases to see that functions complete within reasonable times (under 100ms)
	var now = Date.now();
	var life = Life(100, 100);
	var now2 = Date.now();
	ok((now2 - now) < 100, "Initialize 100x100 grid");
	life.step();
	var now3 = Date.now();
	ok((now3 - now2) < 100, "Step the 100x100 grid");
});