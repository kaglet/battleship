const battleship = require("../assets/images/battleship.svg");
const carrier = require("../assets/images/carrier.svg");
const destroyer = require("../assets/images/destroyer.svg");
const patrolBoat = require("../assets/images/patrolBoat.svg");
const submarine = require("../assets/images/submarine.svg");

const imgToShipMapper = (() => {
  const getPicFromType = function (type) {
    switch (type) {
      case "battleship":
        return battleship;
      case "carrier":
        return carrier;
      case "destroyer":
        return destroyer;
      case "patrolBoat":
        return patrolBoat;
      case "submarine":
        return submarine;

      default:
        break;
    }
  };

  const getTypeFromPic = function (url) {
    const lastForwardSlash = url.lastIndexOf("/");
    // TODO: Find the position of the last occurence of a symbol from the end
    // For a url of this form: "url(\"http://localhost:8080/battleship.svg\")"
    let newUrl = url.slice(lastForwardSlash + 1, -6);
    return newUrl;
  };

  return { getPicFromType, getTypeFromPic };
})();

module.exports = imgToShipMapper;
