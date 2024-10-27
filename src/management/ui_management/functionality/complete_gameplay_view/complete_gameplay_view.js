const gameboard = require("../../../../basic_classes/gameboard");

// displayGameplayView
const completeGameplayView = () => {
  let cpuBoard = gameboard();
  cpuBoard.classList.add("cpu");
  // use populate UI grid from logical grid command and section the function off for use here
  // we'll need to use this to refresh the grid during play though to indicate any changes
};

module.exports = completeGameplayView;
