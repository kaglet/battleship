const ship = require("../../../basic_classes/ship");
const imgToShipMapper = require("../../../logic_controllers/image_to_ship_mapper");
const gameboard = require("./../../../basic_classes/gameboard.js");

// Manages drag and drop functionality of ship images onto board
// One approach is to generate new ship in its place and move the old one (make its position absolute)
// If dropped before we get to board we must lose it forever

const dragDropController = (() => {
  let ship1;
  let isShipSelected = false;
  let draggableShipType;
  let uiBoard;
  let logicalGameboard = gameboard();

  const setOrientationFromPreference = function () {
    return "V";
  };

  const markEndOfSelection = function () {
    // TODO: At end after all ships are used up marked by counter of ships dropped/present on board and used therefore clear selection, in fact after a ship is dropped clear selection or maybe keep it until ships inside are exhausted
    /* TODO: There can be an object with property names of the types, from each type dropped onto board place onto counter, one for player one for opponent.
     Each time ship is dropped increase count for that type and if destroyed decrease count for that type*/
    isShipSelected = false;
  };

  const dropShip = function (e) {
    // TODO: place final copy of active ship down onto cell
    // Condition is true only when isDown is true as there was a ship selected
    if (isShipSelected === true) {
      let shipDroppedCopy = document.createElement("img");
      shipDroppedCopy.style.backgroundImage = `../../../assets/images/${imgToShipMapper.getPicFromType(
        draggableShipType
      )}`;

      console.log(e.target);

      let row = e.target.dataset.row;
      let col = e.target.dataset.col;

      let newShip = ship();
      newShip.type = draggableShipType;
      newShip.orientation = setOrientationFromPreference();

      let board = document.querySelector(".board");

      board.appendChild(shipDroppedCopy);
      shipDroppedCopy.style.gridRowStart = row;
      shipDroppedCopy.style.gridColumnStart = col;

      // Logically place ship in grid
      logicalGameboard.placeShip(newShip, col, row);

      // Visually place ship image in grid
      if (newShip.orientation === "V") {
        shipDroppedCopy.style.gridRowEnd = `span ${newShip.length}`;
      } else if (newShip.orientation === "H") {
        shipDroppedCopy.style.gridColumnEnd = `span ${newShip.length}`;
      }
    }

    isShipSelected = false;
  };

  // TODO: highlight a ship to delete it from board
  const deleteDraggable = function (e) {
    if (isShipSelected === true) {
      draggableShipType = "";
    }

    isShipSelected = false;
  };

  const markChosenShip = function (ship1) {
    // From ship picture save type for ship object instantiation and assigning a type (to inform the length for highlight) when dropping the object
    draggableShipType = imgToShipMapper.getTypeFromPic(ship1.dataset.url);
    isShipSelected = true;
  };

  const init = function () {
    let ships = document.querySelectorAll(".ships img");
    ships.forEach((ship) =>
      ship.addEventListener("mousedown", () => markChosenShip(ship))
    );

    let cells = document.querySelectorAll(".cell");
    cells.forEach((cell) => cell.addEventListener("mousedown", dropShip));
  };

  document.addEventListener("mouseup", deleteDraggable);

  return { init };
})();

module.exports = dragDropController;
