const header = () => {
  let headerDisplay = document.createElement("header");
  let h1 = document.createElement("h1");
  h1.textContent = "Battleship";

  headerDisplay.append(h1);

  return headerDisplay;
};

module.exports = header;
