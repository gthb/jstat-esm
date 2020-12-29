"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sum = sum;
exports.sumsqrd = sumsqrd;
exports.sumsqerr = sumsqerr;
exports.sumrow = sumrow;
exports.product = product;
exports.min = min;
exports.max = max;
exports.unique = unique;
exports.mean = mean;
exports.meansqerr = meansqerr;
exports.geomean = geomean;
exports.median = median;
exports.cumsum = cumsum;
exports.cumprod = cumprod;
exports.diff = diff;
exports.rank = rank;
exports.mode = mode;
exports.range = range;
exports.variance = variance;
exports.pooledvariance = pooledvariance;
exports.deviation = deviation;
exports.stdev = stdev;
exports.pooledstdev = pooledstdev;
exports.meandev = meandev;
exports.meddev = meddev;
exports.coeffvar = coeffvar;
exports.quartiles = quartiles;
exports.quantiles = quantiles;
exports.percentile = percentile;
exports.percentileOfScore = percentileOfScore;
exports.histogram = histogram;
exports.covariance = covariance;
exports.corrcoeff = corrcoeff;
exports.spearmancoeff = spearmancoeff;
exports.stanMoment = stanMoment;
exports.skewness = skewness;
exports.kurtosis = kurtosis;

var _helpers = require("../core/helpers");

// Ascending functions for sort
function ascNum(a, b) {
  return a - b;
}

function clip(arg, min, max) {
  return Math.max(min, Math.min(arg, max));
} // sum of an array


function sum(arr) {
  var sum = 0;
  var i = arr.length;

  while (--i >= 0) {
    sum += arr[i];
  }

  return sum;
} // sum squared


function sumsqrd(arr) {
  var sum = 0;
  var i = arr.length;

  while (--i >= 0) {
    sum += arr[i] * arr[i];
  }

  return sum;
} // sum of squared errors of prediction (SSE)


function sumsqerr(arr) {
  var meanVal = mean(arr);
  var sum = 0;
  var i = arr.length;
  var tmp;

  while (--i >= 0) {
    tmp = arr[i] - meanVal;
    sum += tmp * tmp;
  }

  return sum;
} // sum of an array in each row


function sumrow(arr) {
  var sum = 0;
  var i = arr.length;

  while (--i >= 0) {
    sum += arr[i];
  }

  return sum;
} // product of an array


function product(arr) {
  var prod = 1;
  var i = arr.length;

  while (--i >= 0) {
    prod *= arr[i];
  }

  return prod;
} // minimum value of an array


function min(arr) {
  var low = arr[0];
  var i = 0;

  while (++i < arr.length) {
    if (arr[i] < low) low = arr[i];
  }

  return low;
} // maximum value of an array


function max(arr) {
  var high = arr[0];
  var i = 0;

  while (++i < arr.length) {
    if (arr[i] > high) high = arr[i];
  }

  return high;
} // unique values of an array


function unique(arr) {
  var hash = {},
      _arr = [];

  for (var i = 0; i < arr.length; i++) {
    if (!hash[arr[i]]) {
      hash[arr[i]] = true;

      _arr.push(arr[i]);
    }
  }

  return _arr;
} // mean value of an array


function mean(arr) {
  return sum(arr) / arr.length;
} // mean squared error (MSE)


function meansqerr(arr) {
  return sumsqerr(arr) / arr.length;
} // geometric mean of an array


function geomean(arr) {
  return Math.pow(product(arr), 1 / arr.length);
} // median of an array


function median(arr) {
  var arrlen = arr.length;

  var _arr = arr.slice().sort(ascNum); // check if array is even or odd, then return the appropriate


  return !(arrlen & 1) ? (_arr[arrlen / 2 - 1] + _arr[arrlen / 2]) / 2 : _arr[arrlen / 2 | 0];
} // cumulative sum of an array


function cumsum(arr) {
  return cumreduce(arr, function (a, b) {
    return a + b;
  });
} // cumulative product of an array


function cumprod(arr) {
  return cumreduce(arr, function (a, b) {
    return a * b;
  });
} // successive differences of a sequence


