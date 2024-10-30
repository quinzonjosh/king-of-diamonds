const players = [
  { name: "USER", score: 0 },
  { name: "CPU1", score: 0 },
  { name: "CPU2", score: 0 },
  { name: "CPU3", score: 0 },
  { name: "CPU4", score: 0 },
];

function playRound() {
  var userNum = prompt("Select a number from 0 to 100");
  var numOfPlayers = players.filter((player) => player.score !== -10).length;

  while (userNum < 0 || userNum > 100) {
    alert("Invalid input.");
    userNum = prompt("Select a number from 0 to 100");
  }

  const compChoices = Array.from({ length: 4 }, () =>
    Math.floor(Math.random() * 101)
  );

  const playerNumbers = [parseInt(userNum), ...compChoices];

  const regalsNum =
    playerNumbers.reduce((sum, num) => sum + num, 0) / numOfPlayers;

  const playersToRegalsNumDiff = playerNumbers.map((player) =>
    Math.abs(regalsNum - player).toFixed(2)
  );

  const winnerIndex = indexOfSmallest(playersToRegalsNumDiff);
  players
    .filter((player, index) => index !== winnerIndex)
    .forEach((player) => {
      player.score--;
    });

    console.log("--------------------------------------------------------");
  console.log("STATS: ");
  console.log("Players choices: " + playerNumbers);
  console.log("Regal's Number: " + regalsNum);
  console.log(
    "Players difference to Regal's number: " + playersToRegalsNumDiff
  );
  console.log("Winner index: " + winnerIndex);
  console.log("--------------------------------------------------------");
  console.log("SCOREBOARD: ");
  players.forEach((player) => {
    console.log(`${player.name}: ${player.score}`);
  });
}

function indexOfSmallest(arr) {
  var lowestNumIndex = 0;
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < arr[lowestNumIndex]) lowestNumIndex = i;
  }
  return lowestNumIndex;
}

playRound();