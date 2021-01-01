import { erf, erfcinv, randn } from "./special";

export function pdf(x, mu, sigma) {
  if (x <= 0)
    return 0;
  return Math.exp(-Math.log(x) - 0.5 * Math.log(2 * Math.PI) -
    Math.log(sigma) - Math.pow(Math.log(x) - mu, 2) /
    (2 * sigma * sigma));
}

export function cdf(x, mu, sigma) {
  if (x < 0)
    return 0;
  return 0.5 +
    (0.5 * erf((Math.log(x) - mu) / Math.sqrt(2 * sigma * sigma)));
}

export function inv(p, mu, sigma) {
  return Math.exp(-1.41421356237309505 * sigma * erfcinv(2 * p) + mu);
}

export function mean(mu, sigma) {
  return Math.exp(mu + sigma * sigma / 2);
}

export function median(mu/*, sigma*/) {
  return Math.exp(mu);
}

export function mode(mu, sigma) {
  return Math.exp(mu - sigma * sigma);
}

export function sample(mu, sigma) {
  return Math.exp(randn() * sigma + mu);
}

export function variance(mu, sigma) {
  return (Math.exp(sigma * sigma) - 1) * Math.exp(2 * mu + sigma * sigma);
}
