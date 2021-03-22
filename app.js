/*
GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he wishes. Each result gets added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/

let scores, roundScore, activePlayer, lastRoll; 

//State variable -> the state of the game
let gamePlaying = true;

let requiredScore = 100; 

init();


//Roll button
document.querySelector('.btn-roll').addEventListener('click', function () {

    if (gamePlaying) {

    //1.Random number
    let dice =  Math.floor(Math.random() * 6) + 1;
    let dice2 = Math.floor(Math.random() * 6) + 1;

    //2. Display the roll outcome
    let diceDOM = document.querySelector('.dice-1')
    let diceDOM2 = document.querySelector('.dice-2')
    diceDOM.style.display = 'block';
    diceDOM2.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png';
    diceDOM2.src = 'dice-' + dice2 + '.png';

    //3. Update the round score if the roll was not equal to 1

    if (dice !== 1 && dice2 !== 1 && dice !== lastRoll && dice2 !== lastRoll) {
        //Only keeps track of the previous roll if it was a six
        if (dice === 6 || dice2 === 6) {
            lastRoll = dice; 
            lastRoll2 = dice2;
        }

        //Add to running score
        roundScore += dice + dice2;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
    } else {
        //Next player
        nextPlayer();
        lastRoll = 0;
        lastRoll2 = 0;
    }

}

}); 



//Hold button
document.querySelector('.btn-hold').addEventListener('click', function () {
    
    if (gamePlaying) {
        
    //add current score to global score
    scores[activePlayer] += roundScore;

    //Update the UI
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];


    //Check if player won the game
    if(scores[activePlayer] >= requiredScore) {
        //Player wins the game
        document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
        document.querySelector('.dice').style.display = 'none';
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
        gamePlaying = false;
    } else {
        //Next player
        nextPlayer();
        lastRoll = 0;
        lastRoll2 = 0;
        
    }

}

});


document.querySelector('.btn-new').addEventListener('click', init);


//Initialization function
function init () {
    scores = [0, 0];
    roundScore = 0; 
    activePlayer = 0;
    lastRoll = 0;
    lastRoll2 = 0;

    gamePlaying = true;

    document.querySelector('.dice-1').style.display = 'none';
    document.querySelector('.dice-2').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('#name-0').textContent = 'Player 1';
    document.querySelector('#name-1').textContent = 'Player 2';

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');

    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-1-panel').classList.remove('active');

    }
    

    document.querySelector('.btn-change-score').addEventListener('click', function () {
        

        //Gives users a prompt to type into
            let potentialInput = prompt("What would you like to set the game winning score to?", "Your custom score here");
            if (!isNaN(potentialInput) && potentialInput !== null && potentialInput !== "") {
                input = potentialInput;
                console.log(input);

                 //Takes the users input, applies it to the required score 
                requiredScore = input;
                alert("You have succesfully changed the winning score to " + requiredScore + '!');
            } else {
                //Nothing happens, the user input was not a number
                alert("That is not a number! The required winning score remains " + requiredScore + '.');
            }
        });




function nextPlayer() {
    //Next player's turn -> If it was 0, make it 1. and vice versa
    activePlayer  === 0 ? activePlayer = 1: activePlayer = 0;
    roundScore = 0;
    
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    
    document.querySelector('.dice-1').style.display = 'none';
    document.querySelector('.dice-2').style.display = 'none';
    }




    /*
    Coding challenge

    * 1. If a player rolls two sixes in a row they lose ALL of their score, switches to other player's turn

    * 2. Add an HTML input field where players can alter the winning score number to their liking

    * 3. Add another dice to the game

    */