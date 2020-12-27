"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pdf = pdf;
exports.cdf = cdf;
exports.inv = inv;
exports.median = median;
exports.mode = mode;
exports.sample = sample;

var _special = require("./special");

function pdf(x, local, scale) {
  if (scale < 0) {
    return 0;
  }

  return scale / (Math.pow(x - local, 2) + Math.pow(scale, 2)) / Math.PI;
}

function cdf(x, local, scale) {
  return Math.atan((x - local) / scale) / Math.PI + 0.5;
}

function inv(p, local, scale) {
  return local + scale * Math.tan(Math.PI * (p - 0.5));
}

function median(local
/*, scale*/
) {
  return local;
}

function mode(local
/*, scale*/
) {
  return local;
}

function sample(local, scale) {
  return (0, _special.randn)() * Math.sqrt(1 / (2 * randg(0.5))) * scale + local;
}