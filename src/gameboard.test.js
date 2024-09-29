const gameboard = require("./gameboard.js");

test("Module exists", () => expect(gameboard).toBeTruthy());

test("Has specified basic properties/functions) size, ships", () => {
  // check property value pair of module
  let gameboardInstance = gameboard();
  expect(gameboardInstance).toHaveProperty("size");
  expect(gameboardInstance).toHaveProperty("ships");
});

test("Board initializes with correct specified size", () => {
  // check property value pair of module
  let gameboardInstance = gameboard();
  expect(gameboardInstance).toHaveProperty("size", 10);
});

// Place ship, it instantiates, manages, and keeps ships
// would be nice if they were a self property of the ships though no?
// We could make it a direct return into ship's properties thereby not making it a side effect, and update frame based off position
// of all ships and where they are hit
// test("Place ship at specified coordinates");
