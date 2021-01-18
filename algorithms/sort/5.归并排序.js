function mergeSort(arr) {

  var step = 1;
  var left, right;

  while(step < arr.length){
    left = 0;
    right = left + step;
    if(right + step <= arr.length){
      mergeArray(arr, left, left + step, right, right + step);
      left = right + step;
      right = left + step;
    }
    if(right < arr.length) {
      mergeArray(arr, left, left + step, right, arr.length);
    }
    
    step *= 2;
  }
}

function mergeArray(arr, startLeft, stopLeft, startRight, stopRight){
  var left = new Array(stopLeft - startLeft + 1);
  var right = new Array(stopRight - startRight + 1);

  k = startLeft;
  for(var i = 0;i < left.length - 1;i++) {
    left[i] = arr[k];
    k++;
  }

  k = startRight;
  for(var i = 0;i < right.length - 1; i++) {
    right[i] = arr[k];
    k++;
  }

  left[left.length - 1] = Infinity;
  right[right.length - 1] = Infinity;

  var m = 0;
  var n = 0;
  for(var i = startLeft; i < stopRight;i++) {
    if(left[m] < right[n]){
      arr[i] = left[m];
      m++;
    }else {
      arr[i] = right[n];
      n++;
    }
  }
}
