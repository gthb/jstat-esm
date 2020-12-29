"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cdf = cdf;
exports.inv = inv;

var _normal = require("./normal");

var _special = require("./special");

function tukeyWprob(w, rr, cc) {
  var nleg = 12;
  var ihalf = 6;
  var C1 = -30;
  var C2 = -50;
  var C3 = 60;
  var bb = 8;
  var wlar = 3;
  var wincr1 = 2;
  var wincr2 = 3;
  var xleg = [0.981560634246719250690549090149, 0.904117256370474856678465866119, 0.769902674194304687036893833213, 0.587317954286617447296702418941, 0.367831498998180193752691536644, 0.125233408511468915472441369464];
  var aleg = [0.047175336386511827194615961485, 0.106939325995318430960254718194, 0.160078328543346226334652529543, 0.203167426723065921749064455810, 0.233492536538354808760849898925, 0.249147045813402785000562436043];
  var qsqz = w * 0.5; // if w >= 16 then the integral lower bound (occurs for c=20)
  // is 0.99999999999995 so return a value of 1.

  if (qsqz >= bb) return 1.0; // find (f(w/2) - 1) ^ cc
  // (first term in integral of hartley's form).

  var pr_w = 2 * (0, _normal.cdf)(qsqz, 0, 1, 1, 0) - 1; // erf(qsqz / M_SQRT2)
  // if pr_w ^ cc < 2e-22 then set pr_w = 0

  if (pr_w >= Math.exp(C2 / cc)) pr_w = Math.pow(pr_w, cc);else pr_w = 0.0; // if w is large then the second component of the
  // integral is small, so fewer intervals are needed.

  var wincr;
  if (w > wlar) wincr = wincr1;else wincr = wincr2; // find the integral of second term of hartley's form
  // for the integral of the range for equal-length
  // intervals using legendre quadrature.  limits of
  // integration are from (w/2, 8).  two or three
  // equal-length intervals are used.
  // blb and bub are lower and upper limits of integration.

  var blb = qsqz;
  var binc = (bb - qsqz) / wincr;
  var bub = blb + binc;
  var einsum = 0.0; // integrate over each interval

  var cc1 = cc - 1.0;

  for (var wi = 1; wi <= wincr; wi++) {
    var elsum = 0.0;
    var a = 0.5 * (bub + blb); // legendre quadrature with order = nleg

    var b = 0.5 * (bub - blb);

    for (var jj = 1; jj <= nleg; jj++) {
      var j, xx;

      if (ihalf < jj) {
        j = nleg - jj + 1;
        xx = xleg[j - 1];
      } else {
        j = jj;
        xx = -xleg[j - 1];
      }

      var c = b * xx;
      var ac = a + c; // if exp(-qexpo/2) < 9e-14,
      // then doesn't contribute to integral

      var qexpo = ac * ac;
      if (qexpo > C3) break;
      var pplus = 2 * (0, _normal.cdf)(ac, 0, 1, 1, 0);
      var pminus = 2 * (0, _normal.cdf)(ac, w, 1, 1, 0); // if rinsum ^ (cc-1) < 9e-14,
      // then doesn't contribute to integral

      var rinsum = pplus * 0.5 - pminus * 0.5;

      if (rinsum >= Math.exp(C1 / cc1)) {
        rinsum = aleg[j - 1] * Math.exp(-(0.5 * qexpo)) * Math.pow(rinsum, cc1);
        elsum += rinsum;
      }
    }

    elsum *= 2.0 * b * cc / Math.sqrt(2 * Math.PI);
    einsum += elsum;
    blb = bub;
    bub += binc;
  } // if pr_w ^ rr < 9e-14, then return 0


  pr_w += einsum;
  if (pr_w <= Math.exp(C1 / rr)) return 0;
  pr_w = Math.pow(pr_w, rr);
  if (pr_w >= 1) // 1 was iMax was eps
    return 1;
  return pr_w;
}

function tukeyQinv(p, c, v) {
  var p0 = 0.322232421088;
  var q0 = 0.993484626060e-01;
  var p1 = -1.0;
  var q1 = 0.588581570495;
  var p2 = -0.342242088547;
  var q2 = 0.531103462366;
  var p3 = -0.204231210125;
  var q3 = 0.103537752850;
  var p4 = -0.453642210148e-04;
  var q4 = 0.38560700634e-02;
  var c1 = 0.8832;
  var c2 = 0.2368;
  var c3 = 1.214;
  var c4 = 1.208;
  var c5 = 1.4142;
  var vmax = 120.0;
  var ps = 0.5 - 0.5 * p;
  var yi = Math.sqrt(Math.log(1.0 / (ps * ps)));
  var t = yi + ((((yi * p4 + p3) * yi + p2) * yi + p1) * yi + p0) / ((((yi * q4 + q3) * yi + q2) * yi + q1) * yi + q0);
  if (v < vmax) t += (t * t * t + t) / v / 4.0;
  var q = c1 - c2 * t;
  if (v < vmax) q += -c3 / v + c4 * t / v;
  return t * (q * Math.log(c - 1.0) + c5);
}

