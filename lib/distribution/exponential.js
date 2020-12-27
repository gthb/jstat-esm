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

var _jStat = require("../core/jStat");

function pdf(x, rate) {
  return x < 0 ? 0 : rate * Math.exp(-rate * x);
}

function cdf(x, rate) {
  return x < 0 ? 0 : 1 - Math.exp(-rate * x);
}

function inv(p, rate) {
  return -Math.log(1 - p) / rate;
}

function mean(rate) {
  return 1 / rate;
}

function median(rate) {
  return 1 / rate * Math.log(2);
}

function mode()
/*rate*/
{
  return 0;
}

function sample(rate) {
  return -1 / rate * Math.log(_jStat.jStat._random_fn());
}

function variance(rate) {
  return Math.pow(rate, -2);
}