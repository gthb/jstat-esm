"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.jStat = jStat;

var _helpers = require("./helpers");

var _index = require("./index");

function jStat() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  // If first argument is an array, must be vector or matrix.
  if ((0, _helpers.isArray)(args[0])) {
    // Check if matrix.
    if ((0, _helpers.isArray)(args[0][0])) {
      // See if a mapping function was also passed.
      if ((0, _helpers.isFunction)(args[1])) args[0] = (0, _index.map)(args[0], args[1]); // Iterate over each is faster than this.push.apply(this, args[0].

      for (var i = 0; i < args[0].length; i++) {
        this[i] = args[0][i];
      }

      this.length = args[0].length; // Otherwise must be a vector.
    } else {
      this[0] = (0, _helpers.isFunction)(args[1]) ? (0, _index.map)(args[0], args[1]) : args[0];
      this.length = 1;
    } // If first argument is number, assume creation of sequence.

  } else if ((0, _helpers.isNumber)(args[0])) {
    this[0] = _index.seq.apply(null, args);
    this.length = 1; // Handle case when jStat object is passed to jStat.
  } else if (args[0] instanceof jStat) {
    // Duplicate the object and pass it back.
    return jStat(args[0].toArray()); // Unexpected argument value, return empty jStat object.
    // TODO: This is strange behavior. Shouldn't this throw or some such to let
    // the user know they had bad arguments?
  } else {
    this[0] = [];
    this.length = 1;
  }

  return this;
}

jStat._random_fn = Math.random;

jStat.setRandom = function setRandom(fn) {
  if (typeof fn !== 'function') throw new TypeError('fn is not a function');
  jStat._random_fn = fn;
}; // Quick reference.


var jProto = jStat.prototype; // Default length.

jProto.length = 0; // For internal use only.
// TODO: Check if they're actually used, and if they are then rename them
// to _*

jProto.push = Array.prototype.push;
jProto.sort = Array.prototype.sort;
jProto.splice = Array.prototype.splice;
jProto.slice = Array.prototype.slice; // Return a clean array.

jProto.toArray = function toArray() {
  return this.length > 1 ? _index.slice.call(this) : _index.slice.call(this)[0];
}; // Map a function to a matrix or vector.


jProto.map = function (func, toAlter) {
  return jStat((0, _index.map)(this, func, toAlter));
}; // Cumulatively combine the elements of a matrix or vector using a function.


jProto.cumreduce = function (func, toAlter) {
  return jStat((0, _index.cumreduce)(this, func, toAlter));
}; // Destructively alter an array.


jProto.alter = function (func) {
  (0, _index.alter)(this, func);
  return this;
};