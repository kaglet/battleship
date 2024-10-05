const restaurantImg = require("../../../assets/images/ahtziri-lagarde-4_FsMDmCc6A-unsplash.jpg");

// TODO: The picture will have to be generated inside to be a child of the grid container in order to specify its placement in the grid.
// When you demand the pic it must be generated in the pic on drop not necessarily on drag.
// The dragged picture, the original picture, are all symbolic.

// Manages drag and drop functionality of ship images onto board
// One approach is to generate new ship in its place and move the old one (make its position absolute)
// If dropped before we get to board we must lose it forever

let isDown = false;
let offset = [0, 0];

const dragDropController = (() => {
  let ship1;
  const init = function () {
    ship1 = document.querySelector("img");
    ship1.addEventListener("mousedown", (e) => {
      let ship1CopyToDrag = document.createElement("img");
      ship1CopyToDrag.style.backgroundImage = `url("${restaurantImg}")`;
      ship1CopyToDrag.classList.add("ship", "dragged");
      ship1CopyToDrag.style.position = "absolute";

      isDown = true;
      offset = [ship1.offsetLeft - e.clientX, ship1.offsetTop - e.clientY];

      let body = document.querySelector("body");
      body.appendChild(ship1CopyToDrag);

      // TODO: place it at a position when it first appears and as it is dragged it will move
      ship1CopyToDrag.style.left = ship1.style.left + 100 + "px";
      ship1CopyToDrag.style.top = ship1.style.top + 40 + "px";
    });
  };

  return { init };
})();

module.exports = dragDropController;
