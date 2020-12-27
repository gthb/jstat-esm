import { betafn,  betaln, ibetainv, randg, ibeta} from "./special";

export function pdf(x, alpha, beta) {
  // PDF is zero outside the support
  if (x > 1 || x < 0)
    return 0;
  // PDF is one for the uniform case
  if (alpha == 1 && beta == 1)
    return 1;

  if (alpha < 512 && beta < 512) {
    return (Math.pow(x, alpha - 1) * Math.pow(1 - x, beta - 1)) /
      betafn(alpha, beta);
  } else {
    return Math.exp((alpha - 1) * Math.log(x) +
      (beta - 1) * Math.log(1 - x) -
      betaln(alpha, beta));
  }
}

export function cdf(x, alpha, beta) {
  return (x > 1 || x < 0) ? (x > 1) * 1 : ibeta(x, alpha, beta);
}

export function inv(x, alpha, beta) {
  return ibetainv(x, alpha, beta);
}

export function mean(alpha, beta) {
  return alpha / (alpha + beta);
}

export function median(alpha, beta) {
  return ibetainv(0.5, alpha, beta);
}

export function mode(alpha, beta) {
  return (alpha - 1) / (alpha + beta - 2);
}

// return a random sample
export function sample(alpha, beta) {
  var u = randg(alpha);
  return u / (u + randg(beta));
}

export function variance(alpha, beta) {
  return (alpha * beta) / (Math.pow(alpha + beta, 2) * (alpha + beta + 1));
}

