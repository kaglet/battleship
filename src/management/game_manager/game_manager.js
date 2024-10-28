const player = require("../../basic_classes/player");
const imgToShipMapper = require("../image_to_ship_mapper/image_to_ship_mapper.js");

const gameManager = (() => {
  let player1, player2;
  let player1UIBoard, player2UIBoard;

  let beginBtn;

  const setPlayerTypes = function () {
    player1 = player();
    player2 = player();

    player1.setTypeToHuman();
    player2.setTypeToBot();
  };

  const displayWinner = function () {};

  setPlayerTypes();
  console.log(imgToShipMapper);

  // On win or lose conditions met display this
  // As the game progresses wherever and as scores are tallied allow it to end
  const endGame = function () {
    const setupManager = require("../setup_manager/setup_manager.js");
    displayWinner();
    setupManager.displaySetupView();
    console.log(setupManager);
  };

  return {
    endGame,
    get player1() {
      return player1;
    },
    get player2() {
      return player2;
    },
    set player1UIBoard(val) {
      player1UIBoard = val;
    },
    set player2UIBoard(val) {
      player2UIBoard = val;
    },
    get player1UIBoard() {
      return player1UIBoard;
    },
    get player2UIBoard() {
      return player2UIBoard;
    },
  };
})();

module.exports = gameManager;
