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

//
//--------------------------------------------------------------//
// setting up querySelectors as variables
//--------------------------------------------------------------//
const startButton = document.querySelector("#start-btn");
const timer = document.querySelector("#timer");

const leftArrow = document.querySelector(".left-arrow");
const upArrow = document.querySelector(".up-arrow");
const downArrow = document.querySelector(".down-arrow");
const rightArrow = document.querySelector(".right-arrow");

const healthBar = document.querySelector("#hpProgress");

// -- player 1 -- //
const p1ScoreBoard = document.querySelector("#player1-score");

// -- player 2 -- //
const p2ScoreBoard = document.querySelector("#player2-score");
// const p2HealthBar = document.querySelector("#player2-health-bar");

//
//--------------------------------------------------------------//
// for generating players
//--------------------------------------------------------------//
class Player {
  constructor(
    name = "",
    health = 50, // will be attacked by opponent's no. of hits except missed
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

  healthUp() {
    this.health++;
    healthBar.value = p1.health;
  }

  healthDown() {
    this.health--;
    healthBar.value = p1.health;
  }

  resetHits() {
    this.hits.perfect = 0;
    this.hits.good = 0;
    this.hits.bad = 0;
    this.hits.missed = 0;
  }

  //   hitUp() {
  //     if (perfect) this.hits.perfect += 1;
  //     if (good) this.hits.good += 1;
  //     if (bad) this.hits.bad += 1;
  //     if (missed) this.hits.missed += 1;
  //   }
}

const scoreMultiplier = {
  perfect: 2,
  good: 1,
  bad: 0.5,
  missed: 0,
  // combo30: 1.05,
  // combo60: 1.10,
};

const p1 = new Player("Player 1", undefined, undefined, undefined);
const p2 = new Player("Player 2");

function playGame() {
  startButton.addEventListener("click", (e) => {
    start = true;
    console.log(start);
    newGame();
  });
}

let interval;

function finishGame() {
  console.log(`game over`);
  clearInterval(interval);
  start = false;
}

// function for each new game
function newGame() {
  if (start === true) {
    console.log(`new game starting`);
    clearRound();
    resetAll();
    randomExecutor();
    setTimeout(finishGame, 6000); // to change the timing
  }
}

// function to reset scores
function resetAll() {
  p1.resetHits();
  p1.score = 0;
  p1ScoreBoard.innerText = 0;
  p2.resetHits();
  p2.score = 0;
  p2ScoreBoard.innerText = 0;
}

// runing the randomExecutor
function randomExecutor() {
  interval = setInterval(randomArrowIndicator, 1000); // to change the speed
}

let arrowIndicator = 0;
let arrowIndicatorP2 = 0;
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
  if (start === true) {
    console.log({
      key: e.key,
      arrowIndicator,
      bool: arrowIndicator === 0 && e.key === "ArrowLeft",
    });
    // prevent repeated keystrokes
    if (e.repeat) {
      return;
    }

    // only want the following (p1) keys to be detected

    if (e.key === "a" || e.key === "w" || e.key === "s" || e.key === "d") {
      if (arrowIndicator === 0 && e.key === "a") {
        console.log("hitting");
        // console.log({ p1 });
        p1.hits.good++;
        // console.log({ p1 });
        p1.scoreUp();
        p1.healthUp();
      } else if (arrowIndicator === 1 && e.key === "w") {
        p1.hits.good++;
        p1.scoreUp();
        p1.healthUp();
      } else if (arrowIndicator === 2 && e.key === "s") {
        p1.hits.good++;
        p1.scoreUp();
        p1.healthUp();
      } else if (arrowIndicator === 3 && e.key === "d") {
        p1.hits.good++;
        p1.scoreUp();
        p1.healthUp();
      } else {
        p1.hits.missed++;
      }
    }
    // console.log(p1.hits);
    // console.log({ score: p1.score });
    p1ScoreBoard.innerText = p1.score; // comparing speed to which the keydown happens and when the arrow first flash

    if (
      e.key === "ArrowLeft" ||
      e.key === "ArrowUp" ||
      e.key === "ArrowDown" ||
      e.key === "ArrowRight"
    ) {
      if (arrowIndicator === 0 && e.key === "ArrowLeft") {
        p2.hits.good++;
        p2.scoreUp();
        p1.healthDown();
      } else if (arrowIndicator === 1 && e.key === "ArrowUp") {
        p2.hits.good++;
        p2.scoreUp();
        p1.healthDown();
      } else if (arrowIndicator === 2 && e.key === "ArrowDown") {
        p2.hits.good++;
        p2.scoreUp();
        p1.healthDown();
      } else if (arrowIndicator === 3 && e.key === "ArrowRight") {
        p2.hits.good++;
        p2.scoreUp();
        p1.healthDown();
      } else {
        p2.hits.missed++;
      }
    }
    // console.log(p2.hits);
    // console.log({ score: p2.score });
    p2ScoreBoard.innerText = p2.score;
  }
});

const arrowLeft = () => {
  leftArrow.style.borderRight = "40px solid yellow";
  upArrow.style.borderBottom = "40px solid lightgrey";
  downArrow.style.borderTop = "40px solid lightgrey";
  rightArrow.style.borderLeft = "40px solid lightgrey";
};

const arrowUp = () => {
  leftArrow.style.borderRight = "40px solid lightgrey";
  upArrow.style.borderBottom = "40px solid yellow";
  downArrow.style.borderTop = "40px solid lightgrey";
  rightArrow.style.borderLeft = "40px solid lightgrey";
};

const arrowDown = () => {
  leftArrow.style.borderRight = "40px solid lightgrey";
  upArrow.style.borderBottom = "40px solid lightgrey";
  downArrow.style.borderTop = "40px solid yellow";
  rightArrow.style.borderLeft = "40px solid lightgrey";
};

const arrowRight = () => {
  leftArrow.style.borderRight = "40px solid lightgrey";
  upArrow.style.borderBottom = "40px solid lightgrey";
  downArrow.style.borderTop = "40px solid lightgrey";
  rightArrow.style.borderLeft = "40px solid yellow";
};

const clearRound = () => {
  console.log(`colors reset`);
  leftArrow.style.borderRight = "40px solid lightgrey";
  upArrow.style.borderBottom = "40px solid lightgrey";
  downArrow.style.borderTop = "40px solid lightgrey";
  rightArrow.style.borderLeft = "40px solid lightgrey";
};

//
//--------------------------------------------------------------//
// attacks
//--------------------------------------------------------------//

//== call function==//
// keyDownDetection();
playGame();
// newGame();
// randomExecutor();
