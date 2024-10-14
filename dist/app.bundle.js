/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 920:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ 808:
/***/ ((module) => {

const gameboardProto = {
  get ships() {
    return this._ships;
  },
  set ships(value) {
    this._ships = value;
  },
  get size() {
    return this._size;
  },
  set size(value) {
    this._size = value;
  },
  get grid() {
    return this._grid;
  },
  set grid(value) {
    this._grid = value;
  },
  // assumes x is constant and y is changing so vertical orientation
  placeShip(ship, x, y) {
    this._ships.push(ship);
    if (ship.orientation === "V") {
      for (let j = y; j < y + ship.length; j++) {
        this._grid[x][j] = ship;
      }
    } else if (ship.orientation === "H") {
      for (let i = x; i < x + ship.length; i++) {
        this._grid[i][y] = ship;
      }
    }
  },
  receiveAttack(x, y) {
    if (!this._grid[x][y]) {
      this._grid[x][y] = "M";
    } else {
      this._grid[x][y].hit();
    }
  },
  areShipsSunk(x, y) {
    if (this._ships.some((ship) => ship.isSunk() === false)) return false;

    return true;
  },
};

const gameboard = () => {
  let newGameboard = Object.create(gameboardProto);

  newGameboard.size = 10;
  newGameboard.grid = new Array(newGameboard.size);
  newGameboard.ships = [];
  newGameboard.isGameboard = true;

  // initialize grid
  for (let i = 0; i < newGameboard.size; i++) {
    for (let j = 0; j < newGameboard.size; j++) {
      newGameboard.grid[i] = new Array(newGameboard.size);
    }
  }

  return newGameboard;
};

module.exports = gameboard;


/***/ }),

/***/ 198:
/***/ ((module) => {

const shipProto = {
  get length() {
    return this._length;
  },
  set length(val) {
    this._length = val;
  },
  get numHits() {
    return this._numHits;
  },
  set numHits(val) {
    this._numHits = val;
  },
  get orientation() {
    return this._orientation;
  },
  set type(val) {
    switch (val) {
      case "battleship":
        this.setTypeToBattleship();
        break;
      case "carrier":
        this.setTypeToCarrier();
        break;
      case "destroyer":
        this.setTypeToDestroyer();
        break;
      case "submarine":
        this.setTypeToSubmarine();
        break;
      case "patrolBoat":
        this.setTypeToPatrolBoat();
        break;
      default:
        break;
    }
  },
  get type() {
    return this._type;
  },
  setTypeToPatrolBoat() {
    this._type = "patrolBoat";
    this._length = 2;
  },
  setTypeToSubmarine() {
    this._type = "submarine";
    this._length = 3;
  },
  setTypeToDestroyer() {
    this._type = "destroyer";
    this._length = 3;
  },
  setTypeToBattleship() {
    this._type = "battleship";
    this._length = 4;
  },
  setTypeToCarrier() {
    this._type = "carrier";
    this._length = 5;
  },
  setOrientationVertical() {
    this._orientation = "V";
  },
  setOrientationHorizontal() {
    this._orientation = "H";
  },
  isSunk() {
    if (this._numHits === this._length) {
      return true;
    } else if (this._numHits < this._length) {
      return false;
    } else {
      /* This indicates somehow the number of hits is more than length 
        which should be impossible unless it is registered to be hit twice.
        Nowhere in code must you allow this. Multiple hits should be blocked anyway. 
        This affirms to check if the block is not present or is circumvented. */
      throw new Error("Ship cannot be hit multiple times");
    }
  },

  hit() {
    this._numHits++;
    return this._numHits;
  },
};

const ship = () => {
  let newShip = Object.create(shipProto);

  // newShip.length = 0;
  newShip.numHits = 0;
  newShip.setOrientationHorizontal();
  newShip.isShip = true;

  return newShip;
};

module.exports = ship;


/***/ }),

/***/ 69:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const battleship = __webpack_require__(344);
const carrier = __webpack_require__(770);
const destroyer = __webpack_require__(97);
const patrolBoat = __webpack_require__(316);
const submarine = __webpack_require__(658);

const imgToShipMapper = (() => {
  const getPicFromType = function (type) {
    switch (type) {
      case "battleship":
        return battleship;
      case "carrier":
        return carrier;
      case "destroyer":
        return destroyer;
      case "patrolBoat":
        return patrolBoat;
      case "submarine":
        return submarine;

      default:
        break;
    }
  };

  const getTypeFromPic = function (url) {
    const lastForwardSlash = url.lastIndexOf("/");
    // TODO: Find the position of the last occurence of a symbol from the end
    // For a url of this form: "url(\"http://localhost:8080/battleship.jpg\")"
    let newUrl = url.slice(lastForwardSlash + 1, -6);
    return newUrl;
  };

  return { getPicFromType, getTypeFromPic };
})();

module.exports = imgToShipMapper;


/***/ }),

/***/ 204:
/***/ ((module) => {

const cell = () => {
  let cellDisplay = document.createElement("div");
  cellDisplay.classList.add("cell");

  return cellDisplay;
};

module.exports = cell;


/***/ }),

/***/ 219:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const cell = __webpack_require__(204);

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

  return boardDisplay;
};

