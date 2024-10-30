const gameManager = require("../../game_manager/game_manager");
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
    gameManager.endGame();
  });

  cpuBoard.classList.add("cpu", "board");
  playerBoard.classList.add("player", "1");

  mainSection.append(backToSetupBtn, playerBoard, cpuBoard);

  mainSection.classList.toggle("in-game");
  mainSection.classList.toggle("in-setup");

  // use populate UI grid from logical grid command and section the function off for use here
  // we'll need to use this to refresh the grid during play though to indicate any changes
};

module.exports = createGameplayView;
