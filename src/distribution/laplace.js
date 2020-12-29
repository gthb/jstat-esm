import {jStat} from "../core/jStat";

function laplaceSign(x) {
  return x / Math.abs(x);
}

export function pdf(x, mu, b) {
  return (b <= 0) ? 0 : (Math.exp(-Math.abs(x - mu) / b)) / (2 * b);
}

export function cdf(x, mu, b) {
  if (b <= 0) { return 0; }

  if(x < mu) {
    return 0.5 * Math.exp((x - mu) / b);
  } else {
    return 1 - 0.5 * Math.exp(- (x - mu) / b);
  }
}

export function mean(mu/*, b*/) {
  return mu;
}

export function median(mu/*, b*/) {
  return mu;
}

export function mode(mu/*, b*/) {
  return mu;
}

export function variance(mu, b) {
  return 2 * b * b;
}

export function sample(mu, b) {
  var u = jStat._random_fn() - 0.5;

  return mu - (b * laplaceSign(u) * Math.log(1 - (2 * Math.abs(u))));
}
