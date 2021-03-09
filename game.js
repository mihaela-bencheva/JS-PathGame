//global variable, that stores the program instructions
var instructions = [];

var map = [
    [2, 0, 1],
    [0, 1, 1],
    [0, 0, 3]
];

var map2 = [
    [2, 0, 1, 0, 0, 0],
    [0, 1, 1, 1, 1, 1],
    [0, 0, 1, 1, 0, 0],
    [1, 0, 0, 0, 0, 1],
    [0, 1, 1, 1, 0, 1],
    [0, 0, 3, 0, 0, 1]
];

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

function renderMap(map) {
    //calculate proper width/ height of the game field
    //Formula for the main field => (divWidth + 2*divBorder+2*divMargin)*divCount
    var maxLength = 0;
    for(var i = 0; i < map.length; i++) {
        if (maxLength < map[i].length) {
            maxLength = map[i].length;
        }  
    }
    if (maxLength === 0) {
        return alert("Invalid map definition!")
    }
    var mainWidth = (80 + 2*2 + 2*10) * maxLength;

    const mainEl = document.querySelector('main');
    mainEl.innerHTML = "";
    mainEl.style.width = mainWidth + "px";

    //loop through map 2-dimensional array
    for(var i = 0; i < map.length; i++) {
        for(var j = 0; j < map[i].length; j++) {

            //create div elements with proper classname
            var div = document.createElement('div');
            var className = "";
            switch(map[i][j]) {
                case 1:
                    className = "wall";
                    break;
                case 2:
                    className = "player";
                    break;
                case 3:
                    className = "exit";
                    break;
            }
            if(className)
                div.setAttribute('class', className);

            //append div to DOM tree
            mainEl.appendChild(div);
        }
    }
}

function displayMessage(message) {
    var h1 = document.querySelector('h1');
    h1.innerHTML = message;
    h1.style.display = "block";
}

function hideMessage() {
    var h1 = document.querySelector('h1');
    h1.style.display = "none";
}

renderMap(map);