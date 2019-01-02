'use strict';
//zmienne do buttonów
var button1 = document.getElementById('button_1');
var button2 = document.getElementById('button_2');
var button3 = document.getElementById('button_3');
var newGame = document.getElementById('newGame');

var params = {
  playersWin: 0,
  computersWin: 0,
  rounds: 0,
//zapisanie w zmiennej odwołania do diva
  output: document.getElementById('output'),   
  result: document.getElementById('result'),
  numberLimit: document.getElementById('numberLimit'),
  gameResult: document.getElementById('gameResult')

};

//dodanie tekstu
params.output.innerHTML = 'START GAME!! Click the button!' + '<br><br>' + params.output.innerHTML;


// Pętla przechodzącą przez wszystkie elementy z klasą player-move
var allPlayerMove = document.querySelectorAll('.player-move'); 

for (var i = 0; i < allPlayerMove.length; i++) {
  var dataMove = allPlayerMove[i].getAttribute('data-move'); 
  
  allPlayerMove[i].addEventListener('click', function() { 
    
    playerMove(dataMove);
  });
}
/*
button1.addEventListener('click', function() {
  playerMove('paper');
});

button2.addEventListener('click', function() {
  playerMove('stone');
});

button3.addEventListener('click', function() {
  playerMove('scissors');
});
*/

//Funkcja która losuje 
function randomNumber() {
  var computerChoices = ['paper', 'stone', 'scissors'];
  var computerMove = Math.floor(Math.random() * 3); //gdy było +1 w przypadku wylosowania paper undefined
  return computerChoices[computerMove];
};

function playerMove(playerChoice, computerChoice) {
  
  computerChoice = randomNumber();
  if (playerChoice == computerChoice) {
    params.output.innerHTML = 'It is tie!';
  } else if (
    ((playerChoice == 'paper') && (computerChoice == 'stone')) 
    || ((playerChoice == 'stone') && (computerChoice == 'scissors')) 
    || ((playerChoice == 'scissors') && (computerChoice == 'paper'))
  ) {
    params.output.innerHTML = 'YOU WON! You played: ' + playerChoice + ' - computer played: ' + computerChoice;
    params.playersWin++;
    params.result.innerHTML = params.playersWin+ ' - ' +params.computersWin;
  } else {
    params.output.innerHTML = 'YOU LOST! You played: ' + playerChoice + ' - computer played: ' + computerChoice;
    params.computersWin++;
    params.result.innerHTML = params.playersWin+ ' - ' +params.computersWin;
  }
  gameOver();
};

function roundsLimit() {
  params.rounds = window.prompt('How many rounds would you like to play?');
  if (params.rounds > 0) {
    params.numberLimit.innerHTML = 'Number of rounds: ' +params.rounds;
  } else if(isNaN(rounds) || rounds <= 0) {
    params.numberLimit.innerHTML = 'Please write correct number of rounds';
  }
  return params.rounds;
};

//funkcja pobiera informacje ze zmiennych computersWin i playersWin jeśli któreś osiągnie ilość wybranych rund wyświetla komunikat i blokuje przycisk  ????
function gameOver() {
 
  if (params.playersWin == params.rounds) {
    params.gameResult.innerHTML = 'YOU WON THE GAME!';
    disableButton(true);
    
  } else if (params.computersWin == rounds) {
    params.gameResult.innerHTML = 'GAME OVER';
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
  params.playersWin = 0;
	params.computersWin = 0;
  params.rounds = 0;
  roundsLimit();    //uruchomienie zapytanie o ilość rund
  disableButton(false); //odblokowanie przycisków
  params.result.innerHTML = '';      //czyszczenie wyników
  params.gameResult.innerHTML = '';
  params.output.innerHTML = '';
});