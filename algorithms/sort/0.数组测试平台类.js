function randomArrayGenerator(len, duration){
  const {min, max} = duration;
  let res = [];

  for(let i = 0;i<len;i++){
    res.push(getRandomInt(min, max));
  }

  return res;
}

/*
  获取min到max的随机整数

  target: [min, max]
  known:  Math.random() => [0, 1)
  solution:
    Math.random()*(max - min) => [0, max - min)
    Math.random()*(max - min + 1) => [0, max - min + 1)
    Math.floor(Math.random()*(max - min + 1)) => [0, max - min]
    Math.floor(Math.random()*(max - min + 1)) + min => [min, max]

*/
function getRandomInt(min, max){
  return Math.floor(Math.random()*(max - min + 1)) + min;
}

function CArray(numElements){
  this.dataStore = [];
  this.pos = 0;
  this.numElements = numElements;
  this.insert = insert;
  this.toString = toString;
  this.clear = clear;
  this.setData = setData;
  this.swap = swap;

  for(var i = 0;i<numElements;i++){
    this.dataStore[i] = i;
  }
}

function insert() {}

function toString() {}

function clear() {}

function setData() {
  for(var i = 0;i<this.numElements;i++){
    this.dataStore[i] = Math.floor(Math.random()*this.numElements + 1);
  }
}

function swap() {}
