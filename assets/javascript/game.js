// Global Variables - Elements
const btnStart = document.getElementById("gameStart");    //For starting the game
const btnScore = document.getElementById("btnScoreboard"); //For tracking scoreboard button
const btnRecord = document.getElementById("score-submit"); // Record Score Button
const btnReset = document.getElementById("reset-scoreboard"); //For tracking on Reset Button
const timerCount = document.getElementById("gameTime");   //For tracking remaining time left
const gameBoard = document.getElementById("gameArea");    //For containing questions in game area
const gameStartMsg = document.getElementById("gameStartMsg"); 
const gamePlayingMsg = document.getElementById("gamePlayBoard"); 
const gameEndMsg = document.getElementById("gameEndMsg");
const gameMsg = document.getElementById("gameMessage");   //For game status messages
const gameScoreBoard = document.getElementById("gameScoreboard");
const gameInitials = document.getElementById("score-initials"); //score-initials
const gameScoreRecord = document.getElementById("score-record"); //Form to record scores and initials
const gameScoreBoardList = document.getElementById("scoreboard-list");

// Global Variables - Other
let gameOver = false;
let gameStarted = false;
let gameTimer = 60; //Default timer set to 60
let btnQuestion;    //For looping through each question button and assigning an event listener
let currentQuestion = 0;

// Create question(s) object
let quizQuestions = [
    //Question 1
    {
        prompt: 'How do you call a function named  myFunction?',
        options: [
            'call myFunction()',
            'myFunction()',
            'call function myFunction',
            'Call.myFunction'],
        answer: 'myFunction()',
    },
    //Question 2
    {
        prompt: 'Which is a proper way to start a for loop?',
        options: [
            'for (i = 0; i <= 5; i++)',
            'for (i = 0; i <= 5)',
            'for i = 1 to 5',
            'for (i <= 5; i++)'],
        answer: 'for (i = 0; i <= 5; i++)',
    },
    //Question 3
    {
        prompt: 'Which keyword would be used to set an unchanging variable in Javascript?',
        options: [
            'var',
            'const',
            'unchg',
            'string'],
        answer: 'const',
    },
    //Question 4
    {
        prompt: 'if("3"____3). For this if statement to be true, you would use which operator?',
        options: [
            '"3">3',
            '"3"==3',
            '"3"===3',
            '"3"<3'],
        answer: '"3"===3',
    },
    //Question 5
    {
        prompt: 'If let x = 7, will the following statement be true or false? if(7==x) ',
        options: ['True','False'],
        answer: 'True',
    }
]


// Reset board/game conditions
function resetGame() {
    //Reset all of the divs to hidden except for gamePlayingMsg div which contains the game elements when playing
    gameMsg.setAttribute("style","background-color: transparent");
        gameMsg.innerHTML = '';
    gameStartMsg.setAttribute("style","display: none");
    gamePlayingMsg.setAttribute("style","display: block");
    gameEndMsg.setAttribute("style","display: none");
    gameScoreBoard.setAttribute("style","display: none")

    //Reset variables to default
    gameTimer = 60;
    gameOver = false;
    gameStarted = true;
    currentQuestion = 0;
}

