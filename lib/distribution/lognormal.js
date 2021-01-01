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

function pdf(x, mu, sigma) {
  if (x <= 0) return 0;
  return Math.exp(-Math.log(x) - 0.5 * Math.log(2 * Math.PI) - Math.log(sigma) - Math.pow(Math.log(x) - mu, 2) / (2 * sigma * sigma));
}

function cdf(x, mu, sigma) {
  if (x < 0) return 0;
  return 0.5 + 0.5 * (0, _special.erf)((Math.log(x) - mu) / Math.sqrt(2 * sigma * sigma));
}

function inv(p, mu, sigma) {
  return Math.exp(-1.41421356237309505 * sigma * (0, _special.erfcinv)(2 * p) + mu);
}

function mean(mu, sigma) {
  return Math.exp(mu + sigma * sigma / 2);
}

function median(mu
/*, sigma*/
) {
  return Math.exp(mu);
}

function mode(mu, sigma) {
  return Math.exp(mu - sigma * sigma);
}

function sample(mu, sigma) {
  return Math.exp((0, _special.randn)() * sigma + mu);
}

function variance(mu, sigma) {
  return (Math.exp(sigma * sigma) - 1) * Math.exp(2 * mu + sigma * sigma);
}