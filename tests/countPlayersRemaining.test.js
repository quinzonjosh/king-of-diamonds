const countPlayersRemaining = require("./countPlayersRemaining");

const eliminationScore = -10;

test("Case 1: ", () => {
  expect(
    countPlayersRemaining(
      [
        { name: "USER", score: 0 },
        { name: "CPU1", score: 0 },
        { name: "CPU2", score: 0 },
        { name: "CPU3", score: 0 },
        { name: "CPU4", score: 0 },
      ],
      eliminationScore
    )
  ).toBe(5);
});

test("Case 1: ", () => {
  expect(
    countPlayersRemaining(
      [
        { name: "USER", score: -10 },
        { name: "CPU1", score: -10 },
        { name: "CPU2", score: -10 },
        { name: "CPU3", score: -10 },
        { name: "CPU4", score: -10 },
      ],
      eliminationScore
    )
  ).toBe(0);
});

test("Case 1: ", () => {
  expect(
    countPlayersRemaining(
      [
        { name: "USER", score: -10 },
        { name: "CPU1", score: 0 },
        { name: "CPU2", score: -10 },
        { name: "CPU3", score: 0 },
        { name: "CPU4", score: -10 },
      ],
      eliminationScore
    )
  ).toBe(2);
});
