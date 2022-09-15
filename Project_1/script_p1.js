console.log("Welcome to Tug-of-War");

//////////////////////////////////////////////////////////////////////

//
//--------------------------------------------------------------//
// setting up the variables
//--------------------------------------------------------------//
let start = false;
let gameOver = false;
let score = 0;
let timer = 30;
let timerId;
let sound;
let flash;
let interval;
let arrowIndicator = 0;
let arrowArray = ["arrowLeft", "arrowUp", "arrowDown", "arrowRight"]; // sequence the arrow will flash

//
//--------------------------------------------------------------//
// setting up querySelectors as variables
//--------------------------------------------------------------//
const startButton = document.querySelector("#start-btn");
const clock = document.querySelector("#timer");
const strengthBar = document.querySelector("#strength-progress");
const result = document.querySelector("#display-result");

// -- player 1 -- //
const p1ScoreBoard = document.querySelector("#player1-score");
const p1LeftArrow = document.querySelector("#left-p1");
const p1UpArrow = document.querySelector("#up-p1");
const p1DownArrow = document.querySelector("#down-p1");
const p1RightArrow = document.querySelector("#right-p1");

// -- player 2 -- //
const p2ScoreBoard = document.querySelector("#player2-score");
const p2LeftArrow = document.querySelector("#left-p2");
const p2UpArrow = document.querySelector("#up-p2");
const p2DownArrow = document.querySelector("#down-p2");
const p2RightArrow = document.querySelector("#right-p2");

//
//--------------------------------------------------------------//
// setting up sound files
//--------------------------------------------------------------//
const leftSound = new Audio(
  "https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"
);
const upSound = new Audio(
  "https://s3.amazonaws.com/freecodecamp/simonSound2.mp3"
);
const downSound = new Audio(
  "https://s3.amazonaws.com/freecodecamp/simonSound3.mp3"
);
const rightSound = new Audio(
  "https://s3.amazonaws.com/freecodecamp/simonSound4.mp3"
);
const scream = new Audio(
  "http://soundbible.com/mp3/Female_Scream_Horror-NeoPhyTe-138499973.mp3"
);
const cheerSound = new Audio(
  "http://soundbible.com/mp3/Kids%20Cheering-SoundBible.com-681813822.mp3"
);

//
//--------------------------------------------------------------//
// for generating players
//--------------------------------------------------------------//
class Player {
  constructor(
    name = "",
    strength = 50, // will be determined by opponent's no. of hits and misses
    score = 0,
    hits = { perfect: 0, good: 0, bad: 0, missed: 0 }
  ) {
    this.name = name;
    this.strength = strength;
    this.score = score;
    this.hits = hits;
  }

  scoreUp() {
    this.score++;
  }

  strengthUp() {
    this.strength++;
    strengthBar.value = p1.strength;
  }

  strengthDown() {
    this.strength--;
    strengthBar.value = p1.strength;
  }

  resetHits() {
    this.hits.perfect = 0;
    this.hits.good = 0;
    this.hits.bad = 0;
    this.hits.missed = 0;
  }
}

const p1 = new Player("Player 1", undefined, undefined, undefined);
const p2 = new Player("Player 2", undefined, undefined, undefined);

//
//--------------------------------------------------------------//
// for generating new game/round
//--------------------------------------------------------------//

// function to start a game by clicking start button
function playGame() {
  startButton.addEventListener("click", (e) => {
    start = true;
    gameOver = false;
    // console.log(start);
    newGame();
  });
}

// function for each new game
function newGame() {
  if (start === true) {
    // console.log(`new game starting`);
    clearRound();
    resetAll();
    randomExecutor();
    countDownTimer();
    setTimeout(finishGame, 30000); // to change the timing
  }
}

// function for finishing a game
function finishGame() {
  // console.log(`game over`);
  clearInterval(interval);
  start = false;
  gameOver = true;
  win();
  startButton.innerText = "Restart";
}

// function for clearing a game
const clearRound = () => {
  console.log(`colors reset`);
  //-- p1 arrows --//
  p1LeftArrow.style.borderRight = "65px solid lightgrey";
  p1UpArrow.style.borderBottom = "65px solid lightgrey";
  p1DownArrow.style.borderTop = "65px solid lightgrey";
  p1RightArrow.style.borderLeft = "65px solid lightgrey";
  //-- p2 arrows --//
  p2LeftArrow.style.borderRight = "65px solid lightgrey";
  p2UpArrow.style.borderBottom = "65px solid lightgrey";
  p2DownArrow.style.borderTop = "65px solid lightgrey";
  p2RightArrow.style.borderLeft = "65px solid lightgrey";
  //-- hiding results --//
  result.style.display = "none";
};

// function to reset scores
function resetAll() {
  p1.resetHits();
  p1.score = 0;
  strengthBar.value = 50;
  p1ScoreBoard.innerText = 0;
  p2.resetHits();
  p2.score = 0;
  p2ScoreBoard.innerText = 0;
  timer = 30;
}

// function for winning
// winning will only based on final score after stipulated time
function win() {
  if (gameOver === true) {
    result.style.display = "block"; // display result
    if (p1.score > p2.score) {
      result.innerText = "Game Over\nPlayer 1 Wins!";
      cheerSound.play();
    } else if (p1.score < p2.score) {
      result.innerText = "Game Over\nPlayer 2 Wins!";
      cheerSound.play();
    } else {
      result.innerText = "Game Over\nIt is a draw!";
      cheerSound.play();
    }
  }
}

