"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _zStatistics = require("./zStatistics");

Object.keys(_zStatistics).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _zStatistics[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _zStatistics[key];
    }
  });
});

var _tStatistics = require("./tStatistics");

Object.keys(_tStatistics).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _tStatistics[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _tStatistics[key];
    }
  });
});

var _fStatistics = require("./fStatistics");

Object.keys(_fStatistics).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _fStatistics[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _fStatistics[key];
    }
  });
});

var _tukey = require("./tukey");

Object.keys(_tukey).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _tukey[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _tukey[key];
    }
  });
});

var _confidenceInterval = require("./confidenceInterval");

Object.keys(_confidenceInterval).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _confidenceInterval[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _confidenceInterval[key];
    }
  });
});