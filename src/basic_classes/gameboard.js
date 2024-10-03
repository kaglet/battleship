let gameboard = () => {
  let size = 10;
  let grid = new Array(size);
  let ships = [];

  // initialize grid
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      grid[i] = new Array(size);
    }
  }

  // assumes x is constant and y is changing so vertical orientation
  const placeShip = function (ship, x, y) {
    ships.push(ship);
    if (ship.orientation === "V") {
      for (let j = y; j < y + ship.length; j++) {
        grid[x][j] = ship;
      }
    } else if (ship.orientation === "H") {
      for (let i = x; i < x + ship.length; i++) {
        grid[i][y] = ship;
      }
    }
  };

  const receiveAttack = function (x, y) {
    if (!grid[x][y]) {
      grid[x][y] = "M";
    } else {
      grid[x][y].hit();
    }
  };

  const areShipsSunk = function (x, y) {
    if (ships.some((ship) => ship.isSunk() === false)) return false;

    return true;
  };

  return {
    size,
    grid,
    ships,
    placeShip,
    receiveAttack,
    areShipsSunk,
    get ships() {
      return ships;
    },
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
