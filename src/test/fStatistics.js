import * as centralF from '../distribution/centralF';
import { mean } from "../vector";
import { isNumber } from "../core/helpers";

// Paramter list is as follows:
// (array1, array2, array3, ...)
// or it is an array of arrays
// array of arrays conversion
export function anovafscore() {
  var args = [...arguments],
    expVar, sample, sampMean, sampSampMean, tmpargs, unexpVar, i, j;
  if (args.length === 1) {
    tmpargs = new Array(args[0].length);
    for (i = 0; i < args[0].length; i++) {
      tmpargs[i] = args[0][i];
    }
    args = tmpargs;
  }
  // Builds sample array
  sample = [];
  for (i = 0; i < args.length; i++) {
    sample = sample.concat(args[i]);
  }
  sampMean = mean(sample);
  // Computes the explained variance
  expVar = 0;
  for (i = 0; i < args.length; i++) {
    expVar = expVar + args[i].length * Math.pow(mean(args[i]) - sampMean, 2);
  }
  expVar /= (args.length - 1);
  // Computes unexplained variance
  unexpVar = 0;
  for (i = 0; i < args.length; i++) {
    sampSampMean = mean(args[i]);
    for (j = 0; j < args[i].length; j++) {
      unexpVar += Math.pow(args[i][j] - sampSampMean, 2);
    }
  }
  unexpVar /= (sample.length - args.length);
  return expVar / unexpVar;
}

// 2 different paramter setups
// (array1, array2, array3, ...)
// (anovafscore, df1, df2)
export function anovaftest() {
  var args = [...arguments],
    df1, df2, n, i;
  if (isNumber(args[0])) {
    return 1 - centralF.cdf(args[0], args[1], args[2]);
  }
  var anovafscore = anovafscore(args);
  df1 = args.length - 1;
  n = 0;
  for (i = 0; i < args.length; i++) {
    n = n + args[i].length;
  }
  df2 = n - df1 - 1;
  return 1 - centralF.cdf(anovafscore, df1, df2);
}

export function ftest(fscore, df1, df2) {
  return 1 - centralF.cdf(fscore, df1, df2);
}
