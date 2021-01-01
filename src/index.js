export * from './core';
export * from './distribution';
export * from './vector';
export * from './test';
import { jStat } from "./core/jStat";

import * as coreFunctions from './core';
import * as pureDistributionFunctions from './distribution';
import * as vectorFunctions from './vector';
import * as testFunctions from './test';

// Assign static methods
Object.assign(jStat, coreFunctions, vectorFunctions, testFunctions);

// Generate distribution static methods, i.e. `jStat.gamma(1, 2)`
for (const [distributionName, distributionFn] of Object.entries(pureDistributionFunctions)) {

  // Main distribution method in jStat, i.e. `jStat.gamma(1, 2)`
  function BaseDistribution(...args) {
    // Make a new anonymous instance instead of using jStat instance
    if (!(this instanceof BaseDistribution))
      return new BaseDistribution(...args);
    this.givenArgs = args;
    return this;
  }

  Object.assign(BaseDistribution, distributionFn);
  jStat[distributionName] = BaseDistribution;

  // Distribution method to be used on a jStat instance, i.e. `jStat([1]).gamma(1, 2)`
  jStat.prototype[distributionName] = function (...args) {
    const instance = BaseDistribution(...args);
    instance.data = this;
    return instance;
  };

  BaseDistribution.prototype.sample = function (arr) {
    const givenArgs = this.givenArgs;
    if (arr)
      return jStat.alter(arr, () => distributionFn.sample(...givenArgs));

    return distributionFn.sample(...givenArgs);
  };

  ['pdf', 'cdf', 'inv'].forEach(methodName => {
    BaseDistribution.prototype[methodName] = function (x) {
      if (!x && x !== 0)
        x = this.data;
      if (typeof x !== 'number') {
        return jStat.map(x, x => distributionFn[methodName](x, ...this.givenArgs));
      }
      return distributionFn[methodName](x, ...this.givenArgs);
    };
  });

  ['mean', 'median', 'mode', 'variance'].forEach(methodName => {
    BaseDistribution.prototype[methodName] = function () {
      return distributionFn[methodName](...this.givenArgs);
    }
  })
}


// Vector functions
const isFunction = coreFunctions.utils.isFunction;

// Extend jStat prototype with method for calculating cumulative sums and products.
// This differs from the similar extension below as cumsum and cumprod should
// not be run again in the case fullbool === true.
// If a matrix is passed, automatically assume operation should be done on the
// columns.
(function (funcs) {
  for (var i = 0; i < funcs.length; i++) (function (passfunc) {
    // If a matrix is passed, automatically assume operation should be done on
    // the columns.
    jStat.prototype[passfunc] = function (fullbool, func) {
      var arr = [];
      var i = 0;
      var tmpthis = this;
      // Assignment reassignation depending on how parameters were passed in.
      if (isFunction(fullbool)) {
        func = fullbool;
        fullbool = false;
      }
      // Check if a callback was passed with the function.
      if (func) {
        setTimeout(function () {
          func.call(tmpthis, jStat.prototype[passfunc].call(tmpthis, fullbool));
        });
        return this;
      }
      // Check if matrix and run calculations.
      if (this.length > 1) {
        tmpthis = fullbool === true ? this : this.transpose();
        for (; i < tmpthis.length; i++)
          arr[i] = jStat[passfunc](tmpthis[i]);
        return arr;
      }
      // Pass fullbool if only vector, not a matrix. for variance and stdev.
      return jStat[passfunc](this[0], fullbool);
    };
  })(funcs[i]);
})(('cumsum cumprod').split(' '));

