// version 1.0
function curry(fn) {
  var args = [].slice.call(arguments, 1);
  return function () {
    var newArgs = args.concat([].slice.call(arguments));
    return fn.apply(this, newArgs);
  }
}

var add = function (a, b) {
  return a + b;
}

var addCurry = curry(add, 1, 2);
addCurry();

var addCurry = curry(add, 1);
addCurry(2);

var addCurry = curry(add);
addCurry(1, 2);

// version 2.0

/**
 * target
 * 
    var fn = curry(function(a, b, c) {
        return [a, b, c];
    });

    fn("a", "b", "c") // ["a", "b", "c"]
    fn("a", "b")("c") // ["a", "b", "c"]
    fn("a")("b")("c") // ["a", "b", "c"]
    fn("a")("b", "c") // ["a", "b", "c"]
 * 
*/

function curry(fn) {
  var len = fn.length;
  var slice = Array.prototype.slice;
  return function () {
    slice.call(arguments, )
  }


}

