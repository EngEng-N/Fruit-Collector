// Game board
let board = document.querySelector(".board");
let boardWidth = 1000; // board width
let boardHeight = 700; // board height

// Mario stats
let marioWidth = 50;
let marioHeight = 50;
let marioX = boardWidth/2; // center mario
let marioY = 490; // mario above the dirt of the background

let Mario = {
    x : marioX,
    y : marioY,
    width : marioWidth,
    height : marioHeight
}

// Obstacles
let barrelArray = [];
let barrelWidth = 60;
let barrelHeight = 41;
let barrelX = boardWidth; // draw the barrel at the right side of the screen
let barrelY = 490; // draw the barrel at the same Y level as Mario

// Game physcis
let velocityX = -2; // Obstacles moving speed
let speed;

// Create the canvaso on load
window.onload = function(){
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d");

    // Draw Mario character
    marioIMG = new Image();
    marioIMG.src = "../images/MarioIdle (1).gif"
    marioIMG.onload = function(){
        context.drawImage(marioIMG, Mario.x, Mario.y, Mario.width, Mario.height);
    }

    // Barrel
    barrelIMG = new Image();
    barrelIMG.src = "../images/barrel.png";
    
    requestAnimationFrame(update);
    // setInterval(placeBarrel, 1500); // Barrel will be placed every 1.5s
    document.addEventListener("keydown", moveMario);

    player = new Player(200, 300);
    gameloop = setInterval(step, 250);
    keyListeners();
}

// Re draw the canvas function
function update(){
    requestAnimationFrame(update);
    // start clearing the france from 0,0
    // width is board.width or 1000px 
    // height is board.height or 700px
    context.clearRect(0,0, board.width, board.height); 

    // Re draw Mario image
    // Mario.x += speed;
    context.drawImage(marioIMG, Mario.x, Mario.y, Mario.width, Mario.height);

    // Draw rectangle box character
    player.draw();

    for(let i = 0; i < barrelArray.length; i++){
        let Barrel = barrelArray[i];
        Barrel.x += velocityX; // Shifting position X of the barrel before drawing
        context.drawImage(Barrel.img, Barrel.x, Barrel.y, Barrel.width, Barrel.height);
    }
}

function placeBarrel(){
    let barrelOb = {
        img : barrelIMG,
        x : barrelX,
        y : barrelY,
        width : barrelWidth,
        height : barrelHeight,
        destroyed : false
    }
    barrelArray.push(barrelOb);
}

//  Mario character keys for movement
function moveMario(e){
    if(e.code == "KeyA"){
        speed += -5;
    }
    else if(e.code == "KeyD"){
        speed = 5;
    }
    // else if(e.code == "Space"){

    // }
}

var leftKey;
var rightKey;

var gameloop;
var player;

function step(){
    player.move();
    player.draw();
}

class Player{
    constructor(x,y) {
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 50;
        this.friction = 0.6 // to slow down the character
        this.speed = 0;
        this.maxSpeed = 10;
        this.active = true; // check when player is moving or not
    }
    
    move(){
        if(this.active){
            if(!leftKey && !rightKey){
                this.speed *= this.friction;
            }
            else if(rightKey){
                this.speed += 2;
            }
            else if(leftKey){
                this.speed -= 2;
            }
        }

        // Check the max speed of the character
        if(this.speed > this.maxSpeed){
            this.speed = this.maxSpeed;
        }
        else if(this.speed < -this.maxSpeed){
            this.speed = -this.maxSpeed;
        }

        this.x += this.speed; // add the speed to X position of the character
    }

    draw(){
        context.fillStyle = "green";
        context.fillRect(this.x,  this.y, this.width, this.height);
    }
}

function keyListeners(){
    document.addEventListener("keydown", function(e){
        if(e.key === "a"){
            leftKey = true;
        }
        else if(e.key === "d"){
            rightKey = true;
        }
    })

    document.addEventListener("keyup", function(e){
        if(e.key === "a"){
            leftKey = false;
        }
        else if(e.key === "d"){
            rightKey = false;
        }
    })
}

