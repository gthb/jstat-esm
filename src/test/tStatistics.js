import { mean, stdev } from "../vector";
import { isNumber } from "../core/helpers";
import * as studentt from '../distribution/studentt';

// 2 parameter lists
// (value, mean, sd, n)
// (value, array)
export function tscore() {
  const args = [...arguments];
  return (args.length === 4) ?
    ((args[0] - args[1]) / (args[2] / Math.sqrt(args[3]))) :
    ((args[0] - mean(args[1])) /
      (stdev(args[1], true) / Math.sqrt(args[1].length)));
}

// 3 different paramter lists:
// (value, mean, sd, n, sides)
// (tscore, n, sides)
// (value, array, sides)
export function ttest() {
  const args = [...arguments];
  let tscoreVal;
  if (args.length === 5) {
    tscoreVal = Math.abs(tscore(args[0], args[1], args[2], args[3]));
    return (args[4] === 1) ?
      (studentt.cdf(-tscoreVal, args[3]-1)) :
      (studentt.cdf(-tscoreVal, args[3]-1)*2);
  }
  if (isNumber(args[1])) {
    tscoreVal = Math.abs(args[0])
    return (args[2] === 1) ?
      (studentt.cdf(-tscoreVal, args[1]-1)) :
      (studentt.cdf(-tscoreVal, args[1]-1) * 2);
  }
  tscoreVal = Math.abs(tscore(args[0], args[1]))
  return (args[2] === 1) ?
    (studentt.cdf(-tscoreVal, args[1].length-1)) :
    (studentt.cdf(-tscoreVal, args[1].length-1) * 2);
}
