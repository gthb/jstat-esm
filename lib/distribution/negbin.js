"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pdf = pdf;
exports.cdf = cdf;

var _special = require("./special");

function pdf(k, r, p) {
  if (k !== k >>> 0) return false;
  if (k < 0) return 0;
  return (0, _special.combination)(k + r - 1, r - 1) * Math.pow(1 - p, k) * Math.pow(p, r);
}

function cdf(x, r, p) {
  var sum = 0,
      k = 0;
  if (x < 0) return 0;

  for (; k <= x; k++) {
    sum += pdf(k, r, p);
  }

  return sum;
}