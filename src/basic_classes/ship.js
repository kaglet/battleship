const shipProto = {
  get length() {
    return this._length;
  },
  set length(val) {
    this._length = val;
  },
  get numHits() {
    return this._numHits;
  },
  set numHits(val) {
    this._numHits = val;
  },
  get orientation() {
    return this._orientation;
  },
  set type(val) {
    switch (val) {
      case "battleship":
        this.setTypeToBattleship();
        break;
      case "carrier":
        this.setTypeToCarrier();
        break;
      case "destroyer":
        this.setTypeToDestroyer();
        break;
      case "submarine":
        this.setTypeToSubmarine();
        break;
      case "patrolBoat":
        this.setTypeToPatrolBoat();
        break;
      default:
        break;
    }
  },
  get type() {
    return this._type;
  },
  setTypeToPatrolBoat() {
    this._type = "patrolBoat";
    this._length = 2;
  },
  setTypeToSubmarine() {
    this._type = "submarine";
    this._length = 3;
  },
  setTypeToDestroyer() {
    this._type = "destroyer";
    this._length = 3;
  },
  setTypeToBattleship() {
    this._type = "battleship";
    this._length = 4;
  },
  setTypeToCarrier() {
    this._type = "carrier";
    this._length = 5;
  },
  setOrientationVertical() {
    this._orientation = "V";
  },
  setOrientationHorizontal() {
    this._orientation = "H";
  },
  isSunk() {
    if (this._numHits === this._length) {
      return true;
    } else if (this._numHits < this._length) {
      return false;
    } else {
      /* This indicates somehow the number of hits is more than length 
        which should be impossible unless it is registered to be hit twice.
        Nowhere in code must you allow this. Multiple hits should be blocked anyway. 
        This affirms to check if the block is not present or is circumvented. */
      throw new Error("Ship cannot be hit multiple times");
    }
  },

  hit() {
    this._numHits++;
    return this._numHits;
  },
};

const ship = () => {
  let newShip = Object.create(shipProto);

  // newShip.length = 0;
  newShip.numHits = 0;
  newShip.setOrientationHorizontal();
  newShip.isShip = true;

  return newShip;
};

module.exports = ship;
