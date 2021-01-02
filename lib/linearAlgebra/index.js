"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.add = add;
exports.subtract = subtract;
exports.divide = divide;
exports.multiply = multiply;
exports.outer = outer;
exports.dot = dot;
exports.pow = pow;
exports.exp = exp;
exports.log = log;
exports.abs = abs;
exports.norm = norm;
exports.angle = angle;
exports.aug = aug;
exports.inv = inv;
exports.det = det;
exports.gauss_elimination = gauss_elimination;
exports.gauss_jordan = gauss_jordan;
exports.triaUpSolve = triaUpSolve;
exports.triaLowSolve = triaLowSolve;
exports.lu = lu;
exports.cholesky = cholesky;
exports.gauss_jacobi = gauss_jacobi;
exports.gauss_seidel = gauss_seidel;
exports.SOR = SOR;
exports.householder = householder;
exports.QR = QR;
exports.lstsq = lstsq;
exports.jacobi = jacobi;
exports.rungekutta = rungekutta;
exports.romberg = romberg;
exports.richardson = richardson;
exports.simpson = simpson;
exports.hermite = hermite;
exports.lagrange = lagrange;
exports.cubic_spline = cubic_spline;
exports.gauss_quadrature = gauss_quadrature;
exports.PCA = PCA;

var _helpers = require("../core/helpers");

var _core = require("../core");

var _vector = require("../vector");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function isUsable(arg) {
  return (0, _helpers.isArray)(arg) || arg.constructor.name === 'jStat';
} // add a vector/matrix to a vector/matrix or scalar


function add(arr, arg) {
  // check if arg is a vector or scalar
  if (isUsable(arg)) {
    if (!isUsable(arg[0])) arg = [arg];
    return (0, _core.map)(arr, function (value, row, col) {
      return value + arg[row][col];
    });
  }

  return (0, _core.map)(arr, function (value) {
    return value + arg;
  });
} // subtract a vector or scalar from the vector


function subtract(arr, arg) {
  // check if arg is a vector or scalar
  if (isUsable(arg)) {
    if (!isUsable(arg[0])) arg = [arg];
    return (0, _core.map)(arr, function (value, row, col) {
      return value - arg[row][col] || 0;
    });
  }

  return (0, _core.map)(arr, function (value) {
    return value - arg;
  });
} // matrix division


function divide(arr, arg) {
  if (isUsable(arg)) {
    if (!isUsable(arg[0])) arg = [arg];
    return multiply(arr, inv(arg));
  }

  return (0, _core.map)(arr, function (value) {
    return value / arg;
  });
} // matrix multiplication


function multiply(arr, arg) {
  var nrescols, sum; // eg: arr = 2 arg = 3 -> 6 for res[0][0] statement closure

  if (arr.length === undefined && arg.length === undefined) {
    return arr * arg;
  }

  var nrow = arr.length,
      ncol = arr[0].length,
      res = (0, _core.zeros)(nrow, nrescols = isUsable(arg) ? arg[0].length : ncol);
  var rescols = 0;

  if (isUsable(arg)) {
    for (; rescols < nrescols; rescols++) {
      for (var row = 0; row < nrow; row++) {
        sum = 0;

        for (var col = 0; col < ncol; col++) {
          sum += arr[row][col] * arg[col][rescols];
        }

        res[row][rescols] = sum;
      }
    }

    return nrow === 1 && rescols === 1 ? res[0][0] : res;
  }

  return (0, _core.map)(arr, function (value) {
    return value * arg;
  });
} // outer([1,2,3],[4,5,6])
// ===
// [[1],[2],[3]] times [[4,5,6]]
// ->
// [[4,5,6],[8,10,12],[12,15,18]]


function outer(A, B) {
  return multiply(A.map(function (t) {
    return [t];
  }), [B]);
} // Returns the dot product of two matricies


