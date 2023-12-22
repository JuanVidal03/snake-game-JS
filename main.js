// DOM ELEMENTS
const board = document.querySelector("#game-board");

// Define game variables
let snake = [{x: 10, y: 10}]; // snake's position and size, initial position
let direction = "right"; // direction of move of the snake


/* ============================
PRINCIPAL FUNCTION
=============================*/
// Draw game, snake and food
function draw() {
    board.innerHTML = ""; // reset the board
    drawSnake(); // snake body
    drawFood(); // food cube
}

/* ============================
SNAKE FUNCTION
=============================*/
// Draw snake
function drawSnake() {
    snake.forEach(segment => {
        const snakeElement = createGameElement('div', 'snake'); // it creates snake's body
        setPosition(snakeElement, segment); // set the position of the snake
        board.appendChild(snakeElement); // add the snake's cube to the board
    });
}

/* ============================
GAME FUNCTIONALITIES FUNCTIONS
=============================*/
// Create snake or food cube/div
function createGameElement(tag, className) {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

// set position of the snake or the food
function setPosition(element, position){
    element.style.gridArea = `${position.x} / ${position.y}`;
    // element.style.gridColumn = position.x;
    // element.style.gridRow = position.y;
}

/* ============================
FOOD FUNCTIONS
=============================*/
// Draw food
function drawFood() {
    const foodElement = createGameElement('div', 'food'); // creating a tag and a class
    setPosition(foodElement, generateFood()); // generatin the position of the food
    board.appendChild(foodElement); // append a food cube on the board
}

// generate the position of the food
function generateFood(){
    const x = Math.floor(Math.random() * 20) + 1;
    const y = Math.floor(Math.random() * 20) + 1;
    return { x, y }; // position on the board
}

/* ============================
GAME CONTROLS
=============================*/
// moving the snake
function move() {
    // get the first cube of the snake
    const snakeHead = {...snake[0]};
    // direction options of snake
    switch (direction) {
        case "right":
            snakeHead.x++;
            break;
        case "left":
            snakeHead.x--;
            break;
        case "up":
            snakeHead.y--;
            break;
        case "down":
        snakeHead.y++;
        break;   
    }
    // add to the first element into snake array
    snake.unshift(snakeHead);
    // remove the path, it means the last value of snake array
    snake.pop();
}


// calling principal function
/*
setInterval(() => {
    move(); // move position
    draw(); // it needs to draw again the position
}, 100);
*/