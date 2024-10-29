// Pre-game setup
// Controls what happens before game even starts
const gameboard = require("../../basic_classes/gameboard");
const randomizeShipPlacement = require("../randomize_ships/randomize_ships");
const gameManager = require("../game_manager/game_manager");
const createGameplayView = require("./create_gameplay_view/create_gameplay_view");
const createButtons = require("../ui_management/components/main/button_options/create_buttons");
const shipSelectionPanel = require("../ui_management/components/pictures_display/pictures_display");

// Do I want certain methods to be differently modular (on different modules)?
const setupManager = (() => {
  /* TODO: Decide where to store player data, not here, it is not its responsibility and it is better spread out elsewhere
This is just for setup, define setup */
  let randomizeBtn, beginBtn;

  const clearP1Board = function () {
    // Delete old and reassign a new gameboard
    gameManager.player1.playerGameboard = gameboard();
    // Clear current board for player 1 removing any svgs on grid
    clearUIBoard(gameManager.player1UIBoard);
  };

  const clearP2Board = function () {
    // Delete old and reassign a new gameboard
    gameManager.player2.playerGameboard = gameboard();
    // Clear current board for player 1 removing any svgs on grid
    clearUIBoard(gameManager.player2UIBoard);
  };

  const init = function () {
    beginBtn = document.querySelector("button.begin");
    randomizeBtn = document.querySelector("button.randomize");
    randomizeBtn.addEventListener("click", () => {
      // Delete old and reassign a new gameboard
      clearP1Board();
      randomizeShipPlacement(
        gameManager.player1UIBoard,
        gameManager.player1.playerGameboard
      );
    });

    beginBtn.addEventListener("click", () => {
      console.log(setupManager);
      createGameplayView();
      gameManager.player2UIBoard = document.querySelector(".cpu.board");

      randomizeShipPlacement(
        gameManager.player2UIBoard,
        gameManager.player1.playerGameboard
      );
    });
  };

  // I think when they are destroyed and new instances are created we don't need to manage clearing
  const clearUIBoard = function (board) {
    let children = board.children;
    let childrenArr = Array.from(children);

    childrenArr.forEach((child) => {
      if (child.classList.contains("ship")) {
        child.remove();
      }
    });
  };

  const displaySetupView = function () {
    // TODO: Too complicated, just draw and redraw entire views and have functions that reconstruct main section
    let cpuBoard = gameManager.player2UIBoard;
    let p1Board = gameManager.player1UIBoard;
    let mainSection = document.querySelector("section.main");
    let container = document.querySelector(".main section.container");
    let { randomizeBtn, beginBtn } = createButtons();
    let shipsDisplay = shipSelectionPanel();

    clearP2Board();
    mainSection.removeChild(cpuBoard);
    mainSection.insertBefore(shipsDisplay, p1Board);
    container.append(randomizeBtn, beginBtn);
    clearP1Board();
  };

  return { init, clearUIBoard, displaySetupView };
})();

module.exports = setupManager;
