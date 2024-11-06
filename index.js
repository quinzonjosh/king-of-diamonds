var players = [
  { name: "USER", score: 0 },
  { name: "CPU1", score: 0 },
  { name: "CPU2", score: 0 },
  { name: "CPU3", score: 0 },
  { name: "CPU4", score: 0 },
];

const eliminationScore = -10;

/******************************************** MAIN **************************************/
// displayNumbersSelected();
// displayComputations();
// displayCurrentScoreboard();
// displayUpdatedScoreboard();
// displayScoreboard();
/****************************************************************************************/
// timeout template
// setTimeout(() => {
// }, 3000);

function displayScoreboard() {
  const dashboardContainer = document.querySelector(".dashboard-container");

  const scoreboardContainer = document.createElement("div");
  scoreboardContainer.classList.add("scoreboard-container");

  const scoreboardLabel = document.createElement("div");
  scoreboardLabel.classList.add("scoreboard-label");
  scoreboardLabel.textContent = "SCOREBOARD";

  scoreboardContainer.appendChild(scoreboardLabel);

  dashboardContainer.appendChild(scoreboardContainer);

  const playersContainer = document.createElement("div");
  playersContainer.classList.add("players-container");

  players.forEach((player) => {
    const playerContainer = document.createElement("div");
    playerContainer.classList.add("player-container");

    const playerName = document.createElement("div");
    playerName.classList.add("player-name");
    playerName.textContent = `${player.name}`;

    const score = document.createElement("div");
    score.classList.add("score");
    score.id = `${player.name.toLowerCase()}-score`;
    score.textContent = `${player.score}`;

    playerContainer.appendChild(playerName);
    playerContainer.appendChild(score);

    playersContainer.appendChild(playerContainer);
  });

  dashboardContainer.appendChild(playersContainer);
}

function dashboardPrompter(text) {
  const dashboardContainer = document.querySelector(".dashboard-container");
  const prompt = document.querySelector(".prompt");

  dashboardContainer.removeChild(prompt);

  const content = document.createElement("div");
  content.classList.add("prompt");
  content.textContent = text;

  dashboardContainer.appendChild(content);
}

function disableNumbersBtn() {
  const numbers = document.querySelectorAll(".number");
  numbers.forEach((number) => {
    number.removeAttribute("onclick");
    number.style.cursor = 'default';
  });
}

function enableNumbersBtn() {
  const numbers = document.querySelectorAll(".number");
  numbers.forEach((number) => {
    number.addEventListener('mouseover', ()=>{
      number.style.backgroundColor = "#00090f";
      number.style.color = "white";
      number.style.cursor = "pointer";      
    });

    number.addEventListener('mouseout', ()=>{
      number.style.backgroundColor = "white";
      number.style.color = "black";
      number.style.cursor = "default";      
    });
  });
}

function playRound(userNum) {
  disableNumbersBtn();

  dashboardPrompter(userNum);

  var activePlayers = players.filter(
    (player) => player.score !== eliminationScore
  );

  const compChoices = generateRandomCompChoices(activePlayers.length);

  const playerNumbers =
    players[0].name === "USER"
      ? [parseInt(userNum), ...compChoices]
      : [...compChoices];

  // enableNumbersBtn();
}

function generateRandomCompChoices(numOfPlayers) {
  return Array.from(
    { length: players[0].name === "USER" ? numOfPlayers - 1 : numOfPlayers },
    () => Math.floor(Math.random() * 101)
  );
}
