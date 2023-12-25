'use strict';
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0E1 = document.querySelector('#score--0');
const score1E1 = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current0E2 = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentscore, activePlayer, playing;
const init = function () {
  // Starting Conditions
  scores = [0, 0];
  currentscore = 0;
  activePlayer = 0;
  playing = true;

  score0E1.textContent = 0;
  score1E1.textContent = 0;
  current0El.textContent = 0;
  current0E2.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

init();

const winningScore = function () {
  playing = false;
  diceEl.classList.add('hidden');

  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add('player--winner');
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--active');
};
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentscore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};
// Starting dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generate random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Display Dice
    diceEl.classList.remove('hidden');
    diceEl.src = `Dice-${dice}.png`;

    // 3. Check for rolled 1: if true, switch to next player

    if (dice !== 1) {
      currentscore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentscore;
      // current0El.textContent = currentscore;
      if (currentscore >= 20) {
        winningScore();
      }
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // add current score to score of active players's score
    scores[activePlayer] += currentscore;
    // scores[1] = scores[1] + currentscore
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // currentscore = 0;
    // check if players score is >= 100

    if (scores[activePlayer] >= 20) {
      // Finish the game
      winningScore();
    } else {
      // Swicthc to the nest player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
