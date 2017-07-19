var randomNumber = Math.ceil(Math.random() * 100);

var guesses = document.querySelector('.guesses');
var lastResult = document.querySelector('.lastResult');
var lowOrHi = document.querySelector('.lowOrHi');

var guessSubmit = document.querySelector('.guessSubmit');
var guessField = document.querySelector('.guessField');

guessField.addEventListener('keyup',keyupHandler )

var guessCount = 1;
var resetButton;

function keyupHandler(event){
  //console.log('a key up event occured:'+ event.keyCode);

// if the key pressed was enter
  if(event.keyCode === 13) {
    guessSubmit.click();
  }
}
// function checkGuess() {
 //   if(guessField.value === '') {
 //     return;
 //   }
// }

function checkGuess(){
  var userGuess = Number(guessField.value);
  if( guessCount === 1){
    guesses.textContent = "Previous guesses: ";
  }
  guesses.textContent += userGuess + ' ';

  if(userGuess === randomNumber){
    //user guessed the right Number
    lastResult.textContent = 'Congratulations! You got it right!';
    lastResult.style.backgroundColor = 'green';
    lowOrHi.textContent = '';
    setGameOver();
  }
  else if ( guessCount === 4){
    //the user is out of guesses
    lastResult.textContent = '!!!GAME OVER!!!';
    lastResult.style.backgroundColor = 'red';
    setGameOver();
  }
  else{
    //this is where the user hasn't gotten it right but still has guesses left
    lastResult.textContent = 'Wrong!';
    lastResult.style.backgroundColor='red';
    if (userGuess < randomNumber){
      lowOrHi.textContent = ' Last Guess to Low!';
    }
    else{
      lowOrHi.textContent = 'Last Guess to High!';
    }
  }

  guessCount++;
  guessField.value = '';
  guessField.focus();
}
function setGameOver(){
  // Do some Work
  guessField.disabled = true;
  guessSubmit.disabled = true;
  resetButton = document.createElement('button');
  resetButton.textContent = 'Start New Game';
  document.querySelector('.form').appendChild(resetButton);
  resetButton.addEventListener('click', resetGame);
}
function resetGame(){
  guessCount = 1;

  var resetParas = document.querySelectorAll('.resultParas p');
  for (var i = 0; i < resetParas.length; i++) {
    resetParas[i].textContent = '';
  }
  lastResult.style.backgroundColor= 'white';

  guessField.disabled = false;
  guessSubmit.disabled = false

  resetButton.parentNode.removeChild(resetButton);

  guessField.value = '';
  guessField.focus();

  randomNumber = Math.ceil(Math.random() * 100);
}
guessSubmit.addEventListener('click', checkGuess)


