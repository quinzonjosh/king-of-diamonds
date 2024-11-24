const indicesOfSmallestElements = require("./indexOfSmallestDiff");

// test("Case 1: ", () => {
//   expect(indexOfSmallestDiff([1, 2, 3, 0])).toBe(3);
// });

test("Case 2: ", () => {
  expect(indicesOfSmallestElements([5, 4, 3, 2, 1])).toEqual([4]); 
});

test("Case 3: ", () => {
  expect(indicesOfSmallestElements([10, 5, 30, 5, 15])).toEqual([1,3]); 
});

// test("Case 4: ", () => {
//   expect(indexOfSmallestDiff([-1, -2, -3, -4])).toBe(3); // Last negative number
// });

// test("Case 5: ", () => {
//   expect(indexOfSmallestDiff([1, 2, 1, 0])).toBe(3); // 0 is the smallest
// });

// test("Case 6: ", () => {
//   expect(indexOfSmallestDiff([2, 2, 2, 2, 2])).toBe(0); // All elements are the same
// });

// test("Case 7: ", () => {
//   expect(indexOfSmallestDiff([0, 0, 0, -1])).toBe(3); // -1 is the smallest
// });

// test("Case 8: ", () => {
//   expect(indexOfSmallestDiff([10, 20, 10, 30, 10])).toBe(0); // 10 is the smallest, first occurrence
// });

// test("Case 9: ", () => {
//   expect(indexOfSmallestDiff([1])).toBe(0); // Single element, should return 0
// });
