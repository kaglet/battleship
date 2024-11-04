const displayWinner = require("../game_manager/display_winner/display_winner");
const visualizeHit = require("../game_manager/visualize_hit/visualize_hit");

const playerController = (() => {
  const allowPlayerMoves = function () {
    const gameManager = require("../game_manager/game_manager");

    let cpuBoard = gameManager.player2UIBoard;
    let playerBoard = gameManager.player1.playerGameboard;

    let cpuCells = cpuBoard.children;
    let cpuCellsArr = Array.from(cpuCells);

    cpuCellsArr.forEach((cell) => {
      cell.addEventListener("click", () => {
        playerBoard.receiveAttack(cell.dataset.col, cell.dataset.row);
        visualizeHit(cell, playerBoard, cell.dataset.col, cell.dataset.row);
        if (playerBoard.areShipsSunk()) {
          const setupManager = require("../setup_manager/setup_manager");
          displayWinner("Player 2");
          setupManager.displaySetupView();
        }

        gameManager.switchTurn();
      });
    });
  };

  return { allowPlayerMoves };
})();

module.exports = playerController;
