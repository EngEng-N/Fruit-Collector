
// Background container
const BgDisplay = document.querySelector(".bg-container");

// How to play container
const HTPdisplay = document.querySelector(".htp-display");


// Navigation buttons
const HTPbutton = document.getElementById("btn-htp");
const Playbutton = document.getElementById("btn-play");
const Easybutton = document.getElementById("btn-easy");
const Mediumbutton = document.getElementById("btn-medium");
const Hardbutton = document.getElementById("btn-hard");

// console.log(getComputedStyle(BgDisplay).display)

HTPbutton.addEventListener("click", function(){

    if(getComputedStyle(BgDisplay).display === 'block'){
        
    BgDisplay.style.display = "none";
    HTPdisplay.style.display = "block";
    }else{
        BgDisplay.style.display = "block";
    HTPdisplay.style.display = "none";
    }


})

// Difficulty changes

Easybutton.addEventListener("click", difficultySelect);
Mediumbutton.addEventListener("click", difficultySelect);
Hardbutton.addEventListener("click", difficultySelect);

function difficultySelect(difficulty){
    if(difficulty === 'easy'){
        Easybutton.style.background = "rgb(45, 150, 248)";
        Mediumbutton.style.background = "rgb(255,255,255)";
        Hardbutton.style.background = "rgb(255,255,255";
    }
    else if(difficulty === 'medium'){
        Mediumbutton.style.background = "rgb(45, 150, 248)";
        Easybutton.style.background = "rgb(255,255,255)";
        Hardbutton.style.background = "rgb(255,255,255";
    }
    else if(difficulty === 'hard'){
        Hardbutton.style.background = "rgb(45, 150, 248)";
        Easybutton.style.background = "rgb(255,255,255)";
        Mediumbutton.style.background = "rgb(255,255,255";
    }
}

const difficultyBtns = document.getElementById('difficulty-btns');

difficultyBtns.addEventListener('click', function(e){

    //console.log(e.target)

    if(e.target.tagName === 'BUTTON'){
        //console.log(e.target.dataset.difficulty);
        difficultySelect(e.target.dataset.difficulty);
    }

});


//console.log(Easybutton.onclick);

// Easybutton.addEventListener("click", function(){
//     Easybutton.style.background = "rgb(45, 150, 248)";
//     Mediumbutton.style.background = "rgb(255,255,255)";
//     Hardbutton.style.background = "rgb(255,255,255";
//     Easybutton.selected;
// })

// Mediumbutton.addEventListener("click", function(){
//     Mediumbutton.style.background = "rgb(45, 150, 248)";
//     Easybutton.style.background = "rgb(255,255,255)";
//     Hardbutton.style.background = "rgb(255,255,255";
// })

// Hardbutton.addEventListener("click", function(){
//     Hardbutton.style.background = "rgb(45, 150, 248)";
//     Easybutton.style.background = "rgb(255,255,255)";
//     Mediumbutton.style.background = "rgb(255,255,255";
// })

