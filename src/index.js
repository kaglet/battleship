require("./styles/styles.css");
const dragDropController = require("./ui_management/controllers/drag_and_drop_controller/drag_and_drop_controller.js");
const main = require("./ui_management/components/main/main.js");

var mousePosition;
var offset = [0, 0];
var div;
var isDown = false;

div = document.createElement("div");
div.style.position = "relative";
div.style.left = "0px";
div.style.top = "0px";
div.style.width = "100px";
div.style.height = "100px";
div.style.background = "red";
div.style.color = "blue";

document.body.appendChild(div);

// When the mouse is pressed down on the div
div.addEventListener(
  "mousedown",
  function (e) {
    isDown = true;

    // Calculate the offset between the div's current position and the mouse click position
    offset = [div.offsetLeft - e.clientX, div.offsetTop - e.clientY];
  },
  true
);

// When the mouse button is released
document.addEventListener(
  "mouseup",
  function () {
    isDown = false;
  },
  true
);

// When the mouse is moved
document.addEventListener(
  "mousemove",
  function (event) {
    event.preventDefault();

    if (isDown) {
      // Get the current mouse position
      mousePosition = {
        x: event.clientX,
        y: event.clientY,
      };

      // Set the new position of the div by applying the offset
      div.style.left = mousePosition.x + offset[0] + "px";
      div.style.top = mousePosition.y + offset[1] + "px";
    }
  },
  true
);
