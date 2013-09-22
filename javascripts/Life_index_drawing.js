// Anonymous function to initialize drawing pad and draw Life board
// on the index page
// Author: Kimberly Toy

$(function () {
    // initialize the life board
    var life = Life(64, 40, 0.4);

    // initialize timer object to play the simulation continuously
    var timer = undefined;

    // define some colors
    var black = Color(0,0,0);
    var grey = Color(34,34,34);
    var white = Color(255,255,255);
    
    // size of Life board - default 64x40
    var grid_x = 64;
    var grid_y = 40;

    var user_changed_board = false;

    var init_dom = function(){
        var tbody = $("<tbody></tbody>");
        var currState = life.container();
        for (var i = 0; i < grid_y; i++) {
            var row = $("<tr></tr>");
            for (var j = 0; j < grid_x; j++) {
                if (currState[j][i] === true) {
                    row.append("<td class='alive cell'></td>");
                } else {
                    row.append("<td class='cell'></td>");
                }
            }
            tbody.append(row);
        }
        $("#canvas_container").append(tbody);
    };

    init_dom();

    // define paint function to paint the current state of the board
    var paint = function(){
        var currState = life.container();
        var tbody = $("#canvas_container").find("tbody");
        for (var i = 0; i < grid_y; i++) {
            for (var j = 0; j < grid_x; j++) {
                if (currState[j][i] === true) {
                    tbody.find('tr').eq(i).find('td').eq(j).addClass("alive")
                } else {
                    tbody.find('tr').eq(i).find('td').eq(j).removeClass("alive")
                }
            }
        }
    };

    // clear the grid display to show a blank board, does not clear the board in the life object
    var clear = function(){
        var tbody = $("#canvas_container").find("tbody");
        for (var i = 0; i < grid_y; i++) {
            for (var j = 0; j < grid_x; j++) {
                tbody.find('tr').eq(i).find('td').eq(j).removeClass("alive");
            }
        }
        $("#canvas_container").html(tbody);
    };

    // define repaint to clear and redraw the board
    // if the board has reached endgame, pause the simulation if the timer is running
    var repaint = function(){
        if(user_changed_board){
            player_init_board();
            user_changed_board = false;
        }
        var endgame = life.step();
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
        life = Life(64, 40, 0.4);
        repaint();
    };

    var player_init_board = function(){
        console.log("reinit board");
        var tbody = $("#canvas_container").find('tbody');
        var grid = new Array(grid_x);
        for (var i = 0; i< grid_x; i++) {
            grid[i] = new Array(grid_y);
        }
        for (var i = 0; i < grid_y; i++) {
            for (var j = 0; j < grid_x; j++) {
                if (tbody.find('tr').eq(i).find('td').eq(j).hasClass("alive")) {
                    grid[j][i] = true;
                } else {
                    grid[j][i] = false;
                }
            }
        }
        life = Life(0, 0, 0, grid);
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
    };

    $('#canvas_container').mousedown(function(e){
        e.originalEvent.preventDefault();
        $('.cell').bind('mouseover', function(){
            $(this).addClass('alive');
            user_changed_board = true;
        });
    }).mouseup(function(){
        $('.cell').unbind('mouseover');
    });

    $(document).on('mousedown', '.cell', function() { 
        $(this).addClass('alive');
        console.log('mousedown on node');
        user_changed_board = true;
    });

    // add event listener to step button 
    var step_button = document.getElementById("nextstep");
    step_button.addEventListener("click", repaint, false);

    // add event listener to clear board so the player can draw their own pattern
    var clear_button = document.getElementById("clear");
    clear_button.addEventListener("click", clear, false);

    //add event listener to reset button
    var reset_button = document.getElementById("reset");
    reset_button.addEventListener("click", reset, false);

    // add event listener to reset button
    var play_button = document.getElementById("play");
    play_button.addEventListener("click", play, false);

});
