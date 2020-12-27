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

function pdf(x, dof) {
  if (x < 0) return 0;
  return x === 0 && dof === 2 ? 0.5 : Math.exp((dof / 2 - 1) * Math.log(x) - x / 2 - dof / 2 * Math.log(2) - (0, _special.gammaln)(dof / 2));
}

function cdf(x, dof) {
  if (x < 0) return 0;
  return (0, _special.lowRegGamma)(dof / 2, x / 2);
}

function inv(p, dof) {
  return 2 * (0, _special.gammapinv)(p, 0.5 * dof);
}

function mean(dof) {
  return dof;
} // TODO: this is an approximation (is there a better way?)


function median(dof) {
  return dof * Math.pow(1 - 2 / (9 * dof), 3);
}

function mode(dof) {
  return dof - 2 > 0 ? dof - 2 : 0;
}

function sample(dof) {
  return (0, _special.randg)(dof / 2) * 2;
}

function variance(dof) {
  return 2 * dof;
}