function diff(arr) {
  var diffs = [];
  var arrLen = arr.length;
  var i;

  for (i = 1; i < arrLen; i++) {
    diffs.push(arr[i] - arr[i - 1]);
  }

  return diffs;
} // ranks of an array


function rank(arr) {
  var i;
  var distinctNumbers = [];
  var numberCounts = {};

  for (i = 0; i < arr.length; i++) {
    var number = arr[i];

    if (numberCounts[number]) {
      numberCounts[number]++;
    } else {
      numberCounts[number] = 1;
      distinctNumbers.push(number);
    }
  }

  var sortedDistinctNumbers = distinctNumbers.sort(ascNum);
  var numberRanks = {};
  var currentRank = 1;

  for (i = 0; i < sortedDistinctNumbers.length; i++) {
    var number = sortedDistinctNumbers[i];
    var count = numberCounts[number];
    var first = currentRank;
    var last = currentRank + count - 1;
    var rank = (first + last) / 2;
    numberRanks[number] = rank;
    currentRank += count;
  }

  return arr.map(function (number) {
    return numberRanks[number];
  });
} // mode of an array
// if there are multiple modes of an array, return all of them
// is this the appropriate way of handling it?


function mode(arr) {
  var arrLen = arr.length;

  var _arr = arr.slice().sort(ascNum);

  var count = 1;
  var maxCount = 0;
  var numMaxCount = 0;
  var mode_arr = [];
  var i;

  for (i = 0; i < arrLen; i++) {
    if (_arr[i] === _arr[i + 1]) {
      count++;
    } else {
      if (count > maxCount) {
        mode_arr = [_arr[i]];
        maxCount = count;
        numMaxCount = 0;
      } // are there multiple max counts
      else if (count === maxCount) {
          mode_arr.push(_arr[i]);
          numMaxCount++;
        } // resetting count for new value in array


      count = 1;
    }
  }

  return numMaxCount === 0 ? mode_arr[0] : mode_arr;
} // range of an array


function range(arr) {
  return max(arr) - min(arr);
} // variance of an array
// flag = true indicates sample instead of population


function variance(arr, flag) {
  return sumsqerr(arr) / (arr.length - (flag ? 1 : 0));
} // pooled variance of an array of arrays


function pooledvariance(arr) {
  var sumsqerrVal = arr.reduce(function (a, samples) {
    return a + sumsqerr(samples);
  }, 0);
  var count = arr.reduce(function (a, samples) {
    return a + samples.length;
  }, 0);
  return sumsqerrVal / (count - arr.length);
} // deviation of an array


function deviation(arr) {
  var meanVal = mean(arr);
  var arrlen = arr.length;
  var dev = new Array(arrlen);

  for (var i = 0; i < arrlen; i++) {
    dev[i] = arr[i] - meanVal;
  }

  return dev;
} // standard deviation of an array
// flag = true indicates sample instead of population


function stdev(arr, flag) {
  return Math.sqrt(variance(arr, flag));
} // pooled standard deviation of an array of arrays


function pooledstdev(arr) {
  return Math.sqrt(pooledvariance(arr));
} // mean deviation (mean absolute deviation) of an array


function meandev(arr) {
  var meanVal = mean(arr);
  var a = [];

  for (var i = arr.length - 1; i >= 0; i--) {
    a.push(Math.abs(arr[i] - meanVal));
  }

  return mean(a);
} // median deviation (median absolute deviation) of an array


function meddev(arr) {
  var medianVal = median(arr);
  var a = [];

  for (var i = arr.length - 1; i >= 0; i--) {
    a.push(Math.abs(arr[i] - medianVal));
  }

  return median(a);
} // coefficient of variation


function coeffvar(arr) {
  return stdev(arr) / mean(arr);
} // quartiles of an array


function quartiles(arr) {
  var arrlen = arr.length;

  var _arr = arr.slice().sort(ascNum);

  return [_arr[Math.round(arrlen / 4) - 1], _arr[Math.round(arrlen / 2) - 1], _arr[Math.round(arrlen * 3 / 4) - 1]];
}

