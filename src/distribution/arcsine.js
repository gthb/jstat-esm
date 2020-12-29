import {sample as uniformSample} from './uniform';

export function pdf(x, a, b) {
  if (b <= a) return NaN;

  return (x <= a || x >= b) ? 0 :
    (2 / Math.PI) *
    Math.pow(Math.pow(b - a, 2) -
      Math.pow(2 * x - a - b, 2), -0.5);
}

export function cdf(x, a, b) {
  if (x < a)
    return 0;
  else if (x < b)
    return (2 / Math.PI) * Math.asin(Math.sqrt((x - a)/(b - a)));
  return 1;
}

export function inv(p, a, b) {
  return a + (0.5 - 0.5 * Math.cos(Math.PI * p)) * (b - a);
}

export function mean(a, b) {
  if (b <= a) return NaN;
  return (a + b) / 2;
}

export function median(a, b) {
  if (b <= a) return NaN;
  return (a + b) / 2;
}

export function mode(/*a, b*/) {
  throw new Error('mode is not yet implemented');
}

export function sample(a, b) {
  return ((a + b) / 2) + ((b - a) / 2) *
    Math.sin(2 * Math.PI * uniformSample(0, 1));
}

export function variance(a, b) {
  if (b <= a) return NaN;
  return Math.pow(b - a, 2) / 8;
}
