// 《数据结构与算法Javascript描述》中的实现方式
function selectionSort(arr) {
  for(var i = 0;i<arr.length - 1;i++) {
    for(var j = i + 1;j<arr.length;j++) {
      if(arr[i] > arr[j]) {
        swap(arr, i, j);
      }
    }
  }
  return arr;
}