function dot(arr, arg) {
  if (!isUsable(arr[0])) arr = [arr];
  if (!isUsable(arg[0])) arg = [arg]; // convert column to row vector

  var left = arr[0].length === 1 && arr.length !== 1 ? (0, _core.transpose)(arr) : arr,
      right = arg[0].length === 1 && arg.length !== 1 ? (0, _core.transpose)(arg) : arg,
      res = [],
      nrow = left.length,
      ncol = left[0].length,
      sum,
      col;

  for (var row = 0; row < nrow; row++) {
    res[row] = [];
    sum = 0;

    for (col = 0; col < ncol; col++) {
      sum += left[row][col] * right[row][col];
    }

    res[row] = sum;
  }

  return res.length === 1 ? res[0] : res;
} // raise every element by a scalar


function pow(arr, arg) {
  return (0, _core.map)(arr, function (value) {
    return Math.pow(value, arg);
  });
} // exponentiate every element


function exp(arr) {
  return (0, _core.map)(arr, function (value) {
    return Math.exp(value);
  });
} // generate the natural log of every element


function log(arr) {
  return (0, _core.map)(arr, function (value) {
    return Math.log(value);
  });
} // generate the absolute values of the vector


function abs(arr) {
  return (0, _core.map)(arr, function (value) {
    return Math.abs(value);
  });
} // computes the p-norm of the vector
// In the case that a matrix is passed, uses the first row as the vector


function norm(arr, p) {
  var nnorm = 0,
      i = 0; // check the p-value of the norm, and set for most common case

  if (isNaN(p)) p = 2; // check if multi-dimensional array, and make vector correction

  if (isUsable(arr[0])) arr = arr[0]; // vector norm

  for (; i < arr.length; i++) {
    nnorm += Math.pow(Math.abs(arr[i]), p);
  }

  return Math.pow(nnorm, 1 / p);
} // computes the angle between two vectors in rads
// In case a matrix is passed, this uses the first row as the vector


function angle(arr, arg) {
  return Math.acos(dot(arr, arg) / (norm(arr) * norm(arg)));
} // augment one matrix by another
// Note: this function returns a matrix, not a jStat object


function aug(a, b) {
  var newarr = [];
  var i;

  for (i = 0; i < a.length; i++) {
    newarr.push(a[i].slice());
  }

  for (i = 0; i < newarr.length; i++) {
    Array.prototype.push.apply(newarr[i], b[i]);
  }

  return newarr;
} // The inv() function calculates the inverse of a matrix
// Create the inverse by augmenting the matrix by the identity matrix of the
// appropriate size, and then use G-J elimination on the augmented matrix.


function inv(a) {
  var rows = a.length;
  var cols = a[0].length;
  var b = (0, _core.identity)(rows, cols);
  var c = gauss_jordan(a, b);
  var result = [];
  var i = 0;
  var j; //We need to copy the inverse portion to a new matrix to rid G-J artifacts

  for (; i < rows; i++) {
    result[i] = [];

    for (j = cols; j < c[0].length; j++) {
      result[i][j - cols] = c[i][j];
    }
  }

  return result;
} // calculate the determinant of a matrix


function det(a) {
  var alen = a.length,
      alend = alen * 2,
      vals = new Array(alend),
      rowshift = alen - 1,
      colshift = alend - 1,
      mrow = rowshift - alen + 1,
      mcol = colshift,
      i = 0,
      result = 0,
      j; // check for special 2x2 case

  if (alen === 2) {
    return a[0][0] * a[1][1] - a[0][1] * a[1][0];
  }

  for (; i < alend; i++) {
    vals[i] = 1;
  }

  for (i = 0; i < alen; i++) {
    for (j = 0; j < alen; j++) {
      vals[mrow < 0 ? mrow + alen : mrow] *= a[i][j];
      vals[mcol < alen ? mcol + alen : mcol] *= a[i][j];
      mrow++;
      mcol--;
    }

    mrow = --rowshift - alen + 1;
    mcol = --colshift;
  }

  for (i = 0; i < alen; i++) {
    result += vals[i];
  }

  for (; i < alend; i++) {
    result -= vals[i];
  }

  return result;
}

