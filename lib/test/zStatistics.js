"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.zscore = zscore;
exports.ztest = ztest;

var normal = _interopRequireWildcard(require("../distribution/normal"));

var _vector = require("../vector");

var _helpers = require("../core/helpers");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// 2 different parameter lists:
// (value, mean, sd)
// (value, array, flag)
function zscore() {
  var args = Array.prototype.slice.call(arguments);

  if ((0, _helpers.isNumber)(args[1])) {
    return (args[0] - args[1]) / args[2];
  }

  return (args[0] - (0, _vector.mean)(args[1])) / (0, _vector.stdev)(args[1], args[2]);
} // 3 different paramter lists:
// (value, mean, sd, sides)
// (zscore, sides)
// (value, array, sides, flag)


function ztest() {
  var args = Array.prototype.slice.call(arguments);
  var z;

  if ((0, _helpers.isArray)(args[1])) {
    // (value, array, sides, flag)
    z = zscore(args[0], args[1], args[3]);
    return args[2] === 1 ? normal.cdf(-Math.abs(z), 0, 1) : normal.cdf(-Math.abs(z), 0, 1) * 2;
  } else {
    if (args.length > 2) {
      // (value, mean, sd, sides)
      z = zscore(args[0], args[1], args[2]);
      return args[3] === 1 ? normal.cdf(-Math.abs(z), 0, 1) : normal.cdf(-Math.abs(z), 0, 1) * 2;
    } else {
      // (zscore, sides)
      z = args[0];
      return args[1] === 1 ? normal.cdf(-Math.abs(z), 0, 1) : normal.cdf(-Math.abs(z), 0, 1) * 2;
    }
  }
}