// Global Variables - Elements
let btnStart = document.getElementById("gameStart");       //For starting the game
let timerCount = document.getElementById("gameTime");      //For tracking remaining time left
let gameBoard = document.getElementById("gameQuestion");   //For containing questions in game area

// Global Variables - Other
let gameOver = false;
let gameTimer = 30;

// Game Over
function gameEnd(gameStatus) {
    //
    switch(gameStatus) {
        case true:
            break;
        case false:
            break;
        default:
            break;
    }

}

// Reset board/game conditions
function resetGame() {

}

// Play the game
function playGame() {
    btnStart.disabled = true;
    // Game Timer
    let playing = setInterval(function() {
        gameTimer--;
        console.log(gameTimer);
        timerCount.textContent = gameTimer;

        if (gameTimer >= 0) {
            if (gameOver && gameTimer > 0) {
                clearInterval(playing);
            }
        }
        // Tests if time has run out
        if (gameTimer === 0) {
            btnStart.disabled = false;
            clearInterval(playing);
        }
    }, 1000);
}

btnStart.addEventListener("click", playGame);