function gauss_elimination(a, b) {
  var i = 0,
      j = 0,
      n = a.length,
      m = a[0].length,
      factor = 1,
      sum = 0,
      x = [],
      maug,
      pivot,
      temp,
      k;
  a = aug(a, b);
  maug = a[0].length;

  for (i = 0; i < n; i++) {
    pivot = a[i][i];
    j = i;

    for (k = i + 1; k < m; k++) {
      if (pivot < Math.abs(a[k][i])) {
        pivot = a[k][i];
        j = k;
      }
    }

    if (j != i) {
      for (k = 0; k < maug; k++) {
        temp = a[i][k];
        a[i][k] = a[j][k];
        a[j][k] = temp;
      }
    }

    for (j = i + 1; j < n; j++) {
      factor = a[j][i] / a[i][i];

      for (k = i; k < maug; k++) {
        a[j][k] = a[j][k] - factor * a[i][k];
      }
    }
  }

  for (i = n - 1; i >= 0; i--) {
    sum = 0;

    for (j = i + 1; j <= n - 1; j++) {
      sum = sum + x[j] * a[i][j];
    }

    x[i] = (a[i][maug - 1] - sum) / a[i][i];
  }

  return x;
}

function gauss_jordan(a, b) {
  var m = aug(a, b);
  var h = m.length;
  var w = m[0].length;
  var c = 0;
  var x, y, y2; // find max pivot

  for (y = 0; y < h; y++) {
    var maxrow = y;

    for (y2 = y + 1; y2 < h; y2++) {
      if (Math.abs(m[y2][y]) > Math.abs(m[maxrow][y])) maxrow = y2;
    }

    var tmp = m[y];
    m[y] = m[maxrow];
    m[maxrow] = tmp;

    for (y2 = y + 1; y2 < h; y2++) {
      c = m[y2][y] / m[y][y];

      for (x = y; x < w; x++) {
        m[y2][x] -= m[y][x] * c;
      }
    }
  } // backsubstitute


  for (y = h - 1; y >= 0; y--) {
    c = m[y][y];

    for (y2 = 0; y2 < y; y2++) {
      for (x = w - 1; x > y - 1; x--) {
        m[y2][x] -= m[y][x] * m[y2][y] / c;
      }
    }

    m[y][y] /= c;

    for (x = h; x < w; x++) {
      m[y][x] /= c;
    }
  }

  return m;
} // solve equation
// Ax=b
// A is upper triangular matrix
// A=[[1,2,3],[0,4,5],[0,6,7]]
// b=[1,2,3]
// triaUpSolve(A,b) // -> [2.666,0.1666,1.666]
// if you use matrix style
// A=[[1,2,3],[0,4,5],[0,6,7]]
// b=[[1],[2],[3]]
// will return [[2.666],[0.1666],[1.666]]


function triaUpSolve(A, b) {
  var size = A[0].length;
  var x = (0, _core.zeros)(1, size)[0];
  var parts;
  var matrix_mode = false;

  if (b[0].length != undefined) {
    b = b.map(function (i) {
      return i[0];
    });
    matrix_mode = true;
  }

  (0, _core.arange)(size - 1, -1, -1).forEach(function (i) {
    parts = (0, _core.arange)(i + 1, size).map(function (j) {
      return x[j] * A[i][j];
    });
    x[i] = (b[i] - (0, _vector.sum)(parts)) / A[i][i];
  });
  if (matrix_mode) return x.map(function (i) {
    return [i];
  });
  return x;
}

