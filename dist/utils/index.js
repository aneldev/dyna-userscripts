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
/*!****************************!*\
  !*** ./src/utils/index.ts ***!
  \****************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getDurationString: () => (/* reexport safe */ _getDurationString__WEBPACK_IMPORTED_MODULE_1__.getDurationString),
/* harmony export */   getRuntimeStack: () => (/* reexport safe */ _getRuntimeStack__WEBPACK_IMPORTED_MODULE_0__.getRuntimeStack)
/* harmony export */ });
/* harmony import */ var _getRuntimeStack__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getRuntimeStack */ "./src/utils/getRuntimeStack.ts");
/* harmony import */ var _getDurationString__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getDurationString */ "./src/utils/getDurationString.ts");


/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=index.js.map