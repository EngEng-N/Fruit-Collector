// Canvas variables
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Canvas dimension
canvas.width = 500;
canvas.height = 500;

// Character
var character;

window.onload = function(){

    player = new Bob(230, 335);
    player.draw(character);


}

// Update the canvas
function update(){
    requestAnimationFrame(update);
    ctx.clearRect(0,0,canvas.width,canvas.height);
}

// Character class
class Bob{
    constructor(x, y, speed){
        this.x = x;
        this.y = y;
        this.speed = 5;
        this.width = 50;
        this.height = 50;
    }

    draw(type){
        this.type = type;
        if(this.type == character){
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
        else if(this.type == bullet){
            ctx.fillRect(100, 100, this.width, this.height);
        }
    }
}