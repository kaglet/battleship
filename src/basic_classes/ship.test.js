const ship = require("./ship.js");

test("Module exists", () => expect(ship).toBeTruthy());

test("(Has specified basic properties/functions) Size, sunken status, and number of hits, hit", () => {
  let shipInstance = ship();
  expect(shipInstance).toHaveProperty("size");
  expect(shipInstance).toHaveProperty("numHits");
  expect(shipInstance).toHaveProperty("isSunk");
  expect(shipInstance).toHaveProperty("hit");
  expect(shipInstance).toHaveProperty("orientation");
  expect(shipInstance).toHaveProperty("type");
});

test("First hit works", () => {
  let shipInstance = ship();
  expect(shipInstance.hit()).toBe(1);
});

test("Hit again works", () => {
  let shipInstance = ship();
  shipInstance.hit();
  expect(shipInstance.hit()).toBe(2);
});

test("(Sunken status) Number of hits less than ship length", () => {
  let shipInstance = ship();
  shipInstance.size = 3;

  shipInstance.hit();
  shipInstance.hit();
  expect(shipInstance.isSunk()).toBeFalsy();
});

test("(Sunken status) Number of hits greater than ship length", () => {
  let shipInstance = ship();

  shipInstance.size = 3;

  shipInstance.hit();
  shipInstance.hit();
  shipInstance.hit();
  shipInstance.hit();
  shipInstance.hit();

  expect(shipInstance.isSunk).toThrowError();
});

test("(Sunken status) Number of hits equal to ship length", () => {
  let shipInstance = ship();

  shipInstance.size = 3;
  shipInstance.hit();
  shipInstance.hit();
  shipInstance.hit();

  expect(shipInstance.isSunk()).toBeTruthy();
});

test("Setting ship type changes length correctly", () => {
  let shipInstance = ship();

  shipInstance.setTypeToPatrolBoat();

  expect(shipInstance.size).toBe(2);
});

// TODO: Check orientation changes
