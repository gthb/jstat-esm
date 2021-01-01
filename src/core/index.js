import { calcRdx, isArray, isFunction, isNumber, toVector } from './helpers';

export const utils = {
  calcRdx: calcRdx,
  isArray: isArray,
  isFunction: isFunction,
  isNumber: isNumber,
  toVector: toVector
};

export let random_fn = Math.random;

export function setRandom(fn) {
  if (typeof fn !== 'function')
    throw new TypeError('fn is not a function');
  random_fn = fn;
}

// Returns the number of rows in the matrix.
export function rows(arr) {
  return arr.length || 1;
}

// Returns the number of columns in the matrix.
export function cols(arr) {
  return arr[0].length || 1;
}

// Returns the dimensions of the object { rows: i, cols: j }
export function dimensions(arr) {
  return {
    rows: rows(arr),
    cols: cols(arr)
  };
}

// Returns a specified row as a vector or return a sub matrix by pick some rows
export function row(arr, index) {
  if (isArray(index)) {
    return index.map(i => row(arr, i));
  }
  return arr[index];
}

// return row as array
// rowa([[1,2],[3,4]],0) -> [1,2]
export function rowa(arr, i) {
  return row(arr, i);
}

// Returns the specified column as a vector or return a sub matrix by pick some
// columns
export function col(arr, index) {
  if (isArray(index)) {
    const submat = arange(arr.length).map(() => new Array(index.length));
    index.forEach(function (ind, i) {
      arange(arr.length).forEach(function (j) {
        submat[j][i] = arr[j][ind];
      });
    });
    return submat;
  }
  const column = new Array(arr.length);
  for (let i = 0; i < arr.length; i++)
    column[i] = [arr[i][index]];
  return column;
}

// return column as array
// cola([[1,2],[3,4]],0) -> [1,3]
export function cola(arr, i) {
  return col(arr, i).map(a => a[0]);
}

// Returns the diagonal of the matrix
export function diag(arr) {
  const nrow = rows(arr);
  const res = new Array(nrow);
  for (let row = 0; row < nrow; row++)
    res[row] = [arr[row][row]];
  return res;
}

// Returns the anti-diagonal of the matrix
export function antidiag(arr) {
  var nrow = rows(arr) - 1;
  var res = new Array(nrow);
  for (var i = 0; nrow >= 0; nrow--, i++)
    res[i] = [arr[i][nrow]];
  return res;
}

// Transpose a matrix or array.
export function transpose(arr) {
  var obj = [];
  var objArr, rows, cols, j, i;

  // Make sure arr is in matrix format.
  if (!isArray(arr[0]))
    arr = [arr];

  rows = arr.length;
  cols = arr[0].length;

  for (i = 0; i < cols; i++) {
    objArr = new Array(rows);
    for (j = 0; j < rows; j++)
      objArr[j] = arr[j][i];
    obj.push(objArr);
  }

  // If obj is vector, return only single array.
  return obj.length === 1 ? obj[0] : obj;
}

// Map a function to an array or array of arrays.
// "toAlter" is an internal variable.
export function map(arr, func, toAlter) {
  var row, nrow, ncol, res, col;

  if (!isArray(arr[0]))
    arr = [arr];

  nrow = arr.length;
  ncol = arr[0].length;
  res = toAlter ? arr : new Array(nrow);

  for (row = 0; row < nrow; row++) {
    // if the row doesn't exist, create it
    if (!res[row])
      res[row] = new Array(ncol);
    for (col = 0; col < ncol; col++)
      res[row][col] = func(arr[row][col], row, col);
  }

  return res.length === 1 ? res[0] : res;
}

// Cumulatively combine the elements of an array or array of arrays using a function.
export function cumreduce(arr, func, toAlter) {
  var row, nrow, ncol, res, col;

  if (!isArray(arr[0]))
    arr = [arr];

  nrow = arr.length;
  ncol = arr[0].length;
  res = toAlter ? arr : new Array(nrow);

  for (row = 0; row < nrow; row++) {
    // if the row doesn't exist, create it
    if (!res[row])
      res[row] = new Array(ncol);
    if (ncol > 0)
      res[row][0] = arr[row][0];
    for (col = 1; col < ncol; col++)
      res[row][col] = func(res[row][col - 1], arr[row][col]);
  }
  return res.length === 1 ? res[0] : res;
}

