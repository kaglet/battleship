let ship = () => {
  let length = 0;
  let numHits = 0;
  let orientation = "H";

  const isSunk = function isSunk() {
    if (numHits === length) {
      return true;
    } else if (numHits < length) {
      return false;
    } else {
      /* This indicates somehow the number of hits is more than length 
        which should be impossible unless it is registered to be hit twice.
        Nowhere in code must you allow this. Multiple hits should be blocked anyway. 
        This affirms to check if the block is not present or is circumvented. */
      throw new Error("Ship cannot be hit multiple times");
    }
  };

  const hit = function hit() {
    numHits++;
    return numHits;
  };

  return {
    length,
    numHits,
    isSunk,
    hit,
    orientation,
    get length() {
      return length;
    },
    set length(val) {
      length = val;
    },
    get numHits() {
      return numHits;
    },
    set numHits(val) {
      numHits = val;
    },
    get orientation() {
      return orientation;
    },
    setOrientationVertical() {
      orientation = "V";
    },
    setOrientationHorizontal() {
      orientation = "H";
    },
  };
};

module.exports = ship;