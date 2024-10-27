// Pre-game setup
// Controls what happens before game even starts
const gameboard = require("../../basic_classes/gameboard");
const randomizeShipPlacement = require("../randomize_ships/randomize_ships");
const gameManager = require("../game_manager/game_manager");

// Do I want certain methods to be differently modular (on different modules)?
const setupManager = (() => {
  /* TODO: Decide where to store player data, not here, it is not its responsibility and it is better spread out elsewhere
This is just for setup, define setup */
  let randomizeBtn, beginBtn;

  const init = function () {
    beginBtn = document.querySelector("button.begin");
    randomizeBtn = document.querySelector("button.randomize");
    // TODO: Remove all ships from selected board for randomization which is the player board of course anyway by default
    // TODO: So randomization working here is fine although you may have to pass parameters for UI and logical board to do randomization on
    randomizeBtn.addEventListener("click", () => {
      // Delete old and reassign a new gameboard
      gameManager.player1.playerGameboard = gameboard();
      // Clear current board for player 1 removing any svgs on grid
      clearUIBoard(gameManager.player1UIBoard);
      randomizeShipPlacement(
        gameManager.player1UIBoard,
        gameManager.player1.playerGameboard
      );
    });

    beginBtn.addEventListener("click", () => {
      createPlayArea();
    });
  };

  // I think when they are destroyed and new instances are created we don't need to manage clearing
  const clearUIBoard = (board) => {
    let children = board.children;
    let childrenArr = Array.from(children);

    childrenArr.forEach((child) => {
      if (child.classList.contains("ship")) {
        child.remove();
      }
    });
  };

  const populateUIBoardFromLogical = (board) => {};

  return { init, clearUIBoard, populateUIBoardFromLogical };
})();

module.exports = setupManager;
