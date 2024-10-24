const player = require("../basic_classes/player");

const gameManager = (() => {
  let player1, player2;

  let beginBtn;

  const setPlayerTypes = function () {
    player1 = player();
    player2 = player();

    player1.setTypeToHuman();
    player2.setTypeToBot();
  };

  setPlayerTypes();

  const init = function () {
    beginBtn = document.querySelector("button.begin");

    beginBtn.addEventListener("click", () => {
      displayGameplayView();
    });
  };

  // On win or lose conditions met display this
  // As the game progresses wherever and as scores are tallied allow it to end
  const endGame = function () {
    displayWinner();
    displaySetupView();
  };

  return {
    get player1() {
      return player1;
    },
    get player2() {
      return player2;
    },
  };
})();

module.exports = gameManager;
