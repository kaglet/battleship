import "./styles/styles.css";
import pictureDisplay from "./ui_management/components/pictures_display/pictures_display";
const main = require("./ui_management/components/main/main.js");

const init = (() => {
  let body = document.querySelector("body");
  let mainDisplay = main();
  mainDisplay.appendChild(pictureDisplay());
  body.appendChild(mainDisplay);
})();
