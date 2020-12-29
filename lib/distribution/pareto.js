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

function pdf(x, scale, shape) {
  if (x < scale) return 0;
  return shape * Math.pow(scale, shape) / Math.pow(x, shape + 1);
}

function cdf(x, scale, shape) {
  if (x < scale) return 0;
  return 1 - Math.pow(scale / x, shape);
}

function inv(p, scale, shape) {
  return scale / Math.pow(1 - p, 1 / shape);
}

function mean(scale, shape) {
  if (shape <= 1) return undefined;
  return shape * Math.pow(scale, shape) / (shape - 1);
}

function median(scale, shape) {
  return scale * (shape * Math.SQRT2);
}

function mode(scale
/*, shape*/
) {
  return scale;
}

function variance(scale, shape) {
  if (shape <= 2) return undefined;
  return scale * scale * shape / (Math.pow(shape - 1, 2) * (shape - 2));
}