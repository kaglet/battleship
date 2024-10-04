const gameboard = require("./gameboard/gameboard");

const main = () => {
  let mainDisplay = document.createElement("section");
  mainDisplay.classList.add("main");

  mainDisplay.appendChild(gameboard());

  return mainDisplay;
};

module.exports = main;
