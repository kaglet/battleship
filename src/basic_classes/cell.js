const cell = () => {
  let mark, ship;

  const markHit = function () {
    mark = "hit";
    ship.hit();
  };

  const markMiss = function () {
    mark = "miss";
  };

  return {
    get mark() {
      return mark;
    },
    set ship(val) {
      ship = val;
    },
    get ship() {
      return ship;
    },
    markHit,
    markMiss,
  };
};

module.exports = cell;
