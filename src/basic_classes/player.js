const gameboard = require("./gameboard");

const player = () => {
  let name;
<<<<<<< HEAD
  let playerGameboard = gameboard();
=======
  let playerGameboard;
>>>>>>> 123d8fc272278b819b35b34d48eb30aa11b1939d
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
