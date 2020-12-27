"use strict";

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

function pdf(x, shape, scale) {
  if (x < 0) return 0;
  return x === 0 && shape === 1 ? 1 / scale : Math.exp((shape - 1) * Math.log(x) - x / scale - (0, _special.gammaln)(shape) - shape * Math.log(scale));
}

function cdf(x, shape, scale) {
  if (x < 0) return 0;
  return (0, _special.lowRegGamma)(shape, x / scale);
}

function inv(p, shape, scale) {
  return (0, _special.gammapinv)(p, shape) * scale;
}

function mean(shape, scale) {
  return shape * scale;
}

function mode(shape, scale) {
  if (shape > 1) return (shape - 1) * scale;
  return undefined;
}

function sample(shape, scale) {
  return (0, _special.randg)(shape) * scale;
}

function variance(shape, scale) {
  return shape * scale * scale;
}