"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tscore = tscore;
exports.ttest = ttest;

var _vector = require("../vector");

var _helpers = require("../core/helpers");

var studentt = _interopRequireWildcard(require("../distribution/studentt"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// 2 parameter lists
// (value, mean, sd, n)
// (value, array)
function tscore() {
  var args = Array.prototype.slice.call(arguments);
  return args.length === 4 ? (args[0] - args[1]) / (args[2] / Math.sqrt(args[3])) : (args[0] - (0, _vector.mean)(args[1])) / ((0, _vector.stdev)(args[1], true) / Math.sqrt(args[1].length));
} // 3 different paramter lists:
// (value, mean, sd, n, sides)
// (tscore, n, sides)
// (value, array, sides)


function ttest() {
  var args = Array.prototype.slice.call(arguments);
  var tscoreVal;

  if (args.length === 5) {
    tscoreVal = Math.abs(tscore(args[0], args[1], args[2], args[3]));
    return args[4] === 1 ? studentt.cdf(-tscoreVal, args[3] - 1) : studentt.cdf(-tscoreVal, args[3] - 1) * 2;
  }

  if ((0, _helpers.isNumber)(args[1])) {
    tscoreVal = Math.abs(args[0]);
    return args[2] === 1 ? studentt.cdf(-tscoreVal, args[1] - 1) : studentt.cdf(-tscoreVal, args[1] - 1) * 2;
  }

  tscoreVal = Math.abs(tscore(args[0], args[1]));
  return args[2] === 1 ? studentt.cdf(-tscoreVal, args[1].length - 1) : studentt.cdf(-tscoreVal, args[1].length - 1) * 2;
}