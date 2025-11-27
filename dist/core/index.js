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

/***/ "./src/core/utils.ts":
/*!***************************!*\
  !*** ./src/core/utils.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   consoleDebugAdvanced: () => (/* binding */ consoleDebugAdvanced)
/* harmony export */ });
/* unused harmony exports showToast, copyToClipboard, addGlobalClickListener, addGlobalClickListenerBySelectors, addGlobalDoubleClickListener, addElementCreationEventListenerBySelector, addElementCreationEventListener, onElementCreation, debugJsonStringify, refresh, refreshNoQuery, getTimestamp, getHumanTimestamp, getShortGuid, injectStyle, injectToolbar, injectButton, clearApp, selectFirst, select, selectById, selectByClass, random, getStackStrace, getFirstArticleText, get10TipsFromArticle, isTop, isInIframe, guid, shortGuid, getElementHash */
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function showToast(message) {
  var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 3000;
  var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'info';
  if (!['info', 'success', 'error', 'warning'].includes(type)) {
    console.error("showToast: type [".concat(type, "] is not supported"));
    return;
  }
  var toast = document.createElement('div');
  toast.classList.add('toast', "toast-".concat(type));
  toast.innerHTML = "<span class=\"toast-message\">".concat(message, "</span>");
  document.body.appendChild(toast);
  setTimeout(function () {
    if (toast.parentNode) {
      document.body.removeChild(toast);
    }
  }, duration);
  var style = "\n      .toast {\n        position: fixed;\n        top: 16px;\n        right: 32px;\n        padding: 12px 16px;\n        color: #fff;\n        border-radius: 4px;\n        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);\n        z-index: 9999;\n      }\n      .toast-message {\n        display: block;\n        font-size: 14px;\n        line-height: 1.4;\n      }\n      .toast-info { background-color: #2196f3; }\n      .toast-success { background-color: #4caf50; }\n      .toast-error { background-color: #f44336; }\n      .toast-warning { background-color: #ff9800; }\n    ";
  var css = document.createElement('style');
  css.type = 'text/css';
  css.appendChild(document.createTextNode(style));
  document.head.appendChild(css);
}
function copyToClipboard(content, _label) {
  if (!content) {
    showToast('Error, nothing to copy to clipboard');
    return;
  }
  var label = _label || "Copied: ".concat(content.substring(0, 20)).concat(content.length > 20 ? '...' : '');
  navigator.clipboard.writeText(content).then(function () {
    return showToast(label, 3000, 'success');
  })["catch"](function (error) {
    showToast("Error copying to clipboard: ".concat(error.message || 'Unknown error'), 3000, 'error');
    console.error('Error copying timestamp to clipboard:', error);
  });
}
var hasAllClasses = function hasAllClasses(element, classNames) {
  var classList = classNames.split(/\s+/);
  var currentElement = element;
  while (currentElement) {
    if (classList.every(function (className) {
      return currentElement.classList.contains(className);
    })) {
      return true;
    }
    currentElement = currentElement.parentElement;
  }
  return false;
};
function addGlobalClickListener(classNames, cb) {
  window.addEventListener('click', function (event) {
    if (hasAllClasses(event.target, classNames)) {
      cb(event);
    }
  });
}
function addGlobalClickListenerBySelectors(selectorsArray, cb) {
  document.addEventListener('click', function (event) {
    var _iterator = _createForOfIteratorHelper(selectorsArray),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var selector = _step.value;
        var element = event.target;
        while (element && !element.matches(selector)) {
          element = element.parentElement;
        }
        if (element) {
          cb(element);
          break;
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  });
}
function addGlobalDoubleClickListener(className, cb) {
  var lastClick = 0;
  addGlobalClickListener(className, function (event) {
    if (Date.now() - lastClick < 300) cb(event);
    lastClick = Date.now();
  });
}
function addElementCreationEventListenerBySelector(selector, cb) {
  var existingElements = document.querySelectorAll(selector);
  var _iterator2 = _createForOfIteratorHelper(existingElements),
    _step2;
  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var element = _step2.value;
      cb(element);
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }
  var observer = new MutationObserver(function (mutations) {
    var _iterator3 = _createForOfIteratorHelper(mutations),
      _step3;
    try {
      for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
        var mutation = _step3.value;
        var addedNodes = Array.from(mutation.addedNodes);
        for (var _i = 0, _addedNodes = addedNodes; _i < _addedNodes.length; _i++) {
          var node = _addedNodes[_i];
          if ('matches' in node && node.matches(selector)) {
            cb(node);
          } else {
            var matchingDescendants = node.querySelectorAll(selector);
            var _iterator4 = _createForOfIteratorHelper(matchingDescendants),
              _step4;
            try {
              for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
                var descendant = _step4.value;
                cb(descendant);
              }
            } catch (err) {
              _iterator4.e(err);
            } finally {
              _iterator4.f();
            }
          }
        }
      }
    } catch (err) {
      _iterator3.e(err);
    } finally {
      _iterator3.f();
    }
  });
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
}
function addElementCreationEventListener(classNames, cb) {
  console.warn('addElementCreationEventListener is deprecated, use addElementCreationEventListenerBySelector instead!!!');
  onElementCreation(function (node) {
    var _a;
    var classNameSelector = classNames.split(' ').map(function (s) {
      return '.' + s;
    }).join('');
    var hasElements = ((_a = node.parentElement) === null || _a === void 0 ? void 0 : _a.querySelectorAll(classNameSelector)) || [];
    Array.from(hasElements).forEach(function (element) {
      return cb(element);
    });
  });
}
function onElementCreation(cb) {
  var observerCallback = function observerCallback(mutationsList) {
    mutationsList.forEach(function (mutation) {
      mutation.addedNodes.forEach(function (node) {
        return cb(node);
      });
    });
  };
  var observer = new MutationObserver(observerCallback);
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
}
function debugJsonStringify(obj) {
  var spacing = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var cache = new WeakMap();
  var replacer = function replacer(_key, value) {
    if (value === window) return "[window]";
    if (value instanceof Error) return "Error: ".concat(value.message || "Unknown error");
    if (_typeof(value) === 'object' && value !== null) {
      if (cache.has(value)) return '[circular-ref]';
      cache.set(value, true);
    }
    if (typeof value === 'function') return value.toString();
    return value;
  };
  return JSON.stringify(obj, replacer, spacing);
}
function refresh() {
  window.location.reload();
}
function refreshNoQuery() {
  window.location.href = window.location.href.split('?')[0];
}
function getTimestamp() {
  var now = new Date();
  var pad = function pad(num) {
    return num.toString().padStart(2, '0');
  };
  var timestampText = "".concat(now.getFullYear()).concat(pad(now.getMonth() + 1)).concat(pad(now.getDate())).concat(pad(now.getHours())).concat(pad(now.getMinutes())).concat(pad(now.getSeconds()));
  return Number(timestampText);
}
function getHumanTimestamp() {
  var date = new Date();
  var pad = function pad(num) {
    return String(num).padStart(2, '0');
  };
  return "".concat(date.getFullYear(), "-").concat(pad(date.getMonth() + 1), "-").concat(pad(date.getDate()), "--").concat(pad(date.getHours()), "-").concat(pad(date.getMinutes()));
}
function getShortGuid() {
  var prefix = localStorage.getItem('ultra-short-guid--prefix');
  if (!prefix) {
    alert('No ultra-short-guid--prefix is defined in localStorage, doing it now, copied to clipboard');
    copyToClipboard("localStorage.setItem('ultra-short-guid--prefix', 'XX')", 'Prefix script copied to update it');
    return '';
  }
  var counter = Number(localStorage.getItem('ultra-short-guid--counter') || 234) + 1;
  localStorage.setItem('ultra-short-guid--counter', counter.toString());
  var output = [prefix, Math.random().toString().slice(-1), counter, Math.random().toString().slice(-1)].join('');
  return output;
}
function injectStyle(style) {
  var styleElement = document.createElement('style');
  styleElement.textContent = style;
  document.head.appendChild(styleElement);
}
function injectToolbar(args) {
  var toolbar = document.createElement('div');
  Object.assign(toolbar.style, {
    position: 'fixed',
    right: '10px',
    top: '50%',
    transform: 'translateY(-50%)',
    backgroundColor: '#fff',
    borderRadius: '4px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    zIndex: '9999'
  });
  toolbar.classList.add('toolbar');
  var title = document.createElement('h3');
  title.textContent = args.title;
  Object.assign(title.style, {
    color: 'gray',
    margin: '10px'
  });
  toolbar.appendChild(title);
  var buttonContainer = document.createElement('div');
  Object.assign(buttonContainer.style, {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    padding: '10px'
  });
  args.buttons.forEach(function (_ref) {
    var label = _ref.label,
      _ref$color = _ref.color,
      color = _ref$color === void 0 ? 'purple' : _ref$color,
      onClick = _ref.onClick;
    var button = document.createElement('button');
    button.textContent = label;
    Object.assign(button.style, {
      backgroundColor: color,
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      padding: '8px 16px',
      cursor: 'pointer'
    });
    button.addEventListener('click', onClick);
    buttonContainer.appendChild(button);
  });
  toolbar.appendChild(buttonContainer);
  document.body.appendChild(toolbar);
}
function injectButton(options) {
  var label = options.label,
    _options$height = options.height,
    height = _options$height === void 0 ? 32 : _options$height,
    afterElement = options.afterElement,
    _options$color = options.color,
    color = _options$color === void 0 ? "tomato" : _options$color,
    onClick = options.onClick;
  var button = document.createElement('button');
  button.innerHTML = label;
  Object.assign(button.style, {
    lineHeight: "".concat(height, "px"),
    width: 'auto',
    padding: '0 8px',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: color,
    color: 'white',
    cursor: 'pointer'
  });
  button.addEventListener('click', onClick);
  window.testButton = button;
  afterElement.insertAdjacentElement('afterend', button);
}
function clearApp() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var _options$cookies = options.cookies,
    cookies = _options$cookies === void 0 ? false : _options$cookies,
    _options$data = options.data,
    data = _options$data === void 0 ? false : _options$data;
  if (cookies) {
    var _cookies = document.cookie.split(";");
    for (var i = 0; i < _cookies.length; i++) {
      var cookie = _cookies[i];
      var eqPos = cookie.indexOf("=");
      var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = "".concat(name, "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/");
    }
    console.info("clearApp: ".concat(_cookies.length, " cookies cleared"));
  }
  if (data) {
    localStorage.clear();
    console.info("clearApp: ".concat(localStorage.length, " local storage cleared"));
    sessionStorage.clear();
    console.info("clearApp: ".concat(sessionStorage.length, " session storage cleared"));
  }
  if (!cookies && !data) {
    console.info('clearApp: nothing cleared, call like: clearApp({cookies: true, data: true})');
  }
}
function selectFirst(selector) {
  var rootElement = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
  return rootElement.querySelector(selector);
}
function select(selector) {
  var rootElement = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
  return Array.from(rootElement.querySelectorAll(selector));
}
function selectById(id, rootElement) {
  return rootElement.getElementById(id);
}
function selectByClass(className) {
  var rootElement = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
  return Array.from(rootElement.getElementsByClassName(className));
}
function random(from) {
  var to_ = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : from;
  if (to_ === undefined) {
    to_ = from;
    from = 0;
  }
  if (to_ < from) {
    var _ref2 = [to_, from];
    from = _ref2[0];
    to_ = _ref2[1];
  }
  return Math.floor(Math.random() * (to_ - from + 1) + from);
}
function getStackStrace() {
  try {
    throw new Error();
  } catch (e) {
    return e.stack.split('\n').slice(2);
  }
}
function getFirstArticleText() {
  var article = document.querySelector('article');
  if (!article) return;
  var text = article.innerText;
  console.info("Focus the tab to copy article text to clipboard");
  var _handleFocus = function handleFocus() {
    copyToClipboard(text, "Article copied ".concat(Math.round(text.length / 1000), "kb"));
    window.removeEventListener('focus', _handleFocus);
  };
  window.addEventListener('focus', _handleFocus);
}
function get10TipsFromArticle() {
  var article = document.querySelector('article');
  if (!article) return;
  var text = "\u0393\u03C1\u03AC\u03C8\u03B5 10 tips \u03B1\u03C0\u03CC \u03C4\u03BF \u03C0\u03B1\u03C1\u03B1\u03BA\u03AC\u03C4\u03C9 \u03BA\u03B5\u03AF\u03BC\u03B5\u03BD\u03BF 60 \u03BC\u03B5 90 \u03C7\u03B1\u03C1\u03B1\u03BA\u03C4\u03AE\u03C1\u03B5\u03C2 \u03C4\u03BF \u03BA\u03AC\u03B8\u03B5 \u03AD\u03BD\u03B1".concat(article.innerText);
  console.info("Focus the tab to copy article text to clipboard");
  var _handleFocus2 = function handleFocus() {
    copyToClipboard(text, "Tips copied ".concat(Math.round(text.length / 1000), "kb"));
    window.removeEventListener('focus', _handleFocus2);
  };
  window.addEventListener('focus', _handleFocus2);
}
var isTop = window.self === window.top;
var isInIframe = !isTop;
var randomBlock = function randomBlock() {
  return Number(Math.random().toString().substring(2)).toString(16).substring(0, 8);
};
function guid() {
  var randomBlocks = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 2;
  var datePart = (Date.now() * 3).toString(16);
  var timeZone = new Date().getTimezoneOffset();
  var timeZonePart = Number("".concat(timeZone < 0 ? "7" : "6").concat(Math.abs(timeZone))).toString(16);
  var outputSize = randomBlocks * 9 + 3 + 15;
  var output = "";
  for (var i = 0; i < randomBlocks; i++) {
    output += "".concat(randomBlock(), "-");
  }
  output += timeZonePart + datePart;
  while (output.length < outputSize) output += randomBlock();
  return output.substring(0, outputSize);
}
var guidIndex = 0;
function shortGuid() {
  return String(Date.now() * 3) + guidIndex++;
}
function getElementHash(container, element) {
  if (!container || !element) return null;
  var getIndex = function getIndex(node) {
    var index = 0;
    var sibling = node;
    while (sibling = sibling.previousElementSibling) {
      if (sibling.tagName === node.tagName) index++;
    }
    return index;
  };
  var path = [];
  var current = element;
  while (current && current !== container) {
    if (!current.tagName) return null;
    path.unshift("".concat(current.tagName, ":").concat(getIndex(current)));
    current = current.parentElement;
  }
  if (current !== container) return null;
  var pathString = path.join('|');
  var hash = 5381;
  for (var i = 0; i < pathString.length; i++) {
    hash = (hash << 5) + hash + pathString.charCodeAt(i);
    hash = hash & 0xFFFFFFFF;
  }
  return "h" + hash.toString(36);
}
var consoleDebugAdvanced = function consoleDebugAdvanced() {
  if (window.consoleDebugMocked) return;
  window.consoleDebugAll = [];
  var lastTime = Date.now();
  var originalDebug = console.debug;
  var regExpIsTempVariable = /^temp\d+$/;
  console.debug = function () {
    var _a;
    var now = Date.now();
    var elapsed = String(now - lastTime);
    while (elapsed.length < 6) elapsed = ' ' + elapsed;
    var prefix = "\uD83D\uDC1D ".concat(elapsed, "ms elapsed -");
    lastTime = now;
    for (var _len = arguments.length, userArgs = new Array(_len), _key2 = 0; _key2 < _len; _key2++) {
      userArgs[_key2] = arguments[_key2];
    }
    var consoleDebugAdvancedConfig = _typeof(userArgs.at(-1)) === "object" && ((_a = userArgs.at(-1)) === null || _a === void 0 ? void 0 : _a.consoleDebugAdvancedConfig) === true ? userArgs.at(-1) : {};
    var args = consoleDebugAdvancedConfig.hardCopy ? userArgs.map(function (arg) {
      return _typeof(arg) === "object" && arg !== null ? JSON.parse(JSON.stringify(arg)) : arg;
    }) : userArgs;
    originalDebug.call.apply(originalDebug, [console, prefix].concat(_toConsumableArray(args), [{
      "00 label": "Export arguments tool",
      "01 hardCopied": !!consoleDebugAdvancedConfig.hardCopy,
      get "02 Export to arguments to temp1 --> click it"() {
        var currentTempVariables = Object.keys(window).filter(function (key) {
          return regExpIsTempVariable.test(key);
        }).length;
        for (var i = currentTempVariables; i > 0; i--) {
          if (window["temp".concat(i)]) {
            window["temp".concat(i + 1)] = window["temp".concat(i)];
          }
        }
        window.temp1 = args.reduce(function (acc, arg, index) {
          acc["arg".concat(index)] = arg;
          return acc;
        }, {});
        return "Exported";
      },
      "03 help": ["# Console Debug Advanced Config", "Configure by passing {consoleDebugAdvancedConfig: true} as last arg to console.debug", "Access all logs: window.consoleDebugAll", "Hard copy: {consoleDebugAdvancedConfig: true, hardCopy: true}"]
    }]));
    window.consoleDebugAll.push({
      ellapsed: prefix,
      label: args[0],
      args: args,
      date: new Date()
    });
  };
  window.consoleDebugMocked = true;
  console.log('🐝 consoleDebugAdvanced APPLIED');
};

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
/*!***************************!*\
  !*** ./src/core/index.ts ***!
  \***************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/core/utils.ts");

var VERSION = '2.15';
console.debug("\uD83D\uDC1D dyna-userscripts core (built) - loaded - v".concat(VERSION));
(0,_utils__WEBPACK_IMPORTED_MODULE_0__.consoleDebugAdvanced)();
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=index.js.map