"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.normalci = normalci;
exports.tci = tci;
exports.significant = significant;
exports.oneSidedDifferenceOfProportions = oneSidedDifferenceOfProportions;
exports.twoSidedDifferenceOfProportions = twoSidedDifferenceOfProportions;

var normal = _interopRequireWildcard(require("../distribution/normal"));

var studentt = _interopRequireWildcard(require("../distribution/studentt"));

var _zStatistics = require("./zStatistics");

var _vector = require("../vector");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// 2 different parameter setups
// (value, alpha, sd, n)
// (value, alpha, array)
function normalci() {
  var args = Array.prototype.slice.call(arguments),
      ans = new Array(2);
  var change;

  if (args.length === 4) {
    change = Math.abs(normal.inv(args[1] / 2, 0, 1) * args[2] / Math.sqrt(args[3]));
  } else {
    change = Math.abs(normal.inv(args[1] / 2, 0, 1) * (0, _vector.stdev)(args[2]) / Math.sqrt(args[2].length));
  }

  ans[0] = args[0] - change;
  ans[1] = args[0] + change;
  return ans;
} // 2 different parameter setups
// (value, alpha, sd, n)
// (value, alpha, array)


function tci() {
  var args = Array.prototype.slice.call(arguments),
      ans = new Array(2);
  var change;

  if (args.length === 4) {
    change = Math.abs(studentt.inv(args[1] / 2, args[3] - 1) * args[2] / Math.sqrt(args[3]));
  } else {
    change = Math.abs(studentt.inv(args[1] / 2, args[2].length - 1) * (0, _vector.stdev)(args[2], true) / Math.sqrt(args[2].length));
  }

  ans[0] = args[0] - change;
  ans[1] = args[0] + change;
  return ans;
}

function significant(pvalue, alpha) {
  return pvalue < alpha;
}

function differenceOfProportions(p1, n1, p2, n2) {
  if (p1 > 1 || p2 > 1 || p1 <= 0 || p2 <= 0) {
    throw new Error("Proportions should be greater than 0 and less than 1");
  }

  var pooled = (p1 * n1 + p2 * n2) / (n1 + n2);
  var se = Math.sqrt(pooled * (1 - pooled) * (1 / n1 + 1 / n2));
  return (p1 - p2) / se;
}

function oneSidedDifferenceOfProportions(p1, n1, p2, n2) {
  var z = differenceOfProportions(p1, n1, p2, n2);
  return (0, _zStatistics.ztest)(z, 1);
}

function twoSidedDifferenceOfProportions(p1, n1, p2, n2) {
  var z = differenceOfProportions(p1, n1, p2, n2);
  return (0, _zStatistics.ztest)(z, 2);
}