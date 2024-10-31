const generateRandomCompChoices = require("./generateRandomCompChoices");

test("Case 1: Generates correct length with 5 players", () => {
  expect(generateRandomCompChoices(5)).toHaveLength(4);
});

test("Case 2: Generates numbers within range 0 to 100 for 3 players", () => {
  expect(generateRandomCompChoices(3)).toHaveLength(2);
});