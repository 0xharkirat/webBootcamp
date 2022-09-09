
let noOfDrumButtons = document.querySelectorAll(".drum").length

for (let i = 0; i < noOfDrumButtons; i++){
    document.querySelectorAll(".drum")[i].addEventListener("click", handleClick);
}


function handleClick(){
    alert("I got clicked!");
}