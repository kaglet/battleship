const restaurantImg = require("../../../assets/images/ahtziri-lagarde-4_FsMDmCc6A-unsplash.jpg");

// TODO: The picture will have to be generated inside to be a child of the grid container in order to specify its placement in the grid.
// When you demand the pic it must be generated in the pic on drop not necessarily on drag.
// The dragged picture, the original picture, are all symbolic.

// Manages drag and drop functionality of ship images onto board
// One approach is to generate new ship in its place and move the old one (make its position absolute)
// If dropped before we get to board we must lose it forever

// TODO: Make it redraggable after being dropped or make it disappear, either one
// TODO: If they find themselves on the grid (within the coordinates, it must be dropped onto the cell mouse is hovering over)
// If mouse down is clicked while something is being dragged and is currently selected then check if it has been dropped onto a cell

const dragDropController = (() => {
  let ship1;
  let isDown = false;
  let offset = [0, 0];

  const createDraggableFromOriginal = function (e, ship1) {
    let ship1CopyToDrag = document.createElement("img");
    ship1CopyToDrag.style.backgroundImage = `url("${restaurantImg}")`;
    ship1CopyToDrag.classList.add("ship", "dragged");
    ship1CopyToDrag.style.position = "absolute";

    isDown = true;
    offset = [ship1.offsetLeft - e.clientX, ship1.offsetTop - e.clientY];

    let body = document.querySelector("body");
    body.appendChild(ship1CopyToDrag);

    console.log(ship1);
    // Place it at a position when it first appears and as it is dragged it will move
    // Here it appears on screen directly on top of original pic
    ship1CopyToDrag.style.left =
      window.scrollY + ship1.getBoundingClientRect().left + "px";
    ship1CopyToDrag.style.top =
      window.scrollX + ship1.getBoundingClientRect().top + "px";

    ship1CopyToDrag.addEventListener(
      "mousemove",
      function (e) {
        e.preventDefault();
        if (isDown) {
          mousePosition = {
            x: e.clientX,
            y: e.clientY,
          };

          ship1CopyToDrag.style.left = mousePosition.x + offset[0] + "px";
          ship1CopyToDrag.style.top = mousePosition.y + offset[1] + "px";
        }
      },
      true
    );
  };

  const init = function () {
    ship1 = document.querySelector("img");
    ship1.addEventListener("mousedown", (e) =>
      createDraggableFromOriginal(e, ship1)
    );
  };

  document.addEventListener(
    "mouseup",
    function () {
      isDown = false;
    },
    true
  );

  return { init };
})();

module.exports = dragDropController;
