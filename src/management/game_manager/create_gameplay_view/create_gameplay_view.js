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
  playerBoard.classList.add("player", "1", "board");

  mainSection.append(backToSetupBtn, playerBoard, cpuBoard);

  mainSection.classList.toggle("in-game");
  mainSection.classList.toggle("in-setup");
};

module.exports = createGameplayView;
