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

function pdf(x, mean, std) {
  return Math.exp(-0.5 * Math.log(2 * Math.PI) - Math.log(std) - Math.pow(x - mean, 2) / (2 * std * std));
}

function cdf(x, mean, std) {
  return 0.5 * (1 + (0, _special.erf)((x - mean) / Math.sqrt(2 * std * std)));
}

function inv(p, mean, std) {
  return -1.41421356237309505 * std * (0, _special.erfcinv)(2 * p) + mean;
}

function mean(mean
/*, std*/
) {
  return mean;
}

function median(mean
/*, std*/
) {
  return mean;
}

function mode(mean
/*, std*/
) {
  return mean;
}

function sample(mean, std) {
  return (0, _special.randn)() * std + mean;
}

function variance(mean, std) {
  return std * std;
}