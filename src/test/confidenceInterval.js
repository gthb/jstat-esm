import * as normal from '../distribution/normal';
import * as studentt from '../distribution/studentt';
import {ztest} from './zStatistics';
import {stdev} from '../vector'

// 2 different parameter setups
// (value, alpha, sd, n)
// (value, alpha, array)
export function normalci() {
  const args = [...arguments],
    ans = new Array(2);
  let change;
  if (args.length === 4) {
    change = Math.abs(normal.inv(args[1] / 2, 0, 1) *
      args[2] / Math.sqrt(args[3]));
  } else {
    change = Math.abs(normal.inv(args[1] / 2, 0, 1) *
      stdev(args[2]) / Math.sqrt(args[2].length));
  }
  ans[0] = args[0] - change;
  ans[1] = args[0] + change;
  return ans;
}


// 2 different parameter setups
// (value, alpha, sd, n)
// (value, alpha, array)
export function tci() {
  const args = [...arguments],
    ans = new Array(2);
  let change;
  if (args.length === 4) {
    change = Math.abs(studentt.inv(args[1] / 2, args[3] - 1) *
      args[2] / Math.sqrt(args[3]));
  } else {
    change = Math.abs(studentt.inv(args[1] / 2, args[2].length - 1) *
      stdev(args[2], true) / Math.sqrt(args[2].length));
  }
  ans[0] = args[0] - change;
  ans[1] = args[0] + change;
  return ans;
}

export function significant(pvalue, alpha) {
  return pvalue < alpha;
}

function differenceOfProportions(p1, n1, p2, n2) {
  if (p1 > 1 || p2 > 1 || p1 <= 0 || p2 <= 0) {
    throw new Error("Proportions should be greater than 0 and less than 1")
  }
  var pooled = (p1 * n1 + p2 * n2) / (n1 + n2);
  var se = Math.sqrt(pooled * (1 - pooled) * ((1/n1) + (1/n2)));
  return (p1 - p2) / se;
}


export function oneSidedDifferenceOfProportions(p1, n1, p2, n2) {
  const z = differenceOfProportions(p1, n1, p2, n2);
  return ztest(z, 1);
}

export function twoSidedDifferenceOfProportions(p1, n1, p2, n2) {
  const z = differenceOfProportions(p1, n1, p2, n2);
  return ztest(z, 2);
}
