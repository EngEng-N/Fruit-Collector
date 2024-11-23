// Game Container
const button = document.getElementById("play-again");
const gameContainer = document.querySelector(".gameplay");
const gameEndContainer = document.querySelector(".play-again-container");

// Game board
let board = document.querySelector(".board");
let boardWidth = 1000; // board width
let boardHeight = 700; // board height

// Mario stats
let marioWidth = 60;
let marioHeight = 50;
let marioX = boardWidth/2; // center mario
let marioY = 490; // mario above the dirt of the background

let Mario = {
    x : marioX,
    y : marioY,
    width : marioWidth,
    height : marioHeight
}

// Objects
let barrelArray = [];
let barrelWidth = 60;
let barrelHeight = 41;
let barrelX = boardWidth + 20; // draw the barrel at the right side of the screen
let barrelY = 490; // draw the barrel at the same Y level as Mario

let bombArray = [];
let bombWidth = 60;
let bombHeight = 60;
let randBomb = Math.random() * board.width;
let bombX = 0;
let bombY = 0;
let bombXX = 0;

let coinArray = [];
let coinX = 300;
const coinY = 0;
const coinW = 60;
const coinH = 60;

let fireballX = 0;
let fireballY = 0;
let fireballSpeed = 5;
const fireballW = 60;
const fireballH = 60;
const fireballMaxSpeed = 10;
let fireballArray = [];

// Game physcis
let velocityX = -2; // Obstacles moving speed
let velocityY = 1.5;
let speed;

// Key listeners
var leftKey;
var rightKey;
var shoots;
var shooting;
var shooting;

let gameOver = false;
var gameloop;
var player;
let scoreBoard = 0;
var collected;
let destroyed = false;

// Create the canvaso on load
window.onload = function(){
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d");

    console.log(randBomb);
    // Mario character src image
    marioIMG = new Image();
    marioIMG.src = "../images/MarioIdle (1).gif"

    // Barrel
    barrelIMG = new Image();
    barrelIMG.src = "../images/barrel.png";

    // Bomb
    bombIMG = new Image();
    bombIMG.src = "../images/bomb.png";

    // Coin
    coinIMG = new Image();
    coinIMG.src = "../images/coin.png";

    // Fireball 
    fireballIMG = new Image();
    fireballIMG.src = "../images/fireball.gif";
    fireballIMG.width = fireballW;
    fireballIMG.height = fireballH;
    
    requestAnimationFrame(update);
    // setInterval(placeBarrel, 3000); // Barrel will spawn every 3s
    setInterval(placeBomb, 5000); // Bomg will spawn every 5s
    setInterval(placeCoin, 5500); // Coin will spawn every 5.5s
    setInterval(number, 4000); // Update Bomb location

    player = new Player(Mario.x, Mario.y);
    fb = new Fireball();
    keyListeners();
}

// Re draw the canvas function
function update(){
    requestAnimationFrame(update);
    // start clearing the france from 0,0
    // width is board.width or 1000px 
    // height is board.height or 700px
    context.clearRect(0,0, board.width, board.height); 

    if(gameOver){
        gameEndContainer.style.display = "block";
        gameContainer.style.display = "none";
        return;
    }


    // Draw Mario character
    step();

    // Draw Score Board
    context.fillStyle = "black";
    context.font = "25px sans-serif";
    context.fillText("Score:", 10, 50);
    context.fillText(scoreBoard, 85, 50);

    // Draw lives
    context.fillStyle = "black";
    context.font = "25px sans-serif";
    context.fillText(player.lives, 80, 100);
    context.fillText("Lives:", 10, 100);

    for(let i = 0; i < barrelArray.length; i++){
        let Barrel = barrelArray[i];
        Barrel.x += velocityX; // Get the current image in the array and shift the position X of the barrel before drawing
        context.drawImage(Barrel.img, Barrel.x, Barrel.y, Barrel.width, Barrel.height);

        if(collision(player, Barrel)){
            gameOver = true;
        }
        
        if(collision(Fireball, Barrel)){
            barrelArray.shift();
        }
    }

    while(barrelArray.length > 0 && barrelArray[0].x < -barrelWidth){
        barrelArray.shift(); // remove the barrel that touches the left side of the screen
    }

    for(let i = 0; i < coinArray.length; i++){
        let Coin = coinArray[i];
        Coin.y += velocityY;
        context.drawImage(Coin.img, Coin.x, Coin.y, Coin.width, Coin.height);
        if(collision(player, Coin)){
            collected = true;
            coinArray.shift();
        }
        else{
            collected = false;
        }
        
        if(collected){
            scoreBoard ++;
        }
    }
    
    while((coinArray.length > 0 && coinArray[0].y > 500)){
        player.lives --;
        coinArray.shift(); // remove coin when it touches the ground
        if(player.lives <= 0){
            gameOver = true;
        }
    }

    for(let i = 0; i < bombArray.length; i++){
        let Bomb = bombArray[i];
        Bomb.y += velocityY + (Math.random()*10);
        context.drawImage(Bomb.img, Bomb.x, Bomb.y, Bomb.width, Bomb.height);
        if(collision(player, Bomb)){
            player.lives --;
            bombArray.shift();
        }
        if(player.lives <= 0){
            gameOver = true;
        }
    }

    while(bombArray.length > 0 && bombArray[0].y > 500){
        bombArray.shift();
    }

    // Clear the fireball that goes offscreen
    while(fireballArray.length > 0 && fireballArray[0].maxX > board.width){
        fireballArray.shift();
    }

    while(fireballArray.length > 5){
        fireballArray.shift();
    }
}

