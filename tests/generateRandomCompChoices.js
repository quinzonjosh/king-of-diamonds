function generateRandomCompChoices(numOfPlayers) {
  return Array.from({ length: numOfPlayers - 1 }, () => {
    Math.floor(Math.random() * 101);
  });
}

module.exports = generateRandomCompChoices;
