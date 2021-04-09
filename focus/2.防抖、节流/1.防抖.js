function debounce(func, wait, immediate) {
  let timeout;
  return function() {
    const context = this;
    const args = arguments;
    if(timeout) clearTimeout(timeout);
    if(immediate) {
      
      const callNow = !timeout;
      timeout = setTimeout(function() {
        timeout = null;
      }, wait);
      if(callNow) func.apply(context, args);
    }else {
      
      timeout = setTimeout(function(){
        func.apply(context, args);
      }, wait);
    }
    
  }
}

const fn = debounce(function() {}, 1000);

fn();
