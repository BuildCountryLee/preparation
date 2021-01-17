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

function swap(arr, x, y) {
  var temp = arr[x];
  arr[x] = arr[y];
  arr[y] = temp;
}
