const gameboard = require("./gameboard");

const playerProto = {
  set name(val) {
    this._name = val;
  },
  get name() {
    return this._name;
  },
  set playerGameboard(val) {
    this._playerGameboard = val;
  },
  get playerGameboard() {
    return this._playerGameboard;
  },
  setTypeToHuman() {
    this._type = "H";
  },
  setTypeToBot() {
    this._type = "C";
  },
  get type() {
    return this._type;
  },
};

const player = () => {
  let newPlayer = Object.create(playerProto);
  newPlayer.name = "";
  newPlayer.playerGameboard = gameboard();
  newPlayer.type;
  newPlayer.isPlayer = true;

  return newPlayer;
};

module.exports = player;
