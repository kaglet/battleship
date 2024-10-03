const ship = require("./ship.js");

test("Module exists", () => expect(ship).toBeTruthy());

test("(Has specified basic properties/functions) Length, sunken status, and number of hits, hit", () => {
  let shipInstance = ship();
  expect(shipInstance).toHaveProperty("length");
  expect(shipInstance).toHaveProperty("numHits");
  expect(shipInstance).toHaveProperty("isSunk");
  expect(shipInstance).toHaveProperty("hit");
  expect(shipInstance).toHaveProperty("orientation");
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
  shipInstance.length = 3;

  shipInstance.hit();
  shipInstance.hit();
  expect(shipInstance.isSunk()).toBeFalsy();
});

test("(Sunken status) Number of hits greater than ship length", () => {
  let shipInstance = ship();

  shipInstance.length = 3;

  shipInstance.hit();
  shipInstance.hit();
  shipInstance.hit();
  shipInstance.hit();
  shipInstance.hit();

  expect(shipInstance.isSunk).toThrowError();
});

test("(Sunken status) Number of hits equal to ship length", () => {
  let shipInstance = ship();

  shipInstance.length = 3;
  shipInstance.hit();
  shipInstance.hit();
  shipInstance.hit();

  expect(shipInstance.isSunk()).toBeTruthy();
});
