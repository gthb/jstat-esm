import { gammaln, gammapinv, lowRegGamma, randg } from "./special";

export function pdf(x, shape, scale) {
  if (x <= 0)
    return 0;
  return Math.exp(-(shape + 1) * Math.log(x) - scale / x -
    gammaln(shape) + shape * Math.log(scale));
}

export function cdf(x, shape, scale) {
  if (x <= 0)
    return 0;
  return 1 - lowRegGamma(shape, scale / x);
}

export function inv(p, shape, scale) {
  return scale / gammapinv(1 - p, shape);
}

export function mean(shape, scale) {
  return (shape > 1) ? scale / (shape - 1) : undefined;
}

export function mode(shape, scale) {
  return scale / (shape + 1);
}

export function sample(shape, scale) {
  return scale / randg(shape);
}

export function variance(shape, scale) {
  if (shape <= 2)
    return undefined;
  return scale * scale / ((shape - 1) * (shape - 1) * (shape - 2));
}
