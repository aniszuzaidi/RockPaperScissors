const choices = ["rock", "paper", "scissors"];
const emojiMap = {
  rock: "✊ Rock",
  paper: "✋ Paper",
  scissors: "✌️ Scissors"
};

const playerScoreEl     = document.getElementById("player-score");
const computerScoreEl   = document.getElementById("computer-score");
const drawScoreEl       = document.getElementById("draw-score");
const playerPickEl      = document.getElementById("player-pick");
const computerPickEl    = document.getElementById("computer-pick");
const resultMsgEl       = document.getElementById("result-message");
const resetBtn          = document.getElementById("reset-btn");
const choicesContainer  = document.getElementById("choices-container");
const gameOverContainer = document.getElementById("game-over-container");
const gameOverMessage   = document.getElementById("game-over-message");
const playAgainBtn      = document.getElementById("play-again-btn");

let playerScore   = 0;
let computerScore = 0;
let drawScore     = 0;
let isGameOver    = false;

function getComputerChoice() {
  return choices[Math.floor(Math.random() * choices.length)];
}

function getResult(player, computer) {
  if (player === computer) return "draw";
  if (
    (player === "rock"     && computer === "scissors") ||
    (player === "paper"    && computer === "rock")     ||
    (player === "scissors" && computer === "paper")
  ) {
    return "win";
  }
  return "lose";
}

function play(playerChoice) {
  if (isGameOver) return;

  const computerChoice = getComputerChoice();
  const result = getResult(playerChoice, computerChoice);

  playerPickEl.textContent   = emojiMap[playerChoice];
  computerPickEl.textContent = emojiMap[computerChoice];
  resultMsgEl.className      = "result-message";

  if (result === "win") {
    playerScore++;
    playerScoreEl.textContent = playerScore;
    resultMsgEl.textContent   = "You win!";
    resultMsgEl.classList.add("win");
  } else if (result === "lose") {
    computerScore++;
    computerScoreEl.textContent = computerScore;
    resultMsgEl.textContent     = "You lose!";
    resultMsgEl.classList.add("lose");
  } else {
    drawScore++;
    drawScoreEl.textContent = drawScore;
    resultMsgEl.textContent = "It is a draw!";
    resultMsgEl.classList.add("draw");
  }

  checkWinner();
}

function checkWinner() {
  if (playerScore === 5) {
    endGame("You won the game! 🎉");
  } else if (computerScore === 5) {
    endGame("Computer won the game! 🤖");
  }
}

function endGame(message) {
  isGameOver = true;
  choicesContainer.style.display = "none";
  gameOverContainer.style.display = "block";
  gameOverMessage.textContent = message;
}

function resetGame() {
  playerScore = 0;
  computerScore = 0;
  drawScore = 0;
  isGameOver = false;

  playerScoreEl.textContent   = 0;
  computerScoreEl.textContent = 0;
  drawScoreEl.textContent     = 0;
  playerPickEl.textContent    = "❓";
  computerPickEl.textContent  = "❓";
  resultMsgEl.textContent     = "Make your choice!";
  resultMsgEl.className       = "result-message";

  choicesContainer.style.display = "flex";
  gameOverContainer.style.display = "none";
}

document.querySelectorAll(".choice-btn").forEach(btn => {
  btn.addEventListener("click", () => play(btn.dataset.choice));
});

resetBtn.addEventListener("click", resetGame);
playAgainBtn.addEventListener("click", resetGame);
