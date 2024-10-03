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
  shipInstance.length = 4;
  shipInstance.orientation = "V";
  gameboardInstance.placeShip(shipInstance, x, y);

  for (let j = y; j < shipInstance.length; j++) {
    const element = gameboardInstance.grid[x][j];
    expect(element).toHaveProperty("length");
    expect(element).toHaveProperty("numHits");
    expect(element).toHaveProperty("isSunk");
    expect(element).toHaveProperty("hit");
    expect(element).toHaveProperty("orientation");
  }
});

test("Place ship on valid grid space horizontally", () => {
  let shipInstance = ship();
  let gameboardInstance = gameboard();
  let x = 1;
  let y = 4;
  shipInstance.length = 4;
  shipInstance.orientation = "H";
  gameboardInstance.placeShip(shipInstance, x, y);

  for (let i = x; i < shipInstance.length; i++) {
    const element = gameboardInstance.grid[i][y];
    expect(element).toHaveProperty("length");
    expect(element).toHaveProperty("numHits");
    expect(element).toHaveProperty("isSunk");
    expect(element).toHaveProperty("hit");
    expect(element).toHaveProperty("orientation");
  }
});

test("Take hit on unoccupied spot", () => {
  let gameboardInstance = gameboard();
  let x = 3;
  let y = 7;
  expect(gameboardInstance.takeHit(x, y)).toBe("M");
});

test("Take hit on occupied spot", () => {
  let gameboardInstance = gameboard();
  let shipInstance = ship();
  shipInstance.length = 4;

  let x = 3;
  let y = 7;

  gameboardInstance.placeShip(shipInstance, x, y);
  gameboardInstance.takeHit(x, y);
  expect(gameboardInstance.grid[x][y].hit).toBe(true);
});
