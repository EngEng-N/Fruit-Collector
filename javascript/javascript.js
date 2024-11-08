
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

console.log(getComputedStyle(BgDisplay).display)

HTPbutton.addEventListener("click", function(){

    if(getComputedStyle(BgDisplay).display === 'block'){
        
    BgDisplay.style.display = "none";
    HTPdisplay.style.display = "block";
    }else{
        BgDisplay.style.display = "block";
    HTPdisplay.style.display = "none";
    }


})

console.log(BgDisplay);
