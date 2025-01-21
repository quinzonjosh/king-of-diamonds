let players = [
  { name: "USER", score: 0 },
  { name: "CPU1", score: 0 },
  { name: "CPU2", score: 0 },
  { name: "CPU3", score: 0 },
  { name: "CPU4", score: 0 },
];

let round = 1;
let eliminationScore = -5;

playGame();

function playGame() {
  while (players.length != 1) {
    console.log(`Round ${round}`);

    let choices = getPlayerChoices();
    // let choices = getCustomChoices();

    let regalsNumber = computeRegalsNumber(choices);

    displayPlayerChoices(choices);

    displayRegalsNumber(regalsNumber);

    if (!applySpecialRules(choices, regalsNumber)) {
      applyDefaultRules(choices, regalsNumber);
    }

    displayScores();

    eliminatePlayers();
    round++;
  }

  console.log("GAME OVER!");
  console.log(`${players[0].name} WINS!`);
}

function applyDefaultRules(choices, regalsNumber) {
  let winners = [];

  // case for all equal choices
  if (choices.every((number) => number === choices[0])) {
    players.forEach((player) => player.score--);
    return;
  }
  
  choices.forEach((number, index) => {
    if (number === Math.floor(regalsNumber)) {
      winners.push(index);
    }
  });

  // case for multiple winners
  if (winners.length > 0) {
    choices.forEach((number, index) => {
      if (!winners.includes(index)) {
        players[index].score--;
      }
    });
  } else {
    // case for only 1 winner
    let winnerIndex = -1;
    let smallestDiff = Infinity;

    choices.forEach((number, index) => {
      let difference = Math.abs(number - regalsNumber);
      if (difference < smallestDiff) {
        smallestDiff = difference;
        winnerIndex = index;
      }
    });

    choices.forEach((number, index) => {
      if (index !== winnerIndex) {
        players[index].score--;
      }
    });
  }
}

function applySpecialRules(choices, regalsNumber) {
  const activePlayers = players.filter(
    (player) => player.score > eliminationScore
  ).length;

  // if 4 players remain, apply rule:
  // if there are 2 people or more who chose the same number, the number
  // becomes invalid, meaning they will lose a point even if the num
  // is closes to the regal's number
  if (activePlayers <= 4) {
    // var to keep track of how many times a number was chosen
    let numberFrequency = {};

    choices.forEach(
      (number) => (numberFrequency[number] = (numberFrequency[number] || 0) + 1)
    );

    let duplicates = Object.keys(numberFrequency).filter(
      (number) => numberFrequency[number] > 1
    );

    if (duplicates.length > 0) {
      choices.forEach((number, index) => {
        if (duplicates.includes(String(number))) {
          players[index].score--;
          return true;
        }
      });
    }
  }

  // if 3 players remain, apply rule:
  // if there's a person that chooses the exact (rounded to whole number)
  // regal's num, the loser penalty is doubled.
  if (activePlayers <= 3) {
    if (
      choices.some((number) => Math.round(number) === Math.round(regalsNumber))
    ) {
      let minChoiceIndex = choices.indexOf(Math.min(...choices));
      players.forEach((_, index) =>
        index !== minChoiceIndex ? (players[index].score -= 2) : null
      );
      return true;
    }
  }

  // if 2 players remain, apply rule:
  // if someone chooses 0, the player who chooses 100 wins the round
  if (activePlayers <= 2) {
    if (choices.includes(0) && choices.includes(100)) {
      let losingIndex = choices.indexOf(0);
      players[losingIndex].score--;
      return true;
    }
  }

  return false;
}

function computeRegalsNumber(choices) {
  return (
    Math.round(
      (choices.reduce((acc, cur) => acc + cur, 0) / choices.length) * 0.8 * 100
    ) / 100.0
  );
}

function displayPlayerChoices(choices) {
  console.log("Player choices:");

  choices.forEach((choice, index) =>
    console.log(`${players[index].name}: ${choice}`)
  );
}

function displayRegalsNumber(regalsNumber) {
  console.log(`Regal's Number: ` + regalsNumber);
}

function displayScores() {
  console.log("Player scores:");

  players.forEach((player) => console.log(`${player.name}: ${player.score}`));
}

function eliminatePlayers() {
  players.forEach((player) => {
    if (player.score === eliminationScore) {
      console.log(`${player.name} Eliminated!`);
    }
  });

  players = players.filter((player) => player.score > eliminationScore);
}

function generateRandomChoices() {
  return Math.floor(Math.random() * 101);
}

function getCustomChoices() {
  // return [2, 4, 6, 8, 11];   // normal case
  // return [2,2,2,2,2];       // all equal num case
  // return [7,5,10,7,15]      // multiple winner case
  // return [2,4,6,8]          // 4 players no violation
  // return [12,2,4,2]         // 4 players w same num rule violation
  // return [3,55,2]           // 3 players no violation
  // return [62,1,23]          // 3 players w 1 hitting the regals num
  // return [8,24]            // 2 players no violation
  // return [0,100]           // 2 players w 0 100 rule violation
}

function getPlayerChoices() {
  return players.map((player, index) =>
    index == 0
      ? parseInt(prompt("Enter a number from 0 to 100: "))
      : generateRandomChoices()
  );
}
