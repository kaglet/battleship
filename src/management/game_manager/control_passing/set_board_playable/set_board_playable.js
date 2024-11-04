const displayWinner = require("../../display_winner/display_winner");
const visualizeHit = require("../../visualize_hit/visualize_hit");

const setBoardPlayable = (cells, playerGameboard) => {
  cells.forEach((cell) => {
    cell.addEventListener("click", () => {
      playerGameboard.receiveAttack(cell.dataset.col, cell.dataset.row);
      visualizeHit(cell, playerGameboard, cell.dataset.col, cell.dataset.row);
      if (playerGameboard.areShipsSunk()) {
        const setupManager = require("../../../setup_manager/setup_manager");
        displayWinner("Player 2");
        setupManager.displaySetupView();
      }
    });
  });
};

module.exports = setBoardPlayable;
