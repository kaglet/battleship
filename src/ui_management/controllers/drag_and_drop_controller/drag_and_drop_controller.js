const ship = require("../../../basic_classes/ship");
const imgToShipMapper = require("../../../logic_controllers/image_to_ship_mapper");
const gameboard = require("./../../../basic_classes/gameboard.js");

// Manages drag and drop functionality of ship images onto board
// One approach is to generate new ship in its place and move the old one (make its position absolute)
// If dropped before we get to board we must lose it forever

const dragDropController = (() => {
  let isShipSelected;
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
      shipDroppedCopy.style.backgroundImage = `url("${imgToShipMapper.getPicFromType(
        draggableShipType
      )}")`;

      console.log(e.target);

      let row = +e.target.dataset.row;
      let col = +e.target.dataset.col;

      let newShip = ship();
      newShip.type = draggableShipType;
      newShip.orientation = setOrientationFromPreference();

      let board = document.querySelector(".board");

      board.appendChild(shipDroppedCopy);
      shipDroppedCopy.style.gridRowStart = row + 1;
      shipDroppedCopy.style.gridColumnStart = col + 1;

      // Logically place ship in grid
      logicalGameboard.placeShip(newShip, col, row);
      console.log("New ship is ", newShip);

      // Visually place ship image in grid
      if (newShip.orientation === "V") {
        shipDroppedCopy.style.gridRowEnd = `span ${newShip.length}`;
      } else if (newShip.orientation === "H") {
        shipDroppedCopy.style.gridColumnEnd = `span ${newShip.length}`;
      }

      isShipSelected = false;
      draggableShipType = "";
    }
  };

  const markChosenShip = function (ship1) {
    // From ship picture save type for ship object instantiation and assigning a type (to inform the length for highlight) when dropping the object
    draggableShipType = imgToShipMapper.getTypeFromPic(ship1.dataset.url);
    isShipSelected = true;
    console.log("Chosen ship type is ", draggableShipType);
  };

  const init = function () {
    isShipSelected = false;

    let ships = document.querySelectorAll(".ships img");
    ships.forEach((ship) => {
      ship.addEventListener("mousedown", () => markChosenShip(ship));
      console.log("Ship listener attached");
    });

    let cells = document.querySelectorAll(".cell");
    cells.forEach((cell) => {
      cell.addEventListener("click", dropShip);
      console.log("Event listener attached to ", cell);
    });
  };

  document.addEventListener("mousedown", () => console.log("hello"));

  return { init };
})();

module.exports = dragDropController;
