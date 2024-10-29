const createButtons = () => {
  let randomizeBtn = document.createElement("button");
  let beginBtn = document.createElement("button");

  randomizeBtn.textContent = "randomize";
  beginBtn.textContent = "begin";

  randomizeBtn.classList.add("randomize");
  beginBtn.classList.add("begin");

  return { randomizeBtn, beginBtn };
};

module.exports = createButtons;
