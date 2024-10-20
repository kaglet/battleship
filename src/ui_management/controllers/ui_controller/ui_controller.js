const main = require("../../components/main/main");
const shipSelectionPanel = require("../../components/pictures_display/pictures_display");
const dragDropController = require("../drag_and_drop_controller/drag_and_drop_controller");

const uiController = (() => {
  const init = function () {
    let body = document.querySelector("body");
    let mainDisplay = main();

    body.appendChild(mainDisplay);
    mainDisplay.appendChild(shipSelectionPanel());
    dragDropController.init();
  };

  return { init };
})();

module.exports = uiController;
