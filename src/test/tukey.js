import { mean, pooledstdev } from "../vector";
import { isNumber } from "../core/helpers";
import * as tukey from '../distribution/tukey';

// 2 parameter lists
// (mean1, mean2, n1, n2, sd)
// (array1, array2, sd)
export function qscore() {
  var args = [...arguments];
  var mean1, mean2, n1, n2, sd;
  if (isNumber(args[0])) {
    mean1 = args[0];
    mean2 = args[1];
    n1 = args[2];
    n2 = args[3];
    sd = args[4];
  } else {
    mean1 = mean(args[0]);
    mean2 = mean(args[1]);
    n1 = args[0].length;
    n2 = args[1].length;
    sd = args[2];
  }
  return Math.abs(mean1 - mean2) / (sd * Math.sqrt((1 / n1 + 1 / n2) / 2));
}

// 3 different parameter lists:
// (qscore, n, k)
// (mean1, mean2, n1, n2, sd, n, k)
// (array1, array2, sd, n, k)
export function qtest() {
  var args = [...arguments];

  var qscoreVal;
  if (args.length === 3) {
    qscoreVal = args[0];
    args = args.slice(1);
  } else if (args.length === 7) {
    qscoreVal = qscore(args[0], args[1], args[2], args[3], args[4]);
    args = args.slice(5);
  } else {
    qscoreVal = qscore(args[0], args[1], args[2]);
    args = args.slice(3);
  }

  var n = args[0];
  var k = args[1];

  return 1 - tukey.cdf(qscoreVal, k, n - k);
}

export function tukeyhsd(arrays) {
  var sd = pooledstdev(arrays);
  var means = arrays.map(arr => mean(arr));
  var n = arrays.reduce((n, arr) => n + arr.length, 0);

  var results = [];
  for (var i = 0; i < arrays.length; ++i) {
    for (var j = i + 1; j < arrays.length; ++j) {
      var p = qtest(means[i], means[j], arrays[i].length, arrays[j].length, sd, n, arrays.length);
      results.push([[i, j], p]);
    }
  }

  return results;
}
