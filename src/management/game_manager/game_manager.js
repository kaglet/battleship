const player = require("../../basic_classes/player");
const cpuController = require("../cpu_controller/cpu_controller");
const playerController = require("../player_controller/player_controller");
const setBoardPlayable = require("./control_passing/set_board_playable/set_board_playable");
const setBoardUnplayable = require("./set_board_unplayable/set_board_unplayable");

const gameManager = (() => {
  let player1, player2;
  let player1UIBoard, player2UIBoard;
  let activePlayer = player1;

  const setPlayerTypes = function () {
    player1 = player();
    player2 = player();

    player1.setTypeToHuman();
    player2.setTypeToBot();
  };

  setPlayerTypes();

  const startGame = function () {
    setBoardPlayable(gameManager.player2UIBoard);
    setBoardUnplayable(gameManager.player1UIBoard);

    activePlayer = gameManager.player1;
    playerController.allowPlayerMoves();
  };

  const switchTurn = function () {
    if (activePlayer === player1) {
      activePlayer = player2;
      setBoardUnplayable(gameManager.player1UIBoard);
      setBoardPlayable(gameManager.player2UIBoard);

      cpuController.playTurn(gameManager.player1.playerGameboard);
      activePlayer = player1;
    } else if (activePlayer === player2) {
      activePlayer = player1;
      setBoardUnplayable(gameManager.player2UIBoard);
      setBoardPlayable(gameManager.player1UIBoard);
    }
  };
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
    startGame,
    switchTurn,
  };
})();

module.exports = gameManager;
