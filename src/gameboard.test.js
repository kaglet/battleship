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
  let x = 1;
  let y = 4;
  shipInstance.length = 4;
  gameboardInstance.placeShip(shipInstance, x, y);
  for (let i = x; i < 2; i++) {
    for (let j = y; j < shipInstance.length; j++) {
      const element = gameboardInstance.grid[i];
      expect(element).toHaveProperty("length");
      expect(element).toHaveProperty("numHits");
      expect(element).toHaveProperty("isSunk");
      expect(element).toHaveProperty("hit");
      expect(element).toHaveProperty("orientation");
    }
  }
});

// TODO: Produce out of bounds error and do not place. I.e. reject placement completely if an out of bounds is detected using the length as a guide.
// TODO: There will never be x cells greater than 10 so I do not think you have to ever catch this right?
test("Place ship on invalid grid space", () => {
  let shipInstance = ship();
  let gameboardInstance = gameboard();
  let x = 1;
  let y = 10;
  shipInstance.length = 4;
  expect(() => gameboardInstance.placeShip(shipInstance, x, y)).toThrow(
    "Ship is out of bounds and cannot be placed"
  );
  // Placement controller should place it in previous spot
});
