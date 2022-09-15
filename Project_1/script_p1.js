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
const healthBar = document.querySelector("#health-progress");
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
    health = 30, // will be determined by opponent's no. of hits and misses
    score = 0,
    hits = 0
  ) {
    this.name = name;
    this.health = health;
    this.score = score;
    this.hits = hits;
  }

  scoreUp() {
    this.score++;
  }

  healthUp() {
    this.health++;
    healthBar.value = this.health;
  }

  healthDown() {
    this.health--;
    healthBar.value = this.health;
  }

  resetHits() {
    this.hits = 0;
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
  clock.innerText = "Game Over";
}

// function for clearing a game
const clearRound = () => {
  console.log(`colors reset`);
  //-- p1 arrows --//
  p1LeftArrow.style.borderRightColor = "lightgrey";
  p1UpArrow.style.borderBottomColor = "lightgrey";
  p1DownArrow.style.borderTopColor = "lightgrey";
  p1RightArrow.style.borderLeftColor = "lightgrey";
  //-- p2 arrows --//
  p2LeftArrow.style.borderRightColor = "lightgrey";
  p2UpArrow.style.borderBottomColor = "lightgrey";
  p2DownArrow.style.borderTopColor = "lightgrey";
  p2RightArrow.style.borderLeftColor = "lightgrey";
  //-- hiding results --//
  result.style.display = "none";
};

// function to reset scores
function resetAll() {
  p1.resetHits();
  p1.score = 0;
  healthBar.value = 30;
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
    if (p1.health > p2.health) {
      result.innerText = "Player 1 Wins!";
      cheerSound.play();
    } else if (p1.health < p2.health) {
      result.innerText = "Player 2 Wins!";
      cheerSound.play();
    } else {
      result.innerText = "It is a draw!";
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
  interval = setInterval(randomArrowIndicator, 1000); // to change the speed
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
  p1LeftArrow.style.borderRightColor = "yellow";
  p1UpArrow.style.borderBottomColor = "lightgrey";
  p1DownArrow.style.borderTopColor = "lightgrey";
  p1RightArrow.style.borderLeftColor = "lightgrey";
  //-- p2 arrows --//
  p2LeftArrow.style.borderRightColor = "yellow";
  p2UpArrow.style.borderBottomColor = "lightgrey";
  p2DownArrow.style.borderTopColor = "lightgrey";
  p2RightArrow.style.borderLeftColor = "lightgrey";
  //-- sound --//
  leftSound.play();
};

const arrowUp = () => {
  //-- p1 arrows --//
  p1LeftArrow.style.borderRightColor = "lightgrey";
  p1UpArrow.style.borderBottomColor = "yellow";
  p1DownArrow.style.borderTopColor = "lightgrey";
  p1RightArrow.style.borderLeftColor = "lightgrey";
  //-- p2 arrows --//
  p2LeftArrow.style.borderRightColor = "lightgrey";
  p2UpArrow.style.borderBottomColor = "yellow";
  p2DownArrow.style.borderTopColor = "lightgrey";
  p2RightArrow.style.borderLeftColor = "lightgrey";
  //-- sound --//
  upSound.play();
};

const arrowDown = () => {
  //-- p1 arrows --//
  p1LeftArrow.style.borderRightColor = "lightgrey";
  p1UpArrow.style.borderBottomColor = "lightgrey";
  p1DownArrow.style.borderTopColor = "yellow";
  p1RightArrow.style.borderLeftColor = "lightgrey";
  //-- p2 arrows --//
  p2LeftArrow.style.borderRightColor = "lightgrey";
  p2UpArrow.style.borderBottomColor = "lightgrey";
  p2DownArrow.style.borderTopColor = "yellow";
  p2RightArrow.style.borderLeftColor = "lightgrey";
  //-- sound --//
  downSound.play();
};

const arrowRight = () => {
  //-- p1 arrows --//
  p1LeftArrow.style.borderRightColor = "lightgrey";
  p1UpArrow.style.borderBottomColor = "lightgrey";
  p1DownArrow.style.borderTopColor = "lightgrey";
  p1RightArrow.style.borderLeftColor = "yellow";
  //-- p2 arrows --//
  p2LeftArrow.style.borderRightColor = "lightgrey";
  p2UpArrow.style.borderBottomColor = "lightgrey";
  p2DownArrow.style.borderTopColor = "lightgrey";
  p2RightArrow.style.borderLeftColor = "yellow";
  //-- sound --//
  rightSound.play();
};

// listening for keydown event for specific keys
window.addEventListener("keydown", (e) => {
  if (start === true) {
    // prevent repeated keystrokes
    if (e.repeat) {
      return;
    }

    // only want the following (p1) keys to be detected
    // for player 1
    if (e.key === "a" || e.key === "w" || e.key === "s" || e.key === "d") {
      if (arrowIndicator === 0 && e.key === "a") {
        p1GoodHits();
        p1LeftArrow.style.borderRightColor = "green";
      } else if (arrowIndicator === 1 && e.key === "w") {
        p1GoodHits();
        p1UpArrow.style.borderBottomColor = "green";
      } else if (arrowIndicator === 2 && e.key === "s") {
        p1GoodHits();
        p1DownArrow.style.borderTopColor = "green";
      } else if (arrowIndicator === 3 && e.key === "d") {
        p1GoodHits();
        p1RightArrow.style.borderLeftColor = "green";
      } else {
        p1MissedHits();
      }
    }
    p1ScoreBoard.innerText = p1.score;

    // for player 2
    if (
      e.key === "ArrowLeft" ||
      e.key === "ArrowUp" ||
      e.key === "ArrowDown" ||
      e.key === "ArrowRight"
    ) {
      if (arrowIndicator === 0 && e.key === "ArrowLeft") {
        p2GoodHits();
        p2LeftArrow.style.borderRightColor = "green";
      } else if (arrowIndicator === 1 && e.key === "ArrowUp") {
        p2GoodHits();
        p2UpArrow.style.borderBottomColor = "green";
      } else if (arrowIndicator === 2 && e.key === "ArrowDown") {
        p2GoodHits();
        p2DownArrow.style.borderTopColor = "green";
      } else if (arrowIndicator === 3 && e.key === "ArrowRight") {
        p2GoodHits();
        p2RightArrow.style.borderLeftColor = "green";
      } else {
        p2MissedHits();
      }
    }
    p2ScoreBoard.innerText = p2.score;
  }
});

function p1GoodHits() {
  p1.hits++;
  p1.scoreUp();
  p1.healthUp();
  p2.healthDown();
}

function p1MissedHits() {
  p1LeftArrow.style.borderRightColor = "red";
  p1UpArrow.style.borderBottomColor = "red";
  p1DownArrow.style.borderTopColor = "red";
  p1RightArrow.style.borderLeftColor = "red";
}

function p2GoodHits() {
  p2.hits++;
  p2.scoreUp();
  p2.healthUp();
  p1.healthDown();
}

function p2MissedHits() {
  p2LeftArrow.style.borderRightColor = "red";
  p2UpArrow.style.borderBottomColor = "red";
  p2DownArrow.style.borderTopColor = "red";
  p2RightArrow.style.borderLeftColor = "red";
}

//
//--------------------------------------------------------------//
// call function
//--------------------------------------------------------------//

playGame();