module.exports = gameboard;


/***/ }),

/***/ 335:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const gameboard = __webpack_require__(219);

const main = () => {
  let mainDisplay = document.createElement("section");
  mainDisplay.classList.add("main");

  mainDisplay.appendChild(gameboard());

  return mainDisplay;
};

module.exports = main;


/***/ }),

/***/ 350:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const restaurantImg = __webpack_require__(344);

const shipSelectionPanel = () => {
  let shipsDisplay = document.createElement("section");
  shipsDisplay.classList.add("ships", "selection-panel");

  let ship1 = document.createElement("img");
  ship1.style.backgroundImage = `url("${restaurantImg}")`;
  console.log(ship1.style.backgroundImage);
  ship1.setAttribute("data-url", ship1.style.backgroundImage);
  ship1.classList.add("ship");

  shipsDisplay.append(ship1);

  return shipsDisplay;
};

module.exports = shipSelectionPanel;


/***/ }),

/***/ 698:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const ship = __webpack_require__(198);
const imgToShipMapper = __webpack_require__(69);
const gameboard = __webpack_require__(808);

// Manages drag and drop functionality of ship images onto board
// One approach is to generate new ship in its place and move the old one (make its position absolute)
// If dropped before we get to board we must lose it forever

const dragDropController = (() => {
  let ship1;
  let isShipSelected = false;
  let draggableShipType;
  let uiBoard;
  let logicalGameboard = gameboard();

  const setOrientationFromPreference = function () {
    return "V";
  };

  const markEndOfSelection = function () {
    // TODO: At end after all ships are used up marked by counter of ships dropped/present on board and used therefore clear selection, in fact after a ship is dropped clear selection or maybe keep it until ships inside are exhausted
    /* TODO: There can be an object with property names of the types, from each type dropped onto board place onto counter, one for player one for opponent.
     Each time ship is dropped increase count for that type and if destroyed decrease count for that type*/
    isShipSelected = false;
  };

  const dropShip = function (e) {
    // TODO: place final copy of active ship down onto cell
    // Condition is true only when isDown is true as there was a ship selected
    if (isShipSelected === true) {
      let shipDroppedCopy = document.createElement("img");
      shipDroppedCopy.style.backgroundImage = `url("${imgToShipMapper.getPicFromType(
        draggableShipType
      )}")`;

      console.log(e.target);

      let row = +e.target.dataset.row;
      let col = +e.target.dataset.col;

      let newShip = ship();
      newShip.type = draggableShipType;
      newShip.orientation = setOrientationFromPreference();

      let board = document.querySelector(".board");

      board.appendChild(shipDroppedCopy);
      shipDroppedCopy.style.gridRowStart = row + 1;
      shipDroppedCopy.style.gridColumnStart = col + 1;

      // Logically place ship in grid
      logicalGameboard.placeShip(newShip, col, row);
      console.log("New ship is ", newShip);

      // Visually place ship image in grid
      if (newShip.orientation === "V") {
        shipDroppedCopy.style.gridRowEnd = `span ${newShip.length}`;
      } else if (newShip.orientation === "H") {
        shipDroppedCopy.style.gridColumnEnd = `span ${newShip.length}`;
      }
    }

    isShipSelected = false;
  };

  // TODO: highlight a ship to delete it from board
  const deleteDraggable = function (e) {
    if (isShipSelected === true) {
      draggableShipType = "";
    }

    isShipSelected = false;
  };

  const markChosenShip = function (ship1) {
    // From ship picture save type for ship object instantiation and assigning a type (to inform the length for highlight) when dropping the object
    draggableShipType = imgToShipMapper.getTypeFromPic(ship1.dataset.url);
    isShipSelected = true;
    console.log("Chosen ship type is ", draggableShipType);
  };

  const init = function () {
    let ships = document.querySelectorAll(".ships img");
    ships.forEach((ship) => {
      ship.addEventListener("mousedown", () => markChosenShip(ship));
      console.log("Ship listener attached");
    });

    let cells = document.querySelectorAll(".cell");
    cells.forEach((cell) => {
      cell.addEventListener("click", dropShip);
      console.log("Event listener attached to ", cell);
    });
  };

  document.addEventListener("mouseup", deleteDraggable);
  document.addEventListener("mousedown", () => console.log("hello"));

  return { init };
})();

module.exports = dragDropController;


/***/ }),

/***/ 344:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "battleship.jpg";

/***/ }),

/***/ 770:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "carrier.jpg";

/***/ }),

/***/ 97:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "destroyer.jpg";

/***/ }),

/***/ 316:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "patrolBoat.jpg";

/***/ }),

/***/ 658:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "submarine.jpg";

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript && document.currentScript.tagName.toUpperCase() === 'SCRIPT')
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && (!scriptUrl || !/^http(s?):/.test(scriptUrl))) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
__webpack_require__(920);
const dragDropController = __webpack_require__(698);
const main = __webpack_require__(335);
const shipSelectionPanel = __webpack_require__(350);

const init = (() => {
  let body = document.querySelector("body");
  let mainDisplay = main();

  body.appendChild(mainDisplay);
  mainDisplay.appendChild(shipSelectionPanel());
  dragDropController.init();
})();

/******/ })()
;