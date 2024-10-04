import "./styles/styles.css";
const main = require("./ui_management/components/body/main");

const init = (() => {
  let body = document.querySelector("body");
  body.appendChild(main());
})();
