// 《数据结构与算法Javascript描述》中的实现方式
function bubbleSort(arr) {
  for(var i = arr.length;i >= 2;i--) {
    for(var j = 0;j < i - 1;j++) {
      if(arr[j] > arr[j+1]){
        swap(arr, j, j+1);
      }
    }
  }
  return arr;
}

function swap(arr, x, y) {
  var temp = arr[x];
  arr[x] = arr[y];
  arr[y] = temp;
}
