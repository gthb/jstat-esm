"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.anovafscore = anovafscore;
exports.anovaftest = anovaftest;
exports.ftest = ftest;

var centralF = _interopRequireWildcard(require("../distribution/centralF"));

var _vector = require("../vector");

var _helpers = require("../core/helpers");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Paramter list is as follows:
// (array1, array2, array3, ...)
// or it is an array of arrays
// array of arrays conversion
function anovafscore() {
  var args = Array.prototype.slice.call(arguments),
      expVar,
      sample,
      sampMean,
      sampSampMean,
      tmpargs,
      unexpVar,
      i,
      j;

  if (args.length === 1) {
    tmpargs = new Array(args[0].length);

    for (i = 0; i < args[0].length; i++) {
      tmpargs[i] = args[0][i];
    }

    args = tmpargs;
  } // Builds sample array


  sample = [];

  for (i = 0; i < args.length; i++) {
    sample = sample.concat(args[i]);
  }

  sampMean = (0, _vector.mean)(sample); // Computes the explained variance

  expVar = 0;

  for (i = 0; i < args.length; i++) {
    expVar = expVar + args[i].length * Math.pow((0, _vector.mean)(args[i]) - sampMean, 2);
  }

  expVar /= args.length - 1; // Computes unexplained variance

  unexpVar = 0;

  for (i = 0; i < args.length; i++) {
    sampSampMean = (0, _vector.mean)(args[i]);

    for (j = 0; j < args[i].length; j++) {
      unexpVar += Math.pow(args[i][j] - sampSampMean, 2);
    }
  }

  unexpVar /= sample.length - args.length;
  return expVar / unexpVar;
} // 2 different paramter setups
// (array1, array2, array3, ...)
// (anovafscore, df1, df2)


function anovaftest() {
  var args = Array.prototype.slice.call(arguments),
      df1,
      df2,
      n,
      i;

  if ((0, _helpers.isNumber)(args[0])) {
    return 1 - centralF.cdf(args[0], args[1], args[2]);
  }

  var anovafscore = anovafscore(args);
  df1 = args.length - 1;
  n = 0;

  for (i = 0; i < args.length; i++) {
    n = n + args[i].length;
  }

  df2 = n - df1 - 1;
  return 1 - centralF.cdf(anovafscore, df1, df2);
}

function ftest(fscore, df1, df2) {
  return 1 - centralF.cdf(fscore, df1, df2);
}