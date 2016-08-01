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
	
	function create(elem, config) {
	  if (!elem) {
	    throw new Error('JsonEditor instance requires 1st param `elem`');
	  }
	  if (!config) {
	    throw new Error('JsonEditor instance requires 2nd param `config`');
	  }
	  console.error('KeyList', _keyList.KeyList);
	
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
	
	function KeyList(_ref) {
	  var data = _ref.data;
	  var parent = _ref.parent;
	  var _ref$depth = _ref.depth;
	  var depth = _ref$depth === undefined ? 0 : _ref$depth;
	
	  var list = (0, _util.createElem)('<ul class="j-keys" depth="' + depth + '"></ul>');
	  // console.warn('list', list)
	  _util.Styles.add();
	  Object.keys(data).forEach(function (key, idx, arr) {
	    var valueType = Array.isArray(data[key]) ? 'array' : _typeof(data[key]);
	    var icon = valueType === 'object' ? _svgIcons.arrows.down : valueType === 'array' ? _svgIcons.ux.list : valueType === 'string' ? _svgIcons.ux.edit : _svgIcons.ux.editLine;
	    var expandable = valueType === 'object' ? 'j-expandable' : '';
	    var row = (0, _util.createElem)(['<li class="j-closed ', expandable, ' j-type-', valueType, '" key="', key, '">', icon, ' ', key, '</li>'].join(''));
	    console.warn('row', row, valueType, icon);
	    list.appendChild(row);
	  });
	  list.addEventListener('click', function (event) {
	    var li = (0, _util.closest)(event.target, 'li');
	    console.warn('_clicked', li);
	    if (li) {
	      event.preventDefault();
	      var key = li.getAttribute('key');
	      var nextData = data[key];
	      // console.warn('_clicked.on', key, li)
	      if (!li.querySelector('ul')) {
	        console.warn('_clicked - needs list', li);
	        // do recursion, on demand
	        li.appendChild(KeyList({ data: nextData, parent: li, depth: depth + 1 }));
	        return li.classList.toggle('j-closed');
	      }
	      // toggle click state
	      li.classList.toggle('j-closed');
	      console.warn('_clicked.toggled', key, li);
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
	  return !elem ? null : elem.matches && elem.matches(selector) ? elem : elem.classList && elem.classList.contains(selector) ? elem : closest(elem.parentNode, selector);
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
	exports.push([module.id, ".unselectable {\n  user-select: none;\n  -moz-user-select: none;\n  -webkit-user-select: none;\n  -ms-user-select: none;\n}\n.j-xs-1,\n.j-xs-2,\n.j-xs-3,\n.j-xs-4,\n.j-xs-5,\n.j-xs-6,\n.j-xs-7,\n.j-xs-8,\n.j-xs-9,\n.j-xs-10,\n.j-xs-11,\n.j-xs-12 {\n  display: inline-block;\n  box-sizing: border-box;\n}\n.j-xs-1 {\n  width: 8.3333%;\n}\n.j-xs-2 {\n  width: 16.6666%;\n}\n.j-xs-3 {\n  width: 24.9999%;\n}\n.j-xs-4 {\n  width: 33.3332%;\n}\n.j-xs-5 {\n  width: 41.6665%;\n}\n.j-xs-6 {\n  width: 49.9998%;\n}\n.j-xs-7 {\n  width: 58.3331%;\n}\n.j-xs-8 {\n  width: 66.6664%;\n}\n.j-xs-9 {\n  width: 74.9997%;\n}\n.j-xs-10 {\n  width: 83.3331%;\n}\n.j-xs-11 {\n  width: 91.6663%;\n}\n.j-xs-12 {\n  width: 99.9996%;\n}\nul.j-keys {\n  width: 250px;\n  list-style: none;\n  user-select: none;\n  -moz-user-select: none;\n  -webkit-user-select: none;\n  -ms-user-select: none;\n}\nul.j-keys li {\n  display: block;\n  min-width: 250px;\n  min-height: 22px;\n  text-align: left;\n  padding-left: 10px;\n  margin-left: -30px;\n}\nul.j-keys li:not(.j-closed) > .j-icon-arrow-down {\n  transform: rotate(90deg) !important;\n}\nul.j-keys .j-closed > ul {\n  display: none;\n}\nul.j-keys .j-closed:before {\n  content: ' ' !important;\n}\nul.j-keys .j-closed > .j-icon-arrow-down {\n  transform: rotate(0deg) !important;\n}\nul.j-keys .j-icon-plus:before {\n  content: ' ';\n}\nul.j-keys .j-icon-list:before {\n  content: ' ';\n}\nul.j-keys .j-icon-text:before {\n  content: '\\2139   ' !important;\n}\nul.j-keys .j-icon-default:before {\n  content: '\\1F524   \\FE0F' !important;\n}\n", ""]);
	
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
	  up: "<svg class=\"j-icon-arrow j-icon-arrow-up\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" style=\"isolation:isolate\" width=\"85\" height=\"49\"><path d=\"M 82 44.9999999999999 L 42.98741812244738 4.024153880563309 M 4 45 L 42.98741812244727 4\" style=\"fill:none;stroke:#000000;stroke-width:4;stroke-linecap:round;stroke-linejoin:bevel;stroke-miterlimit:3;\"/></svg>",
	  down: "<svg class=\"j-icon-arrow j-icon-arrow-down\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" style=\"isolation:isolate\" width=\"33\" height=\"22\"><path d=\"M 28 4 L 15.99612865306074 16.99234145250431 M 4 4 L 15.996128653060683 17\" style=\"fill:none;stroke:#000000;stroke-width:8;stroke-linecap:round;stroke-linejoin:bevel;stroke-miterlimit:3;\"/></svg>",
	  right: "<svg class=\"j-icon-arrow j-icon-arrow-right\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" style=\"isolation:isolate\" width=\"50\" height=\"84\"><path d=\"M 4.000000000000128 80 L 46 41.49989620426777 M 4 3 L 45.999999999999844 41.499896204267735\" style=\"fill:none;stroke:#000000;stroke-width:4;stroke-linecap:round;stroke-linejoin:bevel;stroke-miterlimit:3;\"/></svg>",
	  left: "<svg class=\"j-icon-arrow j-icon-arrow-left\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" style=\"isolation:isolate\" width=\"49\" height=\"86\"><path d=\"M 44.99999999999989 82 L 4.0241538805633095 42.98741812244735 M 45 4 L 4 42.987418122447245\" style=\"fill:none;stroke:#000000;stroke-width:4;stroke-linecap:round;stroke-linejoin:bevel;stroke-miterlimit:3;\"/></svg>"
	};
	
	var ux = exports.ux = {
	  list: "<svg class=\"j-list\" fill=\"#000000\" height=\"36\" viewBox=\"0 0 24 24\" width=\"36\" xmlns=\"http://www.w3.org/2000/svg\">\n      <path d=\"M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z\"/>\n      <path d=\"M0 0h24v24H0z\" fill=\"none\"/>\n    </svg>",
	  edit: "<svg class=\"j-icon-edit\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" style=\"isolation:isolate\" width=\"36\" height=\"36\"><path d=\" M 4.5 25.875 L 4.5 31.5 L 10.125 31.5 L 26.71 14.91 L 21.08 9.285 L 4.5 25.875 Z  M 31.065 10.56 C 31.65 9.97501 31.652 9.03 31.065 8.445 L 27.555 4.9355 C 26.97 4.35 26.025 4.35 25.44 4.9355 L 22.695 7.68 L 28.324 13.305 L 31.065 10.56 Z \" fill-rule=\"evenodd\" fill=\"rgb(0,0,0)\" stroke-width=\"1.52\" stroke=\"rgba(0,0,0,0)\" stroke-linecap=\"butt\"/><path d=\" M 0 0 L 36 0 L 36 36 L 0 36 L 0 0 Z \" fill=\"rgba(0,0,0,0)\" stroke-width=\"1.52\" stroke=\"rgba(0,0,0,0)\" stroke-linecap=\"butt\"/></svg>",
	  editLine: "<svg class=\"j-icon-edit-line\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" style=\"isolation:isolate\" width=\"36\" height=\"36\"><path d=\" M 26.62 10.50 L 21 4.87 L 6 19.87 L 6 25.50 L 11.62 25.5 L 26.6 10.5 Z  M 31.06 6.06 C 31.65 5.47 31.65 4.53375 31.065 3.94 L 27.555 0.43 C 26.97 -0.14 26.022 -0.14 25.44 0.43 L 22.5 3.37 L 28.125 9 L 31.065 6.06 Z \" fill-rule=\"evenodd\" fill=\"rgb(0,0,0)\" stroke-width=\"1.5\" stroke=\"rgba(0,0,0,0)\" stroke-linecap=\"butt\"/><path d=\" M 0 0 L 36 0 L 36 36 L 0 36 L 0 0.00374999999999992 Z \" fill=\"rgba(0,0,0,0)\" stroke-width=\"1.5\" stroke=\"rgba(0,0,0,0)\" stroke-linecap=\"butt\"/><path d=\" M 0 30 L 36 30 L 36 36 L 0 36 L 0 30 Z \" fill=\"rgb(0,0,0)\" fill-opacity=\"0.4\" stroke-width=\"1.5\" stroke=\"rgba(0,0,0,0)\" stroke-linecap=\"butt\"/></svg>"
	};

/***/ }
/******/ ])
});
;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBkNGRlMzg1NjY4OWUzNTlhNWFhZiIsIndlYnBhY2s6Ly8vLi9pbmRleC5qcz80YzA4Iiwid2VicGFjazovLy8uL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9rZXktbGlzdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29uZmlnLmpzIiwid2VicGFjazovLy8uL3NyYy91dGlsLmpzIiwid2VicGFjazovLy8uL3NyYy9zdHlsZS5sZXNzIiwid2VicGFjazovLy8uL34vY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N2Zy1pY29ucy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7QUN0Q0EsNEdBQWtKLEU7Ozs7Ozs7Ozs7OztTQ0VsSSxNLEdBQUEsTTs7QUFGaEI7O0FBRU8sVUFBUyxNQUFULENBQWdCLElBQWhCLEVBQXNCLE1BQXRCLEVBQThCO0FBQ25DLE9BQUksQ0FBQyxJQUFMLEVBQWE7QUFBRSxXQUFNLElBQUksS0FBSixDQUFVLCtDQUFWLENBQU47QUFBa0U7QUFDakYsT0FBSSxDQUFDLE1BQUwsRUFBYTtBQUFFLFdBQU0sSUFBSSxLQUFKLENBQVUsaURBQVYsQ0FBTjtBQUFvRTtBQUNuRixXQUFRLEtBQVIsQ0FBYyxTQUFkOztBQUVBLE9BQUksVUFBVSxzQkFBUSxFQUFDLE1BQU0sTUFBUCxFQUFSLENBQWQ7QUFDQSxRQUFLLFdBQUwsQ0FBaUIsT0FBakI7QUFDQSxVQUFPLE9BQVA7QUFDRCxFOzs7Ozs7Ozs7Ozs7OztTQ05lLE8sR0FBQSxPOztBQUpoQjs7QUFDQTs7QUFDQTs7QUFFTyxVQUFTLE9BQVQsT0FBNEM7QUFBQSxPQUExQixJQUEwQixRQUExQixJQUEwQjtBQUFBLE9BQXBCLE1BQW9CLFFBQXBCLE1BQW9CO0FBQUEseUJBQVosS0FBWTtBQUFBLE9BQVosS0FBWSw4QkFBSixDQUFJOztBQUNqRCxPQUFNLE9BQU8sc0JBQVcsK0JBQStCLEtBQS9CLEdBQXVDLFNBQWxELENBQWI7QUFDQTtBQUNBLGdCQUFPLEdBQVA7QUFDQSxVQUNHLElBREgsQ0FDUSxJQURSLEVBRUcsT0FGSCxDQUVXLFVBQUMsR0FBRCxFQUFNLEdBQU4sRUFBVyxHQUFYLEVBQW1CO0FBQzFCLFNBQU0sWUFBYyxNQUFNLE9BQU4sQ0FBYyxLQUFLLEdBQUwsQ0FBZCxJQUEyQixPQUEzQixXQUE0QyxLQUFLLEdBQUwsQ0FBNUMsQ0FBcEI7QUFDQSxTQUFNLE9BQXlCLGNBQWMsUUFBZCxHQUNmLGlCQUFPLElBRFEsR0FDRCxjQUFjLE9BQWQsR0FDZCxhQUFHLElBRFcsR0FDQyxjQUFjLFFBQWQsR0FDZixhQUFHLElBRFksR0FDQSxhQUFHLFFBSGxDO0FBSUEsU0FBTSxhQUFjLGNBQWMsUUFBZCxHQUF5QixjQUF6QixHQUEwQyxFQUE5RDtBQUNBLFNBQU0sTUFBTSxzQkFBVyxDQUFDLHNCQUFELEVBQXlCLFVBQXpCLEVBQXFDLFVBQXJDLEVBQWlELFNBQWpELEVBQTRELFNBQTVELEVBQXVFLEdBQXZFLEVBQTRFLElBQTVFLEVBQWtGLElBQWxGLEVBQXdGLEdBQXhGLEVBQTZGLEdBQTdGLEVBQWtHLE9BQWxHLEVBQTJHLElBQTNHLENBQWdILEVBQWhILENBQVgsQ0FBWjtBQUNBLGFBQVEsSUFBUixDQUFhLEtBQWIsRUFBb0IsR0FBcEIsRUFBeUIsU0FBekIsRUFBb0MsSUFBcEM7QUFDQSxVQUFLLFdBQUwsQ0FBaUIsR0FBakI7QUFDRCxJQVpIO0FBYUEsUUFBSyxnQkFBTCxDQUFzQixPQUF0QixFQUErQixpQkFBUztBQUN0QyxTQUFNLEtBQUssbUJBQVEsTUFBTSxNQUFkLEVBQXNCLElBQXRCLENBQVg7QUFDQSxhQUFRLElBQVIsQ0FBYSxVQUFiLEVBQXlCLEVBQXpCO0FBQ0EsU0FBSSxFQUFKLEVBQVE7QUFDTixhQUFNLGNBQU47QUFDQSxXQUFNLE1BQVksR0FBRyxZQUFILENBQWdCLEtBQWhCLENBQWxCO0FBQ0EsV0FBTSxXQUFZLEtBQUssR0FBTCxDQUFsQjtBQUNBO0FBQ0EsV0FBSSxDQUFDLEdBQUcsYUFBSCxDQUFpQixJQUFqQixDQUFMLEVBQTZCO0FBQzNCLGlCQUFRLElBQVIsQ0FBYSx1QkFBYixFQUFzQyxFQUF0QztBQUNBO0FBQ0EsWUFBRyxXQUFILENBQWUsUUFBUSxFQUFDLE1BQU0sUUFBUCxFQUFpQixRQUFRLEVBQXpCLEVBQTZCLE9BQU8sUUFBUSxDQUE1QyxFQUFSLENBQWY7QUFDQSxnQkFBTyxHQUFHLFNBQUgsQ0FBYSxNQUFiLENBQW9CLFVBQXBCLENBQVA7QUFDRDtBQUNEO0FBQ0EsVUFBRyxTQUFILENBQWEsTUFBYixDQUFvQixVQUFwQjtBQUNBLGVBQVEsSUFBUixDQUFhLGtCQUFiLEVBQWlDLEdBQWpDLEVBQXNDLEVBQXRDO0FBQ0Q7QUFDRixJQWxCRDtBQW1CQSxVQUFPLElBQVA7QUFDRCxFOzs7Ozs7Ozs7OztBQ3pDTSxLQUFNLDBCQUFTO0FBQ3BCLFVBQU87QUFEYSxFQUFmLEM7Ozs7Ozs7Ozs7O1NDUVMsTyxHQUFBLE87U0FnQkEsUyxHQUFBLFM7U0FxQ0EsUyxHQUFBLFM7U0FXQSxLLEdBQUEsSzs7QUF2RWhCOzs7Ozs7O0FBT08sVUFBUyxPQUFULENBQWlCLElBQWpCLEVBQXVCO0FBQzVCLFVBQU8sTUFBTSxPQUFOLENBQWMsSUFBZCxJQUFzQixJQUF0QixHQUE2QixJQUFwQztBQUNBLFVBQU8sQ0FBQyxJQUFELEdBQVEsRUFBUixHQUFhLElBQXBCO0FBQ0EsVUFBTyxNQUFNLElBQU4sSUFBYyxNQUFNLElBQU4sQ0FBVyxJQUFYLENBQWQsSUFBa0MsQ0FBQyw0QkFBRCxDQUF6QztBQUNEOztBQUVEOzs7Ozs7Ozs7O0FBVU8sVUFBUyxTQUFULENBQW1CLEdBQW5CLEVBQXdCO0FBQzdCLE9BQU0sZUFBdUIsU0FBdkIsWUFBdUIsQ0FBQyxDQUFELEVBQUksQ0FBSjtBQUFBLFlBQVcsRUFBRSxHQUFGLElBQVMsRUFBRSxHQUFGLENBQVQsR0FBa0IsQ0FBQyxDQUFuQixHQUF3QixFQUFFLEdBQUYsSUFBUyxFQUFFLEdBQUYsQ0FBVCxHQUFrQixDQUFsQixHQUFzQixDQUF6RDtBQUFBLElBQTdCO0FBQ0EsT0FBTSx1QkFBdUIsU0FBdkIsb0JBQXVCLENBQUMsQ0FBRCxFQUFJLENBQUo7QUFBQSxZQUFXLEVBQUUsR0FBRixLQUFVLEVBQUUsR0FBRixDQUFWLEdBQW1CLENBQUMsQ0FBcEIsR0FBeUIsRUFBRSxHQUFGLElBQVMsRUFBRSxHQUFGLENBQVQsR0FBa0IsQ0FBbEIsR0FBc0IsQ0FBMUQ7QUFBQSxJQUE3Qjs7QUFFQSxPQUFJLElBQUksQ0FBSixNQUFXLEdBQWYsRUFBb0I7QUFDbEIsV0FBTSxJQUFJLE1BQUosQ0FBVyxDQUFYLENBQU47QUFDQSxZQUFPLG9CQUFQO0FBQ0Q7QUFDRCxVQUFPLFlBQVA7QUFDRDs7QUFFRDs7O0FBR08sS0FBTSwwQkFBUztBQUNwQixRQUFLLGVBQU07QUFDVCxTQUFJLE1BQU0sU0FBUyxhQUFULENBQXVCLG1CQUF2QixDQUFWO0FBQ0EsU0FBSSxDQUFDLEdBQUwsRUFBVTtBQUNSLFdBQU0sU0FBVSxvQkFBUSxDQUFSLENBQWhCO0FBQ0EsYUFBZ0IsU0FBUyxhQUFULENBQXVCLE9BQXZCLENBQWhCO0FBQ0EsV0FBSSxFQUFKLEdBQWdCLGFBQWhCO0FBQ0EsV0FBSSxTQUFKLEdBQWdCLE1BQWhCO0FBQ0EsZ0JBQVMsSUFBVCxDQUFjLFdBQWQsQ0FBMEIsR0FBMUI7QUFDRDtBQUNGLElBVm1CO0FBV3BCLFdBQVEsa0JBQU07QUFDWixTQUFJLE1BQU0sU0FBUyxhQUFULENBQXVCLG1CQUF2QixDQUFWO0FBQ0EsU0FBSSxPQUFPLElBQUksVUFBZixFQUEyQjtBQUFFLFdBQUksVUFBSixDQUFlLFdBQWYsQ0FBMkIsR0FBM0I7QUFBaUM7QUFDL0Q7QUFkbUIsRUFBZjs7QUFpQlA7Ozs7OztBQU1PLFVBQVMsU0FBVCxDQUFtQixJQUFuQixFQUF5QjtBQUM5QixPQUFJLGdCQUFnQixRQUFwQixFQUE4QjtBQUFFLFlBQU8sSUFBUDtBQUFjOztBQUU5QyxXQUFRLElBQVIsRUFDRyxPQURILENBQ1c7QUFBQSxZQUFNLEdBQUcsVUFBSCxJQUFpQixHQUFHLFVBQUgsQ0FBYyxXQUFkLENBQTBCLEVBQTFCLENBQXZCO0FBQUEsSUFEWDtBQUVBLFVBQU8sSUFBUDtBQUNEOztBQUVEOzs7QUFHTyxVQUFTLEtBQVQsT0FBK0I7QUFBQSxPQUFmLEVBQWUsUUFBZixFQUFlO0FBQUEsT0FBWCxHQUFXLFFBQVgsR0FBVztBQUFBLE9BQU4sR0FBTSxRQUFOLEdBQU07QUFBRSxVQUFPLE1BQU0sR0FBTixJQUFhLEdBQXBCO0FBQTBCOztBQUVsRTs7O0FBR08sS0FBTSw0QkFBVSxTQUFWLE9BQVUsQ0FBQyxJQUFELEVBQU8sUUFBUCxFQUFvQjtBQUN6QyxVQUFPLENBQUMsSUFBRCxHQUFRLElBQVIsR0FDRSxLQUFLLE9BQUwsSUFBZ0IsS0FBSyxPQUFMLENBQWEsUUFBYixDQUFoQixHQUNBLElBREEsR0FDTyxLQUFLLFNBQUwsSUFBa0IsS0FBSyxTQUFMLENBQWUsUUFBZixDQUF3QixRQUF4QixDQUFsQixHQUNQLElBRE8sR0FDQSxRQUFRLEtBQUssVUFBYixFQUF5QixRQUF6QixDQUhoQjtBQUlELEVBTE07O0FBT1A7Ozs7QUFJTyxLQUFNLGtDQUFhLFNBQWIsVUFBYSxPQUFRO0FBQ2hDLE9BQU0sWUFBWSxTQUFTLHNCQUFULEVBQWxCO0FBQ0EsT0FBTSxNQUFNLFNBQVMsYUFBVCxDQUF1QixLQUF2QixDQUFaO0FBQ0EsT0FBSSxTQUFKLEdBQWdCLElBQWhCLENBSGdDLENBR1g7QUFDckIsVUFBTyxJQUFJLFVBQUosQ0FBZSxNQUFmLEtBQTBCLENBQTFCLEdBQThCLElBQUksVUFBSixDQUFlLENBQWYsQ0FBOUIsR0FBa0QsR0FBekQ7QUFDRCxFQUxNLEM7Ozs7OztBQ3hGUDtBQUNBOzs7QUFHQTtBQUNBLDBDQUF5QyxzQkFBc0IsMkJBQTJCLDhCQUE4QiwwQkFBMEIsR0FBRyw0SEFBNEgsMEJBQTBCLDJCQUEyQixHQUFHLFdBQVcsbUJBQW1CLEdBQUcsV0FBVyxvQkFBb0IsR0FBRyxXQUFXLG9CQUFvQixHQUFHLFdBQVcsb0JBQW9CLEdBQUcsV0FBVyxvQkFBb0IsR0FBRyxXQUFXLG9CQUFvQixHQUFHLFdBQVcsb0JBQW9CLEdBQUcsV0FBVyxvQkFBb0IsR0FBRyxXQUFXLG9CQUFvQixHQUFHLFlBQVksb0JBQW9CLEdBQUcsWUFBWSxvQkFBb0IsR0FBRyxZQUFZLG9CQUFvQixHQUFHLGFBQWEsaUJBQWlCLHFCQUFxQixzQkFBc0IsMkJBQTJCLDhCQUE4QiwwQkFBMEIsR0FBRyxnQkFBZ0IsbUJBQW1CLHFCQUFxQixxQkFBcUIscUJBQXFCLHVCQUF1Qix1QkFBdUIsR0FBRyxvREFBb0Qsd0NBQXdDLEdBQUcsNEJBQTRCLGtCQUFrQixHQUFHLDhCQUE4Qiw0QkFBNEIsR0FBRyw0Q0FBNEMsdUNBQXVDLEdBQUcsaUNBQWlDLGlCQUFpQixHQUFHLGlDQUFpQyxpQkFBaUIsR0FBRyxpQ0FBaUMsb0NBQW9DLEdBQUcsb0NBQW9DLDJDQUEyQyxHQUFHOztBQUU1akQ7Ozs7Ozs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxpQkFBZ0IsaUJBQWlCO0FBQ2pDO0FBQ0E7QUFDQSx5Q0FBd0MsZ0JBQWdCO0FBQ3hELEtBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBZ0IsaUJBQWlCO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBWSxvQkFBb0I7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNoRE8sS0FBTSwwQkFBUztBQUNwQiw0WkFEb0I7QUFFcEIsa1pBRm9CO0FBR3BCLHFhQUhvQjtBQUlwQjtBQUpvQixFQUFmOztBQU9BLEtBQU0sa0JBQUs7QUFDaEIsaVRBRGdCO0FBS2hCLHFyQkFMZ0I7QUFNaEI7QUFOZ0IsRUFBWCxDIiwiZmlsZSI6Impzb24tZWRpdG9yLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcIkpzb25FZGl0b3JcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wiSnNvbkVkaXRvclwiXSA9IGZhY3RvcnkoKTtcbn0pKHRoaXMsIGZ1bmN0aW9uKCkge1xucmV0dXJuIFxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvblxuICoqLyIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgZDRkZTM4NTY2ODllMzU5YTVhYWZcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IGdsb2JhbFtcIkpzb25FZGl0b3JcIl0gPSByZXF1aXJlKFwiLSEvVXNlcnMvZGxldnkvY29kZS9vc3MvanNvbi1lZGl0b3Ivbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9pbmRleC5qcz97XFxcInByZXNldHNcXFwiOltcXFwiZXMyMDE1XFxcIl19IS9Vc2Vycy9kbGV2eS9jb2RlL29zcy9qc29uLWVkaXRvci9pbmRleC5qc1wiKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vaW5kZXguanNcbiAqKiBtb2R1bGUgaWQgPSAwXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJpbXBvcnQge0tleUxpc3R9ICAgIGZyb20gJy4vc3JjL2tleS1saXN0J1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlKGVsZW0sIGNvbmZpZykge1xuICBpZiAoIWVsZW0pICAgeyB0aHJvdyBuZXcgRXJyb3IoJ0pzb25FZGl0b3IgaW5zdGFuY2UgcmVxdWlyZXMgMXN0IHBhcmFtIGBlbGVtYCcpIH1cbiAgaWYgKCFjb25maWcpIHsgdGhyb3cgbmV3IEVycm9yKCdKc29uRWRpdG9yIGluc3RhbmNlIHJlcXVpcmVzIDJuZCBwYXJhbSBgY29uZmlnYCcpIH1cbiAgY29uc29sZS5lcnJvcignS2V5TGlzdCcsIEtleUxpc3QpXG5cbiAgbGV0IGtleUxpc3QgPSBLZXlMaXN0KHtkYXRhOiBjb25maWd9KVxuICBlbGVtLmFwcGVuZENoaWxkKGtleUxpc3QpXG4gIHJldHVybiBrZXlMaXN0O1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9pbmRleC5qc1xuICoqLyIsImltcG9ydCB7Y29uZmlnfSAgICAgICAgICAgICAgZnJvbSAnLi9jb25maWcnXG5pbXBvcnQge2NyZWF0ZUVsZW0sIGNsb3Nlc3QsIHJlbW92ZUFsbCwgU3R5bGVzfSBmcm9tICcuL3V0aWwnXG5pbXBvcnQge2Fycm93cywgdXh9ICAgICAgICAgIGZyb20gJy4vc3ZnLWljb25zJ1xuXG5leHBvcnQgZnVuY3Rpb24gS2V5TGlzdCh7ZGF0YSwgcGFyZW50LCBkZXB0aCA9IDB9KSB7XG4gIGNvbnN0IGxpc3QgPSBjcmVhdGVFbGVtKCc8dWwgY2xhc3M9XCJqLWtleXNcIiBkZXB0aD1cIicgKyBkZXB0aCArICdcIj48L3VsPicpXG4gIC8vIGNvbnNvbGUud2FybignbGlzdCcsIGxpc3QpXG4gIFN0eWxlcy5hZGQoKVxuICBPYmplY3RcbiAgICAua2V5cyhkYXRhKVxuICAgIC5mb3JFYWNoKChrZXksIGlkeCwgYXJyKSA9PiB7XG4gICAgICBjb25zdCB2YWx1ZVR5cGUgICA9IEFycmF5LmlzQXJyYXkoZGF0YVtrZXldKSA/ICdhcnJheScgOiB0eXBlb2YgZGF0YVtrZXldXG4gICAgICBjb25zdCBpY29uICAgICAgICA9ICAgICAgICAgICAgdmFsdWVUeXBlID09PSAnb2JqZWN0JyA/IFxuICAgICAgICAgICAgICAgICAgICAgIGFycm93cy5kb3duIDogdmFsdWVUeXBlID09PSAnYXJyYXknID9cbiAgICAgICAgICAgICAgICAgICAgICB1eC5saXN0ICAgICAgOiB2YWx1ZVR5cGUgPT09ICdzdHJpbmcnID8gXG4gICAgICAgICAgICAgICAgICAgICAgdXguZWRpdCAgICAgIDogdXguZWRpdExpbmVcbiAgICAgIGNvbnN0IGV4cGFuZGFibGUgID0gdmFsdWVUeXBlID09PSAnb2JqZWN0JyA/ICdqLWV4cGFuZGFibGUnIDogJydcbiAgICAgIGNvbnN0IHJvdyA9IGNyZWF0ZUVsZW0oWyc8bGkgY2xhc3M9XCJqLWNsb3NlZCAnLCBleHBhbmRhYmxlLCAnIGotdHlwZS0nLCB2YWx1ZVR5cGUsICdcIiBrZXk9XCInLCBrZXksICdcIj4nLCBpY29uLCAnICcsIGtleSwgJzwvbGk+J10uam9pbignJykpXG4gICAgICBjb25zb2xlLndhcm4oJ3JvdycsIHJvdywgdmFsdWVUeXBlLCBpY29uKVxuICAgICAgbGlzdC5hcHBlbmRDaGlsZChyb3cpXG4gICAgfSlcbiAgbGlzdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGV2ZW50ID0+IHtcbiAgICBjb25zdCBsaSA9IGNsb3Nlc3QoZXZlbnQudGFyZ2V0LCAnbGknKVxuICAgIGNvbnNvbGUud2FybignX2NsaWNrZWQnLCBsaSlcbiAgICBpZiAobGkpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgICAgIGNvbnN0IGtleSAgICAgICA9IGxpLmdldEF0dHJpYnV0ZSgna2V5JylcbiAgICAgIGNvbnN0IG5leHREYXRhICA9IGRhdGFba2V5XVxuICAgICAgLy8gY29uc29sZS53YXJuKCdfY2xpY2tlZC5vbicsIGtleSwgbGkpXG4gICAgICBpZiAoIWxpLnF1ZXJ5U2VsZWN0b3IoJ3VsJykpIHtcbiAgICAgICAgY29uc29sZS53YXJuKCdfY2xpY2tlZCAtIG5lZWRzIGxpc3QnLCBsaSlcbiAgICAgICAgLy8gZG8gcmVjdXJzaW9uLCBvbiBkZW1hbmRcbiAgICAgICAgbGkuYXBwZW5kQ2hpbGQoS2V5TGlzdCh7ZGF0YTogbmV4dERhdGEsIHBhcmVudDogbGksIGRlcHRoOiBkZXB0aCArIDF9KSlcbiAgICAgICAgcmV0dXJuIGxpLmNsYXNzTGlzdC50b2dnbGUoJ2otY2xvc2VkJylcbiAgICAgIH1cbiAgICAgIC8vIHRvZ2dsZSBjbGljayBzdGF0ZVxuICAgICAgbGkuY2xhc3NMaXN0LnRvZ2dsZSgnai1jbG9zZWQnKVxuICAgICAgY29uc29sZS53YXJuKCdfY2xpY2tlZC50b2dnbGVkJywga2V5LCBsaSlcbiAgICB9XG4gIH0pXG4gIHJldHVybiBsaXN0XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9rZXktbGlzdC5qc1xuICoqLyIsImV4cG9ydCBjb25zdCBjb25maWcgPSB7XG4gIGRlYnVnOiBmYWxzZVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvY29uZmlnLmpzXG4gKiovIiwiXG4vKipcbiAqIFV0aWxpdHkgYXJyYXlpZnkgbWV0aG9kXG4gKiBBZGQgdG8gLnByb3RvdHlwZSBvZiBJdGVyYXRvcnMsIEFycmF5QnVmZmVyLCBBcmd1bWVudHMsIE5vZGVMaXN0LCBTZXQvV2Vha1NldCwgd2hhdGV2ZXIgI1lPTE9cbiAqXG4gKiAuLi4gT3IganVzdCB1c2UgYXMgdXRpbCwgYXMgbmVlZGVkLCAjSnVzdERvSXRcbiAqXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0b0FycmF5KGxpc3QpIHtcbiAgbGlzdCA9IEFycmF5LmlzQXJyYXkobGlzdCkgPyBsaXN0IDogdGhpc1xuICBsaXN0ID0gIWxpc3QgPyBbXSA6IGxpc3RcbiAgcmV0dXJuIEFycmF5LmZyb20gJiYgQXJyYXkuZnJvbShsaXN0KSB8fCBbJ3VwZ3JhZGUgeW91ciBicm93c2VyLCBwZmZ0J11cbn1cblxuLyoqXG4gKiBHZXQgYEFycmF5LnNvcnRgIGZ1bmN0aW9uIGZvciBrZXkgbmFtZSBjb21wYXJpc29ucyAoc3VwcG9ydHMgcmV2ZXJzZSlcbiAqXG4gKiBXaGVuIG5hbWUgPT09ICdlbWFpbCAgIC0tLSBTb3J0IGVtYWlsIGFzY2VuZGluZy5cbiAqXG4gKiBXaGVuIG5hbWUgPT09ICctZW1haWwgIC0tLSBTb3J0IGVtYWlsIGRlc2NlbmRpbmdcbiAqXG4gKiBAcmV0dXJucyBbZnVuY3Rpb25dIGNvbXBhcmVyIHVzZWQgaW4gYEFycmF5LnNvcnQoKWBcbiAqXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRTb3J0ZXIoa2V5KSB7XG4gIGNvbnN0IF9lbmdsaXNoU29ydCAgICAgICAgID0gKGEsIGIpID0+IChhW2tleV0gPCBiW2tleV0gPyAtMSA6IChhW2tleV0gPiBiW2tleV0gPyAxIDogMCkpXG4gIGNvbnN0IF9lbmdsaXNoU29ydFJldmVyc2VkID0gKGEsIGIpID0+IChhW2tleV0gPj0gYltrZXldID8gLTEgOiAoYVtrZXldIDwgYltrZXldID8gMSA6IDApKVxuXG4gIGlmIChrZXlbMF0gPT09ICctJykge1xuICAgIGtleSA9IGtleS5zdWJzdHIoMSk7XG4gICAgcmV0dXJuIF9lbmdsaXNoU29ydFJldmVyc2VkO1xuICB9XG4gIHJldHVybiBfZW5nbGlzaFNvcnQ7XG59XG5cbi8qKlxuICpcbiAqL1xuZXhwb3J0IGNvbnN0IFN0eWxlcyA9IHtcbiAgYWRkOiAoKSA9PiB7XG4gICAgbGV0IGNzcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ3N0eWxlI2pzb24tZWRpdG9yJylcbiAgICBpZiAoIWNzcykge1xuICAgICAgY29uc3Qgc3R5bGVzICA9IHJlcXVpcmUoJyFjc3MhbGVzcyEuL3N0eWxlLmxlc3MnKVxuICAgICAgY3NzICAgICAgICAgICA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJylcbiAgICAgIGNzcy5pZCAgICAgICAgPSAnanNvbi1lZGl0b3InXG4gICAgICBjc3MuaW5uZXJIVE1MID0gc3R5bGVzXG4gICAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKGNzcylcbiAgICB9XG4gIH0sXG4gIHJlbW92ZTogKCkgPT4ge1xuICAgIGxldCBjc3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdzdHlsZSNqc29uLWVkaXRvcicpXG4gICAgaWYgKGNzcyAmJiBjc3MucGFyZW50Tm9kZSkgeyBjc3MucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChjc3MpIH1cbiAgfVxufVxuXG4vKipcbiAqIEFjY2VwdHMgZWxlbWVudHMgZnJvbSBgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbGBcbiAqXG4gKiBSZW1vdmVzIGFsbCBjaGlsZHJlbiBvZiBAbm9kZVxuICpcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZUFsbChub2RlKSB7XG4gIGlmICh0aGlzIGluc3RhbmNlb2YgTm9kZUxpc3QpIHsgbm9kZSA9IHRoaXM7IH1cblxuICB0b0FycmF5KG5vZGUpXG4gICAgLmZvckVhY2goZWwgPT4gZWwucGFyZW50Tm9kZSAmJiBlbC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGVsKSlcbiAgcmV0dXJuIG5vZGVcbn1cblxuLyoqXG4gKiBUb3RlcyBvYnZpXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRJZCh7aWQsIF9pZCwga2V5fSkgeyByZXR1cm4gaWQgfHwgX2lkIHx8IGtleTsgfVxuXG4vKipcbiAqIFxuICovXG5leHBvcnQgY29uc3QgY2xvc2VzdCA9IChlbGVtLCBzZWxlY3RvcikgPT4ge1xuICByZXR1cm4gIWVsZW0gPyBudWxsXG4gICAgICAgICA6IGVsZW0ubWF0Y2hlcyAmJiBlbGVtLm1hdGNoZXMoc2VsZWN0b3IpIFxuICAgICAgICAgPyBlbGVtIDogZWxlbS5jbGFzc0xpc3QgJiYgZWxlbS5jbGFzc0xpc3QuY29udGFpbnMoc2VsZWN0b3IpXG4gICAgICAgICA/IGVsZW0gOiBjbG9zZXN0KGVsZW0ucGFyZW50Tm9kZSwgc2VsZWN0b3IpXG59XG5cbi8qKlxuICogV2FybmluZzogUHJpdmF0ZS9sb2NhbCB1c2Ugb25seS4gRG8gbm90IGhvaXN0LlxuICogKioqIFVuc2FmZSBIVE1ML3N0cmluZyBoYW5kbGluZyAqKipcbiAqL1xuZXhwb3J0IGNvbnN0IGNyZWF0ZUVsZW0gPSBodG1sID0+IHtcbiAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpXG4gIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gIGRpdi5pbm5lckhUTUwgPSBodG1sIC8vIFBvdGVudGlhbCBTZWN1cml0eSBFeHBsb2l0IFZlY3RvciEhISEhIVxuICByZXR1cm4gZGl2LmNoaWxkTm9kZXMubGVuZ3RoID09PSAxID8gZGl2LmNoaWxkTm9kZXNbMF0gOiBkaXZcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3V0aWwuanNcbiAqKi8iLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikoKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIi51bnNlbGVjdGFibGUge1xcbiAgdXNlci1zZWxlY3Q6IG5vbmU7XFxuICAtbW96LXVzZXItc2VsZWN0OiBub25lO1xcbiAgLXdlYmtpdC11c2VyLXNlbGVjdDogbm9uZTtcXG4gIC1tcy11c2VyLXNlbGVjdDogbm9uZTtcXG59XFxuLmoteHMtMSxcXG4uai14cy0yLFxcbi5qLXhzLTMsXFxuLmoteHMtNCxcXG4uai14cy01LFxcbi5qLXhzLTYsXFxuLmoteHMtNyxcXG4uai14cy04LFxcbi5qLXhzLTksXFxuLmoteHMtMTAsXFxuLmoteHMtMTEsXFxuLmoteHMtMTIge1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG59XFxuLmoteHMtMSB7XFxuICB3aWR0aDogOC4zMzMzJTtcXG59XFxuLmoteHMtMiB7XFxuICB3aWR0aDogMTYuNjY2NiU7XFxufVxcbi5qLXhzLTMge1xcbiAgd2lkdGg6IDI0Ljk5OTklO1xcbn1cXG4uai14cy00IHtcXG4gIHdpZHRoOiAzMy4zMzMyJTtcXG59XFxuLmoteHMtNSB7XFxuICB3aWR0aDogNDEuNjY2NSU7XFxufVxcbi5qLXhzLTYge1xcbiAgd2lkdGg6IDQ5Ljk5OTglO1xcbn1cXG4uai14cy03IHtcXG4gIHdpZHRoOiA1OC4zMzMxJTtcXG59XFxuLmoteHMtOCB7XFxuICB3aWR0aDogNjYuNjY2NCU7XFxufVxcbi5qLXhzLTkge1xcbiAgd2lkdGg6IDc0Ljk5OTclO1xcbn1cXG4uai14cy0xMCB7XFxuICB3aWR0aDogODMuMzMzMSU7XFxufVxcbi5qLXhzLTExIHtcXG4gIHdpZHRoOiA5MS42NjYzJTtcXG59XFxuLmoteHMtMTIge1xcbiAgd2lkdGg6IDk5Ljk5OTYlO1xcbn1cXG51bC5qLWtleXMge1xcbiAgd2lkdGg6IDI1MHB4O1xcbiAgbGlzdC1zdHlsZTogbm9uZTtcXG4gIHVzZXItc2VsZWN0OiBub25lO1xcbiAgLW1vei11c2VyLXNlbGVjdDogbm9uZTtcXG4gIC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7XFxuICAtbXMtdXNlci1zZWxlY3Q6IG5vbmU7XFxufVxcbnVsLmota2V5cyBsaSB7XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIG1pbi13aWR0aDogMjUwcHg7XFxuICBtaW4taGVpZ2h0OiAyMnB4O1xcbiAgdGV4dC1hbGlnbjogbGVmdDtcXG4gIHBhZGRpbmctbGVmdDogMTBweDtcXG4gIG1hcmdpbi1sZWZ0OiAtMzBweDtcXG59XFxudWwuai1rZXlzIGxpOm5vdCguai1jbG9zZWQpID4gLmotaWNvbi1hcnJvdy1kb3duIHtcXG4gIHRyYW5zZm9ybTogcm90YXRlKDkwZGVnKSAhaW1wb3J0YW50O1xcbn1cXG51bC5qLWtleXMgLmotY2xvc2VkID4gdWwge1xcbiAgZGlzcGxheTogbm9uZTtcXG59XFxudWwuai1rZXlzIC5qLWNsb3NlZDpiZWZvcmUge1xcbiAgY29udGVudDogJyAnICFpbXBvcnRhbnQ7XFxufVxcbnVsLmota2V5cyAuai1jbG9zZWQgPiAuai1pY29uLWFycm93LWRvd24ge1xcbiAgdHJhbnNmb3JtOiByb3RhdGUoMGRlZykgIWltcG9ydGFudDtcXG59XFxudWwuai1rZXlzIC5qLWljb24tcGx1czpiZWZvcmUge1xcbiAgY29udGVudDogJyAnO1xcbn1cXG51bC5qLWtleXMgLmotaWNvbi1saXN0OmJlZm9yZSB7XFxuICBjb250ZW50OiAnICc7XFxufVxcbnVsLmota2V5cyAuai1pY29uLXRleHQ6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6ICdcXFxcMjEzOSAgICcgIWltcG9ydGFudDtcXG59XFxudWwuai1rZXlzIC5qLWljb24tZGVmYXVsdDpiZWZvcmUge1xcbiAgY29udGVudDogJ1xcXFwxRjUyNCAgIFxcXFxGRTBGJyAhaW1wb3J0YW50O1xcbn1cXG5cIiwgXCJcIl0pO1xuXG4vLyBleHBvcnRzXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9jc3MtbG9hZGVyIS4vfi9sZXNzLWxvYWRlciEuL3NyYy9zdHlsZS5sZXNzXG4gKiogbW9kdWxlIGlkID0gNVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLypcclxuXHRNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxyXG5cdEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcclxuKi9cclxuLy8gY3NzIGJhc2UgY29kZSwgaW5qZWN0ZWQgYnkgdGhlIGNzcy1sb2FkZXJcclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcclxuXHR2YXIgbGlzdCA9IFtdO1xyXG5cclxuXHQvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXHJcblx0bGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xyXG5cdFx0dmFyIHJlc3VsdCA9IFtdO1xyXG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0dmFyIGl0ZW0gPSB0aGlzW2ldO1xyXG5cdFx0XHRpZihpdGVtWzJdKSB7XHJcblx0XHRcdFx0cmVzdWx0LnB1c2goXCJAbWVkaWEgXCIgKyBpdGVtWzJdICsgXCJ7XCIgKyBpdGVtWzFdICsgXCJ9XCIpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHJlc3VsdC5wdXNoKGl0ZW1bMV0pO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gcmVzdWx0LmpvaW4oXCJcIik7XHJcblx0fTtcclxuXHJcblx0Ly8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcclxuXHRsaXN0LmkgPSBmdW5jdGlvbihtb2R1bGVzLCBtZWRpYVF1ZXJ5KSB7XHJcblx0XHRpZih0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIilcclxuXHRcdFx0bW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgXCJcIl1dO1xyXG5cdFx0dmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcclxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciBpZCA9IHRoaXNbaV1bMF07XHJcblx0XHRcdGlmKHR5cGVvZiBpZCA9PT0gXCJudW1iZXJcIilcclxuXHRcdFx0XHRhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XHJcblx0XHR9XHJcblx0XHRmb3IoaSA9IDA7IGkgPCBtb2R1bGVzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciBpdGVtID0gbW9kdWxlc1tpXTtcclxuXHRcdFx0Ly8gc2tpcCBhbHJlYWR5IGltcG9ydGVkIG1vZHVsZVxyXG5cdFx0XHQvLyB0aGlzIGltcGxlbWVudGF0aW9uIGlzIG5vdCAxMDAlIHBlcmZlY3QgZm9yIHdlaXJkIG1lZGlhIHF1ZXJ5IGNvbWJpbmF0aW9uc1xyXG5cdFx0XHQvLyAgd2hlbiBhIG1vZHVsZSBpcyBpbXBvcnRlZCBtdWx0aXBsZSB0aW1lcyB3aXRoIGRpZmZlcmVudCBtZWRpYSBxdWVyaWVzLlxyXG5cdFx0XHQvLyAgSSBob3BlIHRoaXMgd2lsbCBuZXZlciBvY2N1ciAoSGV5IHRoaXMgd2F5IHdlIGhhdmUgc21hbGxlciBidW5kbGVzKVxyXG5cdFx0XHRpZih0eXBlb2YgaXRlbVswXSAhPT0gXCJudW1iZXJcIiB8fCAhYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xyXG5cdFx0XHRcdGlmKG1lZGlhUXVlcnkgJiYgIWl0ZW1bMl0pIHtcclxuXHRcdFx0XHRcdGl0ZW1bMl0gPSBtZWRpYVF1ZXJ5O1xyXG5cdFx0XHRcdH0gZWxzZSBpZihtZWRpYVF1ZXJ5KSB7XHJcblx0XHRcdFx0XHRpdGVtWzJdID0gXCIoXCIgKyBpdGVtWzJdICsgXCIpIGFuZCAoXCIgKyBtZWRpYVF1ZXJ5ICsgXCIpXCI7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGxpc3QucHVzaChpdGVtKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH07XHJcblx0cmV0dXJuIGxpc3Q7XHJcbn07XHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXG4gKiogbW9kdWxlIGlkID0gNlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiXG5leHBvcnQgY29uc3QgYXJyb3dzID0ge1xuICB1cDogYDxzdmcgY2xhc3M9XCJqLWljb24tYXJyb3cgai1pY29uLWFycm93LXVwXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHhtbG5zOnhsaW5rPVwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGlua1wiIHN0eWxlPVwiaXNvbGF0aW9uOmlzb2xhdGVcIiB3aWR0aD1cIjg1XCIgaGVpZ2h0PVwiNDlcIj48cGF0aCBkPVwiTSA4MiA0NC45OTk5OTk5OTk5OTk5IEwgNDIuOTg3NDE4MTIyNDQ3MzggNC4wMjQxNTM4ODA1NjMzMDkgTSA0IDQ1IEwgNDIuOTg3NDE4MTIyNDQ3MjcgNFwiIHN0eWxlPVwiZmlsbDpub25lO3N0cm9rZTojMDAwMDAwO3N0cm9rZS13aWR0aDo0O3N0cm9rZS1saW5lY2FwOnJvdW5kO3N0cm9rZS1saW5lam9pbjpiZXZlbDtzdHJva2UtbWl0ZXJsaW1pdDozO1wiLz48L3N2Zz5gLFxuICBkb3duOiBgPHN2ZyBjbGFzcz1cImotaWNvbi1hcnJvdyBqLWljb24tYXJyb3ctZG93blwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB4bWxuczp4bGluaz1cImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmtcIiBzdHlsZT1cImlzb2xhdGlvbjppc29sYXRlXCIgd2lkdGg9XCIzM1wiIGhlaWdodD1cIjIyXCI+PHBhdGggZD1cIk0gMjggNCBMIDE1Ljk5NjEyODY1MzA2MDc0IDE2Ljk5MjM0MTQ1MjUwNDMxIE0gNCA0IEwgMTUuOTk2MTI4NjUzMDYwNjgzIDE3XCIgc3R5bGU9XCJmaWxsOm5vbmU7c3Ryb2tlOiMwMDAwMDA7c3Ryb2tlLXdpZHRoOjg7c3Ryb2tlLWxpbmVjYXA6cm91bmQ7c3Ryb2tlLWxpbmVqb2luOmJldmVsO3N0cm9rZS1taXRlcmxpbWl0OjM7XCIvPjwvc3ZnPmAsXG4gIHJpZ2h0OiBgPHN2ZyBjbGFzcz1cImotaWNvbi1hcnJvdyBqLWljb24tYXJyb3ctcmlnaHRcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgeG1sbnM6eGxpbms9XCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rXCIgc3R5bGU9XCJpc29sYXRpb246aXNvbGF0ZVwiIHdpZHRoPVwiNTBcIiBoZWlnaHQ9XCI4NFwiPjxwYXRoIGQ9XCJNIDQuMDAwMDAwMDAwMDAwMTI4IDgwIEwgNDYgNDEuNDk5ODk2MjA0MjY3NzcgTSA0IDMgTCA0NS45OTk5OTk5OTk5OTk4NDQgNDEuNDk5ODk2MjA0MjY3NzM1XCIgc3R5bGU9XCJmaWxsOm5vbmU7c3Ryb2tlOiMwMDAwMDA7c3Ryb2tlLXdpZHRoOjQ7c3Ryb2tlLWxpbmVjYXA6cm91bmQ7c3Ryb2tlLWxpbmVqb2luOmJldmVsO3N0cm9rZS1taXRlcmxpbWl0OjM7XCIvPjwvc3ZnPmAsXG4gIGxlZnQ6IGA8c3ZnIGNsYXNzPVwiai1pY29uLWFycm93IGotaWNvbi1hcnJvdy1sZWZ0XCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHhtbG5zOnhsaW5rPVwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGlua1wiIHN0eWxlPVwiaXNvbGF0aW9uOmlzb2xhdGVcIiB3aWR0aD1cIjQ5XCIgaGVpZ2h0PVwiODZcIj48cGF0aCBkPVwiTSA0NC45OTk5OTk5OTk5OTk4OSA4MiBMIDQuMDI0MTUzODgwNTYzMzA5NSA0Mi45ODc0MTgxMjI0NDczNSBNIDQ1IDQgTCA0IDQyLjk4NzQxODEyMjQ0NzI0NVwiIHN0eWxlPVwiZmlsbDpub25lO3N0cm9rZTojMDAwMDAwO3N0cm9rZS13aWR0aDo0O3N0cm9rZS1saW5lY2FwOnJvdW5kO3N0cm9rZS1saW5lam9pbjpiZXZlbDtzdHJva2UtbWl0ZXJsaW1pdDozO1wiLz48L3N2Zz5gLFxufVxuXG5leHBvcnQgY29uc3QgdXggPSB7XG4gIGxpc3Q6IGA8c3ZnIGNsYXNzPVwiai1saXN0XCIgZmlsbD1cIiMwMDAwMDBcIiBoZWlnaHQ9XCIzNlwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiB3aWR0aD1cIjM2XCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxuICAgICAgPHBhdGggZD1cIk0zIDEzaDJ2LTJIM3Yyem0wIDRoMnYtMkgzdjJ6bTAtOGgyVjdIM3Yyem00IDRoMTR2LTJIN3Yyem0wIDRoMTR2LTJIN3Yyek03IDd2MmgxNFY3SDd6XCIvPlxuICAgICAgPHBhdGggZD1cIk0wIDBoMjR2MjRIMHpcIiBmaWxsPVwibm9uZVwiLz5cbiAgICA8L3N2Zz5gLFxuICBlZGl0OiBgPHN2ZyBjbGFzcz1cImotaWNvbi1lZGl0XCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHhtbG5zOnhsaW5rPVwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGlua1wiIHN0eWxlPVwiaXNvbGF0aW9uOmlzb2xhdGVcIiB3aWR0aD1cIjM2XCIgaGVpZ2h0PVwiMzZcIj48cGF0aCBkPVwiIE0gNC41IDI1Ljg3NSBMIDQuNSAzMS41IEwgMTAuMTI1IDMxLjUgTCAyNi43MSAxNC45MSBMIDIxLjA4IDkuMjg1IEwgNC41IDI1Ljg3NSBaICBNIDMxLjA2NSAxMC41NiBDIDMxLjY1IDkuOTc1MDEgMzEuNjUyIDkuMDMgMzEuMDY1IDguNDQ1IEwgMjcuNTU1IDQuOTM1NSBDIDI2Ljk3IDQuMzUgMjYuMDI1IDQuMzUgMjUuNDQgNC45MzU1IEwgMjIuNjk1IDcuNjggTCAyOC4zMjQgMTMuMzA1IEwgMzEuMDY1IDEwLjU2IFogXCIgZmlsbC1ydWxlPVwiZXZlbm9kZFwiIGZpbGw9XCJyZ2IoMCwwLDApXCIgc3Ryb2tlLXdpZHRoPVwiMS41MlwiIHN0cm9rZT1cInJnYmEoMCwwLDAsMClcIiBzdHJva2UtbGluZWNhcD1cImJ1dHRcIi8+PHBhdGggZD1cIiBNIDAgMCBMIDM2IDAgTCAzNiAzNiBMIDAgMzYgTCAwIDAgWiBcIiBmaWxsPVwicmdiYSgwLDAsMCwwKVwiIHN0cm9rZS13aWR0aD1cIjEuNTJcIiBzdHJva2U9XCJyZ2JhKDAsMCwwLDApXCIgc3Ryb2tlLWxpbmVjYXA9XCJidXR0XCIvPjwvc3ZnPmAsXG4gIGVkaXRMaW5lOiBgPHN2ZyBjbGFzcz1cImotaWNvbi1lZGl0LWxpbmVcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgeG1sbnM6eGxpbms9XCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rXCIgc3R5bGU9XCJpc29sYXRpb246aXNvbGF0ZVwiIHdpZHRoPVwiMzZcIiBoZWlnaHQ9XCIzNlwiPjxwYXRoIGQ9XCIgTSAyNi42MiAxMC41MCBMIDIxIDQuODcgTCA2IDE5Ljg3IEwgNiAyNS41MCBMIDExLjYyIDI1LjUgTCAyNi42IDEwLjUgWiAgTSAzMS4wNiA2LjA2IEMgMzEuNjUgNS40NyAzMS42NSA0LjUzMzc1IDMxLjA2NSAzLjk0IEwgMjcuNTU1IDAuNDMgQyAyNi45NyAtMC4xNCAyNi4wMjIgLTAuMTQgMjUuNDQgMC40MyBMIDIyLjUgMy4zNyBMIDI4LjEyNSA5IEwgMzEuMDY1IDYuMDYgWiBcIiBmaWxsLXJ1bGU9XCJldmVub2RkXCIgZmlsbD1cInJnYigwLDAsMClcIiBzdHJva2Utd2lkdGg9XCIxLjVcIiBzdHJva2U9XCJyZ2JhKDAsMCwwLDApXCIgc3Ryb2tlLWxpbmVjYXA9XCJidXR0XCIvPjxwYXRoIGQ9XCIgTSAwIDAgTCAzNiAwIEwgMzYgMzYgTCAwIDM2IEwgMCAwLjAwMzc0OTk5OTk5OTk5OTkyIFogXCIgZmlsbD1cInJnYmEoMCwwLDAsMClcIiBzdHJva2Utd2lkdGg9XCIxLjVcIiBzdHJva2U9XCJyZ2JhKDAsMCwwLDApXCIgc3Ryb2tlLWxpbmVjYXA9XCJidXR0XCIvPjxwYXRoIGQ9XCIgTSAwIDMwIEwgMzYgMzAgTCAzNiAzNiBMIDAgMzYgTCAwIDMwIFogXCIgZmlsbD1cInJnYigwLDAsMClcIiBmaWxsLW9wYWNpdHk9XCIwLjRcIiBzdHJva2Utd2lkdGg9XCIxLjVcIiBzdHJva2U9XCJyZ2JhKDAsMCwwLDApXCIgc3Ryb2tlLWxpbmVjYXA9XCJidXR0XCIvPjwvc3ZnPmAsXG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9zdmctaWNvbnMuanNcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9