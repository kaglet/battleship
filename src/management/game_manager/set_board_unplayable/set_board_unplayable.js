const setBoardUnplayable = (board) => {
  board.style.pointerEvents = "none";
  board.classList.toggle("inactive");
  board.classList.toggle("active");
};

module.exports = setBoardUnplayable;
