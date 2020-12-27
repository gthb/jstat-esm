// For quick reference.
const concat = Array.prototype.concat;
const slice = Array.prototype.slice;
const toString = Object.prototype.toString;

// Calculate correction for IEEE error
// TODO: This calculation can be improved.
export function calcRdx(n, m) {
  var val = n > m ? n : m;
  return Math.pow(10,
    17 - ~~(Math.log(((val > 0) ? val : -val)) * Math.LOG10E));
}

export const isArray = Array.isArray || function isArray(arg) {
  return toString.call(arg) === '[object Array]';
};

export function isFunction(arg) {
  return toString.call(arg) === '[object Function]';
}

export function isNumber(num) {
  return (typeof num === 'number') ? num - num === 0 : false;
}

// Converts the jStat matrix to vector.
export function toVector(arr) {
  return concat.apply([], arr);
}
