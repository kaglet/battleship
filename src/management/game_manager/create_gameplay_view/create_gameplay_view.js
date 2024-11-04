const setBoardPlayable = require("../control_passing/set_board_playable/set_board_playable");
const gameManager = require("../game_manager");
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
    const setupManager = require("../../setup_manager/setup_manager");
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

  setBoardPlayable(p1CellsArr, gameManager.player1.playerGameboard);
  setBoardPlayable(cpuCellsArr, gameManager.player2.playerGameboard);

  // use populate UI grid from logical grid command and section the function off for use here
  // we'll need to use this to refresh the grid during play though to indicate any changes
};

module.exports = createGameplayView;
