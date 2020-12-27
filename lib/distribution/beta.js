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

function pdf(x, alpha, beta) {
  // PDF is zero outside the support
  if (x > 1 || x < 0) return 0; // PDF is one for the uniform case

  if (alpha == 1 && beta == 1) return 1;

  if (alpha < 512 && beta < 512) {
    return Math.pow(x, alpha - 1) * Math.pow(1 - x, beta - 1) / (0, _special.betafn)(alpha, beta);
  } else {
    return Math.exp((alpha - 1) * Math.log(x) + (beta - 1) * Math.log(1 - x) - (0, _special.betaln)(alpha, beta));
  }
}

function cdf(x, alpha, beta) {
  return x > 1 || x < 0 ? (x > 1) * 1 : (0, _special.ibeta)(x, alpha, beta);
}

function inv(x, alpha, beta) {
  return (0, _special.ibetainv)(x, alpha, beta);
}

function mean(alpha, beta) {
  return alpha / (alpha + beta);
}

function median(alpha, beta) {
  return (0, _special.ibetainv)(0.5, alpha, beta);
}

function mode(alpha, beta) {
  return (alpha - 1) / (alpha + beta - 2);
} // return a random sample


function sample(alpha, beta) {
  var u = (0, _special.randg)(alpha);
  return u / (u + (0, _special.randg)(beta));
}

function variance(alpha, beta) {
  return alpha * beta / (Math.pow(alpha + beta, 2) * (alpha + beta + 1));
}