import { loggam, factorial } from './special';
import { jStat } from "../core/jStat";
import { sum } from '../vector';

export function pdf(k, l) {
  if (l < 0 || (k % 1) !== 0 || k < 0) {
    return 0;
  }

  return Math.pow(l, k) * Math.exp(-l) / factorial(k);
}

export function cdf(x, l) {
  var sumarr = [],
    k = 0;
  if (x < 0) return 0;
  for (; k <= x; k++) {
    sumarr.push(pdf(k, l));
  }
  return sum(sumarr);
}

export function mean(l) {
  return l;
}

export function variance(l) {
  return l;
}

function sampleSmall(l) {
  var p = 1, k = 0, L = Math.exp(-l);
  do {
    k++;
    p *= jStat._random_fn();
  } while (p > L);
  return k - 1;
}

function sampleLarge(l) {
  var lam = l;
  var k;
  var U, V, slam, loglam, a, b, invalpha, vr, us;

  slam = Math.sqrt(lam);
  loglam = Math.log(lam);
  b = 0.931 + 2.53 * slam;
  a = -0.059 + 0.02483 * b;
  invalpha = 1.1239 + 1.1328 / (b - 3.4);
  vr = 0.9277 - 3.6224 / (b - 2);

  while (1) {
    U = Math.random() - 0.5;
    V = Math.random();
    us = 0.5 - Math.abs(U);
    k = Math.floor((2 * a / us + b) * U + lam + 0.43);
    if ((us >= 0.07) && (V <= vr)) {
      return k;
    }
    if ((k < 0) || ((us < 0.013) && (V > us))) {
      continue;
    }
    /* log(V) == log(0.0) ok here */
    /* if U==0.0 so that us==0.0, log is ok since always returns */
    if ((Math.log(V) + Math.log(invalpha) - Math.log(a / (us * us) + b)) <= (-lam + k * loglam - loggam(k + 1))) {
      return k;
    }
  }
}

export function sample(l) {
  if (l < 10)
    return sampleSmall(l);
  else
    return sampleLarge(l);
}
