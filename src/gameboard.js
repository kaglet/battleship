let gameboard = () => {
  let size = 10;
  let ships = [];

  return {
    size,
    ships,
    get size() {
      return size;
    },
    set size(value) {
      size = value;
    },
  };
};

module.exports = gameboard;
