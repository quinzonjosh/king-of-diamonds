// TO DO: add prompts of displaying new rules after eliminations

let players = [
  { name: "USER", score: 0 },
  { name: "CPU1", score: 0 },
  { name: "CPU2", score: 0 },
  { name: "CPU3", score: 0 },
  { name: "CPU4", score: 0 },
];

let eliminationScore = -3;

let quickDisplayTime = 3000;
let defaultDisplayTime = 6000;
let longDisplayTime = 9000;

const ruleStack = [
  "If a player chooses 0, the player who chooses 100 wins the round.",
  "If a player exactly hits the rounded off Regal's number, the loser penalty is doubled",
  "If there are 2 people or more choose the same number, the number they choose becomes invalid " +
    "and the players who chose the same number will lose a point even if the number is closest to " +
    "Regal's number.",
];

document.addEventListener("DOMContentLoaded", () => {
  const toggleAudio = document.querySelector("#toggle-audio");
  const backgroundMusic = document.querySelector("#background-music");

  let audioMuted = true;

  toggleAudio.addEventListener("click", () => {
    audioMuted = !audioMuted;

    if (audioMuted) {
      toggleAudio.src = "public/images/mute-icon.png";
      backgroundMusic.pause();
    } else {
      toggleAudio.src = "public/images/unmute-icon.png";
      backgroundMusic.play();
    }
  });
});

async function playRound(number) {
  disableNumbersBtn();

  let choices = [number, ...generateRandomCPUChoices()];
  // let choices = [...getCustomChoices()];

  let regalsNumber = computeRegalsNumber(choices);

  let data = [choices, regalsNumber];

  // display number selected
  await display("simpleText", String(number), quickDisplayTime);

  // display number selections
  await display("numberSelection", data, defaultDisplayTime);

  // display round winner
  await display("simpleText", data, quickDisplayTime);

  // display scoreboard
  await display("scoreboard", data, defaultDisplayTime);

  await eliminatePlayers(data);

  if (
    players.length === 1 ||
    !players.some((player) => player.name.includes("USER"))
  ) {
    disableNumbersBtn();

    display("endGame", "GAME OVER!", 0);
  } else {
    // display default text
    await display("simpleText", "Select a Number", 0);

    enableNumbersBtn();
  }
}

function disableNumbersBtn() {
  document.querySelectorAll(".number").forEach((button) => {
    button.onclick = null;
    button.classList.add("no-hover");
  });
}

function enableNumbersBtn() {
  document.querySelectorAll(".number").forEach((button) => {
    button.onclick = () => playRound(parseInt(button.textContent));
    button.classList.remove("no-hover");
  });
}

function computeRegalsNumber(choices) {
  return (
    Math.round(
      (choices.reduce((acc, cur) => acc + cur, 0) / choices.length) * 0.8 * 100
    ) / 100.0
  );
}

function createEndGameContent() {
  const endGameLabel = document.createElement("div");
  endGameLabel.innerHTML = "GAME OVER!";

  const winnerContainer = document.createElement("div");

  if (!players.some((player) => player.name.includes("USER"))) {
    winnerContainer.innerHTML = `YOU LOSE!`;
  } else {
    winnerContainer.innerHTML = `${players[0].name} WINS!`;
  }

  const endGameContainer = document.createElement("div");
  endGameContainer.appendChild(endGameLabel);
  endGameContainer.appendChild(winnerContainer);

  return endGameContainer;
}

function createSimpleTextContent(data) {
  const textContainer = document.createElement("div");
  if (typeof data === "string") {
    textContainer.textContent = data;
  } else if (typeof data === "object") {
    textContainer.textContent = evaluateRound(data);
  }
  return textContainer;
}

