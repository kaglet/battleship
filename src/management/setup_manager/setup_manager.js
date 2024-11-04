// Pre-game setup
const randomizeShipPlacement = require("../randomize_ships/randomize_ships");
const gameManager = require("../game_manager/game_manager");
const createGameplayView = require("./create_gameplay_view/create_gameplay_view");
const createButtons = require("../ui_management/components/main/button_options/create_buttons");
const shipSelectionPanel = require("../ui_management/components/pictures_display/pictures_display");
const populateUIBoardFromLogical = require("../populate_ui_board/populate_ui_board");
const resetter = require("./resetter/resetter");
const dragDropController = require("../ui_management/controllers/drag_and_drop_controller/drag_and_drop_controller");

const setupManager = (() => {
  let randomizeBtn, beginBtn;

  const init = function () {
    beginBtn = document.querySelector("button.begin");
    randomizeBtn = document.querySelector("button.randomize");
    randomizeBtn.addEventListener("click", () => {
      // Delete old and reassign a new gameboard
      resetter.resetP1LogicalBoard();
      clearUIBoard(gameManager.player1UIBoard);
      console.log(gameManager.player1.playerGameboard);
      randomizeShipPlacement(
        gameManager.player1UIBoard,
        gameManager.player1.playerGameboard
      );
    });

    beginBtn.addEventListener("click", () => {
      createGameplayView();
      gameManager.player1UIBoard = document.querySelector(".player.board");
      gameManager.player2UIBoard = document.querySelector(".cpu.board");

      populateUIBoardFromLogical(
        gameManager.player1UIBoard,
        gameManager.player1.playerGameboard
      );
      randomizeShipPlacement(
        gameManager.player2UIBoard,
        gameManager.player2.playerGameboard
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
    let mainSection = document.querySelector("section.main");
    let { randomizeBtn, beginBtn } = createButtons();
    let shipsDisplay = shipSelectionPanel();
    let container = document.createElement("section");
    container.classList.add("container");

    let childrenArr = Array.from(mainSection.children);
    childrenArr.forEach((child) => {
      mainSection.removeChild(child);
    });

    // reset references
    resetter.resetP1LogicalBoard();
    resetter.resetP1UIBoard();
    resetter.resetP2LogicalBoard();
    resetter.resetP2UIBoard();
    // Replace UI gameboards

    container.append(gameManager.player1UIBoard, randomizeBtn, beginBtn);

    mainSection.append(shipsDisplay, container);
    mainSection.classList.toggle("in-setup");
    mainSection.classList.toggle("in-game");

    dragDropController.init();
    init();
  };

  return { init, clearUIBoard, displaySetupView };
})();

module.exports = setupManager;