; // Arbitary quantiles of an array. Direct port of the scipy.stats
// implementation by Pierre GF Gerard-Marchant.

function quantiles(arr, quantilesArray, alphap, betap) {
  var sortedArray = arr.slice().sort(ascNum);
  var quantileVals = [quantilesArray.length];
  var n = arr.length;
  var i, p, m, aleph, k, gamma;
  if (typeof alphap === 'undefined') alphap = 3 / 8;
  if (typeof betap === 'undefined') betap = 3 / 8;

  for (i = 0; i < quantilesArray.length; i++) {
    p = quantilesArray[i];
    m = alphap + p * (1 - alphap - betap);
    aleph = n * p + m;
    k = Math.floor(clip(aleph, 1, n - 1));
    gamma = clip(aleph - k, 0, 1);
    quantileVals[i] = (1 - gamma) * sortedArray[k - 1] + gamma * sortedArray[k];
  }

  return quantileVals;
}

; // Return the k-th percentile of values in a range, where k is in the range 0..1, inclusive.
// Passing true for the exclusive parameter excludes both endpoints of the range.

function percentile(arr, k, exclusive) {
  var _arr = arr.slice().sort(ascNum);

  var realIndex = k * (_arr.length + (exclusive ? 1 : -1)) + (exclusive ? 0 : 1);
  var index = parseInt(realIndex);
  var frac = realIndex - index;

  if (index + 1 < _arr.length) {
    return _arr[index - 1] + frac * (_arr[index] - _arr[index - 1]);
  } else {
    return _arr[index - 1];
  }
} // The percentile rank of score in a given array. Returns the percentage
// of all values in the input array that are less than (kind='strict') or
// less or equal than (kind='weak') score. Default is weak.


function percentileOfScore(arr, score, kind) {
  var counter = 0;
  var len = arr.length;
  var strict = false;
  var value, i;
  if (kind === 'strict') strict = true;

  for (i = 0; i < len; i++) {
    value = arr[i];

    if (strict && value < score || !strict && value <= score) {
      counter++;
    }
  }

  return counter / len;
} // Histogram (bin count) data


function histogram(arr, binCnt) {
  binCnt = binCnt || 4;
  var first = min(arr);
  var binWidth = (max(arr) - first) / binCnt;
  var len = arr.length;
  var bins = [];
  var i;

  for (i = 0; i < binCnt; i++) {
    bins[i] = 0;
  }

  for (i = 0; i < len; i++) {
    bins[Math.min(Math.floor((arr[i] - first) / binWidth), binCnt - 1)] += 1;
  }

  return bins;
} // covariance of two arrays


function covariance(arr1, arr2) {
  var u = mean(arr1);
  var v = mean(arr2);
  var arr1Len = arr1.length;
  var sq_dev = new Array(arr1Len);
  var i;

  for (i = 0; i < arr1Len; i++) {
    sq_dev[i] = (arr1[i] - u) * (arr2[i] - v);
  }

  return sum(sq_dev) / (arr1Len - 1);
} // (pearson's) population correlation coefficient, rho


function corrcoeff(arr1, arr2) {
  return covariance(arr1, arr2) / stdev(arr1, 1) / stdev(arr2, 1);
} // (spearman's) rank correlation coefficient, sp


function spearmancoeff(arr1, arr2) {
  arr1 = rank(arr1);
  arr2 = rank(arr2); //return pearson's correlation of the ranks:

  return corrcoeff(arr1, arr2);
} // statistical standardized moments (general form of skew/kurt)


function stanMoment(arr, n) {
  var mu = mean(arr);
  var sigma = stdev(arr);
  var len = arr.length;
  var skewSum = 0;

  for (var i = 0; i < len; i++) {
    skewSum += Math.pow((arr[i] - mu) / sigma, n);
  }

  return skewSum / arr.length;
} // (pearson's) moment coefficient of skewness


function skewness(arr) {
  return stanMoment(arr, 3);
} // (pearson's) (excess) kurtosis


function kurtosis(arr) {
  return stanMoment(arr, 4) - 3;
}