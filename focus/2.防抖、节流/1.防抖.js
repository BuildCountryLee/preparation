// function debounce(fn, wait) {
//   let timeout;
//   return function () {
//     const context = this;
//     const args = arguments;
//     clearTimeout(timeout);
//     timeout = setTimeout(function () {
//       fn.apply(context, args);
//     }, wait);
//   }
// }

function debounce(func, wait, immediate) {
  let timeout;
  return function () {
    const context = this;
    const args = arguments;
    if(immediate) {
      if(timeout) clearTimeout(timeout);
      const callNow = !timeout;
    }else {
      clearTimeout(timeout);
      timeout = setTimeout(function() {
        func.apply(context, args);
      }, wait);
    }
  }
}

function debounce(fn, wait) {
  let timeout;
  return function() {
    const context = this;
    const args = arguments;
    timeout = setTimeout(function(){

    }, wait);
  }
}

const fn = debounce(function() {}, 1000, true);
