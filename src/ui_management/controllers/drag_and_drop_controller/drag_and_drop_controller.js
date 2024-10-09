const restaurantImg = require("../../../assets/images/ahtziri-lagarde-4_FsMDmCc6A-unsplash.jpg");

// Manages drag and drop functionality of ship images onto board
// One approach is to generate new ship in its place and move the old one (make its position absolute)
// If dropped before we get to board we must lose it forever

const dragDropController = (() => {
  let ship1;
  let isShipSelected = false;
  let draggableShip;
  let board;

  const dropShip = function (e) {
    // TODO: place final copy of active ship down onto cell
    // Condition is true only when isDown is true as there was a ship selected
    if (isShipSelected === true) {
      let shipDroppedCopy = document.createElement("img");
      shipDroppedCopy.style.backgroundImage =
        draggableShip.style.backgroundImage;
      board.appendChild(shipDroppedCopy);

      // TODO: append this element to the grid then give it an explicit placement whether it overlaps with other elements such as the cell
      // TODO: to make the cell visible modify the opacity of the picture
    }

    isShipSelected = false;
  };

  // TODO: highlight a ship to delete it from board
  const deleteDraggable = function (e) {
    console.log(e.target);
    if (isShipSelected === true) {
      draggableShip.remove();
    }

    isShipSelected = false;
  };

  const markChosenShip = function (e, ship1) {
    // TODO: From ship picture make it so you know ship object to mark as chosen
    // TODO: from object you get when clicking on a pic can map to corresponding pic

    draggableShip = ship1CopyToDrag;

    // Mark a ship is selected for drop to know
    // TODO: At end after all ships are used clear selection, in fact after a ship is dropped clear selection or maybe keep it until ships inside are exhausted
    isShipSelected = true;
  };

  const init = function () {
    ship1 = document.querySelector("img");
    ship1.addEventListener("mousedown", (e) => markChosenShip(e, ship1));

    cells = document.querySelectorAll(".cell");

    cells.forEach((cell) => cell.addEventListener("mousedown", dropShip));
  };

  document.addEventListener("mouseup", deleteDraggable);
  // will an arbitrary div element block the moveup listener on the grid. No right. Because all of the divs are not blocking the grid.
  // But they do not have any events on them.
  // The picture is not part of the grid. It is an element on top of it absolutely positioned

  return { init };
})();

module.exports = dragDropController;
