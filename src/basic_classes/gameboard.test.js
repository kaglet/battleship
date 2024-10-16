const gameboard = require("./gameboard.js");
const ship = require("./ship.js");

test("Module exists", () => expect(gameboard).toBeTruthy());

test("Has specified basic properties/functions) size, ships", () => {
  // check property value pair of module
  let gameboardInstance = gameboard();
  expect(gameboardInstance).toHaveProperty("size");
  expect(gameboardInstance).toHaveProperty("grid");
});

test("Board initializes with correct specified size", () => {
  // check property value pair of module
  let gameboardInstance = gameboard();
  expect(gameboardInstance.grid).toHaveProperty("length", 10);
});

test("Place ship on valid grid space vertically", () => {
  let shipInstance = ship();
  let gameboardInstance = gameboard();
  let x = 1;
  let y = 4;
  shipInstance.size = 4;
  shipInstance.setOrientationVertical();
  gameboardInstance.placeShip(shipInstance, x, y);

  for (let j = y; j < shipInstance.size; j++) {
    const element = gameboardInstance.grid[x][j];
    expect(element.isShip).toBe(true);
  }
});

test("Place ship on valid grid space horizontally", () => {
  let shipInstance = ship();
  let gameboardInstance = gameboard();
  let x = 1;
  let y = 4;
  shipInstance.size = 4;
  shipInstance.setOrientationHorizontal();
  gameboardInstance.placeShip(shipInstance, x, y);

  for (let i = x; i < shipInstance.size; i++) {
    const element = gameboardInstance.grid[i][y];
    expect(element.isShip).toBe(true);
  }
});

test("Check overlap before placing ship", () => {
  let gameboardInstance = gameboard();
  let shipInstance1 = ship();
  let shipInstance2 = ship();
  shipInstance1.size = 4;
  shipInstance2.size = 4;
  gameboardInstance.placeShip(shipInstance1, 3, 5);

  expect(gameboardInstance.checkOverlap(shipInstance2, 3, 6)).toBe(false);
});

test("Track ships when added", () => {
  let gameboardInstance = gameboard();
  let shipInstance1 = ship();
  let shipInstance2 = ship();
  shipInstance1.size = 4;
  shipInstance2.size = 4;
  gameboardInstance.placeShip(shipInstance1, 3, 5);
  gameboardInstance.placeShip(shipInstance2, 4, 6);

  expect(gameboardInstance.ships.length).toBe(2);
});

test("Receive attack on unoccupied spot", () => {
  let gameboardInstance = gameboard();
  let x = 3;
  let y = 7;
  gameboardInstance.receiveAttack(x, y);
  expect(gameboardInstance.grid[x][y]).toBe("M");
});

test("Receive attack on occupied spot", () => {
  let gameboardInstance = gameboard();
  let shipInstance = ship();
  shipInstance.size = 4;

  let x = 3;
  let y = 7;

  gameboardInstance.placeShip(shipInstance, x, y);
  let oldHitCount = gameboardInstance.grid[x][y].numHits;
  gameboardInstance.receiveAttack(x, y);
  expect(gameboardInstance.grid[x][y].numHits).toBe(++oldHitCount);
});

test("Receive multiple attacks on occupied spot", () => {
  let gameboardInstance = gameboard();
  let shipInstance = ship();
  shipInstance.size = 4;

  let x = 3;
  let y = 7;

  gameboardInstance.placeShip(shipInstance, x, y);
  let oldHitCount = gameboardInstance.grid[x][y].numHits;
  gameboardInstance.receiveAttack(x, y);
  gameboardInstance.receiveAttack(x + 1, y);
  gameboardInstance.receiveAttack(x + 2, y);
  gameboardInstance.receiveAttack(x + 3, y);
  expect(gameboardInstance.grid[x][y].numHits).toBe(oldHitCount + 4);
});

// Check if all individual ships on board are sunk
test("Report when all ships sunken", () => {
  let gameboardInstance = gameboard();
  let shipInstance1 = ship();
  let shipInstance2 = ship();

  shipInstance1.size = 3;
  shipInstance2.size = 2;
  shipInstance2.setOrientationVertical();

  gameboardInstance.placeShip(shipInstance1, 0, 5);
  gameboardInstance.placeShip(shipInstance2, 4, 6);

  gameboardInstance.receiveAttack(0, 5);
  gameboardInstance.receiveAttack(1, 5);
  gameboardInstance.receiveAttack(1, 5);

  expect(gameboardInstance.areShipsSunk()).toBe(false);

  gameboardInstance.receiveAttack(4, 6);
  gameboardInstance.receiveAttack(4, 7);

  expect(gameboardInstance.areShipsSunk()).toBe(true);
});
