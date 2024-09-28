let ship = () => {
  let length = 0;
  let numHits = 0;

  const isSunk = function isSunk() {};

  const hit = function hit() {
    numHits++;
    return numHits;
  };

  return {
    length,
    numHits,
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
  };
};

module.exports = ship;
