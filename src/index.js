const uiController = require("./ui_management/controllers/ui_controller/ui_controller.js");

require("./styles/styles.css");

const init = (() => {
  uiController.init();
})();
