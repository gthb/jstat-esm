"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.jStat = jStat;

var _helpers = require("./helpers");

var _index = require("./index");

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function jStat() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return _construct(jStat._init, args);
}

jStat._init = function () {
  for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    args[_key2] = arguments[_key2];
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
};

jStat._init.prototype = jStat.prototype;
jStat._init.constructor = jStat;
jStat.setRandom = _index.setRandom; // Quick reference.

var jProto = jStat.prototype; // Default length.

jProto.length = 0; // For internal use only.
// TODO: Check if they're actually used, and if they are then rename them
// to _*

jProto.push = Array.prototype.push;
jProto.sort = Array.prototype.sort;
jProto.splice = Array.prototype.splice;
jProto.slice = Array.prototype.slice; // Return a clean array.

jProto.toArray = function toArray() {
  return this.length > 1 ? this.slice() : this.slice()[0];
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
}; // Extend prototype with methods that have no argument.


[_index.transpose, _index.clear, _index.symmetric, _index.rows, _index.cols, _index.dimensions, _index.diag, _index.antidiag].forEach(function (fn) {
  jProto[fn.name] = function (cb) {
    if (cb) {
      cb.call(this, jProto[fn.name].call(this));
      return this;
    }

    var result = fn(this);
    return Array.isArray(result) ? jStat(result) : result;
  };
}); // Extend prototype with methods that have one argument.

[_index.row, _index.col].forEach(function (fn) {
  jProto[fn.name] = function (arg1, cb) {
    if (cb) {
      cb.call(this, jProto[fn.name].call(this, arg1));
      return this;
    }

    return jStat(fn(this, arg1));
  };
}); // Extend prototype with simple shortcut methods.

[_index.create, _index.zeros, _index.ones, _index.rand, _index.identity].forEach(function (fn) {
  jProto[fn.name] = function () {
    return jStat(fn.apply(void 0, arguments));
  };
});