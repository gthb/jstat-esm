"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pdf = pdf;
exports.cdf = cdf;
exports.inv = inv;
exports.mean = mean;
exports.mode = mode;
exports.sample = sample;
exports.variance = variance;

var _special = require("./special");

var binomial = _interopRequireWildcard(require("./binomial"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// This implementation of the pdf function avoids float overflow
// See the way that R calculates this value:
// https://svn.r-project.org/R/trunk/src/nmath/df.c
function pdf(x, df1, df2) {
  var p, q, f;
  if (x < 0) return 0;

  if (df1 <= 2) {
    if (x === 0 && df1 < 2) {
      return Infinity;
    }

    if (x === 0 && df1 === 2) {
      return 1;
    }

    return 1 / (0, _special.betafn)(df1 / 2, df2 / 2) * Math.pow(df1 / df2, df1 / 2) * Math.pow(x, df1 / 2 - 1) * Math.pow(1 + df1 / df2 * x, -(df1 + df2) / 2);
  }

  p = df1 * x / (df2 + x * df1);
  q = df2 / (df2 + x * df1);
  f = df1 * q / 2.0;
  return f * binomial.pdf((df1 - 2) / 2, (df1 + df2 - 2) / 2, p);
}

function cdf(x, df1, df2) {
  if (x < 0) return 0;
  return (0, _special.ibeta)(df1 * x / (df1 * x + df2), df1 / 2, df2 / 2);
}

function inv(x, df1, df2) {
  return df2 / (df1 * (1 / (0, _special.ibetainv)(x, df1 / 2, df2 / 2) - 1));
}

function mean(df1, df2) {
  return df2 > 2 ? df2 / (df2 - 2) : undefined;
}

function mode(df1, df2) {
  return df1 > 2 ? df2 * (df1 - 2) / (df1 * (df2 + 2)) : undefined;
} // return a random sample


function sample(df1, df2) {
  var x1 = (0, _special.randg)(df1 / 2) * 2;
  var x2 = (0, _special.randg)(df2 / 2) * 2;
  return x1 / df1 / (x2 / df2);
}

function variance(df1, df2) {
  if (df2 <= 4) return undefined;
  return 2 * df2 * df2 * (df1 + df2 - 2) / (df1 * (df2 - 2) * (df2 - 2) * (df2 - 4));
}