function createNumberSelectionContent(data) {
  const numbersSelectedContainer = document.createElement("div");
  const numbersSelectedLabel = document.createElement("div");
  numbersSelectedLabel.classList.add("dashboard-label");
  numbersSelectedLabel.textContent = "Numbers Selected";
  numbersSelectedContainer.appendChild(numbersSelectedLabel);

  const playersContainer = document.createElement("div");
  playersContainer.classList.add("players-container");

  players.forEach((player, index) => {
    if (player.score > eliminationScore) {
      const playerContainer = document.createElement("div");
      playerContainer.classList.add("player-container");

      const playerName = document.createElement("div");
      playerName.classList.add("player-name");
      playerName.textContent = `${player.name}`;

      const number = document.createElement("div");
      number.textContent = data[0][index];

      playerContainer.appendChild(playerName);
      playerContainer.appendChild(number);

      playersContainer.appendChild(playerContainer);
    }
  });

  const regalsNumberContainer = document.createElement("div");
  const regalsNumberLabel = document.createElement("div");
  regalsNumberLabel.classList.add("regals-number-font");
  regalsNumberLabel.textContent = "Regal's Number";

  const regalsNumberValue = document.createElement("div");
  regalsNumberValue.textContent = data[1];
  regalsNumberValue.classList.add("regals-number-font");

  regalsNumberContainer.appendChild(regalsNumberLabel);
  regalsNumberContainer.appendChild(regalsNumberValue);

  const numberSelectionContainer = document.createElement("div");
  numberSelectionContainer.classList.add("dashboard-multi-line-container");
  numberSelectionContainer.appendChild(numbersSelectedContainer);
  numberSelectionContainer.appendChild(playersContainer);
  numberSelectionContainer.appendChild(regalsNumberContainer);

  return numberSelectionContainer;
}

function createScoreboardContent() {
  const scoreboardContainer = document.createElement("div");
  const scoreboardLabel = document.createElement("div");
  scoreboardLabel.classList.add("dashboard-label");
  scoreboardLabel.textContent = "Scoreboard";
  scoreboardContainer.appendChild(scoreboardLabel);

  const playersContainer = document.createElement("div");
  playersContainer.classList.add("players-container");

  players.forEach((player, index) => {
    const playerContainer = document.createElement("div");
    playerContainer.classList.add("player-container");

    const playerName = document.createElement("div");
    playerName.classList.add("player-name");
    playerName.textContent = `${player.name}`;

    const score = document.createElement("div");
    score.textContent = player.score;

    playerContainer.appendChild(playerName);
    playerContainer.appendChild(score);

    playersContainer.appendChild(playerContainer);
  });

  const parentContainer = document.createElement("div");
  parentContainer.classList.add("dashboard-multi-line-container");
  parentContainer.appendChild(scoreboardContainer);
  parentContainer.appendChild(playersContainer);

  return parentContainer;
}

function display(formatType, data, duration) {
  return new Promise((res) => {
    const dashboardContainer = document.querySelector(".dashboard-container");
    dashboardContainer.textContent = "";

    let content;

    if (formatType === "simpleText") {
      content = createSimpleTextContent(data);
    } else if (formatType === "numberSelection") {
      content = createNumberSelectionContent(data);
    } else if (formatType === "scoreboard") {
      content = createScoreboardContent();
    } else if (formatType === "endGame") {
      content = createEndGameContent();
    }

    dashboardContainer.appendChild(content);

    setTimeout(res, duration);
  });
}

function displayNewRule() {
  disableNumbersBtn();

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

  const popupModal = document.querySelector(".popup-modal");
  popupModal.style.visibility = "visible";
}

async function eliminatePlayers(data) {
  let numOfEliminatedPlayers = 0;

  for (let player of players) {
    if (player.score === eliminationScore) {
      numOfEliminatedPlayers++;
      await display("simpleText", `${player.name} eliminated!`, 2000);
    }
  }

  players = players.filter((player) => player.score > eliminationScore);
  
  for (let i = 0; i < numOfEliminatedPlayers; i++) {
    if(players.length >= 2){
      displayNewRule();
  
      await new Promise((resolve) => {
        const closeModalBtn = document.querySelector("#close-modal-btn");
        closeModalBtn.addEventListener("click", resolve);
      });
    }
  }

}

