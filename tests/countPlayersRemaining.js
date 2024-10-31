function countPlayersRemaining(players, eliminationScore) {
  return players.filter((player) => player.score !== eliminationScore).length;
}

module.exports = countPlayersRemaining;
