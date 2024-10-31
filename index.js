var players = [
  { name: "USER", score: 0 },
  { name: "CPU1", score: 0 },
  { name: "CPU2", score: 0 },
  { name: "CPU3", score: 0 },
  { name: "CPU4", score: 0 },
];

const eliminationScore = -5;

function playRound() {
  const userNum = players[0].name === "USER" ? getUserInput() : -1;

  var activePlayers = players.filter(
    (player) => player.score !== eliminationScore
  );

  const compChoices = generateRandomCompChoices(activePlayers.length);
  // const compChoices = generateFixedCompChoices();

  const playerNumbers =
    players[0].name === "USER"
      ? [parseInt(userNum), ...compChoices]
      : [...compChoices];

  const regalsNum = computeRegalsNum(playerNumbers, activePlayers.length);

  const playersToRegalsNumDiff = playerNumbers.map((player) =>
    parseFloat(Math.abs(regalsNum - player).toFixed(2))
  );

  if(allPlayerNumsEqual(playerNumbers)){
    const losingIndices = Array.from({ length: activePlayers.length }, (_, index) => index);
    deductPoints(losingIndices);
  } else{
    evaluateRound(playersToRegalsNumDiff);
  }

  displayResults(playerNumbers, regalsNum, playersToRegalsNumDiff, players);

  eliminatePlayers();
}

function allPlayerNumsEqual(playerNumbers){
  const val = playerNumbers[0]

  for(const num of playerNumbers){
    if(num !== val){
      return false;
    }
  }
  return true;
}

function computeRegalsNum(playerNumbers, activePlayers) {
  return parseFloat(
    (
      (playerNumbers.reduce((sum, num) => sum + num, 0) / activePlayers) *
      0.8
    ).toFixed(2)
  );
}

function deductPoints(arr) {
  players
    .filter((_, index) => arr.includes(index))
    .forEach((player) => player.score--);
}

function displayResults(
  playerNumbers,
  regalsNum,
  playersToRegalsNumDiff,
  players
) {
  console.log("--------------------------------------------------------");
  console.log("STATS: ");
  console.log("Players choices: " + playerNumbers);
  console.log("Regal's Number: " + regalsNum);
  console.log(
    "Players difference to Regal's number: " + playersToRegalsNumDiff
  );
  console.log("SCOREBOARD: ");
  players.forEach((player) => {
    console.log(`${player.name}: ${player.score}`);
  });
}

function eliminatePlayers() {
  var eliminatedPlayers = players.filter(
    (player) => player.score === eliminationScore
  );
  eliminatedPlayers.forEach((player) =>
    console.log(`${player.name} eliminated!`)
  );

  if (eliminatedPlayers.length != 0) {
    players = players.filter((player) => player.score !== eliminationScore);
  }
}

function evaluateRound(playersToRegalsNumDiff) {
  const winnerIndex = indexOfSmallestDiff(playersToRegalsNumDiff);

  console.log(`${players[winnerIndex].name} WINS`)

  var losingIndices = playersToRegalsNumDiff
    .map((_, index) => index)
    .filter((index) => index != winnerIndex);

  deductPoints(losingIndices);
}

function generateRandomCompChoices(numOfPlayers) {
  return Array.from(
    { length: players[0].name === "USER" ? numOfPlayers - 1 : numOfPlayers },
    () => Math.floor(Math.random() * 101)
  );
}

function generateFixedCompChoices(numOfPlayers) {
  return [10, 10, 10, 10];
}

function getUserInput() {
  let userNum = prompt("Select a number from 0 to 100");

  while (userNum < 0 || userNum > 100) {
    alert("Invalid input.");
    userNum = prompt("Select a number from 0 to 100");
  }

  return userNum;
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
