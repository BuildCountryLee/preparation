// 《数据结构与算法Javascript描述》中的实现方式
function insertionSort(arr) {
  var temp, outer, inner;
  for(outer = 1; outer<arr.length; outer++){
    temp = arr[outer];
    inner = outer;
    while(inner > 0 && arr[inner - 1] > temp){
      arr[inner] = arr[inner - 1];
      inner--;
    }
    arr[inner] = temp;
  }
  return arr;
}

// 将内循环改写为for循环, 内循环就会多循环很多次
function insertionSort2(arr) {
  var outer, inner, temp;
  for(outer = 1;outer < arr.length; outer ++) {
    temp = arr[outer];
    for(inner = outer;inner > 0 && arr[inner - 1]>temp;inner --) {
      arr[inner] = arr[inner - 1];
    }
    arr[inner] = temp;
  }
  return arr;
}
