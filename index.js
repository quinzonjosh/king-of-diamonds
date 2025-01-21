// last stop: fix case: 2 players remaining and the game is about to end

document.addEventListener("DOMContentLoaded", () => {
  let players = [
    { name: "USER", score: 0 },
    { name: "CPU1", score: 0 },
    { name: "CPU2", score: 0 },
    { name: "CPU3", score: 0 },
    { name: "CPU4", score: 0 },
  ];

  let eliminationScore = -3;

  document.querySelectorAll(".number").forEach((button) => {
    button.onclick = () => playRound(parseInt(button.textContent));
  });

  async function playRound(number) {
    disableNumbersBtn();

    let choices = [number, ...generateRandomCPUChoices()];
    // let choices = [...getCustomChoices()];

    let regalsNumber = computeRegalsNumber(choices);

    let data = [choices, regalsNumber];

    // display number selected
    await display("simpleText", String(number), 2000);

    // display number selections
    await display("numberSelection", data, 2000);

    // display round winner
    await display("simpleText", data, 2000);

    // display scoreboard
    await display("scoreboard", data, 5000);

    await eliminatePlayers(data);

    if (players.length === 1) {
      disableNumbersBtn();

      display("endGame", "GAME OVER!", 0);
    } else {
      // display default text
      await display("simpleText", "Select a Number", 0);

      enableNumbersBtn();
    }
  }

  function computeRegalsNumber(choices) {
    return (
      Math.round(
        (choices.reduce((acc, cur) => acc + cur, 0) / choices.length) *
          0.8 *
          100
      ) / 100.0
    );
  }

  function createEndGameContent() {
    const endGameLabel = document.createElement("div");
    endGameLabel.innerHTML = "GAME OVER!";

    const winnerContainer = document.createElement("div");
    winnerContainer.innerHTML = `${players[0].name} WINS!`;

    const endGameContainer = document.createElement("div");
    endGameContainer.appendChild(endGameLabel);
    endGameContainer.appendChild(winnerContainer);

    return endGameContainer;
  }

  function createSimpleTextContent(data) {
    const textContainer = document.createElement("div");
    if (typeof data === "string") {
      textContainer.textContent = data;
    } else if (typeof data === "object") {
      let choices = data[0];
      let regalsNumber = data[1];

      if (choices.every((number) => number === choices[0])) {
        players.forEach((player) => player.score--);
        textContainer.textContent = `All Players Lose the Round!`;
      } else {
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

        textContainer.textContent = `${players[winnerIndex].name} WINS!`;
      }
    }
    return textContainer;
  }

  function createNumberSelectionContent(data) {
    const numbersSelectedContainer = document.createElement("div");
    const numbersSelectedLabel = document.createElement("div");
    numbersSelectedLabel.classList.add("dashboard-label");
    numbersSelectedLabel.textContent = "Numbers Selected";
    numbersSelectedContainer.appendChild(numbersSelectedLabel);

    const playersContainer = document.createElement("div");
    playersContainer.classList.add("players-container");

    players.forEach((player, index) => {
      if (player.score > eliminationScore) {
        const playerContainer = document.createElement("div");
        playerContainer.classList.add("player-container");

        const playerName = document.createElement("div");
        playerName.classList.add("player-name");
        playerName.textContent = `${player.name}`;

        const number = document.createElement("div");
        number.textContent = data[0][index];

        playerContainer.appendChild(playerName);
        playerContainer.appendChild(number);

        playersContainer.appendChild(playerContainer);
      }
    });

    const regalsNumberContainer = document.createElement("div");
    const regalsNumberLabel = document.createElement("div");
    regalsNumberLabel.classList.add("regals-number-font");
    regalsNumberLabel.textContent = "Regal's Number";

    const regalsNumberValue = document.createElement("div");
    regalsNumberValue.textContent = data[1];
    regalsNumberValue.classList.add("regals-number-font");

    regalsNumberContainer.appendChild(regalsNumberLabel);
    regalsNumberContainer.appendChild(regalsNumberValue);

    const numberSelectionContainer = document.createElement("div");
    numberSelectionContainer.classList.add("dashboard-multi-line-container");
    numberSelectionContainer.appendChild(numbersSelectedContainer);
    numberSelectionContainer.appendChild(playersContainer);
    numberSelectionContainer.appendChild(regalsNumberContainer);

    return numberSelectionContainer;
  }

  function createScoreboardContent() {
    const scoreboardContainer = document.createElement("div");
    const scoreboardLabel = document.createElement("div");
    scoreboardLabel.classList.add("dashboard-label");
    scoreboardLabel.textContent = "Scoreboard";
    scoreboardContainer.appendChild(scoreboardLabel);

    const playersContainer = document.createElement("div");
    playersContainer.classList.add("players-container");

    players.forEach((player, index) => {
      const playerContainer = document.createElement("div");
      playerContainer.classList.add("player-container");

      const playerName = document.createElement("div");
      playerName.classList.add("player-name");
      playerName.textContent = `${player.name}`;

      const score = document.createElement("div");
      score.textContent = player.score;

      playerContainer.appendChild(playerName);
      playerContainer.appendChild(score);

      playersContainer.appendChild(playerContainer);
    });

    const parentContainer = document.createElement("div");
    parentContainer.classList.add("dashboard-multi-line-container");
    parentContainer.appendChild(scoreboardContainer);
    parentContainer.appendChild(playersContainer);

    return parentContainer;
  }

  function disableNumbersBtn() {
    const numbers = document.querySelectorAll(".number");
    numbers.forEach((number) => {
      number.onclick = null;
      number.style.cursor = "default";
      number.addEventListener("mouseover", () => {
        number.style.backgroundColor = "white";
        number.style.color = "black";
        number.style.cursor = "default";
      });
    });
  }

  function enableNumbersBtn() {
    const numbers = document.querySelectorAll(".number");

    numbers.forEach((number) => {
      number.addEventListener("mouseover", () => {
        number.style.backgroundColor = "#00090f";
        number.style.color = "white";
        number.style.cursor = "pointer";
      });

      number.addEventListener("mouseout", () => {
        number.style.backgroundColor = "white";
        number.style.color = "black";
        number.style.cursor = "default";
      });

      number.onclick = () => playRound(parseInt(number.textContent));
    });
  }

  function display(formatType, data, duration) {
    return new Promise((res) => {
      const dashboardContainer = document.querySelector(".dashboard-container");
      dashboardContainer.textContent = "";

      let content;

      if (formatType === "simpleText") {
        content = createSimpleTextContent(data);
      } else if (formatType === "numberSelection") {
        content = createNumberSelectionContent(data);
      } else if (formatType === "scoreboard") {
        content = createScoreboardContent();
      } else if (formatType === "endGame") {
        content = createEndGameContent();
      }

      dashboardContainer.appendChild(content);

      setTimeout(res, duration);
    });
  }

  async function eliminatePlayers(data) {
    for (let player of players) {
      if (player.score === eliminationScore) {
        await display("simpleText", `${player.name} eliminated!`, 2000);
      }
    }

    players = players.filter((player) => player.score > eliminationScore);
  }

  function getCustomChoices() {
    // return [2, 4, 6, 8, 11];   // normal case
    return [2, 2, 2, 2, 2]; // all equal num case
    // return [7,5,10,7,15]      // multiple winner case
    // return [2,4,6,8]          // 4 players no violation
    // return [12,2,4,2]         // 4 players w same num rule violation
    // return [3,55,2]           // 3 players no violation
    // return [62,1,23]          // 3 players w 1 hitting the regals num
    // return [8,24]            // 2 players no violation
    // return [0,100]           // 2 players w 0 100 rule violation
  }

  function generateRandomCPUChoices() {
    return Array.from({ length: players.length - 1 }, () =>
      Math.floor(Math.random() * 101)
    );
  }
});
