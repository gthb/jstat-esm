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
  dof = dof > 1e100 ? 1e100 : dof;
  return 1 / (Math.sqrt(dof) * (0, _special.betafn)(0.5, dof / 2)) * Math.pow(1 + x * x / dof, -((dof + 1) / 2));
}

function cdf(x, dof) {
  var dof2 = dof / 2;
  return (0, _special.ibeta)((x + Math.sqrt(x * x + dof)) / (2 * Math.sqrt(x * x + dof)), dof2, dof2);
}

function inv(p, dof) {
  var x = (0, _special.ibetainv)(2 * Math.min(p, 1 - p), 0.5 * dof, 0.5);
  x = Math.sqrt(dof * (1 - x) / x);
  return p > 0.5 ? x : -x;
}

function mean(dof) {
  return dof > 1 ? 0 : undefined;
}

function median()
/*dof*/
{
  return 0;
}

function mode()
/*dof*/
{
  return 0;
}

function sample(dof) {
  return (0, _special.randn)() * Math.sqrt(dof / (2 * (0, _special.randg)(dof / 2)));
}

function variance(dof) {
  return dof > 2 ? dof / (dof - 2) : dof > 1 ? Infinity : undefined;
}