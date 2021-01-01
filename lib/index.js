"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  jStat: true
};
Object.defineProperty(exports, "jStat", {
  enumerable: true,
  get: function get() {
    return _jStat.jStat;
  }
});
exports["default"] = void 0;

var coreFunctions = _interopRequireWildcard(require("./core"));

Object.keys(coreFunctions).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === coreFunctions[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return coreFunctions[key];
    }
  });
});

var pureDistributionFunctions = _interopRequireWildcard(require("./distribution"));

Object.keys(pureDistributionFunctions).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === pureDistributionFunctions[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return pureDistributionFunctions[key];
    }
  });
});

var vectorFunctions = _interopRequireWildcard(require("./vector"));

Object.keys(vectorFunctions).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === vectorFunctions[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return vectorFunctions[key];
    }
  });
});

var testFunctions = _interopRequireWildcard(require("./test"));

Object.keys(testFunctions).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === testFunctions[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return testFunctions[key];
    }
  });
});

var _jStat = require("./core/jStat");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

// Assign static methods
Object.assign(_jStat.jStat, coreFunctions, vectorFunctions, testFunctions); // Generate distribution static methods, i.e. `jStat.gamma(1, 2)`

var _loop = function _loop() {
  var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
      distributionName = _Object$entries$_i[0],
      distributionFn = _Object$entries$_i[1];

  // Main distribution method in jStat, i.e. `jStat.gamma(1, 2)`
  function BaseDistribution() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    // Make a new anonymous instance instead of using jStat instance
    if (!(this instanceof BaseDistribution)) return _construct(BaseDistribution, args);
    this.givenArgs = args;
    return this;
  }

  Object.assign(BaseDistribution, distributionFn);
  _jStat.jStat[distributionName] = BaseDistribution; // Distribution method to be used on a jStat instance, i.e. `jStat([1]).gamma(1, 2)`

  _jStat.jStat.prototype[distributionName] = function () {
    var instance = BaseDistribution.apply(void 0, arguments);
    instance.data = this;
    return instance;
  };

  BaseDistribution.prototype.sample = function (arr) {
    var givenArgs = this.givenArgs;
    if (arr) return _jStat.jStat.alter(arr, function () {
      return distributionFn.sample.apply(distributionFn, _toConsumableArray(givenArgs));
    });
    return distributionFn.sample.apply(distributionFn, _toConsumableArray(givenArgs));
  };

  ['pdf', 'cdf', 'inv'].forEach(function (methodName) {
    BaseDistribution.prototype[methodName] = function (x) {
      var _this = this;

      if (!x && x !== 0) x = this.data;

      if (typeof x !== 'number') {
        return _jStat.jStat.map(x, function (x) {
          return distributionFn[methodName].apply(distributionFn, [x].concat(_toConsumableArray(_this.givenArgs)));
        });
      }

      return distributionFn[methodName].apply(distributionFn, [x].concat(_toConsumableArray(this.givenArgs)));
    };
  });
  ['mean', 'median', 'mode', 'variance'].forEach(function (methodName) {
    BaseDistribution.prototype[methodName] = function () {
      return distributionFn[methodName].apply(distributionFn, _toConsumableArray(this.givenArgs));
    };
  });
};

for (var _i = 0, _Object$entries = Object.entries(pureDistributionFunctions); _i < _Object$entries.length; _i++) {
  _loop();
} // Vector functions


var isFunction = coreFunctions.utils.isFunction; // Extend jStat prototype with method for calculating cumulative sums and products.
// This differs from the similar extension below as cumsum and cumprod should
// not be run again in the case fullbool === true.
// If a matrix is passed, automatically assume operation should be done on the
// columns.

(function (funcs) {
  for (var i = 0; i < funcs.length; i++) {
    (function (passfunc) {
      // If a matrix is passed, automatically assume operation should be done on
      // the columns.
      _jStat.jStat.prototype[passfunc] = function (fullbool, func) {
        var arr = [];
        var i = 0;
        var tmpthis = this; // Assignment reassignation depending on how parameters were passed in.

        if (isFunction(fullbool)) {
          func = fullbool;
          fullbool = false;
        } // Check if a callback was passed with the function.


        if (func) {
          setTimeout(function () {
            func.call(tmpthis, _jStat.jStat.prototype[passfunc].call(tmpthis, fullbool));
          });
          return this;
        } // Check if matrix and run calculations.


        if (this.length > 1) {
          tmpthis = fullbool === true ? this : this.transpose();

          for (; i < tmpthis.length; i++) {
            arr[i] = _jStat.jStat[passfunc](tmpthis[i]);
          }

          return arr;
        } // Pass fullbool if only vector, not a matrix. for variance and stdev.


        return _jStat.jStat[passfunc](this[0], fullbool);
      };
    })(funcs[i]);
  }
})('cumsum cumprod'.split(' ')); // Extend jProto with methods which don't require arguments and work on columns.


