"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pdf = pdf;
exports.cdf = cdf;

var _special = require("./special");

var _studentt = require("./studentt");

var _normal = require("./normal");

var _beta = require("./beta");

function pdf(x, dof, ncp) {
  var tol = 1e-14;
  if (Math.abs(ncp) < tol) // ncp approx 0; use student-t
    return (0, _studentt.pdf)(x, dof);

  if (Math.abs(x) < tol) {
    // different formula for x == 0
    return Math.exp((0, _special.gammaln)((dof + 1) / 2) - ncp * ncp / 2 - 0.5 * Math.log(Math.PI * dof) - (0, _special.gammaln)(dof / 2));
  } // formula for x != 0


  return dof / x * (cdf(x * Math.sqrt(1 + 2 / dof), dof + 2, ncp) - cdf(x, dof, ncp));
}

function cdf(x, dof, ncp) {
  var tol = 1e-14;
  var min_iterations = 200;
  if (Math.abs(ncp) < tol) // ncp approx 0; use student-t
    return (0, _studentt.cdf)(x, dof); // turn negative x into positive and flip result afterwards

  var flip = false;

  if (x < 0) {
    flip = true;
    ncp = -ncp;
  }

  var prob = (0, _normal.cdf)(-ncp, 0, 1);
  var value = tol + 1; // use value at last two steps to determine convergence

  var lastvalue = value;
  var y = x * x / (x * x + dof);
  var j = 0;
  var p = Math.exp(-ncp * ncp / 2);
  var q = Math.exp(-ncp * ncp / 2 - 0.5 * Math.log(2) - (0, _special.gammaln)(3 / 2)) * ncp;

  while (j < min_iterations || lastvalue > tol || value > tol) {
    lastvalue = value;

    if (j > 0) {
      p *= ncp * ncp / (2 * j);
      q *= ncp * ncp / (2 * (j + 1 / 2));
    }

    value = p * (0, _beta.cdf)(y, j + 0.5, dof / 2) + q * (0, _beta.cdf)(y, j + 1, dof / 2);
    prob += 0.5 * value;
    j++;
  }

  return flip ? 1 - prob : prob;
}