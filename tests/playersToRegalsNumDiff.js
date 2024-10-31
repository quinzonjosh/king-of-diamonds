function playersToRegalsNumDiff(playerNumbers, regalsNum) {
  return playerNumbers.map((player) => parseFloat(Math.abs(regalsNum - player).toFixed(2)));
}

module.exports = playersToRegalsNumDiff;
