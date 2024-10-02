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

test("Place ship on valid grid space", () => {
  let shipInstance = ship();
  let gameboardInstance = gameboard();
  shipInstance.length = 4;
  gameboardInstance.placeShip(shipInstance, 1, 4);
  for (let i = 1; i < 2; i++) {
    for (let j = 4; j < shipInstance.length; j++) {
      const element = gameboardInstance.grid[i];
      expect(element).toHaveProperty("length");
      expect(element).toHaveProperty("numHits");
      expect(element).toHaveProperty("isSunk");
      expect(element).toHaveProperty("hit");
      expect(element).toHaveProperty("orientation");
    }
  }
});

// Produce out of bounds error and do not place. I.e. reject placement completely if an out of bounds is detected using the length as a guide.
