import { isArray, isFunction, isNumber } from "./helpers";
import { alter, cumreduce, map, seq, slice } from "./index";

function jStat(...args) {
  // If first argument is an array, must be vector or matrix.
  if (isArray(args[0])) {
    // Check if matrix.
    if (isArray(args[0][0])) {
      // See if a mapping function was also passed.
      if (isFunction(args[1]))
        args[0] = map(args[0], args[1]);
      // Iterate over each is faster than this.push.apply(this, args[0].
      for (let i = 0; i < args[0].length; i++)
        this[i] = args[0][i];
      this.length = args[0].length;

      // Otherwise must be a vector.
    } else {
      this[0] = isFunction(args[1]) ? map(args[0], args[1]) : args[0];
      this.length = 1;
    }

    // If first argument is number, assume creation of sequence.
  } else if (isNumber(args[0])) {
    this[0] = seq.apply(null, args);
    this.length = 1;

    // Handle case when jStat object is passed to jStat.
  } else if (args[0] instanceof jStat) {
    // Duplicate the object and pass it back.
    return jStat(args[0].toArray());

    // Unexpected argument value, return empty jStat object.
    // TODO: This is strange behavior. Shouldn't this throw or some such to let
    // the user know they had bad arguments?
  } else {
    this[0] = [];
    this.length = 1;
  }
  return this;
}

jStat._random_fn = Math.random;
jStat.setRandom = function setRandom(fn) {
  if (typeof fn !== 'function')
    throw new TypeError('fn is not a function');
  jStat._random_fn = fn;
};

// Quick reference.
const jProto = jStat.prototype;

// Default length.
jProto.length = 0;

// For internal use only.
// TODO: Check if they're actually used, and if they are then rename them
// to _*
jProto.push = Array.prototype.push;
jProto.sort = Array.prototype.sort;
jProto.splice = Array.prototype.splice;
jProto.slice = Array.prototype.slice;

// Return a clean array.
jProto.toArray = function toArray() {
  return this.length > 1 ? slice.call(this) : slice.call(this)[0];
};

// Map a function to a matrix or vector.
jProto.map = function (func, toAlter) {
  return jStat(map(this, func, toAlter));
};

// Cumulatively combine the elements of a matrix or vector using a function.
jProto.cumreduce = function (func, toAlter) {
  return jStat(cumreduce(this, func, toAlter));
};

// Destructively alter an array.
jProto.alter = function (func) {
  alter(this, func);
  return this;
};

export { jStat };
