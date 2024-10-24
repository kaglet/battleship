const gameManager = require("../../../controllers/game_manager");
const shipSelectionPanel = require("../pictures_display/pictures_display");
const gameboard = require("./gameboard/gameboard");

const main = () => {
  let mainDisplay = document.createElement("section");
  mainDisplay.classList.add("main");

  mainDisplay.append(shipSelectionPanel());

  let container = document.createElement("section");
  container.classList.add("container");

  let randomizeBtn = document.createElement("button");
  let beginBtn = document.createElement("button");

  randomizeBtn.textContent = "randomize";
  beginBtn.textContent = "begin";

  randomizeBtn.classList.add("randomize");
  beginBtn.classList.add("begin");

  let playerGameboard = gameboard();
  gameManager.player1UIBoard = playerGameboard;

  container.append(playerGameboard, randomizeBtn, beginBtn);
  mainDisplay.append(container);

  return mainDisplay;
};

module.exports = main;