(function (funcs) {
  for (var i = 0; i < funcs.length; i++) {
    (function (passfunc) {
      // If a matrix is passed, automatically assume operation should be done on
      // the columns.
      _jStat.jStat.prototype[passfunc] = function (fullbool, func) {
        var arr = [];
        var i = 0;
        var tmpthis = this; // Assignment reassignation depending on how parameters were passed in.

        if (isFunction(fullbool)) {
          func = fullbool;
          fullbool = false;
        } // Check if a callback was passed with the function.


        if (func) {
          setTimeout(function () {
            func.call(tmpthis, _jStat.jStat.prototype[passfunc].call(tmpthis, fullbool));
          });
          return this;
        } // Check if matrix and run calculations.


        if (this.length > 1) {
          if (passfunc !== 'sumrow') tmpthis = fullbool === true ? this : this.transpose();

          for (; i < tmpthis.length; i++) {
            arr[i] = _jStat.jStat[passfunc](tmpthis[i]);
          }

          return fullbool === true ? _jStat.jStat[passfunc](_jStat.jStat.utils.toVector(arr)) : arr;
        } // Pass fullbool if only vector, not a matrix. for variance and stdev.


        return _jStat.jStat[passfunc](this[0], fullbool);
      };
    })(funcs[i]);
  }
})(('sum sumsqrd sumsqerr sumrow product min max unique mean meansqerr ' + 'geomean median diff rank mode range variance deviation stdev meandev ' + 'meddev coeffvar quartiles histogram skewness kurtosis').split(' ')); // Extend jProto with functions that take arguments. Operations on matrices are
// done on columns.


(function (funcs) {
  for (var i = 0; i < funcs.length; i++) {
    (function (passfunc) {
      _jStat.jStat.prototype[passfunc] = function () {
        var arr = [];
        var i = 0;
        var tmpthis = this;
        var args = Array.prototype.slice.call(arguments);
        var callbackFunction; // If the last argument is a function, we assume it's a callback; we
        // strip the callback out and call the function again.

        if (isFunction(args[args.length - 1])) {
          callbackFunction = args[args.length - 1];
          var argsToPass = args.slice(0, args.length - 1);
          setTimeout(function () {
            callbackFunction.call(tmpthis, _jStat.jStat.prototype[passfunc].apply(tmpthis, argsToPass));
          });
          return this; // Otherwise we curry the function args and call normally.
        } else {
          callbackFunction = undefined;

          var curriedFunction = function curriedFunction(vector) {
            return _jStat.jStat[passfunc].apply(tmpthis, [vector].concat(args));
          };
        } // If this is a matrix, run column-by-column.


        if (this.length > 1) {
          tmpthis = tmpthis.transpose();

          for (; i < tmpthis.length; i++) {
            arr[i] = curriedFunction(tmpthis[i]);
          }

          return arr;
        } // Otherwise run on the vector.


        return curriedFunction(this[0]);
      };
    })(funcs[i]);
  }
})('quantiles percentileOfScore'.split(' ')); // Statistical Tests


_jStat.jStat.prototype.zscore = function zscore(value, flag) {
  return (value - this.mean()) / this.stdev(flag);
};

_jStat.jStat.prototype.ztest = function ztest(value, sides, flag) {
  var zscore = Math.abs(this.zscore(value, flag));
  return sides === 1 ? _jStat.jStat.normal.cdf(-zscore, 0, 1) : _jStat.jStat.normal.cdf(-zscore, 0, 1) * 2;
};

_jStat.jStat.prototype.tscore = function tscore(value) {
  return (value - this.mean()) / (this.stdev(true) / Math.sqrt(this.cols()));
};

_jStat.jStat.prototype.ttest = function ttest(value, sides) {
  return sides === 1 ? 1 - _jStat.jStat.studentt.cdf(Math.abs(this.tscore(value)), this.cols() - 1) : _jStat.jStat.studentt.cdf(-Math.abs(this.tscore(value)), this.cols() - 1) * 2;
};

_jStat.jStat.prototype.anovafscore = function anovafscore() {
  return _jStat.jStat.anovafscore(this.toArray());
};

_jStat.jStat.prototype.anovaftes = function anovaftes() {
  var n = 0;
  var i;

  for (i = 0; i < this.length; i++) {
    n = n + this[i].length;
  }

  return _jStat.jStat.ftest(this.anovafscore(), this.length - 1, n - this.length);
};

_jStat.jStat.jStat = _jStat.jStat;
var _default = _jStat.jStat;
exports["default"] = _default;