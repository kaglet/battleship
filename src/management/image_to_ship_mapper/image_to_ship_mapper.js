const battleship = require("../../assets/images/battleship.svg");
const carrier = require("../../assets/images/carrier.svg");
const destroyer = require("../../assets/images/destroyer.svg");
const patrolBoat = require("../../assets/images/patrolBoat.svg");
const submarine = require("../../assets/images/submarine.svg");
const battleshipV = require("../../assets/images/battleship_v.svg");
const carrierV = require("../../assets/images/carrier_v.svg");
const destroyerV = require("../../assets/images/destroyer_v.svg");
const patrolBoatV = require("../../assets/images/patrolBoat_v.svg");
const submarineV = require("../../assets/images/submarine_v.svg");

const imgToShipMapper = (() => {
  const getPicFromType = function (type, orientationPref) {
    switch (type) {
      case "battleship":
        if (orientationPref === "V") {
          return battleshipV;
        }
        return battleship;
      case "carrier":
        if (orientationPref === "V") {
          return carrierV;
        }
        return carrier;
      case "destroyer":
        if (orientationPref === "V") {
          return destroyerV;
        }
        return destroyer;
      case "patrolBoat":
        if (orientationPref === "V") {
          return patrolBoatV;
        }
        return patrolBoat;
      case "submarine":
        if (orientationPref === "V") {
          return submarineV;
        }
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
