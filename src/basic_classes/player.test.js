const player = require("./player.js");

test("Module exists", () => expect(player).toBeTruthy());

// TODO: Have set methods for orientation instead of manual input
test("(Has specified basic properties/functions) gameboard, name", () => {
  let playerInstance = player();
  expect(playerInstance).toHaveProperty("name");
  expect(playerInstance).toHaveProperty("playerGameboard");
  expect(playerInstance).toHaveProperty("type");
  expect(playerInstance).toHaveProperty("setTypeToHuman");
  expect(playerInstance).toHaveProperty("setTypeToBot");
});
