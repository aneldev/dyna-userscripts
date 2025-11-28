(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("dyna-userscripts", [], factory);
	else if(typeof exports === 'object')
		exports["dyna-userscripts"] = factory();
	else
		root["dyna-userscripts"] = factory();
})(self, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/utils/getDurationString.ts":
/*!****************************************!*\
  !*** ./src/utils/getDurationString.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getDurationString: () => (/* binding */ getDurationString)
/* harmony export */ });
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! moment */ "moment");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var dyna_loops__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! dyna-loops */ "dyna-loops");
/* harmony import */ var dyna_loops__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(dyna_loops__WEBPACK_IMPORTED_MODULE_1__);


var getDurationString = function getDurationString(start, end) {
  var precision = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
  var duration = moment__WEBPACK_IMPORTED_MODULE_0___default().duration(moment__WEBPACK_IMPORTED_MODULE_0___default()(end).diff(moment__WEBPACK_IMPORTED_MODULE_0___default()(start)));
  var ms = duration.asMilliseconds();
  if (Math.abs(ms) < 1000) return roundDurationUnit(ms, precision, 'ms');
  var seconds = duration.asSeconds();
  if (Math.abs(seconds) < 60) return roundDurationUnit(seconds, precision, 'sec');
  var minutes = duration.asMinutes();
  if (Math.abs(minutes) < 60) return roundDurationUnit(minutes, precision, 'min');
  var hours = duration.asHours();
  if (Math.abs(hours) < 24) return roundDurationUnit(hours, precision, 'hour');
  var days = duration.asDays();
  if (Math.abs(days) < 7) return roundDurationUnit(days, precision, 'day');
  var weeks = duration.asWeeks();
  if (Math.abs(weeks) < 4.345) return roundDurationUnit(weeks, precision, 'week');
  var months = duration.asMonths();
  if (Math.abs(months) < 12) return roundDurationUnit(months, precision, 'month');
  return roundDurationUnit(duration.asYears(), precision, 'year');
};
var roundDurationUnit = function roundDurationUnit(n, precision, unit) {
  var roundNumber = (0,dyna_loops__WEBPACK_IMPORTED_MODULE_1__.round)(n, precision).toString();
  var textNumber = roundNumber.endsWith('.0') ? roundNumber.slice(0, -precision - 1) : roundNumber;
  if (textNumber === "0") return "<".concat(1 / Math.pow(10, precision), "ms");
  return "".concat(textNumber, " ").concat(unit).concat(textNumber === "1" ? '' : 's').trim();
};

/***/ }),

/***/ "./src/utils/getRuntimeStack.ts":
/*!**************************************!*\
  !*** ./src/utils/getRuntimeStack.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getRuntimeStack: () => (/* binding */ getRuntimeStack)
/* harmony export */ });
/* harmony import */ var dyna_error__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dyna-error */ "dyna-error");
/* harmony import */ var dyna_error__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(dyna_error__WEBPACK_IMPORTED_MODULE_0__);
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }

var getRuntimeStack = function getRuntimeStack() {
  var stack = [];
  try {
    throw new Error('Getting runtime stack');
  } catch (e) {
    var error = (0,dyna_error__WEBPACK_IMPORTED_MODULE_0__.dynaError)(e);
    var stackString = error.stack;
    var stackLines = stackString.split('\n').slice(1).map(function (line) {
      return line.trim();
    }).filter(Boolean);
    stack.push.apply(stack, _toConsumableArray(stackLines));
  }
  return stack;
};

/***/ }),

/***/ "./src/utils/index.ts":
/*!****************************!*\
  !*** ./src/utils/index.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getDurationString: () => (/* reexport safe */ _getDurationString__WEBPACK_IMPORTED_MODULE_1__.getDurationString),
/* harmony export */   getRuntimeStack: () => (/* reexport safe */ _getRuntimeStack__WEBPACK_IMPORTED_MODULE_0__.getRuntimeStack)
/* harmony export */ });
/* harmony import */ var _getRuntimeStack__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getRuntimeStack */ "./src/utils/getRuntimeStack.ts");
/* harmony import */ var _getDurationString__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getDurationString */ "./src/utils/getDurationString.ts");



/***/ }),

/***/ "./src/web/ConsoleLogger.ts":
/*!**********************************!*\
  !*** ./src/web/ConsoleLogger.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ESeverity: () => (/* binding */ ESeverity),
/* harmony export */   startConsoleLogger: () => (/* binding */ startConsoleLogger)
/* harmony export */ });
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! moment */ "moment");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils */ "./src/utils/index.ts");
/* harmony import */ var _isLocalhost__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./isLocalhost */ "./src/web/isLocalhost.ts");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }



var ESeverity;
(function (ESeverity) {
  ESeverity["LOG"] = "log";
  ESeverity["INFO"] = "info";
  ESeverity["DEBUG"] = "debug";
  ESeverity["ERROR"] = "error";
  ESeverity["CAUGHT_ERROR"] = "caught-error";
  ESeverity["WARN"] = "warn";
})(ESeverity || (ESeverity = {}));
/**
 * ConsoleLogger stores all the console logs in memory for later processing and easier access to the logged error objects or data.
 *
 * You can access the logs from the `consoleLogger.logs` array, which also includes other information like timestamps, elapsed time from the previous log, stack trace, etc.
 *
 * Tip: You can add `consoleLogger.logs` to your debugger's watcher for easy access.
 */
