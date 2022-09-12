console.log("Welcome to Tug-of-War");
//////////////////////////////////////////////////////////////////////

// setting up the variables
let start = false;
let countDownTimer; // need to show?
let score = 0;
// let combo = 0; // later
// let maxCombo = 0; // later
let sound;
let flash;
let turn; // maybe not relevant
let compTurn; // maybe not relevant
let intervalCount; // not relevant unless p1 and p2 continue playing
let win;
// let arrowSequence = [];
let arrowArray = ["arrowLeft", "arrowUp", "arrowDown", "arrowRight"]; // sequence the arrow will flash
// sequence is made up of random numbers between 0 and 3
// arrow: left = 1, up = 2, down = 3, right = 4
// 60 numbers will be pushed into the order

// setting up querySelectors as variables
const startButton = document.querySelector("#start-btn");
const timer = document.querySelector("#timer");
const p1ScoreBoard = document.querySelector("#player1-score");
const leftArrow = document.querySelector("#left");
const upArrow = document.querySelector("#up");
const downArrow = document.querySelector("#down");
const rightArrow = document.querySelector("#right");

// for generating players
class Player {
  constructor(
    name = "",
    health = 60, // will be attacked by opponent's no. of hits except missed
    score = 0,
    hits = { perfect: 0, good: 0, bad: 0, missed: 0 } // total = 60
  ) {
    this.name = name;
    this.health = health; // health - count of missed hits
    this.score = score; // hit * scoreMultiplier
    this.hits = hits;
  }

  getName() {
    this.name;
  }

  getHealth() {
    this.health;
  }

  getScore() {
    this.score;
  }

  scoreUp() {
    this.score++;
  }

  hitUp() {
    if (perfect) this.hits.perfect += 1;
    if (good) this.hits.good += 1;
    if (bad) this.hits.bad += 1;
    if (missed) this.hits.missed += 1;
  }
}

const scoreMultiplier = {
  perfect: 2,
  good: 1,
  bad: 0.5,
  missed: 0,
  // combo30: 1.05,
  // combo60: 1.10,
};

const p1 = new Player("Player 1");

// function playGame() {
//   startButton.addEventListener("click", (e) => {
//     console.log(e.startButton);
//     newGame();
//   });
// }

let interval;

function finishGame() {
  console.log(`game over`);
  clearInterval(interval);
}

// function for each new game
function newGame() {
  // if (start = true)
  console.log(`new game starting`);
  clearRound();
  randomExecutor();
  setTimeout(finishGame, 6000); // to change the timing
}

// runing the randomExecutor
function randomExecutor() {
  interval = setInterval(randomArrowIndicator, 2000); // to change the speed
}

let arrowIndicator = 0;
let arrowTime;
let p1KeydownTime;

function randomArrowIndicator() {
  arrowIndicator = Math.floor(Math.random() * arrowArray.length);
  console.log(arrowIndicator);
  if (arrowIndicator === 0) {
    arrowLeft();
  } else if (arrowIndicator === 1) {
    arrowUp();
  } else if (arrowIndicator === 2) {
    arrowDown();
  } else if (arrowIndicator === 3) {
    arrowRight();
  }
}

// listening for keydown event for specific keys
window.addEventListener("keydown", (e) => {
  console.log(e.key);
  // prevent repeated keystrokes
  if (e.repeat) {
    return;
  }

  // only want the following (p1) keys to be detected
  // part 2: add p2 keys
  if (arrowIndicator === 0 && e.key === "ArrowLeft") {
    p1.hits.good++;
    p1.scoreUp();
  } else if (arrowIndicator === 1 && e.key === "ArrowUp") {
    p1.hits.good++;
    p1.scoreUp();
  } else if (arrowIndicator === 2 && e.key === "ArrowDown") {
    p1.hits.good++;
    p1.scoreUp();
  } else if (arrowIndicator === 3 && e.key === "ArrowRight") {
    p1.hits.good++;
    p1.scoreUp();
  } else {
    p1.hits.missed++;
  }
  console.log(p1.hits);
  p1ScoreBoard.innerText = p1.score;
  // comparing speed to which the keydown happens and when the arrow first flash
});

const arrowLeft = () => {
  leftArrow.style.borderRight = "40px solid black";
  upArrow.style.borderBottom = "40px solid lightgrey";
  downArrow.style.borderTop = "40px solid lightgrey";
  rightArrow.style.borderLeft = "40px solid lightgrey";
};

const arrowUp = () => {
  leftArrow.style.borderRight = "40px solid lightgrey";
  upArrow.style.borderBottom = "40px solid black";
  downArrow.style.borderTop = "40px solid lightgrey";
  rightArrow.style.borderLeft = "40px solid lightgrey";
};

const arrowDown = () => {
  leftArrow.style.borderRight = "40px solid lightgrey";
  upArrow.style.borderBottom = "40px solid lightgrey";
  downArrow.style.borderTop = "40px solid black";
  rightArrow.style.borderLeft = "40px solid lightgrey";
};

const arrowRight = () => {
  leftArrow.style.borderRight = "40px solid lightgrey";
  upArrow.style.borderBottom = "40px solid lightgrey";
  downArrow.style.borderTop = "40px solid lightgrey";
  rightArrow.style.borderLeft = "40px solid black";
};

const clearRound = () => {
  console.log(`colors reset`);
  leftArrow.style.borderRight = "40px solid lightgrey";
  upArrow.style.borderBottom = "40px solid lightgrey";
  downArrow.style.borderTop = "40px solid lightgrey";
  rightArrow.style.borderLeft = "40px solid lightgrey";
};

//== call function==//
// keyDownDetection();
// playGame();
newGame();
// randomExecutor();
