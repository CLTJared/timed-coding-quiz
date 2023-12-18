// Global Variables - Elements
let btnStart = document.getElementById("gameStart");    //For starting the game
let btnQuestions = document.querySelectorAll("[data-type=\"question\"]");   //For starting the game
let timerCount = document.getElementById("gameTime");   //For tracking remaining time left
let gameBoard = document.getElementById("gameArea");    //For containing questions in game area
let gameStartMsg = document.getElementById("gameStartMsg"); 
let gamePlayingMsg = document.getElementById("gamePlayBoard"); 
let gameEndMsg = document.getElementById("gameEndMsg");
let gameMsg = document.getElementById("gameMessage");   //For game status messages

// Global Variables - Other
let gameOver = false;
let gameStarted = false;
let gameTimer = 60; //Default timer set to 60
let btnQuestion;    //For looping through each question button and assigning an event listener

// Create question(s) object
let quizQuestions = [
    //Question 1
    {
        prompt: 'Question 1',
        options: ['a','b','c','d'],
        answer: 'b',
    },
    //Question 2
    {
        prompt: 'Question 2',
        options: ['a','b','c','d'],
        answer: 'a',
    },
    //Question 3
    {
        prompt: 'Question 3',
        options: ['a','b','c','d'],
        answer: 'd',
    },
    //Question 4
    {
        prompt: 'Question 4',
        options: ['a','b','c','d'],
        answer: 'c',
    },
    //Question 5
    {
        prompt: 'Question 5',
        options: ['a','b','c','d'],
        answer: 'a',
    }
]


// Reset board/game conditions
function resetGame() {
    gameTimer = 10;
    gameMsg.setAttribute("style","background-color: transparent");
    gameStartMsg.setAttribute("style","display: none");
    gamePlayingMsg.setAttribute("style","display: block");
    gameEndMsg.setAttribute("style","display: none");
}

// Play the game
function playGame() {
    //Disable the Start Game button
    btnStart.disabled = true;

    //Calls Reset Game Elements Function
    resetGame();
    gameStarted = true;

    // Game Timer
    let playing = setInterval(function() {
        gameTimer--;
        console.log(gameTimer);
        timerCount.textContent = gameTimer;

        if (gameTimer >= 0) { // Checks if timer is greater than 0 - Still Playing
            if (gameOver && gameTimer > 0) { // Check the gameOver status (won = true), or if the gameTimer is over 0
                gameStarted = false;
                clearInterval(playing);
            }
        }
        // Tests if time has run out
        if (gameTimer <= 0 ) { // Checks if time ran out for game or somehow ran under 0
            btnStart.disabled = false;
            gamePlayingMsg.setAttribute("style","display: none");
            gameEndMsg.setAttribute("style","display: block");
            gameEndMsg.textContent = "Time Ran Out!";
            gameStarted = false;
            clearInterval(playing);
        }
    }, 1000);
}

function answerQuestion(event) {
    //Checking if answer was right or wrong when pressing question button
    let usrAnswer = event.target.getAttribute("data-answer");
    if(!gameStarted || gameTimer<=0) { return; } //Check if game has been started or 

    if(usrAnswer==='true') {
        gameMsg.textContent = 'Answer Correct!';
        gameMsg.setAttribute("style","background-color: var(--orange-warning)");
    } else {
        if(gameTimer>10){ gameTimer=gameTimer-10; } else { gameTimer=1; } //Incorrect test, remove 5 seconds
        gameMsg.textContent = 'Answer Incorrect! Minus 10 Seconds.';
        gameMsg.setAttribute("style","background-color: var(--orange-warning)");

    }
}

//Set Event Listener to the Start Game button
btnStart.addEventListener("click", playGame);


//Set Event Listener to Question Buttons - Loop through each item.
btnQuestions.forEach(btnQuestion => {
    btnQuestion.addEventListener("click", answerQuestion);
})


//<button data-index="1" data-type="question">1. Answer 1</button>
//When creating the loop for the questions container, these are some of the options.

