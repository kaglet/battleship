// To control all CPU actions

const gameManager = require("../game_manager/game_manager");
const visualizeHit = require("../game_manager/visualize_hit/visualize_hit");
const getRandomNumber = require("../randomize_ships/random/random_num_in_range");

const cpuController = (() => {
  let lastMoveX, lastMoveY;
  let lastMoveWasSuccess = false;
  let nextMovesPossible = { left: -1, right: -1, up: -1, down: -1 };
  let moveAlternatorPos = -1;

  const isMoveInBounds = function (val) {
    return val > 0 && val <= 9;
  };

  const generateRandomHitCoords = function () {
    let x, y;

    x = getRandomNumber(0, 9);
    y = getRandomNumber(0, 9);

    // try number that has not been used yet and has not been a hit or miss
    if (lastMoveWasSuccess) {
      let i = 0;
      for (let [key, value] of Object.entries(nextMovesPossible)) {
        i++;
        // Prevent move repeats by going forward in array until new moves are exhausted
        if (i <= 4 - (moveAlternatorPos % 4)) {
          continue;
        }

        // If move is in bounds take it until it results in miss then move onto another direction
        // So these actions are on assumption that it is a hit
        if (isMoveInBounds(value)) {
          switch (key) {
            case "left":
              x = value;
              y = lastMoveY;
              nextMovesPossible.left--;
              break;
            case "right":
              x = value;
              y = lastMoveY;
              nextMovesPossible.right++;
              break;
            case "up":
              y = value;
              x = lastMoveX;
              nextMovesPossible.up--;
              break;
            case "down":
              y = value;
              x = lastMoveX;
              nextMovesPossible.down++;
              break;
            default:
              break;
          }
        } else {
          /* Alternate to the next move keeping it left to right then up to down 
          if travelling in previous single direction failed to yield a sunk result */
          moveAlternatorPos++;
        }
      }
    }

    lastMoveX = x;
    lastMoveY = y;

    nextMovesPossible.nextLeft = x - 1;
    nextMovesPossible.nextRight = x + 1;
    nextMovesPossible.nextDown = y + 1;
    nextMovesPossible.nextUp = y - 1;

    return { x, y };
  };

  // Record last move as hit
  const registerSuccess = function () {
    lastMoveWasSuccess = true;
  };

  // Record last move as fail
  const registerFailure = function () {
    lastMoveWasSuccess = false;
    // alternate direction
    moveAlternatorPos++;
  };

  const playTurn = function (gameboard, uiGameboard) {
    let coords = generateRandomHitCoords();
    gameboard.receiveAttack(coords.x, coords.y);
    let cell = document.querySelector(
      `.cell[data-col="${coords.x}"][data-row="${coords.y}"]`
    );
    visualizeHit(cell, gameboard, cell.dataset.col, cell.dataset.row);
  };

  return { registerFailure, registerSuccess, playTurn };
})();

module.exports = cpuController;
