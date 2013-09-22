## Project 1 Part 2 -- Conway's Game of Life 
#### Kimberly Toy

Link to main page: http://toyk2a.scripts.mit.edu/6.170/proj1_part2/index.html

Link to test page: http://toyk2a.scripts.mit.edu/6.170/proj1_part2/test.html

- - -
The extra feature that I added was to allow the user to change the color of the alive cells.  

- - -
The main design problems to resolve for this project were:

- How to represent the Life board
- How to paint the state of the board
- How to allow users to set up the initial state of the board
- What visibility should be of classes and variables

- - -
My approach to the design is as follows:

- For the Life board, I needed to be able to store the state of each cell that exists in a grid formation to represent 
the state of the game.  I also wanted to be able to intialize a board of given dimensions populated with randomly placed 
cells with a given density, or to be able to intialize board by passing a preset pattern.  

    To represent the grid, I chose to use a 2D array because the indexing would allow me to access locations easily.  
The other possiblity that I considered was storing the grid information in a 1D array to avoid the "deep clone" problem 
of attempting clone a 2D array (having to clone each inner array), but having to shift the indexing to represent a 
2D board in one dimension was more likely to create more room for error.  

    I used a boolean to represent the cells, where true means that a cell in a given grid location is alive.  I originally 
created a Cell object, which I had scrapped because I believed that it would have an unnecessary access to the Life object's board.  
After seeing the examples in class, I realized that this was not necessarily true, but I stuck to the current implementation, because
it was cheaper to use a boolean representation for my immutable board, as for each step in the game, the Life object creates a new 2D
array representing the board.  

    The Life class ensures that there is no representation exposure; when it returns the current state of the board, it makes a deep 
copy of its internal array to return.  The only mutator function is step(), which follows the game rules to 'step' the board into 
the next stage of life.  None of the Life object properties can be overwritten, because the object is frozen when initialized.  

- To paint the board, I initialized an instance of the Life object, and created a table with each table cell representing a Life cell.  
The table is only created once and during its creation, I attempted to minimize DOM reflow.  To repaint the board, I used JQuery to 
modify the cell background-color attributes

- To allow for user interaction, I made the grid edittable such that the user could paint over the grid to add live cells.  Because my board object is immutable, I initialize a new Life object with a grid based on the contents of the HTML table each time the user edits the UI.  To minimize the number of times that I need to iterate over the table, I only reinitialize the Life object when the user clicks 'play' or 'next step'.  I also blocked the user from painting over the grid while the simulation is playing in order to prevent concurrent modifications to the life variable.  

- All of the drawing functionality is enclosed in an anonymous function so that the variables do not pollute the global namespace 
and the functions cannot be editted by the user.  The Life object is globally accessible, so that other files could create their 
own Life instances.  