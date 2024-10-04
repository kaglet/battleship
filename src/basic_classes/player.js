const gameboard = require("./gameboard");

const player = () => {
  let name;
  let playerGameboard = gameboard();
  let type;

  return {
    name,
    playerGameboard,
    type,
    set name(val) {
      name = val;
    },
    get name() {
      return name;
    },
    set playerGameboard(val) {
      playerGameboard = val;
    },
    get playerGameboard() {
      return playerGameboard;
    },
    setTypeToHuman() {
      type = "H";
    },
    setTypeToBot() {
      type = "V";
    },
    get type() {
      return type;
    },
  };
};

module.exports = player;
