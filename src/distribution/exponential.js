import { jStat } from '../core/jStat';

export function pdf(x, rate) {
  return x < 0 ? 0 : rate * Math.exp(-rate * x);
}

export function cdf(x, rate) {
  return x < 0 ? 0 : 1 - Math.exp(-rate * x);
}

export function inv(p, rate) {
  return -Math.log(1 - p) / rate;
}

export function mean(rate) {
  return 1 / rate;
}

export function median(rate) {
  return (1 / rate) * Math.log(2);
}

export function mode(/*rate*/) {
  return 0;
}

export function sample(rate) {
  return -1 / rate * Math.log(jStat._random_fn());
}

export function variance(rate) {
  return Math.pow(rate, -2);
}
