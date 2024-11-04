const gameboardProto = {
  get ships() {
    return this._ships;
  },
  set ships(value) {
    this._ships = value;
  },
  get size() {
    return this._size;
  },
  set size(value) {
    this._size = value;
  },
  get grid() {
    return this._grid;
  },
  set grid(value) {
    this._grid = value;
  },
  checkOverlap(ship, x, y) {
    let isObstructionFound = false;

    if (ship.orientation === "V") {
      for (let j = y; j < y + ship.size; j++) {
        let elementInPath = this._grid[x][j];
        if (elementInPath !== undefined && elementInPath.isShip === true) {
          isObstructionFound = true;
          return isObstructionFound;
        }
      }
    } else if (ship.orientation === "H") {
      for (let i = x; i < x + ship.size; i++) {
        let elementInPath = this._grid[i][y];
        if (elementInPath !== undefined && elementInPath.isShip === true) {
          isObstructionFound = true;
          return isObstructionFound;
        }
      }
    }

    return isObstructionFound;
  },
  // assumes x is constant and y is changing so vertical orientation
  placeShip(ship, x, y) {
    this._ships.push(ship);
    if (ship.orientation === "V") {
      for (let j = y; j < y + ship.size; j++) {
        this._grid[x][j] = ship;
      }
    } else if (ship.orientation === "H") {
      for (let i = x; i < x + ship.size; i++) {
        this._grid[i][y] = ship;
      }
    }
  },
  receiveAttack(x, y) {
    if (!this._grid[x][y]) {
      this._grid[x][y] = "M";
    } else {
      this._grid[x][y].hit();
    }
  },
  areShipsSunk() {
    if (this._ships.some((ship) => ship.isSunk() === false)) return false;

    return true;
  },
};

const gameboard = () => {
  let newGameboard = Object.create(gameboardProto);

  newGameboard.size = 10;
  newGameboard.grid = new Array(newGameboard.size);
  newGameboard.ships = [];
  newGameboard.isGameboard = true;

  // initialize grid
  for (let i = 0; i < newGameboard.size; i++) {
    for (let j = 0; j < newGameboard.size; j++) {
      newGameboard.grid[i] = new Array(newGameboard.size);
    }
  }

  return newGameboard;
};

module.exports = gameboard;
