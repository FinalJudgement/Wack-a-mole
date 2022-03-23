const grid = document.querySelector(".grid");
const squares = document.querySelectorAll(".square");
const mole = document.querySelector(".mole");
const timeLeft = document.querySelector("#time-left");
const score = document.querySelector("#score");
const gameOverWindow = document.querySelector(".game-over-window");
const gameOver = document.querySelector(".game-over");
const playAgain = document.querySelector("#reset-button");

let result = 0;
let hitPosition;
let currentTime = 30;
let timerId = null;
let countDownTimerId;

function startGame() {
  grid.style.filter = "blur(5px)";
  gameOver.innerHTML = "Ready?";
  playAgain.textContent = "Begin!";
  gameOverWindow.style.display = "flex";
}

function randomSquare() {
  squares.forEach((square) => {
    square.classList.remove("mole");
  });

  let randomSquare = squares[Math.floor(Math.random() * 9)];

  setTimeout(() => {
    randomSquare.classList.add("mole");
  }, Math.floor(((Math.random() * 10) / 1 + 2) * 100));

  hitPosition = randomSquare.id;
}
console.log(Math.floor(((Math.random() * 10) / 1 + 2) * 100));

squares.forEach((square) => {
  square.addEventListener("mousedown", () => {
    if (square.id === hitPosition) {
      result++;
      score.textContent = result;
      hitPosition = null;
    }
  });
});

function moveMole() {
  timerId = setInterval(randomSquare, 1500);
}
function countDown() {
  currentTime--;
  timeLeft.textContent = currentTime;
  if (currentTime === 0) {
    currentTime = 0;
    clearInterval(countDownTimerId);
    clearInterval(timerId);
    grid.style.filter = "blur(5px)";
    gameOver.innerHTML = "Game Over! <br/> Your Final Score is " + result;
    playAgain.textContent = "Play Again!";
    gameOverWindow.style.display = "flex";
  }
}

function resetGame() {
  result = 0;
  score.textContent = result;
  currentTime = 30;
  timeLeft.textContent = currentTime;
  moveMole();
  countDownTimerId = setInterval(countDown, 1000);
  gameOverWindow.style.display = "none";
  grid.style.filter = "none";
}

startGame();
playAgain.addEventListener("click", resetGame);
