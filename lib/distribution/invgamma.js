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
  if (x <= 0) return 0;
  return Math.exp(-(shape + 1) * Math.log(x) - scale / x - (0, _special.gammaln)(shape) + shape * Math.log(scale));
}

function cdf(x, shape, scale) {
  if (x <= 0) return 0;
  return 1 - (0, _special.lowRegGamma)(shape, scale / x);
}

function inv(p, shape, scale) {
  return scale / (0, _special.gammapinv)(1 - p, shape);
}

function mean(shape, scale) {
  return shape > 1 ? scale / (shape - 1) : undefined;
}

function mode(shape, scale) {
  return scale / (shape + 1);
}

function sample(shape, scale) {
  return scale / (0, _special.randg)(shape);
}

function variance(shape, scale) {
  if (shape <= 2) return undefined;
  return scale * scale / ((shape - 1) * (shape - 1) * (shape - 2));
}