// TODO: Rename better but this randomly chooses coordinates and performs the drop ship function of the drag and drop controller, available to it
// This works for player and for CPU

const ship = require("../../basic_classes/ship");
const imgToShipMapper = require("../../controllers/image_to_ship_mapper");
const dragDropController = require("../../ui_management/controllers/drag_and_drop_controller/drag_and_drop_controller");
const getRandomNumber = require("./random/random_num_in_range");

// It manually must perform all the functions we specified, of selecting a ship then placing it.
const randomizeShipPlacement = () => {
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
    let shipImg = dragDropController.getShipImgFromChosenType(
      imgToShipMapper.getPicFromType(shipTypes[i])
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
      // retry placement
      i--;
    } else if (result === 1) {
      i++;
    }
  }
};

module.exports = randomizeShipPlacement;
