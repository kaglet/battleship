const gameManager = require("../../../game_manager/game_manager");
const shipSelectionPanel = require("../pictures_display/pictures_display");
const createButtons = require("./button_options/create_buttons");
const gameboard = require("./gameboard/gameboard");

const main = () => {
  let mainDisplay = document.createElement("section");
  mainDisplay.classList.add("main");

  mainDisplay.append(shipSelectionPanel());

  let container = document.createElement("section");
  container.classList.add("container");

  let { randomizeBtn, beginBtn } = createButtons();

  let playerGameboard = gameboard();
  playerGameboard.classList.add("player", "1");
  gameManager.player1UIBoard = playerGameboard;

  let directionControl = document.createElement("button");
  directionControl.textContent = "V";
  directionControl.classList.add("direction");
  directionControl.classList.toggle("vertical");

  directionControl.addEventListener("click", () => {
    directionControl.textContent =
      directionControl.textContent === "H" ? "V" : "H";
    directionControl.classList.toggle("vertical");
    directionControl.classList.toggle("horizontal");
  });

  container.append(directionControl, playerGameboard, randomizeBtn, beginBtn);
  mainDisplay.append(container);

  mainDisplay.classList.toggle("in-setup");

  return mainDisplay;
};

module.exports = main;
