require("./styles/styles.css");
const pictureDisplay = require("./ui_management/components/pictures_display/pictures_display");
const dragDropController = require("./ui_management/controllers/drag_and_drop_controller/drag_and_drop_controller.js");
const main = require("./ui_management/components/main/main.js");

const init = (() => {
  let body = document.querySelector("body");
  let mainDisplay = main();
  mainDisplay.appendChild(pictureDisplay());
  body.appendChild(mainDisplay);
  dragDropController.init();
})();
