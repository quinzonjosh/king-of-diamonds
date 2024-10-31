function indexOfSmallestDiff(arr) {
    var lowestNumIndex = 0;
    for (let i = 1; i < arr.length; i++) {
      if (arr[i] < arr[lowestNumIndex]) lowestNumIndex = i;
    }
    return lowestNumIndex;
}

module.exports = indexOfSmallestDiff;
