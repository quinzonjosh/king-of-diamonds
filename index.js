var players = [
  { name: "USER", score: 0 },
  { name: "CPU1", score: 0 },
  { name: "CPU2", score: 0 },
  { name: "CPU3", score: 0 },
  { name: "CPU4", score: 0 },
];

document.addEventListener("DOMContentLoaded", () => {
  /******************************************** MAIN **************************************/
  // displayNumbersSelected();
  // displayComputations();
  // displayCurrentScoreboard();
  // displayUpdatedScoreboard();
  displayScoreboard();
  /****************************************************************************************/
  // timeout template
  // setTimeout(() => {
  // }, 3000);
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

  players.forEach(player=>{
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

function playRound(userNum) {
  console.log(userNum);
}
