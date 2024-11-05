document.addEventListener("DOMContentLoaded", () => {
  var players = [
    { name: "USER", score: 0 },
    { name: "CPU1", score: 0 },
    { name: "CPU2", score: 0 },
    { name: "CPU3", score: 0 },
    { name: "CPU4", score: 0 },
  ];
  
  /******************************************** MAIN **************************************/
  
  // displayNumbersSelected();
  // displayComputations();
  // displayCurrentScoreboard();
  // displayUpdatedScoreboard();

  displayScoreboard();
  // displayNumbersBoard();
  /****************************************************************************************/

  function playRound(userNum) {
    console.log(userNum);
  }

  // timeout template
  // setTimeout(() => {
  // }, 3000);

  function displayScoreboard(){
    const dashboardContainer = document.querySelector('.dashboard-container');

    const scoreboardContainer = document.createElement('div');
    scoreboardContainer.classList.add("scoreboard-container");

    players.forEach(player =>{
      const playersContainer = document.createElement('div');
      playersContainer.classList.add("player-container");

      const playerLabel = document.createElement('div');
      playerLabel.classList.add("player-label");
      playerLabel.textContent = player.name;

      const playerScore = document.createElement('div');
      playerScore.classList.add("player-score");
      playerScore.id = `${(player.name).toLowerCase()}-score`;

      playerScore.textContent = '0';

      playersContainer.appendChild(playerLabel);
      playersContainer.appendChild(playerScore);
    
      scoreboardContainer.appendChild(playersContainer);
    });

    dashboardContainer.appendChild(scoreboardContainer);
  }
});
