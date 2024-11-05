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

  function displayNumbersBoard() {
    const numbersBoard = document.createElement("div");

    numbersBoard.classList.add("numbers-board-container");

    for (let i = 0; i < 19; i++) {
      const emptyCell = document.createElement("div");

      numbersBoard.appendChild(emptyCell);
    }

    for (let i = 0; i <= 100; i++) {
      const numberCell = document.createElement("div");

      numberCell.classList.add("number");
      numberCell.id = `btn${i}`;

      numberCell.textContent = `${i}`;
      numberCell.value = i;

      numberCell.addEventListener("click", () => playRound(numberCell.value));

      numbersBoard.appendChild(numberCell);
    }

    const body = document.querySelector("body");

    body.appendChild(numbersBoard);
  }

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

    // console.log(scoreboardContainer);

    dashboardContainer.appendChild(scoreboardContainer);
  }
});
