let modal = document.getElementById('gameHelp');
let questionMark = document.getElementById("userHelp");
let close = document.querySelector(".close");

questionMark.onclick = function () {
    modal.style.display = "block";
}
close.onclick = function () {
    modal.style.display = "none";
}
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}



const gameSummary = {
    wins: 0,
    losses: 0,
    draw: 0
}

const game = {
    playerHand: "",
    aiHand: ""
}

const hands = [...document.querySelectorAll('.select img')];

function handSelection() {

    game.playerHand = this.dataset.option
    hands.forEach(hand => hand.style.boxShadow = '');
    this.style.boxShadow = '0 0 0 4px red';
}

function aiChoice() {
    return hands[Math.floor(Math.random() * 3)].dataset.option;
}

function checkResult(player, ai) {
    if (player === ai) {
        return 'draw';
    } else if ((player === "paper" && ai === "rock") || (player === "rock" && ai === "scissors") || (player === "scissors" && ai === "paper")) {
        return 'win';
    } else {
        return 'loss';
    }
}

function publishResult(player, ai, result) {
    document.querySelector('#player').textContent = `You choose ${player}.`;

    document.querySelector('#computer').textContent = `Computer choose ${ai}.`;

    if (result === "win") {
        document.querySelector('.userScore span').textContent = ++gameSummary.wins;
        document.querySelector('#results').textContent = "You win!!!"
        document.querySelector('#results').style.color = "green";
    } else if (result === "loss") {
        document.querySelector('.computerScore span').textContent = ++gameSummary.losses;
        document.querySelector('#results').textContent = "Computer wins :("
        document.querySelector('#results').style.color = "red";
    } else {
        document.querySelector('#results').textContent = "The result is a tie :\\"
        document.querySelector('#results').style.color = "darkgrey";
        document.querySelector('.draw span').textContent = ++gameSummary.draw;
    }
}

function endGame() {
    document.querySelector(`[data-option="${game.playerHand}"]`).style.boxShadow = "";
    game.playerHand = "";
    game.aiHand = "";
    if (gameSummary.wins == 5) {
        alert("You win!");
        document.querySelector('.userScore span').textContent = 0;
        document.querySelector('.computerScore span').textContent = 0;
        document.querySelector('.draw span').textContent = 0;
        gameSummary.wins = 0;
        gameSummary.losses = 0;
        gameSummary.draw = 0;
    }
    if (gameSummary.losses == 5) {
        alert("You lose");
        document.querySelector('.userScore span').textContent = 0;
        document.querySelector('.computerScore span').textContent = 0;
        document.querySelector('.draw span').textContent = 0;
        gameSummary.wins = 0;
        gameSummary.losses = 0;
        gameSummary.draw = 0;
    }
}

function startGame() {
    if (!game.playerHand) {
        return alert("wybierz dłoń!!!!");
    }
    game.aiHand = aiChoice();
    const gameResult = checkResult(game.playerHand, game.aiHand);
    publishResult(game.playerHand, game.aiHand, gameResult);
    endGame()
}

hands.forEach(hand => hand.addEventListener('click', handSelection))

document.querySelector('.start').addEventListener('click', startGame)