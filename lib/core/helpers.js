"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calcRdx = calcRdx;
exports.isFunction = isFunction;
exports.isNumber = isNumber;
exports.toVector = toVector;
exports.isArray = void 0;
// For quick reference.
var concat = Array.prototype.concat;
var slice = Array.prototype.slice;
var toString = Object.prototype.toString; // Calculate correction for IEEE error
// TODO: This calculation can be improved.

function calcRdx(n, m) {
  var val = n > m ? n : m;
  return Math.pow(10, 17 - ~~(Math.log(val > 0 ? val : -val) * Math.LOG10E));
}

var isArray = Array.isArray || function isArray(arg) {
  return toString.call(arg) === '[object Array]';
};

exports.isArray = isArray;

function isFunction(arg) {
  return toString.call(arg) === '[object Function]';
}

function isNumber(num) {
  return typeof num === 'number' ? num - num === 0 : false;
} // Converts the jStat matrix to vector.


function toVector(arr) {
  return concat.apply([], arr);
}