function cdf(q, nmeans, df) {
  // Identical implementation as the R ptukey() function as of commit 68947
  var rr = 1;
  var cc = nmeans;
  var nlegq = 16;
  var ihalfq = 8;
  var eps1 = -30.0;
  var eps2 = 1.0e-14;
  var dhaf = 100.0;
  var dquar = 800.0;
  var deigh = 5000.0;
  var dlarg = 25000.0;
  var ulen1 = 1.0;
  var ulen2 = 0.5;
  var ulen3 = 0.25;
  var ulen4 = 0.125;
  var xlegq = [0.989400934991649932596154173450, 0.944575023073232576077988415535, 0.865631202387831743880467897712, 0.755404408355003033895101194847, 0.617876244402643748446671764049, 0.458016777657227386342419442984, 0.281603550779258913230460501460, 0.950125098376374401853193354250e-1];
  var alegq = [0.271524594117540948517805724560e-1, 0.622535239386478928628438369944e-1, 0.951585116824927848099251076022e-1, 0.124628971255533872052476282192, 0.149595988816576732081501730547, 0.169156519395002538189312079030, 0.182603415044923588866763667969, 0.189450610455068496285396723208];
  if (q <= 0) return 0; // df must be > 1
  // there must be at least two values

  if (df < 2 || rr < 1 || cc < 2) return NaN;
  if (!Number.isFinite(q)) return 1;
  if (df > dlarg) return tukeyWprob(q, rr, cc); // calculate leading constant

  var f2 = df * 0.5;
  var f2lf = f2 * Math.log(df) - df * Math.log(2) - (0, _special.gammaln)(f2);
  var f21 = f2 - 1.0; // integral is divided into unit, half-unit, quarter-unit, or
  // eighth-unit length intervals depending on the value of the
  // degrees of freedom.

  var ff4 = df * 0.25;
  var ulen;
  if (df <= dhaf) ulen = ulen1;else if (df <= dquar) ulen = ulen2;else if (df <= deigh) ulen = ulen3;else ulen = ulen4;
  f2lf += Math.log(ulen); // integrate over each subinterval

  var ans = 0.0;

  for (var i = 1; i <= 50; i++) {
    var otsum = 0.0; // legendre quadrature with order = nlegq
    // nodes (stored in xlegq) are symmetric around zero.

    var twa1 = (2 * i - 1) * ulen;

    for (var jj = 1; jj <= nlegq; jj++) {
      var j, t1;

      if (ihalfq < jj) {
        j = jj - ihalfq - 1;
        t1 = f2lf + f21 * Math.log(twa1 + xlegq[j] * ulen) - (xlegq[j] * ulen + twa1) * ff4;
      } else {
        j = jj - 1;
        t1 = f2lf + f21 * Math.log(twa1 - xlegq[j] * ulen) + (xlegq[j] * ulen - twa1) * ff4;
      } // if exp(t1) < 9e-14, then doesn't contribute to integral


      var qsqz;

      if (t1 >= eps1) {
        if (ihalfq < jj) {
          qsqz = q * Math.sqrt((xlegq[j] * ulen + twa1) * 0.5);
        } else {
          qsqz = q * Math.sqrt((-(xlegq[j] * ulen) + twa1) * 0.5);
        } // call wprob to find integral of range portion


        var wprb = tukeyWprob(qsqz, rr, cc);
        var rotsum = wprb * alegq[j] * Math.exp(t1);
        otsum += rotsum;
      } // end legendre integral for interval i
      // L200:

    } // if integral for interval i < 1e-14, then stop.
    // However, in order to avoid small area under left tail,
    // at least  1 / ulen  intervals are calculated.


    if (i * ulen >= 1.0 && otsum <= eps2) break; // end of interval i
    // L330:

    ans += otsum;
  }

  if (otsum > eps2) {
    // not converged
    throw new Error('tukey.cdf failed to converge');
  }

  if (ans > 1) ans = 1;
  return ans;
}

function inv(p, nmeans, df) {
  // Identical implementation as the R qtukey() function as of commit 68947
  var rr = 1;
  var cc = nmeans;
  var eps = 0.0001;
  var maxiter = 50; // df must be > 1 ; there must be at least two values

  if (df < 2 || rr < 1 || cc < 2) return NaN;
  if (p < 0 || p > 1) return NaN;
  if (p === 0) return 0;
  if (p === 1) return Infinity; // Initial value

  var x0 = tukeyQinv(p, cc, df); // Find prob(value < x0)

  var valx0 = cdf(x0, nmeans, df) - p; // Find the second iterate and prob(value < x1).
  // If the first iterate has probability value
  // exceeding p then second iterate is 1 less than
  // first iterate; otherwise it is 1 greater.

  var x1;
  if (valx0 > 0.0) x1 = Math.max(0.0, x0 - 1.0);else x1 = x0 + 1.0;
  var valx1 = cdf(x1, nmeans, df) - p; // Find new iterate

  var ans;

  for (var iter = 1; iter < maxiter; iter++) {
    ans = x1 - valx1 * (x1 - x0) / (valx1 - valx0);
    valx0 = valx1; // New iterate must be >= 0

    x0 = x1;

    if (ans < 0.0) {
      ans = 0.0;
      valx1 = -p;
    } // Find prob(value < new iterate)


    valx1 = cdf(ans, nmeans, df) - p;
    x1 = ans; // If the difference between two successive
    // iterates is less than eps, stop

    var xabs = Math.abs(x1 - x0);
    if (xabs < eps) return ans;
  }

  throw new Error('tukey.inv failed to converge');
}