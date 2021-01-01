"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pdf = pdf;
exports.cdf = cdf;
exports.inv = inv;
exports.mean = mean;
exports.median = median;
exports.mode = mode;
exports.sample = sample;
exports.variance = variance;

var _core = require("../core");

var _vector = require("../vector");

function pdf(x, a, b) {
  return x < a || x > b ? 0 : 1 / (b - a);
}

function cdf(x, a, b) {
  if (x < a) return 0;else if (x < b) return (x - a) / (b - a);
  return 1;
}

function inv(p, a, b) {
  return a + p * (b - a);
}

function mean(a, b) {
  return 0.5 * (a + b);
}

function median(a, b) {
  return (0, _vector.mean)(a, b);
}

function mode()
/*a, b*/
{
  throw new Error('mode is not yet implemented');
}

function sample(a, b) {
  return a / 2 + b / 2 + (b / 2 - a / 2) * (2 * (0, _core.random_fn)() - 1);
}

function variance(a, b) {
  return Math.pow(b - a, 2) / 12;
}