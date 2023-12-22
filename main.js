// DOM ELEMENTS
const board = document.querySelector("#game-board");
const instructionText = document.querySelector("#instruction-game");
const logo = document.querySelector("#logo");
const score = document.querySelector("#score");
const highScoreText = document.querySelector("#highScore");

// Define game variables
let snake = [{x: 10, y: 10}]; // snake's position and size, initial position
let direction = "right"; // direction of move of the snake
let food = generateFood(); // generate a food cube with random position
let gameInterval;
let highScore = 0;
let gameSpeedDelay = 200; // increase with the points of the game
let gameStarted = false;

/* ============================
PRINCIPAL FUNCTION
=============================*/
// Draw game, snake and food
function draw() {
    board.innerHTML = ""; // reset the board
    drawSnake(); // snake body
    drawFood(); // food cube
    updateScore();
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
    element.style.gridColumn = position.x;
    element.style.gridRow = position.y;
}

/* ============================
FOOD FUNCTIONS
=============================*/
// Draw food
function drawFood() {
    if (gameStarted) {
        const foodElement = createGameElement('div', 'food'); // creating a tag and a class
        setPosition(foodElement, food); // generatin the position of the food
        board.appendChild(foodElement); // append a food cube on the board
    }
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
    
    // generate new position if the food and snake head are in the same position
    if (snakeHead.x === food.x && snakeHead.y === food.y) {
        food = generateFood();
        clearInterval(gameInterval);
        increaseSpeed();
        gameInterval = setInterval(() => {
            move();
            checkCollision();
            draw();
        }, gameSpeedDelay)
    } else{
        // remove the path, it means the last value of snake array
        snake.pop();
    }
}

// control the snake speed
function increaseSpeed() {
    if (gameSpeedDelay > 150) {
        gameSpeedDelay -= 5;
    } else if(gameSpeedDelay > 100){
        gameSpeedDelay -= 3;
    }else if(gameSpeedDelay > 50){
        gameSpeedDelay -= 2;
    }else if(gameSpeedDelay > 25){
        gameSpeedDelay -= 1;
    }
}

// check if the snake hit the borders or hit itself
function checkCollision() {
    const head = snake[0];
    // in case the snake hit the border, the game will reset
    if(head.x < 1 || head.x > 20 || head.y < 1 || head.y > 20){
        resetGame();
    }

    // reset when the snake hit itself
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            resetGame();
        }
    }
}

// reset game 
function resetGame() {
    // set the initial values
    snake = [{x:10, y:10}];
    food = generateFood();
    direction = 'right';
    gameSpeedDelay = 200;
    updateHighScore();
    updateScore();
    stop();
}

// stop game
function stop(){
    clearInterval(gameInterval);
    gameStarted = false;
    instructionText.style.display = "block";
    logo.style.display = "block";
}

// set the high score
function updateHighScore() {
    const currentScore = snake.length - 1;
    
    if (currentScore > highScore) {
        highScore = currentScore;
        highScoreText.textContent = highScore.toString().padStart(3, '0');
    }

    highScoreText.style.display = "block";
}

// manage the score
function updateScore() {
    const currentScore = snake.length -1;
    score.textContent = currentScore.toString().padStart(3, '0');
}

// start game
function start() {
    gameStarted = true;
    // hide instruction elements
    instructionText.style.display = "none";
    logo.style.display = "none";
    gameInterval = setInterval(() => {
        move();
        checkCollision();
        draw();
    }, gameSpeedDelay)
}

// keypress event listener
function handleKeyPress(e) {
    if ((!gameStarted && e.code === 'Space') || (!gameStarted && e.key === ' ')) {
        start();
        // in case that the game its already running
    } else {
        switch (e.key) {
            case 'ArrowUp':
                direction = 'up';
                break;
            case 'ArrowDown':
                direction = 'down';
                break;
            case 'ArrowLeft':
                direction = 'left';
                break;
            case 'ArrowRight':
                direction = 'right';
                break;
        }
    }
}

// starting the game
document.addEventListener('keydown', handleKeyPress);