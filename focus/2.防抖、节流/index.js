// 防抖函数
function debounce(func, wait) {
  let timeout;
  return function() {
    const context = this;
    const args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(function() {
      func.apply(context, args);
    }, wait);
  }
}

// immediate
function debounce(func, wait, immediate) {
  let timeout;
  return function() {
    const context = this;
    const args = arguments;
    if(timeout) clearTimeout(timeout);
    if(immediate){
      const callNow = !timeout;
      timeout = setTimeout(function() {
        timeout = null;
      }, wait);
      if(callNow) func.apply(context, args);
    }else {
      timeout = setTimeout(function() {
        func.apply(context, args);
      }, wait);
    }
  }
}

// return
function debounce(func, wait, immediate) {
  let timeout, result;
  return function() {
    const context = this;
    const args = arguments;
    if(timeout) clearTimeout(timeout);
    if(immediate) {
      const callNow = !timeout;
      timeout = setTimeout(function() {
        timeout = null;
      }, wait);
      if(callNow) result = func.apply(context, args);
    }else {
      timeout = setTimeout(function() {
      func.apply(context, args);
      }, wait);
    }
  }
}
