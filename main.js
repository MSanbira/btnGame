let count = 0;
let topScore = 0;
let sec = 0;
let gameInterval;
let btnRed = {
    element: document.querySelector(".btn-red"),
    x: 50,
    y: 50,
    radius: 16
}
let arrOfBtnGreen = [];

const firstLoad = document.querySelectorAll(".first-load");
const wrapper = document.querySelector(".wrapper");
let timer = document.querySelector(".timer");
let gameOverScreen = document.querySelector(".game-over-screen");
let counter = document.querySelector(".count");
let newGameStatment = document.querySelector(".new-game-statment");
let topScoreDisplay = document.querySelector(".top-score");
let gameOverMessage = document.querySelector(".game-over-message");

const gameOverMessageFaild = ['ohh, too bad', 'so close...', 'maybe next try', 'try, try again', 'BLARGZZZ'];
const gameOverMessageWin = ['You did it!', 'Yes You Can!', 'Sweet Sucsses!', 'Now try to beat it again', 'BAZINGA!!!'];

function gamePlay() {
    moveBtnRed();
    count++;
    if (count === 1) {
        sec = 60;
        startTimer();
    }
    if (count >= 10) {
        createNewBtnGreen();
        moveBtnGreen();
    }
    showBtns();
}

function startTimer() {
    gameInterval = setInterval(function () {
        sec--;
        timer.innerHTML = "time: " + sec + "s";
        if (sec <= 5) {
            timer.style.color = "red";
        }
        else {
            timer.style.color = "black";
        }
        if (sec <= 0) {
            showGameOverScreen();
            clearInterval(gameInterval);
        }
    }, 1000);
}

function createNewBtnGreen() {
    if (count % 10 === 0) {
        let btnElement = document.createElement('DIV');
        btnElement.setAttribute('class', 'btn-green');
        btnElement.setAttribute('onclick', 'showGameOverScreen()');
        let btnGreen = {
            element: btnElement,
            x: 0,
            y: 0,
            radius: 3
        }
        arrOfBtnGreen.push(btnGreen);
        wrapper.appendChild(btnGreen.element);
    }
}

function moveBtnRed() {
    btnRed.x = Math.random() * 60 + 20;
    btnRed.y = Math.random() * 60 + 20;
}

function moveBtnGreen() {
    for (const btnGreen of arrOfBtnGreen) {
        while (true) {
            btnGreen.x = Math.random() * 60 + 20;
            btnGreen.y = Math.random() * 60 + 20;
            if (Math.abs(btnRed.x - btnGreen.x) > (btnRed.radius + btnGreen.radius) || Math.abs(btnRed.y - btnGreen.y) > (btnRed.radius + btnGreen.radius)) {
                break;
            }
        }
    }
}

function showBtns() {
    if (count === 1) {
        for (let i = 0; i < firstLoad.length; i++) {
            firstLoad[i].style.display = "none";
        }
        newGameStatment.style.display = "none";
    }
    btnRed.element.style.top = btnRed.y + "%";
    btnRed.element.style.left = btnRed.x + "%";
    counter.innerHTML = "Score: " + count;
    for (const btnGreen of arrOfBtnGreen) {
        btnGreen.element.style.top = btnGreen.y + "%";
        btnGreen.element.style.left = btnGreen.x + "%";
    }
}

function showGameOverScreen() {
    document.querySelector("#finalScore").innerHTML = count;
    setGameOverMessage();
    gameOverScreen.style.display = "block";
    setTimeout(function () { gameOverScreen.setAttribute('onClick', 'restart()'); }, 2000);
}

function setGameOverMessage() {
    let randomNum = Math.round(Math.random() * 4);
    if (count > topScore) {
        gameOverMessage.innerHTML = `${gameOverMessageWin[randomNum]} <br>New Top Score:`
    }
    else {
        gameOverMessage.innerHTML = `${gameOverMessageFaild[randomNum]} <br> Your score was:`
    }
}

function restart() {
    if (count > topScore) {
        topScore = count;
        saveTopScoreLocalStorage();
    }
    clearInterval(gameInterval);
    sec = 0;
    count = 0;
    btnRed.x = 50;
    btnRed.y = 50;
    arrOfBtnGreen = [];
    showNewGame();
}

function showNewGame() {
    topScoreDisplay.innerHTML = "top score: " + topScore;
    timer.innerHTML = " ";
    gameOverScreen.style.display = "none";
    gameOverScreen.removeAttribute('onClick');
    wrapper.innerHTML = " ";
    counter.innerHTML = "Score: " + count;
    newGameStatment.style.display = "block";
    btnRed.element.style.top = btnRed.y + "%";
    btnRed.element.style.left = btnRed.x + "%";
    for (let i = 0; i < firstLoad.length; i++) {
        firstLoad[i].style.display = "block";
    }
}

function saveTopScoreLocalStorage() {
    window.localStorage.setItem('topScore', topScore);
}

function getTopScoreFromLocalStorage() {
    if (window.localStorage != undefined) {
        topScore = window.localStorage.getItem('topScore');
        topScoreDisplay.innerHTML = "top score: " + topScore;
    }
}

function init() {
    getTopScoreFromLocalStorage();
}

init();

