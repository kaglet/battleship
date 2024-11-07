const cpuController = require("../cpu_controller/cpu_controller");
const displayWinner = require("../game_manager/display_winner/display_winner");
const visualizeHit = require("../game_manager/visualize_hit/visualize_hit");

const playerController = (() => {
  const allowPlayerMoves = function () {
    const gameManager = require("../game_manager/game_manager");

    let cpuBoard = gameManager.player2UIBoard;
    let cpuLogicalBoard = gameManager.player2.playerGameboard;

    let cpuCells = cpuBoard.children;
    let cpuCellsArr = Array.from(cpuCells);

    cpuCellsArr.forEach((cell) => {
      cell.addEventListener("click", () => {
        if (
          !cpuController.isMoveInBounds(cell.dataset.col) ||
          !cpuController.isMoveInBounds(cell.dataset.row) ||
          cpuLogicalBoard.grid[cell.dataset.col][cell.dataset.row].mark ===
            "miss" ||
          cpuLogicalBoard.grid[cell.dataset.col][cell.dataset.row].mark ===
            "hit"
        ) {
          return;
        }

        cpuLogicalBoard.receiveAttack(cell.dataset.col, cell.dataset.row);
        visualizeHit(cell, cpuLogicalBoard, cell.dataset.col, cell.dataset.row);
        if (cpuLogicalBoard.areShipsSunk()) {
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
