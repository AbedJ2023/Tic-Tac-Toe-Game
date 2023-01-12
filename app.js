let gameActive = true;
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];

const statusDisplay = document.querySelector(".game--status");
const player1Input = document.getElementById("player1Input");
const player1InputButton = document.getElementById("nameInputButton1");
const player2Input = document.getElementById("player2Input");
const player2InputButton = document.getElementById("nameInputButton2");
const playerNameDisplay1 = document.getElementById("playerNameDisplay1");
const playerNameDisplay2 = document.getElementById("playerNameDisplay2");
const playerXDiv = document.querySelector("#playerXDiv");
const playerODiv = document.querySelector("#playerODiv");

player1InputButton.addEventListener("click", () => {
  if (player1Input.value === ``) {
    playerNameDisplay1.innerText = `Player X must have a name`;
  } else {
    playerNameDisplay1.innerText = "Player ( X ) Name: " + player1Input.value;
    player1Input.value = "";
    playerXDiv.style.visibility = "hidden";
  }
});
player2InputButton.addEventListener("click", () => {
  if (player2Input.value === ``) {
    playerNameDisplay2.innerText = `Player O must have a name`;
  } else {
    playerNameDisplay2.innerText = "Player ( O ) Name: " + player2Input.value;
    player2Input.value = "";
    playerODiv.style.visibility = "hidden";
  }
});

const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

statusDisplay.innerHTML = currentPlayerTurn();

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const handleCellPlayed = (clickedCell, clickedCellIndex) => {
  gameState[clickedCellIndex] = currentPlayer;
  clickedCell.innerHTML = currentPlayer;
};

const handlePlayerChange = () => {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusDisplay.innerHTML = currentPlayerTurn();
};

const handleResultValidation = () => {
  let roundWon = false;
  for (let i = 0; i <= 7; i++) {
    const winCondition = winningConditions[i];
    let a = gameState[winCondition[0]];
    let b = gameState[winCondition[1]];
    let c = gameState[winCondition[2]];
    if (a === "" || b === "" || c === "") {
      continue;
    }
    if (a === b && b === c) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    statusDisplay.innerHTML = winningMessage();
    gameActive = false;
    return;
  }

  let roundDraw = !gameState.includes("");
  if (roundDraw) {
    statusDisplay.innerHTML = drawMessage();
    gameActive = false;
    return;
  }

  handlePlayerChange();
};

const handleCellClick = (clickedCellEvent) => {
  const clickedCell = clickedCellEvent.target;
  const clickedCellIndex = parseInt(
    clickedCell.getAttribute("data-cell-index")
  );

  if (gameState[clickedCellIndex] !== "" || !gameActive) {
    return;
  }

  handleCellPlayed(clickedCell, clickedCellIndex);
  handleResultValidation();
};

const handleRestartGame = () => {
  gameActive = true;
  currentPlayer = "X";
  gameState = ["", "", "", "", "", "", "", "", ""];
  statusDisplay.innerHTML = currentPlayerTurn();
  document.querySelectorAll(".cell").forEach((cell) => (cell.innerHTML = ""));
  resetNames();
};

const resetNames = () => {
  playerNameDisplay1.innerText = "";
  playerNameDisplay2.innerText = "";
  player1Input.value = "";
  player2Input.value = "";
  playerXDiv.style.visibility = "visible";
  playerODiv.style.visibility = "visible";
};

document
  .querySelectorAll(".cell")
  .forEach((cell) => cell.addEventListener("click", handleCellClick));
document
  .querySelector(".game--restart")
  .addEventListener("click", handleRestartGame);
