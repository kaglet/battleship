require("./styles/styles.css");
const dragDropController = require("./ui_management/controllers/drag_and_drop_controller/drag_and_drop_controller.js");
const main = require("./ui_management/components/main/main.js");
const shipSelectionPanel = require("./ui_management/components/pictures_display/pictures_display");

const init = (() => {
  let body = document.querySelector("body");
  let mainDisplay = main();

  body.appendChild(mainDisplay);
  mainDisplay.appendChild(shipSelectionPanel());
  dragDropController.init();
})();
