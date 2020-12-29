export function pdf(x, scale, shape) {
  if (x < scale)
    return 0;
  return (shape * Math.pow(scale, shape)) / Math.pow(x, shape + 1);
}

export function cdf(x, scale, shape) {
  if (x < scale)
    return 0;
  return 1 - Math.pow(scale / x, shape);
}

export function inv(p, scale, shape) {
  return scale / Math.pow(1 - p, 1 / shape);
}

export function mean(scale, shape) {
  if (shape <= 1)
    return undefined;
  return (shape * Math.pow(scale, shape)) / (shape - 1);
}

export function median(scale, shape) {
  return scale * (shape * Math.SQRT2);
}

export function mode(scale/*, shape*/) {
  return scale;
}

export function variance(scale, shape) {
  if (shape <= 2)
    return undefined;
  return (scale * scale * shape) / (Math.pow(shape - 1, 2) * (shape - 2));
}
