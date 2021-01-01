import { randg, randn, betafn, ibeta, ibetainv } from "./special";

export function pdf(x, dof) {
  dof = dof > 1e100 ? 1e100 : dof;
  return (1/(Math.sqrt(dof) * betafn(0.5, dof/2))) *
    Math.pow(1 + ((x * x) / dof), -((dof + 1) / 2));
}

export function cdf(x, dof) {
  var dof2 = dof / 2;
  return ibeta((x + Math.sqrt(x * x + dof)) /
    (2 * Math.sqrt(x * x + dof)), dof2, dof2);
}

export function inv(p, dof) {
  var x = ibetainv(2 * Math.min(p, 1 - p), 0.5 * dof, 0.5);
  x = Math.sqrt(dof * (1 - x) / x);
  return (p > 0.5) ? x : -x;
}

export function mean(dof) {
  return (dof > 1) ? 0 : undefined;
}

export function median(/*dof*/) {
  return 0;
}

export function mode(/*dof*/) {
  return 0;
}

export function sample(dof) {
  return randn() * Math.sqrt(dof / (2 * randg(dof / 2)));
}

export function variance(dof) {
  return (dof  > 2) ? dof / (dof - 2) : (dof > 1) ? Infinity : undefined;
}
