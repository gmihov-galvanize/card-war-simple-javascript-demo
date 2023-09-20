
let draws = 0;
let score = 0;
let bestScore = { player: "", score: "", date: "", time: "" };
let games = {"George": 0, "Matt": 0};

function drawCard() {
    let suits = ["&#9824", "&#9827", "&#9829", "&#9830"];
    let numbers = ["A", 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K"];
    
    let randomNumber = numbers[Math.floor(Math.random() * numbers.length)];
    let randomSuit = suits[Math.floor(Math.random() * suits.length)];

    if (randomSuit === "&#9830" || randomSuit === "&#9829") {
        document.querySelector(".card").style.color = "red";
    } else {
        document.querySelector(".card").style.color = "black";
    }

    document.querySelector(".top").innerHTML = randomSuit;
    document.querySelector(".middle").innerHTML = randomNumber;
    document.querySelector(".bottom").innerHTML = randomSuit;

    if (randomNumber == "A") score += 1;
    else if (randomNumber == "J") score += 11;
    else if (randomNumber == "Q") score += 12;
    else if (randomNumber == "K") score += 13;
    else score += randomNumber;
}

function postScore() {
    let player = prompt("Turn over - Player name: ");
    
    // post score with date and time 
    let datetime = new Date();
    let date = `${datetime.getDate()}-${datetime.getMonth()+1}-${datetime.getFullYear()}`;
    let time = `${datetime.getHours()}:${datetime.getMinutes()}`;
    document.querySelector(".scoreList").innerHTML += `<li>${player} on ${date} at ${time} scored <span>${score}<span></li>`;

    // determine best player
    if (score > bestScore.score) {
        bestScore.player = player;
        bestScore.score = score;
        bestScore.date = date;
        bestScore.time = time;
    }
    document.querySelector(".best-score").innerHTML = `<div>${bestScore.player} on ${bestScore.date} at ${bestScore.time} - ${bestScore.score}</div>`;

    // keep track of players and games played 
    if (player in games) games[player] += 1;
    else games[player] = 1;

    // determine most played
    let mostPlay = { name: "", played: 0 };

    for (let name in games) {
        if (games[name] > mostPlay.played) {
            mostPlay.name = name;
            mostPlay.played = games[name];
        }
        else if (games[name] == mostPlay.played){
            mostPlay.name = [mostPlay.name, name];
            mostPlay.played = games[name];
        }
    }
    document.querySelector(".most-played").innerHTML = `<div>${mostPlay.name} played ${mostPlay.played} game/s</div>`;

    // zero out to start over
    score = 0;
    draws = 0;
}

// create event listener for the DRAW button 
let btn = document.querySelector(".draw-button");

btn.addEventListener("click", function () {
    document.querySelector(".card").classList.remove("d-none");

    if (draws < 3) {
        drawCard();
        draws += 1;
    }
    else {
        document.querySelector(".card").classList.add("d-none");
        postScore();
    }
})