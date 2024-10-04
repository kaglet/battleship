const cell = () => {
  let cellDisplay = document.createElement("div");
  cellDisplay.classList.add("cell");

  return cellDisplay;
};

module.exports = cell;
