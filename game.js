//global variable, that stores the program instructions
var instructions = [];

var currentInstruction = 0;

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

var levelArray = [map, map2];
var player;

var toh;

//this will be our displayed map 
var currentLevelIndex = 0;
var currentLevel = initLevel(currentLevelIndex);

//get all the buttons instances and attach click event
var allButtons = document.querySelectorAll("button");
for(var i = 0; i < allButtons.length; i++) {
    allButtons[i].addEventListener("click", onButtonClick);
}

// subscribing to  the custiom event onPlayerMove
document.addEventListener("moveMade", onPlayerMove);
//document.addEventListener("moveMade", console.log);

document.addEventListener('keydown', onKeyBoardClick);
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

    if (buttonText === "Start") {
        playMove();
    }
}

function onKeyBoardClick(event) {
    switch (event.keyCode) {
        case 39:
            //arrow right
            var button = document.querySelector("#right");
            break;
        case 37:
            //arrow left
            var button = document.querySelector("#left");
            break;
        case 38:
            //arrow up
            var button = document.querySelector("#up");
            break;
        case 40:
            //arrow down
            var button = document.querySelector("#down");
            break;
        case 13:
            //arrow start
            var button = document.querySelector("#start");
            break;
    }
    if (button) {
        button.click();
    }
    event.preventDefault();
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
    var mainWidth = (30 + 2*2 + 2*5) * maxLength;

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

function findPlayerPosition(map) {
    for(var i = 0; i < map.length; i++) {
        for(var j = 0; j < map[i].length; j++) {
            if (map[i][j] === 2) {
                return {x:j, y:i};
            }
        }
    }
}

function playMove() {
    var oldPosition = {x:player.x, y:player.y}
    //reading the next instruction from the instruction array
    var instruction = instructions[currentInstruction];
    var section = document.querySelector('section');
    if (section != null) {
        section.children[currentInstruction].setAttribute('class', 'executed');
    }
    currentInstruction++;

    if (instruction === undefined) {
        displayMessage("Game Over!");
    }

    //check if the move is valid
    switch(instruction) {
        case "Left":
            player.x-=1;
            break;
        case "Right":
            player.x+=1;
            break;
        case "Down":
            player.y+=1;
            break;
        case "Up":
            player.y-=1;
            break;
        case "Start":
            displayMessage("Game over!");
            break;
    }

    //update the map array
    try { 
        if (currentLevel[player.y][player.x] === 0) {
            currentLevel[oldPosition.y][oldPosition.x] = 0;
            currentLevel[player.y][player.x] = 2;
            var event = new CustomEvent("moveMade", {
                detail: {
                    player: player
                }
            });
            toh = setTimeout(playMove, 300);
            document.dispatchEvent(event);
        } else if(currentLevel[player.y][player.x] === 3) {
            currentLevel[oldPosition.y][oldPosition.x] = 0;
            currentLevel[player.y][player.x] = 2;
            if (currentLevelIndex === levelArray.length - 1) {
                displayMessage("You finished the game!");
            } else {
                displayMessage("You win the level! Loading next one...");
                currentLevelIndex++;
                setTimeout(function () {
                    currentLevel = initLevel(currentLevelIndex);
                }, 2000);
            }
        } else {
            displayMessage("Game Over!");
            //initLevel(currentLevelIndex);
        }
    } catch {
        displayMessage("Game Over!");
        //initLevel(currentLevelIndex);
    }

    //render the map
    renderMap(currentLevel);
}

function initLevel(levelIndex) {
    var level = levelArray[levelIndex];
    renderMap(level);
    player = findPlayerPosition(level);
    instructions = [];
    currentInstruction = 0;
    var instructionSection = document.querySelector("section");
    instructionSection.innerHTML = "";
    hideMessage();
    return level;
}

function onPlayerMove(e) {
    var points = document.querySelector(".points");
    points.innerText--;
    if (points.innerText < 0) {
        displayMessage("Game Over!");
        clearTimeout(toh);
    }
}