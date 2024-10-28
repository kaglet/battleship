const gameManager = require("../../game_manager/game_manager");
const gameboard = require("../../ui_management/components/main/gameboard/gameboard");

// displayGameplayView
const completeGameplayView = () => {
  let cpuBoard = gameboard();
  let mainSection = document.querySelector(".main");
  let shipsDisplay = document.querySelector(".ships.selection-panel");

  let buttonsContainer = document.querySelector(".main section.container");

  let buttons = document.querySelectorAll(".main section.container button");

  cpuBoard.classList.add("cpu", "board");

  mainSection.append(cpuBoard);
  mainSection.removeChild(shipsDisplay);
  buttons.forEach((button) => {
    buttonsContainer.removeChild(button);
  });
  // use populate UI grid from logical grid command and section the function off for use here
  // we'll need to use this to refresh the grid during play though to indicate any changes
};

module.exports = completeGameplayView;
