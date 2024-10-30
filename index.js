var players = [
  { name: "USER", score: 0 },
  { name: "CPU1", score: 0 },
  { name: "CPU2", score: 0 },
  { name: "CPU3", score: 0 },
  { name: "CPU4", score: 0 },
];

const eliminationScore = -10;

function playRound() {

  var userNum = (players[0].name === "USER") ? getUserInput() : -1;

  var numOfPlayers = countPlayersRemaining();

  const compChoices = generateCompChoices(numOfPlayers);

  const playerNumbers = [parseInt(userNum), ...compChoices];

  /********************** DEFAULT RULE **********************/
  const regalsNum =
    playerNumbers.reduce((sum, num) => sum + num, 0) / numOfPlayers;

  const playersToRegalsNumDiff = playerNumbers.map((player) =>
    Math.abs(regalsNum - player).toFixed(2)
  );

  const winnerIndex = indexOfSmallestDiff(playersToRegalsNumDiff);
  var losingIndices = playersToRegalsNumDiff
    .map((_, index) => index)
    .filter((index) => index != winnerIndex);

  deductPoints(losingIndices);

  /********************************************************/

  var eliminatedPlayers = players.filter((player) => player.score === -10);
  eliminatedPlayers.forEach((player) =>
    console.log(`${player.name} eliminated!`)
  );

  if (eliminatedPlayers.length != 0) {
    players = players.filter((player) => player.score !== -10);
  }

  displayResults(
    playerNumbers,
    regalsNum,
    playersToRegalsNumDiff,
    winnerIndex,
    players
  );
}

function deductPoints(arr) {
  players
    .filter((_, index) => arr.includes(index))
    .forEach((player) => player.score--);
}

function generateCompChoices(numOfPlayers) {
  return Array.from({ length: numOfPlayers - 1 }, () =>
    Math.floor(Math.random() * 101)
  );
}

function countPlayersRemaining() {
  return players.filter((player) => player.score !== eliminationScore).length;
}

function getUserInput() {
  let userNum = prompt("Select a number from 0 to 100");

  while (userNum < 0 || userNum > 100) {
    alert("Invalid input.");
    userNum = prompt("Select a number from 0 to 100");
  }

  return userNum;
}

function displayResults(
  playerNumbers,
  regalsNum,
  playersToRegalsNumDiff,
  winnerIndex,
  players
) {
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

function indexOfSmallestDiff(arr) {
  var lowestNumIndex = 0;
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < arr[lowestNumIndex]) lowestNumIndex = i;
  }
  return lowestNumIndex;
}

while (players.length > 1) {
  playRound();
}

console.log(
  players.length === 1 ? `${players[0].name} WINS!!!` : "NOBODY WINS!!!"
);
