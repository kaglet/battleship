// Pre-game setup
const setupManager = () => {
  /* TODO: Decide where to store player data, not here, it is not its responsibility and it is better spread out elsewhere
This is just for setup, define setup */
  let randomizeButton;

  const init = function () {
    randomizeButton = document.querySelector("button.randomize");

    randomizeButton.addEventListener("click", randomizeShipPlacement);
  };

  return { init };
};

module.exports = setupManager;
