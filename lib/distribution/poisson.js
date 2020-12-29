"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pdf = pdf;
exports.cdf = cdf;
exports.mean = mean;
exports.variance = variance;
exports.sample = sample;

var _special = require("./special");

var _jStat = require("../core/jStat");

var _vector = require("../vector");

function pdf(k, l) {
  if (l < 0 || k % 1 !== 0 || k < 0) {
    return 0;
  }

  return Math.pow(l, k) * Math.exp(-l) / (0, _special.factorial)(k);
}

function cdf(x, l) {
  var sumarr = [],
      k = 0;
  if (x < 0) return 0;

  for (; k <= x; k++) {
    sumarr.push(pdf(k, l));
  }

  return (0, _vector.sum)(sumarr);
}

function mean(l) {
  return l;
}

function variance(l) {
  return l;
}

function sampleSmall(l) {
  var p = 1,
      k = 0,
      L = Math.exp(-l);

  do {
    k++;
    p *= _jStat.jStat._random_fn();
  } while (p > L);

  return k - 1;
}

function sampleLarge(l) {
  var lam = l;
  var k;
  var U, V, slam, loglam, a, b, invalpha, vr, us;
  slam = Math.sqrt(lam);
  loglam = Math.log(lam);
  b = 0.931 + 2.53 * slam;
  a = -0.059 + 0.02483 * b;
  invalpha = 1.1239 + 1.1328 / (b - 3.4);
  vr = 0.9277 - 3.6224 / (b - 2);

  while (1) {
    U = Math.random() - 0.5;
    V = Math.random();
    us = 0.5 - Math.abs(U);
    k = Math.floor((2 * a / us + b) * U + lam + 0.43);

    if (us >= 0.07 && V <= vr) {
      return k;
    }

    if (k < 0 || us < 0.013 && V > us) {
      continue;
    }
    /* log(V) == log(0.0) ok here */

    /* if U==0.0 so that us==0.0, log is ok since always returns */


    if (Math.log(V) + Math.log(invalpha) - Math.log(a / (us * us) + b) <= -lam + k * loglam - (0, _special.loggam)(k + 1)) {
      return k;
    }
  }
}

function sample(l) {
  if (l < 10) return this.sampleSmall(l);else return this.sampleLarge(l);
}