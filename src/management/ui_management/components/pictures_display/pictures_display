const carrier = require("../../../../assets/images/carrier.svg");
const battleship = require("../../../../assets/images/battleship.svg");
const patrolBoat = require("../../../../assets/images/patrolBoat.svg");
const destroyer = require("../../../../assets/images/destroyer.svg");
const submarine = require("../../../../assets/images/submarine.svg");

const shipSelectionPanel = () => {
  let shipsDisplay = document.createElement("section");
  shipsDisplay.classList.add("ships", "selection-panel");

  let ships = [carrier, battleship, patrolBoat, destroyer, submarine];

  ships.forEach((ship) => {
    let img = document.createElement("img");
    img.style.backgroundImage = `url("${ship}")`;
    img.setAttribute("data-url", img.style.backgroundImage);
    img.classList.add("ship");
    shipsDisplay.append(img);
  });

  return shipsDisplay;
};

module.exports = shipSelectionPanel;