var ConsoleLogger = /*#__PURE__*/function () {
  function ConsoleLogger() {
    var _this = this;
    _classCallCheck(this, ConsoleLogger);
    this.logs = [];
    this._index = 0;
    this._isEnabled = localStorage.getItem('ConsoleLogger-Enabled') === "true";
    this._lastConsole = Date.now();
    this._originalConsole = _defineProperty({
      log: window.console.log,
      info: window.console.info,
      debug: window.console.debug,
      error: window.console.error,
      warn: window.console.warn
    }, ESeverity.CAUGHT_ERROR, function () {
      return undefined;
    });
    this._perform = function (severity, args) {
      var _this$_originalConsol2;
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      var self = _this;
      var date = new Date();
      var elapsed = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.getDurationString)(_this._lastConsole, date);
      if (_this.enabled) {
        var logItem = {
          index: _this._index++,
          time: moment__WEBPACK_IMPORTED_MODULE_0___default()(date).format('HH:mm:ss.SSS'),
          elapsed: elapsed,
          severity: severity,
          args: args,
          message: typeof args[0] === "string" ? args[0] : "---no text console---",
          date: date,
          elapsedMs: date.valueOf() - _this._lastConsole,
          stack: (0,_utils__WEBPACK_IMPORTED_MODULE_1__.getRuntimeStack)(),
          get copyToGlobal() {
            self._copyToGlobal(logItem);
            return "Copied to `window.temp`"; // Technically, assigned, not copied
          }
        };
        _this.logs.push(logItem);
      }
      var prefix = "".concat(elapsed.padStart(6, ' '));
      _this._lastConsole = date.valueOf();
      (_this$_originalConsol2 = _this._originalConsole)[severity].apply(_this$_originalConsol2, [prefix].concat(_toConsumableArray(args)));
    };
    window.console.log = function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      return _this._perform(ESeverity.LOG, args);
    };
    window.console.info = function () {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }
      return _this._perform(ESeverity.INFO, args);
    };
    window.console.debug = function () {
      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }
      return _this._perform(ESeverity.DEBUG, args);
    };
    window.console.error = function () {
      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }
      return _this._perform(ESeverity.ERROR, args);
    };
    window.console.warn = function () {
      for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        args[_key5] = arguments[_key5];
      }
      return _this._perform(ESeverity.WARN, args);
    };
    window.consoleLogger = this;
    window.addEventListener('error', function (error) {
      _this._perform(ESeverity.CAUGHT_ERROR, ["consoleLogger: Uncaught error", error.message, error]);
    });
    window.addEventListener('unhandledrejection', function (event) {
      _this._perform(ESeverity.CAUGHT_ERROR, ["consoleLogger: Uncaught promise rejection", event.reason, event]);
    });
    if (this.enabled) {
      console.info(["consoleLogger: Is enabled and logging for this terminal.", "Run `consoleLogger.enabled=false` to turn it off."].join('\n'));
    } else {
      if (_isLocalhost__WEBPACK_IMPORTED_MODULE_2__.isLocalhost) {
        console.info(["consoleLogger: Started but it is not enabled for this terminal.", "Run `consoleLogger.enabled=true` to start logging the consoles.", "This message is shown only in dev environment."].join('\n'));
      }
    }
  }
  return _createClass(ConsoleLogger, [{
    key: "enabled",
    get: function get() {
      return this._isEnabled;
    },
    set: function set(enabled) {
      this._isEnabled = enabled;
      localStorage.setItem('ConsoleLogger-Enabled', enabled.toString());
    }
  }, {
    key: "clear",
    value: function clear() {
      this.logs.length = 0;
      console.info('ConsoleLogger: clear() called');
    }
  }, {
    key: "_copyToGlobal",
    value: function _copyToGlobal(logItem) {
      var currentTempVariables = Object.keys(window).filter(function (key) {
        return regExpIsTempVariable.test(key);
      }).length;
      for (var i = currentTempVariables; i > 0; i--) {
        if (window["temp".concat(i)]) window["temp".concat(i + 1)] = window["temp".concat(i)];
      }
      window.temp1 = logItem;
    }
  }]);
}();
var regExpIsTempVariable = /^temp\d+$/;
var applied = false;
var startConsoleLogger = function startConsoleLogger() {
  if (applied) return;
  applied = true;
  new ConsoleLogger();
};

/***/ }),

/***/ "./src/web/isLocalhost.ts":
/*!********************************!*\
  !*** ./src/web/isLocalhost.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isLocalhost: () => (/* binding */ isLocalhost)
/* harmony export */ });
var isLocalhost = Boolean(window.location.hostname === 'localhost' ||
// [::1] is the IPv6 localhost address.
window.location.hostname === '[::1]' ||
// 127.0.0.0/8 are considered localhost for IPv4.
window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));

/***/ }),

/***/ "dyna-error":
/*!*****************************!*\
  !*** external "dyna-error" ***!
  \*****************************/
/***/ ((module) => {

module.exports = require("dyna-error");

/***/ }),

/***/ "dyna-loops":
/*!*****************************!*\
  !*** external "dyna-loops" ***!
  \*****************************/
/***/ ((module) => {

module.exports = require("dyna-loops");

/***/ }),

/***/ "moment":
/*!*************************!*\
  !*** external "moment" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("moment");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
/*!**************************!*\
  !*** ./src/web/index.ts ***!
  \**************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ESeverity: () => (/* reexport safe */ _ConsoleLogger__WEBPACK_IMPORTED_MODULE_0__.ESeverity),
/* harmony export */   isLocalhost: () => (/* reexport safe */ _isLocalhost__WEBPACK_IMPORTED_MODULE_1__.isLocalhost),
/* harmony export */   startConsoleLogger: () => (/* reexport safe */ _ConsoleLogger__WEBPACK_IMPORTED_MODULE_0__.startConsoleLogger)
/* harmony export */ });
/* harmony import */ var _ConsoleLogger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ConsoleLogger */ "./src/web/ConsoleLogger.ts");
/* harmony import */ var _isLocalhost__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./isLocalhost */ "./src/web/isLocalhost.ts");


/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=index.js.map