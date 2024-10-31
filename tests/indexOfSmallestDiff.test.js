const indexOfSmallestDiff = require("./indexOfSmallestDiff");

test("Case 1: ", () => {
  expect(indexOfSmallestDiff([1, 2, 3, 0])).toBe(3);
});

test("Case 2: ", () => {
  expect(indexOfSmallestDiff([5, 4, 3, 2, 1])).toBe(4); // Last element is the smallest
});

test("Case 3: ", () => {
  expect(indexOfSmallestDiff([10, 20, 30, 5, 15])).toBe(3); // 5 is the smallest
});

test("Case 4: ", () => {
  expect(indexOfSmallestDiff([-1, -2, -3, -4])).toBe(3); // Last negative number
});

test("Case 5: ", () => {
  expect(indexOfSmallestDiff([1, 2, 1, 0])).toBe(3); // 0 is the smallest
});

test("Case 6: ", () => {
  expect(indexOfSmallestDiff([2, 2, 2, 2, 2])).toBe(0); // All elements are the same
});

test("Case 7: ", () => {
  expect(indexOfSmallestDiff([0, 0, 0, -1])).toBe(3); // -1 is the smallest
});

test("Case 8: ", () => {
  expect(indexOfSmallestDiff([10, 20, 10, 30, 10])).toBe(0); // 10 is the smallest, first occurrence
});

test("Case 9: ", () => {
  expect(indexOfSmallestDiff([1])).toBe(0); // Single element, should return 0
});
