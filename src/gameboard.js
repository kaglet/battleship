let gameboard = () => {
  let size = 10;
  let grid = new Array(size);

  // initialize grid
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      grid[i] = new Array(size);
    }
  }

  const placeShip = function (ship, x, y) {
    for (let i = y; i < y + ship.length; i++) {
      grid[x][i] = ship;
    }
  };

  return {
    size,
    grid,
    placeShip,
    get size() {
      return size;
    },
    set size(value) {
      size = value;
    },
    get grid() {
      return grid;
    },
  };
};

module.exports = gameboard;
