var players = [
  { name: "USER", number: -1, score: 0 },
  { name: "CPU1", number: -1, score: 0 },
  { name: "CPU2", number: -1, score: 0 },
  { name: "CPU3", number: -1, score: 0 },
  { name: "CPU4", number: -1, score: 0 },
];

const eliminationScore = -10;

// displayNumbersSelected();
// displayComputations();
// displayCurrentScoreboard();
// displayUpdatedScoreboard();
// displayScoreboard();

function disableNumbersBtn() {
  const numbers = document.querySelectorAll(".number");
  numbers.forEach((number) => {
    number.removeAttribute("onclick");
    number.style.cursor = "default";
  });
}

function display(text) {
  const dashboardContainer = document.querySelector(".dashboard-container");
  dashboardContainer.innerHTML = text;
}

function displayGameInfo(dashboardLabel, activePlayers) {
  display("");

  const dashboardContainer = document.querySelector(".dashboard-container");

  const gameInfoContainer = document.createElement("div");

  const gameInfoLabel = document.createElement("div");
  gameInfoLabel.classList.add("game-info-label");
  gameInfoLabel.textContent = dashboardLabel;

  gameInfoContainer.appendChild(gameInfoLabel);

  dashboardContainer.appendChild(gameInfoContainer);

  const playersContainer = document.createElement("div");
  playersContainer.classList.add("players-container");

  activePlayers.forEach((player) => {
    const playerContainer = document.createElement("div");
    playerContainer.classList.add("player-container");

    const playerName = document.createElement("div");
    playerName.classList.add("player-name");
    playerName.textContent = `${player.name}`;

    const score = document.createElement("div");
    score.classList.add("score");
    score.id = `${player.name.toLowerCase()}-score`;
    score.textContent =
      dashboardLabel === "Numbers Selected"
        ? `${player.number}`
        : `${player.score}`;

    playerContainer.appendChild(playerName);
    playerContainer.appendChild(score);

    playersContainer.appendChild(playerContainer);
  });
  dashboardContainer.appendChild(playersContainer);
}

function displayRegalsNumber(activePlayers){
  const playerNumbers = activePlayers.map(player => player.number);
  const sum = playerNumbers.reduce((acc, num)=> acc + num, 0);
  const average = sum / playerNumbers.length; 
  const regalsNum = (average * 0.8).toFixed(2);

  display(`${average}   x   0.8   =   ${regalsNum}`);

  return regalsNum;

}

function enableNumbersBtn() {
  const numbers = document.querySelectorAll(".number");
  numbers.forEach((number) => {
    number.addEventListener("mouseover", () => {
      number.style.backgroundColor = "#00090f";
      number.style.color = "white";
      number.style.cursor = "pointer";
    });

    number.addEventListener("mouseout", () => {
      number.style.backgroundColor = "white";
      number.style.color = "black";
      number.style.cursor = "default";
    });
  });
}

function playRound(userNum) {
  var activePlayers = players.filter(
    (player) => player.score !== eliminationScore
  );

  var regalsNum;

  activePlayers.forEach((player) => {
    if (player.name === "USER") {
      player.number = userNum;
    } else {
      player.number = generateRandomNumber();
    }
  });

  disableNumbersBtn();

  display(userNum);

  setTimeout(() => {
    displayGameInfo("Numbers Selected", activePlayers);
    
    setTimeout(() => {

      regalsNum = displayRegalsNumber(activePlayers);

      console.log(regalsNum);
      
      // displayGameInfo("Scoreboard", activePlayers);
      

      
    }, 2000);

    // enableNumbersBtn();

  }, 2000);


}

function generateRandomNumber() {
  return Math.floor(Math.random() * 101);
}
