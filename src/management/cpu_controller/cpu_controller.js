// To control all CPU actions

const displayWinner = require("../game_manager/display_winner/display_winner");
const visualizeHit = require("../game_manager/visualize_hit/visualize_hit");
const getRandomNumber = require("../randomize_ships/random/random_num_in_range");

const cpuController = (() => {
  let lastMoveX, lastMoveY;
  let lastMovesWereASuccess = false;

  let nextMovesPossible = [-1, -1, -1, -1];
  let moveAlternatorPos = 0;
  let usedKnownCoordinates = false;

  const isMoveInBounds = function (val) {
    return val >= 0 && val <= 9;
  };

  const intendedMoveIsMarked = function (x, y, gameboard) {
    let logicalCell = gameboard.grid[x][y];

    if (
      logicalCell.mark === "hit" ||
      (logicalCell.mark === "miss" && lastMovesWereASuccess === true)
    ) {
      return true;
    }

    return false;
  };

  const generateRandomHitCoords = function (gameboard) {
    let x, y;

    x = getRandomNumber(0, 9);
    y = getRandomNumber(0, 9);

    // try number that has not been used yet and has not been a hit or miss
    if (lastMovesWereASuccess) {
      for (let i = moveAlternatorPos; i < nextMovesPossible.length; ) {
        // If move is in bounds take it until it results in miss then move onto another direction
        // So these actions are on assumption that it is a hit
        if (isMoveInBounds(nextMovesPossible[i])) {
          let value = nextMovesPossible[i];
          switch (i) {
            case 0:
              x = value;
              y = lastMoveY;
              nextMovesPossible[0]--;
              if (!intendedMoveIsMarked(x, y, gameboard)) {
                break;
              }

              moveAlternatorPos = 0;
            case 1:
              x = value;
              y = lastMoveY;
              nextMovesPossible[1]++;
              if (!intendedMoveIsMarked(x, y, gameboard)) {
                break;
              }

              moveAlternatorPos = 1;
            case 2:
              y = value;
              x = lastMoveX;
              nextMovesPossible[2]--;
              if (!intendedMoveIsMarked(x, y, gameboard)) {
                break;
              }
              moveAlternatorPos = 2;
            case 3:
              y = value;
              x = lastMoveX;
              nextMovesPossible[3]++;
              moveAlternatorPos = 3;
              // By this point you must have gotten the result you want resulting in a sunken ship
              // TODO: So no need to reset there should be some external signal to reset such as a sunken ship meaning last move success register must be removed to start over
              break;
            default:
              break;
          }
          return { x, y };
        } else {
          /* Alternate to the next move keeping it left to right then up to down 
          if travelling in previous single direction failed to yield a sunk result */

          // on successful sinking change move alternator too to reset it otherwise it continues from the last direction
          i++;
          moveAlternatorPos = i;
        }
      }
    }

    if (usedKnownCoordinates !== 2) {
      const gameManager = require("../game_manager/game_manager");
      x = gameManager.player1.playerGameboard.ships[0].x;
      y = gameManager.player1.playerGameboard.ships[0].y;
      // TODO: does not reset across rounds therefore needs page reset to get it each time

      if (usedKnownCoordinates === 1) {
        x = gameManager.player1.playerGameboard.ships[0].x - 1;
        y = gameManager.player1.playerGameboard.ships[0].y;
      }
      usedKnownCoordinates++;
    }

    lastMoveX = x;
    lastMoveY = y;

    nextMovesPossible[0] = x - 1;
    nextMovesPossible[1] = x + 1;
    nextMovesPossible[2] = y - 1;
    nextMovesPossible[3] = y + 1;

    return { x, y };
  };

  const resetMoveDirections = function () {
    lastMovesWereASuccess = false;
    moveAlternatorPos = 0;
    for (let i = 0; i < nextMovesPossible.length; i++) {
      nextMovesPossible[i] = -1;
    }
  };

  // Record last move as hit
  const registerSuccess = function () {
    /* Since we keep it as it is simply delete this function registering success since you do nothing, 
    feedback to change what you do comes from failures */
    lastMovesWereASuccess = true;
    // Do not change move alternator pos to keep it where it is do not reset to the first one
  };

  // Record last move as fail
  const registerFailure = function () {
    // alternate direction (try another direction)
    moveAlternatorPos++;
    // Reset only if last move down failed as it went on by some chance and went on to next move alternated which is non-existent so reset
    if (moveAlternatorPos === 5) {
      // This won't keep going if last move is down and is successful you should only reset on a failure
      // I reset all the time which is the problem
      // On failure check if the counter is 0 for the move we are on to then reset
      resetMoveDirections();
    }
  };

  // have computer play but then register a hit as feedback for its future moves, to adjust them, then step through the code
  // you can manufacture it to hit every time (i.e. to know initial coordinates of where to hit based on ship manager but only the first coordinate after that it depends on succession code)
  const playTurn = function (gameboard, uiGameboard) {
    let coords = generateRandomHitCoords(gameboard);
    // TODO: Check if coordinate has already been used for sunk ship and allow to play again
    if (
      !isMoveInBounds(coords.x) ||
      !isMoveInBounds(coords.y) ||
      gameboard.grid[coords.x][coords.y].mark
    ) {
      return -1;
    }

    gameboard.receiveAttack(coords.x, coords.y);
    let uiCell = document.querySelector(
      `.cell[data-col="${coords.x}"][data-row="${coords.y}"]`
    );
    visualizeHit(uiCell, gameboard, uiCell.dataset.col, uiCell.dataset.row);

    let logicalCell = gameboard.grid[uiCell.dataset.col][uiCell.dataset.row];

    if (logicalCell.mark === "hit") {
      registerSuccess();
    } else if (logicalCell.mark === "miss" && lastMovesWereASuccess === true) {
      registerFailure();
    }

    let ship = logicalCell.ship;

    if (ship && ship.isSunk()) {
      // reset to try new random moves
      // TODO: resetToRandomMoves should be variable name with opposite meaning to last variable meaning it must become true instead of false like below
      resetMoveDirections();
    }

    if (gameboard.areShipsSunk()) {
      const setupManager = require("../setup_manager/setup_manager");
      displayWinner("Player 2");
      setupManager.displaySetupView();
    }
  };

  return {
    registerFailure,
    registerSuccess,
    playTurn,
    isMoveInBounds,
    resetMoveDirections,
  };
})();

module.exports = cpuController;
