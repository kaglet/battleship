const setupManager = require("../../../setup_manager/setup_manager.js");
const footer = require("../../components/footer/footer");
const header = require("../../components/header/header");
const main = require("../../components/main/main");
const dragDropController = require("../drag_and_drop_controller/drag_and_drop_controller");

const uiController = (() => {
  const init = function () {
    let body = document.querySelector("body");

    body.append(header(), main(), footer());
    dragDropController.init();
    setupManager.init();
  };

  return { init };
})();

module.exports = uiController;
