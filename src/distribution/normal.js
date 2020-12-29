import { erf, erfcinv, randn } from "./special";

export function pdf(x, mean, std) {
  return Math.exp(-0.5 * Math.log(2 * Math.PI) -
    Math.log(std) - Math.pow(x - mean, 2) / (2 * std * std));
}

export function cdf(x, mean, std) {
  return 0.5 * (1 + erf((x - mean) / Math.sqrt(2 * std * std)));
}

export function inv(p, mean, std) {
  return -1.41421356237309505 * std * erfcinv(2 * p) + mean;
}

export function mean(mean/*, std*/) {
  return mean;
}

export function median(mean/*, std*/) {
  return mean;
}

export function mode(mean/*, std*/) {
  return mean;
}

export function sample(mean, std) {
  return randn() * std + mean;
}

export function variance(mean, std) {
  return std * std;
}
