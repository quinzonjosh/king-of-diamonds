function indicesOfSmallestElements(arr) {
  let smallest = arr[0];
  const smallestIndices = [0];

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < smallest) {
      smallest = arr[i];
      smallestIndices.length = 0; 
      smallestIndices.push(i);
    } else if (arr[i] === smallest) {
      smallestIndices.push(i);
    }
  }

  return smallestIndices;
}

module.exports = indicesOfSmallestElements;
