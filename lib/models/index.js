"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.models = void 0;

var _core = require("../core");

var _linearAlgebra = require("../linearAlgebra");

var _vector = require("../vector");

var studentt = _interopRequireWildcard(require("../distribution/studentt"));

var beta = _interopRequireWildcard(require("../distribution/beta"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function sub_regress(exog) {
  var var_count = exog[0].length;
  var modelList = (0, _core.arange)(var_count).map(function (endog_index) {
    var exog_index = (0, _core.arange)(var_count).filter(function (i) {
      return i !== endog_index;
    });
    return ols((0, _core.col)(exog, endog_index).map(function (x) {
      return x[0];
    }), (0, _core.col)(exog, exog_index));
  });
  return modelList;
} // do OLS model regress
// exog have include const columns ,it will not generate it .In fact, exog is
// "design matrix" look at
//https://en.wikipedia.org/wiki/Design_matrix


function ols(endog, exog) {
  var nobs = endog.length;
  var df_model = exog[0].length - 1;
  var df_resid = nobs - df_model - 1;
  var coef = (0, _linearAlgebra.lstsq)(exog, endog);
  var predict = (0, _linearAlgebra.multiply)(exog, coef.map(function (x) {
    return [x];
  })).map(function (p) {
    return p[0];
  });
  var resid = (0, _linearAlgebra.subtract)(endog, predict);
  var ybar = (0, _vector.mean)(endog); // constant cause problem
  // var SST = jStat.sum(endog.map(function(y) {
  //   return Math.pow(y-ybar,2);
  // }));

  var SSE = (0, _vector.sum)(predict.map(function (f) {
    return Math.pow(f - ybar, 2);
  }));
  var SSR = (0, _vector.sum)(endog.map(function (y, i) {
    return Math.pow(y - predict[i], 2);
  }));
  var SST = SSE + SSR;
  var R2 = SSE / SST;
  return {
    exog: exog,
    endog: endog,
    nobs: nobs,
    df_model: df_model,
    df_resid: df_resid,
    coef: coef,
    predict: predict,
    resid: resid,
    ybar: ybar,
    SST: SST,
    SSE: SSE,
    SSR: SSR,
    R2: R2
  };
} // H0: b_I=0
// H1: b_I!=0


function t_test(model) {
  var subModelList = sub_regress(model.exog); //var sigmaHat=jStat.stdev(model.resid);

  var sigmaHat = Math.sqrt(model.SSR / model.df_resid);
  var seBetaHat = subModelList.map(function (mod) {
    var SST = mod.SST;
    var R2 = mod.R2;
    return sigmaHat / Math.sqrt(SST * (1 - R2));
  });
  var tStatistic = model.coef.map(function (coef, i) {
    return (coef - 0) / seBetaHat[i];
  });
  var pValue = tStatistic.map(function (t) {
    var leftppf = studentt.cdf(t, model.df_resid);
    return (leftppf > 0.5 ? 1 - leftppf : leftppf) * 2;
  });
  var c = studentt.inv(0.975, model.df_resid);
  var interval95 = model.coef.map(function (coef, i) {
    var d = c * seBetaHat[i];
    return [coef - d, coef + d];
  });
  return {
    se: seBetaHat,
    t: tStatistic,
    p: pValue,
    sigmaHat: sigmaHat,
    interval95: interval95
  };
}

function F_test(model) {
  var F_statistic = model.R2 / model.df_model / ((1 - model.R2) / model.df_resid);

  var fcdf = function fcdf(x, n1, n2) {
    return beta.cdf(x / (n2 / n1 + x), n1 / 2, n2 / 2);
  };

  var pvalue = 1 - fcdf(F_statistic, model.df_model, model.df_resid);
  return {
    F_statistic: F_statistic,
    pvalue: pvalue
  };
}

function ols_wrap(endog, exog) {
  var model = ols(endog, exog);
  var ttest = t_test(model);
  var ftest = F_test(model); // Provide the Wherry / Ezekiel / McNemar / Cohen Adjusted R^2
  // Which matches the 'adjusted R^2' provided by R's lm package

  var adjust_R2 = 1 - (1 - model.R2) * ((model.nobs - 1) / model.df_resid);
  model.t = ttest;
  model.f = ftest;
  model.adjust_R2 = adjust_R2;
  return model;
}

var models = {
  ols: ols_wrap
};
exports.models = models;