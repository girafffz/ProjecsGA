// console.log("Welcome to Tug-of-War");

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
// can add in more variations
let arrowArray = ["arrowLeft", "arrowUp", "arrowDown", "arrowRight"];

//
//--------------------------------------------------------------//
// setting up querySelectors as variables
//--------------------------------------------------------------//
const startButton = document.querySelector("#start-btn");
const clock = document.querySelector("#timer");
const healthBar = document.querySelector("#health-progress");
const result = document.querySelector("#display-result");
const ropeImage = document.querySelector("#rope");
const leftArrow = document.querySelector(".left-arrow");
const upArrow = document.querySelector(".up-arrow");
const downArrow = document.querySelector(".down-arrow");
const rightArrow = document.querySelector(".right-arrow");

// -- player 1 -- //
const p1Image = document.querySelector("#p1-image");
const p1ScoreBoard = document.querySelector("#player1-score");
const p1LeftArrow = document.querySelector("#left-p1");
const p1UpArrow = document.querySelector("#up-p1");
const p1DownArrow = document.querySelector("#down-p1");
const p1RightArrow = document.querySelector("#right-p1");

// -- player 2 -- //
const p2Image = document.querySelector("#p2-image");
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
const cheerSound = new Audio(
  "http://soundbible.com/mp3/Kids%20Cheering-SoundBible.com-681813822.mp3"
);
const awwSound = new Audio("media/aww_sound_effect.mp3");

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
    healthBar.value = p1.health;
  }

  healthDown() {
    this.health--;
    healthBar.value = p1.health;
  }

  hitsUp() {
    this.hits++;
  }

  resetHitsScoreHealth() {
    this.hits = 0;
    this.score = 0;
    this.health = 30;
    healthBar.value = 30;
  }
}

const p1 = new Player("Player 1", undefined, undefined, undefined);
const p2 = new Player("Player 2", undefined, undefined, undefined);

//
//--------------------------------------------------------------//
// for generating new game/round
//--------------------------------------------------------------//

//-- start-game event listerner --//
// function to start a game by clicking start button
function playGame() {
  startButton.addEventListener("click", (e) => {
    start = true;
    gameOver = false;
    newGame();
  });
}

// function for each new game
// setTimeout determines how long a game will run
function newGame() {
  if (start === true) {
    clearRound();
    resetAll();
    randomExecutor();
    countDownTimer();
    setTimeout(finishGame, 30000); // short game
  }
}

// function for finishing a game
function finishGame() {
  clearInterval(interval);
  start = false;
  gameOver = true;
  determineWinner();
  startButton.innerText = "Restart";
  clock.innerText = "Game Over";
}

// function for clearing a game
// resetting timer, arrow colors to original state and hide results
const clearRound = () => {
  //-- reset arrow color --//
  leftArrow.style.borderRightColor = "lightgrey";
  upArrow.style.borderBottomColor = "lightgrey";
  downArrow.style.borderTopColor = "lightgrey";
  rightArrow.style.borderLeftColor = "lightgrey";
  //-- reset timer --//
  timer = 30;
  //-- hiding results --//
  result.style.display = "none";
};

// function to reset players stats and images to original state
function resetAll() {
  resetPlayerStats(p1);
  resetPlayerStats(p2);
  updateImage(p1Image, "../image/man_side.gif", "block");
  updateImage(p2Image, "../image/man_side.gif", "block");
  ropeImage.style.display = "block";
  p1ScoreBoard.innerText = 0;
  p2ScoreBoard.innerText = 0;
}

// function to reset player stats
function resetPlayerStats(player) {
  player.resetHitsScoreHealth();
}

// function to update images and its display mode
function updateImage(image, src, displayStyle) {
  image.style.display = displayStyle;
  image.src = src;
}

// function to determine winner
// win condition: winner will be determined by final health after stipulated time (30s)
function determineWinner() {
  // checking if game is over before deciding the winner
  if (gameOver === true) {
    result.style.display = "block"; // displays result
    ropeImage.style.display = "none";
    if (p1.health > p2.health) {
      win("Player 1", p1Image, p2Image);
    } else if (p1.health < p2.health) {
      win("Player 2", p2Image, p1Image);
    } else {
      draw(p1Image, p2Image);
    }
  }
}

// function for win condition
function win(winnerName, winnerImage, loserImage) {
  result.innerText = `${winnerName} Wins!`;
  updateImage(winnerImage, "../image/man_jumping.gif", "block");
  updateImage(loserImage, undefined, "none");
  cheerSound.play();
}

// function for draw condition
function draw(player1Image, player2Image) {
  result.innerText = `It is a draw!`;
  updateImage(player1Image, "../image/man_sighing.gif", "block");
  updateImage(player2Image, "../image/man_sighing.gif", "block");
  awwSound.play();
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
// purpose is to allow arrows to change color at random endlessly until interval is cleared
// speed can be changed for longer game duration
function randomExecutor() {
  interval = setInterval(randomArrowIndicator, 1000); // easy
}

// function to determine which arrows will change colors
// can be expanded to fit in more arrows (e.g. diagonals) for a more complex game
function randomArrowIndicator() {
  arrowIndicator = Math.floor(Math.random() * arrowArray.length);

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

//-- changing arrow colors --//
// only works when p1 arrows and p2 arrows are separately referenced
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

//
//-- in-game event listener --//
// listening for keydown event for specific keys matching conditions during game play
window.addEventListener("keydown", (e) => {
  // check if start is true to ensure event listener only works during game play
  if (start === true) {
    // prevent repeated keystrokes
    if (e.repeat) {
      return;
    }

    // only want the following (p1/p2) keys to be tracked while playing
    // for player 1
    if (e.key === "a" || e.key === "w" || e.key === "s" || e.key === "d") {
      if (arrowIndicator === 0 && e.key === "a") {
        goodHits(p1, p2);
        p1LeftArrow.style.borderRightColor = "green";
      } else if (arrowIndicator === 1 && e.key === "w") {
        goodHits(p1, p2);
        p1UpArrow.style.borderBottomColor = "green";
      } else if (arrowIndicator === 2 && e.key === "s") {
        goodHits(p1, p2);
        p1DownArrow.style.borderTopColor = "green";
      } else if (arrowIndicator === 3 && e.key === "d") {
        goodHits(p1, p2);
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
        goodHits(p2, p1);
        p2LeftArrow.style.borderRightColor = "green";
      } else if (arrowIndicator === 1 && e.key === "ArrowUp") {
        goodHits(p2, p1);
        p2UpArrow.style.borderBottomColor = "green";
      } else if (arrowIndicator === 2 && e.key === "ArrowDown") {
        goodHits(p2, p1);
        p2DownArrow.style.borderTopColor = "green";
      } else if (arrowIndicator === 3 && e.key === "ArrowRight") {
        goodHits(p2, p1);
        p2RightArrow.style.borderLeftColor = "green";
      } else {
        p2MissedHits();
      }
    }
    p2ScoreBoard.innerText = p2.score;
  }
});

// function to update players stats for each successful hit
function goodHits(player, opponent) {
  player.hitsUp();
  player.scoreUp();
  player.healthUp();
  opponent.healthDown();
}

// function to update players stats for missing a hit - needs to tracked separately
// for player 1
function p1MissedHits() {
  p1LeftArrow.style.borderRightColor = "red";
  p1UpArrow.style.borderBottomColor = "red";
  p1DownArrow.style.borderTopColor = "red";
  p1RightArrow.style.borderLeftColor = "red";
}

// for player 2
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