function placeBarrel(){

    if(gameOver){
        return;
    }

    let barrelOb = {
        img : barrelIMG,
        x : barrelX,
        y : barrelY,
        width : barrelWidth,
        height : barrelHeight
    }
    barrelArray.push(barrelOb);
}

function placeCoin(){
	let coinOb = {
	    img: coinIMG,
		x: coinX,
		y: coinY,
		width: coinW,
		height: coinH,
	}
	coinArray.push(coinOb)
}

function placeBomb(){
    let bombOb = {
        img: bombIMG,
        x: bombX,
        y: bombY,
        width: bombWidth,
        height: bombHeight
    }
    bombArray.push(bombOb);
}

function step(){
    player.move();
    player.draw();
    player.shoot();
}

// Mario character
class Player{
    constructor(x,y) {
        this.x = marioX;
        this.y = marioY;
        this.width = marioWidth;
        this.height = marioHeight; 
        this.friction = 0.6 // to slow down the character
        this.speed = 0;
        this.maxSpeed = 15;
        this.lives = 5;
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
        context.drawImage(marioIMG, this.x,  this.y, this.width, this.height);
    }
    
    shoot(){

        // Go through all the fireballs and move them
        fireballArray.forEach((fireball) => {
            fireball.x += fireball.speed;
            context.drawImage(fireball.img, fireball.x, fireball.y, fireball.width, fireball.height);

            // Remove fireball if it goes off the screen
            if (fireball.x >= board.width) {
                fireballArray.splice(0, 1);
            }
        });
        

        if(shoots){

            console.log("shoot");
            if (fireballArray.length < 5) {
                const newFireBall = new Fireball();
                fireballArray.push(newFireBall);
            }
            shoots = false; // Reset shoots to prevent continuous firing
        }
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
        else if(e.key === "s"){
            shoots = true;
            shooting = true;
        }
    })

    document.addEventListener("keyup", function(e){
        if(e.key === "a"){
            leftKey = false;
        }
        else if(e.key === "d"){
            rightKey = false;
        }
        else if(e.key === "s"){
            shoots = false;
            shooting = true;
        }
    })
}

function collision(a,b){
	return a.x < b.x + b.width &&
	       a.x + a.width > b.x &&
	       a.y < b.y + b.height &&
	       a.y + a.height > b.y
} // Code from ...

class Fireball {
    constructor(){
        this.img = fireballIMG;
        this.x = player.x;
        this.y = player.y;
        this.width = 60;
        this.height = 60;
        this.speed = 5;
    }
}

function number(){
    bombX += Math.random()*1000;
    if(bombX >= 1000){
        bombX = Math.random()*1000;
    }
}

function restartGame(){
    gameOver = false;
    scoreBoard = 0;
    lives = 5;
    barrelArray = [];
    coinArray = [];
    bombArray = [];
    fireballArray = [];
    player = new Player(Mario.x, Mario.y);
    fb = new Fireball();
}

button.addEventListener("click", function(){
    gameContainer.style.display = "block";
    gameEndContainer.style.display = "none";
    restartGame();
})