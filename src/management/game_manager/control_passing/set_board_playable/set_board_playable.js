const setBoardPlayable = (board) => {
  board.style.pointerEvents = "auto";
  board.classList.toggle("inactive");
  board.classList.toggle("active");
};

module.exports = setBoardPlayable;
