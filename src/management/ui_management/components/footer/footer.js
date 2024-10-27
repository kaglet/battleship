const footer = () => {
  let footerDisplay = document.createElement("footer");
  let creditsDisplay = document.createElement("a");
  creditsDisplay.textContent = "Credits";

  footerDisplay.append(creditsDisplay);

  return footerDisplay;
};

module.exports = footer;
