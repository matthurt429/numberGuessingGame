var randomNumber = Math.ceil(Math.random() * 100);

var guesses = document.querySelector('.guesses');
var lastResult = document.querySelector('.lastResult');
var lowOrHi = document.querySelector('.lowOrHi');

var guessSubmit = document.querySelector('.guessSubmit');
var guessField = document.querySelector('.guessField');

guessField.addEventListener('keyup', keyupHandler);

var guessCount = 1;
var resetButton;



function keyupHandler(event) {
  console.log("A Keyup Event Occured, keyCode:" + event.keyCode);

  // If the key pressed was "Enter"
  if(event.keyCode === 13) {
    guessSubmit.click();
  }
}

function checkGuess() {
  var userGuess = Number(guessField.value);

  if(guessField.value === '') {
    return;
  }

  if(userGuess < 1 || userGuess > 100 || isNaN(userGuess)) {
    lastResult.textContent = "That wasn't a valid guess, try again!";
    lastResult.style.backgroundColor = 'red';
    guessField.value = '';
    guessField.focus();
    return;
  }

  if(guessCount === 1) {
    guesses.textContent = "Previous guesses: ";
  }
  guesses.textContent += userGuess + ' ';


  //LOGIC GOES HERE
  if(userGuess === randomNumber) {
    //The user guessed the right number
    lastResult.textContent = "Congratulations! You got it right!";
    lastResult.style.backgroundColor = 'green';
    lowOrHi.textContent = '';
    setGameOver();
  } else if (guessCount === 10) {
    //The user is out of guesses
    lastResult.textContent = '!!!GAME OVER!!!';
    lastResult.style.backgroundColor = "red";
    setGameOver();
  } else {
    //The user hasn't gotten it right, but still has guesses left
    lastResult.textContent = "Wrong!";
    lastResult.style.backgroundColor = "red";
    if(userGuess < randomNumber) {
      lowOrHi.textContent = 'Last guess was too low!';
    } else {
      lowOrHi.textContent = 'Last guess was too high!';
    }
  }


  guessCount++;
  guessField.value = '';
  guessField.focus();
}

function setGameOver() {
  //Do some work
  guessField.disabled = true;
  guessSubmit.disabled = true;
  resetButton = document.createElement('button');
  resetButton.textContent = 'Start new game';
  document.querySelector('.form').appendChild(resetButton);
  resetButton.addEventListener('click', resetGame);
}

function resetGame() {
  guessCount = 1;

  var resetParas = document.querySelectorAll('.resultParas p');
  for (var i = 0; i < resetParas.length; i++) {
    resetParas[i].textContent = '';
  }

  lastResult.style.backgroundColor = 'white';

  guessField.disabled = false;
  guessSubmit.disabled = false;

  resetButton.parentNode.removeChild(resetButton);

  guessField.value = '';
  guessField.focus();

  randomNumber = Math.ceil(Math.random() * 100);
}

guessSubmit.addEventListener('click', checkGuess);
