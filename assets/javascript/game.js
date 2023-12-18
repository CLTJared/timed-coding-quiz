// Global Variables - Elements
let btnStart = document.getElementById("gameStart");    //For starting the game
let btnQuestions = document.querySelectorAll("[data-type=\"question\"]");   //For starting the game
let timerCount = document.getElementById("gameTime");   //For tracking remaining time left
let gameBoard = document.getElementById("gameQuestion");    //For containing questions in game area
let gameMsg = document.getElementById("gameMessage");   //For containing questions in game area

// Global Variables - Other
let gameOver = false;
let gameStarted = false;
let gameTimer = 60; //Default timer set to 60
let btnQuestion;    //For looping through each question button and assigning an event listener

// Reset board/game conditions
function resetGame() {
    gameTimer = 60;
    gameMsg.setAttribute("style","background-color: transparant");
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
        if (gameTimer === 0) { // Checks if time ran out for game
            btnStart.disabled = false;
            gameMsg.textContent = 'Time ran out.';
            gameMsg.setAttribute("background-color","var(--orange-warning)");
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
        if(gameTimer>5){ gameTimer=gameTimer-5; } else { gameTimer=1; } //Incorrect test, remove 5 seconds
        gameMsg.textContent = 'Answer Incorrect! Minus 5 Seconds.';
        gameMsg.setAttribute("style","background-color: var(--orange-warning)");
    }

}

//Set Event Listener to the Start Game button
btnStart.addEventListener("click", playGame);


//Set Event Listener to Question Buttons - Loop through each item.
btnQuestions.forEach(btnQuestion => {
    btnQuestion.addEventListener("click", answerQuestion);
})