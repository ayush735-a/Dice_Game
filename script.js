"use strict";

var currentPlayer, playerScores, playersCurrentScore;

currentPlayer = 0;

playerScores = [0, 0];

playersCurrentScore = 0;

document.getElementById("score--0").textContent = 0;
document.getElementById("score--1").textContent = 0;
document.getElementById("current--0").textContent = 0;
document.getElementById("current--0").textContent = 0;

// when the new game start we want to hide the dice
document.querySelector(".dice").style.display = "none";

function gameHasEnded() {
  // if either player has a content 0 means the player has won a Game.
  let text1 = document.getElementById("name--0").textContent;
  let text2 = document.getElementById("name--1").textContent;

  if ((text1 === "WINNER!!") | (text2 === "WINNER!!")) {
    return true;
  }

  return false;
}
document.querySelector(".btn--roll").addEventListener("click", function () {
  if (gameHasEnded() === true) return;

  var diceDOM = document.querySelector(".dice");

  // firstly we set it's display property back to normal
  diceDOM.style.display = "block";

  //Math.random genrate number in between (0,1)
  let diceNumber = Math.floor(Math.random() * 6) + 1;

  diceDOM.src = "dice-" + diceNumber + ".png";

  if (diceNumber == 1) {
    playersCurrentScore = 0;

    document.getElementById("current--" + currentPlayer).textContent = 0;

    document
      .querySelector(".player--" + currentPlayer)
      .classList.remove("player--active");

    currentPlayer = 1 - currentPlayer;

    document
      .querySelector(".player--" + currentPlayer)
      .classList.add("player--active");
  } else {
    playersCurrentScore += diceNumber;
  }

  var currentScoreRepresenter = document.getElementById(
    "current--" + currentPlayer
  );
  currentScoreRepresenter.textContent = playersCurrentScore;
});

// now we handle the hold condition here
document.querySelector(".btn--hold").addEventListener("click", () => {
  if (gameHasEnded() === true) return;

  playerScores[currentPlayer] += playersCurrentScore;

  playersCurrentScore = 0;

  if (playerScores[currentPlayer] >= 100) {
    document.getElementById("name--" + currentPlayer).textContent = "WINNER!!";

    document.querySelector(".dice").style.display = "none";

    // also to differentiate between the winner we add the winnig class to the current player
    document
      .querySelector(".player--" + currentPlayer)
      .classList.remove("player--active");
    document
      .querySelector(".player--" + currentPlayer)
      .classList.add("player--winner");

    return;
  }

  document.getElementById("current--" + currentPlayer).textContent = 0;

  // here also we remove the active class of the current player
  document
    .querySelector(".player--" + currentPlayer)
    .classList.remove("player--active");

  currentPlayer = 1 - currentPlayer;

  // here we add the active class on the new player
  document
    .querySelector(".player--" + currentPlayer)
    .classList.add("player--active");

  document.getElementById("score--0").textContent = playerScores[0];
  document.getElementById("score--1").textContent = playerScores[1];
});

function resetEveryThing() {
  currentPlayer = 0;
  playerScores = [0, 0];

  playersCurrentScore = 0;

  document.getElementById("current--0").textContent = 0;
  document.getElementById("current--1").textContent = 0;

  document.getElementById("score--0").textContent = 0;
  document.getElementById("score--1").textContent = 0;

  // now as the new game start's we want to add the active class only to player 0
  document.querySelector(".player--0").classList.remove("player--active");
  document.querySelector(".player--1").classList.remove("player--active");

  document.querySelector(".player--0").classList.add("player--active");

  document.getElementById("name--0").textContent = "player 1";
  document.getElementById("name--1").textContent = "player 2";

  document.querySelector(".dice").style.display = "none";

  // removing the winning class from them
  document.querySelector(".player--0").classList.remove("player--winner");
  document.querySelector(".player--1").classList.remove("player--winner");
}

// we wanna start a new Game
document.querySelector(".btn--new").addEventListener("click", resetEveryThing);