function triaLowSolve(A, b) {
  // like to triaUpSolve but A is lower triangular matrix
  var size = A[0].length;
  var x = (0, _core.zeros)(1, size)[0];
  var parts;
  var matrix_mode = false;

  if (b[0].length != undefined) {
    b = b.map(function (i) {
      return i[0];
    });
    matrix_mode = true;
  }

  (0, _core.arange)(size).forEach(function (i) {
    parts = (0, _core.arange)(i).map(function (j) {
      return A[i][j] * x[j];
    });
    x[i] = (b[i] - (0, _vector.sum)(parts)) / A[i][i];
  });
  if (matrix_mode) return x.map(function (i) {
    return [i];
  });
  return x;
} // A -> [L,U]
// A=LU
// L is lower triangular matrix
// U is upper triangular matrix


function lu(A) {
  var size = A.length; //var L=jStat.diagonal(jStat.ones(1,size)[0]);

  var L = (0, _core.identity)(size);
  var R = (0, _core.zeros)(A.length, A[0].length);
  var parts;
  (0, _core.arange)(size).forEach(function (t) {
    R[0][t] = A[0][t];
  });
  (0, _core.arange)(1, size).forEach(function (l) {
    (0, _core.arange)(l).forEach(function (i) {
      parts = (0, _core.arange)(i).map(function (jj) {
        return L[l][jj] * R[jj][i];
      });
      L[l][i] = (A[l][i] - (0, _vector.sum)(parts)) / R[i][i];
    });
    (0, _core.arange)(l, size).forEach(function (j) {
      parts = (0, _core.arange)(l).map(function (jj) {
        return L[l][jj] * R[jj][j];
      });
      R[l][j] = A[parts.length][j] - (0, _vector.sum)(parts);
    });
  });
  return [L, R];
} // A -> T
// A=TT'
// T is lower triangular matrix


function cholesky(A) {
  var size = A.length;
  var T = (0, _core.zeros)(A.length, A[0].length);
  var parts;
  (0, _core.arange)(size).forEach(function (i) {
    parts = (0, _core.arange)(i).map(function (t) {
      return Math.pow(T[i][t], 2);
    });
    T[i][i] = Math.sqrt(A[i][i] - (0, _vector.sum)(parts));
    (0, _core.arange)(i + 1, size).forEach(function (j) {
      parts = (0, _core.arange)(i).map(function (t) {
        return T[i][t] * T[j][t];
      });
      T[j][i] = (A[i][j] - (0, _vector.sum)(parts)) / T[i][i];
    });
  });
  return T;
}

function gauss_jacobi(a, b, x, r) {
  var i = 0;
  var j = 0;
  var n = a.length;
  var l = [];
  var u = [];
  var d = [];
  var xv, c, h, xk;

  for (; i < n; i++) {
    l[i] = [];
    u[i] = [];
    d[i] = [];

    for (j = 0; j < n; j++) {
      if (i > j) {
        l[i][j] = a[i][j];
        u[i][j] = d[i][j] = 0;
      } else if (i < j) {
        u[i][j] = a[i][j];
        l[i][j] = d[i][j] = 0;
      } else {
        d[i][j] = a[i][j];
        l[i][j] = u[i][j] = 0;
      }
    }
  }

  h = multiply(multiply(inv(d), add(l, u)), -1);
  c = multiply(inv(d), b);
  xv = x;
  xk = add(multiply(h, x), c);
  i = 2;

  while (Math.abs(norm(subtract(xk, xv))) > r) {
    xv = xk;
    xk = add(multiply(h, xv), c);
    i++;
  }

  return xk;
}

