'use strict';

var playersWin = 0;
var computersWin = 0;
var rounds;
//zapisanie w zmiennej odwołania do diva
var output = document.getElementById('output');   
var result = document.getElementById('result');
var numberLimit = document.getElementById('numberLimit');
var gameResult = document.getElementById('gameResult');
var newGame = document.getElementById('newGame');

//dodanie tekstu
output.innerHTML = 'START GAME!! Click the button!' + '<br><br>' + output.innerHTML;

//zmienne do buttonów
var button1 = document.getElementById('button_1');
var button2 = document.getElementById('button_2');
var button3 = document.getElementById('button_3');

button1.addEventListener('click', function() {
  playerMove('paper');
});

button2.addEventListener('click', function() {
  playerMove('stone');
});

button3.addEventListener('click', function() {
  playerMove('scissors');
});

//Funkcja która losuje 
function randomNumber() {
  var computerChoices = ['paper', 'stone', 'scissors'];
  var computerMove = Math.floor(Math.random() * 3); //gdy było +1 w przypadku wylosowania paper undefined
  return computerChoices[computerMove];
};

function playerMove(playerChoice, computerChoice) {
  
  computerChoice = randomNumber();
  if (playerChoice == computerChoice) {
    output.innerHTML = 'It is tie!';
  } else if (
    ((playerChoice == 'paper') && (computerChoice == 'stone')) 
    || ((playerChoice == 'stone') && (computerChoice == 'scissors')) 
    || ((playerChoice == 'scissors') && (computerChoice == 'paper'))
  ) {
    output.innerHTML = 'YOU WON! You played: ' + playerChoice + ' - computer played: ' + computerChoice;
    playersWin++;
    result.innerHTML = playersWin+ ' - ' +computersWin;
  } else {
    output.innerHTML = 'YOU LOST! You played: ' + playerChoice + ' - computer played: ' + computerChoice;
    computersWin++;
    result.innerHTML = playersWin+ ' - ' +computersWin;
  }
  gameOver();
};

function roundsLimit() {
  rounds = window.prompt('How many rounds would you like to play?');
  if (rounds > 0) {
    numberLimit.innerHTML = 'Number of rounds: ' +rounds;
  } else if(isNaN(rounds) || rounds <= 0) {
    numberLimit.innerHTML = 'Please write correct number of rounds';
  }
  return rounds;
};

//funkcja pobiera informacje ze zmiennych computersWin i playersWin jeśli któreś osiągnie ilość wybranych rund wyświetla komunikat i blokuje przycisk  ????
function gameOver() {
 
  if (playersWin == rounds) {
    gameResult.innerHTML = 'YOU WON THE GAME!';
    disableButton(true);
    
  } else if (computersWin == rounds) {
    gameResult.innerHTML = 'GAME OVER';
    disableButton(true);
  }
};

function disableButton(state) {                              //zablokowanie przycisków
  button1.disabled = state;
  button2.disabled = state;
  button3.disabled = state;
};
 
//uruchomienie przycisku newGame, zeruje wynik
newGame.addEventListener('click', function() {
  playersWin = 0;
	computersWin = 0;
  rounds = 0;
  roundsLimit();    //uruchomienie zapytanie o ilość rund
  disableButton(false); //odblokowanie przycisków
  result.innerHTML = '';      //czyszczenie wyników
  gameResult.innerHTML = '';
  output.innerHTML = '';
});