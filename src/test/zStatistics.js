import * as normal from '../distribution/normal';
import { mean, stdev } from "../vector";
import { isArray, isNumber } from "../core/helpers";

// 2 different parameter lists:
// (value, mean, sd)
// (value, array, flag)
export function zscore() {
  const args = [...arguments];
  if (isNumber(args[1])) {
    return (args[0] - args[1]) / args[2];
  }
  return (args[0] - mean(args[1])) / stdev(args[1], args[2]);
}

// 3 different paramter lists:
// (value, mean, sd, sides)
// (zscore, sides)
// (value, array, sides, flag)
export function ztest() {
  const args = [...arguments];
  let z;
  if (isArray(args[1])) {
    // (value, array, sides, flag)
    z = zscore(args[0], args[1], args[3]);
    return (args[2] === 1) ?
      (normal.cdf(-Math.abs(z), 0, 1)) :
      (normal.cdf(-Math.abs(z), 0, 1) * 2);
  } else {
    if (args.length > 2) {
      // (value, mean, sd, sides)
      z = zscore(args[0], args[1], args[2]);
      return (args[3] === 1) ?
        (normal.cdf(-Math.abs(z), 0, 1)) :
        (normal.cdf(-Math.abs(z), 0, 1) * 2);
    } else {
      // (zscore, sides)
      z = args[0];
      return (args[1] === 1) ?
        (normal.cdf(-Math.abs(z), 0, 1)) :
        (normal.cdf(-Math.abs(z), 0, 1) * 2);
    }
  }
}
