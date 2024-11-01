const displayWinner = require("../../game_manager/display_winner/display_winner");
const gameManager = require("../../game_manager/game_manager");
const visualizeHit = require("../../game_manager/visualize_hit/visualize_hit");
const gameboard = require("../../ui_management/components/main/gameboard/gameboard");

// displayGameplayView
const createGameplayView = () => {
  let cpuBoard = gameboard();
  let playerBoard = gameboard();
  let mainSection = document.querySelector(".main");

  let children = mainSection.children;
  let childrenArr = Array.from(children);

  childrenArr.forEach((childNode) => {
    mainSection.removeChild(childNode);
  });

  let backToSetupBtn = document.createElement("button");
  backToSetupBtn.classList.add("back", "setup");
  backToSetupBtn.textContent = "<-";

  backToSetupBtn.addEventListener("click", () => {
    const setupManager = require("../setup_manager");
    setupManager.displaySetupView();
  });

  cpuBoard.classList.add("cpu", "board");
  playerBoard.classList.add("player", "1");

  mainSection.append(backToSetupBtn, playerBoard, cpuBoard);

  mainSection.classList.toggle("in-game");
  mainSection.classList.toggle("in-setup");

  let cpuCells = cpuBoard.children;
  let cpuCellsArr = Array.from(cpuCells);
  let p1Cells = playerBoard.children;
  let p1CellsArr = Array.from(p1Cells);

  cpuCellsArr.forEach((cell) => {
    cell.addEventListener("click", () => {
      gameManager.player2.playerGameboard.receiveAttack(
        cell.dataset.col,
        cell.dataset.row
      );
      visualizeHit(
        cell,
        gameManager.player2.playerGameboard,
        cell.dataset.col,
        cell.dataset.row
      );
      if (gameManager.player2.playerGameboard.areShipsSunk()) {
        const setupManager = require("../setup_manager");
        displayWinner("Player 2");
        setupManager.displaySetupView();
      }
    });
  });

  p1CellsArr.forEach((cell) => {
    cell.addEventListener("click", () => {
      gameManager.player1.playerGameboard.receiveAttack(
        cell.dataset.col,
        cell.dataset.row
      );
      visualizeHit(
        cell,
        gameManager.player1.playerGameboard,
        cell.dataset.col,
        cell.dataset.row
      );
      if (gameManager.player1.playerGameboard.areShipsSunk()) {
        const setupManager = require("../setup_manager");

        displayWinner("Player 1");
        setupManager.displaySetupView();
      }
    });
  });

  // use populate UI grid from logical grid command and section the function off for use here
  // we'll need to use this to refresh the grid during play though to indicate any changes
};

module.exports = createGameplayView;
