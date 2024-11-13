// Canvas
const canvas = document.getElementById("canvas");
const canvasEl = document.getElementById('canvas')
const ctx = canvas.getContext("2d");

const cWidth = 500;
const cHeight = 500;

canvasEl.setAttribute('width', cWidth);
canvasEl.setAttribute('height', cHeight);

const marioIdle = new Image()
marioIdle.src = "../images/Sprite-Sheet.png";
const spriteW = 50;
const spriteH = 50;
let frameX = 0;
let frameY = 0;




function animate(){
    // Clear canvas for each frame
    ctx.clearRect(0,0,cWidth,cHeight);

    // Draw Mario image
    ctx.drawImage(marioIdle, frameX * spriteW, frameY * spriteH, spriteW, spriteH, 0, 0, cWidth, cHeight);
    //Create animation loop
    // if(frameX < 5){
    //     frameX ++;
    // }
    // else{
    //     frameX = 0;
    // }
    requestAnimationFrame(animate);

}

animate();