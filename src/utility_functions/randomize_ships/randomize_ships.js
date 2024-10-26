// TODO: Rename better but this randomly chooses coordinates and performs the drop ship function of the drag and drop controller, available to it
// This works for player and for CPU

const ship = require("../../basic_classes/ship");
const imgToShipMapper = require("../../controllers/image_to_ship_mapper");
const dragDropController = require("../../ui_management/controllers/drag_and_drop_controller/drag_and_drop_controller");
const getRandomNumber = require("./random/random_num_in_range");

// It manually must perform all the functions we specified, of selecting a ship then placing it.
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

  // TODO: calculate time elapsed for if it takes too long
  for (let i = 0; i < shipTypes.length; ) {
    let generatedCoords = generateCoords();
    // try place until all pieces are used, so go down list one by one
    /* TODO: Choose the board to place them to not the default drag and drop controller single board both the 
    logical one and the UI one presented (and managing which is controlled to be presented), including specifying the one that will */
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
    // TODO: Randomize orientation unless set
    // TODO: Test on current board though random placement with random placement then allowing the CPU to automatically perform the task
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

// TODO: Use player gameboard and CPU gameboard in a streamlined manner instead of creating a random new gameboard
/* Then draw based off these logical gameboards that are populated, once by the dropShip function which must then get drawn 
if it gets completed */
/* TODO: So split up these 2 drawing the logical gameboard for the CPU and the ui gameboard after that completes, or specifying 
whether to draw immediately, because they are coupled in the same code */
