
let count = 0;
let topScore = 0;
let sec = 0;
let gameInterval;
let arrOfBtnGreen = [];
const firstLoad = document.querySelectorAll(".first-load");
const wrapper = document.querySelector(".wrapper");

function startTimer() {
    gameInterval = setInterval(function () {
        sec--;
        document.querySelector(".timer").innerHTML = "time: " + sec + "s";
        if (sec <= 5) {
            document.querySelector(".timer").style.color = "red";
        }
        else {
            document.querySelector(".timer").style.color = "black";
        }
        if (sec <= 0) {
            showGameOverScreen();
            clearInterval(gameInterval);
        }
    }, 1000);
}

let btnRed = {
    element: document.querySelector(".btn-red"),
    x: 50,
    y: 50,
    radius: 16
}

function moveBtnRed() {
    btnRed.x = Math.random() * 60 + 20;
    btnRed.y = Math.random() * 60 + 20;
    count++;
    if (count === 1) {
        sec = 60;
        startTimer();
    }
    if (count >= 10) {
        moveBtnGreen();
    }
    showBtns();
}

function moveBtnGreen() {
    if (count % 10 === 0) {
        let btnElement = document.createElement('DIV');
        btnElement.setAttribute('class', 'btn-green');
        btnElement.setAttribute('onclick', 'showGameOverScreen()');
        let btnGreen = {
            element: btnElement,
            x: 0,
            y: 0,
            radius: 16
        }
        arrOfBtnGreen.push(btnGreen);
        wrapper.appendChild(btnGreen.element);
    }
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
        document.querySelector(".new-game").style.display = "none";
    }
    btnRed.element.style.top = btnRed.y + "%";
    btnRed.element.style.left = btnRed.x + "%";
    document.querySelector(".count").innerHTML = "Score: " + count;
    for (const btnGreen of arrOfBtnGreen) {
        btnGreen.element.style.top = btnGreen.y + "%";
        btnGreen.element.style.left = btnGreen.x + "%";
    }
}

function showGameOverScreen() {
    document.querySelector("#finalScore").innerHTML = count;
    document.querySelector(".game-over-score").style.display = "block";
}

function restart() {
    if (count > topScore) {
        topScore = count;
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
    document.querySelector(".top-score").innerHTML = "top score: " + topScore;
    document.querySelector(".timer").innerHTML = " ";
    document.querySelector(".game-over-score").style.display = "none";
    wrapper.innerHTML = " ";
    document.querySelector(".count").innerHTML = "Score: " + count;
    document.querySelector(".new-game").style.display = "block";
    btnRed.element.style.top = btnRed.y + "%";
    btnRed.element.style.left = btnRed.x + "%";
    for (let i = 0; i < firstLoad.length; i++) {
        firstLoad[i].style.display = "block";
    }
}