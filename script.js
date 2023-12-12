let boxes = document.querySelectorAll(".box");
let reset = document.querySelector("#reset");
var winnerannouncement = document.querySelector("#main h2");
let count = 0;
// As we have alternative turns in the game
// '0' always play first
let turnO = true;

// All the winning patterns can be seen in the finite-bounded game
// 0 | 1 | 2
//---|---|----
// 3 | 4 | 5
//---|---|----
// 6 | 7 | 8
const winningPatterns = [
  // horizantally check
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  // vertical check
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  // cross check
  [2, 4, 6],
  [0, 4, 8],
];

// make sure every box is clickable
boxes.forEach(function(box) {
  box.addEventListener("click", function() {
    handleBoxClick(box);
  });
});


const handleBoxClick = (box) => {
  if (!box.textContent) {
    box.textContent = turnO ? "O" : "X";
    box.style.backgroundColor = turnO ? "#90EE8F" : "#F74448";
    //changing true -> false or vice-versa
    turnO = !turnO;
    box.disabled = true;
    count++;
    // Checking whether someone yet win
    let isWinner = checkWinner();
    if (count === 9 && !isWinner) {
      gameDraw();
    }
  }
};

// GOAL : To check whether someone had completed winningPatterns
const checkWinner = function () {
  //'pattern' loops through each pattern in the winPatterns array.
  for (let pattern of winningPatterns) {
    // pattern = array one by one of all winning patterns
    // pattern[0], pattern[1], pattern[2] -> will return every element of array
    // 1st Winningpattern = [0,1,2] -> box[0],box[1],box[2] and like this all other 8 patterns

    // 'innerText' -> represents the visible text content of an HTML element.

    // necessary values to win or draw
    let pos1 = boxes[pattern[0]].innerText;
    let pos2 = boxes[pattern[1]].innerText;
    let pos3 = boxes[pattern[2]].innerText;

    // now to check whether all these 3 values are completely filled with an element and all are same
    if (pos1 != "" && pos2 != "" && pos3 != "") {
      if (pos1 === pos2 && pos2 === pos3) {
        console.log((winnerannouncement.textContent = "Winner is " + pos1));
        disableBoxes();
      }
    }
  }
};
const resetGame = () => {
  turnO = true;
  count = 0;
  enableBoxes();
};
const gameDraw = () => {
  winnerannouncement.textContent = "Draw";
  winnerannouncement.style.color = "black";
  disableBoxes();
};

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
    // box.style.pointerEvents = "none" -> makes the HTML element with the id "box" unresponsive to pointer events,
    // such as clicks or hover interactions.
    box.style.pointerEvents = "none";
  }
};

const enableBoxes = () => {
  for (let box of boxes) {
    //--------- This has been added----------
    box.style.pointerEvents = "all";
    box.disabled = false;
    box.innerText = "";
    box.style.backgroundColor = "#D3D3D3";
    winnerannouncement.textContent = "";
  }
};

reset.addEventListener("click", resetGame);
