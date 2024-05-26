Array.prototype.pipeMaligno = function (...fns) {
  return fns.reduce((acc, fn) => fn(acc), this);
};

Array.prototype.removeDuplicates = function () {
  return this.filter((i, ndx, slf) => slf.indexOf(i) === ndx);
};
