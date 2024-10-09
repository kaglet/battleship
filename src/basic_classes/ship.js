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

  newShip.length = 0;
  newShip.numHits = 0;
  newShip.setOrientationHorizontal();

  return newShip;
};

module.exports = ship;
