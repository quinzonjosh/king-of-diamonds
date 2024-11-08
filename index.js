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

function deductPoints(arr) {
  players
    .filter((_, index) => arr.includes(index))
    .forEach((player) => player.score--);
}


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

function displayRegalsNumber(playerNumbers){
  const sum = playerNumbers.reduce((acc, num)=> acc + num, 0);
  const average = sum / playerNumbers.length; 
  const regalsNum = (average * 0.8).toFixed(2);

  // display(`${average}   x   0.8   =   ${regalsNum}`);

  const regalsNumContainer = document.createElement("div");
  regalsNumContainer.textContent = `${average}   x   0.8   =   ${regalsNum}`;
  regalsNumContainer.classList.add("regals-number-container");

  const dashboardContainer = document.querySelector(".dashboard-container");
  dashboardContainer.appendChild(regalsNumContainer);

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

    number.addEventListener('click', ()=>{
      playRound(parseInt(number.textContent));
    });
  });
}

function evaluateRound(playerNumbers, playersToRegalsNumDiff, regalsNum) {
  const winnerIndex = indexOfSmallestDiff(playersToRegalsNumDiff);

  var losingIndices = playersToRegalsNumDiff
    .map((_, index) => index)
    .filter((index) => index != winnerIndex);

  // if (playerNumbers.length <= 4 && hasMatchingNumPenalty(playerNumbers)) {
  //   return;
  // }

  // if (
  //   playerNumbers.length <= 3 &&
  //   playerHasHitRegalsNum(playerNumbers, winnerIndex, regalsNum)
  // ) {
  //   deductPoints(losingIndices);
  //   deductPoints(losingIndices);
  //   return;
  // }

  // if (playerNumbers.length <= 2 && roundIsZeroOneHundredCase(playerNumbers)) {
  //   return;
  // }

  // if (allPlayerNumsEqual(playerNumbers)) {
  //   return;
  // }

  // setTimeout(() => {    
    // display(`${players[winnerIndex].name} WINS!`);
  // }, 3000);

  deductPoints(losingIndices);

  return winnerIndex;
}

function indexOfSmallestDiff(arr) {
  var lowestNumIndex = 0;
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < arr[lowestNumIndex]) lowestNumIndex = i;
  }
  return lowestNumIndex;
}

function playRound(userNum) {
  var activePlayers = players.filter(
    (player) => player.score !== eliminationScore
  );

  var regalsNum, playersToRegalsNumDiff, winnerIndex;

  activePlayers.forEach((player) => {
    if (player.name === "USER") {
      player.number = userNum;
    } else {
      player.number = generateRandomNumber();
    }
  });

  const playerNumbers = activePlayers.map(player => player.number);

  disableNumbersBtn();

  display(userNum);

  setTimeout(() => {
    displayGameInfo("Numbers Selected", activePlayers);
    
    setTimeout(() => {

      regalsNum = displayRegalsNumber(playerNumbers);

      playersToRegalsNumDiff = playerNumbers.map((player) =>
        parseFloat(Math.abs(regalsNum - player).toFixed(2))
      );

      winnerIndex = evaluateRound(playerNumbers, playersToRegalsNumDiff, regalsNum);
      console.log(playerNumbers)
      console.log(regalsNum)
      console.log(playersToRegalsNumDiff)
      console.log(winnerIndex)

      // displayGameInfo("Scoreboard", activePlayers);

      // displayGameInfo("Scoreboard", activePlayers);
      
      // enableNumbersBtn();

      
    }, 6000);


  }, 2000);


}

function generateRandomNumber() {
  return Math.floor(Math.random() * 101);
}
