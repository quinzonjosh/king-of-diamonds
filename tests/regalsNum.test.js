const regalsNum = require("./regalsNum");

test("Case 1: ", () => {
  expect(regalsNum([10,20,30,40,50], 5)).toBe(24)
});

test("Case 2: ", () => {
  expect(regalsNum([5, 10, 15, 20, 25], 5)).toBe(12);
});

test("Case 3: ", () => {
  expect(regalsNum([1, 2, 3, 4, 5], 5)).toBe(2.4);
});

test("Case 4: ", () => {
  expect(regalsNum([100, 200, 300, 400, 500], 5)).toBe(240);
});

test("Case 5: ", () => {
  expect(regalsNum([0, 0, 0, 0, 0], 5)).toBe(0);
});

test("Case 6: ", () => {
  expect(regalsNum([8, 16, 24, 32, 40], 5)).toBe(19.2);
});

test("Case 7: ", () => {
  expect(regalsNum([7, 14, 21, 28, 35], 5)).toBe(16.8);
});

test("Case 8: ", () => {
  expect(regalsNum([50, 60, 70, 80, 90], 5)).toBe(56);
});

test("Case 9: ", () => {
  expect(regalsNum([2, 4, 6, 8, 10], 5)).toBe(4.8);
});

test("Case 10: ", () => {
  expect(regalsNum([12, 24, 36, 48, 60], 5)).toBe(28.8);
});


