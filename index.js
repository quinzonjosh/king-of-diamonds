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

document.addEventListener('DOMContentLoaded', ()=>{
  dashboardPrompter("Select a number")
});

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

function dashboardPrompter(text){
  const dashboardContainer = document.querySelector(".dashboard-container");
  
  const content = document.createElement("div");
  content.classList.add("prompt");
  content.id = "select-num-label";
  content.textContent = text;

  dashboardContainer.appendChild(content);
  
}

function playRound(userNum) {
  const dashboardContainer = document.querySelector(".dashboard-container");
  const selectNumLabel = document.querySelector("#select-num-label");

  dashboardContainer.removeChild(selectNumLabel);

  var activePlayers = players.filter(
    (player) => player.score !== eliminationScore
  );

  const compChoices = generateRandomCompChoices(activePlayers.length);

  const playerNumbers = players[0].name === "USER" ? [parseInt(userNum), ...compChoices] : [...compChoices];

}

function generateRandomCompChoices(numOfPlayers) {
  return Array.from(
    { length: players[0].name === "USER" ? numOfPlayers - 1 : numOfPlayers },
    () => Math.floor(Math.random() * 101)
  );
} 
