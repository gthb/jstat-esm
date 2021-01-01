import { random_fn } from "../core";

export function pdf(x, a, b, c) {
  if (b <= a || c < a || c > b) {
    return NaN;
  } else {
    if (x < a || x > b) {
      return 0;
    } else if (x < c) {
      return (2 * (x - a)) / ((b - a) * (c - a));
    } else if (x === c) {
      return (2 / (b - a));
    } else { // x > c
      return (2 * (b - x)) / ((b - a) * (b - c));
    }
  }
}

export function cdf(x, a, b, c) {
  if (b <= a || c < a || c > b)
    return NaN;
  if (x <= a)
    return 0;
  else if (x >= b)
    return 1;
  if (x <= c)
    return Math.pow(x - a, 2) / ((b - a) * (c - a));
  else // x > c
    return 1 - Math.pow(b - x, 2) / ((b - a) * (b - c));
}

export function inv(p, a, b, c) {
  if (b <= a || c < a || c > b) {
    return NaN;
  } else {
    if (p <= ((c - a) / (b - a))) {
      return a + (b - a) * Math.sqrt(p * ((c - a) / (b - a)));
    } else { // p > ((c - a) / (b - a))
      return a + (b - a) * (1 - Math.sqrt((1 - p) * (1 - ((c - a) / (b - a)))));
    }
  }
}

export function mean(a, b, c) {
  return (a + b + c) / 3;
}

export function median(a, b, c) {
  if (c <= (a + b) / 2) {
    return b - Math.sqrt((b - a) * (b - c)) / Math.sqrt(2);
  } else if (c > (a + b) / 2) {
    return a + Math.sqrt((b - a) * (c - a)) / Math.sqrt(2);
  }
}

export function mode(a, b, c) {
  return c;
}

export function sample(a, b, c) {
  var u = random_fn();
  if (u < ((c - a) / (b - a)))
    return a + Math.sqrt(u * (b - a) * (c - a))
  return b - Math.sqrt((1 - u) * (b - a) * (b - c));
}

export function variance(a, b, c) {
  return (a * a + b * b + c * c - a * b - a * c - b * c) / 18;
}
