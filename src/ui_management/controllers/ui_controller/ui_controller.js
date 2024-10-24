const gameManager = require("../../../controllers/game_manager");
const randomizeShipPlacement = require("../../../utility_functions/randomize_ships/randomize_ships");
const footer = require("../../components/footer/footer");
const header = require("../../components/header/header");
const main = require("../../components/main/main");
const dragDropController = require("../drag_and_drop_controller/drag_and_drop_controller");

const uiController = (() => {
  const init = function () {
    let body = document.querySelector("body");

    body.append(header(), main(), footer());
    dragDropController.init();

    let randomizeBtn = document.querySelector("button.randomize");
    // TODO: Remove all ships from selected board for randomization which is the player board of course anyway by default
    // TODO: So randomization working here is fine although you may have to pass parameters for UI and logical board to do randomization on
    randomizeBtn.addEventListener("click", () =>
      randomizeShipPlacement(
        gameManager.player1UIBoard,
        gameManager.player1.playerGameboard
      )
    );
  };

  return { init };
})();

module.exports = uiController;
