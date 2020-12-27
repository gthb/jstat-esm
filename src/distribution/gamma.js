import { gammaln, gammapinv, lowRegGamma, randg } from "./special";

export function pdf(x, shape, scale) {
  if (x < 0)
    return 0;
  return (x === 0 && shape === 1) ? 1 / scale :
    Math.exp((shape - 1) * Math.log(x) - x / scale -
      gammaln(shape) - shape * Math.log(scale));
}

export function cdf(x, shape, scale) {
  if (x < 0)
    return 0;
  return lowRegGamma(shape, x / scale);
}

export function inv(p, shape, scale) {
  return gammapinv(p, shape) * scale;
}

export function mean(shape, scale) {
  return shape * scale;
}

export function mode(shape, scale) {
  if (shape > 1) return (shape - 1) * scale;
  return undefined;
}

export function sample(shape, scale) {
  return randg(shape) * scale;
}

export function variance(shape, scale) {
  return shape * scale * scale;
}
