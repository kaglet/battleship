const player = require("../../basic_classes/player");

const gameManager = (() => {
  let player1, player2;
  let player1UIBoard, player2UIBoard;

  const setPlayerTypes = function () {
    player1 = player();
    player2 = player();

    player1.setTypeToHuman();
    player2.setTypeToBot();
  };

  setPlayerTypes();
  // On win or lose conditions met display this
  // As the game progresses wherever and as scores are tallied allow it to end

  return {
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