function gauss_seidel(a, b, x, r) {
  var i = 0;
  var n = a.length;
  var l = [];
  var u = [];
  var d = [];
  var j, xv, c, h, xk;

  for (; i < n; i++) {
    l[i] = [];
    u[i] = [];
    d[i] = [];

    for (j = 0; j < n; j++) {
      if (i > j) {
        l[i][j] = a[i][j];
        u[i][j] = d[i][j] = 0;
      } else if (i < j) {
        u[i][j] = a[i][j];
        l[i][j] = d[i][j] = 0;
      } else {
        d[i][j] = a[i][j];
        l[i][j] = u[i][j] = 0;
      }
    }
  }

  h = multiply(multiply(inv(add(d, l)), u), -1);
  c = multiply(inv(add(d, l)), b);
  xv = x;
  xk = add(multiply(h, x), c);
  i = 2;

  while (Math.abs(norm(subtract(xk, xv))) > r) {
    xv = xk;
    xk = add(multiply(h, xv), c);
    i = i + 1;
  }

  return xk;
}

function SOR(a, b, x, r, w) {
  var i = 0;
  var n = a.length;
  var l = [];
  var u = [];
  var d = [];
  var j, xv, c, h, xk;

  for (; i < n; i++) {
    l[i] = [];
    u[i] = [];
    d[i] = [];

    for (j = 0; j < n; j++) {
      if (i > j) {
        l[i][j] = a[i][j];
        u[i][j] = d[i][j] = 0;
      } else if (i < j) {
        u[i][j] = a[i][j];
        l[i][j] = d[i][j] = 0;
      } else {
        d[i][j] = a[i][j];
        l[i][j] = u[i][j] = 0;
      }
    }
  }

  h = multiply(inv(add(d, multiply(l, w))), subtract(multiply(d, 1 - w), multiply(u, w)));
  c = multiply(multiply(inv(add(d, multiply(l, w))), b), w);
  xv = x;
  xk = add(multiply(h, x), c);
  i = 2;

  while (Math.abs(norm(subtract(xk, xv))) > r) {
    xv = xk;
    xk = add(multiply(h, xv), c);
    i++;
  }

  return xk;
}

function householder(a) {
  var m = a.length;
  var n = a[0].length;
  var i = 0;
  var w = [];
  var p = [];
  var alpha, r, k, j, factor;

  for (; i < m - 1; i++) {
    alpha = 0;

    for (j = i + 1; j < n; j++) {
      alpha += a[j][i] * a[j][i];
    }

    factor = a[i + 1][i] > 0 ? -1 : 1;
    alpha = factor * Math.sqrt(alpha);
    r = Math.sqrt((alpha * alpha - a[i + 1][i] * alpha) / 2);
    w = (0, _core.zeros)(m, 1);
    w[i + 1][0] = (a[i + 1][i] - alpha) / (2 * r);

    for (k = i + 2; k < m; k++) {
      w[k][0] = a[k][i] / (2 * r);
    }

    p = subtract((0, _core.identity)(m, n), multiply(multiply(w, (0, _core.transpose)(w)), 2));
    a = multiply(p, multiply(a, p));
  }

  return a;
} // A -> [Q,R]
// Q is orthogonal matrix
// R is upper triangular
// x -> Q
// find a orthogonal matrix Q st.
// Qx=y
// y is [||x||,0,0,...]


function QR(x) {
  // quick impletation
  // https://www.stat.wisc.edu/~larget/math496/qr.html
  var n = x.length;
  var p = x[0].length;
  var r = (0, _core.zeros)(p, p);
  x = (0, _core.copy)(x);
  var i, j, k;

  for (j = 0; j < p; j++) {
    r[j][j] = Math.sqrt((0, _vector.sum)((0, _core.arange)(n).map(function (i) {
      return x[i][j] * x[i][j];
    })));

    for (i = 0; i < n; i++) {
      x[i][j] = x[i][j] / r[j][j];
    }

    for (k = j + 1; k < p; k++) {
      r[j][k] = (0, _vector.sum)((0, _core.arange)(n).map(function (i) {
        return x[i][j] * x[i][k];
      }));

      for (i = 0; i < n; i++) {
        x[i][k] = x[i][k] - x[i][j] * r[j][k];
      }
    }
  }

  return [x, r];
} // solve least squard problem for Ax=b as QR decomposition way if b is
// [[b1],[b2],[b3]] form will return [[x1],[x2],[x3]] array form solution
// else b is [b1,b2,b3] form will return [x1,x2,x3] array form solution


