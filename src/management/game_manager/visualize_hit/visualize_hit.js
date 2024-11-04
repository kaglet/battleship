const crossIcon = require("../../../assets/images/cross.svg");

const visualizeHit = (cell, logicalGameboard, col, row) => {
  let img = document.createElement("div");
  img.classList.add("ship");
  img.style.backgroundImage = `url("${crossIcon}")`;
  cell.append(img);

  if (
    logicalGameboard.grid[col][row] !== "M" &&
    logicalGameboard.grid[col][row].isSunk()
  ) {
    // TODO: Perform this step
    console.log("Increase opacity of sunk ship to expose it");
  }
};

module.exports = visualizeHit;