// Destructively alter an array.
export function alter(arr, func) {
  return map(arr, func, true);
}

// Generate a rows x cols matrix according to the supplied function.
export function create(rows, cols, func) {
  var res = new Array(rows);
  var i, j;

  if (isFunction(cols)) {
    func = cols;
    cols = rows;
  }

  for (i = 0; i < rows; i++) {
    res[i] = new Array(cols);
    for (j = 0; j < cols; j++)
      res[i][j] = func(i, j);
  }

  return res;
}

function retZero() {
  return 0;
}

function retOne() {
  return 1;
}

function retIdent(i, j) {
  return i === j ? 1 : 0;
}

// Generate a rows x cols matrix of zeros.
export function zeros(rows, cols) {
  if (!isNumber(cols))
    cols = rows;
  return create(rows, cols, retZero);
}

// Generate a rows x cols matrix of ones.
export function ones(rows, cols) {
  if (!isNumber(cols))
    cols = rows;
  return create(rows, cols, retOne);
}

// Generate a rows x cols matrix of uniformly random numbers.
export function rand(rows, cols) {
  if (!isNumber(cols))
    cols = rows;
  return create(rows, cols, random_fn);
}

// Generate an identity matrix of size row x cols.
export function identity(rows, cols) {
  if (!isNumber(cols))
    cols = rows;
  return create(rows, cols, retIdent);
}

// Tests whether a matrix is symmetric
export function symmetric(arr) {
  var size = arr.length;
  var row, col;

  if (arr.length !== arr[0].length)
    return false;

  for (row = 0; row < size; row++) {
    for (col = 0; col < size; col++)
      if (arr[col][row] !== arr[row][col])
        return false;
  }

  return true;
}

// Set all values to zero.
export function clear(arr) {
  return alter(arr, retZero);
}

// Generate sequence.
export function seq(min, max, length, func) {
  if (!isFunction(func))
    func = false;

  var arr = [];
  var hival = calcRdx(min, max);
  var step = (max * hival - min * hival) / ((length - 1) * hival);
  var current = min;
  var cnt;

  // Current is assigned using a technique to compensate for IEEE error.
  // TODO: Needs better implementation.
  for (cnt = 0;
       current <= max && cnt < length;
       cnt++, current = (min * hival + step * hival * cnt) / hival) {
    arr.push((func ? func(current, cnt) : current));
  }

  return arr;
}


// arange(5) -> [0,1,2,3,4]
// arange(1,5) -> [1,2,3,4]
// arange(5,1,-1) -> [5,4,3,2]
export function arange(start, end, step) {
  var rl = [];
  var i;
  step = step || 1;
  if (end === undefined) {
    end = start;
    start = 0;
  }
  if (start === end || step === 0) {
    return [];
  }
  if (start < end && step < 0) {
    return [];
  }
  if (start > end && step > 0) {
    return [];
  }
  if (step > 0) {
    for (i = start; i < end; i += step) {
      rl.push(i);
    }
  } else {
    for (i = start; i > end; i += step) {
      rl.push(i);
    }
  }
  return rl;
}