function R_I(A) {
  A = (0, _core.copy)(A);
  var size = A.length;
  var I = (0, _core.identity)(size);
  (0, _core.arange)(size - 1, -1, -1).forEach(function (i) {
    (0, _core.sliceAssign)(I, {
      row: i
    }, divide((0, _core.slice)(I, {
      row: i
    }), A[i][i]));
    (0, _core.sliceAssign)(A, {
      row: i
    }, divide((0, _core.slice)(A, {
      row: i
    }), A[i][i]));
    (0, _core.arange)(i).forEach(function (j) {
      var c = multiply(A[j][i], -1);
      var Aj = (0, _core.slice)(A, {
        row: j
      });
      var cAi = multiply((0, _core.slice)(A, {
        row: i
      }), c);
      (0, _core.sliceAssign)(A, {
        row: j
      }, add(Aj, cAi));
      var Ij = (0, _core.slice)(I, {
        row: j
      });
      var cIi = multiply((0, _core.slice)(I, {
        row: i
      }), c);
      (0, _core.sliceAssign)(I, {
        row: j
      }, add(Ij, cIi));
    });
  });
  return I;
}

function lstsq(A, b) {
  var array_mode = false;

  if (b[0].length === undefined) {
    // [c1,c2,c3] mode
    b = b.map(function (x) {
      return [x];
    });
    array_mode = true;
  }

  var _QR = QR(A),
      _QR2 = _slicedToArray(_QR, 2),
      Q = _QR2[0],
      R = _QR2[1];

  var attrs = A[0].length;
  var Q1 = (0, _core.slice)(Q, {
    col: {
      end: attrs
    }
  });
  var R1 = (0, _core.slice)(R, {
    row: {
      end: attrs
    }
  });
  var RI = R_I(R1);
  var Q2 = (0, _core.transpose)(Q1);

  if (Q2[0].length === undefined) {
    Q2 = [Q2]; // The confusing jStat.multifly implementation threat nature process again.
  }

  var x = multiply(multiply(RI, Q2), b);

  if (x.length === undefined) {
    x = [[x]]; // The confusing jStat.multifly implementation threat nature process again.
  }

  if (array_mode) return x.map(function (i) {
    return i[0];
  });
  return x;
}

function jacobi(a) {
  var condition = 1;
  var n = a.length;
  var e = (0, _core.identity)(n, n);
  var ev = [];
  var b, i, j, p, q, maxim, theta, s; // condition === 1 only if tolerance is not reached

  while (condition === 1) {
    maxim = a[0][1];
    p = 0;
    q = 1;

    for (i = 0; i < n; i++) {
      for (j = 0; j < n; j++) {
        if (i != j) {
          if (maxim < Math.abs(a[i][j])) {
            maxim = Math.abs(a[i][j]);
            p = i;
            q = j;
          }
        }
      }
    }

    if (a[p][p] === a[q][q]) theta = a[p][q] > 0 ? Math.PI / 4 : -Math.PI / 4;else theta = Math.atan(2 * a[p][q] / (a[p][p] - a[q][q])) / 2;
    s = (0, _core.identity)(n, n);
    s[p][p] = Math.cos(theta);
    s[p][q] = -Math.sin(theta);
    s[q][p] = Math.sin(theta);
    s[q][q] = Math.cos(theta); // eigen vector matrix

    e = multiply(e, s);
    b = multiply(multiply(inv(s), a), s);
    a = b;
    condition = 0;

    for (i = 1; i < n; i++) {
      for (j = 1; j < n; j++) {
        if (i != j && Math.abs(a[i][j]) > 0.001) {
          condition = 1;
        }
      }
    }
  }

  for (i = 0; i < n; i++) {
    ev.push(a[i][i]);
  } //returns both the eigenvalue and eigenmatrix


  return [e, ev];
}

