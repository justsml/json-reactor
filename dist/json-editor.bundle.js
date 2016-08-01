(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["JsonEditor"] = factory();
	else
		root["JsonEditor"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {module.exports = global["JsonEditor"] = __webpack_require__(1);
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.create = create;
	
	var _keyList = __webpack_require__(2);
	
	var _util = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./util\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	
	function create(elem, config) {
	  if (!elem) {
	    throw new Error('JsonEditor instance requires 1st param `elem`');
	  }
	  if (!config) {
	    throw new Error('JsonEditor instance requires 2nd param `config`');
	  }
	  console.error('KeyList', _keyList.KeyList);
	
	  _util.Styles.add();
	
	  var keyList = (0, _keyList.KeyList)({ data: config });
	  elem.appendChild(keyList);
	  return keyList;
	}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	exports.KeyList = KeyList;
	
	var _config = __webpack_require__(3);
	
	var _util = __webpack_require__(4);
	
	var _svgIcons = __webpack_require__(7);
	
	var _customEvent = __webpack_require__(8);
	
	// _CustomEvent should auto-attach the object to the window... if not make init function
	
	
	function KeyList(_ref) {
	  var data = _ref.data;
	  var parent = _ref.parent;
	  var _ref$depth = _ref.depth;
	  var depth = _ref$depth === undefined ? 0 : _ref$depth;
	
	  var list = (0, _util.createElem)('<ul class="j-keys" depth="' + depth + '"></ul>');
	  Object.keys(data).forEach(function (key, idx, arr) {
	    var valueType = Array.isArray(data[key]) ? 'array' : _typeof(data[key]);
	    var icon = valueType === 'object' ? _svgIcons.arrows.down : valueType === 'array' ? _svgIcons.ux.list : valueType === 'string' ? _svgIcons.ux.edit : _svgIcons.ux.edit;
	    var expandable = valueType === 'object' ? 'j-expandable' : '';
	    var row = (0, _util.createElem)(['<li depth="', depth + 1, '" class="j-closed ', expandable, ' j-type-', valueType, '" key="', key, '">', icon, ' ', key, '</li>'].join(''));
	    console.warn('row', row, valueType, icon);
	    list.appendChild(row);
	  });
	  list.addEventListener('click', function (event) {
	    var li = (0, _util.closest)(event.target, 'li', 2);
	    if (li) {
	      event.preventDefault();
	      var key = li.getAttribute('key');
	      var nextData = data[key];
	      console.warn('CANCELLED click for %s', key, li);
	      var isObject = li.classList.contains('j-type-object');
	      var isArray = li.classList.contains('j-type-array');
	      if (isObject || isArray) {
	        // console.warn('_clicked.on', key, li)
	        if (!li.querySelector('ul')) {
	          // console.warn('_clicked - needs list', li)
	          // do recursion, on demand
	          li.appendChild(KeyList({ data: nextData, parent: li, depth: depth + 1 }));
	          // li.classList.toggle('j-closed')
	        }
	        setTimeout(function () {
	          return li.classList.toggle('j-closed');
	        }, 333);
	        return null;
	      } else {
	        var event_nodeSelected = new CustomEvent('selected', {
	          bubbles: true, cancelable: false,
	          detail: { key: key, data: nextData, element: li, depth: depth + 1, isObject: isObject, isArray: isArray }
	        });
	        li.dispatchEvent(event_nodeSelected);
	        console.warn('Fired Custom Event: ', event_nodeSelected);
	      }
	
	      console.info('_clicked.toggled', key, li);
	    }
	  });
	  return list;
	}

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var config = exports.config = {
	  debug: false
	};

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.toArray = toArray;
	exports.getSorter = getSorter;
	exports.removeAll = removeAll;
	exports.getId = getId;
	
	/**
	 * Utility arrayify method
	 * Add to .prototype of Iterators, ArrayBuffer, Arguments, NodeList, Set/WeakSet, whatever #YOLO
	 *
	 * ... Or just use as util, as needed, #JustDoIt
	 *
	 */
	function toArray(list) {
	  list = Array.isArray(list) ? list : this;
	  list = !list ? [] : list;
	  return Array.from && Array.from(list) || ['upgrade your browser, pfft'];
	}
	
	/**
	 * Get `Array.sort` function for key name comparisons (supports reverse)
	 *
	 * When name === 'email   --- Sort email ascending.
	 *
	 * When name === '-email  --- Sort email descending
	 *
	 * @returns [function] comparer used in `Array.sort()`
	 *
	 */
	function getSorter(key) {
	  var _englishSort = function _englishSort(a, b) {
	    return a[key] < b[key] ? -1 : a[key] > b[key] ? 1 : 0;
	  };
	  var _englishSortReversed = function _englishSortReversed(a, b) {
	    return a[key] >= b[key] ? -1 : a[key] < b[key] ? 1 : 0;
	  };
	
	  if (key[0] === '-') {
	    key = key.substr(1);
	    return _englishSortReversed;
	  }
	  return _englishSort;
	}
	
	/**
	 *
	 */
	var Styles = exports.Styles = {
	  add: function add() {
	    var css = document.querySelector('style#json-editor');
	    if (!css) {
	      var styles = __webpack_require__(5);
	      css = document.createElement('style');
	      css.id = 'json-editor';
	      css.innerHTML = styles;
	      document.head.appendChild(css);
	    }
	  },
	  remove: function remove() {
	    var css = document.querySelector('style#json-editor');
	    if (css && css.parentNode) {
	      css.parentNode.removeChild(css);
	    }
	  }
	};
	
	/**
	 * Accepts elements from `document.querySelectorAll`
	 *
	 * Removes all children of @node
	 *
	 */
	function removeAll(node) {
	  if (this instanceof NodeList) {
	    node = this;
	  }
	
	  toArray(node).forEach(function (el) {
	    return el.parentNode && el.parentNode.removeChild(el);
	  });
	  return node;
	}
	
	/**
	 * Totes obvi
	 */
	function getId(_ref) {
	  var id = _ref.id;
	  var _id = _ref._id;
	  var key = _ref.key;
	  return id || _id || key;
	}
	
	/**
	 * 
	 */
	var closest = exports.closest = function closest(elem, selector) {
	  var limit = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];
	
	  if (limit !== null && limit <= 0) {
	    return false;
	  }
	
	  return !elem ? null : elem.matches && elem.matches(selector) ? elem : elem.classList && elem.classList.contains(selector) ? elem : closest(elem.parentNode, selector, limit !== null ? limit - 1 : limit);
	};
	
	/**
	 * Warning: Private/local use only. Do not hoist.
	 * *** Unsafe HTML/string handling ***
	 */
	var createElem = exports.createElem = function createElem(html) {
	  var container = document.createDocumentFragment();
	  var div = document.createElement('div');
	  div.innerHTML = html; // Potential Security Exploit Vector!!!!!!
	  return div.childNodes.length === 1 ? div.childNodes[0] : div;
	};

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(6)();
	// imports
	
	
	// module
	exports.push([module.id, ".unselectable {\n  user-select: none;\n  -moz-user-select: none;\n  -webkit-user-select: none;\n  -ms-user-select: none;\n}\n.j-xs-1,\n.j-xs-2,\n.j-xs-3,\n.j-xs-4,\n.j-xs-5,\n.j-xs-6,\n.j-xs-7,\n.j-xs-8,\n.j-xs-9,\n.j-xs-10,\n.j-xs-11,\n.j-xs-12 {\n  display: inline-block;\n  box-sizing: border-box;\n}\n.j-xs-1 {\n  width: 8.3333%;\n}\n.j-xs-2 {\n  width: 16.6666%;\n}\n.j-xs-3 {\n  width: 24.9999%;\n}\n.j-xs-4 {\n  width: 33.3332%;\n}\n.j-xs-5 {\n  width: 41.6665%;\n}\n.j-xs-6 {\n  width: 49.9998%;\n}\n.j-xs-7 {\n  width: 58.3331%;\n}\n.j-xs-8 {\n  width: 66.6664%;\n}\n.j-xs-9 {\n  width: 74.9997%;\n}\n.j-xs-10 {\n  width: 83.3331%;\n}\n.j-xs-11 {\n  width: 91.6663%;\n}\n.j-xs-12 {\n  width: 99.9996%;\n}\nul.j-keys {\n  width: 250px;\n  list-style: none;\n  user-select: none;\n  -moz-user-select: none;\n  -webkit-user-select: none;\n  -ms-user-select: none;\n}\nul.j-keys li {\n  display: block;\n  min-width: 250px;\n  min-height: 22px;\n  text-align: left;\n  padding-left: 10px;\n  margin-left: -30px;\n}\nul.j-keys .j-icon-edit,\nul.j-keys .j-icon-list,\nul.j-keys .j-icon-arrow-down {\n  zoom: 40%;\n}\nul.j-keys li:not(.j-closed) > .j-icon-arrow-down {\n  transform: rotate(-90deg) !important;\n}\nul.j-keys .j-closed > ul {\n  display: none;\n}\nul.j-keys .j-closed:before {\n  content: ' ' !important;\n}\nul.j-keys .j-closed > .j-icon-arrow-down {\n  transform: rotate(0deg) !important;\n}\nul.j-keys .j-icon-plus:before {\n  content: ' ';\n}\nul.j-keys .j-icon-list:before {\n  content: ' ';\n}\nul.j-keys .j-icon-text:before {\n  content: '\\2139   ' !important;\n}\nul.j-keys .j-icon-default:before {\n  content: '\\1F524   \\FE0F' !important;\n}\n", ""]);
	
	// exports


/***/ },
/* 6 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];
	
		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
	
		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var arrows = exports.arrows = {
	  // up: `<svg class="j-icon-arrow j-icon-arrow-up" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="isolation:isolate" width="85" height="49"><path d="M 82 44.9999999999999 L 42.98741812244738 4.024153880563309 M 4 45 L 42.98741812244727 4" style="fill:none;stroke:#000000;stroke-width:4;stroke-linecap:round;stroke-linejoin:bevel;stroke-miterlimit:3;"/></svg>`,
	  down: "<svg class=\"j-icon-arrow j-icon-arrow-down\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" style=\"isolation:isolate\" width=\"33\" height=\"22\"><path d=\"M 28 4 L 15.99612865306074 16.99234145250431 M 4 4 L 15.996128653060683 17\" style=\"fill:none;stroke:#000000;stroke-width:8;stroke-linecap:round;stroke-linejoin:bevel;stroke-miterlimit:3;\"/></svg>"
	};
	
	var ux = exports.ux = {
	  list: "<svg class=\"j-icon-list\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" style=\"isolation:isolate\" width=\"24\" height=\"13.3\"><path d=\" M 0 8 L 2.6 8 L 2.6 5.3 L 0 5.3 L 0 8 Z  M 0 13.3 L 2.6 13.3 L 2.6 10.6 L 0 10.6 L 0 13.3 Z  M 0 2.6 L 2.6 2.6 L 2.6 0 L 0 0 L 0 2.6 Z  M 5.3 8 L 24 8 L 24 5.3 L 5.3 5.3 L 5.3 8 Z  M 5.3 13.3 L 24 13.3 L 24 10.6 L 5.3 10.6 L 5.3 13.3 Z  M 5.3 0 L 5.3 2.6 L 24 2.6 L 24 0 L 5.3 0 Z \" fill-rule=\"evenodd\" fill=\"rgb(0,0,0)\" stroke-width=\"1.5\" stroke=\"rgba(0,0,0,0)\" stroke-linecap=\"butt\"/><path d=\" M 0 0 L 36 0 L 36 36 L 0 36 L 0 0 Z \" fill=\"rgba(0,0,0,0)\" stroke-width=\"1.5\" stroke=\"rgba(0,0,0,0)\" stroke-linecap=\"butt\"/></svg>",
	  edit: "<svg class=\"j-icon-edit\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" style=\"isolation:isolate\" width=\"24\" height=\"24\"><path d=\" M -4.4408 19.0006 L -4.4408 24 L 4.9993 24 L 19.7439 9.2553 L 14.7446 4.2560 L -4.4408 19.0006 Z  M 23.61 5.3892 C 24.1299 4.8693 24.1299 4.0294 23.61 3.5095 L 20.49 0.3899 C 19.9705 -0.1299 19.1306 -0.1299 18.6107 0.3899 L 16.171 2.8296 L 21.1703 7.8289 L 23.61 5.3892 Z \" fill-rule=\"evenodd\" fill=\"rgb(0,0,0)\" stroke-width=\"1.50\" stroke=\"rgba(0,0,0,0)\" stroke-linecap=\"butt\"/><path d=\" M 0 0 L 35 0 L 35 35 L 0 35 L 0 0 Z \" fill=\"rgba(0,0,0,0)\" stroke-width=\"1.5\" stroke=\"rgba(0,0,0,0)\" stroke-linecap=\"butt\"/></svg>"
	};

/***/ },
/* 8 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.CustomEvent = CustomEvent;
	
	
	function CustomEvent(event) {
	  var params = arguments.length <= 1 || arguments[1] === undefined ? { bubbles: false, cancelable: false, detail: undefined } : arguments[1];
	
	  var evt = document.createEvent('CustomEvent');
	  evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
	  return evt;
	}
	
	if (window && typeof window.CustomEvent === "function") {
	  // no need to polyfill
	} else {
	  window.CustomEvent = CustomEvent;
	  CustomEvent.prototype = window.Event.prototype;
	}

/***/ }
/******/ ])
});
;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBiMTM4ZTFiY2ZmY2VjMGRjYzkxZCIsIndlYnBhY2s6Ly8vLi9pbmRleC5qcz80YzA4Iiwid2VicGFjazovLy8uL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9rZXktbGlzdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29uZmlnLmpzIiwid2VicGFjazovLy8uL3NyYy91dGlsLmpzIiwid2VicGFjazovLy8uL3NyYy9zdHlsZS5sZXNzIiwid2VicGFjazovLy8uL34vY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N2Zy1pY29ucy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY3VzdG9tLWV2ZW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7OztBQ3RDQSw0R0FBa0osRTs7Ozs7Ozs7Ozs7O1NDR2xJLE0sR0FBQSxNOztBQUhoQjs7QUFDQTs7QUFFTyxVQUFTLE1BQVQsQ0FBZ0IsSUFBaEIsRUFBc0IsTUFBdEIsRUFBOEI7QUFDbkMsT0FBSSxDQUFDLElBQUwsRUFBYTtBQUFFLFdBQU0sSUFBSSxLQUFKLENBQVUsK0NBQVYsQ0FBTjtBQUFrRTtBQUNqRixPQUFJLENBQUMsTUFBTCxFQUFhO0FBQUUsV0FBTSxJQUFJLEtBQUosQ0FBVSxpREFBVixDQUFOO0FBQW9FO0FBQ25GLFdBQVEs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QUFyQixFQUE2RjtBQUFBLE9BQWpFLE1BQWlFLHlEQUF4RCxFQUFDLFNBQVMsS0FBVixFQUFpQixZQUFZLEtBQTdCLEVBQW9DLFFBQVEsU0FBNUMsRUFBd0Q7O0FBQzNGLE9BQUksTUFBTSxTQUFTLFdBQVQsQ0FBc0IsYUFBdEIsQ0FBVjtBQUNBLE9BQUksZUFBSixDQUFxQixLQUFyQixFQUE0QixPQUFPLE9BQW5DLEVBQTRDLE9BQU8sVUFBbkQsRUFBK0QsT0FBTyxNQUF0RTtBQUNBLFVBQU8sR0FBUDtBQUNEOztBQUVELEtBQUksVUFBVSxPQUFPLE9BQU8sV0FBZCxLQUE4QixVQUE1QyxFQUF3RDtBQUN0RDtBQUNELEVBRkQsTUFFTztBQUNMLFVBQU8sV0FBUCxHQUFxQixXQUFyQjtBQUNBLGVBQVksU0FBWixHQUF3QixPQUFPLEtBQVAsQ0FBYSxTQUFyQztBQUNELEUiLCJmaWxlIjoianNvbi1lZGl0b3IuYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiSnNvbkVkaXRvclwiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJKc29uRWRpdG9yXCJdID0gZmFjdG9yeSgpO1xufSkodGhpcywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uXG4gKiovIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCBiMTM4ZTFiY2ZmY2VjMGRjYzkxZFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gZ2xvYmFsW1wiSnNvbkVkaXRvclwiXSA9IHJlcXVpcmUoXCItIS9Vc2Vycy9kbGV2eS9jb2RlL29zcy9qc29uLWVkaXRvci9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2luZGV4LmpzP3tcXFwicHJlc2V0c1xcXCI6W1xcXCJlczIwMTVcXFwiXX0hL1VzZXJzL2RsZXZ5L2NvZGUvb3NzL2pzb24tZWRpdG9yL2luZGV4LmpzXCIpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9pbmRleC5qc1xuICoqIG1vZHVsZSBpZCA9IDBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImltcG9ydCB7S2V5TGlzdH0gICAgICBmcm9tICcuL3NyYy9rZXktbGlzdCdcbmltcG9ydCB7U3R5bGVzfSAgICAgICBmcm9tICcuL3V0aWwnXG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGUoZWxlbSwgY29uZmlnKSB7XG4gIGlmICghZWxlbSkgICB7IHRocm93IG5ldyBFcnJvcignSnNvbkVkaXRvciBpbnN0YW5jZSByZXF1aXJlcyAxc3QgcGFyYW0gYGVsZW1gJykgfVxuICBpZiAoIWNvbmZpZykgeyB0aHJvdyBuZXcgRXJyb3IoJ0pzb25FZGl0b3IgaW5zdGFuY2UgcmVxdWlyZXMgMm5kIHBhcmFtIGBjb25maWdgJykgfVxuICBjb25zb2xlLmVycm9yKCdLZXlMaXN0JywgS2V5TGlzdClcblxuICBTdHlsZXMuYWRkKClcblxuICBsZXQga2V5TGlzdCA9IEtleUxpc3Qoe2RhdGE6IGNvbmZpZ30pXG4gIGVsZW0uYXBwZW5kQ2hpbGQoa2V5TGlzdClcbiAgcmV0dXJuIGtleUxpc3Q7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2luZGV4LmpzXG4gKiovIiwiaW1wb3J0IHtjb25maWd9ICAgICAgICAgICAgICAgICAgICAgICAgIGZyb20gJy4vY29uZmlnJ1xuaW1wb3J0IHtjcmVhdGVFbGVtLCBjbG9zZXN0LCByZW1vdmVBbGx9IGZyb20gJy4vdXRpbCdcbmltcG9ydCB7YXJyb3dzLCB1eH0gICAgICAgICAgICAgICAgICAgICBmcm9tICcuL3N2Zy1pY29ucydcbmltcG9ydCB7Q3VzdG9tRXZlbnQgYXMgX0N1c3RvbUV2ZW50fSAgICBmcm9tICcuL2N1c3RvbS1ldmVudCdcbi8vIF9DdXN0b21FdmVudCBzaG91bGQgYXV0by1hdHRhY2ggdGhlIG9iamVjdCB0byB0aGUgd2luZG93Li4uIGlmIG5vdCBtYWtlIGluaXQgZnVuY3Rpb25cblxuXG5leHBvcnQgZnVuY3Rpb24gS2V5TGlzdCh7ZGF0YSwgcGFyZW50LCBkZXB0aCA9IDB9KSB7XG4gIGNvbnN0IGxpc3QgPSBjcmVhdGVFbGVtKCc8dWwgY2xhc3M9XCJqLWtleXNcIiBkZXB0aD1cIicgKyBkZXB0aCArICdcIj48L3VsPicpXG4gIE9iamVjdFxuICAgIC5rZXlzKGRhdGEpXG4gICAgLmZvckVhY2goKGtleSwgaWR4LCBhcnIpID0+IHtcbiAgICAgIGNvbnN0IHZhbHVlVHlwZSAgID0gQXJyYXkuaXNBcnJheShkYXRhW2tleV0pID8gJ2FycmF5JyA6IHR5cGVvZiBkYXRhW2tleV1cbiAgICAgIGNvbnN0IGljb24gICAgICAgID0gICAgICAgICAgICB2YWx1ZVR5cGUgPT09ICdvYmplY3QnID8gXG4gICAgICAgICAgICAgICAgICAgICAgYXJyb3dzLmRvd24gIDogdmFsdWVUeXBlID09PSAnYXJyYXknID9cbiAgICAgICAgICAgICAgICAgICAgICB1eC5saXN0ICAgICAgOiB2YWx1ZVR5cGUgPT09ICdzdHJpbmcnID8gXG4gICAgICAgICAgICAgICAgICAgICAgdXguZWRpdCAgICAgIDogdXguZWRpdFxuICAgICAgY29uc3QgZXhwYW5kYWJsZSAgPSB2YWx1ZVR5cGUgPT09ICdvYmplY3QnID8gJ2otZXhwYW5kYWJsZScgOiAnJ1xuICAgICAgY29uc3Qgcm93ID0gY3JlYXRlRWxlbShbJzxsaSBkZXB0aD1cIicsIGRlcHRoKzEsICdcIiBjbGFzcz1cImotY2xvc2VkICcsIGV4cGFuZGFibGUsICcgai10eXBlLScsIHZhbHVlVHlwZSwgJ1wiIGtleT1cIicsIGtleSwgJ1wiPicsIGljb24sICcgJywga2V5LCAnPC9saT4nXS5qb2luKCcnKSlcbiAgICAgIGNvbnNvbGUud2Fybigncm93Jywgcm93LCB2YWx1ZVR5cGUsIGljb24pXG4gICAgICBsaXN0LmFwcGVuZENoaWxkKHJvdylcbiAgICB9KVxuICBsaXN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXZlbnQgPT4ge1xuICAgIGNvbnN0IGxpID0gY2xvc2VzdChldmVudC50YXJnZXQsICdsaScsIDIpXG4gICAgaWYgKGxpKSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICBjb25zdCBrZXkgICAgICAgPSBsaS5nZXRBdHRyaWJ1dGUoJ2tleScpXG4gICAgICBjb25zdCBuZXh0RGF0YSAgPSBkYXRhW2tleV1cbiAgICAgIGNvbnNvbGUud2FybignQ0FOQ0VMTEVEIGNsaWNrIGZvciAlcycsIGtleSwgbGkpXG4gICAgICBjb25zdCBpc09iamVjdCA9IGxpLmNsYXNzTGlzdC5jb250YWlucygnai10eXBlLW9iamVjdCcpXG4gICAgICBjb25zdCBpc0FycmF5ICA9IGxpLmNsYXNzTGlzdC5jb250YWlucygnai10eXBlLWFycmF5JylcbiAgICAgIGlmIChpc09iamVjdCB8fCBpc0FycmF5KSB7XG4gICAgICAgIC8vIGNvbnNvbGUud2FybignX2NsaWNrZWQub24nLCBrZXksIGxpKVxuICAgICAgICBpZiAoIWxpLnF1ZXJ5U2VsZWN0b3IoJ3VsJykpIHtcbiAgICAgICAgICAvLyBjb25zb2xlLndhcm4oJ19jbGlja2VkIC0gbmVlZHMgbGlzdCcsIGxpKVxuICAgICAgICAgIC8vIGRvIHJlY3Vyc2lvbiwgb24gZGVtYW5kXG4gICAgICAgICAgbGkuYXBwZW5kQ2hpbGQoS2V5TGlzdCh7ZGF0YTogbmV4dERhdGEsIHBhcmVudDogbGksIGRlcHRoOiBkZXB0aCArIDF9KSlcbiAgICAgICAgICAvLyBsaS5jbGFzc0xpc3QudG9nZ2xlKCdqLWNsb3NlZCcpXG4gICAgICAgIH1cbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiBsaS5jbGFzc0xpc3QudG9nZ2xlKCdqLWNsb3NlZCcpLCAzMzMpXG4gICAgICAgIHJldHVybiBudWxsXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBldmVudF9ub2RlU2VsZWN0ZWQgPSBuZXcgQ3VzdG9tRXZlbnQoJ3NlbGVjdGVkJywge1xuICAgICAgICAgIGJ1YmJsZXM6IHRydWUsIGNhbmNlbGFibGU6IGZhbHNlLCBcbiAgICAgICAgICBkZXRhaWw6IHtrZXk6IGtleSwgZGF0YTogbmV4dERhdGEsIGVsZW1lbnQ6IGxpLCBkZXB0aDogZGVwdGggKyAxLCBpc09iamVjdCwgaXNBcnJheX1cbiAgICAgICAgfSlcbiAgICAgICAgbGkuZGlzcGF0Y2hFdmVudChldmVudF9ub2RlU2VsZWN0ZWQpXG4gICAgICAgIGNvbnNvbGUud2FybignRmlyZWQgQ3VzdG9tIEV2ZW50OiAnLCBldmVudF9ub2RlU2VsZWN0ZWQpXG4gICAgICB9XG5cbiAgICAgIGNvbnNvbGUuaW5mbygnX2NsaWNrZWQudG9nZ2xlZCcsIGtleSwgbGkpXG4gICAgfVxuICB9KVxuICByZXR1cm4gbGlzdFxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMva2V5LWxpc3QuanNcbiAqKi8iLCJleHBvcnQgY29uc3QgY29uZmlnID0ge1xuICBkZWJ1ZzogZmFsc2Vcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2NvbmZpZy5qc1xuICoqLyIsIlxuLyoqXG4gKiBVdGlsaXR5IGFycmF5aWZ5IG1ldGhvZFxuICogQWRkIHRvIC5wcm90b3R5cGUgb2YgSXRlcmF0b3JzLCBBcnJheUJ1ZmZlciwgQXJndW1lbnRzLCBOb2RlTGlzdCwgU2V0L1dlYWtTZXQsIHdoYXRldmVyICNZT0xPXG4gKlxuICogLi4uIE9yIGp1c3QgdXNlIGFzIHV0aWwsIGFzIG5lZWRlZCwgI0p1c3REb0l0XG4gKlxuICovXG5leHBvcnQgZnVuY3Rpb24gdG9BcnJheShsaXN0KSB7XG4gIGxpc3QgPSBBcnJheS5pc0FycmF5KGxpc3QpID8gbGlzdCA6IHRoaXNcbiAgbGlzdCA9ICFsaXN0ID8gW10gOiBsaXN0XG4gIHJldHVybiBBcnJheS5mcm9tICYmIEFycmF5LmZyb20obGlzdCkgfHwgWyd1cGdyYWRlIHlvdXIgYnJvd3NlciwgcGZmdCddXG59XG5cbi8qKlxuICogR2V0IGBBcnJheS5zb3J0YCBmdW5jdGlvbiBmb3Iga2V5IG5hbWUgY29tcGFyaXNvbnMgKHN1cHBvcnRzIHJldmVyc2UpXG4gKlxuICogV2hlbiBuYW1lID09PSAnZW1haWwgICAtLS0gU29ydCBlbWFpbCBhc2NlbmRpbmcuXG4gKlxuICogV2hlbiBuYW1lID09PSAnLWVtYWlsICAtLS0gU29ydCBlbWFpbCBkZXNjZW5kaW5nXG4gKlxuICogQHJldHVybnMgW2Z1bmN0aW9uXSBjb21wYXJlciB1c2VkIGluIGBBcnJheS5zb3J0KClgXG4gKlxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0U29ydGVyKGtleSkge1xuICBjb25zdCBfZW5nbGlzaFNvcnQgICAgICAgICA9IChhLCBiKSA9PiAoYVtrZXldIDwgYltrZXldID8gLTEgOiAoYVtrZXldID4gYltrZXldID8gMSA6IDApKVxuICBjb25zdCBfZW5nbGlzaFNvcnRSZXZlcnNlZCA9IChhLCBiKSA9PiAoYVtrZXldID49IGJba2V5XSA/IC0xIDogKGFba2V5XSA8IGJba2V5XSA/IDEgOiAwKSlcblxuICBpZiAoa2V5WzBdID09PSAnLScpIHtcbiAgICBrZXkgPSBrZXkuc3Vic3RyKDEpO1xuICAgIHJldHVybiBfZW5nbGlzaFNvcnRSZXZlcnNlZDtcbiAgfVxuICByZXR1cm4gX2VuZ2xpc2hTb3J0O1xufVxuXG4vKipcbiAqXG4gKi9cbmV4cG9ydCBjb25zdCBTdHlsZXMgPSB7XG4gIGFkZDogKCkgPT4ge1xuICAgIGxldCBjc3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdzdHlsZSNqc29uLWVkaXRvcicpXG4gICAgaWYgKCFjc3MpIHtcbiAgICAgIGNvbnN0IHN0eWxlcyAgPSByZXF1aXJlKCchY3NzIWxlc3MhLi9zdHlsZS5sZXNzJylcbiAgICAgIGNzcyAgICAgICAgICAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpXG4gICAgICBjc3MuaWQgICAgICAgID0gJ2pzb24tZWRpdG9yJ1xuICAgICAgY3NzLmlubmVySFRNTCA9IHN0eWxlc1xuICAgICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChjc3MpXG4gICAgfVxuICB9LFxuICByZW1vdmU6ICgpID0+IHtcbiAgICBsZXQgY3NzID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcignc3R5bGUjanNvbi1lZGl0b3InKVxuICAgIGlmIChjc3MgJiYgY3NzLnBhcmVudE5vZGUpIHsgY3NzLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoY3NzKSB9XG4gIH1cbn1cblxuLyoqXG4gKiBBY2NlcHRzIGVsZW1lbnRzIGZyb20gYGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGxgXG4gKlxuICogUmVtb3ZlcyBhbGwgY2hpbGRyZW4gb2YgQG5vZGVcbiAqXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVBbGwobm9kZSkge1xuICBpZiAodGhpcyBpbnN0YW5jZW9mIE5vZGVMaXN0KSB7IG5vZGUgPSB0aGlzOyB9XG5cbiAgdG9BcnJheShub2RlKVxuICAgIC5mb3JFYWNoKGVsID0+IGVsLnBhcmVudE5vZGUgJiYgZWwucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChlbCkpXG4gIHJldHVybiBub2RlXG59XG5cbi8qKlxuICogVG90ZXMgb2J2aVxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0SWQoe2lkLCBfaWQsIGtleX0pIHsgcmV0dXJuIGlkIHx8IF9pZCB8fCBrZXk7IH1cblxuLyoqXG4gKiBcbiAqL1xuZXhwb3J0IGNvbnN0IGNsb3Nlc3QgPSAoZWxlbSwgc2VsZWN0b3IsIGxpbWl0ID0gbnVsbCkgPT4ge1xuICBpZiAobGltaXQgIT09IG51bGwgJiYgbGltaXQgPD0gMCkgeyByZXR1cm4gZmFsc2UgfVxuXG4gIHJldHVybiAhZWxlbSA/IG51bGxcbiAgICAgICAgIDogZWxlbS5tYXRjaGVzICYmIGVsZW0ubWF0Y2hlcyhzZWxlY3RvcikgXG4gICAgICAgICA/IGVsZW0gOiBlbGVtLmNsYXNzTGlzdCAmJiBlbGVtLmNsYXNzTGlzdC5jb250YWlucyhzZWxlY3RvcilcbiAgICAgICAgID8gZWxlbSA6IGNsb3Nlc3QoZWxlbS5wYXJlbnROb2RlLCBzZWxlY3RvciwgKGxpbWl0ICE9PSBudWxsID8gbGltaXQgLSAxIDogbGltaXQpKVxufVxuXG4vKipcbiAqIFdhcm5pbmc6IFByaXZhdGUvbG9jYWwgdXNlIG9ubHkuIERvIG5vdCBob2lzdC5cbiAqICoqKiBVbnNhZmUgSFRNTC9zdHJpbmcgaGFuZGxpbmcgKioqXG4gKi9cbmV4cG9ydCBjb25zdCBjcmVhdGVFbGVtID0gaHRtbCA9PiB7XG4gIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKVxuICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICBkaXYuaW5uZXJIVE1MID0gaHRtbCAvLyBQb3RlbnRpYWwgU2VjdXJpdHkgRXhwbG9pdCBWZWN0b3IhISEhISFcbiAgcmV0dXJuIGRpdi5jaGlsZE5vZGVzLmxlbmd0aCA9PT0gMSA/IGRpdi5jaGlsZE5vZGVzWzBdIDogZGl2XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy91dGlsLmpzXG4gKiovIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKCk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIudW5zZWxlY3RhYmxlIHtcXG4gIHVzZXItc2VsZWN0OiBub25lO1xcbiAgLW1vei11c2VyLXNlbGVjdDogbm9uZTtcXG4gIC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7XFxuICAtbXMtdXNlci1zZWxlY3Q6IG5vbmU7XFxufVxcbi5qLXhzLTEsXFxuLmoteHMtMixcXG4uai14cy0zLFxcbi5qLXhzLTQsXFxuLmoteHMtNSxcXG4uai14cy02LFxcbi5qLXhzLTcsXFxuLmoteHMtOCxcXG4uai14cy05LFxcbi5qLXhzLTEwLFxcbi5qLXhzLTExLFxcbi5qLXhzLTEyIHtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxufVxcbi5qLXhzLTEge1xcbiAgd2lkdGg6IDguMzMzMyU7XFxufVxcbi5qLXhzLTIge1xcbiAgd2lkdGg6IDE2LjY2NjYlO1xcbn1cXG4uai14cy0zIHtcXG4gIHdpZHRoOiAyNC45OTk5JTtcXG59XFxuLmoteHMtNCB7XFxuICB3aWR0aDogMzMuMzMzMiU7XFxufVxcbi5qLXhzLTUge1xcbiAgd2lkdGg6IDQxLjY2NjUlO1xcbn1cXG4uai14cy02IHtcXG4gIHdpZHRoOiA0OS45OTk4JTtcXG59XFxuLmoteHMtNyB7XFxuICB3aWR0aDogNTguMzMzMSU7XFxufVxcbi5qLXhzLTgge1xcbiAgd2lkdGg6IDY2LjY2NjQlO1xcbn1cXG4uai14cy05IHtcXG4gIHdpZHRoOiA3NC45OTk3JTtcXG59XFxuLmoteHMtMTAge1xcbiAgd2lkdGg6IDgzLjMzMzElO1xcbn1cXG4uai14cy0xMSB7XFxuICB3aWR0aDogOTEuNjY2MyU7XFxufVxcbi5qLXhzLTEyIHtcXG4gIHdpZHRoOiA5OS45OTk2JTtcXG59XFxudWwuai1rZXlzIHtcXG4gIHdpZHRoOiAyNTBweDtcXG4gIGxpc3Qtc3R5bGU6IG5vbmU7XFxuICB1c2VyLXNlbGVjdDogbm9uZTtcXG4gIC1tb3otdXNlci1zZWxlY3Q6IG5vbmU7XFxuICAtd2Via2l0LXVzZXItc2VsZWN0OiBub25lO1xcbiAgLW1zLXVzZXItc2VsZWN0OiBub25lO1xcbn1cXG51bC5qLWtleXMgbGkge1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICBtaW4td2lkdGg6IDI1MHB4O1xcbiAgbWluLWhlaWdodDogMjJweDtcXG4gIHRleHQtYWxpZ246IGxlZnQ7XFxuICBwYWRkaW5nLWxlZnQ6IDEwcHg7XFxuICBtYXJnaW4tbGVmdDogLTMwcHg7XFxufVxcbnVsLmota2V5cyAuai1pY29uLWVkaXQsXFxudWwuai1rZXlzIC5qLWljb24tbGlzdCxcXG51bC5qLWtleXMgLmotaWNvbi1hcnJvdy1kb3duIHtcXG4gIHpvb206IDQwJTtcXG59XFxudWwuai1rZXlzIGxpOm5vdCguai1jbG9zZWQpID4gLmotaWNvbi1hcnJvdy1kb3duIHtcXG4gIHRyYW5zZm9ybTogcm90YXRlKC05MGRlZykgIWltcG9ydGFudDtcXG59XFxudWwuai1rZXlzIC5qLWNsb3NlZCA+IHVsIHtcXG4gIGRpc3BsYXk6IG5vbmU7XFxufVxcbnVsLmota2V5cyAuai1jbG9zZWQ6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6ICcgJyAhaW1wb3J0YW50O1xcbn1cXG51bC5qLWtleXMgLmotY2xvc2VkID4gLmotaWNvbi1hcnJvdy1kb3duIHtcXG4gIHRyYW5zZm9ybTogcm90YXRlKDBkZWcpICFpbXBvcnRhbnQ7XFxufVxcbnVsLmota2V5cyAuai1pY29uLXBsdXM6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6ICcgJztcXG59XFxudWwuai1rZXlzIC5qLWljb24tbGlzdDpiZWZvcmUge1xcbiAgY29udGVudDogJyAnO1xcbn1cXG51bC5qLWtleXMgLmotaWNvbi10ZXh0OmJlZm9yZSB7XFxuICBjb250ZW50OiAnXFxcXDIxMzkgICAnICFpbXBvcnRhbnQ7XFxufVxcbnVsLmota2V5cyAuai1pY29uLWRlZmF1bHQ6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6ICdcXFxcMUY1MjQgICBcXFxcRkUwRicgIWltcG9ydGFudDtcXG59XFxuXCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vY3NzLWxvYWRlciEuL34vbGVzcy1sb2FkZXIhLi9zcmMvc3R5bGUubGVzc1xuICoqIG1vZHVsZSBpZCA9IDVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qXHJcblx0TUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcclxuXHRBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXHJcbiovXHJcbi8vIGNzcyBiYXNlIGNvZGUsIGluamVjdGVkIGJ5IHRoZSBjc3MtbG9hZGVyXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XHJcblx0dmFyIGxpc3QgPSBbXTtcclxuXHJcblx0Ly8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xyXG5cdGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcclxuXHRcdHZhciByZXN1bHQgPSBbXTtcclxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciBpdGVtID0gdGhpc1tpXTtcclxuXHRcdFx0aWYoaXRlbVsyXSkge1xyXG5cdFx0XHRcdHJlc3VsdC5wdXNoKFwiQG1lZGlhIFwiICsgaXRlbVsyXSArIFwie1wiICsgaXRlbVsxXSArIFwifVwiKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRyZXN1bHQucHVzaChpdGVtWzFdKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHJlc3VsdC5qb2luKFwiXCIpO1xyXG5cdH07XHJcblxyXG5cdC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XHJcblx0bGlzdC5pID0gZnVuY3Rpb24obW9kdWxlcywgbWVkaWFRdWVyeSkge1xyXG5cdFx0aWYodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpXHJcblx0XHRcdG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIFwiXCJdXTtcclxuXHRcdHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XHJcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHR2YXIgaWQgPSB0aGlzW2ldWzBdO1xyXG5cdFx0XHRpZih0eXBlb2YgaWQgPT09IFwibnVtYmVyXCIpXHJcblx0XHRcdFx0YWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xyXG5cdFx0fVxyXG5cdFx0Zm9yKGkgPSAwOyBpIDwgbW9kdWxlcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHR2YXIgaXRlbSA9IG1vZHVsZXNbaV07XHJcblx0XHRcdC8vIHNraXAgYWxyZWFkeSBpbXBvcnRlZCBtb2R1bGVcclxuXHRcdFx0Ly8gdGhpcyBpbXBsZW1lbnRhdGlvbiBpcyBub3QgMTAwJSBwZXJmZWN0IGZvciB3ZWlyZCBtZWRpYSBxdWVyeSBjb21iaW5hdGlvbnNcclxuXHRcdFx0Ly8gIHdoZW4gYSBtb2R1bGUgaXMgaW1wb3J0ZWQgbXVsdGlwbGUgdGltZXMgd2l0aCBkaWZmZXJlbnQgbWVkaWEgcXVlcmllcy5cclxuXHRcdFx0Ly8gIEkgaG9wZSB0aGlzIHdpbGwgbmV2ZXIgb2NjdXIgKEhleSB0aGlzIHdheSB3ZSBoYXZlIHNtYWxsZXIgYnVuZGxlcylcclxuXHRcdFx0aWYodHlwZW9mIGl0ZW1bMF0gIT09IFwibnVtYmVyXCIgfHwgIWFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcclxuXHRcdFx0XHRpZihtZWRpYVF1ZXJ5ICYmICFpdGVtWzJdKSB7XHJcblx0XHRcdFx0XHRpdGVtWzJdID0gbWVkaWFRdWVyeTtcclxuXHRcdFx0XHR9IGVsc2UgaWYobWVkaWFRdWVyeSkge1xyXG5cdFx0XHRcdFx0aXRlbVsyXSA9IFwiKFwiICsgaXRlbVsyXSArIFwiKSBhbmQgKFwiICsgbWVkaWFRdWVyeSArIFwiKVwiO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRsaXN0LnB1c2goaXRlbSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9O1xyXG5cdHJldHVybiBsaXN0O1xyXG59O1xyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1xuICoqIG1vZHVsZSBpZCA9IDZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIlxuZXhwb3J0IGNvbnN0IGFycm93cyA9IHtcbiAgLy8gdXA6IGA8c3ZnIGNsYXNzPVwiai1pY29uLWFycm93IGotaWNvbi1hcnJvdy11cFwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB4bWxuczp4bGluaz1cImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmtcIiBzdHlsZT1cImlzb2xhdGlvbjppc29sYXRlXCIgd2lkdGg9XCI4NVwiIGhlaWdodD1cIjQ5XCI+PHBhdGggZD1cIk0gODIgNDQuOTk5OTk5OTk5OTk5OSBMIDQyLjk4NzQxODEyMjQ0NzM4IDQuMDI0MTUzODgwNTYzMzA5IE0gNCA0NSBMIDQyLjk4NzQxODEyMjQ0NzI3IDRcIiBzdHlsZT1cImZpbGw6bm9uZTtzdHJva2U6IzAwMDAwMDtzdHJva2Utd2lkdGg6NDtzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbGluZWpvaW46YmV2ZWw7c3Ryb2tlLW1pdGVybGltaXQ6MztcIi8+PC9zdmc+YCxcbiAgZG93bjogYDxzdmcgY2xhc3M9XCJqLWljb24tYXJyb3cgai1pY29uLWFycm93LWRvd25cIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgeG1sbnM6eGxpbms9XCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rXCIgc3R5bGU9XCJpc29sYXRpb246aXNvbGF0ZVwiIHdpZHRoPVwiMzNcIiBoZWlnaHQ9XCIyMlwiPjxwYXRoIGQ9XCJNIDI4IDQgTCAxNS45OTYxMjg2NTMwNjA3NCAxNi45OTIzNDE0NTI1MDQzMSBNIDQgNCBMIDE1Ljk5NjEyODY1MzA2MDY4MyAxN1wiIHN0eWxlPVwiZmlsbDpub25lO3N0cm9rZTojMDAwMDAwO3N0cm9rZS13aWR0aDo4O3N0cm9rZS1saW5lY2FwOnJvdW5kO3N0cm9rZS1saW5lam9pbjpiZXZlbDtzdHJva2UtbWl0ZXJsaW1pdDozO1wiLz48L3N2Zz5gLFxuICAvLyByaWdodDogYDxzdmcgY2xhc3M9XCJqLWljb24tYXJyb3cgai1pY29uLWFycm93LXJpZ2h0XCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHhtbG5zOnhsaW5rPVwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGlua1wiIHN0eWxlPVwiaXNvbGF0aW9uOmlzb2xhdGVcIiB3aWR0aD1cIjUwXCIgaGVpZ2h0PVwiODRcIj48cGF0aCBkPVwiTSA0LjAwMDAwMDAwMDAwMDEyOCA4MCBMIDQ2IDQxLjQ5OTg5NjIwNDI2Nzc3IE0gNCAzIEwgNDUuOTk5OTk5OTk5OTk5ODQ0IDQxLjQ5OTg5NjIwNDI2NzczNVwiIHN0eWxlPVwiZmlsbDpub25lO3N0cm9rZTojMDAwMDAwO3N0cm9rZS13aWR0aDo0O3N0cm9rZS1saW5lY2FwOnJvdW5kO3N0cm9rZS1saW5lam9pbjpiZXZlbDtzdHJva2UtbWl0ZXJsaW1pdDozO1wiLz48L3N2Zz5gLFxuICAvLyBsZWZ0OiBgPHN2ZyBjbGFzcz1cImotaWNvbi1hcnJvdyBqLWljb24tYXJyb3ctbGVmdFwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB4bWxuczp4bGluaz1cImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmtcIiBzdHlsZT1cImlzb2xhdGlvbjppc29sYXRlXCIgd2lkdGg9XCI0OVwiIGhlaWdodD1cIjg2XCI+PHBhdGggZD1cIk0gNDQuOTk5OTk5OTk5OTk5ODkgODIgTCA0LjAyNDE1Mzg4MDU2MzMwOTUgNDIuOTg3NDE4MTIyNDQ3MzUgTSA0NSA0IEwgNCA0Mi45ODc0MTgxMjI0NDcyNDVcIiBzdHlsZT1cImZpbGw6bm9uZTtzdHJva2U6IzAwMDAwMDtzdHJva2Utd2lkdGg6NDtzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbGluZWpvaW46YmV2ZWw7c3Ryb2tlLW1pdGVybGltaXQ6MztcIi8+PC9zdmc+YCxcbn1cblxuZXhwb3J0IGNvbnN0IHV4ID0ge1xuICBsaXN0OiBgPHN2ZyBjbGFzcz1cImotaWNvbi1saXN0XCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHhtbG5zOnhsaW5rPVwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGlua1wiIHN0eWxlPVwiaXNvbGF0aW9uOmlzb2xhdGVcIiB3aWR0aD1cIjI0XCIgaGVpZ2h0PVwiMTMuM1wiPjxwYXRoIGQ9XCIgTSAwIDggTCAyLjYgOCBMIDIuNiA1LjMgTCAwIDUuMyBMIDAgOCBaICBNIDAgMTMuMyBMIDIuNiAxMy4zIEwgMi42IDEwLjYgTCAwIDEwLjYgTCAwIDEzLjMgWiAgTSAwIDIuNiBMIDIuNiAyLjYgTCAyLjYgMCBMIDAgMCBMIDAgMi42IFogIE0gNS4zIDggTCAyNCA4IEwgMjQgNS4zIEwgNS4zIDUuMyBMIDUuMyA4IFogIE0gNS4zIDEzLjMgTCAyNCAxMy4zIEwgMjQgMTAuNiBMIDUuMyAxMC42IEwgNS4zIDEzLjMgWiAgTSA1LjMgMCBMIDUuMyAyLjYgTCAyNCAyLjYgTCAyNCAwIEwgNS4zIDAgWiBcIiBmaWxsLXJ1bGU9XCJldmVub2RkXCIgZmlsbD1cInJnYigwLDAsMClcIiBzdHJva2Utd2lkdGg9XCIxLjVcIiBzdHJva2U9XCJyZ2JhKDAsMCwwLDApXCIgc3Ryb2tlLWxpbmVjYXA9XCJidXR0XCIvPjxwYXRoIGQ9XCIgTSAwIDAgTCAzNiAwIEwgMzYgMzYgTCAwIDM2IEwgMCAwIFogXCIgZmlsbD1cInJnYmEoMCwwLDAsMClcIiBzdHJva2Utd2lkdGg9XCIxLjVcIiBzdHJva2U9XCJyZ2JhKDAsMCwwLDApXCIgc3Ryb2tlLWxpbmVjYXA9XCJidXR0XCIvPjwvc3ZnPmAsXG4gIGVkaXQ6IGA8c3ZnIGNsYXNzPVwiai1pY29uLWVkaXRcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgeG1sbnM6eGxpbms9XCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rXCIgc3R5bGU9XCJpc29sYXRpb246aXNvbGF0ZVwiIHdpZHRoPVwiMjRcIiBoZWlnaHQ9XCIyNFwiPjxwYXRoIGQ9XCIgTSAtNC40NDA4IDE5LjAwMDYgTCAtNC40NDA4IDI0IEwgNC45OTkzIDI0IEwgMTkuNzQzOSA5LjI1NTMgTCAxNC43NDQ2IDQuMjU2MCBMIC00LjQ0MDggMTkuMDAwNiBaICBNIDIzLjYxIDUuMzg5MiBDIDI0LjEyOTkgNC44NjkzIDI0LjEyOTkgNC4wMjk0IDIzLjYxIDMuNTA5NSBMIDIwLjQ5IDAuMzg5OSBDIDE5Ljk3MDUgLTAuMTI5OSAxOS4xMzA2IC0wLjEyOTkgMTguNjEwNyAwLjM4OTkgTCAxNi4xNzEgMi44Mjk2IEwgMjEuMTcwMyA3LjgyODkgTCAyMy42MSA1LjM4OTIgWiBcIiBmaWxsLXJ1bGU9XCJldmVub2RkXCIgZmlsbD1cInJnYigwLDAsMClcIiBzdHJva2Utd2lkdGg9XCIxLjUwXCIgc3Ryb2tlPVwicmdiYSgwLDAsMCwwKVwiIHN0cm9rZS1saW5lY2FwPVwiYnV0dFwiLz48cGF0aCBkPVwiIE0gMCAwIEwgMzUgMCBMIDM1IDM1IEwgMCAzNSBMIDAgMCBaIFwiIGZpbGw9XCJyZ2JhKDAsMCwwLDApXCIgc3Ryb2tlLXdpZHRoPVwiMS41XCIgc3Ryb2tlPVwicmdiYSgwLDAsMCwwKVwiIHN0cm9rZS1saW5lY2FwPVwiYnV0dFwiLz48L3N2Zz5gLFxuICAvLyBlZGl0TGluZTogYDxzdmcgY2xhc3M9XCJqLWljb24tZWRpdC1saW5lXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHhtbG5zOnhsaW5rPVwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGlua1wiIHN0eWxlPVwiaXNvbGF0aW9uOmlzb2xhdGVcIiB3aWR0aD1cIjM2XCIgaGVpZ2h0PVwiMzZcIj48cGF0aCBkPVwiIE0gMjYuNjIgMTAuNTAgTCAyMSA0Ljg3IEwgNiAxOS44NyBMIDYgMjUuNTAgTCAxMS42MiAyNS41IEwgMjYuNiAxMC41IFogIE0gMzEuMDYgNi4wNiBDIDMxLjY1IDUuNDcgMzEuNjUgNC41MzM3NSAzMS4wNjUgMy45NCBMIDI3LjU1NSAwLjQzIEMgMjYuOTcgLTAuMTQgMjYuMDIyIC0wLjE0IDI1LjQ0IDAuNDMgTCAyMi41IDMuMzcgTCAyOC4xMjUgOSBMIDMxLjA2NSA2LjA2IFogXCIgZmlsbC1ydWxlPVwiZXZlbm9kZFwiIGZpbGw9XCJyZ2IoMCwwLDApXCIgc3Ryb2tlLXdpZHRoPVwiMS41XCIgc3Ryb2tlPVwicmdiYSgwLDAsMCwwKVwiIHN0cm9rZS1saW5lY2FwPVwiYnV0dFwiLz48cGF0aCBkPVwiIE0gMCAwIEwgMzYgMCBMIDM2IDM2IEwgMCAzNiBMIDAgMC4wMDM3NDk5OTk5OTk5OTk5MiBaIFwiIGZpbGw9XCJyZ2JhKDAsMCwwLDApXCIgc3Ryb2tlLXdpZHRoPVwiMS41XCIgc3Ryb2tlPVwicmdiYSgwLDAsMCwwKVwiIHN0cm9rZS1saW5lY2FwPVwiYnV0dFwiLz48cGF0aCBkPVwiIE0gMCAzMCBMIDM2IDMwIEwgMzYgMzYgTCAwIDM2IEwgMCAzMCBaIFwiIGZpbGw9XCJyZ2IoMCwwLDApXCIgZmlsbC1vcGFjaXR5PVwiMC40XCIgc3Ryb2tlLXdpZHRoPVwiMS41XCIgc3Ryb2tlPVwicmdiYSgwLDAsMCwwKVwiIHN0cm9rZS1saW5lY2FwPVwiYnV0dFwiLz48L3N2Zz5gLFxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvc3ZnLWljb25zLmpzXG4gKiovIiwiZXhwb3J0IHtDdXN0b21FdmVudH07XG5cbmZ1bmN0aW9uIEN1c3RvbUV2ZW50KGV2ZW50LCBwYXJhbXMgPSB7YnViYmxlczogZmFsc2UsIGNhbmNlbGFibGU6IGZhbHNlLCBkZXRhaWw6IHVuZGVmaW5lZH0pIHtcbiAgdmFyIGV2dCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCAnQ3VzdG9tRXZlbnQnICk7XG4gIGV2dC5pbml0Q3VzdG9tRXZlbnQoIGV2ZW50LCBwYXJhbXMuYnViYmxlcywgcGFyYW1zLmNhbmNlbGFibGUsIHBhcmFtcy5kZXRhaWwgKTtcbiAgcmV0dXJuIGV2dDtcbn1cblxuaWYgKHdpbmRvdyAmJiB0eXBlb2Ygd2luZG93LkN1c3RvbUV2ZW50ID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgLy8gbm8gbmVlZCB0byBwb2x5ZmlsbFxufSBlbHNlIHtcbiAgd2luZG93LkN1c3RvbUV2ZW50ID0gQ3VzdG9tRXZlbnQ7XG4gIEN1c3RvbUV2ZW50LnByb3RvdHlwZSA9IHdpbmRvdy5FdmVudC5wcm90b3R5cGU7XG59XG5cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2N1c3RvbS1ldmVudC5qc1xuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=