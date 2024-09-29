let ship = () => {
  let length = 0;
  let numHits = 0;
  let x, y;

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
    x,
    y,
    isSunk,
    hit,
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
    get x() {
      return x;
    },
    set x(val) {
      x = val;
    },
    get y() {
      return y;
    },
    set y(val) {
      y = val;
    },
  };
};

module.exports = ship;
