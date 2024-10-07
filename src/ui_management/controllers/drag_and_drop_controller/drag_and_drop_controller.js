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
  let draggableShip;
  let board;

  const dropDraggeableDown = function (e) {
    // TODO: place final copy of active ship down onto cell
    // Condition is true only when isDown is true as there was a ship selected
    console.log(e.target);
    console.log("hi i am in board");
    if (isDown === true) {
      let shipDroppedCopy = document.createElement("img");
      shipDroppedCopy.style.backgroundImage =
        draggableShip.style.backgroundImage;
      board.appendChild(shipDroppedCopy);
      // TODO: append this element to the grid then give it an explicit placement whether it overlaps with other elements such as the cell
      // TODO: to make the cell visible modify the opacity of the picture
    }

    isDown = false;
  };

  const deleteDraggable = function (e) {
    console.log(e.target);
    if (isDown === true) {
      draggableShip.remove();
    }

    isDown = false;
  };

  const moveDraggable = function (e, ship1CopyToDrag) {
    if (isDown) {
      e.preventDefault();

      ship1CopyToDrag.style.left = e.clientX + offset[0] + "px";
      ship1CopyToDrag.style.top = e.clientY + offset[1] + "px";
    }
  };

  const createDraggableFromOriginal = function (e, ship1) {
    let ship1CopyToDrag = document.createElement("img");
    ship1CopyToDrag.style.backgroundImage = ship1.style.backgroundImage;
    ship1CopyToDrag.classList.add("ship", "dragged");
    ship1CopyToDrag.style.position = "relative";

    // To know background image url of original ship and how much space it occupies
    draggableShip = ship1CopyToDrag;
    // draggableShip.style.pointerEvents = "none";

    isDown = true;
    offset = [ship1.offsetLeft - e.clientX, ship1.offsetTop - e.clientY];

    // TODO: Can give initial starting position to this copy ship before it is moved even perhaps
    board.appendChild(ship1CopyToDrag);

    console.log(ship1);
    // Place it at a position when it first appears and as it is dragged it will move
    // Here it appears on screen directly on top of original pic
    // Note to self: By being in the same parent they can now be positioned correctly
    ship1CopyToDrag.style.left = ship1.getBoundingClientRect().left + "px";
    ship1CopyToDrag.style.top = ship1.getBoundingClientRect().top + "px";

    ship1CopyToDrag.addEventListener("mousemove", (e) =>
      moveDraggable(e, ship1CopyToDrag)
    );
  };

  const init = function () {
    ship1 = document.querySelector("img");
    ship1.addEventListener("mousedown", (e) =>
      createDraggableFromOriginal(e, ship1)
    );
    board = document.querySelector(".board");

    board.addEventListener("mouseup", dropDraggeableDown);
  };

  document.addEventListener("mouseup", deleteDraggable);
  // will an arbitrary div element block the moveup listener on the grid. No right. Because all of the divs are not blocking the grid.
  // But they do not have any events on them.
  // The picture is not part of the grid. It is an element on top of it absolutely positioned

  return { init };
})();

module.exports = dragDropController;
