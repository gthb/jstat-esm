"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  arcsine: true,
  beta: true,
  binomial: true,
  cauchy: true,
  centralF: true,
  chisquare: true,
  exponential: true,
  gamma: true,
  hypgeom: true,
  kumaraswamy: true,
  laplace: true,
  negbin: true,
  noncentralt: true,
  normal: true,
  pareto: true,
  poisson: true,
  studentt: true,
  triangular: true,
  tukey: true,
  uniform: true,
  weibull: true
};
exports.weibull = exports.uniform = exports.tukey = exports.triangular = exports.studentt = exports.poisson = exports.pareto = exports.normal = exports.noncentralt = exports.negbin = exports.laplace = exports.kumaraswamy = exports.hypgeom = exports.gamma = exports.exponential = exports.chisquare = exports.centralF = exports.cauchy = exports.binomial = exports.beta = exports.arcsine = void 0;

var _arcsine = _interopRequireWildcard(require("./arcsine"));

exports.arcsine = _arcsine;

var _beta = _interopRequireWildcard(require("./beta"));

exports.beta = _beta;

var _binomial = _interopRequireWildcard(require("./binomial"));

exports.binomial = _binomial;

var _cauchy = _interopRequireWildcard(require("./cauchy"));

exports.cauchy = _cauchy;

var _centralF = _interopRequireWildcard(require("./centralF"));

exports.centralF = _centralF;

var _chisquare = _interopRequireWildcard(require("./chisquare"));

exports.chisquare = _chisquare;

var _exponential = _interopRequireWildcard(require("./exponential"));

exports.exponential = _exponential;

var _gamma = _interopRequireWildcard(require("./gamma"));

exports.gamma = _gamma;

var _hypgeom = _interopRequireWildcard(require("./hypgeom"));

exports.hypgeom = _hypgeom;

var _kumaraswamy = _interopRequireWildcard(require("./kumaraswamy"));

exports.kumaraswamy = _kumaraswamy;

var _laplace = _interopRequireWildcard(require("./laplace"));

exports.laplace = _laplace;

var _negbin = _interopRequireWildcard(require("./negbin"));

exports.negbin = _negbin;

var _noncentralt = _interopRequireWildcard(require("./noncentralt"));

exports.noncentralt = _noncentralt;

var _normal = _interopRequireWildcard(require("./normal"));

exports.normal = _normal;

var _pareto = _interopRequireWildcard(require("./pareto"));

exports.pareto = _pareto;

var _poisson = _interopRequireWildcard(require("./poisson"));

exports.poisson = _poisson;

var _studentt = _interopRequireWildcard(require("./studentt"));

exports.studentt = _studentt;

var _triangular = _interopRequireWildcard(require("./triangular"));

exports.triangular = _triangular;

var _tukey = _interopRequireWildcard(require("./tukey"));

exports.tukey = _tukey;

var _uniform = _interopRequireWildcard(require("./uniform"));

exports.uniform = _uniform;

var _weibull = _interopRequireWildcard(require("./weibull"));

exports.weibull = _weibull;

var _special = require("./special");

Object.keys(_special).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _special[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _special[key];
    }
  });
});

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }