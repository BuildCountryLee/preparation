
function swap(arr, i, j) {
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

function generateRandomArray(len = 20, min = 0, max = 100) {
  let res = [];

  for(let i = 0; i < len; i++) {
    res.push(getRandomInt(min, max));
  };

  return res;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random()*(max - min + 1)) + min;
}

module.exports = {
  swap,
  generateRandomArray,
}