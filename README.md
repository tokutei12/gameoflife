Project 1 (Conway's Game of Life) - Kimberly Toy

Link to main page: http://toyk2a.scripts.mit.edu/6.170/index.html
Link to test page: http://toyk2a.scripts.mit.edu/6.170/test.html

__________________________________________________________________________________________________________________________________

The main design problems to resolve for this project were:

- How to represent the Life board
- How to paint the state of the board
- What visibility should be of classes and variables

__________________________________________________________________________________________________________________________________

For each problem: options available, evaluation, which chosen

- For the Life board, I needed to be able to store the state of each cell that exists in a grid formation to represent 
the state of the game.  I also wanted to be able to intialize a board of given dimensions populated with randomly placed 
cells with a given density, or to be able to intialize board by passing a preset pattern.  

To represent the grid, I chose to use a 2D array because the indexing would allow me to access locations easily.  
The other possiblity that I considered was storing the grid information in a 1D array to avoid the "deep clone" problem 
of attempting clone a 2D array (having to clone each inner array), but having to shift the indexing to represent a 
2D board in one dimension was more likely to create more room for error.  

I used a boolean to represent the cells, where true means that a cell in a given grid location is alive.  I originally 
created a Cell object which had an alive property.  I intended to give the individual cell more functionality, such as 
the ability to check how many live neighbors it had and whether it met the living conditions, but to implement these methods, 
the cell would need access to the board object.  I felt that an individual cell shouldn't have access to these board/game-rule 
dependent functions; instead, the board should implement the game rules (under what conditions a cell lives).  Because the cell 
became stripped down to only having the alive property, it became more economical to represent it as a boolean rather than 
initializing a full-blown object.

The Life class ensures that there is no representation exposure; when it returns the current state of the board, it makes a deep 
copy of its internal array to return.  The only mutator function is step(), which follows the game rules to 'step' the board into 
the next stage of life.  None of the Life object properties can be overwritten, because the object is frozen when initialized.  

- To paint the board, I initialized an instance of the Life object, and created a paint method to draw the current state of the 
life board.  The paint method allows for scalability given the canvas size and board size.  

- All of the paint functionality is enclosed in an anonymous function so that the variables do not pollute the global namespace 
and the functions cannot be editted by the user.  The Life object is globally accessible, so that other files could create their 
own Life instances.  

__________________________________________________________________________________________________________________________________

Taking it further: 

Some ideas that I want to work with include

- Creating a 'presets' page to display interesting Life patterns
- Storing all the previous stages of a game so that a user can step forward and back
- Letting a user paint patterns on the board
- Making the board size adjustable through the UI 
- Draw cells that have recently died in a unique color