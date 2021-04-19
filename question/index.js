var intervals = [[2,3],[5,5],[2,2],[3,4],[3,4]];

function merge(intervals) {
  var flag = false;
  var _intervals = intervals.map(interval => interval.map(item => item));

  for (var i = 0; i < intervals.length; i++) {
    var front = _intervals[i], last = _intervals[i + 1];

    if (last && !((front[1] < last[0]) || (front[0] > last[1]))) {
      _intervals[i] = [Math.min(front[0], last[0]), Math.max(front[1], last[1])];
      _intervals.splice(i + 1, 1);
      flag = true;
      i--;
    }
  }

  if (flag) {
    return merge(_intervals);
  }

  console.log(_intervals);
  return _intervals;
}

merge(intervals);

function range(num, min, max) {
  return Math.min(Math.max(num, min), max);
}
