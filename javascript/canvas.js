// Game board
let boardWidth = 1000; // board width
let boardHeight = 700; // board height

// Mario stats
let marioWidth = 50;
let marioHeight = 50;
let marioX = boardWidth/2; // center mario
let marioY = 340; // mario above the dirt of the background

let Mario = {
    x : marioX,
    y : marioY,
    width: marioWidth,
    height: marioHeight
}

// Create the canvaso on load
window.onload = function(){
    board = document.getElementById("container");
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d");

    // Draw Mario character
    context.fillStyle = "green";
    context.fillRect(Mario.x, Mario.y, Mario.width, Mario.height);
}