// Extend jProto with methods which don't require arguments and work on columns.
(function (funcs) {
  for (var i = 0; i < funcs.length; i++) (function (passfunc) {
    // If a matrix is passed, automatically assume operation should be done on
    // the columns.
    jStat.prototype[passfunc] = function (fullbool, func) {
      var arr = [];
      var i = 0;
      var tmpthis = this;
      // Assignment reassignation depending on how parameters were passed in.
      if (isFunction(fullbool)) {
        func = fullbool;
        fullbool = false;
      }
      // Check if a callback was passed with the function.
      if (func) {
        setTimeout(function () {
          func.call(tmpthis, jStat.prototype[passfunc].call(tmpthis, fullbool));
        });
        return this;
      }
      // Check if matrix and run calculations.
      if (this.length > 1) {
        if (passfunc !== 'sumrow')
          tmpthis = fullbool === true ? this : this.transpose();
        for (; i < tmpthis.length; i++)
          arr[i] = jStat[passfunc](tmpthis[i]);
        return fullbool === true
          ? jStat[passfunc](jStat.utils.toVector(arr))
          : arr;
      }
      // Pass fullbool if only vector, not a matrix. for variance and stdev.
      return jStat[passfunc](this[0], fullbool);
    };
  })(funcs[i]);
})(('sum sumsqrd sumsqerr sumrow product min max unique mean meansqerr ' +
  'geomean median diff rank mode range variance deviation stdev meandev ' +
  'meddev coeffvar quartiles histogram skewness kurtosis').split(' '));


// Extend jProto with functions that take arguments. Operations on matrices are
// done on columns.
(function (funcs) {
  for (var i = 0; i < funcs.length; i++) (function (passfunc) {
    jStat.prototype[passfunc] = function () {
      var arr = [];
      var i = 0;
      var tmpthis = this;
      var args = Array.prototype.slice.call(arguments);
      var callbackFunction;

      // If the last argument is a function, we assume it's a callback; we
      // strip the callback out and call the function again.
      if (isFunction(args[args.length - 1])) {
        callbackFunction = args[args.length - 1];
        var argsToPass = args.slice(0, args.length - 1);

        setTimeout(function () {
          callbackFunction.call(tmpthis,
            jStat.prototype[passfunc].apply(tmpthis, argsToPass));
        });
        return this;

        // Otherwise we curry the function args and call normally.
      } else {
        callbackFunction = undefined;
        var curriedFunction = function curriedFunction(vector) {
          return jStat[passfunc].apply(tmpthis, [vector].concat(args));
        }
      }

      // If this is a matrix, run column-by-column.
      if (this.length > 1) {
        tmpthis = tmpthis.transpose();
        for (; i < tmpthis.length; i++)
          arr[i] = curriedFunction(tmpthis[i]);
        return arr;
      }

      // Otherwise run on the vector.
      return curriedFunction(this[0]);
    };
  })(funcs[i]);
})('quantiles percentileOfScore'.split(' '));


// Statistical Tests
jStat.prototype.zscore = function zscore(value, flag) {
  return (value - this.mean()) / this.stdev(flag);
};

jStat.prototype.ztest = function ztest(value, sides, flag) {
  const zscore = Math.abs(this.zscore(value, flag));
  return (sides === 1) ?
    (jStat.normal.cdf(-zscore, 0, 1)) :
    (jStat.normal.cdf(-zscore, 0, 1) * 2);
};

jStat.prototype.tscore = function tscore(value) {
  return (value - this.mean()) / (this.stdev(true) / Math.sqrt(this.cols()));
};

jStat.prototype.ttest = function ttest(value, sides) {
  return (sides === 1) ?
    (1 - jStat.studentt.cdf(Math.abs(this.tscore(value)), this.cols() - 1)) :
    (jStat.studentt.cdf(-Math.abs(this.tscore(value)), this.cols() - 1) * 2);
};

jStat.prototype.anovafscore = function anovafscore() {
  return jStat.anovafscore(this.toArray());
};

jStat.prototype.anovaftes = function anovaftes() {
  var n = 0;
  var i;
  for (i = 0; i < this.length; i++) {
    n = n + this[i].length;
  }
  return jStat.ftest(this.anovafscore(), this.length - 1, n - this.length);
};

jStat.jStat = jStat;
export { jStat };
export default jStat;
