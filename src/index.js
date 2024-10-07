require("./styles/styles.css");
const dragDropController = require("./ui_management/controllers/drag_and_drop_controller/drag_and_drop_controller.js");
const main = require("./ui_management/components/main/main.js");

var mousePosition;
var offset = [0, 0];
var div;
var isDown = false;

div = document.createElement("div");
div.style.position = "absolute";
div.style.left = "0px";
div.style.top = "0px";
div.style.width = "100px";
div.style.height = "100px";
div.style.background = "red";
div.style.color = "blue";

document.body.appendChild(div);

// always keep the offset from the mousedown for when translating across the screen with the mousemove
// account for the difference between the mouse position and div when moving it positively now to where the mouse is
// we take the old mouse position therefore
// preserve the distance between that and the original mouse down position
div.addEventListener(
  "mousedown",
  function (e) {
    isDown = true;
    offset = [div.offsetLeft - e.clientX, div.offsetTop - e.clientY];
  },
  true
);

document.addEventListener(
  "mouseup",
  function () {
    isDown = false;
  },
  true
);

document.addEventListener(
  "mousemove",
  function (event) {
    if (isDown) {
      event.preventDefault();
      mousePosition = {
        x: event.clientX,
        y: event.clientY,
      };
      div.style.left = mousePosition.x + offset[0] + "px";
      div.style.top = mousePosition.y + offset[1] + "px";
    }
  },
  true
);
