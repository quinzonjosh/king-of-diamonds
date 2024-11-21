var players = [
  { name: "USER", number: -1, score: 0 },
  { name: "CPU1", number: -1, score: 0 },
  { name: "CPU2", number: -1, score: 0 },
  { name: "CPU3", number: -1, score: 0 },
  { name: "CPU4", number: -1, score: 0 },
];

const ruleStack = [
  "If a player chooses 0, the player who chooses 100 wins the round.",
  "If a player exactly hits the rounded off Regal's number, the loser penalty is doubled",
  "If there are 2 people or more choose the same number, the number they choose becomes invalid " +
    "and the players who chose the same number will lose a point even if the number is closest to " +
    "Regal's number.",
];

const eliminationScore = -5;

function allPlayerNumsEqual(playerNumbers) {
  const val = playerNumbers[0];

  for (const num of playerNumbers) {
    if (num !== val) {
      return false;
    }
  }

  return true;
}

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
    number.addEventListener("mouseover", () => {
      number.style.backgroundColor = "white";
      number.style.color = "black";
      number.style.cursor = "default";
    });
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

function displayNewRule() {
  const popupLabel = document.querySelector(".popup-label");
  popupLabel.textContent = "New Rule Added";

  const newRuleContent = document.createElement("div");
  newRuleContent.classList.add("instructions-content");
  newRuleContent.style.textAlign = "center";
  newRuleContent.textContent = ruleStack.pop();

  const popupBody = document.querySelector(".popup-body");
  popupBody.replaceChildren();
  popupBody.appendChild(newRuleContent);

  const closeModalBtn = document.querySelector("#close-modal-btn");
  closeModalBtn.textContent = "Okay";

  disableNumbersBtn();

  const popupModal = document.querySelector(".popup-modal");
  popupModal.style.visibility = "visible";
}

function displayRegalsNumber(playerNumbers) {
  const sum = playerNumbers.reduce((acc, num) => acc + num, 0);
  const average = sum / playerNumbers.length;
  const regalsNum = (average * 0.8).toFixed(2);

  // display(`${average}   x   0.8   =   ${regalsNum}`);

  const regalsNumContainer = document.createElement("div");
  regalsNumContainer.textContent = `${average.toFixed(
    2
  )}   x   0.8   =   ${regalsNum}`;
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

    number.setAttribute(
      "onclick",
      `playRound(${parseInt(number.textContent)})`
    );
  });

  // console.log(number.textContent);
}

function evaluateRound(playerNumbers, playersToRegalsNumDiff, regalsNum) {
  const winnerIndex = indexOfSmallestDiff(playersToRegalsNumDiff);

  var losingIndices = playersToRegalsNumDiff
    .map((_, index) => index)
    .filter((index) => index != winnerIndex);

  if (playerNumbers.length <= 4 && hasMatchingNumPenalty(playerNumbers)) {
    return -1;
  }

  if (
    playerNumbers.length <= 3 &&
    playerHasHitRegalsNum(playerNumbers, winnerIndex, regalsNum)
  ) {
    deductPoints(losingIndices);
    deductPoints(losingIndices);
    return winnerIndex;
  }

  if (playerNumbers.length <= 2 && roundIsZeroOneHundredCase(playerNumbers)) {
    return playerNumbers[0] == 0 ? 1 : 0;
  }

  if (allPlayerNumsEqual(playerNumbers)) {
    // waitAndDisplay("All player numbers are equal. All players lose a point", null, 6000);
    deductPoints(Array.from({ length: playerNumbers.length }, (_, i) => i));
    return -1;
  }

  deductPoints(losingIndices);

  return winnerIndex;
}

function generateRandomNumber() {
  return Math.floor(Math.random() * 101);
}

function hasMatchingNumPenalty(playerNumbers) {
  const seen = {};
  const indicesWithMatches = [];

  for (let i = 0; i < playerNumbers.length; i++) {
    const num = playerNumbers[i];
    if (seen[num] !== undefined) {
      indicesWithMatches.push(seen[num], i);
    } else {
      seen[num] = i;
    }
  }

  if (indicesWithMatches.length !== 0) {
    deductPoints(indicesWithMatches);
    return true;
  } else {
    return false;
  }
}

