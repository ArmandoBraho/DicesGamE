// game state variables
let player1Score = 0;
let player2Score = 0;
let player1Turn = true;

//  variables to store references to the necessary DOM nodes
const player1Dice = document.getElementById("player1Dice");
const player2Dice = document.getElementById("player2Dice");
const player1Scoreboard = document.getElementById("player1Scoreboard");
const player2Scoreboard = document.getElementById("player2Scoreboard");
const message = document.getElementById("message");
const rollBtn = document.getElementById("rollBtn");
const resetBtn = document.getElementById("resetBtn");


function showResetButton() {
    rollBtn.style.display = "none";
    resetBtn.style.display = "block";
}

 rollBtn.addEventListener("click", function() {
    const randomNumber = Math.floor(Math.random() * 6) + 1;

    if (player1Turn) {
        player1Score += randomNumber;
        player1Scoreboard.textContent = player1Score;
        player1Dice.textContent = randomNumber;
        player1Dice.classList.remove("active");
        player2Dice.classList.add("active");
        message.textContent = "Player 2 Turn";
    } else {
        player2Score += randomNumber;
        player2Scoreboard.textContent = player2Score;
        player2Dice.textContent = randomNumber;
        player2Dice.classList.remove("active");
        player1Dice.classList.add("active");
        message.textContent = "Player 1 Turn";
    }
    
    if(!player1Turn) {
        if(player1Score >= 20 && player2Score >=20 && player1Score===player2Score) {
            displayResult("It's a DRAW... WOOOOW",player1Dice,player2Dice, true);
            showResetButton();        
        }else if(player1Score >= 20 && player1Score>player2Score) {
            displayResult("Player 1 Won 🥳",player1Dice,player2Dice);            
            showResetButton();
        }  else if (player2Score >= 20 && player2Score>player1Score) {
            displayResult("Player 2 Won 🥳",player2Dice,player1Dice);                        
            showResetButton();
        }
        
    }
    player1Turn = !player1Turn;
})

function displayResult(resultMessage, winner, loser, draw = false){
    const winnerUrls = ['url("images/giphyWin1.gif")','url("images/giphyWin2.gif")','url("images/giphyWin3.gif")','url("images/giphyWin4.gif")'];
    const loserUrls = ['url("images/giphyLose1.gif")','url("images/giphyLose2.gif")','url("images/giphyLose3.gif")'];
    const drawUrls = [ 'url("images/giphyDRAW2222222.gif")','url("images/giphyDrawCats.gif")','url("images/giphyDrawGoku.webp")'];

    if(draw){
        let drawRandomNumber = generateRandomNumber( 0 , drawUrls.length-1);
        message.textContent = resultMessage;
        player1Dice.style.backgroundImage = drawUrls[drawRandomNumber];
        player1Dice.textContent = '';
        player2Dice.style.backgroundImage = drawUrls[drawRandomNumber];
        player2Dice.textContent = '';
        return;
    }
    let winnerRandomNumber = generateRandomNumber( 0 ,winnerUrls.length-1);
    let loserRandomNumber = generateRandomNumber( 0 , loserUrls.length-1);
    message.textContent = resultMessage;
    winner.style.backgroundImage = winnerUrls[winnerRandomNumber];
    winner.textContent = '';
    loser.style.backgroundImage = loserUrls[loserRandomNumber];
    loser.textContent = '';
}

function generateRandomNumber( min , max){
    let randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
    return randomNumber;
}
 
resetBtn.addEventListener("click", function(){
    reset();
})

function reset() {
    player1Score = 0;
    player2Score = 0;
    player1Turn = true;
    player1Scoreboard.textContent = 0;
    player2Scoreboard.textContent = 0;
    player1Dice.textContent = "-";
    player2Dice.textContent = "-";
    message.textContent = "Player 1 Turn";
    resetBtn.style.display = "none";
    rollBtn.style.display = "block";
    player2Dice.classList.remove("active");
    player1Dice.classList.add("active");
    player1Dice.style.backgroundImage = 'url("images/giphyDraw.gif")';
    player2Dice.style.backgroundImage = 'url("images/giphyDraw.gif")';
}
