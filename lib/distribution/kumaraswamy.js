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
exports.variance = variance;

var _special = require("./special");

function pdf(x, alpha, beta) {
  if (x === 0 && alpha === 1) return beta;else if (x === 1 && beta === 1) return alpha;
  return Math.exp(Math.log(alpha) + Math.log(beta) + (alpha - 1) * Math.log(x) + (beta - 1) * Math.log(1 - Math.pow(x, alpha)));
}

function cdf(x, alpha, beta) {
  if (x < 0) return 0;else if (x > 1) return 1;
  return 1 - Math.pow(1 - Math.pow(x, alpha), beta);
}

function inv(p, alpha, beta) {
  return Math.pow(1 - Math.pow(1 - p, 1 / beta), 1 / alpha);
}

function mean(alpha, beta) {
  return beta * (0, _special.gammafn)(1 + 1 / alpha) * (0, _special.gammafn)(beta) / (0, _special.gammafn)(1 + 1 / alpha + beta);
}

function median(alpha, beta) {
  return Math.pow(1 - Math.pow(2, -1 / beta), 1 / alpha);
}

function mode(alpha, beta) {
  if (!(alpha >= 1 && beta >= 1 && alpha !== 1 && beta !== 1)) return undefined;
  return Math.pow((alpha - 1) / (alpha * beta - 1), 1 / alpha);
}

function variance()
/*alpha, beta*/
{
  throw new Error('variance not yet implemented'); // TODO: complete this
}