// function for countdown timer
// purpose is to show how much time left before the game ends
function countDownTimer() {
  if (start === true) {
    if (timer > 0) {
      timerId = setTimeout(countDownTimer, 1000);
      timer--;
      clock.innerHTML = timer;
    }
  }
}

//
//--------------------------------------------------------------//
// game play
//--------------------------------------------------------------//

// function to run random arrow indicator at set intervals
function randomExecutor() {
  interval = setInterval(randomArrowIndicator, 500); // to change the speed
}

// function to determine which arrows will change colors
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

//
//-- changing arrow colors --//

const arrowLeft = () => {
  //-- p1 arrows --//
  p1LeftArrow.style.borderRight = "65px solid yellow";
  p1UpArrow.style.borderBottom = "65px solid lightgrey";
  p1DownArrow.style.borderTop = "65px solid lightgrey";
  p1RightArrow.style.borderLeft = "65px solid lightgrey";
  //-- p2 arrows --//
  p2LeftArrow.style.borderRight = "65px solid yellow";
  p2UpArrow.style.borderBottom = "65px solid lightgrey";
  p2DownArrow.style.borderTop = "65px solid lightgrey";
  p2RightArrow.style.borderLeft = "65px solid lightgrey";
  //-- sound --//
  leftSound.play();
};

const arrowUp = () => {
  //-- p1 arrows --//
  p1LeftArrow.style.borderRight = "65px solid lightgrey";
  p1UpArrow.style.borderBottom = "65px solid yellow";
  p1DownArrow.style.borderTop = "65px solid lightgrey";
  p1RightArrow.style.borderLeft = "65px solid lightgrey";
  //-- p2 arrows --//
  p2LeftArrow.style.borderRight = "65px solid lightgrey";
  p2UpArrow.style.borderBottom = "65px solid yellow";
  p2DownArrow.style.borderTop = "65px solid lightgrey";
  p2RightArrow.style.borderLeft = "65px solid lightgrey";
  //-- sound --//
  upSound.play();
};

const arrowDown = () => {
  //-- p1 arrows --//
  p1LeftArrow.style.borderRight = "65px solid lightgrey";
  p1UpArrow.style.borderBottom = "65px solid lightgrey";
  p1DownArrow.style.borderTop = "65px solid yellow";
  p1RightArrow.style.borderLeft = "65px solid lightgrey";
  //-- p2 arrows --//
  p2LeftArrow.style.borderRight = "65px solid lightgrey";
  p2UpArrow.style.borderBottom = "65px solid lightgrey";
  p2DownArrow.style.borderTop = "65px solid yellow";
  p2RightArrow.style.borderLeft = "65px solid lightgrey";
  //-- sound --//
  downSound.play();
};

const arrowRight = () => {
  //-- p1 arrows --//
  p1LeftArrow.style.borderRight = "65px solid lightgrey";
  p1UpArrow.style.borderBottom = "65px solid lightgrey";
  p1DownArrow.style.borderTop = "65px solid lightgrey";
  p1RightArrow.style.borderLeft = "65px solid yellow";
  //-- p2 arrows --//
  p2LeftArrow.style.borderRight = "65px solid lightgrey";
  p2UpArrow.style.borderBottom = "65px solid lightgrey";
  p2DownArrow.style.borderTop = "65px solid lightgrey";
  p2RightArrow.style.borderLeft = "65px solid yellow";
  //-- sound --//
  rightSound.play();
};

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
        p1.hits.good++;
        p1.scoreUp();
        p1.strengthUp();
      } else if (arrowIndicator === 1 && e.key === "w") {
        p1.hits.good++;
        p1.scoreUp();
        p1.strengthUp();
      } else if (arrowIndicator === 2 && e.key === "s") {
        p1.hits.good++;
        p1.scoreUp();
        p1.strengthUp();
      } else if (arrowIndicator === 3 && e.key === "d") {
        p1.hits.good++;
        p1.scoreUp();
        p1.strengthUp();
      } else {
        p1.hits.missed++;
        p2.strengthUp();
      }
    }

    p1ScoreBoard.innerText = p1.score;
    if (
      e.key === "ArrowLeft" ||
      e.key === "ArrowUp" ||
      e.key === "ArrowDown" ||
      e.key === "ArrowRight"
    ) {
      if (arrowIndicator === 0 && e.key === "ArrowLeft") {
        p2.hits.good++;
        p2.scoreUp();
        p1.strengthDown();
      } else if (arrowIndicator === 1 && e.key === "ArrowUp") {
        p2.hits.good++;
        p2.scoreUp();
        p1.strengthDown();
      } else if (arrowIndicator === 2 && e.key === "ArrowDown") {
        p2.hits.good++;
        p2.scoreUp();
        p1.strengthDown();
      } else if (arrowIndicator === 3 && e.key === "ArrowRight") {
        p2.hits.good++;
        p2.scoreUp();
        p1.strengthDown();
      } else {
        p2.hits.missed++;
        p1.strengthUp();
      }
    }
    p2ScoreBoard.innerText = p2.score;
  }
});

// -- score multiplier (kiv) --//
//
// const scoreMultiplier = {
//   perfect: 2,
//   good: 1,
//   bad: 0.5,
//   missed: 0,
//   combo30: 1.05,
//   combo60: 1.10,
// };

//
//--------------------------------------------------------------//
// call function
//--------------------------------------------------------------//

playGame();
