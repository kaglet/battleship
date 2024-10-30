const imgToShipMapper = require("../image_to_ship_mapper/image_to_ship_mapper");
const dragDropController = require("../ui_management/controllers/drag_and_drop_controller/drag_and_drop_controller");

// TODO: Delete this redundant outdated method, good utility method but possibly not needed anymore
const populateUIBoardFromLogical = (uiBoard, logicalBoard) => {
  // how do I manually place and render ships, well you do it for their given length and move on
  // or simply use the ships list of each board to populate, that might be easiest
  // loop through ships list and call place method for each ship with their start coordinate stored

  // record logical placement coordinates or simply go for their length and orientation in placement since that is all we need
  // including coordinates where we encounter a ship, but then we somehow need a skip mechanism
  dragDropController.uiBoard = uiBoard;

  logicalBoard.ships.forEach((ship) => {
    let shipImg = dragDropController.getShipImgFromChosenType(
      imgToShipMapper.getPicFromType(ship.type, ship.orientation)
    );
    dragDropController.placeAtCoordinates(ship.x, ship.y, shipImg, ship.type);
  });
};

module.exports = populateUIBoardFromLogical;
