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

  var numOfPlayers = players.filter(
    (player) => player.score !== eliminationScore
  ).length;

  const compChoices = generateRandomCompChoices(numOfPlayers);

  const playerNumbers = [parseInt(userNum), ...compChoices];

  const regalsNum = parseFloat(
    (
      (playerNumbers.reduce((sum, num) => sum + num, 0) / numOfPlayers) *
      0.8
    ).toFixed(2)
  );

  const playersToRegalsNumDiff = playerNumbers.map((player) =>
    parseFloat(Math.abs(regalsNum - player).toFixed(2))
  );
}

function generateRandomCompChoices(numOfPlayers) {
  return Array.from({ length: numOfPlayers - 1 }, () =>
    Math.floor(Math.random() * 101)
  );
}

function getUserInput() {
  let userNum = prompt("Select a number from 0 to 100");

  while (userNum < 0 || userNum > 100) {
    alert("Invalid input.");
    userNum = prompt("Select a number from 0 to 100");
  }

  return userNum;
}

playRound();
