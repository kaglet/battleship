const shipSelectionPanel = require("../../pictures_display/pictures_display");
const cell = require("./cell/cell.js");

const gameboard = () => {
  let boardDisplay = document.createElement("div");
  boardDisplay.classList.add("board");
  boardDisplay.style.position = "relative";

  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      let cellDisplay = cell();
      cellDisplay.setAttribute("data-row", i);
      cellDisplay.setAttribute("data-col", j);

      boardDisplay.appendChild(cellDisplay);
    }
  }

  boardDisplay.appendChild(shipSelectionPanel());

  return boardDisplay;
};

module.exports = gameboard;
