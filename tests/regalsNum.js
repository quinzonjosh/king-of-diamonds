function regalsNum(playerNumbers, numOfPlayers) {
  return parseFloat((
    (playerNumbers.reduce((sum, num) => sum + num, 0) / numOfPlayers) *
    0.8
  ).toFixed(2));
}

module.exports = regalsNum;
