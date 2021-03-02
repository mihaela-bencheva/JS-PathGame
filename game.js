//global variable, that stores the program instructions
var instructions = [];

//get all the buttons instances and attach click event
var allButtons = document.querySelectorAll("button");
for(var i = 0; i < allButtons.length; i++) {
    allButtons[i].addEventListener("click", onButtonClick);
}

//button click event handler
//add the selected instruction to instructions list
//render instructions on the screen
function onButtonClick(event) {
    var buttonText = event.target.innerHTML;
    instructions.push(buttonText);
    var instructionSection = document.querySelector("section");
    var span = document.createElement("SPAN");
    span.innerHTML = buttonText;
    instructionSection.appendChild(span);
}
