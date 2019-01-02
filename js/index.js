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
    
  
    allPlayerMove[i].addEventListener('click', function() { 
      var dataMove = this.getAttribute('data-move'); 
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
    showModal();
    document.querySelector('.result-modal').innerHTML = 'YOU WON THE GAME! Press the new game button to start';
    disableButton(true);
    
  } else if (params.computersWin == params.rounds) {
    showModal();
    document.querySelector('.result-modal').innerHTML = 'GAME OVER! Press the new game button to start';
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


//Modal
function showModal(){
  var allModals = document.querySelectorAll('.modal');
	  for (var i = 0; i < allModals.length; i++) {
	    allModals[i].classList.remove('show');
	  }
  document.querySelector('#modal-overlay').classList.add('show');
 
};


// Dodajemy też funkcję zamykającą modal, oraz przywiązujemy ją do kliknięć na elemencie z klasą "close". 

var hideModal = function(event){
  event.preventDefault();
  document.querySelector('#modal-overlay').classList.remove('show');
};

var closeButtons = document.querySelectorAll('.modal .close');

for(var i = 0; i < closeButtons.length; i++){
  closeButtons[i].addEventListener('click', hideModal);
}

// Dobrą praktyką jest również umożliwianie zamykania modala poprzez kliknięcie w overlay. 

document.querySelector('#modal-overlay').addEventListener('click', hideModal);

// Musimy jednak pamiętać, aby zablokować propagację kliknięć z samego modala - inaczej każde kliknięcie wewnątrz modala również zamykałoby go. 

var modals = document.querySelectorAll('.modal');

for(var i = 0; i < modals.length; i++){
  modals[i].addEventListener('click', function(event){
      event.stopPropagation();
  });
}