function rungekutta(f, h, p, t_j, u_j, order) {
  var k1, k2, u_j1, k3, k4;

  if (order === 2) {
    while (t_j <= p) {
      k1 = h * f(t_j, u_j);
      k2 = h * f(t_j + h, u_j + k1);
      u_j1 = u_j + (k1 + k2) / 2;
      u_j = u_j1;
      t_j = t_j + h;
    }
  }

  if (order === 4) {
    while (t_j <= p) {
      k1 = h * f(t_j, u_j);
      k2 = h * f(t_j + h / 2, u_j + k1 / 2);
      k3 = h * f(t_j + h / 2, u_j + k2 / 2);
      k4 = h * f(t_j + h, u_j + k3);
      u_j1 = u_j + (k1 + 2 * k2 + 2 * k3 + k4) / 6;
      u_j = u_j1;
      t_j = t_j + h;
    }
  }

  return u_j;
}

function romberg(f, a, b, order) {
  var i = 0;
  var h = (b - a) / 2;
  var x = [];
  var h1 = [];
  var g = [];
  var m, a1, j, k, I;

  while (i < order / 2) {
    I = f(a);

    for (j = a, k = 0; j <= b; j = j + h, k++) {
      x[k] = j;
    }

    m = x.length;

    for (j = 1; j < m - 1; j++) {
      I += (j % 2 !== 0 ? 4 : 2) * f(x[j]);
    }

    I = h / 3 * (I + f(b));
    g[i] = I;
    h /= 2;
    i++;
  }

  a1 = g.length;
  m = 1;

  while (a1 !== 1) {
    for (j = 0; j < a1 - 1; j++) {
      h1[j] = (Math.pow(4, m) * g[j + 1] - g[j]) / (Math.pow(4, m) - 1);
    }

    a1 = h1.length;
    g = h1;
    h1 = [];
    m++;
  }

  return g;
}

function richardson(X, f, x, h) {
  function pos(X, x) {
    var i = 0;
    var n = X.length;
    var p;

    for (; i < n; i++) {
      if (X[i] === x) p = i;
    }

    return p;
  }

  var h_min = Math.abs(x - X[pos(X, x) + 1]);
  var i = 0;
  var g = [];
  var h1 = [];
  var y1, y2, m, a, j;

  while (h >= h_min) {
    y1 = pos(X, x + h);
    y2 = pos(X, x);
    g[i] = (f[y1] - 2 * f[y2] + f[2 * y2 - y1]) / (h * h);
    h /= 2;
    i++;
  }

  a = g.length;
  m = 1;

  while (a != 1) {
    for (j = 0; j < a - 1; j++) {
      h1[j] = (Math.pow(4, m) * g[j + 1] - g[j]) / (Math.pow(4, m) - 1);
    }

    a = h1.length;
    g = h1;
    h1 = [];
    m++;
  }

  return g;
}

function simpson(f, a, b, n) {
  var h = (b - a) / n;
  var I = f(a);
  var x = [];
  var j = a;
  var k = 0;
  var i = 1;
  var m;

  for (; j <= b; j = j + h, k++) {
    x[k] = j;
  }

  m = x.length;

  for (; i < m - 1; i++) {
    I += (i % 2 !== 0 ? 4 : 2) * f(x[i]);
  }

  return h / 3 * (I + f(b));
}

function hermite(X, F, dF, value) {
  var n = X.length;
  var p = 0;
  var i = 0;
  var l = [];
  var dl = [];
  var A = [];
  var B = [];
  var j;

  for (; i < n; i++) {
    l[i] = 1;

    for (j = 0; j < n; j++) {
      if (i != j) l[i] *= (value - X[j]) / (X[i] - X[j]);
    }

    dl[i] = 0;

    for (j = 0; j < n; j++) {
      if (i != j) dl[i] += 1 / (X[i] - X[j]);
    }

    A[i] = (1 - 2 * (value - X[i]) * dl[i]) * (l[i] * l[i]);
    B[i] = (value - X[i]) * (l[i] * l[i]);
    p += A[i] * F[i] + B[i] * dF[i];
  }

  return p;
}

