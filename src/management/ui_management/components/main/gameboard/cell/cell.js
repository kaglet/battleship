const cell = () => {
  let cellDisplay = document.createElement("div");
  cellDisplay.classList.add("cell");
  cellDisplay.style.zIndex = 0;

  return cellDisplay;
};

module.exports = cell;
