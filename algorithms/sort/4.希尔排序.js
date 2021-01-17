var gaps = [5, 3, 1];

function shellSort(arr) {
  for(var g = 0; g < gaps.length; g++) {
    for(var i = gaps[g]; i < arr.length; i++) {
      var temp = arr[i];
      for(var j = i; j >= gaps[g] && arr[j - gaps[g]] > temp; j -= gaps[g]) {
        arr[j] = arr[j - gaps[g]];
      }
      arr[j] = temp;
    }
  }
}

// 动态间隔序列希尔排序
function shellSort(arr) {
  var N = arr.length;
  var h = 1;
  while(h < N /3){
    h = h * 3 + 1;
  }
  while(h > 0) {

    for(var i = h; i < arr.length; i++) {
      var temp = arr[i];

      for(var j = i; j >= h && arr[j - h] > temp; j -= h) {
        arr[j] = arr[j - h];
      }

      arr[j] = temp;
    }

    h = (h - 1) / 3;
  }

  return arr;
}