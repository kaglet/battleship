const cell = require("./cell/cell.js");

const gameboard = () => {
  let boardDisplay = document.createElement("div");
  boardDisplay.classList.add("board");
  boardDisplay.style.position = "relative";

  /* TODO: Make this based off created logical gameboard so they coincide
  The dragAndDrop controller must instantiate the gameboard first before this can operate and be called then*/
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      let cellDisplay = cell();
      cellDisplay.setAttribute("data-row", i);
      cellDisplay.setAttribute("data-col", j);

      boardDisplay.appendChild(cellDisplay);
    }
  }

  return boardDisplay;
};

module.exports = gameboard;