function evaluateRound(data) {
  let choices = data[0];
  let regalsNumber = data[1];
  let winners = [];
  let smallestDiff = Infinity;

  /******************************** SPECIAL RULES **************************/
  // if 4 players remain, apply rule:
  // if there are 2 people or more who chose the same number, the number
  // becomes invalid, meaning they will lose a point even if the num
  // is closes to the regal's number
  if (players.length <= 4) {
    let numberFrequency = {};

    choices.forEach(
      (number) => (numberFrequency[number] = (numberFrequency[number] || 0) + 1)
    );

    let duplicates = Object.keys(numberFrequency).filter(
      (number) => numberFrequency[number] > 1
    );

    if (duplicates.length > 0) {
      choices.forEach((number, index) => {
        if (duplicates.includes(String(number))) {
          players[index].score--;
        }
      });
      return `Some players have chosen the same number!`;
    }
  }

  // if 3 players remain, apply rule:
  // if there's a person that chooses the exact (rounded to whole number)
  // regal's num, the loser penalty is doubled.
  if (players.length <= 3) {
    if (
      choices.some((number) => Math.round(number) === Math.round(regalsNumber))
    ) {
      let minChoiceIndex = choices.indexOf(Math.min(...choices));
      players.forEach((_, index) =>
        index !== minChoiceIndex ? (players[index].score -= 2) : null
      );
      return `${players[minChoiceIndex].name} has hit the Regal's Number!`;
    }
  }

  // if 2 players remain, apply rule:
  // if someone chooses 0, the player who chooses 100 wins the round
  if (players.length <= 2) {
    if (choices.includes(0) && choices.includes(100)) {
      let losingIndex = choices.indexOf(0);
      players[losingIndex].score--;
      return `100 beats 0! ${players[choices.indexOf(100)].name} wins.`;
    }
  }

  /******************************** DEFAULT RULES **************************/
  // CASE: IF ALL PLAYERS CHOSE THE SAME NUM
  if (choices.every((number) => number === choices[0])) {
    players.forEach((player) => player.score--);
    return `All Players Lose the Round!`;
  }

  // CASE: DEFAULT RULE (ONLY 1 WINS BECAUSE THEY HAVE ALL DIFF NUMS)
  choices.forEach((number, index) => {
    let difference = Math.abs(number - regalsNumber);
    if (difference < smallestDiff) {
      smallestDiff = difference;
      winners = [index];
    } else if (difference === smallestDiff) {
      winners.push(index);
    }
  });

  // DEDUCT POINTS
  choices.forEach((number, index) => {
    if (!winners.includes(index)) {
      players[index].score--;
    }
  });

  let winnerNames = winners.map((index) => players[index].name).join(", ");
  return `${winnerNames} WINS!`;
}

function generateRandomCPUChoices() {
  return Array.from({ length: players.length - 1 }, () =>
    Math.floor(Math.random() * 101)
  );
}

function getCustomChoices() {
  // return [2, 4, 6, 8, 11];   // normal case
  // return [2, 2, 2, 2, 2]; // all equal num case
  // return [7,5,10,7,15]      // multiple winner case
  // return [2,4,6,8]          // 4 players no violation
  // return [12,2,4,2]         // 4 players w same num rule violation
  // return [3,55,2]           // 3 players no violation
  // return [62, 1, 23]; // 3 players w 1 hitting the regals num
  // return [8,24]            // 2 players no violation
  // return [0,100]           // 2 players w 0 100 rule violation
  // return [44,22,22,72,11];
  // return [27,27,27,5,90]
  // return [30, 30, 30, 30, 5];
}

function hidePopupModal() {
  const popupModal = document.querySelector(".popup-modal");
  popupModal.style.visibility = "hidden";

  enableNumbersBtn();
}
