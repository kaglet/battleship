require("./styles/styles.css");
const dragDropController = require("./ui_management/controllers/drag_and_drop_controller/drag_and_drop_controller.js");
const main = require("./ui_management/components/main/main.js");

const init = (() => {
  let body = document.querySelector("body");
  let mainDisplay = main();

  body.appendChild(mainDisplay);
  dragDropController.init();

  let div = document.createElement("div");
  div.style.position = "absolute";
  div.style.left = 100 + "px";
  div.style.top = 100 + "px";
  div.style.width = "100px";
  div.style.height = "100px";
  div.style.backgroundColor = "blue";

  mainDisplay.appendChild(div);
})();
