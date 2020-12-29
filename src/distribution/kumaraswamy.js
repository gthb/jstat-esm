import { gammafn } from "./special";

export function pdf(x, alpha, beta) {
  if (x === 0 && alpha === 1)
    return beta;
  else if (x === 1 && beta === 1)
    return alpha;
  return Math.exp(Math.log(alpha) + Math.log(beta) + (alpha - 1) *
    Math.log(x) + (beta - 1) *
    Math.log(1 - Math.pow(x, alpha)));
}

export function cdf(x, alpha, beta) {
  if (x < 0)
    return 0;
  else if (x > 1)
    return 1;
  return (1 - Math.pow(1 - Math.pow(x, alpha), beta));
}

export function inv(p, alpha, beta) {
  return Math.pow(1 - Math.pow(1 - p, 1 / beta), 1 / alpha);
}

export function mean(alpha, beta) {
  return (beta * gammafn(1 + 1 / alpha) *
    gammafn(beta)) / (gammafn(1 + 1 / alpha + beta));
}

export function median(alpha, beta) {
  return Math.pow(1 - Math.pow(2, -1 / beta), 1 / alpha);
}

export function mode(alpha, beta) {
  if (!(alpha >= 1 && beta >= 1 && (alpha !== 1 && beta !== 1)))
    return undefined;
  return Math.pow((alpha - 1) / (alpha * beta - 1), 1 / alpha);
}

export function variance(/*alpha, beta*/) {
  throw new Error('variance not yet implemented');
  // TODO: complete this
}
