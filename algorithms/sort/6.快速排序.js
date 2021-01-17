function randomArrayGenerator(len, duration){
  const {min, max} = duration;
  let res = [];

  for(let i = 0;i<len;i++){
    res.push(Math.floor(Math.random()*(max - min + 1)) + min);
  }

  return res;
}

function quickSort(arr) {

  if(arr.length <= 1) {
    return arr;
  }

  let pivot = arr[0];

  let left = [], right = [];

  for(let i = 1; i < arr.length;i++) {
    arr[i] < pivot ? left.push(arr[i]) : right.push(arr[i]);
  }
  
  return quickSort(left).concat(pivot, quickSort(right));
}

let randomArr = randomArrayGenerator(10, {min:0, max: 100});

console.log(randomArr);

console.log(quickSort(randomArr));
