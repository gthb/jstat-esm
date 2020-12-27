// This implementation of the pdf function avoids float overflow
// See the way that R calculates this value:
// https://svn.r-project.org/R/trunk/src/nmath/df.c

import { betafn, ibeta, ibetainv, randg } from "./special";
import * as binomial from './binomial';

export function pdf(x, df1, df2) {
  var p, q, f;

  if (x < 0)
    return 0;

  if (df1 <= 2) {
    if (x === 0 && df1 < 2) {
      return Infinity;
    }
    if (x === 0 && df1 === 2) {
      return 1;
    }
    return (1 / betafn(df1 / 2, df2 / 2)) *
      Math.pow(df1 / df2, df1 / 2) *
      Math.pow(x, (df1 / 2) - 1) *
      Math.pow((1 + (df1 / df2) * x), -(df1 + df2) / 2);
  }

  p = (df1 * x) / (df2 + x * df1);
  q = df2 / (df2 + x * df1);
  f = df1 * q / 2.0;
  return f * binomial.pdf((df1 - 2) / 2, (df1 + df2 - 2) / 2, p);
}

export function cdf(x, df1, df2) {
  if (x < 0)
    return 0;
  return ibeta((df1 * x) / (df1 * x + df2), df1 / 2, df2 / 2);
}

export function inv(x, df1, df2) {
  return df2 / (df1 * (1 / ibetainv(x, df1 / 2, df2 / 2) - 1));
}

export function mean(df1, df2) {
  return (df2 > 2) ? df2 / (df2 - 2) : undefined;
}

export function mode(df1, df2) {
  return (df1 > 2) ? (df2 * (df1 - 2)) / (df1 * (df2 + 2)) : undefined;
}

// return a random sample
export function sample(df1, df2) {
  var x1 = randg(df1 / 2) * 2;
  var x2 = randg(df2 / 2) * 2;
  return (x1 / df1) / (x2 / df2);
}

export function variance(df1, df2) {
  if (df2 <= 4)
    return undefined;
  return 2 * df2 * df2 * (df1 + df2 - 2) /
    (df1 * (df2 - 2) * (df2 - 2) * (df2 - 4));
}
