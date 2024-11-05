document.addEventListener("DOMContentLoaded", () => {
  /******************************************** MAIN **************************************/
  displayNumbersBoard();
  /****************************************************************************************/

  function playRound(userNum) {
    console.log(userNum);
  }

  // timeout template
  // setTimeout(() => {
  // }, 3000);

  function displayNumbersBoard() {
    const numbersBoard = document.createElement("div");

    numbersBoard.classList.add(".numbers-board-container");

    numbersBoard.style.backgroundColor = "#527569";
    numbersBoard.style.width = "1000px";
    numbersBoard.style.display = "grid";
    numbersBoard.style.gridTemplateColumns = "repeat(20, 1fr)";
    numbersBoard.style.gridTemplateRows = "repeat(5, 1fr)";
    numbersBoard.style.border = "1px solid black";
    numbersBoard.style.gap = "2px";
    numbersBoard.style.padding = "2px";

    for (let i = 0; i < 19; i++) {
      const emptyCell = document.createElement("div");

      numbersBoard.appendChild(emptyCell);
    }

    for (let i = 0; i <= 100; i++) {
      const numberCell = document.createElement("div");

      numberCell.classList.add(".number");
      numberCell.classList.add(`#btn${i}`);

      numberCell.style.height = "50px";
      numberCell.style.border = "50px";
      numberCell.style.backgroundColor = "white";
      numberCell.style.display = "flex";
      numberCell.style.alignItems = "center";
      numberCell.style.justifyContent = "center";
      numberCell.style.fontSize = "24px";
      numberCell.style.color = "black";
      numberCell.style.border = "1px solid black";

      numberCell.textContent = `${i}`;
      numberCell.value = i;

      numberCell.addEventListener("mouseover", () => {
        numberCell.style.backgroundColor = "#00090f";
        numberCell.style.color = "white";
        numberCell.style.cursor = "pointer";
      });

      numberCell.addEventListener("mouseout", () => {
        numberCell.style.backgroundColor = "white";
        numberCell.style.color = "black";
        numberCell.style.cursor = "pointer";
      });

      numberCell.addEventListener("click", () => playRound(numberCell.value));

      numbersBoard.appendChild(numberCell);
    }

    const body = document.querySelector("body");

    body.appendChild(numbersBoard);
  }
});
