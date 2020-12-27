import { gammaln, gammapinv, lowRegGamma, randg } from "./special";

export function pdf(x, dof) {
  if (x < 0)
    return 0;
  return (x === 0 && dof === 2) ? 0.5 :
    Math.exp((dof / 2 - 1) * Math.log(x) - x / 2 - (dof / 2) *
      Math.log(2) - gammaln(dof / 2));
}

export function cdf(x, dof) {
  if (x < 0)
    return 0;
  return lowRegGamma(dof / 2, x / 2);
}

export function inv(p, dof) {
  return 2 * gammapinv(p, 0.5 * dof);
}

export function mean(dof) {
  return dof;
}

// TODO: this is an approximation (is there a better way?)
export function median(dof) {
  return dof * Math.pow(1 - (2 / (9 * dof)), 3);
}

export function mode(dof) {
  return (dof - 2 > 0) ? dof - 2 : 0;
}

export function sample(dof) {
  return randg(dof / 2) * 2;
}

export function variance(dof) {
  return 2 * dof;
}
