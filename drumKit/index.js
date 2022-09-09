
let noOfDrumButtons = document.querySelectorAll(".drum").length

for (let i = 0; i < noOfDrumButtons; i++){
    document.querySelectorAll(".drum")[i].addEventListener("click", handleClick);
}


function handleClick(){
    let audio = new Audio("sounds/tom-1.mp3");
    audio.play();
}