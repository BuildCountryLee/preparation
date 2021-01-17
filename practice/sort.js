// const randomArray = require('./randomArray');
const {generateRandomArray, swap} = require('./utils');

let randomArray = generateRandomArray();

console.log('🍎原数组：', randomArray);

/*-----------------------1.冒泡排序-----------------------------*/

function bubbleSort(arr) {
  for(var i = arr.length;i >=2;i--) {
    for(var j = 0;j < i - 1;j++) {
      if(arr[j] > arr[j+1]){
        swap(arr, j, j+1);
      }
    }
  }
  return arr;
}

/*----------------------2.选择排序------------------------------*/

function selectionSort(arr) {
  for(var i = 0;i<arr.length;i++) {
    for(var j = i; j< arr.length;j++) {
      if(arr[i] > arr[j]) {
        swap(arr, i, j);
      }
    }
  }
  return arr;
}

/*-----------------------3.插入排序-----------------------------*/
// for & while
function insertionSort(arr) {
  let outer, inner, temp;
  for(outer = 1; outer < arr.length;outer++){
    temp = arr[outer];
    inner = outer;
    while(inner > 0 && arr[inner - 1] > temp) {
      arr[inner] = arr[inner - 1];
      inner --;
    }
    arr[inner] = temp;
  }
  return arr;
}

function insertionSort2(arr) {
  let outer, inner, temp;
  for(outer = 1;outer<arr.length;outer ++) {
    temp = arr[outer];
    for(inner = outer; inner > 0 && arr[inner - 1] > temp;inner -- ){
      arr[inner] = arr[inner - 1];
    }
    arr[inner] = temp;
  }
  return arr;
}

/*-------------------------4.希尔排序---------------------------*/

function shellSort(arr) {
  let gaps = [5, 3, 1];

  for(let g = 0;g < gaps.length;g++){
    for(let i = gaps[g];i < arr.length;i++){
      for(let j = i; j >= gaps[g] && arr[j-gaps[g]] > arr[j];j -= gaps[g]) {
        swap(arr, j, j - gaps[g]);
      }
    }
  }

  return arr;
}

function shellSort2(arr) {
  let N = arr.length;
  let h = 1;
  while(h < N) {
    h = h * 3 + 1;
  }

  while(h > 0) {
    for(var i = h;i<N;i++){
      for(var j = i;j >= h && arr[j - h] > arr[j]; j -= h) {
        swap(arr, j, j-h);
      }
    }
    h = (h - 1)/3;
  }

  return arr;

}


/*------------------------5.归并排序----------------------------*/
/*------------------------6.快速排序----------------------------*/
function quickSort(arr) {
  if(arr.length === 0) {
    return [];
  }

  let pivot = arr[0];
  let left = [], right = [];
  for(var i = 1; i < arr.length; i++){
    if(arr[i]<pivot){
      left.push(arr[i]);
    }else {
      right.push(arr[i]);
    }
  }

  return quickSort(left).concat(pivot, quickSort(right));
}



// console.log('🍌结果：', bubbleSort(randomArray));
// console.log('🍌结果：', selectionSort(randomArray));
// console.log('🍌结果：', insertionSort2(randomArray));
// console.log('🍌结果：', shellSort2(randomArray));
console.log('🍌结果：', quickSort(randomArray));
