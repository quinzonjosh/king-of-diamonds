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
  // const compChoices = generateFixedCompChoices(activePlayers.length);

  const playerNumbers =
    players[0].name === "USER"
      ? [parseInt(userNum), ...compChoices]
      : [...compChoices];

  const regalsNum = computeRegalsNum(playerNumbers, playerNumbers.length);

  const playersToRegalsNumDiff = playerNumbers.map((player) =>
    parseFloat(Math.abs(regalsNum - player).toFixed(2))
  );

  evaluateRound(playerNumbers, playersToRegalsNumDiff);

  displayResults(playerNumbers, regalsNum, playersToRegalsNumDiff, players);

  eliminatePlayers();
}

function evaluateRound(playerNumbers, playersToRegalsNumDiff) {
  if (playerNumbers.length <= 2) {
  }

  if (playerNumbers.length <= 3) {
  }

  if (playerNumbers.length <= 4 && hasMatchingNumPenalty(playerNumbers)) {
    return;
  }

  if (allPlayerNumsEqual(playerNumbers)) {
    return;
  }

  const winnerIndex = indexOfSmallestDiff(playersToRegalsNumDiff);

  console.log(`${players[winnerIndex].name} WINS`);

  var losingIndices = playersToRegalsNumDiff
    .map((_, index) => index)
    .filter((index) => index != winnerIndex);

  deductPoints(losingIndices);

  return;
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
    console.log("DUPLICATES SPOTTED");
    return true;
  } else {
    return false;
  }
}

function allPlayerNumsEqual(playerNumbers) {
  const val = playerNumbers[0];

  for (const num of playerNumbers) {
    if (num !== val) {
      return false;
    }
  }

  deductPoints(Array.from({ length: playerNumbers.length }, (_, i) => i));
  console.log("ALL PLAYER NUMS EQUAL");
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

  switch (players.length) {
    case 4:
      console.log("NEW RULE ADDED: ");
      console.log(
        "If there are 2 people or more choose the same number, the number they " + 
        "choose becomes invalid and the players who chose the same number will "+ 
        "lose a point even if the number is closest to Regal's number."
      );
      break;
    case 3:
      break;
    case 2:
      break;
  }
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
