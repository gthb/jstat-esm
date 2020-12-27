import { combination, gammaln } from "./special";

// Got this from http://www.math.ucla.edu/~tom/distributions/binomial.html
function betinc(x, a, b, eps) {
  var a0 = 0;
  var b0 = 1;
  var a1 = 1;
  var b1 = 1;
  var m9 = 0;
  var a2 = 0;
  var c9;

  while (Math.abs((a1 - a2) / a1) > eps) {
    a2 = a1;
    c9 = -(a + m9) * (a + b + m9) * x / (a + 2 * m9) / (a + 2 * m9 + 1);
    a0 = a1 + c9 * a0;
    b0 = b1 + c9 * b0;
    m9 = m9 + 1;
    c9 = m9 * (b - m9) * x / (a + 2 * m9 - 1) / (a + 2 * m9);
    a1 = a0 + c9 * a1;
    b1 = b0 + c9 * b1;
    a0 = a0 / b1;
    b0 = b0 / b1;
    a1 = a1 / b1;
    b1 = 1;
  }

  return a1 / a;
}

export function pdf(k, n, p) {
  return (p === 0 || p === 1) ?
    ((n * p) === k ? 1 : 0) :
    combination(n, k) * Math.pow(p, k) * Math.pow(1 - p, n - k);
}

export function cdf(x, n, p) {
  var betacdf;
  var eps = 1e-10;

  if (x < 0)
    return 0;
  if (x >= n)
    return 1;
  if (p < 0 || p > 1 || n <= 0)
    return NaN;

  x = Math.floor(x);
  var z = p;
  var a = x + 1;
  var b = n - x;
  var s = a + b;
  var bt = Math.exp(gammaln(s) - gammaln(b) -
    gammaln(a) + a * Math.log(z) + b * Math.log(1 - z));

  if (z < (a + 1) / (s + 2))
    betacdf = bt * betinc(z, a, b, eps);
  else
    betacdf = 1 - bt * betinc(1 - z, b, a, eps);

  return Math.round((1 - betacdf) * (1 / eps)) / (1 / eps);
}