function lagrange(X, F, value) {
  var p = 0;
  var i = 0;
  var j, l;
  var n = X.length;

  for (; i < n; i++) {
    l = F[i];

    for (j = 0; j < n; j++) {
      // calculating the lagrange polynomial L_i
      if (i != j) l *= (value - X[j]) / (X[i] - X[j]);
    } // adding the lagrange polynomials found above


    p += l;
  }

  return p;
}

function cubic_spline(X, F, value) {
  var n = X.length;
  var i = 0,
      j;
  var A = [];
  var B = [];
  var alpha = [];
  var c = [];
  var h = [];
  var b = [];
  var d = [];

  for (; i < n - 1; i++) {
    h[i] = X[i + 1] - X[i];
  }

  alpha[0] = 0;

  for (i = 1; i < n - 1; i++) {
    alpha[i] = 3 / h[i] * (F[i + 1] - F[i]) - 3 / h[i - 1] * (F[i] - F[i - 1]);
  }

  for (i = 1; i < n - 1; i++) {
    A[i] = [];
    B[i] = [];
    A[i][i - 1] = h[i - 1];
    A[i][i] = 2 * (h[i - 1] + h[i]);
    A[i][i + 1] = h[i];
    B[i][0] = alpha[i];
  }

  c = multiply(inv(A), B);

  for (j = 0; j < n - 1; j++) {
    b[j] = (F[j + 1] - F[j]) / h[j] - h[j] * (c[j + 1][0] + 2 * c[j][0]) / 3;
    d[j] = (c[j + 1][0] - c[j][0]) / (3 * h[j]);
  }

  for (j = 0; j < n; j++) {
    if (X[j] > value) break;
  }

  j -= 1;
  return F[j] + (value - X[j]) * b[j] + pow(value - X[j], 2) * c[j] + (value - X[j]) * pow(value - X[j], 2) * d[j];
}

function gauss_quadrature() {
  throw new Error('gauss_quadrature not yet implemented');
}

function PCA(X) {
  var m = X.length;
  var n = X[0].length;
  var i = 0;
  var j, temp1;
  var u = [];
  var D = [];
  var result = [];
  var temp2 = [];
  var Y = [];
  var Bt = [];
  var B = [];
  var C = [];
  var V = [];
  var Vt = [];

  for (i = 0; i < m; i++) {
    u[i] = (0, _vector.sum)(X[i]) / n;
  }

  for (i = 0; i < n; i++) {
    B[i] = [];

    for (j = 0; j < m; j++) {
      B[i][j] = X[j][i] - u[j];
    }
  }

  B = (0, _core.transpose)(B);

  for (i = 0; i < m; i++) {
    C[i] = [];

    for (j = 0; j < m; j++) {
      C[i][j] = dot([B[i]], [B[j]]) / (n - 1);
    }
  }

  result = jacobi(C);
  V = result[0];
  D = result[1];
  Vt = (0, _core.transpose)(V);

  for (i = 0; i < D.length; i++) {
    for (j = i; j < D.length; j++) {
      if (D[i] < D[j]) {
        temp1 = D[i];
        D[i] = D[j];
        D[j] = temp1;
        temp2 = Vt[i];
        Vt[i] = Vt[j];
        Vt[j] = temp2;
      }
    }
  }

  Bt = (0, _core.transpose)(B);

  for (i = 0; i < m; i++) {
    Y[i] = [];

    for (j = 0; j < Bt.length; j++) {
      Y[i][j] = dot([Vt[i]], [Bt[j]]);
    }
  }

  return [X, D, Vt, Y];
}