// Play the game
function playGame() {
    //Disable the Start Game button
    btnStart.disabled = true;
    btnScore.disabled = true;
    btnRecord.disabled = true;

    //Calls Reset Game Elements Function
    resetGame();
    
    displayQuestion(quizQuestions[currentQuestion]);

    // Game Timer
    let playing = setInterval(function() {
        gameTimer--;
        console.log(gameTimer);
        timerCount.textContent = gameTimer;

        if (gameTimer >= 0 ) { // Checks if timer is greater than 0 - Still Playing
            if (gameOver && gameTimer > 0 ) { // Check the gameOver status (won = true), or if the gameTimer is over 0
                gameStarted = false;
                btnStart.disabled = false;
                btnScore.disabled = false;

                gamePlayingMsg.setAttribute("style","display: none");
                gameMsg.textContent = "You have successfully answered all of the questions. Enter your Initials below: ";
                gameScoreBoard.setAttribute("style","display: block");
                gameScoreRecord.setAttribute("style", "display: block");
                btnRecord.disabled = false;

                clearInterval(playing);
            }
        }
        // Tests if time has run out
        if (gameTimer <= 0 ) { // Checks if time ran out for game or somehow ran under 0
            btnStart.disabled = false;
            btnScore.disabled = false;
            btnRecord.disabled = false;
            gameStarted = false;

            gamePlayingMsg.setAttribute("style","display: none");
            gameMsg.textContent = "Time Ran Out! See a list of the scores";
            gameScoreBoard.setAttribute("style","display: block");
            
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
    currentQuestion++
    displayQuestion(quizQuestions[currentQuestion]);
}

function displayQuestion(qqCurrent) { //Builds out the prompt and each question button
    if(currentQuestion > quizQuestions.length-1) { gameOver=true; return; } //Check if all questions gone

    //Sets some values for the 
    gamePlayingMsg.innerHTML = '';
    console.log(currentQuestion + " : " + quizQuestions.length);
    console.log(qqCurrent.prompt);
    let gamePrompt = document.createElement("p");
    gamePrompt.innerHTML = qqCurrent.prompt;
    gamePlayingMsg.append(gamePrompt);

    //Loop through each entry in object.options 
    for(let i=0;i<qqCurrent.options.length;i++) {
        btnQuestion = document.createElement("button");
            gamePlayingMsg.append(btnQuestion);
            //Creates each option in the object as a button
            btnQuestion.setAttribute("data-type", "question");
            btnQuestion.setAttribute("data-index", i);

            //Checks for the correct answer and sets a [data-answer] value to true or false
            if(qqCurrent.options[i] == qqCurrent.answer) {
                btnQuestion.setAttribute("data-answer", "true");
            } else {
                btnQuestion.setAttribute("data-answer", "false");
            }

            btnQuestion.innerHTML = qqCurrent.options[i];
        //Set Event Listener to Question Buttons
        btnQuestion.addEventListener("click", answerQuestion);
    }
}

function displayScoreboard() {
    //Function is used to show the scoreboard to the user
    let scoreVisible = gameScoreBoard.getAttribute("style"); //get the style property on the scoreboard

    if(scoreVisible != 'display: none') {
        //Changes the button text on the View/Hide Scoreboard button
        btnScore.innerHTML = 'View Scoreboard';

        //Making sure the proper div is showing on the page
        gameStartMsg.setAttribute("style","display: block");
        gamePlayingMsg.setAttribute("style","display: none");
        gameEndMsg.setAttribute("style","display: none");
        gameScoreBoard.setAttribute("style","display: none");
    } else {
        //Changes the button text on the View/Hide Scoreboard button
        btnScore.innerHTML = 'Hide Scoreboard';

        //Making sure the proper div is showing on the page
        gameStartMsg.setAttribute("style","display: none");
        gamePlayingMsg.setAttribute("style","display: none");
        gameEndMsg.setAttribute("style","display: none");
        gameScoreBoard.setAttribute("style","display: block");
    }
}

function enterCredentials(event) {
    //Prevent page from refreshing
    event.preventDefault();
    //get value of the input box and trim off any extra spaces
    let gmrInitials = gameInitials.value.trim();

    //Console log to validate what I think should be there
    console.log("Enter Initials for Scoreboard");
    console.log("Name: " + gmrInitials);
    console.log("Score: " + gameTimer);

    //Checking if there is anything in the input box
    if(!gmrInitials) { console.log("Must enter something into box;"); return; }

    // let existScores = [];
    // existScores = JSON.parse(localStorage.getItem("JavaQuiz"));
    // if(existScores  == null) {
    //     existScores = [];
    // }

    //Creating array/object for 
    let enterScore = {
        initials: gmrInitials,
        score: gameTimer
    };

    
    // console.log("Temp: " + typeof existScores);

    //if(typeof tempScore == 'object') tempScore.push(enterScore);

    //Set enterScore to local storage
    localStorage.setItem("JavaQuiz", JSON.stringify(enterScore));
    // console.log("HERE IS THE JSON");
    // console.log(tempScore);
    // console.log("HERE IS THE STRINGIFY");
    // console.log(JSON.stringify(tempScore));

    let gameTemp = document.createElement("li");
    gameTemp.innerHTML = "Initials: " + gameInitials.value + " | Score: " + gameTimer;
    gameScoreBoardList.append(gameTemp);

    gameScoreRecord.reset();
    gameScoreRecord.setAttribute("style", "display: none;")
}

function resetScoreBoardList() {
    //While function to loop through, true while there is a child element (li) in gameScoreBoardList (ol)
    while (gameScoreBoardList.firstChild) {
        gameScoreBoardList.removeChild(gameScoreBoardList.firstChild);
      }
}

//Set Event Listener to the Start Game button
btnStart.addEventListener("click", playGame);
//Set Event Listener for the scoreboard
btnScore.addEventListener("click", displayScoreboard);
//Set Event Listener for the record score
btnRecord.addEventListener("click", enterCredentials);
//Set Event Listener for the reset scoreboard list
btnReset.addEventListener("click", resetScoreBoardList);