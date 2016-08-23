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
	
	var _fieldEditor = __webpack_require__(9);
	
	var _util = __webpack_require__(4);
	
	function create(elem, config) {
	  if (!elem) {
	    throw new Error('JsonEditor instance requires 1st param `elem`');
	  }
	  if (!config) {
	    throw new Error('JsonEditor instance requires 2nd param `config`');
	  }
	
	  _util.Styles.add();
	
	  var destroy = function destroy() {
	    var currForm = elem.querySelector('section.j-edit');
	    if (currForm && typeof currForm.destroy === 'function') {
	      currForm.destroy();
	    }
	    if (keyList && typeof keyList.destroy === 'function') {
	      keyList.destroy();
	    }
	  };
	
	  var _handleSelect = function _handleSelect(_ref) {
	    var target = _ref.target;
	    var detail = _ref.detail;
	
	    console.warn('SELECT', detail, target);
	    var currForm = elem.querySelector('section.j-edit');
	    var opts = {
	      depth: target.depth || null,
	      elem: target,
	      key: target.key,
	      node: target.node,
	      parent: target.parent,
	      path: target.path,
	      type: target.type || 'string'
	    };
	    var editor = (0, _fieldEditor.FieldEditor)(opts);
	    if (currForm && currForm.parentNode) {
	      currForm.parentNode.removeChild(currForm);
	    }
	    elem.appendChild(editor);
	  };
	  var treeSection = document.createElement('section');
	  var keyList = (0, _keyList.KeyList)({ data: config });
	  keyList.addEventListener('selected', _handleSelect);
	  treeSection.appendChild(keyList);
	  treeSection.classList.add('j-side');
	  elem.appendChild(treeSection);
	  elem.classList.add('json-editor');
	  return { destroy: destroy };
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
	  var _ref$path = _ref.path;
	  var path = _ref$path === undefined ? [] : _ref$path;
	  var _ref$depth = _ref.depth;
	  var depth = _ref$depth === undefined ? 0 : _ref$depth;
	
	  var list = (0, _util.createElem)('<ul class="j-keys" depth="' + depth + '"></ul>');
	  Object.keys(data).forEach(function (key, idx, arr) {
	    var valueType = Array.isArray(data[key]) ? 'array' : _typeof(data[key]);
	    var icon = valueType === 'object' ? _svgIcons.arrows.down : valueType === 'array' ? _svgIcons.ux.list : valueType === 'string' ? _svgIcons.ux.edit : _svgIcons.ux.edit;
	    var expandable = valueType === 'object' ? 'j-expandable' : '';
	    var rowPath = [].slice.call(path).push(key + (valueType === 'array' ? '[' : valueType === 'object' ? '.' : ''));
	    var row = (0, _util.createElem)(['<li depth="', depth + 1, '" class="j-closed ', expandable, ' j-type-', valueType, '" key="', key, '">', icon, ' ', key, '</li>'].join(''));
	    Object.assign(row, { node: data, key: key, type: valueType, path: rowPath, value: data[key] });
	    // console.warn('row', row, valueType, icon)
	    list.appendChild(row);
	  });
	  var _clickHandler = function _clickHandler(e) {
	    var preventDefault = e.preventDefault;
	    var target = e.target;
	
	    var li = (0, _util.closest)(target, 'li', 2);
	    if (li) {
	      e.preventDefault();
	      var node = li.node;
	      var key = li.key;
	      var type = li.type;
	      var _path = li.path;
	      var value = li.value;
	
	      var nextData = node[key];
	      var isObject = li.classList.contains('j-type-object');
	      var isArray = li.classList.contains('j-type-array');
	      console.warn('CANCELLED click for %s', key, 'isObject=', isObject, 'isArray=', isArray, 'elem=', li);
	      if (isObject) {
	        if (!li.querySelector('ul')) {
	          // do recursion, on demand
	          li.appendChild(KeyList({ data: nextData, parent: li, depth: depth + 1 }));
	        }
	
	        setTimeout(function () {
	          return li.classList.toggle('j-closed');
	        }, 333);
	        return null;
	      } else {
	        var eventNodeSelected = new CustomEvent('selected', {
	          bubbles: true, cancelable: false,
	          detail: { key: key, data: nextData, element: li, depth: depth + 1, isObject: isObject, isArray: isArray }
	        });
	        li.dispatchEvent(eventNodeSelected);
	        console.warn('Fired Custom Event: ', eventNodeSelected);
	      }
	
	      console.info('_clicked.toggled', key, li);
	    }
	  };
	
	  var destroy = function destroy() {
	    list.removeEventListener('click', _clickHandler);
	    (0, _util.removeNode)(list.parentNode ? list.parentNode : list);
	  };
	
	  if (!parent) {
	    // add only at top of tree, maybe move out of here up a 'layer'
	    list.addEventListener('click', _clickHandler);
	  }
	
	  return Object.assign(list, { destroy: destroy });
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
	exports.removeNode = removeNode;
	exports.getId = getId;
	// jscs:disable safeContextKeyword
	
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
	 * Accepts Element / Node ish objects (i.e. from `document.querySelector`)
	 *
	 * Only removes @node **if it has a valid `parentNode` context**
	 *
	 * Alternate usage, prototype of Node:
	 * `Node.prototype.removeNode = removeNode;`
	 *
	 */
	function removeNode(node) {
	  if (this instanceof Node) {
	    node = this;
	  }
	
	  if (node.parentNode && node.parentNode.removeChild) {
	    node.parentNode.removeChild(node);
	  }
	
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
	 * toBool converts anything to a boolean - see code for details
	 */
	var toBool = exports.toBool = function toBool(str) {
	  if (typeof str === 'boolean') {
	    return str;
	  }
	
	  if (typeof str === 'string') {
	    str = str.length >= 1 ? str.toUpperCase()[0] : str;
	    return ['Y', '1', 'T'].indexOf(str) === 0;
	  }
	
	  return str ? true : false;
	};
	
	/**
	 * Warning: Private/local use only. Do not hoist.
	 * *** Unsafe HTML/string handling ***
	 */
	var createElem = exports.createElem = function createElem(html) {
	  // const container = document.createDocumentFragment()
	  var div = document.createElement('div');
	  div.innerHTML = html; // Potential Security Exploit Vector!!!!!!
	  return div.children.length === 1 ? div.children[0] : div;
	};

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(6)();
	// imports
	
	
	// module
	exports.push([module.id, ".unselectable {\n  user-select: none;\n  -moz-user-select: none;\n  -webkit-user-select: none;\n  -ms-user-select: none;\n}\n.j-xs-1,\n.j-xs-2,\n.j-xs-3,\n.j-xs-4,\n.j-xs-5,\n.j-xs-6,\n.j-xs-7,\n.j-xs-8,\n.j-xs-9,\n.j-xs-10,\n.j-xs-11,\n.j-xs-12 {\n  display: inline-block;\n  box-sizing: border-box;\n}\n.j-xs-1 {\n  width: 8.3333%;\n}\n.j-xs-2 {\n  width: 16.6666%;\n}\n.j-xs-3 {\n  width: 24.9999%;\n}\n.j-xs-4 {\n  width: 33.3332%;\n}\n.j-xs-5 {\n  width: 41.6665%;\n}\n.j-xs-6 {\n  width: 49.9998%;\n}\n.j-xs-7 {\n  width: 58.3331%;\n}\n.j-xs-8 {\n  width: 66.6664%;\n}\n.j-xs-9 {\n  width: 74.9997%;\n}\n.j-xs-10 {\n  width: 83.3331%;\n}\n.j-xs-11 {\n  width: 91.6663%;\n}\n.j-xs-12 {\n  width: 99.9996%;\n}\nul.j-keys {\n  width: 250px;\n  list-style: none;\n  display: inline-block;\n  user-select: none;\n  -moz-user-select: none;\n  -webkit-user-select: none;\n  -ms-user-select: none;\n}\nul.j-keys li {\n  display: block;\n  min-width: 250px;\n  min-height: 22px;\n  text-align: left;\n  padding-left: 10px;\n  margin-left: -30px;\n}\nul.j-keys .j-icon-edit,\nul.j-keys .j-icon-list,\nul.j-keys .j-icon-arrow-down {\n  zoom: 40%;\n}\nul.j-keys li:not(.j-closed) > .j-icon-arrow-down {\n  transform: rotate(-90deg) !important;\n}\nul.j-keys .j-closed > ul {\n  display: none;\n}\nul.j-keys .j-closed:before {\n  content: ' ' !important;\n}\nul.j-keys .j-closed > .j-icon-arrow-down {\n  transform: rotate(0deg) !important;\n}\nul.j-keys .j-icon-plus:before {\n  content: ' ';\n}\nul.j-keys .j-icon-list:before {\n  content: ' ';\n}\nul.j-keys .j-icon-text:before {\n  content: '\\2139   ' !important;\n}\nul.j-keys .j-icon-default:before {\n  content: '\\1F524   \\FE0F' !important;\n}\n.field-editor fieldset {\n  max-width: 275px;\n}\n", ""]);
	
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
	// jscs:disable maximumLineLength, requirePaddingNewLinesBeforeLineComments
	var arrows = exports.arrows = {
	  // up: `<svg class="j-icon-arrow j-icon-arrow-up" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="isolation:isolate" width="85" height="49"><path d="M 82 44.9999999999999 L 42.98741812244738 4.024153880563309 M 4 45 L 42.98741812244727 4" style="fill:none;stroke:#000000;stroke-width:4;stroke-linecap:round;stroke-linejoin:bevel;stroke-miterlimit:3;"/></svg>`,
	  down: "<svg class=\"j-icon-arrow j-icon-arrow-down\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" style=\"isolation:isolate\" width=\"33\" height=\"22\">\n    <path d=\"M 28 4 L 15.99612865306074 16.99234145250431 M 4 4 L 15.996128653060683 17\" style=\"fill:none;stroke:#000000;stroke-width:8;stroke-linecap:round;stroke-linejoin:bevel;stroke-miterlimit:3;\"/>\n  </svg>"
	};
	
	var ux = exports.ux = {
	  add: "<svg style=\"isolation:isolate\" width=\"20\" height=\"20\">\n    <path d=\" M 0 0 L 20 0 L 20 20 L 0 20 L 0 0 Z \" fill=\"rgba(0,0,0,0)\" stroke-width=\"1\" stroke=\"rgba(0,0,0,0)\" stroke-linecap=\"butt\"/>\n    <path d=\" M 11 5 L 9 5 L 9 9 L 5 9 L 5 11 L 9 11 L 9 15 L 11 15 L 11 11 L 15 11 L 15 9 L 11 9 L 11 5 Z  M 10 0 C 4.48 0 0 4.48 0 10 C 0 15.52 4.48 20 10 20 C 15.52 20 20 15.52 20 10 C 20 4.48 15.52 0 10 0 Z  M 10 18 C 5.59 18 2 14.41 2 10 C 2 5.59 5.59 2 10 2 C 14.41 2 18 5.59 18 10 C 18 14.41 14.41 18 10 18 Z \" fill-rule=\"evenodd\" fill=\"rgb(0,0,0)\" stroke-width=\"0.5\" stroke=\"rgba(0,0,0,0)\" stroke-linecap=\"butt\"/>\n  </svg>",
	  plus: "<svg fill=\"#000000\" height=\"24\" viewBox=\"0 0 24 24\" width=\"24\">\n    <path d=\"M0 0h24v24H0z\" fill=\"none\"/>\n    <path d=\"M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z\"/>\n  </svg>",
	  check: "<svg style=\"isolation:isolate\" width=\"24\" height=\"19\">\n    <path d=\" M 0 0.25 L 24 0.25 L 24 24.25 L 0 24.25 L 0 0.25 Z \" fill=\"rgba(0,0,0,0)\" stroke-width=\"1\" stroke=\"rgba(0,0,0,0)\" stroke-linecap=\"butt\"/>\n    <path d=\" M 7.627060830017055 14.685474701534964 L 1.937464468447982 8.995878339965888 L 0 10.919698692438885 L 7.627060830017055 18.54675952245594 L 24 2.1738203524729958 L 22.076179647527002 0.25 L 7.627060830017055 14.685474701534964 Z \" fill=\"rgb(0,0,0)\" stroke-width=\"1\" stroke=\"rgba(0,0,0,0)\" stroke-linecap=\"butt\"/>\n  </svg>",
	  list: "<svg class=\"j-icon-list\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" style=\"isolation:isolate\" width=\"24\" height=\"13.3\">\n    <path d=\" M 0 8 L 2.6 8 L 2.6 5.3 L 0 5.3 L 0 8 Z  M 0 13.3 L 2.6 13.3 L 2.6 10.6 L 0 10.6 L 0 13.3 Z  M 0 2.6 L 2.6 2.6 L 2.6 0 L 0 0 L 0 2.6 Z  M 5.3 8 L 24 8 L 24 5.3 L 5.3 5.3 L 5.3 8 Z  M 5.3 13.3 L 24 13.3 L 24 10.6 L 5.3 10.6 L 5.3 13.3 Z  M 5.3 0 L 5.3 2.6 L 24 2.6 L 24 0 L 5.3 0 Z\"\n     fill-rule=\"evenodd\" fill=\"rgb(0,0,0)\" stroke-width=\"1.5\" stroke=\"rgba(0,0,0,0)\" stroke-linecap=\"butt\"/>\n    <path d=\" M 0 0 L 36 0 L 36 36 L 0 36 L 0 0 Z \" fill=\"rgba(0,0,0,0)\" stroke-width=\"1.5\" stroke=\"rgba(0,0,0,0)\" stroke-linecap=\"butt\"/>\n  </svg>",
	  edit: "<svg class=\"j-icon-edit\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" style=\"isolation:isolate\" width=\"24\" height=\"24\">\n    <path d=\" M -4.4408 19.0006 L -4.4408 24 L 4.9993 24 L 19.7439 9.2553 L 14.7446 4.2560 L -4.4408 19.0006 Z  M 23.61 5.3892 C 24.1299 4.8693 24.1299 4.0294 23.61 3.5095 L 20.49 0.3899 C 19.9705 -0.1299 19.1306 -0.1299 18.6107 0.3899 L 16.171 2.8296 L 21.1703 7.8289 L 23.61 5.3892 Z\"\n      fill-rule=\"evenodd\" fill=\"rgb(0,0,0)\" stroke-width=\"1.50\" stroke=\"rgba(0,0,0,0)\" stroke-linecap=\"butt\"/>\n    <path d=\" M 0 0 L 35 0 L 35 35 L 0 35 L 0 0 Z \" fill=\"rgba(0,0,0,0)\" stroke-width=\"1.5\" stroke=\"rgba(0,0,0,0)\" stroke-linecap=\"butt\"/>\n  </svg>"
	};

/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';
	
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
	
	if (window && typeof window.CustomEvent !== 'function') {
	  window.CustomEvent = CustomEvent;
	  CustomEvent.prototype = window.Event.prototype;
	}

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	exports.FieldEditor = FieldEditor;
	
	var _util = __webpack_require__(4);
	
	function FieldEditor(_ref) {
	  var _arguments = arguments;
	  var key = _ref.key;
	  var node = _ref.node;
	  var parent = _ref.parent;
	  var path = _ref.path;
	  var elem = _ref.elem;
	  var _ref$type = _ref.type;
	  var type = _ref$type === undefined ? 'string' : _ref$type;
	  var _ref$depth = _ref.depth;
	  var depth = _ref$depth === undefined ? 0 : _ref$depth;
	
	
	  var form = (0, _util.createElem)('<section class="j-edit j-side text-left" key="' + key + '" type="' + type + '" depth="' + depth + '" path="' + (Array.isArray(path) ? path.join('::') : path) + '">\n    <form class="field-editor">\n      <fieldset>\n        <label>Name</label>\n        <input type="text" name="name" class="name" value="' + key + '" />\n      </fieldset>\n      <fieldset>\n        <label>Type</label>\n        <select rows="1" name="type">\n          <option value="string">text</option>\n          <option value="boolean">yes/no</option>\n          <option value="number">number</option>\n          <option value="object">object/hash/map/key-val</option>\n          <option value="array">list</option>\n        </select>\n      </fieldset>\n      <fieldset>\n        <label>Value</label>\n        <div class="valueEditorPlaceholder"></div>\n      </fieldset>\n      <fieldset>\n        <button type="submit">Save</button>\n        <button type="reset">Cancel</button>\n        <strong></strong>\n      </fieldset>\n    </form>\n  </section>');
	
	  var value = node[key];
	  var prevVals = {};
	  var getValue = function getValue() {
	    return getValueFld().value;
	  };
	  var getValueFld = function getValueFld() {
	    return form.querySelector('.field-value') || { value: false };
	  };
	  var fldName = form.querySelector('input[name="name"]');
	  var fldType = form.querySelector('select[name="type"]');
	  var placeholder = form.querySelector('.valueEditorPlaceholder');
	  // initialize value tracker (for local 'type' changes)
	  prevVals[type] = value;
	
	  // set value w/ default
	  fldType.value = type;
	
	  // define helpers, e.g. build field, transition state (aka convert)
	  var basicTypes = ['string', 'number', 'boolean'];
	
	  var getValueFieldElem = function getValueFieldElem() {
	    var _value = arguments.length <= 0 || arguments[0] === undefined ? getValue() : arguments[0];
	
	    var renderArrays = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];
	
	    console.trace('   \tGenField(', key, ', ', _value, ')');
	
	    if (fldType.value === 'string') {
	      return (0, _util.createElem)('<input type=\'text\' js-type=\'' + fldType.value + '\' class=\'field-value\' name=\'field-value\' value=\'' + _value + '\' />');
	    } else if (fldType.value === 'number') {
	      return (0, _util.createElem)('<input type=\'number\' js-type=\'' + fldType.value + '\' class=\'field-value\' name=\'field-value\' value=\'' + _value + '\' />');
	    } else if (fldType.value === 'boolean') {
	      return (0, _util.createElem)('<input type=\'checkbox\' js-type=\'' + fldType.value + '\' class=\'field-value\' name=\'field-value\' value=\'checked\'' + (_value ? ' checked' : '') + '\' />');
	    } else if (fldType.value === 'array' && renderArrays) {
	      return _value.reduce(function (elem, val, idx) {
	        var li = (0, _util.createElem)('<li idx="' + idx + '">' + (typeof val === 'string' ? val + ': ' : '') + '</li>');
	        // see if type of array items is simple enough to show value/input field
	        if (basicTypes.indexOf(typeof val === 'undefined' ? 'undefined' : _typeof(val)) <= -1) {
	          li.appendChild((0, _util.createElem)('<textarea js-type=\'' + fldType.value + '\' path=\'' + idx + '\' class=\'field-value json-value\' rows=\'7\'>' + JSON.stringify(val, null, 2) + '</textarea>'));
	        } else {
	          li.appendChild(getValueFieldElem(val, false));
	        }
	        elem.appendChild(li);
	        return elem;
	      }, document.createElement('ul'));
	      // return createElem(`<input type='checkbox' js-type='${fldType.value}' class='field-value' name='field-value' value='checked'${_value ? ' checked' : ''}' />`)
	    } else {
	      return (0, _util.createElem)('<span class="has-error"><input type=\'text\' js-type=\'' + fldType.value + '\' class=\'field-value\' name=\'field-value\' value=\'' + _value + '\' /></span>');
	    }
	  };
	
	  var convert = function convert(_ref2) {
	    var value = _ref2.value;
	    var type = _ref2.type;
	
	    var jsonPattern = /^\s*(\{|\[).*(\]|\})\s*$/g;
	    var isJson = function isJson(s) {
	      return jsonPattern.test(s);
	    };
	    var currType = Array.isArray(value) ? 'array' : typeof value === 'undefined' ? 'undefined' : _typeof(value);
	    switch (type) {
	      case 'string':
	        switch (currType) {
	          case 'string':
	            return value;
	          case 'boolean':
	            return value;
	          case 'array':
	            return typeof value[0] === 'string' ? value.join('\t') : JSON.stringify(value);
	          case 'object':
	            return JSON.stringify(value);
	          default:
	            return value;
	        }
	      case 'number':
	        switch (currType) {
	          case 'string':
	            return parseFloat(value);
	          case 'boolean':
	            return value ? 1 : 0;
	          case 'array':
	            return -1;
	          case 'object':
	            return -1;
	          default:
	            return -99;
	        }
	      case 'boolean':
	        return (0, _util.toBool)(value);
	      case 'array':
	        switch (currType) {
	          case 'string':
	            return isJson(value) ? JSON.parse(value) : value.split(/\s+/);
	          case 'boolean':
	            return [value];
	          case 'array':
	            return value;
	          case 'object':
	            return [value];
	          default:
	            return [];
	        }
	      case 'object':
	        switch (currType) {
	          case 'string':
	            return isJson(value) ? JSON.parse(value) : { value: value };
	          case 'boolean':
	            return { value: value };
	          case 'array':
	            return { value: value };
	          case 'object':
	            return value;
	          default:
	            return {};
	        }
	    }
	    console.error('Failed to Match Type: ', type, currType, value);
	    return value;
	  };
	
	  var updateValueField = function updateValueField(v) {
	    var newType = fldType.value;
	    var newVal = convert({ value: v || getValue(), type: newType });
	    var newFld = getValueFieldElem(newVal);
	    (0, _util.removeAll)(placeholder.children);
	    console.error('Should be empty: placeholder.children', placeholder.children, '\n and the main obj: ', placeholder);
	    placeholder.appendChild(newFld);
	    return newFld;
	  };
	
	  // define events, onTypeChanged, onSave, onCancel
	  var onTypeChanged = function onTypeChanged(_ref3) {
	    var target = _ref3.target;
	
	    console.warn('Type Changed!!', _arguments);
	    var newType = fldType.value;
	    var oldVal = getValue();
	    updateValueField();
	  };
	
	  var getCurrentValue = function getCurrentValue() {
	    var fields = placeholder.querySelectorAll('input, textarea');
	    var results = Array.from(fields).map(function (f) {
	      var v = f.value;
	      var jsType = f.getAttribute('js-type');
	      try {
	        if (f.classList.contains('json-value')) {
	          return JSON.parse(v);
	        }
	      } catch (e) {
	        console.error('FAILED TO CONVERT JSON:', e);
	      }
	      return convert({ value: v, type: jsType });
	    });
	
	    return type !== 'array' ? results[0] : results;
	  };
	
	  var onSave = function onSave(e) {
	    var target = e.target;
	    var detail = e.detail;
	    var preventDefault = e.preventDefault;
	
	    var oldName = key,
	        newName = fldName.value,
	        oldType = type,
	        newType = fldType.value,
	        oldValue = value,
	        newValue = getValue();
	    var nameChanged = oldName !== newName,
	        typeChanged = oldType !== newType,
	        valueChanged = oldValue !== newValue;
	    var changed = nameChanged || typeChanged || valueChanged;
	
	    e.preventDefault();
	
	    if (changed) {
	      console.warn('CHANGED! PATH=' + path + ' Value=', getCurrentValue());
	      console.warn('Saving changes... (' + oldName + ':' + oldValue + ' => ' + newName + ':' + newValue + ') nameChanged=' + nameChanged + ' typeChanged=' + typeChanged + ' valueChanged=' + valueChanged + ' \nArgs=\n', _arguments);
	      if (nameChanged) {
	        node[newName] = newValue;
	        delete node[oldName];
	      } else if (valueChanged) {
	        node[newName] = newValue;
	      }
	    } else {
	      console.warn('Nothing changed');
	    }
	  };
	
	  var onCancel = function onCancel(_ref4) {
	    var target = _ref4.target;
	
	    console.warn('Cancelled!!', _arguments);
	  };
	
	  var setup = function setup() {
	    // Setup events
	    form.querySelector('button[type="submit"]').addEventListener('click', onSave);
	    form.querySelector('button[type="reset"]').addEventListener('click', onCancel);
	    fldType.addEventListener('change', onTypeChanged);
	  };
	
	  var destroy = function destroy() {
	    form.querySelector('button[type="submit"]').removeEventListener('click', onSave);
	    form.querySelector('button[type="reset"]').removeEventListener('click', onCancel);
	    fldType.removeEventListener('change', onTypeChanged);
	    (0, _util.removeNode)(form);
	  };
	
	  setup();
	
	  // init UI
	  updateValueField(value);
	
	  return Object.assign(form, { destroy: destroy });
	}

/***/ }
/******/ ])
});
;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBhNTc3MDM1MTQ1ZjM0OTIzNGRmNCIsIndlYnBhY2s6Ly8vLi9pbmRleC5qcz80YzA4Iiwid2VicGFjazovLy8uL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9rZXktbGlzdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29uZmlnLmpzIiwid2VicGFjazovLy8uL3NyYy91dGlsLmpzIiwid2VicGFjazovLy8uL3NyYy9zdHlsZS5sZXNzIiwid2VicGFjazovLy8uL34vY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N2Zy1pY29ucy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY3VzdG9tLWV2ZW50LmpzIiwid2VicGFjazovLy8uL3NyYy9maWVsZC1lZGl0b3IuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7O0FDdENBLDRHQUFrSixFOzs7Ozs7Ozs7Ozs7U0NJbEksTSxHQUFBLE07O0FBSmhCOztBQUNBOztBQUNBOztBQUVPLFVBQVMsTUFBVCxDQUFnQixJQUFoQixFQUFzQixNQUF0QixFQUE4QjtBQUNuQyxPQUFJLENBQUMsSUFBTCxFQUFhO0FBQUUsV0FBTSxJQUFJLEtBQUosQ0FBVSwrQ0FBVixDQUFOO0FBQWtFO0FBQ2pGLE9BQUksQ0FBQyxNQUFMLEVBQWE7QUFBRSxXQUFNLElB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QUFRLFNBQVIsS0FBUSxHQUFNO0FBQ2xCO0FBQ0EsVUFBSyxhQUFMLENBQW1CLHVCQUFuQixFQUE0QyxnQkFBNUMsQ0FBNkQsT0FBN0QsRUFBc0UsTUFBdEU7QUFDQSxVQUFLLGFBQUwsQ0FBbUIsc0JBQW5CLEVBQTJDLGdCQUEzQyxDQUE0RCxPQUE1RCxFQUFxRSxRQUFyRTtBQUNBLGFBQVEsZ0JBQVIsQ0FBeUIsUUFBekIsRUFBbUMsYUFBbkM7QUFDRCxJQUxEOztBQU9BLE9BQU0sVUFBVSxTQUFWLE9BQVUsR0FBTTtBQUNwQixVQUFLLGFBQUwsQ0FBbUIsdUJBQW5CLEVBQTRDLG1CQUE1QyxDQUFnRSxPQUFoRSxFQUF5RSxNQUF6RTtBQUNBLFVBQUssYUFBTCxDQUFtQixzQkFBbkIsRUFBMkMsbUJBQTNDLENBQStELE9BQS9ELEVBQXdFLFFBQXhFO0FBQ0EsYUFBUSxtQkFBUixDQUE0QixRQUE1QixFQUFzQyxhQUF0QztBQUNBLDJCQUFXLElBQVg7QUFDRCxJQUxEOztBQU9BOztBQUVBO0FBQ0Esb0JBQWlCLEtBQWpCOztBQUVBLFVBQU8sT0FBTyxNQUFQLENBQWMsSUFBZCxFQUFvQixFQUFFLGdCQUFGLEVBQXBCLENBQVA7QUFDRCxFIiwiZmlsZSI6Impzb24tZWRpdG9yLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcIkpzb25FZGl0b3JcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wiSnNvbkVkaXRvclwiXSA9IGZhY3RvcnkoKTtcbn0pKHRoaXMsIGZ1bmN0aW9uKCkge1xucmV0dXJuIFxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvblxuICoqLyIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgYTU3NzAzNTE0NWYzNDkyMzRkZjRcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IGdsb2JhbFtcIkpzb25FZGl0b3JcIl0gPSByZXF1aXJlKFwiLSEvVXNlcnMvZGxldnkvY29kZS9vc3MvanNvbi1lZGl0b3Ivbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9pbmRleC5qcz97XFxcInByZXNldHNcXFwiOltcXFwiZXMyMDE1XFxcIl19IS9Vc2Vycy9kbGV2eS9jb2RlL29zcy9qc29uLWVkaXRvci9pbmRleC5qc1wiKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vaW5kZXguanNcbiAqKiBtb2R1bGUgaWQgPSAwXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJpbXBvcnQge0tleUxpc3R9ICAgICAgZnJvbSAnLi9zcmMva2V5LWxpc3QnXG5pbXBvcnQge0ZpZWxkRWRpdG9yfSAgZnJvbSAnLi9zcmMvZmllbGQtZWRpdG9yJ1xuaW1wb3J0IHtTdHlsZXN9ICAgICAgIGZyb20gJy4vc3JjL3V0aWwnXG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGUoZWxlbSwgY29uZmlnKSB7XG4gIGlmICghZWxlbSkgICB7IHRocm93IG5ldyBFcnJvcignSnNvbkVkaXRvciBpbnN0YW5jZSByZXF1aXJlcyAxc3QgcGFyYW0gYGVsZW1gJykgfVxuICBpZiAoIWNvbmZpZykgeyB0aHJvdyBuZXcgRXJyb3IoJ0pzb25FZGl0b3IgaW5zdGFuY2UgcmVxdWlyZXMgMm5kIHBhcmFtIGBjb25maWdgJykgfVxuICBcbiAgU3R5bGVzLmFkZCgpXG5cbiAgY29uc3QgZGVzdHJveSA9ICgpID0+IHtcbiAgICBjb25zdCBjdXJyRm9ybSA9IGVsZW0ucXVlcnlTZWxlY3Rvcignc2VjdGlvbi5qLWVkaXQnKVxuICAgIGlmIChjdXJyRm9ybSAmJiB0eXBlb2YgY3VyckZvcm0uZGVzdHJveSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgY3VyckZvcm0uZGVzdHJveSgpXG4gICAgfVxuICAgIGlmIChrZXlMaXN0ICYmIHR5cGVvZiBrZXlMaXN0LmRlc3Ryb3kgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGtleUxpc3QuZGVzdHJveSgpXG4gICAgfVxuICB9XG5cbiAgY29uc3QgX2hhbmRsZVNlbGVjdCA9ICh7dGFyZ2V0LCBkZXRhaWx9KSA9PiB7XG4gICAgY29uc29sZS53YXJuKCdTRUxFQ1QnLCBkZXRhaWwsIHRhcmdldClcbiAgICBjb25zdCBjdXJyRm9ybSA9IGVsZW0ucXVlcnlTZWxlY3Rvcignc2VjdGlvbi5qLWVkaXQnKVxuICAgIGNvbnN0IG9wdHMgPSB7XG4gICAgICBkZXB0aDogIHRhcmdldC5kZXB0aCB8fCBudWxsLFxuICAgICAgZWxlbTogICB0YXJnZXQsIFxuICAgICAga2V5OiAgICB0YXJnZXQua2V5LCBcbiAgICAgIG5vZGU6ICAgdGFyZ2V0Lm5vZGUsIFxuICAgICAgcGFyZW50OiB0YXJnZXQucGFyZW50LCBcbiAgICAgIHBhdGg6ICAgdGFyZ2V0LnBhdGgsIFxuICAgICAgdHlwZTogICB0YXJnZXQudHlwZSB8fCAnc3RyaW5nJywgXG4gICAgfVxuICAgIGNvbnN0IGVkaXRvciA9IEZpZWxkRWRpdG9yKG9wdHMpXG4gICAgaWYgKGN1cnJGb3JtICYmIGN1cnJGb3JtLnBhcmVudE5vZGUpIHtcbiAgICAgIGN1cnJGb3JtLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoY3VyckZvcm0pXG4gICAgfVxuICAgIGVsZW0uYXBwZW5kQ2hpbGQoZWRpdG9yKVxuICB9XG4gIGNvbnN0IHRyZWVTZWN0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2VjdGlvbicpXG4gIGNvbnN0IGtleUxpc3QgPSBLZXlMaXN0KHtkYXRhOiBjb25maWd9KVxuICBrZXlMaXN0LmFkZEV2ZW50TGlzdGVuZXIoJ3NlbGVjdGVkJywgX2hhbmRsZVNlbGVjdClcbiAgdHJlZVNlY3Rpb24uYXBwZW5kQ2hpbGQoa2V5TGlzdClcbiAgdHJlZVNlY3Rpb24uY2xhc3NMaXN0LmFkZCgnai1zaWRlJylcbiAgZWxlbS5hcHBlbmRDaGlsZCh0cmVlU2VjdGlvbilcbiAgZWxlbS5jbGFzc0xpc3QuYWRkKCdqc29uLWVkaXRvcicpXG4gIHJldHVybiB7ZGVzdHJveX07XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2luZGV4LmpzXG4gKiovIiwiaW1wb3J0IHsgY29uZmlnIH0gICAgICAgICAgICAgICAgICAgICAgICAgZnJvbSAnLi9jb25maWcnXG5pbXBvcnQgeyBjcmVhdGVFbGVtLCBjbG9zZXN0LFxuICAgICAgICAgIHJlbW92ZUFsbCwgcmVtb3ZlTm9kZSB9IGZyb20gJy4vdXRpbCdcbmltcG9ydCB7IGFycm93cywgdXggfSAgICAgICAgICAgICAgICAgICAgIGZyb20gJy4vc3ZnLWljb25zJ1xuaW1wb3J0IHsgQ3VzdG9tRXZlbnQgYXMgX0N1c3RvbUV2ZW50IH0gICAgZnJvbSAnLi9jdXN0b20tZXZlbnQnXG4vLyBfQ3VzdG9tRXZlbnQgc2hvdWxkIGF1dG8tYXR0YWNoIHRoZSBvYmplY3QgdG8gdGhlIHdpbmRvdy4uLiBpZiBub3QgbWFrZSBpbml0IGZ1bmN0aW9uXG5cbmV4cG9ydCBmdW5jdGlvbiBLZXlMaXN0KHsgZGF0YSwgcGFyZW50LCBwYXRoID0gW10sIGRlcHRoID0gMCB9KSB7XG4gIGNvbnN0IGxpc3QgPSBjcmVhdGVFbGVtKCc8dWwgY2xhc3M9XCJqLWtleXNcIiBkZXB0aD1cIicgKyBkZXB0aCArICdcIj48L3VsPicpXG4gIE9iamVjdFxuICAgIC5rZXlzKGRhdGEpXG4gICAgLmZvckVhY2goKGtleSwgaWR4LCBhcnIpID0+IHtcbiAgICAgIGNvbnN0IHZhbHVlVHlwZSAgID0gQXJyYXkuaXNBcnJheShkYXRhW2tleV0pID8gJ2FycmF5JyA6IHR5cGVvZiBkYXRhW2tleV1cbiAgICAgIGNvbnN0IGljb24gICAgICAgID0gICAgICAgICAgICB2YWx1ZVR5cGUgPT09ICdvYmplY3QnID9cbiAgICAgICAgICAgICAgICAgICAgICBhcnJvd3MuZG93biAgOiB2YWx1ZVR5cGUgPT09ICdhcnJheScgP1xuICAgICAgICAgICAgICAgICAgICAgIHV4Lmxpc3QgICAgICA6IHZhbHVlVHlwZSA9PT0gJ3N0cmluZycgP1xuICAgICAgICAgICAgICAgICAgICAgIHV4LmVkaXQgICAgICA6IHV4LmVkaXRcbiAgICAgIGNvbnN0IGV4cGFuZGFibGUgID0gdmFsdWVUeXBlID09PSAnb2JqZWN0JyA/ICdqLWV4cGFuZGFibGUnIDogJydcbiAgICAgIGxldCByb3dQYXRoID0gW10uc2xpY2UuY2FsbChwYXRoKS5wdXNoKGtleSArICh2YWx1ZVR5cGUgPT09ICdhcnJheScgPyAnWycgOiB2YWx1ZVR5cGUgPT09ICdvYmplY3QnID8gJy4nIDogJycpKVxuICAgICAgY29uc3Qgcm93ID0gY3JlYXRlRWxlbShbJzxsaSBkZXB0aD1cIicsIGRlcHRoICsgMSwgJ1wiIGNsYXNzPVwiai1jbG9zZWQgJywgZXhwYW5kYWJsZSwgJyBqLXR5cGUtJywgdmFsdWVUeXBlLCAnXCIga2V5PVwiJywga2V5LCAnXCI+JywgaWNvbiwgJyAnLCBrZXksICc8L2xpPiddLmpvaW4oJycpKVxuICAgICAgT2JqZWN0LmFzc2lnbihyb3csIHsgbm9kZTogZGF0YSwga2V5OiBrZXksIHR5cGU6IHZhbHVlVHlwZSwgcGF0aDogcm93UGF0aCwgdmFsdWU6IGRhdGFba2V5XSB9KVxuICAgICAgLy8gY29uc29sZS53YXJuKCdyb3cnLCByb3csIHZhbHVlVHlwZSwgaWNvbilcbiAgICAgIGxpc3QuYXBwZW5kQ2hpbGQocm93KVxuICAgIH0pXG4gIGNvbnN0IF9jbGlja0hhbmRsZXIgPSAoZSkgPT4ge1xuICAgIGNvbnN0IHsgcHJldmVudERlZmF1bHQsIHRhcmdldCB9ID0gZVxuICAgIGNvbnN0IGxpID0gY2xvc2VzdCh0YXJnZXQsICdsaScsIDIpXG4gICAgaWYgKGxpKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgIGNvbnN0IHsgbm9kZSwga2V5LCB0eXBlLCBwYXRoLCB2YWx1ZSB9ID0gbGlcbiAgICAgIGNvbnN0IG5leHREYXRhICA9IG5vZGVba2V5XVxuICAgICAgY29uc3QgaXNPYmplY3QgPSBsaS5jbGFzc0xpc3QuY29udGFpbnMoJ2otdHlwZS1vYmplY3QnKVxuICAgICAgY29uc3QgaXNBcnJheSAgPSBsaS5jbGFzc0xpc3QuY29udGFpbnMoJ2otdHlwZS1hcnJheScpXG4gICAgICBjb25zb2xlLndhcm4oJ0NBTkNFTExFRCBjbGljayBmb3IgJXMnLCBrZXksICdpc09iamVjdD0nLCBpc09iamVjdCwgJ2lzQXJyYXk9JywgaXNBcnJheSwgJ2VsZW09JywgbGkpXG4gICAgICBpZiAoaXNPYmplY3QpIHtcbiAgICAgICAgaWYgKCFsaS5xdWVyeVNlbGVjdG9yKCd1bCcpKSB7XG4gICAgICAgICAgLy8gZG8gcmVjdXJzaW9uLCBvbiBkZW1hbmRcbiAgICAgICAgICBsaS5hcHBlbmRDaGlsZChLZXlMaXN0KHsgZGF0YTogbmV4dERhdGEsIHBhcmVudDogbGksIGRlcHRoOiBkZXB0aCArIDEgfSkpXG4gICAgICAgIH1cblxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IGxpLmNsYXNzTGlzdC50b2dnbGUoJ2otY2xvc2VkJyksIDMzMylcbiAgICAgICAgcmV0dXJuIG51bGxcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGV2ZW50Tm9kZVNlbGVjdGVkID0gbmV3IEN1c3RvbUV2ZW50KCdzZWxlY3RlZCcsIHtcbiAgICAgICAgICBidWJibGVzOiB0cnVlLCBjYW5jZWxhYmxlOiBmYWxzZSxcbiAgICAgICAgICBkZXRhaWw6IHsga2V5OiBrZXksIGRhdGE6IG5leHREYXRhLCBlbGVtZW50OiBsaSwgZGVwdGg6IGRlcHRoICsgMSwgaXNPYmplY3QsIGlzQXJyYXkgfSxcbiAgICAgICAgfSlcbiAgICAgICAgbGkuZGlzcGF0Y2hFdmVudChldmVudE5vZGVTZWxlY3RlZClcbiAgICAgICAgY29uc29sZS53YXJuKCdGaXJlZCBDdXN0b20gRXZlbnQ6ICcsIGV2ZW50Tm9kZVNlbGVjdGVkKVxuICAgICAgfVxuXG4gICAgICBjb25zb2xlLmluZm8oJ19jbGlja2VkLnRvZ2dsZWQnLCBrZXksIGxpKVxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IGRlc3Ryb3kgPSAoKSA9PiB7XG4gICAgbGlzdC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIF9jbGlja0hhbmRsZXIpXG4gICAgcmVtb3ZlTm9kZShsaXN0LnBhcmVudE5vZGUgPyBsaXN0LnBhcmVudE5vZGUgOiBsaXN0KVxuICB9XG5cbiAgaWYgKCFwYXJlbnQpIHtcbiAgICAvLyBhZGQgb25seSBhdCB0b3Agb2YgdHJlZSwgbWF5YmUgbW92ZSBvdXQgb2YgaGVyZSB1cCBhICdsYXllcidcbiAgICBsaXN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgX2NsaWNrSGFuZGxlcilcbiAgfVxuXG4gIHJldHVybiBPYmplY3QuYXNzaWduKGxpc3QsIHsgZGVzdHJveSB9KVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMva2V5LWxpc3QuanNcbiAqKi8iLCJleHBvcnQgY29uc3QgY29uZmlnID0ge1xuICBkZWJ1ZzogZmFsc2UsXG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9jb25maWcuanNcbiAqKi8iLCIvLyBqc2NzOmRpc2FibGUgc2FmZUNvbnRleHRLZXl3b3JkXG5cbi8qKlxuICogVXRpbGl0eSBhcnJheWlmeSBtZXRob2RcbiAqIEFkZCB0byAucHJvdG90eXBlIG9mIEl0ZXJhdG9ycywgQXJyYXlCdWZmZXIsIEFyZ3VtZW50cywgTm9kZUxpc3QsIFNldC9XZWFrU2V0LCB3aGF0ZXZlciAjWU9MT1xuICpcbiAqIC4uLiBPciBqdXN0IHVzZSBhcyB1dGlsLCBhcyBuZWVkZWQsICNKdXN0RG9JdFxuICpcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRvQXJyYXkobGlzdCkge1xuICBsaXN0ID0gQXJyYXkuaXNBcnJheShsaXN0KSA/IGxpc3QgOiB0aGlzXG4gIGxpc3QgPSAhbGlzdCA/IFtdIDogbGlzdFxuICByZXR1cm4gQXJyYXkuZnJvbSAmJiBBcnJheS5mcm9tKGxpc3QpIHx8IFsndXBncmFkZSB5b3VyIGJyb3dzZXIsIHBmZnQnXVxufVxuXG4vKipcbiAqIEdldCBgQXJyYXkuc29ydGAgZnVuY3Rpb24gZm9yIGtleSBuYW1lIGNvbXBhcmlzb25zIChzdXBwb3J0cyByZXZlcnNlKVxuICpcbiAqIFdoZW4gbmFtZSA9PT0gJ2VtYWlsICAgLS0tIFNvcnQgZW1haWwgYXNjZW5kaW5nLlxuICpcbiAqIFdoZW4gbmFtZSA9PT0gJy1lbWFpbCAgLS0tIFNvcnQgZW1haWwgZGVzY2VuZGluZ1xuICpcbiAqIEByZXR1cm5zIFtmdW5jdGlvbl0gY29tcGFyZXIgdXNlZCBpbiBgQXJyYXkuc29ydCgpYFxuICpcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFNvcnRlcihrZXkpIHtcbiAgY29uc3QgX2VuZ2xpc2hTb3J0ICAgICAgICAgPSAoYSwgYikgPT4gKGFba2V5XSA8IGJba2V5XSA/IC0xIDogKGFba2V5XSA+IGJba2V5XSA/IDEgOiAwKSlcbiAgY29uc3QgX2VuZ2xpc2hTb3J0UmV2ZXJzZWQgPSAoYSwgYikgPT4gKGFba2V5XSA+PSBiW2tleV0gPyAtMSA6IChhW2tleV0gPCBiW2tleV0gPyAxIDogMCkpXG5cbiAgaWYgKGtleVswXSA9PT0gJy0nKSB7XG4gICAga2V5ID0ga2V5LnN1YnN0cigxKTtcbiAgICByZXR1cm4gX2VuZ2xpc2hTb3J0UmV2ZXJzZWQ7XG4gIH1cblxuICByZXR1cm4gX2VuZ2xpc2hTb3J0O1xufVxuXG4vKipcbiAqXG4gKi9cbmV4cG9ydCBjb25zdCBTdHlsZXMgPSB7XG4gIGFkZDogKCkgPT4ge1xuICAgIGxldCBjc3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdzdHlsZSNqc29uLWVkaXRvcicpXG4gICAgaWYgKCFjc3MpIHtcbiAgICAgIGNvbnN0IHN0eWxlcyAgPSByZXF1aXJlKCchY3NzIWxlc3MhLi9zdHlsZS5sZXNzJylcbiAgICAgIGNzcyAgICAgICAgICAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpXG4gICAgICBjc3MuaWQgICAgICAgID0gJ2pzb24tZWRpdG9yJ1xuICAgICAgY3NzLmlubmVySFRNTCA9IHN0eWxlc1xuICAgICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChjc3MpXG4gICAgfVxuICB9LFxuXG4gIHJlbW92ZTogKCkgPT4ge1xuICAgIGxldCBjc3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdzdHlsZSNqc29uLWVkaXRvcicpXG4gICAgaWYgKGNzcyAmJiBjc3MucGFyZW50Tm9kZSkgeyBjc3MucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChjc3MpIH1cbiAgfSxcbn1cblxuLyoqXG4gKiBBY2NlcHRzIGVsZW1lbnRzIGZyb20gYGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGxgXG4gKlxuICogUmVtb3ZlcyBhbGwgY2hpbGRyZW4gb2YgQG5vZGVcbiAqXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVBbGwobm9kZSkge1xuICBpZiAodGhpcyBpbnN0YW5jZW9mIE5vZGVMaXN0KSB7IG5vZGUgPSB0aGlzOyB9XG5cbiAgdG9BcnJheShub2RlKVxuICAgIC5mb3JFYWNoKGVsID0+IGVsLnBhcmVudE5vZGUgJiYgZWwucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChlbCkpXG4gIHJldHVybiBub2RlXG59XG5cbi8qKlxuICogQWNjZXB0cyBFbGVtZW50IC8gTm9kZSBpc2ggb2JqZWN0cyAoaS5lLiBmcm9tIGBkb2N1bWVudC5xdWVyeVNlbGVjdG9yYClcbiAqXG4gKiBPbmx5IHJlbW92ZXMgQG5vZGUgKippZiBpdCBoYXMgYSB2YWxpZCBgcGFyZW50Tm9kZWAgY29udGV4dCoqXG4gKlxuICogQWx0ZXJuYXRlIHVzYWdlLCBwcm90b3R5cGUgb2YgTm9kZTpcbiAqIGBOb2RlLnByb3RvdHlwZS5yZW1vdmVOb2RlID0gcmVtb3ZlTm9kZTtgXG4gKlxuICovXG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlTm9kZShub2RlKSB7XG4gIGlmICh0aGlzIGluc3RhbmNlb2YgTm9kZSkgeyBub2RlID0gdGhpczsgfVxuXG4gIGlmIChub2RlLnBhcmVudE5vZGUgJiYgbm9kZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKSB7XG4gICAgbm9kZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKG5vZGUpXG4gIH1cblxuICByZXR1cm4gbm9kZVxufVxuXG4vKipcbiAqIFRvdGVzIG9idmlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldElkKHsgaWQsIF9pZCwga2V5IH0pIHsgcmV0dXJuIGlkIHx8IF9pZCB8fCBrZXk7IH1cblxuLyoqXG4gKlxuICovXG5leHBvcnQgY29uc3QgY2xvc2VzdCA9IChlbGVtLCBzZWxlY3RvciwgbGltaXQgPSBudWxsKSA9PiB7XG4gIGlmIChsaW1pdCAhPT0gbnVsbCAmJiBsaW1pdCA8PSAwKSB7IHJldHVybiBmYWxzZSB9XG5cbiAgcmV0dXJuICFlbGVtID8gbnVsbFxuICAgICAgICAgOiBlbGVtLm1hdGNoZXMgJiYgZWxlbS5tYXRjaGVzKHNlbGVjdG9yKVxuICAgICAgICAgPyBlbGVtIDogZWxlbS5jbGFzc0xpc3QgJiYgZWxlbS5jbGFzc0xpc3QuY29udGFpbnMoc2VsZWN0b3IpXG4gICAgICAgICA/IGVsZW0gOiBjbG9zZXN0KGVsZW0ucGFyZW50Tm9kZSwgc2VsZWN0b3IsIChsaW1pdCAhPT0gbnVsbCA/IGxpbWl0IC0gMSA6IGxpbWl0KSlcbn1cblxuLyoqXG4gKiB0b0Jvb2wgY29udmVydHMgYW55dGhpbmcgdG8gYSBib29sZWFuIC0gc2VlIGNvZGUgZm9yIGRldGFpbHNcbiAqL1xuZXhwb3J0IGNvbnN0IHRvQm9vbCA9IChzdHIpID0+IHtcbiAgaWYgKHR5cGVvZiBzdHIgPT09ICdib29sZWFuJykge1xuICAgIHJldHVybiBzdHJcbiAgfVxuXG4gIGlmICh0eXBlb2Ygc3RyID09PSAnc3RyaW5nJykge1xuICAgIHN0ciA9IChzdHIubGVuZ3RoID49IDEgPyBzdHIudG9VcHBlckNhc2UoKVswXSA6IHN0cilcbiAgICByZXR1cm4gWydZJywgJzEnLCAnVCddLmluZGV4T2Yoc3RyKSA9PT0gMFxuICB9XG5cbiAgcmV0dXJuIHN0ciA/IHRydWUgOiBmYWxzZVxufVxuXG4vKipcbiAqIFdhcm5pbmc6IFByaXZhdGUvbG9jYWwgdXNlIG9ubHkuIERvIG5vdCBob2lzdC5cbiAqICoqKiBVbnNhZmUgSFRNTC9zdHJpbmcgaGFuZGxpbmcgKioqXG4gKi9cbmV4cG9ydCBjb25zdCBjcmVhdGVFbGVtID0gaHRtbCA9PiB7XG4gIC8vIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKVxuICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICBkaXYuaW5uZXJIVE1MID0gaHRtbCAvLyBQb3RlbnRpYWwgU2VjdXJpdHkgRXhwbG9pdCBWZWN0b3IhISEhISFcbiAgcmV0dXJuIGRpdi5jaGlsZHJlbi5sZW5ndGggPT09IDEgPyBkaXYuY2hpbGRyZW5bMF0gOiBkaXZcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3V0aWwuanNcbiAqKi8iLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikoKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIi51bnNlbGVjdGFibGUge1xcbiAgdXNlci1zZWxlY3Q6IG5vbmU7XFxuICAtbW96LXVzZXItc2VsZWN0OiBub25lO1xcbiAgLXdlYmtpdC11c2VyLXNlbGVjdDogbm9uZTtcXG4gIC1tcy11c2VyLXNlbGVjdDogbm9uZTtcXG59XFxuLmoteHMtMSxcXG4uai14cy0yLFxcbi5qLXhzLTMsXFxuLmoteHMtNCxcXG4uai14cy01LFxcbi5qLXhzLTYsXFxuLmoteHMtNyxcXG4uai14cy04LFxcbi5qLXhzLTksXFxuLmoteHMtMTAsXFxuLmoteHMtMTEsXFxuLmoteHMtMTIge1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG59XFxuLmoteHMtMSB7XFxuICB3aWR0aDogOC4zMzMzJTtcXG59XFxuLmoteHMtMiB7XFxuICB3aWR0aDogMTYuNjY2NiU7XFxufVxcbi5qLXhzLTMge1xcbiAgd2lkdGg6IDI0Ljk5OTklO1xcbn1cXG4uai14cy00IHtcXG4gIHdpZHRoOiAzMy4zMzMyJTtcXG59XFxuLmoteHMtNSB7XFxuICB3aWR0aDogNDEuNjY2NSU7XFxufVxcbi5qLXhzLTYge1xcbiAgd2lkdGg6IDQ5Ljk5OTglO1xcbn1cXG4uai14cy03IHtcXG4gIHdpZHRoOiA1OC4zMzMxJTtcXG59XFxuLmoteHMtOCB7XFxuICB3aWR0aDogNjYuNjY2NCU7XFxufVxcbi5qLXhzLTkge1xcbiAgd2lkdGg6IDc0Ljk5OTclO1xcbn1cXG4uai14cy0xMCB7XFxuICB3aWR0aDogODMuMzMzMSU7XFxufVxcbi5qLXhzLTExIHtcXG4gIHdpZHRoOiA5MS42NjYzJTtcXG59XFxuLmoteHMtMTIge1xcbiAgd2lkdGg6IDk5Ljk5OTYlO1xcbn1cXG51bC5qLWtleXMge1xcbiAgd2lkdGg6IDI1MHB4O1xcbiAgbGlzdC1zdHlsZTogbm9uZTtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIHVzZXItc2VsZWN0OiBub25lO1xcbiAgLW1vei11c2VyLXNlbGVjdDogbm9uZTtcXG4gIC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7XFxuICAtbXMtdXNlci1zZWxlY3Q6IG5vbmU7XFxufVxcbnVsLmota2V5cyBsaSB7XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIG1pbi13aWR0aDogMjUwcHg7XFxuICBtaW4taGVpZ2h0OiAyMnB4O1xcbiAgdGV4dC1hbGlnbjogbGVmdDtcXG4gIHBhZGRpbmctbGVmdDogMTBweDtcXG4gIG1hcmdpbi1sZWZ0OiAtMzBweDtcXG59XFxudWwuai1rZXlzIC5qLWljb24tZWRpdCxcXG51bC5qLWtleXMgLmotaWNvbi1saXN0LFxcbnVsLmota2V5cyAuai1pY29uLWFycm93LWRvd24ge1xcbiAgem9vbTogNDAlO1xcbn1cXG51bC5qLWtleXMgbGk6bm90KC5qLWNsb3NlZCkgPiAuai1pY29uLWFycm93LWRvd24ge1xcbiAgdHJhbnNmb3JtOiByb3RhdGUoLTkwZGVnKSAhaW1wb3J0YW50O1xcbn1cXG51bC5qLWtleXMgLmotY2xvc2VkID4gdWwge1xcbiAgZGlzcGxheTogbm9uZTtcXG59XFxudWwuai1rZXlzIC5qLWNsb3NlZDpiZWZvcmUge1xcbiAgY29udGVudDogJyAnICFpbXBvcnRhbnQ7XFxufVxcbnVsLmota2V5cyAuai1jbG9zZWQgPiAuai1pY29uLWFycm93LWRvd24ge1xcbiAgdHJhbnNmb3JtOiByb3RhdGUoMGRlZykgIWltcG9ydGFudDtcXG59XFxudWwuai1rZXlzIC5qLWljb24tcGx1czpiZWZvcmUge1xcbiAgY29udGVudDogJyAnO1xcbn1cXG51bC5qLWtleXMgLmotaWNvbi1saXN0OmJlZm9yZSB7XFxuICBjb250ZW50OiAnICc7XFxufVxcbnVsLmota2V5cyAuai1pY29uLXRleHQ6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6ICdcXFxcMjEzOSAgICcgIWltcG9ydGFudDtcXG59XFxudWwuai1rZXlzIC5qLWljb24tZGVmYXVsdDpiZWZvcmUge1xcbiAgY29udGVudDogJ1xcXFwxRjUyNCAgIFxcXFxGRTBGJyAhaW1wb3J0YW50O1xcbn1cXG4uZmllbGQtZWRpdG9yIGZpZWxkc2V0IHtcXG4gIG1heC13aWR0aDogMjc1cHg7XFxufVxcblwiLCBcIlwiXSk7XG5cbi8vIGV4cG9ydHNcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2Nzcy1sb2FkZXIhLi9+L2xlc3MtbG9hZGVyIS4vc3JjL3N0eWxlLmxlc3NcbiAqKiBtb2R1bGUgaWQgPSA1XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKlxyXG5cdE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXHJcblx0QXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxyXG4qL1xyXG4vLyBjc3MgYmFzZSBjb2RlLCBpbmplY3RlZCBieSB0aGUgY3NzLWxvYWRlclxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xyXG5cdHZhciBsaXN0ID0gW107XHJcblxyXG5cdC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcclxuXHRsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XHJcblx0XHR2YXIgcmVzdWx0ID0gW107XHJcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHR2YXIgaXRlbSA9IHRoaXNbaV07XHJcblx0XHRcdGlmKGl0ZW1bMl0pIHtcclxuXHRcdFx0XHRyZXN1bHQucHVzaChcIkBtZWRpYSBcIiArIGl0ZW1bMl0gKyBcIntcIiArIGl0ZW1bMV0gKyBcIn1cIik7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0cmVzdWx0LnB1c2goaXRlbVsxXSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdHJldHVybiByZXN1bHQuam9pbihcIlwiKTtcclxuXHR9O1xyXG5cclxuXHQvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxyXG5cdGxpc3QuaSA9IGZ1bmN0aW9uKG1vZHVsZXMsIG1lZGlhUXVlcnkpIHtcclxuXHRcdGlmKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKVxyXG5cdFx0XHRtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCBcIlwiXV07XHJcblx0XHR2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xyXG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0dmFyIGlkID0gdGhpc1tpXVswXTtcclxuXHRcdFx0aWYodHlwZW9mIGlkID09PSBcIm51bWJlclwiKVxyXG5cdFx0XHRcdGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcclxuXHRcdH1cclxuXHRcdGZvcihpID0gMDsgaSA8IG1vZHVsZXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0dmFyIGl0ZW0gPSBtb2R1bGVzW2ldO1xyXG5cdFx0XHQvLyBza2lwIGFscmVhZHkgaW1wb3J0ZWQgbW9kdWxlXHJcblx0XHRcdC8vIHRoaXMgaW1wbGVtZW50YXRpb24gaXMgbm90IDEwMCUgcGVyZmVjdCBmb3Igd2VpcmQgbWVkaWEgcXVlcnkgY29tYmluYXRpb25zXHJcblx0XHRcdC8vICB3aGVuIGEgbW9kdWxlIGlzIGltcG9ydGVkIG11bHRpcGxlIHRpbWVzIHdpdGggZGlmZmVyZW50IG1lZGlhIHF1ZXJpZXMuXHJcblx0XHRcdC8vICBJIGhvcGUgdGhpcyB3aWxsIG5ldmVyIG9jY3VyIChIZXkgdGhpcyB3YXkgd2UgaGF2ZSBzbWFsbGVyIGJ1bmRsZXMpXHJcblx0XHRcdGlmKHR5cGVvZiBpdGVtWzBdICE9PSBcIm51bWJlclwiIHx8ICFhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XHJcblx0XHRcdFx0aWYobWVkaWFRdWVyeSAmJiAhaXRlbVsyXSkge1xyXG5cdFx0XHRcdFx0aXRlbVsyXSA9IG1lZGlhUXVlcnk7XHJcblx0XHRcdFx0fSBlbHNlIGlmKG1lZGlhUXVlcnkpIHtcclxuXHRcdFx0XHRcdGl0ZW1bMl0gPSBcIihcIiArIGl0ZW1bMl0gKyBcIikgYW5kIChcIiArIG1lZGlhUXVlcnkgKyBcIilcIjtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0bGlzdC5wdXNoKGl0ZW0pO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fTtcclxuXHRyZXR1cm4gbGlzdDtcclxufTtcclxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcbiAqKiBtb2R1bGUgaWQgPSA2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvLyBqc2NzOmRpc2FibGUgbWF4aW11bUxpbmVMZW5ndGgsIHJlcXVpcmVQYWRkaW5nTmV3TGluZXNCZWZvcmVMaW5lQ29tbWVudHNcbmV4cG9ydCBjb25zdCBhcnJvd3MgPSB7XG4gIC8vIHVwOiBgPHN2ZyBjbGFzcz1cImotaWNvbi1hcnJvdyBqLWljb24tYXJyb3ctdXBcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgeG1sbnM6eGxpbms9XCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rXCIgc3R5bGU9XCJpc29sYXRpb246aXNvbGF0ZVwiIHdpZHRoPVwiODVcIiBoZWlnaHQ9XCI0OVwiPjxwYXRoIGQ9XCJNIDgyIDQ0Ljk5OTk5OTk5OTk5OTkgTCA0Mi45ODc0MTgxMjI0NDczOCA0LjAyNDE1Mzg4MDU2MzMwOSBNIDQgNDUgTCA0Mi45ODc0MTgxMjI0NDcyNyA0XCIgc3R5bGU9XCJmaWxsOm5vbmU7c3Ryb2tlOiMwMDAwMDA7c3Ryb2tlLXdpZHRoOjQ7c3Ryb2tlLWxpbmVjYXA6cm91bmQ7c3Ryb2tlLWxpbmVqb2luOmJldmVsO3N0cm9rZS1taXRlcmxpbWl0OjM7XCIvPjwvc3ZnPmAsXG4gIGRvd246IGA8c3ZnIGNsYXNzPVwiai1pY29uLWFycm93IGotaWNvbi1hcnJvdy1kb3duXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHhtbG5zOnhsaW5rPVwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGlua1wiIHN0eWxlPVwiaXNvbGF0aW9uOmlzb2xhdGVcIiB3aWR0aD1cIjMzXCIgaGVpZ2h0PVwiMjJcIj5cbiAgICA8cGF0aCBkPVwiTSAyOCA0IEwgMTUuOTk2MTI4NjUzMDYwNzQgMTYuOTkyMzQxNDUyNTA0MzEgTSA0IDQgTCAxNS45OTYxMjg2NTMwNjA2ODMgMTdcIiBzdHlsZT1cImZpbGw6bm9uZTtzdHJva2U6IzAwMDAwMDtzdHJva2Utd2lkdGg6ODtzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbGluZWpvaW46YmV2ZWw7c3Ryb2tlLW1pdGVybGltaXQ6MztcIi8+XG4gIDwvc3ZnPmAsXG4gIC8vIHJpZ2h0OiBgPHN2ZyBjbGFzcz1cImotaWNvbi1hcnJvdyBqLWljb24tYXJyb3ctcmlnaHRcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgeG1sbnM6eGxpbms9XCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rXCIgc3R5bGU9XCJpc29sYXRpb246aXNvbGF0ZVwiIHdpZHRoPVwiNTBcIiBoZWlnaHQ9XCI4NFwiPjxwYXRoIGQ9XCJNIDQuMDAwMDAwMDAwMDAwMTI4IDgwIEwgNDYgNDEuNDk5ODk2MjA0MjY3NzcgTSA0IDMgTCA0NS45OTk5OTk5OTk5OTk4NDQgNDEuNDk5ODk2MjA0MjY3NzM1XCIgc3R5bGU9XCJmaWxsOm5vbmU7c3Ryb2tlOiMwMDAwMDA7c3Ryb2tlLXdpZHRoOjQ7c3Ryb2tlLWxpbmVjYXA6cm91bmQ7c3Ryb2tlLWxpbmVqb2luOmJldmVsO3N0cm9rZS1taXRlcmxpbWl0OjM7XCIvPjwvc3ZnPmAsXG4gIC8vIGxlZnQ6IGA8c3ZnIGNsYXNzPVwiai1pY29uLWFycm93IGotaWNvbi1hcnJvdy1sZWZ0XCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHhtbG5zOnhsaW5rPVwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGlua1wiIHN0eWxlPVwiaXNvbGF0aW9uOmlzb2xhdGVcIiB3aWR0aD1cIjQ5XCIgaGVpZ2h0PVwiODZcIj48cGF0aCBkPVwiTSA0NC45OTk5OTk5OTk5OTk4OSA4MiBMIDQuMDI0MTUzODgwNTYzMzA5NSA0Mi45ODc0MTgxMjI0NDczNSBNIDQ1IDQgTCA0IDQyLjk4NzQxODEyMjQ0NzI0NVwiIHN0eWxlPVwiZmlsbDpub25lO3N0cm9rZTojMDAwMDAwO3N0cm9rZS13aWR0aDo0O3N0cm9rZS1saW5lY2FwOnJvdW5kO3N0cm9rZS1saW5lam9pbjpiZXZlbDtzdHJva2UtbWl0ZXJsaW1pdDozO1wiLz48L3N2Zz5gLFxufVxuXG5leHBvcnQgY29uc3QgdXggPSB7XG4gIGFkZDogYDxzdmcgc3R5bGU9XCJpc29sYXRpb246aXNvbGF0ZVwiIHdpZHRoPVwiMjBcIiBoZWlnaHQ9XCIyMFwiPlxuICAgIDxwYXRoIGQ9XCIgTSAwIDAgTCAyMCAwIEwgMjAgMjAgTCAwIDIwIEwgMCAwIFogXCIgZmlsbD1cInJnYmEoMCwwLDAsMClcIiBzdHJva2Utd2lkdGg9XCIxXCIgc3Ryb2tlPVwicmdiYSgwLDAsMCwwKVwiIHN0cm9rZS1saW5lY2FwPVwiYnV0dFwiLz5cbiAgICA8cGF0aCBkPVwiIE0gMTEgNSBMIDkgNSBMIDkgOSBMIDUgOSBMIDUgMTEgTCA5IDExIEwgOSAxNSBMIDExIDE1IEwgMTEgMTEgTCAxNSAxMSBMIDE1IDkgTCAxMSA5IEwgMTEgNSBaICBNIDEwIDAgQyA0LjQ4IDAgMCA0LjQ4IDAgMTAgQyAwIDE1LjUyIDQuNDggMjAgMTAgMjAgQyAxNS41MiAyMCAyMCAxNS41MiAyMCAxMCBDIDIwIDQuNDggMTUuNTIgMCAxMCAwIFogIE0gMTAgMTggQyA1LjU5IDE4IDIgMTQuNDEgMiAxMCBDIDIgNS41OSA1LjU5IDIgMTAgMiBDIDE0LjQxIDIgMTggNS41OSAxOCAxMCBDIDE4IDE0LjQxIDE0LjQxIDE4IDEwIDE4IFogXCIgZmlsbC1ydWxlPVwiZXZlbm9kZFwiIGZpbGw9XCJyZ2IoMCwwLDApXCIgc3Ryb2tlLXdpZHRoPVwiMC41XCIgc3Ryb2tlPVwicmdiYSgwLDAsMCwwKVwiIHN0cm9rZS1saW5lY2FwPVwiYnV0dFwiLz5cbiAgPC9zdmc+YCxcbiAgcGx1czogYDxzdmcgZmlsbD1cIiMwMDAwMDBcIiBoZWlnaHQ9XCIyNFwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiB3aWR0aD1cIjI0XCI+XG4gICAgPHBhdGggZD1cIk0wIDBoMjR2MjRIMHpcIiBmaWxsPVwibm9uZVwiLz5cbiAgICA8cGF0aCBkPVwiTTEzIDdoLTJ2NEg3djJoNHY0aDJ2LTRoNHYtMmgtNFY3em0tMS01QzYuNDggMiAyIDYuNDggMiAxMnM0LjQ4IDEwIDEwIDEwIDEwLTQuNDggMTAtMTBTMTcuNTIgMiAxMiAyem0wIDE4Yy00LjQxIDAtOC0zLjU5LTgtOHMzLjU5LTggOC04IDggMy41OSA4IDgtMy41OSA4LTggOHpcIi8+XG4gIDwvc3ZnPmAsXG4gIGNoZWNrOiBgPHN2ZyBzdHlsZT1cImlzb2xhdGlvbjppc29sYXRlXCIgd2lkdGg9XCIyNFwiIGhlaWdodD1cIjE5XCI+XG4gICAgPHBhdGggZD1cIiBNIDAgMC4yNSBMIDI0IDAuMjUgTCAyNCAyNC4yNSBMIDAgMjQuMjUgTCAwIDAuMjUgWiBcIiBmaWxsPVwicmdiYSgwLDAsMCwwKVwiIHN0cm9rZS13aWR0aD1cIjFcIiBzdHJva2U9XCJyZ2JhKDAsMCwwLDApXCIgc3Ryb2tlLWxpbmVjYXA9XCJidXR0XCIvPlxuICAgIDxwYXRoIGQ9XCIgTSA3LjYyNzA2MDgzMDAxNzA1NSAxNC42ODU0NzQ3MDE1MzQ5NjQgTCAxLjkzNzQ2NDQ2ODQ0Nzk4MiA4Ljk5NTg3ODMzOTk2NTg4OCBMIDAgMTAuOTE5Njk4NjkyNDM4ODg1IEwgNy42MjcwNjA4MzAwMTcwNTUgMTguNTQ2NzU5NTIyNDU1OTQgTCAyNCAyLjE3MzgyMDM1MjQ3Mjk5NTggTCAyMi4wNzYxNzk2NDc1MjcwMDIgMC4yNSBMIDcuNjI3MDYwODMwMDE3MDU1IDE0LjY4NTQ3NDcwMTUzNDk2NCBaIFwiIGZpbGw9XCJyZ2IoMCwwLDApXCIgc3Ryb2tlLXdpZHRoPVwiMVwiIHN0cm9rZT1cInJnYmEoMCwwLDAsMClcIiBzdHJva2UtbGluZWNhcD1cImJ1dHRcIi8+XG4gIDwvc3ZnPmAsXG4gIGxpc3Q6IGA8c3ZnIGNsYXNzPVwiai1pY29uLWxpc3RcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgeG1sbnM6eGxpbms9XCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rXCIgc3R5bGU9XCJpc29sYXRpb246aXNvbGF0ZVwiIHdpZHRoPVwiMjRcIiBoZWlnaHQ9XCIxMy4zXCI+XG4gICAgPHBhdGggZD1cIiBNIDAgOCBMIDIuNiA4IEwgMi42IDUuMyBMIDAgNS4zIEwgMCA4IFogIE0gMCAxMy4zIEwgMi42IDEzLjMgTCAyLjYgMTAuNiBMIDAgMTAuNiBMIDAgMTMuMyBaICBNIDAgMi42IEwgMi42IDIuNiBMIDIuNiAwIEwgMCAwIEwgMCAyLjYgWiAgTSA1LjMgOCBMIDI0IDggTCAyNCA1LjMgTCA1LjMgNS4zIEwgNS4zIDggWiAgTSA1LjMgMTMuMyBMIDI0IDEzLjMgTCAyNCAxMC42IEwgNS4zIDEwLjYgTCA1LjMgMTMuMyBaICBNIDUuMyAwIEwgNS4zIDIuNiBMIDI0IDIuNiBMIDI0IDAgTCA1LjMgMCBaXCJcbiAgICAgZmlsbC1ydWxlPVwiZXZlbm9kZFwiIGZpbGw9XCJyZ2IoMCwwLDApXCIgc3Ryb2tlLXdpZHRoPVwiMS41XCIgc3Ryb2tlPVwicmdiYSgwLDAsMCwwKVwiIHN0cm9rZS1saW5lY2FwPVwiYnV0dFwiLz5cbiAgICA8cGF0aCBkPVwiIE0gMCAwIEwgMzYgMCBMIDM2IDM2IEwgMCAzNiBMIDAgMCBaIFwiIGZpbGw9XCJyZ2JhKDAsMCwwLDApXCIgc3Ryb2tlLXdpZHRoPVwiMS41XCIgc3Ryb2tlPVwicmdiYSgwLDAsMCwwKVwiIHN0cm9rZS1saW5lY2FwPVwiYnV0dFwiLz5cbiAgPC9zdmc+YCxcbiAgZWRpdDogYDxzdmcgY2xhc3M9XCJqLWljb24tZWRpdFwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB4bWxuczp4bGluaz1cImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmtcIiBzdHlsZT1cImlzb2xhdGlvbjppc29sYXRlXCIgd2lkdGg9XCIyNFwiIGhlaWdodD1cIjI0XCI+XG4gICAgPHBhdGggZD1cIiBNIC00LjQ0MDggMTkuMDAwNiBMIC00LjQ0MDggMjQgTCA0Ljk5OTMgMjQgTCAxOS43NDM5IDkuMjU1MyBMIDE0Ljc0NDYgNC4yNTYwIEwgLTQuNDQwOCAxOS4wMDA2IFogIE0gMjMuNjEgNS4zODkyIEMgMjQuMTI5OSA0Ljg2OTMgMjQuMTI5OSA0LjAyOTQgMjMuNjEgMy41MDk1IEwgMjAuNDkgMC4zODk5IEMgMTkuOTcwNSAtMC4xMjk5IDE5LjEzMDYgLTAuMTI5OSAxOC42MTA3IDAuMzg5OSBMIDE2LjE3MSAyLjgyOTYgTCAyMS4xNzAzIDcuODI4OSBMIDIzLjYxIDUuMzg5MiBaXCJcbiAgICAgIGZpbGwtcnVsZT1cImV2ZW5vZGRcIiBmaWxsPVwicmdiKDAsMCwwKVwiIHN0cm9rZS13aWR0aD1cIjEuNTBcIiBzdHJva2U9XCJyZ2JhKDAsMCwwLDApXCIgc3Ryb2tlLWxpbmVjYXA9XCJidXR0XCIvPlxuICAgIDxwYXRoIGQ9XCIgTSAwIDAgTCAzNSAwIEwgMzUgMzUgTCAwIDM1IEwgMCAwIFogXCIgZmlsbD1cInJnYmEoMCwwLDAsMClcIiBzdHJva2Utd2lkdGg9XCIxLjVcIiBzdHJva2U9XCJyZ2JhKDAsMCwwLDApXCIgc3Ryb2tlLWxpbmVjYXA9XCJidXR0XCIvPlxuICA8L3N2Zz5gLFxuICAvLyBlZGl0TGluZTogYDxzdmcgY2xhc3M9XCJqLWljb24tZWRpdC1saW5lXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHhtbG5zOnhsaW5rPVwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGlua1wiIHN0eWxlPVwiaXNvbGF0aW9uOmlzb2xhdGVcIiB3aWR0aD1cIjM2XCIgaGVpZ2h0PVwiMzZcIj48cGF0aCBkPVwiIE0gMjYuNjIgMTAuNTAgTCAyMSA0Ljg3IEwgNiAxOS44NyBMIDYgMjUuNTAgTCAxMS42MiAyNS41IEwgMjYuNiAxMC41IFogIE0gMzEuMDYgNi4wNiBDIDMxLjY1IDUuNDcgMzEuNjUgNC41MzM3NSAzMS4wNjUgMy45NCBMIDI3LjU1NSAwLjQzIEMgMjYuOTcgLTAuMTQgMjYuMDIyIC0wLjE0IDI1LjQ0IDAuNDMgTCAyMi41IDMuMzcgTCAyOC4xMjUgOSBMIDMxLjA2NSA2LjA2IFogXCIgZmlsbC1ydWxlPVwiZXZlbm9kZFwiIGZpbGw9XCJyZ2IoMCwwLDApXCIgc3Ryb2tlLXdpZHRoPVwiMS41XCIgc3Ryb2tlPVwicmdiYSgwLDAsMCwwKVwiIHN0cm9rZS1saW5lY2FwPVwiYnV0dFwiLz48cGF0aCBkPVwiIE0gMCAwIEwgMzYgMCBMIDM2IDM2IEwgMCAzNiBMIDAgMC4wMDM3NDk5OTk5OTk5OTk5MiBaIFwiIGZpbGw9XCJyZ2JhKDAsMCwwLDApXCIgc3Ryb2tlLXdpZHRoPVwiMS41XCIgc3Ryb2tlPVwicmdiYSgwLDAsMCwwKVwiIHN0cm9rZS1saW5lY2FwPVwiYnV0dFwiLz48cGF0aCBkPVwiIE0gMCAzMCBMIDM2IDMwIEwgMzYgMzYgTCAwIDM2IEwgMCAzMCBaIFwiIGZpbGw9XCJyZ2IoMCwwLDApXCIgZmlsbC1vcGFjaXR5PVwiMC40XCIgc3Ryb2tlLXdpZHRoPVwiMS41XCIgc3Ryb2tlPVwicmdiYSgwLDAsMCwwKVwiIHN0cm9rZS1saW5lY2FwPVwiYnV0dFwiLz48L3N2Zz5gLFxufVxuLy8ganNjczplbmFibGUgbWF4aW11bUxpbmVMZW5ndGhcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3N2Zy1pY29ucy5qc1xuICoqLyIsImV4cG9ydCB7Q3VzdG9tRXZlbnR9O1xuXG5mdW5jdGlvbiBDdXN0b21FdmVudChldmVudCwgcGFyYW1zID0geyBidWJibGVzOiBmYWxzZSwgY2FuY2VsYWJsZTogZmFsc2UsIGRldGFpbDogdW5kZWZpbmVkIH0pIHtcbiAgdmFyIGV2dCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdDdXN0b21FdmVudCcpO1xuICBldnQuaW5pdEN1c3RvbUV2ZW50KGV2ZW50LCBwYXJhbXMuYnViYmxlcywgcGFyYW1zLmNhbmNlbGFibGUsIHBhcmFtcy5kZXRhaWwpO1xuICByZXR1cm4gZXZ0O1xufVxuXG5pZiAod2luZG93ICYmIHR5cGVvZiB3aW5kb3cuQ3VzdG9tRXZlbnQgIT09ICdmdW5jdGlvbicpIHtcbiAgd2luZG93LkN1c3RvbUV2ZW50ID0gQ3VzdG9tRXZlbnQ7XG4gIEN1c3RvbUV2ZW50LnByb3RvdHlwZSA9IHdpbmRvdy5FdmVudC5wcm90b3R5cGU7XG59XG5cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2N1c3RvbS1ldmVudC5qc1xuICoqLyIsImltcG9ydCB7IGNyZWF0ZUVsZW0sIGNsb3Nlc3QsIHJlbW92ZUFsbCwgcmVtb3ZlTm9kZSwgdG9Cb29sIH0gZnJvbSAnLi91dGlsJ1xuXG5leHBvcnQgZnVuY3Rpb24gRmllbGRFZGl0b3IoeyBrZXksIG5vZGUsIHBhcmVudCwgcGF0aCwgZWxlbSwgdHlwZSA9ICdzdHJpbmcnLCBkZXB0aCA9IDAgfSkge1xuXG4gIGNvbnN0IGZvcm0gPSBjcmVhdGVFbGVtKGA8c2VjdGlvbiBjbGFzcz1cImotZWRpdCBqLXNpZGUgdGV4dC1sZWZ0XCIga2V5PVwiJHtrZXl9XCIgdHlwZT1cIiR7dHlwZX1cIiBkZXB0aD1cIiR7ZGVwdGh9XCIgcGF0aD1cIiR7QXJyYXkuaXNBcnJheShwYXRoKSA/IHBhdGguam9pbignOjonKSA6IHBhdGh9XCI+XG4gICAgPGZvcm0gY2xhc3M9XCJmaWVsZC1lZGl0b3JcIj5cbiAgICAgIDxmaWVsZHNldD5cbiAgICAgICAgPGxhYmVsPk5hbWU8L2xhYmVsPlxuICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwibmFtZVwiIGNsYXNzPVwibmFtZVwiIHZhbHVlPVwiJHtrZXl9XCIgLz5cbiAgICAgIDwvZmllbGRzZXQ+XG4gICAgICA8ZmllbGRzZXQ+XG4gICAgICAgIDxsYWJlbD5UeXBlPC9sYWJlbD5cbiAgICAgICAgPHNlbGVjdCByb3dzPVwiMVwiIG5hbWU9XCJ0eXBlXCI+XG4gICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cInN0cmluZ1wiPnRleHQ8L29wdGlvbj5cbiAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiYm9vbGVhblwiPnllcy9ubzwvb3B0aW9uPlxuICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJudW1iZXJcIj5udW1iZXI8L29wdGlvbj5cbiAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwib2JqZWN0XCI+b2JqZWN0L2hhc2gvbWFwL2tleS12YWw8L29wdGlvbj5cbiAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiYXJyYXlcIj5saXN0PC9vcHRpb24+XG4gICAgICAgIDwvc2VsZWN0PlxuICAgICAgPC9maWVsZHNldD5cbiAgICAgIDxmaWVsZHNldD5cbiAgICAgICAgPGxhYmVsPlZhbHVlPC9sYWJlbD5cbiAgICAgICAgPGRpdiBjbGFzcz1cInZhbHVlRWRpdG9yUGxhY2Vob2xkZXJcIj48L2Rpdj5cbiAgICAgIDwvZmllbGRzZXQ+XG4gICAgICA8ZmllbGRzZXQ+XG4gICAgICAgIDxidXR0b24gdHlwZT1cInN1Ym1pdFwiPlNhdmU8L2J1dHRvbj5cbiAgICAgICAgPGJ1dHRvbiB0eXBlPVwicmVzZXRcIj5DYW5jZWw8L2J1dHRvbj5cbiAgICAgICAgPHN0cm9uZz48L3N0cm9uZz5cbiAgICAgIDwvZmllbGRzZXQ+XG4gICAgPC9mb3JtPlxuICA8L3NlY3Rpb24+YClcblxuICB2YXIgdmFsdWUgICAgICAgICA9IG5vZGVba2V5XVxuICBjb25zdCBwcmV2VmFscyAgICA9IHt9XG4gIGNvbnN0IGdldFZhbHVlICAgID0gKCkgPT4gZ2V0VmFsdWVGbGQoKS52YWx1ZVxuICBjb25zdCBnZXRWYWx1ZUZsZCA9ICgpID0+IGZvcm0ucXVlcnlTZWxlY3RvcignLmZpZWxkLXZhbHVlJykgfHwgeyB2YWx1ZTogZmFsc2UgfVxuICBjb25zdCBmbGROYW1lICAgICA9IGZvcm0ucXVlcnlTZWxlY3RvcignaW5wdXRbbmFtZT1cIm5hbWVcIl0nKVxuICBjb25zdCBmbGRUeXBlICAgICA9IGZvcm0ucXVlcnlTZWxlY3Rvcignc2VsZWN0W25hbWU9XCJ0eXBlXCJdJylcbiAgY29uc3QgcGxhY2Vob2xkZXIgPSBmb3JtLnF1ZXJ5U2VsZWN0b3IoJy52YWx1ZUVkaXRvclBsYWNlaG9sZGVyJylcbiAgLy8gaW5pdGlhbGl6ZSB2YWx1ZSB0cmFja2VyIChmb3IgbG9jYWwgJ3R5cGUnIGNoYW5nZXMpXG4gIHByZXZWYWxzW3R5cGVdICAgID0gdmFsdWVcblxuICAvLyBzZXQgdmFsdWUgdy8gZGVmYXVsdFxuICBmbGRUeXBlLnZhbHVlICAgICA9IHR5cGVcblxuICAvLyBkZWZpbmUgaGVscGVycywgZS5nLiBidWlsZCBmaWVsZCwgdHJhbnNpdGlvbiBzdGF0ZSAoYWthIGNvbnZlcnQpXG4gIGNvbnN0IGJhc2ljVHlwZXMgPSBbJ3N0cmluZycsICdudW1iZXInLCAnYm9vbGVhbiddXG5cbiAgY29uc3QgZ2V0VmFsdWVGaWVsZEVsZW0gPSAoX3ZhbHVlID0gZ2V0VmFsdWUoKSwgcmVuZGVyQXJyYXlzID0gdHJ1ZSkgPT4ge1xuICAgIGNvbnNvbGUudHJhY2UoJyAgIFxcdEdlbkZpZWxkKCcsIGtleSwgJywgJywgX3ZhbHVlLCAnKScpXG5cbiAgICBpZiAoZmxkVHlwZS52YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHJldHVybiBjcmVhdGVFbGVtKGA8aW5wdXQgdHlwZT0ndGV4dCcganMtdHlwZT0nJHtmbGRUeXBlLnZhbHVlfScgY2xhc3M9J2ZpZWxkLXZhbHVlJyBuYW1lPSdmaWVsZC12YWx1ZScgdmFsdWU9JyR7X3ZhbHVlfScgLz5gKVxuICAgIH0gZWxzZSBpZiAoZmxkVHlwZS52YWx1ZSA9PT0gJ251bWJlcicpIHtcbiAgICAgIHJldHVybiBjcmVhdGVFbGVtKGA8aW5wdXQgdHlwZT0nbnVtYmVyJyBqcy10eXBlPScke2ZsZFR5cGUudmFsdWV9JyBjbGFzcz0nZmllbGQtdmFsdWUnIG5hbWU9J2ZpZWxkLXZhbHVlJyB2YWx1ZT0nJHtfdmFsdWV9JyAvPmApXG4gICAgfSBlbHNlIGlmIChmbGRUeXBlLnZhbHVlID09PSAnYm9vbGVhbicpIHtcbiAgICAgIHJldHVybiBjcmVhdGVFbGVtKGA8aW5wdXQgdHlwZT0nY2hlY2tib3gnIGpzLXR5cGU9JyR7ZmxkVHlwZS52YWx1ZX0nIGNsYXNzPSdmaWVsZC12YWx1ZScgbmFtZT0nZmllbGQtdmFsdWUnIHZhbHVlPSdjaGVja2VkJyR7X3ZhbHVlID8gJyBjaGVja2VkJyA6ICcnfScgLz5gKVxuICAgIH0gZWxzZSBpZiAoZmxkVHlwZS52YWx1ZSA9PT0gJ2FycmF5JyAmJiByZW5kZXJBcnJheXMpIHtcbiAgICAgIHJldHVybiBfdmFsdWUucmVkdWNlKChlbGVtLCB2YWwsIGlkeCkgPT4ge1xuICAgICAgICBsZXQgbGkgPSBjcmVhdGVFbGVtKGA8bGkgaWR4PVwiJHtpZHh9XCI+JHt0eXBlb2YgdmFsID09PSAnc3RyaW5nJyA/IHZhbCsnOiAnIDogJyd9PC9saT5gKVxuICAgICAgICAvLyBzZWUgaWYgdHlwZSBvZiBhcnJheSBpdGVtcyBpcyBzaW1wbGUgZW5vdWdoIHRvIHNob3cgdmFsdWUvaW5wdXQgZmllbGRcbiAgICAgICAgaWYgKGJhc2ljVHlwZXMuaW5kZXhPZih0eXBlb2YgdmFsKSA8PSAtMSkge1xuICAgICAgICAgIGxpLmFwcGVuZENoaWxkKGNyZWF0ZUVsZW0oYDx0ZXh0YXJlYSBqcy10eXBlPScke2ZsZFR5cGUudmFsdWV9JyBwYXRoPScke2lkeH0nIGNsYXNzPSdmaWVsZC12YWx1ZSBqc29uLXZhbHVlJyByb3dzPSc3Jz4ke0pTT04uc3RyaW5naWZ5KHZhbCwgbnVsbCwgMil9PC90ZXh0YXJlYT5gKSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBsaS5hcHBlbmRDaGlsZChnZXRWYWx1ZUZpZWxkRWxlbSh2YWwsIGZhbHNlKSlcbiAgICAgICAgfVxuICAgICAgICBlbGVtLmFwcGVuZENoaWxkKGxpKVxuICAgICAgICByZXR1cm4gZWxlbVxuICAgICAgfSwgZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKSlcbiAgICAgIC8vIHJldHVybiBjcmVhdGVFbGVtKGA8aW5wdXQgdHlwZT0nY2hlY2tib3gnIGpzLXR5cGU9JyR7ZmxkVHlwZS52YWx1ZX0nIGNsYXNzPSdmaWVsZC12YWx1ZScgbmFtZT0nZmllbGQtdmFsdWUnIHZhbHVlPSdjaGVja2VkJyR7X3ZhbHVlID8gJyBjaGVja2VkJyA6ICcnfScgLz5gKVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gY3JlYXRlRWxlbShgPHNwYW4gY2xhc3M9XCJoYXMtZXJyb3JcIj48aW5wdXQgdHlwZT0ndGV4dCcganMtdHlwZT0nJHtmbGRUeXBlLnZhbHVlfScgY2xhc3M9J2ZpZWxkLXZhbHVlJyBuYW1lPSdmaWVsZC12YWx1ZScgdmFsdWU9JyR7X3ZhbHVlfScgLz48L3NwYW4+YClcbiAgICB9XG4gIH1cblxuICBjb25zdCBjb252ZXJ0ID0gKHsgdmFsdWUsIHR5cGUgfSkgPT4ge1xuICAgIGNvbnN0IGpzb25QYXR0ZXJuID0gL15cXHMqKFxce3xcXFspLiooXFxdfFxcfSlcXHMqJC9nO1xuICAgIGNvbnN0IGlzSnNvbiA9IHMgPT4ganNvblBhdHRlcm4udGVzdChzKVxuICAgIGNvbnN0IGN1cnJUeXBlID0gQXJyYXkuaXNBcnJheSh2YWx1ZSkgPyAnYXJyYXknIDogdHlwZW9mIHZhbHVlXG4gICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICBjYXNlICdzdHJpbmcnOlxuICAgICAgICBzd2l0Y2ggKGN1cnJUeXBlKSB7XG4gICAgICAgICAgY2FzZSAnc3RyaW5nJzogIHJldHVybiB2YWx1ZVxuICAgICAgICAgIGNhc2UgJ2Jvb2xlYW4nOiByZXR1cm4gdmFsdWVcbiAgICAgICAgICBjYXNlICdhcnJheSc6ICAgcmV0dXJuIHR5cGVvZiB2YWx1ZVswXSA9PT0gJ3N0cmluZycgPyB2YWx1ZS5qb2luKCdcXHQnKSA6IEpTT04uc3RyaW5naWZ5KHZhbHVlKVxuICAgICAgICAgIGNhc2UgJ29iamVjdCc6ICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodmFsdWUpXG4gICAgICAgICAgZGVmYXVsdDogICAgICAgIHJldHVybiB2YWx1ZVxuICAgICAgICB9XG4gICAgICBjYXNlICdudW1iZXInOlxuICAgICAgICBzd2l0Y2ggKGN1cnJUeXBlKSB7XG4gICAgICAgICAgY2FzZSAnc3RyaW5nJzogcmV0dXJuIHBhcnNlRmxvYXQodmFsdWUpXG4gICAgICAgICAgY2FzZSAnYm9vbGVhbic6IHJldHVybiB2YWx1ZSA/IDEgOiAwXG4gICAgICAgICAgY2FzZSAnYXJyYXknOiByZXR1cm4gLTFcbiAgICAgICAgICBjYXNlICdvYmplY3QnOiByZXR1cm4gLTFcbiAgICAgICAgICBkZWZhdWx0OiAgICAgICByZXR1cm4gLTk5XG4gICAgICAgIH1cbiAgICAgIGNhc2UgJ2Jvb2xlYW4nOlxuICAgICAgICByZXR1cm4gdG9Cb29sKHZhbHVlKVxuICAgICAgY2FzZSAnYXJyYXknOlxuICAgICAgICBzd2l0Y2ggKGN1cnJUeXBlKSB7XG4gICAgICAgICAgY2FzZSAnc3RyaW5nJzogcmV0dXJuIGlzSnNvbih2YWx1ZSkgPyBKU09OLnBhcnNlKHZhbHVlKSA6IHZhbHVlLnNwbGl0KC9cXHMrLylcbiAgICAgICAgICBjYXNlICdib29sZWFuJzogcmV0dXJuIFt2YWx1ZV1cbiAgICAgICAgICBjYXNlICdhcnJheSc6IHJldHVybiB2YWx1ZVxuICAgICAgICAgIGNhc2UgJ29iamVjdCc6IHJldHVybiBbdmFsdWVdXG4gICAgICAgICAgZGVmYXVsdDogICAgICAgcmV0dXJuIFtdXG4gICAgICAgIH1cbiAgICAgIGNhc2UgJ29iamVjdCc6XG4gICAgICAgIHN3aXRjaCAoY3VyclR5cGUpIHtcbiAgICAgICAgICBjYXNlICdzdHJpbmcnOiByZXR1cm4gaXNKc29uKHZhbHVlKSA/IEpTT04ucGFyc2UodmFsdWUpIDoge3ZhbHVlfVxuICAgICAgICAgIGNhc2UgJ2Jvb2xlYW4nOiByZXR1cm4ge3ZhbHVlfVxuICAgICAgICAgIGNhc2UgJ2FycmF5JzogcmV0dXJuIHt2YWx1ZX1cbiAgICAgICAgICBjYXNlICdvYmplY3QnOiByZXR1cm4gdmFsdWVcbiAgICAgICAgICBkZWZhdWx0OiAgICAgICByZXR1cm4ge31cbiAgICAgICAgfVxuICAgIH1cbiAgICBjb25zb2xlLmVycm9yKCdGYWlsZWQgdG8gTWF0Y2ggVHlwZTogJywgdHlwZSwgY3VyclR5cGUsIHZhbHVlKTtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cblxuICBjb25zdCB1cGRhdGVWYWx1ZUZpZWxkID0gKHYpID0+IHtcbiAgICBjb25zdCBuZXdUeXBlID0gZmxkVHlwZS52YWx1ZVxuICAgIGNvbnN0IG5ld1ZhbCAgPSBjb252ZXJ0KHsgdmFsdWU6IHYgfHwgZ2V0VmFsdWUoKSwgdHlwZTogbmV3VHlwZSB9KVxuICAgIGNvbnN0IG5ld0ZsZCAgPSBnZXRWYWx1ZUZpZWxkRWxlbShuZXdWYWwpXG4gICAgcmVtb3ZlQWxsKHBsYWNlaG9sZGVyLmNoaWxkcmVuKVxuICAgIGNvbnNvbGUuZXJyb3IoJ1Nob3VsZCBiZSBlbXB0eTogcGxhY2Vob2xkZXIuY2hpbGRyZW4nLCBwbGFjZWhvbGRlci5jaGlsZHJlbiwgJ1xcbiBhbmQgdGhlIG1haW4gb2JqOiAnLCBwbGFjZWhvbGRlcilcbiAgICBwbGFjZWhvbGRlci5hcHBlbmRDaGlsZChuZXdGbGQpXG4gICAgcmV0dXJuIG5ld0ZsZFxuICB9XG5cbiAgLy8gZGVmaW5lIGV2ZW50cywgb25UeXBlQ2hhbmdlZCwgb25TYXZlLCBvbkNhbmNlbFxuICBjb25zdCBvblR5cGVDaGFuZ2VkID0gKHsgdGFyZ2V0IH0pID0+IHtcbiAgICBjb25zb2xlLndhcm4oJ1R5cGUgQ2hhbmdlZCEhJywgYXJndW1lbnRzKVxuICAgIGNvbnN0IG5ld1R5cGUgPSBmbGRUeXBlLnZhbHVlXG4gICAgY29uc3Qgb2xkVmFsICA9IGdldFZhbHVlKClcbiAgICB1cGRhdGVWYWx1ZUZpZWxkKClcbiAgfVxuXG4gIGNvbnN0IGdldEN1cnJlbnRWYWx1ZSA9ICgpID0+IHtcbiAgICBsZXQgZmllbGRzICA9IHBsYWNlaG9sZGVyLnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0LCB0ZXh0YXJlYScpXG4gICAgbGV0IHJlc3VsdHMgPSBBcnJheS5mcm9tKGZpZWxkcykubWFwKGYgPT4ge1xuICAgICAgdmFyIHYgPSBmLnZhbHVlO1xuICAgICAgbGV0IGpzVHlwZSA9IGYuZ2V0QXR0cmlidXRlKCdqcy10eXBlJylcbiAgICAgIHRyeSB7XG4gICAgICAgIGlmIChmLmNsYXNzTGlzdC5jb250YWlucygnanNvbi12YWx1ZScpKSB7XG4gICAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UodilcbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZSkgeyBjb25zb2xlLmVycm9yKCdGQUlMRUQgVE8gQ09OVkVSVCBKU09OOicsIGUpIH1cbiAgICAgIHJldHVybiBjb252ZXJ0KHt2YWx1ZTogdiwgdHlwZToganNUeXBlfSlcbiAgICB9KVxuXG4gICAgcmV0dXJuIHR5cGUgIT09ICdhcnJheScgPyByZXN1bHRzWzBdIDogcmVzdWx0c1xuICB9XG5cbiAgY29uc3Qgb25TYXZlID0gKGUpID0+IHtcbiAgICBjb25zdCB7IHRhcmdldCwgZGV0YWlsLCBwcmV2ZW50RGVmYXVsdCB9ID0gZTtcbiAgICBjb25zdCBvbGROYW1lID0ga2V5LFxuICAgICAgICAgIG5ld05hbWUgPSBmbGROYW1lLnZhbHVlLFxuICAgICAgICAgIG9sZFR5cGUgPSB0eXBlLFxuICAgICAgICAgIG5ld1R5cGUgPSBmbGRUeXBlLnZhbHVlLFxuICAgICAgICAgIG9sZFZhbHVlID0gdmFsdWUsXG4gICAgICAgICAgbmV3VmFsdWUgPSBnZXRWYWx1ZSgpXG4gICAgY29uc3QgbmFtZUNoYW5nZWQgID0gb2xkTmFtZSAgIT09IG5ld05hbWUsXG4gICAgICAgICAgdHlwZUNoYW5nZWQgID0gb2xkVHlwZSAgIT09IG5ld1R5cGUsXG4gICAgICAgICAgdmFsdWVDaGFuZ2VkID0gb2xkVmFsdWUgIT09IG5ld1ZhbHVlXG4gICAgY29uc3QgY2hhbmdlZCA9IG5hbWVDaGFuZ2VkIHx8IHR5cGVDaGFuZ2VkIHx8IHZhbHVlQ2hhbmdlZFxuXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpXG5cbiAgICBpZiAoY2hhbmdlZCkge1xuICAgICAgY29uc29sZS53YXJuKGBDSEFOR0VEISBQQVRIPSR7cGF0aH0gVmFsdWU9YCwgZ2V0Q3VycmVudFZhbHVlKCkpXG4gICAgICBjb25zb2xlLndhcm4oYFNhdmluZyBjaGFuZ2VzLi4uICgke29sZE5hbWV9OiR7b2xkVmFsdWV9ID0+ICR7bmV3TmFtZX06JHtuZXdWYWx1ZX0pIG5hbWVDaGFuZ2VkPSR7bmFtZUNoYW5nZWR9IHR5cGVDaGFuZ2VkPSR7dHlwZUNoYW5nZWR9IHZhbHVlQ2hhbmdlZD0ke3ZhbHVlQ2hhbmdlZH0gXFxuQXJncz1cXG5gLCBhcmd1bWVudHMpXG4gICAgICBpZiAobmFtZUNoYW5nZWQpIHtcbiAgICAgICAgbm9kZVtuZXdOYW1lXSA9IG5ld1ZhbHVlXG4gICAgICAgIGRlbGV0ZSBub2RlW29sZE5hbWVdXG4gICAgICB9IGVsc2UgaWYgKHZhbHVlQ2hhbmdlZCkge1xuICAgICAgICBub2RlW25ld05hbWVdID0gbmV3VmFsdWVcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS53YXJuKGBOb3RoaW5nIGNoYW5nZWRgKVxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IG9uQ2FuY2VsID0gKHsgdGFyZ2V0IH0pID0+IHtcbiAgICBjb25zb2xlLndhcm4oJ0NhbmNlbGxlZCEhJywgYXJndW1lbnRzKVxuICB9XG5cbiAgY29uc3Qgc2V0dXAgPSAoKSA9PiB7XG4gICAgLy8gU2V0dXAgZXZlbnRzXG4gICAgZm9ybS5xdWVyeVNlbGVjdG9yKCdidXR0b25bdHlwZT1cInN1Ym1pdFwiXScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb25TYXZlKVxuICAgIGZvcm0ucXVlcnlTZWxlY3RvcignYnV0dG9uW3R5cGU9XCJyZXNldFwiXScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb25DYW5jZWwpXG4gICAgZmxkVHlwZS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBvblR5cGVDaGFuZ2VkKVxuICB9XG5cbiAgY29uc3QgZGVzdHJveSA9ICgpID0+IHtcbiAgICBmb3JtLnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvblt0eXBlPVwic3VibWl0XCJdJykucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBvblNhdmUpXG4gICAgZm9ybS5xdWVyeVNlbGVjdG9yKCdidXR0b25bdHlwZT1cInJlc2V0XCJdJykucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBvbkNhbmNlbClcbiAgICBmbGRUeXBlLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIG9uVHlwZUNoYW5nZWQpXG4gICAgcmVtb3ZlTm9kZShmb3JtKVxuICB9XG5cbiAgc2V0dXAoKVxuXG4gIC8vIGluaXQgVUlcbiAgdXBkYXRlVmFsdWVGaWVsZCh2YWx1ZSlcblxuICByZXR1cm4gT2JqZWN0LmFzc2lnbihmb3JtLCB7IGRlc3Ryb3kgfSlcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2ZpZWxkLWVkaXRvci5qc1xuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=