const playersToRegalsNumDiff = require("./playersToRegalsNumDiff");

test("Case 1: ", () => {
  expect(playersToRegalsNumDiff([10, 20, 30, 40, 50], 24)).toStrictEqual([14.0, 4.0, 6.0, 16.0, 26.0]);
});

test("Case 2: ", () => {
  expect(playersToRegalsNumDiff([1, 2, 3, 4, 5], 3)).toStrictEqual([2.0, 1.0, 0.0, 1.0, 2.0]);
});

test("Case 3: ", () => {
  expect(playersToRegalsNumDiff([100, 200, 300, 400, 500], 240)).toStrictEqual([140.0, 40.0, 60.0, 160.0, 260.0]);
});

test("Case 4: ", () => {
  expect(playersToRegalsNumDiff([0, 0, 0, 0, 0], 5)).toStrictEqual([5.0, 5.0, 5.0, 5.0, 5.0]);
});

test("Case 5: ", () => {
  expect(playersToRegalsNumDiff([10, 20, 30, 40, 50], 50)).toStrictEqual([40.0, 30.0, 20.0, 10.0, 0.0]);
});

test("Case 6: ", () => {
  expect(playersToRegalsNumDiff([8, 16, 24, 32, 40], 24)).toStrictEqual([16.0, 8.0, 0.0, 8.0, 16.0]);
});

test("Case 7: ", () => {
  expect(playersToRegalsNumDiff([5, 10, 15, 20, 25], 10)).toStrictEqual([5.0, 0.0, 5.0, 10.0, 15.0]);
});

test("Case 8: ", () => {
  expect(playersToRegalsNumDiff([12, 24, 36, 48, 60], 30)).toStrictEqual([18.0, 6.0, 6.0, 18.0, 30.0]);
});

test("Case 9: ", () => {
  expect(playersToRegalsNumDiff([50, 60, 70, 80, 90], 65)).toStrictEqual([15.0, 5.0, 5.0, 15.0, 25.0]);
});

test("Case 10: ", () => {
  expect(playersToRegalsNumDiff([2, 4, 6, 8, 10], 5)).toStrictEqual([3.0, 1.0, 1.0, 3.0, 5.0]);
});
