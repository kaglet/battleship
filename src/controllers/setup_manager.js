// Pre-game setup
// Controls what happens before game even starts

const randomizeShipPlacement = require("../utility_functions/randomize_ships/randomize_ships");
const gameManager = require("./game_manager");

// Do I want certain methods to be differently modular (on different modules)?
const setupManager = (() => {
  /* TODO: Decide where to store player data, not here, it is not its responsibility and it is better spread out elsewhere
This is just for setup, define setup */
  let randomizeButton;

  const init = function () {
    let randomizeBtn = document.querySelector("button.randomize");
    // TODO: Remove all ships from selected board for randomization which is the player board of course anyway by default
    // TODO: So randomization working here is fine although you may have to pass parameters for UI and logical board to do randomization on
    randomizeBtn.addEventListener("click", () => {
      // gameManager.player1.playerGameboard = gameboard();
      // setupManager.clearUIBoard(gameManager.player1UIBoard);
      randomizeShipPlacement(
        gameManager.player1UIBoard,
        gameManager.player1.playerGameboard
      );
    });
  };

  // I think when they are destroyed and new instances are created we don't need to manage clearing
  const clearUIBoard = (board) => {};

  const populateUIBoardFromLogical = (board) => {};

  return { init, clearUIBoard, populateUIBoardFromLogical };
})();

module.exports = setupManager;
