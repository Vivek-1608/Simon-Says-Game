let gameSeq = [];
let userSeq = [];

const btns = ["yellow", "red", "blue", "green"];
let started = false;
let level = 0;
let highScore = localStorage.getItem("simonHighScore") || 0;

const h2 = document.querySelector("h2");
const h3 = document.getElementById("high-score");
const startBtn = document.getElementById("start-btn");

h3.innerText = `High Score: ${highScore}`;

startBtn.addEventListener("click", function () {
    if (!started) {
        started = true;
        reset();
        levelUp();
    }
});

function flash(btn) {
    btn.classList.add("flash");
    setTimeout(() => btn.classList.remove("flash"), 250);
}

function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(() => btn.classList.remove("userflash"), 250);
}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    const randIdx = Math.floor(Math.random() * 4);
    const randColor = btns[randIdx];
    const randBtn = document.getElementById(randColor);

    gameSeq.push(randColor);
    flash(randBtn);
}

function checkAnswer(currentIdx) {
    if (userSeq[currentIdx] === gameSeq[currentIdx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        document.body.style.backgroundColor = "red";
        h2.innerHTML = `Game Over! Your score was <b>${level}</b><br>Click "Start Game" to play again`;

        if (level > highScore) {
            highScore = level;
            localStorage.setItem("simonHighScore", highScore);
            h3.innerText = `High Score: ${highScore}`;
        }

        setTimeout(() => {
            document.body.style.backgroundColor = "#f5f5f5";
        }, 150);

        started = false;
    }
}

function btnPress() {
    if (!started) return;

    const btn = this;
    const userColor = btn.id;

    userFlash(btn);
    userSeq.push(userColor);
    checkAnswer(userSeq.length - 1);
}

const allBtns = document.querySelectorAll(".btn");
allBtns.forEach(btn => btn.addEventListener("click", btnPress));

function reset() {
    gameSeq = [];
    userSeq = [];
    level = 0;
}