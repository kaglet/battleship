const cell = require("./cell.js");

test("Module exists", () => expect(cell).toBeTruthy());

test("Has specified basic properties/functions) markMiss, markHit, ship", () => {
  // check property value pair of module
  let cellInstance = cell();
  expect(cellInstance).toHaveProperty("mark");
  expect(cellInstance).toHaveProperty("ship");
  expect(cellInstance).toHaveProperty("markHit");
  expect(cellInstance).toHaveProperty("markMiss");
});

// mark hit and mark miss need to have side effects to ship objects if there are any