function hidePopupModal() {
  const popupModal = document.querySelector(".popup-modal");
  popupModal.style.visibility = "hidden";

  enableNumbersBtn();
}

function indexOfSmallestDiff(arr) {
  var lowestNumIndex = 0;
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < arr[lowestNumIndex]) lowestNumIndex = i;
  }
  return lowestNumIndex;
}

function playerHasHitRegalsNum(playerNumbers, winnerIndex, regalsNum) {
  if (playerNumbers[winnerIndex] == Math.round(regalsNum)) {
    // console.log(`${players[winnerIndex].name} HAS HIT THE REGAL'S NUMBER!`);
    return true;
  } else return false;
}

function playRound(userNum) {
  var regalsNum, playersToRegalsNumDiff, winnerIndex;
  players.forEach((player) => {
    if (player.name === "USER") {
      player.number = userNum;
    } else {
      player.number = generateRandomNumber();

      // test case for allPlayerNumsEqual()
      // player.number = 10;

      // test case for hasMatchingNumPenalty()
      // player.number = player.name === "CPU1" || player.name === "CPU2" ? generateRandomNumber() : 10;

      // testcase for playerHasHitRegalsNum()
      // switch (player.name) {
      //   case "CPU1":
      //     player.number = 11;
      //     break;
      //   case "CPU2":
      //     player.number = 22;
      //     break;
      // }

      // test case for roundIsZeroOneHundredCase()
      // player.number = 0;
    }
  });

  const playerNumbers = players.map((player) => player.number);

  disableNumbersBtn();
  display(userNum);

  (async function runRound() {
    await waitAndDisplay("Numbers Selected", players, 4000);

    regalsNum = displayRegalsNumber(playerNumbers);

    playersToRegalsNumDiff = playerNumbers.map((player) =>
      parseFloat(Math.abs(regalsNum - player).toFixed(2))
    );

    winnerIndex = evaluateRound(
      playerNumbers,
      playersToRegalsNumDiff,
      regalsNum
    );

    if (winnerIndex !== -1) {
      await waitAndDisplay(`${players[winnerIndex].name} WINS!`, null, 1500);
    }

    await waitAndDisplay("Scoreboard", players, 4000);

    const originalNumOfPlayers = players.length;
    players = players.filter((player) => player.score !== eliminationScore);
    const numOfEliminatedPlayers = originalNumOfPlayers - players.length;

    if (numOfEliminatedPlayers >= 1 && players.length > 1) {
      for (let i = 0; i < numOfEliminatedPlayers; i++) {
        // 3 seconds to display scoreboard before displaying the
        // 1st newly added rule.
        await new Promise((resolve) => setTimeout(resolve, i == 0 ? 3000 : 0));
        displayNewRule();

        await new Promise((resolve) => {
          const closeModalBtn = document.querySelector("#close-modal-btn");
          closeModalBtn.addEventListener("click", resolve);
        });
      }
    }

    const user = players.find((player) => player.name === "USER");
    if (players.length <= 1 || user.score == eliminationScore) {
      await waitAndDisplay("GAME OVER", players, 4000);
      disableNumbersBtn();
    } else {
      await waitAndDisplay("Select a number", players, 3000);
      enableNumbersBtn();
    }
  })();
}

function roundIsZeroOneHundredCase(playerNumbers) {
  if (playerNumbers[0] == 0 && playerNumbers[1] == 100) {
    deductPoints([0]);
    return true;
  } else if (playerNumbers[0] == 100 && playerNumbers[1] == 0) {
    deductPoints([1]);
    return true;
  }
  return false;
}

function waitAndDisplay(message, data, delay) {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (message === "Scoreboard" || message === "Numbers Selected") {
        displayGameInfo(message, data);
      } else {
        display(message);
      }
      resolve();
    }, delay);
  });
}
