"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pdf = pdf;
exports.cdf = cdf;
exports.mean = mean;
exports.median = median;
exports.mode = mode;
exports.variance = variance;
exports.sample = sample;

var _core = require("../core");

function laplaceSign(x) {
  return x / Math.abs(x);
}

function pdf(x, mu, b) {
  return b <= 0 ? 0 : Math.exp(-Math.abs(x - mu) / b) / (2 * b);
}

function cdf(x, mu, b) {
  if (b <= 0) {
    return 0;
  }

  if (x < mu) {
    return 0.5 * Math.exp((x - mu) / b);
  } else {
    return 1 - 0.5 * Math.exp(-(x - mu) / b);
  }
}

function mean(mu
/*, b*/
) {
  return mu;
}

function median(mu
/*, b*/
) {
  return mu;
}

function mode(mu
/*, b*/
) {
  return mu;
}

function variance(mu, b) {
  return 2 * b * b;
}

function sample(mu, b) {
  var u = (0, _core.random_fn)() - 0.5;
  return mu - b * laplaceSign(u) * Math.log(1 - 2 * Math.abs(u));
}