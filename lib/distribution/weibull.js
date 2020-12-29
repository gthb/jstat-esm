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

var _special = require("./special");

var _jStat = require("../core/jStat");

function pdf(x, scale, shape) {
  if (x < 0 || scale < 0 || shape < 0) return 0;
  return shape / scale * Math.pow(x / scale, shape - 1) * Math.exp(-Math.pow(x / scale, shape));
}

function cdf(x, scale, shape) {
  return x < 0 ? 0 : 1 - Math.exp(-Math.pow(x / scale, shape));
}

function inv(p, scale, shape) {
  return scale * Math.pow(-Math.log(1 - p), 1 / shape);
}

function mean(scale, shape) {
  return scale * (0, _special.gammafn)(1 + 1 / shape);
}

function median(scale, shape) {
  return scale * Math.pow(Math.log(2), 1 / shape);
}

function mode(scale, shape) {
  if (shape <= 1) return 0;
  return scale * Math.pow((shape - 1) / shape, 1 / shape);
}

function sample(scale, shape) {
  return scale * Math.pow(-Math.log(_jStat.jStat._random_fn()), 1 / shape);
}

function variance(scale, shape) {
  return scale * scale * (0, _special.gammafn)(1 + 2 / shape) - Math.pow(mean(scale, shape), 2);
}