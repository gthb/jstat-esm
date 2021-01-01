import { gammafn } from "./special";
import { random_fn } from "../core";

export function pdf(x, scale, shape) {
  if (x < 0 || scale < 0 || shape < 0)
    return 0;
  return (shape / scale) * Math.pow((x / scale), (shape - 1)) *
    Math.exp(-(Math.pow((x / scale), shape)));
}

export function cdf(x, scale, shape) {
  return x < 0 ? 0 : 1 - Math.exp(-Math.pow((x / scale), shape));
}

export function inv(p, scale, shape) {
  return scale * Math.pow(-Math.log(1 - p), 1 / shape);
}

export function mean(scale, shape) {
  return scale * gammafn(1 + 1 / shape);
}

export function median(scale, shape) {
  return scale * Math.pow(Math.log(2), 1 / shape);
}

export function mode(scale, shape) {
  if (shape <= 1)
    return 0;
  return scale * Math.pow((shape - 1) / shape, 1 / shape);
}

export function sample(scale, shape) {
  return scale * Math.pow(-Math.log(random_fn()), 1 / shape);
}

export function variance(scale, shape) {
  return scale * scale * gammafn(1 + 2 / shape) -
    Math.pow(mean(scale, shape), 2);
}
