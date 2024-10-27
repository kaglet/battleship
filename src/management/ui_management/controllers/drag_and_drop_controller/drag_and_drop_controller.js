const ship = require("../../../../basic_classes/ship.js");
const gameManager = require("../../../game_manager/game_manager.js");
const imgToShipMapper = require("../../../image_to_ship_mapper/image_to_ship_mapper.js");
const gameboard = require("../../../../basic_classes/gameboard.js");

// Manages drag and drop functionality of ship images onto board
// One approach is to generate new ship in its place and move the old one (make its position absolute)
// If dropped before we get to board we must lose it forever

const dragDropController = (() => {
  let isShipSelected;
  let draggableShipType;
  let uiBoard;
  let logicalGameboard;
  let orientationPreference = "V";

  const getManipulatedGameboard = function () {
    return logicalGameboard;
  };

  const setOrientationFromPreference = function (pref) {
    orientationPreference = pref;
  };

  const getOrientationFromPreference = function () {
    return orientationPreference;
  };

  const markEndOfSelection = function () {
    // TODO: At end after all ships are used up marked by counter of ships dropped/present on board and used therefore clear selection, in fact after a ship is dropped clear selection or maybe keep it until ships inside are exhausted
    /* TODO: There can be an object with property names of the types, from each type dropped onto board place onto counter, one for player one for opponent.
     Each time ship is dropped increase count for that type and if destroyed decrease count for that type*/
  };

  // Visually place ship image in grid
  const placeAtCoordinates = function (
    col,
    row,
    shipDroppedCopy,
    draggableShipType
  ) {
    let newShip = ship();
    newShip.type = draggableShipType;
    let rowEnd = row + newShip.size;
    let colEnd = col + newShip.size;

    newShip.orientation = getOrientationFromPreference();

    console.log(gameManager.player1UIBoard);
    uiBoard.appendChild(shipDroppedCopy);

    // Prevent overlap before placement
    if (newShip.orientation === "V") {
      // If out bounds calculate by how much it will be by and bring it back in, by offsetting the start therefore offsetting the end
      let isRowOutOfBounds = rowEnd >= logicalGameboard.size;
      if (isRowOutOfBounds) {
        // If rowEnd coincides with the logical gameboard size it is out of bounds by 1 so use +1
        let offset = rowEnd - logicalGameboard.size;
        rowEnd -= offset;
        row -= offset;
      }

      if (logicalGameboard.checkOverlap(newShip, col, row)) {
        return -1;
      }

      // shipDroppedCopy.style.transform = "rotate(-90deg)";
      shipDroppedCopy.style.gridRowStart = row + 1;
      shipDroppedCopy.style.gridRowEnd = `${rowEnd + 1}`;
      shipDroppedCopy.style.gridColumnStart = col + 1;
      shipDroppedCopy.style.gridColumnEnd = `${col + 2}`;
    } else if (newShip.orientation === "H") {
      let isColOutOfBounds = colEnd >= logicalGameboard.size;
      if (isColOutOfBounds) {
        let offset = colEnd - logicalGameboard.size;
        colEnd -= offset;
        col -= offset;
      }

      if (logicalGameboard.checkOverlap(newShip, col, row)) {
        return -1;
      }

      shipDroppedCopy.style.gridColumnStart = col + 1;
      shipDroppedCopy.style.gridColumnEnd = `${colEnd + 1}`;
      shipDroppedCopy.style.gridRowStart = row + 1;
      shipDroppedCopy.style.gridRowEnd = `${row + 2}`;
    }

    shipDroppedCopy.style.zIndex = 3;

    // Logically place ship in grid
    logicalGameboard.placeShip(newShip, col, row);

    console.log("New ship is ", newShip);

    return 1;
  };

  // Create ship img to drop down from chosen url
  const getShipImgFromChosenType = (type) => {
    let img = document.createElement("div");
    img.classList.add("ship");
    img.style.backgroundImage = `url("${type}")`;

    return img;
  };

  const clearSelection = () => {
    isShipSelected = false;
    draggableShipType = "";
  };

  const dropShip = function (e) {
    if (isShipSelected === true) {
      let shipDroppedCopy = getShipImgFromChosenType(
        imgToShipMapper.getPicFromType(draggableShipType, orientationPreference)
      );

      console.log(e.target);

      let row = +e.target.dataset.row;
      let col = +e.target.dataset.col;

      placeAtCoordinates(col, row, shipDroppedCopy, draggableShipType);
      clearSelection();
    }
  };

  const markChosenShip = function (ship1) {
    // From ship picture save type for ship object instantiation and assigning a type (to inform the length for highlight) when dropping the object
    draggableShipType = imgToShipMapper.getTypeFromPic(ship1.dataset.url);
    isShipSelected = true;
    console.log("Chosen ship type is ", draggableShipType);
  };

  const init = function () {
    clearSelection();

    let ships = document.querySelectorAll(".ships img");
    ships.forEach((ship) => {
      ship.addEventListener("mousedown", () => markChosenShip(ship));
    });

    let cells = document.querySelectorAll(".cell");
    cells.forEach((cell) => {
      cell.addEventListener("click", dropShip);
    });

    logicalGameboard = gameManager.player1.playerGameboard;
    uiBoard = gameManager.player1UIBoard;
  };

  return {
    init,
    getManipulatedGameboard,
    dropShip,
    placeAtCoordinates,
    clearSelection,
    getShipImgFromChosenType,
    setOrientationFromPreference,
    // Manage boards acted on by drag and drop controller
    set uiBoard(val) {
      uiBoard = val;
    },
    get uiBoard() {
      return uiBoard;
    },
    set logicalGameboard(val) {
      logicalGameboard = val;
    },
    get logicalGameboard() {
      return logicalGameboard;
    },
  };
})();

module.exports = dragDropController;
