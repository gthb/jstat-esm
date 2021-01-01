"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.qscore = qscore;
exports.qtest = qtest;
exports.tukeyhsd = tukeyhsd;

var _vector = require("../vector");

var _helpers = require("../core/helpers");

var tukey = _interopRequireWildcard(require("../distribution/tukey"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// 2 parameter lists
// (mean1, mean2, n1, n2, sd)
// (array1, array2, sd)
function qscore() {
  var args = Array.prototype.slice.call(arguments);
  var mean1, mean2, n1, n2, sd;

  if ((0, _helpers.isNumber)(args[0])) {
    mean1 = args[0];
    mean2 = args[1];
    n1 = args[2];
    n2 = args[3];
    sd = args[4];
  } else {
    mean1 = (0, _vector.mean)(args[0]);
    mean2 = (0, _vector.mean)(args[1]);
    n1 = args[0].length;
    n2 = args[1].length;
    sd = args[2];
  }

  return Math.abs(mean1 - mean2) / (sd * Math.sqrt((1 / n1 + 1 / n2) / 2));
} // 3 different parameter lists:
// (qscore, n, k)
// (mean1, mean2, n1, n2, sd, n, k)
// (array1, array2, sd, n, k)


function qtest() {
  var args = Array.prototype.slice.call(arguments);
  var qscoreVal;

  if (args.length === 3) {
    qscoreVal = args[0];
    args = args.slice(1);
  } else if (args.length === 7) {
    qscoreVal = qscore(args[0], args[1], args[2], args[3], args[4]);
    args = args.slice(5);
  } else {
    qscoreVal = qscore(args[0], args[1], args[2]);
    args = args.slice(3);
  }

  var n = args[0];
  var k = args[1];
  return 1 - tukey.cdf(qscoreVal, k, n - k);
}

function tukeyhsd(arrays) {
  var sd = (0, _vector.pooledstdev)(arrays);
  var means = arrays.map(function (arr) {
    return (0, _vector.mean)(arr);
  });
  var n = arrays.reduce(function (n, arr) {
    return n + arr.length;
  }, 0);
  var results = [];

  for (var i = 0; i < arrays.length; ++i) {
    for (var j = i + 1; j < arrays.length; ++j) {
      var p = qtest(means[i], means[j], arrays[i].length, arrays[j].length, sd, n, arrays.length);
      results.push([[i, j], p]);
    }
  }

  return results;
}