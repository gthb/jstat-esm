import { random_fn } from "../core";
import {mean as VectorMean} from '../vector';

export function pdf(x, a, b) {
  return (x < a || x > b) ? 0 : 1 / (b - a);
}

export function cdf(x, a, b) {
  if (x < a)
    return 0;
  else if (x < b)
    return (x - a) / (b - a);
  return 1;
}

export function inv(p, a, b) {
  return a + (p * (b - a));
}

export function mean(a, b) {
  return 0.5 * (a + b);
}

export function median(a, b) {
  return VectorMean(a, b);
}

export function mode(/*a, b*/) {
  throw new Error('mode is not yet implemented');
}

export function sample(a, b) {
  return (a / 2 + b / 2) + (b / 2 - a / 2) * (2 * random_fn() - 1);
}

export function variance(a, b) {
  return Math.pow(b - a, 2) / 12;
}
