const logicalGameboard = require("../../../basic_classes/gameboard");
const gameManager = require("../../game_manager/game_manager");
const uiGameboard = require("../../ui_management/components/main/gameboard/gameboard");

const resetter = (function () {
  const resetP1LogicalBoard = function () {
    // Delete old and reassign a new gameboard
    gameManager.player1.playerGameboard = logicalGameboard();
  };

  const resetP2LogicalBoard = function () {
    // Delete old and reassign a new gameboard
    gameManager.player2.playerGameboard = logicalGameboard();
  };

  const resetP1UIBoard = function () {
    gameManager.player1UIBoard = uiGameboard();
  };

  const resetP2UIBoard = function () {
    gameManager.player2UIBoard = uiGameboard();
  };

  return {
    resetP1LogicalBoard,
    resetP1UIBoard,
    resetP2LogicalBoard,
    resetP2UIBoard,
  };
})();

module.exports = resetter;
