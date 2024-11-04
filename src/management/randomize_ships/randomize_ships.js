const imgToShipMapper = require("../image_to_ship_mapper/image_to_ship_mapper");
const dragDropController = require("../ui_management/controllers/drag_and_drop_controller/drag_and_drop_controller");
const getRandomNumber = require("./random/random_num_in_range");

const randomizeShipPlacement = (usedUIBoard, usedLogicalBoard) => {
  const generateCoords = function () {
    return { x: getRandomNumber(0, 9), y: getRandomNumber(0, 9) };
  };

  let shipTypes = [
    "battleship",
    "carrier",
    "destroyer",
    "patrolBoat",
    "submarine",
  ];

  for (let i = 0; i < shipTypes.length; ) {
    let generatedCoords = generateCoords();
    let orientation;
    dragDropController.logicalGameboard = usedLogicalBoard;
    dragDropController.uiBoard = usedUIBoard;
    if (getRandomNumber(1, 2) === 1) {
      orientation = "V";
      dragDropController.setOrientationFromPreference(orientation);
    } else {
      orientation = "H";
      dragDropController.setOrientationFromPreference(orientation);
    }

    let shipImg = dragDropController.getShipImgFromChosenType(
      imgToShipMapper.getPicFromType(shipTypes[i], orientation)
    );

    let result = dragDropController.placeAtCoordinates(
      generatedCoords.x,
      generatedCoords.y,
      shipImg,
      shipTypes[i]
    );

    dragDropController.clearSelection();

    if (result === -1) {
      // explicitly leave i stuck and unchanged to retry placement
      continue;
    } else if (result === 1) {
      i++;
    }
  }
};

module.exports = randomizeShipPlacement;