// A=[[1,2,3],[4,5,6],[7,8,9]]
// slice(A,{row:{end:2},col:{start:1}}) -> [[2,3],[5,6]]
// slice(A,1,{start:1}) -> [5,6]
// as numpy code A[:2,1:]
export function slice(list, rcSlice) {
  function _slice(list, start, end, step) {
    // note it's not equal to range.map mode it's a bug
    var i;
    var rl = [];
    var length = list.length;
    if (start === undefined && end === undefined && step === undefined) {
      return copy(list);
    }

    start = start || 0;
    end = end || list.length;
    start = start >= 0 ? start : length + start;
    end = end >= 0 ? end : length + end;
    step = step || 1;
    if (start === end || step === 0) {
      return [];
    }
    if (start < end && step < 0) {
      return [];
    }
    if (start > end && step > 0) {
      return [];
    }
    if (step > 0) {
      for (i = start; i < end; i += step) {
        rl.push(list[i]);
      }
    } else {
      for (i = start; i > end; i += step) {
        rl.push(list[i]);
      }
    }
    return rl;
  }

  var colSlice, rowSlice;
  rcSlice = rcSlice || {};
  if (isNumber(rcSlice.row)) {
    if (isNumber(rcSlice.col))
      return list[rcSlice.row][rcSlice.col];
    var row = rowa(list, rcSlice.row);
    colSlice = rcSlice.col || {};
    return _slice(row, colSlice.start, colSlice.end, colSlice.step);
  }

  if (isNumber(rcSlice.col)) {
    var col = cola(list, rcSlice.col);
    rowSlice = rcSlice.row || {};
    return _slice(col, rowSlice.start, rowSlice.end, rowSlice.step);
  }

  rowSlice = rcSlice.row || {};
  colSlice = rcSlice.col || {};
  var rows = _slice(list, rowSlice.start, rowSlice.end, rowSlice.step);
  return rows.map(function (row) {
    return _slice(row, colSlice.start, colSlice.end, colSlice.step);
  });
}


// A=[[1,2,3],[4,5,6],[7,8,9]]
// sliceAssign(A,{row:{start:1},col:{start:1}},[[0,0],[0,0]])
// A=[[1,2,3],[4,0,0],[7,0,0]]
export function sliceAssign(A, rcSlice, B) {
  var nl, ml;
  if (isNumber(rcSlice.row)) {
    if (isNumber(rcSlice.col))
      return A[rcSlice.row][rcSlice.col] = B;
    rcSlice.col = rcSlice.col || {};
    rcSlice.col.start = rcSlice.col.start || 0;
    rcSlice.col.end = rcSlice.col.end || A[0].length;
    rcSlice.col.step = rcSlice.col.step || 1;
    nl = arange(rcSlice.col.start,
      Math.min(A.length, rcSlice.col.end),
      rcSlice.col.step);
    var m = rcSlice.row;
    nl.forEach(function (n, i) {
      A[m][n] = B[i];
    });
    return A;
  }

  if (isNumber(rcSlice.col)) {
    rcSlice.row = rcSlice.row || {};
    rcSlice.row.start = rcSlice.row.start || 0;
    rcSlice.row.end = rcSlice.row.end || A.length;
    rcSlice.row.step = rcSlice.row.step || 1;
    ml = arange(rcSlice.row.start,
      Math.min(A[0].length, rcSlice.row.end),
      rcSlice.row.step);
    var n = rcSlice.col;
    ml.forEach(function (m, j) {
      A[m][n] = B[j];
    });
    return A;
  }

  if (B[0].length === undefined) {
    B = [B];
  }
  rcSlice.row.start = rcSlice.row.start || 0;
  rcSlice.row.end = rcSlice.row.end || A.length;
  rcSlice.row.step = rcSlice.row.step || 1;
  rcSlice.col.start = rcSlice.col.start || 0;
  rcSlice.col.end = rcSlice.col.end || A[0].length;
  rcSlice.col.step = rcSlice.col.step || 1;
  ml = arange(rcSlice.row.start,
    Math.min(A.length, rcSlice.row.end),
    rcSlice.row.step);
  nl = arange(rcSlice.col.start,
    Math.min(A[0].length, rcSlice.col.end),
    rcSlice.col.step);
  ml.forEach(function (m, i) {
    nl.forEach(function (n, j) {
      A[m][n] = B[i][j];
    });
  });
  return A;
}

// [1,2,3] ->
// [[1,0,0],[0,2,0],[0,0,3]]
export function diagonal(diagArray) {
  var mat = zeros(diagArray.length, diagArray.length);
  diagArray.forEach(function (t, i) {
    mat[i][i] = t;
  });
  return mat;
}

// return copy of A
export function copy(A) {
  return A.map(function (row) {
    if (isNumber(row))
      return row;
    return row.map(function (t) {
      return t;
    });
  });
}
