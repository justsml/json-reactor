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
	  var elem = _ref.elem;
	  var _ref$parent = _ref.parent;
	  var parent = _ref$parent === undefined ? null : _ref$parent;
	  var _ref$path = _ref.path;
	  var path = _ref$path === undefined ? [] : _ref$path;
	  var _ref$type = _ref.type;
	  var type = _ref$type === undefined ? 'string' : _ref$type;
	  var _ref$depth = _ref.depth;
	  var depth = _ref$depth === undefined ? 0 : _ref$depth;
	
	
	  var getArrayButtons = function getArrayButtons(_ref2) {
	    var _ref2$idx = _ref2.idx;
	    var idx = _ref2$idx === undefined ? -1 : _ref2$idx;
	    return (0, _util.createElem)('<div class="j-array-buttons">\n    <button action="add" idx="' + idx + '">+</button>\n    <button action="remove" idx="' + idx + '">-</button>\n  </div>');
	  };
	  var form = (0, _util.createElem)('<section class="j-edit j-side text-left" key="' + key + '" type="' + type + '" depth="' + depth + '" path="' + (Array.isArray(path) ? path.join('::') : path) + '">\n    <form class="field-editor">\n      <fieldset>\n        <label>Name</label>\n        <input type="text" name="name" class="name" value="' + key + '" />\n      </fieldset>\n      <fieldset>\n        <label>Type</label>\n        <select rows="1" name="type">\n          <option value="string">text</option>\n          <option value="boolean">yes/no</option>\n          <option value="number">number</option>\n          <option value="object">object/hash/map/key-val</option>\n          <option value="array">list</option>\n        </select>\n      </fieldset>\n      <fieldset>\n        <label>Value</label>\n        <div class="valueEditorPlaceholder"></div>\n        <!-- Array buttons go here -->\n      </fieldset>\n      <fieldset>\n        <button type="submit">Save</button>\n        <button type="reset">Cancel</button>\n        <strong></strong>\n      </fieldset>\n    </form>\n  </section>');
	
	  var value = node[key];
	  var prevVals = {};
	  var getValue = function getValue() {
	    return getValueFld().value;
	  };
	  var getValueFld = function getValueFld() {
	    return form.querySelector('.field-value') || { value: false };
	  };
	  var getType = function getType() {
	    return fldType.value;
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
	
	  var getTypeName = function getTypeName(x) {
	    return Array.isArray(x) ? 'array' : typeof x === 'undefined' ? 'undefined' : _typeof(x);
	  };
	
	  var getValueFieldElem = function getValueFieldElem() {
	    var _value = arguments.length <= 0 || arguments[0] === undefined ? getValue() : arguments[0];
	
	    var renderArrays = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];
	
	    var typeName = getTypeName(_value);
	    console.trace('   \tGenField(', key, ', ', _value, ')', typeName);
	
	    if (typeName === 'string') {
	      return (0, _util.createElem)('<input type=\'text\' js-type=\'' + typeName + '\' class=\'field-value\' name=\'field-value\' value=\'' + _value + '\' />');
	    } else if (typeName === 'number') {
	      return (0, _util.createElem)('<input type=\'number\' js-type=\'' + typeName + '\' class=\'field-value\' name=\'field-value\' value=\'' + _value + '\' />');
	    } else if (typeName === 'boolean') {
	      return (0, _util.createElem)('<input type=\'checkbox\' js-type=\'' + typeName + '\' class=\'field-value\' name=\'field-value\' value=\'checked\'' + (_value ? ' checked' : '') + '\' />');
	    } else if (typeName === 'array' && renderArrays) {
	      return _value.reduce(function (elem, val, idx) {
	        var li = (0, _util.createElem)('<li idx="' + idx + '">' + (typeof val === 'string' ? val + ': ' : '') + '</li>');
	        // see if type of array items is simple enough to show value/input field
	        if (basicTypes.indexOf(typeof val === 'undefined' ? 'undefined' : _typeof(val)) <= -1) {
	          li.appendChild((0, _util.createElem)('<textarea js-type=\'' + typeName + '\' path=\'' + idx + '\' class=\'field-value json-value\' rows=\'7\'>' + JSON.stringify(val, null, 2) + '</textarea>'));
	        } else {
	          li.appendChild(getValueFieldElem(val, false));
	        }
	        elem.appendChild(li);
	        return elem;
	      }, document.createElement('ul'));
	      // return createElem(`<input type='checkbox' js-type='${typeName}' class='field-value' name='field-value' value='checked'${_value ? ' checked' : ''}' />`)
	    } else {
	      return (0, _util.createElem)('<span class="has-error"><input type=\'text\' js-type=\'' + typeName + '\' class=\'field-value\' name=\'field-value\' value=\'' + JSON.stringify(_value, null, 2) + '\' /></span>');
	    }
	  };
	
	  var convert = function convert(_ref3) {
	    var value = _ref3.value;
	    var type = _ref3.type;
	
	    var jsonPattern = /^\s*(\{|\[).*(\]|\})\s*$/g;
	    var isJson = function isJson(s) {
	      return jsonPattern.test(s);
	    };
	    var currType = getTypeName(value);
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
	    var newVal = convert({ value: v || getCurrentValue(), type: newType });
	    var newFld = getValueFieldElem(newVal);
	    (0, _util.removeAll)(placeholder.children);
	    // console.error('updateValueField Value:', getValue())
	    console.error('updateValueField', getValue(), getCurrentValue());
	    placeholder.appendChild(newFld);
	    return newFld;
	  };
	
	  // define events, onTypeChanged, onSave, onCancel
	  var onTypeChanged = function onTypeChanged(_ref4) {
	    var target = _ref4.target;
	
	    console.warn('Type Changed!!', _arguments);
	    var newType = fldType.value;
	    var oldVal = getCurrentValue();
	    updateValueField();
	  };
	
	  var getCurrentValue = function getCurrentValue() {
	    var fields = placeholder.querySelectorAll('input, textarea');
	
	    var results = Array.from(fields).map(function (f, i, a) {
	      var v = f.value;
	      var jsType = f.getAttribute('js-type');
	      try {
	        if (f.classList.contains('json-value')) {
	          return JSON.parse(v);
	        }
	      } catch (e) {
	        console.error('FAILED TO CONVERT JSON:', e);
	      }
	      console.warn('getCurrentValue:', jsType, v);
	      v = convert({ value: v, type: jsType });
	      console.warn('V:', v);
	      return v;
	    });
	
	    return type !== 'array' ? results[0] : results;
	  };
	
	  var onSave = function onSave(e) {
	    // const { target, detail, preventDefault } = e;
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
	        node[key] = getCurrentValue();
	      }
	    } else {
	      console.warn('Nothing changed');
	    }
	  };
	
	  var onCancel = function onCancel(_ref5) {
	    var target = _ref5.target;
	
	    console.warn('Cancelled!!', _arguments);
	  };
	
	  var setup = function setup() {
	    // Setup events
	    form.querySelector('button[type="submit"]').addEventListener('click', onSave);
	    form.querySelector('button[type="reset"]').addEventListener('click', onCancel);
	    fldType.addEventListener('change', onTypeChanged);
	    placeholder.parentNode.appendChild(getArrayButtons({ index: -1 }));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBkNDZkMTI0MmJiMzllMTE2MTkwMyIsIndlYnBhY2s6Ly8vLi9pbmRleC5qcz80YzA4Iiwid2VicGFjazovLy8uL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9rZXktbGlzdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29uZmlnLmpzIiwid2VicGFjazovLy8uL3NyYy91dGlsLmpzIiwid2VicGFjazovLy8uL3NyYy9zdHlsZS5sZXNzIiwid2VicGFjazovLy8uL34vY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N2Zy1pY29ucy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY3VzdG9tLWV2ZW50LmpzIiwid2VicGFjazovLy8uL3NyYy9maWVsZC1lZGl0b3IuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7O0FDdENBLDRHQUFrSixFOzs7Ozs7Ozs7Ozs7U0NJbEksTSxHQUFBLE07O0FBSmhCOztBQUNBOztBQUNBOztBQUVPLFVBQVMsTUFBVCxDQUFnQixJQUFoQixFQUFzQixNQUF0QixFQUE4QjtBQUNuQyxPQUFJLENBQUMsSUFBTCxFQUFhO0FBQUUsV0FBTSxJQUFJLEtBQUosQ0FBVSwrQ0FBVixDQUFOO0FBQWtFO0FBQ2pGLE9BQUksQ0FBQyxNQUFMLEVBQWE7QUFBRSxXQUFNLElB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RUFBRSxnQkFBRixFQUFwQixDQUFQO0FBQ0QsRSIsImZpbGUiOiJqc29uLWVkaXRvci5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJKc29uRWRpdG9yXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcIkpzb25FZGl0b3JcIl0gPSBmYWN0b3J5KCk7XG59KSh0aGlzLCBmdW5jdGlvbigpIHtcbnJldHVybiBcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb25cbiAqKi8iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIGQ0NmQxMjQyYmIzOWUxMTYxOTAzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBnbG9iYWxbXCJKc29uRWRpdG9yXCJdID0gcmVxdWlyZShcIi0hL1VzZXJzL2RsZXZ5L2NvZGUvb3NzL2pzb24tZWRpdG9yL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvaW5kZXguanM/e1xcXCJwcmVzZXRzXFxcIjpbXFxcImVzMjAxNVxcXCJdfSEvVXNlcnMvZGxldnkvY29kZS9vc3MvanNvbi1lZGl0b3IvaW5kZXguanNcIik7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL2luZGV4LmpzXG4gKiogbW9kdWxlIGlkID0gMFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiaW1wb3J0IHtLZXlMaXN0fSAgICAgIGZyb20gJy4vc3JjL2tleS1saXN0J1xuaW1wb3J0IHtGaWVsZEVkaXRvcn0gIGZyb20gJy4vc3JjL2ZpZWxkLWVkaXRvcidcbmltcG9ydCB7U3R5bGVzfSAgICAgICBmcm9tICcuL3NyYy91dGlsJ1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlKGVsZW0sIGNvbmZpZykge1xuICBpZiAoIWVsZW0pICAgeyB0aHJvdyBuZXcgRXJyb3IoJ0pzb25FZGl0b3IgaW5zdGFuY2UgcmVxdWlyZXMgMXN0IHBhcmFtIGBlbGVtYCcpIH1cbiAgaWYgKCFjb25maWcpIHsgdGhyb3cgbmV3IEVycm9yKCdKc29uRWRpdG9yIGluc3RhbmNlIHJlcXVpcmVzIDJuZCBwYXJhbSBgY29uZmlnYCcpIH1cbiAgXG4gIFN0eWxlcy5hZGQoKVxuXG4gIGNvbnN0IGRlc3Ryb3kgPSAoKSA9PiB7XG4gICAgY29uc3QgY3VyckZvcm0gPSBlbGVtLnF1ZXJ5U2VsZWN0b3IoJ3NlY3Rpb24uai1lZGl0JylcbiAgICBpZiAoY3VyckZvcm0gJiYgdHlwZW9mIGN1cnJGb3JtLmRlc3Ryb3kgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGN1cnJGb3JtLmRlc3Ryb3koKVxuICAgIH1cbiAgICBpZiAoa2V5TGlzdCAmJiB0eXBlb2Yga2V5TGlzdC5kZXN0cm95ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBrZXlMaXN0LmRlc3Ryb3koKVxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IF9oYW5kbGVTZWxlY3QgPSAoe3RhcmdldCwgZGV0YWlsfSkgPT4ge1xuICAgIGNvbnNvbGUud2FybignU0VMRUNUJywgZGV0YWlsLCB0YXJnZXQpXG4gICAgY29uc3QgY3VyckZvcm0gPSBlbGVtLnF1ZXJ5U2VsZWN0b3IoJ3NlY3Rpb24uai1lZGl0JylcbiAgICBjb25zdCBvcHRzID0ge1xuICAgICAgZGVwdGg6ICB0YXJnZXQuZGVwdGggfHwgbnVsbCxcbiAgICAgIGVsZW06ICAgdGFyZ2V0LCBcbiAgICAgIGtleTogICAgdGFyZ2V0LmtleSwgXG4gICAgICBub2RlOiAgIHRhcmdldC5ub2RlLCBcbiAgICAgIHBhcmVudDogdGFyZ2V0LnBhcmVudCwgXG4gICAgICBwYXRoOiAgIHRhcmdldC5wYXRoLCBcbiAgICAgIHR5cGU6ICAgdGFyZ2V0LnR5cGUgfHwgJ3N0cmluZycsIFxuICAgIH1cbiAgICBjb25zdCBlZGl0b3IgPSBGaWVsZEVkaXRvcihvcHRzKVxuICAgIGlmIChjdXJyRm9ybSAmJiBjdXJyRm9ybS5wYXJlbnROb2RlKSB7XG4gICAgICBjdXJyRm9ybS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGN1cnJGb3JtKVxuICAgIH1cbiAgICBlbGVtLmFwcGVuZENoaWxkKGVkaXRvcilcbiAgfVxuICBjb25zdCB0cmVlU2VjdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NlY3Rpb24nKVxuICBjb25zdCBrZXlMaXN0ID0gS2V5TGlzdCh7ZGF0YTogY29uZmlnfSlcbiAga2V5TGlzdC5hZGRFdmVudExpc3RlbmVyKCdzZWxlY3RlZCcsIF9oYW5kbGVTZWxlY3QpXG4gIHRyZWVTZWN0aW9uLmFwcGVuZENoaWxkKGtleUxpc3QpXG4gIHRyZWVTZWN0aW9uLmNsYXNzTGlzdC5hZGQoJ2otc2lkZScpXG4gIGVsZW0uYXBwZW5kQ2hpbGQodHJlZVNlY3Rpb24pXG4gIGVsZW0uY2xhc3NMaXN0LmFkZCgnanNvbi1lZGl0b3InKVxuICByZXR1cm4ge2Rlc3Ryb3l9O1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9pbmRleC5qc1xuICoqLyIsImltcG9ydCB7IGNvbmZpZyB9ICAgICAgICAgICAgICAgICAgICAgICAgIGZyb20gJy4vY29uZmlnJ1xuaW1wb3J0IHsgY3JlYXRlRWxlbSwgY2xvc2VzdCxcbiAgICAgICAgICByZW1vdmVBbGwsIHJlbW92ZU5vZGUgfSBmcm9tICcuL3V0aWwnXG5pbXBvcnQgeyBhcnJvd3MsIHV4IH0gICAgICAgICAgICAgICAgICAgICBmcm9tICcuL3N2Zy1pY29ucydcbmltcG9ydCB7IEN1c3RvbUV2ZW50IGFzIF9DdXN0b21FdmVudCB9ICAgIGZyb20gJy4vY3VzdG9tLWV2ZW50J1xuLy8gX0N1c3RvbUV2ZW50IHNob3VsZCBhdXRvLWF0dGFjaCB0aGUgb2JqZWN0IHRvIHRoZSB3aW5kb3cuLi4gaWYgbm90IG1ha2UgaW5pdCBmdW5jdGlvblxuXG5leHBvcnQgZnVuY3Rpb24gS2V5TGlzdCh7IGRhdGEsIHBhcmVudCwgcGF0aCA9IFtdLCBkZXB0aCA9IDAgfSkge1xuICBjb25zdCBsaXN0ID0gY3JlYXRlRWxlbSgnPHVsIGNsYXNzPVwiai1rZXlzXCIgZGVwdGg9XCInICsgZGVwdGggKyAnXCI+PC91bD4nKVxuICBPYmplY3RcbiAgICAua2V5cyhkYXRhKVxuICAgIC5mb3JFYWNoKChrZXksIGlkeCwgYXJyKSA9PiB7XG4gICAgICBjb25zdCB2YWx1ZVR5cGUgICA9IEFycmF5LmlzQXJyYXkoZGF0YVtrZXldKSA/ICdhcnJheScgOiB0eXBlb2YgZGF0YVtrZXldXG4gICAgICBjb25zdCBpY29uICAgICAgICA9ICAgICAgICAgICAgdmFsdWVUeXBlID09PSAnb2JqZWN0JyA/XG4gICAgICAgICAgICAgICAgICAgICAgYXJyb3dzLmRvd24gIDogdmFsdWVUeXBlID09PSAnYXJyYXknID9cbiAgICAgICAgICAgICAgICAgICAgICB1eC5saXN0ICAgICAgOiB2YWx1ZVR5cGUgPT09ICdzdHJpbmcnID9cbiAgICAgICAgICAgICAgICAgICAgICB1eC5lZGl0ICAgICAgOiB1eC5lZGl0XG4gICAgICBjb25zdCBleHBhbmRhYmxlICA9IHZhbHVlVHlwZSA9PT0gJ29iamVjdCcgPyAnai1leHBhbmRhYmxlJyA6ICcnXG4gICAgICBsZXQgcm93UGF0aCA9IFtdLnNsaWNlLmNhbGwocGF0aCkucHVzaChrZXkgKyAodmFsdWVUeXBlID09PSAnYXJyYXknID8gJ1snIDogdmFsdWVUeXBlID09PSAnb2JqZWN0JyA/ICcuJyA6ICcnKSlcbiAgICAgIGNvbnN0IHJvdyA9IGNyZWF0ZUVsZW0oWyc8bGkgZGVwdGg9XCInLCBkZXB0aCArIDEsICdcIiBjbGFzcz1cImotY2xvc2VkICcsIGV4cGFuZGFibGUsICcgai10eXBlLScsIHZhbHVlVHlwZSwgJ1wiIGtleT1cIicsIGtleSwgJ1wiPicsIGljb24sICcgJywga2V5LCAnPC9saT4nXS5qb2luKCcnKSlcbiAgICAgIE9iamVjdC5hc3NpZ24ocm93LCB7IG5vZGU6IGRhdGEsIGtleToga2V5LCB0eXBlOiB2YWx1ZVR5cGUsIHBhdGg6IHJvd1BhdGgsIHZhbHVlOiBkYXRhW2tleV0gfSlcbiAgICAgIC8vIGNvbnNvbGUud2Fybigncm93Jywgcm93LCB2YWx1ZVR5cGUsIGljb24pXG4gICAgICBsaXN0LmFwcGVuZENoaWxkKHJvdylcbiAgICB9KVxuICBjb25zdCBfY2xpY2tIYW5kbGVyID0gKGUpID0+IHtcbiAgICBjb25zdCB7IHByZXZlbnREZWZhdWx0LCB0YXJnZXQgfSA9IGVcbiAgICBjb25zdCBsaSA9IGNsb3Nlc3QodGFyZ2V0LCAnbGknLCAyKVxuICAgIGlmIChsaSkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICBjb25zdCB7IG5vZGUsIGtleSwgdHlwZSwgcGF0aCwgdmFsdWUgfSA9IGxpXG4gICAgICBjb25zdCBuZXh0RGF0YSAgPSBub2RlW2tleV1cbiAgICAgIGNvbnN0IGlzT2JqZWN0ID0gbGkuY2xhc3NMaXN0LmNvbnRhaW5zKCdqLXR5cGUtb2JqZWN0JylcbiAgICAgIGNvbnN0IGlzQXJyYXkgID0gbGkuY2xhc3NMaXN0LmNvbnRhaW5zKCdqLXR5cGUtYXJyYXknKVxuICAgICAgY29uc29sZS53YXJuKCdDQU5DRUxMRUQgY2xpY2sgZm9yICVzJywga2V5LCAnaXNPYmplY3Q9JywgaXNPYmplY3QsICdpc0FycmF5PScsIGlzQXJyYXksICdlbGVtPScsIGxpKVxuICAgICAgaWYgKGlzT2JqZWN0KSB7XG4gICAgICAgIGlmICghbGkucXVlcnlTZWxlY3RvcigndWwnKSkge1xuICAgICAgICAgIC8vIGRvIHJlY3Vyc2lvbiwgb24gZGVtYW5kXG4gICAgICAgICAgbGkuYXBwZW5kQ2hpbGQoS2V5TGlzdCh7IGRhdGE6IG5leHREYXRhLCBwYXJlbnQ6IGxpLCBkZXB0aDogZGVwdGggKyAxIH0pKVxuICAgICAgICB9XG5cbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiBsaS5jbGFzc0xpc3QudG9nZ2xlKCdqLWNsb3NlZCcpLCAzMzMpXG4gICAgICAgIHJldHVybiBudWxsXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBldmVudE5vZGVTZWxlY3RlZCA9IG5ldyBDdXN0b21FdmVudCgnc2VsZWN0ZWQnLCB7XG4gICAgICAgICAgYnViYmxlczogdHJ1ZSwgY2FuY2VsYWJsZTogZmFsc2UsXG4gICAgICAgICAgZGV0YWlsOiB7IGtleToga2V5LCBkYXRhOiBuZXh0RGF0YSwgZWxlbWVudDogbGksIGRlcHRoOiBkZXB0aCArIDEsIGlzT2JqZWN0LCBpc0FycmF5IH0sXG4gICAgICAgIH0pXG4gICAgICAgIGxpLmRpc3BhdGNoRXZlbnQoZXZlbnROb2RlU2VsZWN0ZWQpXG4gICAgICAgIGNvbnNvbGUud2FybignRmlyZWQgQ3VzdG9tIEV2ZW50OiAnLCBldmVudE5vZGVTZWxlY3RlZClcbiAgICAgIH1cblxuICAgICAgY29uc29sZS5pbmZvKCdfY2xpY2tlZC50b2dnbGVkJywga2V5LCBsaSlcbiAgICB9XG4gIH1cblxuICBjb25zdCBkZXN0cm95ID0gKCkgPT4ge1xuICAgIGxpc3QucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBfY2xpY2tIYW5kbGVyKVxuICAgIHJlbW92ZU5vZGUobGlzdC5wYXJlbnROb2RlID8gbGlzdC5wYXJlbnROb2RlIDogbGlzdClcbiAgfVxuXG4gIGlmICghcGFyZW50KSB7XG4gICAgLy8gYWRkIG9ubHkgYXQgdG9wIG9mIHRyZWUsIG1heWJlIG1vdmUgb3V0IG9mIGhlcmUgdXAgYSAnbGF5ZXInXG4gICAgbGlzdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIF9jbGlja0hhbmRsZXIpXG4gIH1cblxuICByZXR1cm4gT2JqZWN0LmFzc2lnbihsaXN0LCB7IGRlc3Ryb3kgfSlcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2tleS1saXN0LmpzXG4gKiovIiwiZXhwb3J0IGNvbnN0IGNvbmZpZyA9IHtcbiAgZGVidWc6IGZhbHNlLFxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvY29uZmlnLmpzXG4gKiovIiwiLy8ganNjczpkaXNhYmxlIHNhZmVDb250ZXh0S2V5d29yZFxuXG4vKipcbiAqIFV0aWxpdHkgYXJyYXlpZnkgbWV0aG9kXG4gKiBBZGQgdG8gLnByb3RvdHlwZSBvZiBJdGVyYXRvcnMsIEFycmF5QnVmZmVyLCBBcmd1bWVudHMsIE5vZGVMaXN0LCBTZXQvV2Vha1NldCwgd2hhdGV2ZXIgI1lPTE9cbiAqXG4gKiAuLi4gT3IganVzdCB1c2UgYXMgdXRpbCwgYXMgbmVlZGVkLCAjSnVzdERvSXRcbiAqXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0b0FycmF5KGxpc3QpIHtcbiAgbGlzdCA9IEFycmF5LmlzQXJyYXkobGlzdCkgPyBsaXN0IDogdGhpc1xuICBsaXN0ID0gIWxpc3QgPyBbXSA6IGxpc3RcbiAgcmV0dXJuIEFycmF5LmZyb20gJiYgQXJyYXkuZnJvbShsaXN0KSB8fCBbJ3VwZ3JhZGUgeW91ciBicm93c2VyLCBwZmZ0J11cbn1cblxuLyoqXG4gKiBHZXQgYEFycmF5LnNvcnRgIGZ1bmN0aW9uIGZvciBrZXkgbmFtZSBjb21wYXJpc29ucyAoc3VwcG9ydHMgcmV2ZXJzZSlcbiAqXG4gKiBXaGVuIG5hbWUgPT09ICdlbWFpbCAgIC0tLSBTb3J0IGVtYWlsIGFzY2VuZGluZy5cbiAqXG4gKiBXaGVuIG5hbWUgPT09ICctZW1haWwgIC0tLSBTb3J0IGVtYWlsIGRlc2NlbmRpbmdcbiAqXG4gKiBAcmV0dXJucyBbZnVuY3Rpb25dIGNvbXBhcmVyIHVzZWQgaW4gYEFycmF5LnNvcnQoKWBcbiAqXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRTb3J0ZXIoa2V5KSB7XG4gIGNvbnN0IF9lbmdsaXNoU29ydCAgICAgICAgID0gKGEsIGIpID0+IChhW2tleV0gPCBiW2tleV0gPyAtMSA6IChhW2tleV0gPiBiW2tleV0gPyAxIDogMCkpXG4gIGNvbnN0IF9lbmdsaXNoU29ydFJldmVyc2VkID0gKGEsIGIpID0+IChhW2tleV0gPj0gYltrZXldID8gLTEgOiAoYVtrZXldIDwgYltrZXldID8gMSA6IDApKVxuXG4gIGlmIChrZXlbMF0gPT09ICctJykge1xuICAgIGtleSA9IGtleS5zdWJzdHIoMSk7XG4gICAgcmV0dXJuIF9lbmdsaXNoU29ydFJldmVyc2VkO1xuICB9XG5cbiAgcmV0dXJuIF9lbmdsaXNoU29ydDtcbn1cblxuLyoqXG4gKlxuICovXG5leHBvcnQgY29uc3QgU3R5bGVzID0ge1xuICBhZGQ6ICgpID0+IHtcbiAgICBsZXQgY3NzID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcignc3R5bGUjanNvbi1lZGl0b3InKVxuICAgIGlmICghY3NzKSB7XG4gICAgICBjb25zdCBzdHlsZXMgID0gcmVxdWlyZSgnIWNzcyFsZXNzIS4vc3R5bGUubGVzcycpXG4gICAgICBjc3MgICAgICAgICAgID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKVxuICAgICAgY3NzLmlkICAgICAgICA9ICdqc29uLWVkaXRvcidcbiAgICAgIGNzcy5pbm5lckhUTUwgPSBzdHlsZXNcbiAgICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoY3NzKVxuICAgIH1cbiAgfSxcblxuICByZW1vdmU6ICgpID0+IHtcbiAgICBsZXQgY3NzID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcignc3R5bGUjanNvbi1lZGl0b3InKVxuICAgIGlmIChjc3MgJiYgY3NzLnBhcmVudE5vZGUpIHsgY3NzLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoY3NzKSB9XG4gIH0sXG59XG5cbi8qKlxuICogQWNjZXB0cyBlbGVtZW50cyBmcm9tIGBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsYFxuICpcbiAqIFJlbW92ZXMgYWxsIGNoaWxkcmVuIG9mIEBub2RlXG4gKlxuICovXG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlQWxsKG5vZGUpIHtcbiAgaWYgKHRoaXMgaW5zdGFuY2VvZiBOb2RlTGlzdCkgeyBub2RlID0gdGhpczsgfVxuXG4gIHRvQXJyYXkobm9kZSlcbiAgICAuZm9yRWFjaChlbCA9PiBlbC5wYXJlbnROb2RlICYmIGVsLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZWwpKVxuICByZXR1cm4gbm9kZVxufVxuXG4vKipcbiAqIEFjY2VwdHMgRWxlbWVudCAvIE5vZGUgaXNoIG9iamVjdHMgKGkuZS4gZnJvbSBgZG9jdW1lbnQucXVlcnlTZWxlY3RvcmApXG4gKlxuICogT25seSByZW1vdmVzIEBub2RlICoqaWYgaXQgaGFzIGEgdmFsaWQgYHBhcmVudE5vZGVgIGNvbnRleHQqKlxuICpcbiAqIEFsdGVybmF0ZSB1c2FnZSwgcHJvdG90eXBlIG9mIE5vZGU6XG4gKiBgTm9kZS5wcm90b3R5cGUucmVtb3ZlTm9kZSA9IHJlbW92ZU5vZGU7YFxuICpcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZU5vZGUobm9kZSkge1xuICBpZiAodGhpcyBpbnN0YW5jZW9mIE5vZGUpIHsgbm9kZSA9IHRoaXM7IH1cblxuICBpZiAobm9kZS5wYXJlbnROb2RlICYmIG5vZGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCkge1xuICAgIG5vZGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChub2RlKVxuICB9XG5cbiAgcmV0dXJuIG5vZGVcbn1cblxuLyoqXG4gKiBUb3RlcyBvYnZpXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRJZCh7IGlkLCBfaWQsIGtleSB9KSB7IHJldHVybiBpZCB8fCBfaWQgfHwga2V5OyB9XG5cbi8qKlxuICpcbiAqL1xuZXhwb3J0IGNvbnN0IGNsb3Nlc3QgPSAoZWxlbSwgc2VsZWN0b3IsIGxpbWl0ID0gbnVsbCkgPT4ge1xuICBpZiAobGltaXQgIT09IG51bGwgJiYgbGltaXQgPD0gMCkgeyByZXR1cm4gZmFsc2UgfVxuXG4gIHJldHVybiAhZWxlbSA/IG51bGxcbiAgICAgICAgIDogZWxlbS5tYXRjaGVzICYmIGVsZW0ubWF0Y2hlcyhzZWxlY3RvcilcbiAgICAgICAgID8gZWxlbSA6IGVsZW0uY2xhc3NMaXN0ICYmIGVsZW0uY2xhc3NMaXN0LmNvbnRhaW5zKHNlbGVjdG9yKVxuICAgICAgICAgPyBlbGVtIDogY2xvc2VzdChlbGVtLnBhcmVudE5vZGUsIHNlbGVjdG9yLCAobGltaXQgIT09IG51bGwgPyBsaW1pdCAtIDEgOiBsaW1pdCkpXG59XG5cbi8qKlxuICogdG9Cb29sIGNvbnZlcnRzIGFueXRoaW5nIHRvIGEgYm9vbGVhbiAtIHNlZSBjb2RlIGZvciBkZXRhaWxzXG4gKi9cbmV4cG9ydCBjb25zdCB0b0Jvb2wgPSAoc3RyKSA9PiB7XG4gIGlmICh0eXBlb2Ygc3RyID09PSAnYm9vbGVhbicpIHtcbiAgICByZXR1cm4gc3RyXG4gIH1cblxuICBpZiAodHlwZW9mIHN0ciA9PT0gJ3N0cmluZycpIHtcbiAgICBzdHIgPSAoc3RyLmxlbmd0aCA+PSAxID8gc3RyLnRvVXBwZXJDYXNlKClbMF0gOiBzdHIpXG4gICAgcmV0dXJuIFsnWScsICcxJywgJ1QnXS5pbmRleE9mKHN0cikgPT09IDBcbiAgfVxuXG4gIHJldHVybiBzdHIgPyB0cnVlIDogZmFsc2Vcbn1cblxuLyoqXG4gKiBXYXJuaW5nOiBQcml2YXRlL2xvY2FsIHVzZSBvbmx5LiBEbyBub3QgaG9pc3QuXG4gKiAqKiogVW5zYWZlIEhUTUwvc3RyaW5nIGhhbmRsaW5nICoqKlxuICovXG5leHBvcnQgY29uc3QgY3JlYXRlRWxlbSA9IGh0bWwgPT4ge1xuICAvLyBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KClcbiAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgZGl2LmlubmVySFRNTCA9IGh0bWwgLy8gUG90ZW50aWFsIFNlY3VyaXR5IEV4cGxvaXQgVmVjdG9yISEhISEhXG4gIHJldHVybiBkaXYuY2hpbGRyZW4ubGVuZ3RoID09PSAxID8gZGl2LmNoaWxkcmVuWzBdIDogZGl2XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy91dGlsLmpzXG4gKiovIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKCk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIudW5zZWxlY3RhYmxlIHtcXG4gIHVzZXItc2VsZWN0OiBub25lO1xcbiAgLW1vei11c2VyLXNlbGVjdDogbm9uZTtcXG4gIC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7XFxuICAtbXMtdXNlci1zZWxlY3Q6IG5vbmU7XFxufVxcbi5qLXhzLTEsXFxuLmoteHMtMixcXG4uai14cy0zLFxcbi5qLXhzLTQsXFxuLmoteHMtNSxcXG4uai14cy02LFxcbi5qLXhzLTcsXFxuLmoteHMtOCxcXG4uai14cy05LFxcbi5qLXhzLTEwLFxcbi5qLXhzLTExLFxcbi5qLXhzLTEyIHtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxufVxcbi5qLXhzLTEge1xcbiAgd2lkdGg6IDguMzMzMyU7XFxufVxcbi5qLXhzLTIge1xcbiAgd2lkdGg6IDE2LjY2NjYlO1xcbn1cXG4uai14cy0zIHtcXG4gIHdpZHRoOiAyNC45OTk5JTtcXG59XFxuLmoteHMtNCB7XFxuICB3aWR0aDogMzMuMzMzMiU7XFxufVxcbi5qLXhzLTUge1xcbiAgd2lkdGg6IDQxLjY2NjUlO1xcbn1cXG4uai14cy02IHtcXG4gIHdpZHRoOiA0OS45OTk4JTtcXG59XFxuLmoteHMtNyB7XFxuICB3aWR0aDogNTguMzMzMSU7XFxufVxcbi5qLXhzLTgge1xcbiAgd2lkdGg6IDY2LjY2NjQlO1xcbn1cXG4uai14cy05IHtcXG4gIHdpZHRoOiA3NC45OTk3JTtcXG59XFxuLmoteHMtMTAge1xcbiAgd2lkdGg6IDgzLjMzMzElO1xcbn1cXG4uai14cy0xMSB7XFxuICB3aWR0aDogOTEuNjY2MyU7XFxufVxcbi5qLXhzLTEyIHtcXG4gIHdpZHRoOiA5OS45OTk2JTtcXG59XFxudWwuai1rZXlzIHtcXG4gIHdpZHRoOiAyNTBweDtcXG4gIGxpc3Qtc3R5bGU6IG5vbmU7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICB1c2VyLXNlbGVjdDogbm9uZTtcXG4gIC1tb3otdXNlci1zZWxlY3Q6IG5vbmU7XFxuICAtd2Via2l0LXVzZXItc2VsZWN0OiBub25lO1xcbiAgLW1zLXVzZXItc2VsZWN0OiBub25lO1xcbn1cXG51bC5qLWtleXMgbGkge1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICBtaW4td2lkdGg6IDI1MHB4O1xcbiAgbWluLWhlaWdodDogMjJweDtcXG4gIHRleHQtYWxpZ246IGxlZnQ7XFxuICBwYWRkaW5nLWxlZnQ6IDEwcHg7XFxuICBtYXJnaW4tbGVmdDogLTMwcHg7XFxufVxcbnVsLmota2V5cyAuai1pY29uLWVkaXQsXFxudWwuai1rZXlzIC5qLWljb24tbGlzdCxcXG51bC5qLWtleXMgLmotaWNvbi1hcnJvdy1kb3duIHtcXG4gIHpvb206IDQwJTtcXG59XFxudWwuai1rZXlzIGxpOm5vdCguai1jbG9zZWQpID4gLmotaWNvbi1hcnJvdy1kb3duIHtcXG4gIHRyYW5zZm9ybTogcm90YXRlKC05MGRlZykgIWltcG9ydGFudDtcXG59XFxudWwuai1rZXlzIC5qLWNsb3NlZCA+IHVsIHtcXG4gIGRpc3BsYXk6IG5vbmU7XFxufVxcbnVsLmota2V5cyAuai1jbG9zZWQ6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6ICcgJyAhaW1wb3J0YW50O1xcbn1cXG51bC5qLWtleXMgLmotY2xvc2VkID4gLmotaWNvbi1hcnJvdy1kb3duIHtcXG4gIHRyYW5zZm9ybTogcm90YXRlKDBkZWcpICFpbXBvcnRhbnQ7XFxufVxcbnVsLmota2V5cyAuai1pY29uLXBsdXM6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6ICcgJztcXG59XFxudWwuai1rZXlzIC5qLWljb24tbGlzdDpiZWZvcmUge1xcbiAgY29udGVudDogJyAnO1xcbn1cXG51bC5qLWtleXMgLmotaWNvbi10ZXh0OmJlZm9yZSB7XFxuICBjb250ZW50OiAnXFxcXDIxMzkgICAnICFpbXBvcnRhbnQ7XFxufVxcbnVsLmota2V5cyAuai1pY29uLWRlZmF1bHQ6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6ICdcXFxcMUY1MjQgICBcXFxcRkUwRicgIWltcG9ydGFudDtcXG59XFxuLmZpZWxkLWVkaXRvciBmaWVsZHNldCB7XFxuICBtYXgtd2lkdGg6IDI3NXB4O1xcbn1cXG5cIiwgXCJcIl0pO1xuXG4vLyBleHBvcnRzXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9jc3MtbG9hZGVyIS4vfi9sZXNzLWxvYWRlciEuL3NyYy9zdHlsZS5sZXNzXG4gKiogbW9kdWxlIGlkID0gNVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLypcclxuXHRNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxyXG5cdEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcclxuKi9cclxuLy8gY3NzIGJhc2UgY29kZSwgaW5qZWN0ZWQgYnkgdGhlIGNzcy1sb2FkZXJcclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcclxuXHR2YXIgbGlzdCA9IFtdO1xyXG5cclxuXHQvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXHJcblx0bGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xyXG5cdFx0dmFyIHJlc3VsdCA9IFtdO1xyXG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0dmFyIGl0ZW0gPSB0aGlzW2ldO1xyXG5cdFx0XHRpZihpdGVtWzJdKSB7XHJcblx0XHRcdFx0cmVzdWx0LnB1c2goXCJAbWVkaWEgXCIgKyBpdGVtWzJdICsgXCJ7XCIgKyBpdGVtWzFdICsgXCJ9XCIpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHJlc3VsdC5wdXNoKGl0ZW1bMV0pO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gcmVzdWx0LmpvaW4oXCJcIik7XHJcblx0fTtcclxuXHJcblx0Ly8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcclxuXHRsaXN0LmkgPSBmdW5jdGlvbihtb2R1bGVzLCBtZWRpYVF1ZXJ5KSB7XHJcblx0XHRpZih0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIilcclxuXHRcdFx0bW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgXCJcIl1dO1xyXG5cdFx0dmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcclxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciBpZCA9IHRoaXNbaV1bMF07XHJcblx0XHRcdGlmKHR5cGVvZiBpZCA9PT0gXCJudW1iZXJcIilcclxuXHRcdFx0XHRhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XHJcblx0XHR9XHJcblx0XHRmb3IoaSA9IDA7IGkgPCBtb2R1bGVzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciBpdGVtID0gbW9kdWxlc1tpXTtcclxuXHRcdFx0Ly8gc2tpcCBhbHJlYWR5IGltcG9ydGVkIG1vZHVsZVxyXG5cdFx0XHQvLyB0aGlzIGltcGxlbWVudGF0aW9uIGlzIG5vdCAxMDAlIHBlcmZlY3QgZm9yIHdlaXJkIG1lZGlhIHF1ZXJ5IGNvbWJpbmF0aW9uc1xyXG5cdFx0XHQvLyAgd2hlbiBhIG1vZHVsZSBpcyBpbXBvcnRlZCBtdWx0aXBsZSB0aW1lcyB3aXRoIGRpZmZlcmVudCBtZWRpYSBxdWVyaWVzLlxyXG5cdFx0XHQvLyAgSSBob3BlIHRoaXMgd2lsbCBuZXZlciBvY2N1ciAoSGV5IHRoaXMgd2F5IHdlIGhhdmUgc21hbGxlciBidW5kbGVzKVxyXG5cdFx0XHRpZih0eXBlb2YgaXRlbVswXSAhPT0gXCJudW1iZXJcIiB8fCAhYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xyXG5cdFx0XHRcdGlmKG1lZGlhUXVlcnkgJiYgIWl0ZW1bMl0pIHtcclxuXHRcdFx0XHRcdGl0ZW1bMl0gPSBtZWRpYVF1ZXJ5O1xyXG5cdFx0XHRcdH0gZWxzZSBpZihtZWRpYVF1ZXJ5KSB7XHJcblx0XHRcdFx0XHRpdGVtWzJdID0gXCIoXCIgKyBpdGVtWzJdICsgXCIpIGFuZCAoXCIgKyBtZWRpYVF1ZXJ5ICsgXCIpXCI7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGxpc3QucHVzaChpdGVtKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH07XHJcblx0cmV0dXJuIGxpc3Q7XHJcbn07XHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXG4gKiogbW9kdWxlIGlkID0gNlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLy8ganNjczpkaXNhYmxlIG1heGltdW1MaW5lTGVuZ3RoLCByZXF1aXJlUGFkZGluZ05ld0xpbmVzQmVmb3JlTGluZUNvbW1lbnRzXG5leHBvcnQgY29uc3QgYXJyb3dzID0ge1xuICAvLyB1cDogYDxzdmcgY2xhc3M9XCJqLWljb24tYXJyb3cgai1pY29uLWFycm93LXVwXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHhtbG5zOnhsaW5rPVwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGlua1wiIHN0eWxlPVwiaXNvbGF0aW9uOmlzb2xhdGVcIiB3aWR0aD1cIjg1XCIgaGVpZ2h0PVwiNDlcIj48cGF0aCBkPVwiTSA4MiA0NC45OTk5OTk5OTk5OTk5IEwgNDIuOTg3NDE4MTIyNDQ3MzggNC4wMjQxNTM4ODA1NjMzMDkgTSA0IDQ1IEwgNDIuOTg3NDE4MTIyNDQ3MjcgNFwiIHN0eWxlPVwiZmlsbDpub25lO3N0cm9rZTojMDAwMDAwO3N0cm9rZS13aWR0aDo0O3N0cm9rZS1saW5lY2FwOnJvdW5kO3N0cm9rZS1saW5lam9pbjpiZXZlbDtzdHJva2UtbWl0ZXJsaW1pdDozO1wiLz48L3N2Zz5gLFxuICBkb3duOiBgPHN2ZyBjbGFzcz1cImotaWNvbi1hcnJvdyBqLWljb24tYXJyb3ctZG93blwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB4bWxuczp4bGluaz1cImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmtcIiBzdHlsZT1cImlzb2xhdGlvbjppc29sYXRlXCIgd2lkdGg9XCIzM1wiIGhlaWdodD1cIjIyXCI+XG4gICAgPHBhdGggZD1cIk0gMjggNCBMIDE1Ljk5NjEyODY1MzA2MDc0IDE2Ljk5MjM0MTQ1MjUwNDMxIE0gNCA0IEwgMTUuOTk2MTI4NjUzMDYwNjgzIDE3XCIgc3R5bGU9XCJmaWxsOm5vbmU7c3Ryb2tlOiMwMDAwMDA7c3Ryb2tlLXdpZHRoOjg7c3Ryb2tlLWxpbmVjYXA6cm91bmQ7c3Ryb2tlLWxpbmVqb2luOmJldmVsO3N0cm9rZS1taXRlcmxpbWl0OjM7XCIvPlxuICA8L3N2Zz5gLFxuICAvLyByaWdodDogYDxzdmcgY2xhc3M9XCJqLWljb24tYXJyb3cgai1pY29uLWFycm93LXJpZ2h0XCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHhtbG5zOnhsaW5rPVwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGlua1wiIHN0eWxlPVwiaXNvbGF0aW9uOmlzb2xhdGVcIiB3aWR0aD1cIjUwXCIgaGVpZ2h0PVwiODRcIj48cGF0aCBkPVwiTSA0LjAwMDAwMDAwMDAwMDEyOCA4MCBMIDQ2IDQxLjQ5OTg5NjIwNDI2Nzc3IE0gNCAzIEwgNDUuOTk5OTk5OTk5OTk5ODQ0IDQxLjQ5OTg5NjIwNDI2NzczNVwiIHN0eWxlPVwiZmlsbDpub25lO3N0cm9rZTojMDAwMDAwO3N0cm9rZS13aWR0aDo0O3N0cm9rZS1saW5lY2FwOnJvdW5kO3N0cm9rZS1saW5lam9pbjpiZXZlbDtzdHJva2UtbWl0ZXJsaW1pdDozO1wiLz48L3N2Zz5gLFxuICAvLyBsZWZ0OiBgPHN2ZyBjbGFzcz1cImotaWNvbi1hcnJvdyBqLWljb24tYXJyb3ctbGVmdFwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB4bWxuczp4bGluaz1cImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmtcIiBzdHlsZT1cImlzb2xhdGlvbjppc29sYXRlXCIgd2lkdGg9XCI0OVwiIGhlaWdodD1cIjg2XCI+PHBhdGggZD1cIk0gNDQuOTk5OTk5OTk5OTk5ODkgODIgTCA0LjAyNDE1Mzg4MDU2MzMwOTUgNDIuOTg3NDE4MTIyNDQ3MzUgTSA0NSA0IEwgNCA0Mi45ODc0MTgxMjI0NDcyNDVcIiBzdHlsZT1cImZpbGw6bm9uZTtzdHJva2U6IzAwMDAwMDtzdHJva2Utd2lkdGg6NDtzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbGluZWpvaW46YmV2ZWw7c3Ryb2tlLW1pdGVybGltaXQ6MztcIi8+PC9zdmc+YCxcbn1cblxuZXhwb3J0IGNvbnN0IHV4ID0ge1xuICBhZGQ6IGA8c3ZnIHN0eWxlPVwiaXNvbGF0aW9uOmlzb2xhdGVcIiB3aWR0aD1cIjIwXCIgaGVpZ2h0PVwiMjBcIj5cbiAgICA8cGF0aCBkPVwiIE0gMCAwIEwgMjAgMCBMIDIwIDIwIEwgMCAyMCBMIDAgMCBaIFwiIGZpbGw9XCJyZ2JhKDAsMCwwLDApXCIgc3Ryb2tlLXdpZHRoPVwiMVwiIHN0cm9rZT1cInJnYmEoMCwwLDAsMClcIiBzdHJva2UtbGluZWNhcD1cImJ1dHRcIi8+XG4gICAgPHBhdGggZD1cIiBNIDExIDUgTCA5IDUgTCA5IDkgTCA1IDkgTCA1IDExIEwgOSAxMSBMIDkgMTUgTCAxMSAxNSBMIDExIDExIEwgMTUgMTEgTCAxNSA5IEwgMTEgOSBMIDExIDUgWiAgTSAxMCAwIEMgNC40OCAwIDAgNC40OCAwIDEwIEMgMCAxNS41MiA0LjQ4IDIwIDEwIDIwIEMgMTUuNTIgMjAgMjAgMTUuNTIgMjAgMTAgQyAyMCA0LjQ4IDE1LjUyIDAgMTAgMCBaICBNIDEwIDE4IEMgNS41OSAxOCAyIDE0LjQxIDIgMTAgQyAyIDUuNTkgNS41OSAyIDEwIDIgQyAxNC40MSAyIDE4IDUuNTkgMTggMTAgQyAxOCAxNC40MSAxNC40MSAxOCAxMCAxOCBaIFwiIGZpbGwtcnVsZT1cImV2ZW5vZGRcIiBmaWxsPVwicmdiKDAsMCwwKVwiIHN0cm9rZS13aWR0aD1cIjAuNVwiIHN0cm9rZT1cInJnYmEoMCwwLDAsMClcIiBzdHJva2UtbGluZWNhcD1cImJ1dHRcIi8+XG4gIDwvc3ZnPmAsXG4gIHBsdXM6IGA8c3ZnIGZpbGw9XCIjMDAwMDAwXCIgaGVpZ2h0PVwiMjRcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgd2lkdGg9XCIyNFwiPlxuICAgIDxwYXRoIGQ9XCJNMCAwaDI0djI0SDB6XCIgZmlsbD1cIm5vbmVcIi8+XG4gICAgPHBhdGggZD1cIk0xMyA3aC0ydjRIN3YyaDR2NGgydi00aDR2LTJoLTRWN3ptLTEtNUM2LjQ4IDIgMiA2LjQ4IDIgMTJzNC40OCAxMCAxMCAxMCAxMC00LjQ4IDEwLTEwUzE3LjUyIDIgMTIgMnptMCAxOGMtNC40MSAwLTgtMy41OS04LThzMy41OS04IDgtOCA4IDMuNTkgOCA4LTMuNTkgOC04IDh6XCIvPlxuICA8L3N2Zz5gLFxuICBjaGVjazogYDxzdmcgc3R5bGU9XCJpc29sYXRpb246aXNvbGF0ZVwiIHdpZHRoPVwiMjRcIiBoZWlnaHQ9XCIxOVwiPlxuICAgIDxwYXRoIGQ9XCIgTSAwIDAuMjUgTCAyNCAwLjI1IEwgMjQgMjQuMjUgTCAwIDI0LjI1IEwgMCAwLjI1IFogXCIgZmlsbD1cInJnYmEoMCwwLDAsMClcIiBzdHJva2Utd2lkdGg9XCIxXCIgc3Ryb2tlPVwicmdiYSgwLDAsMCwwKVwiIHN0cm9rZS1saW5lY2FwPVwiYnV0dFwiLz5cbiAgICA8cGF0aCBkPVwiIE0gNy42MjcwNjA4MzAwMTcwNTUgMTQuNjg1NDc0NzAxNTM0OTY0IEwgMS45Mzc0NjQ0Njg0NDc5ODIgOC45OTU4NzgzMzk5NjU4ODggTCAwIDEwLjkxOTY5ODY5MjQzODg4NSBMIDcuNjI3MDYwODMwMDE3MDU1IDE4LjU0Njc1OTUyMjQ1NTk0IEwgMjQgMi4xNzM4MjAzNTI0NzI5OTU4IEwgMjIuMDc2MTc5NjQ3NTI3MDAyIDAuMjUgTCA3LjYyNzA2MDgzMDAxNzA1NSAxNC42ODU0NzQ3MDE1MzQ5NjQgWiBcIiBmaWxsPVwicmdiKDAsMCwwKVwiIHN0cm9rZS13aWR0aD1cIjFcIiBzdHJva2U9XCJyZ2JhKDAsMCwwLDApXCIgc3Ryb2tlLWxpbmVjYXA9XCJidXR0XCIvPlxuICA8L3N2Zz5gLFxuICBsaXN0OiBgPHN2ZyBjbGFzcz1cImotaWNvbi1saXN0XCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHhtbG5zOnhsaW5rPVwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGlua1wiIHN0eWxlPVwiaXNvbGF0aW9uOmlzb2xhdGVcIiB3aWR0aD1cIjI0XCIgaGVpZ2h0PVwiMTMuM1wiPlxuICAgIDxwYXRoIGQ9XCIgTSAwIDggTCAyLjYgOCBMIDIuNiA1LjMgTCAwIDUuMyBMIDAgOCBaICBNIDAgMTMuMyBMIDIuNiAxMy4zIEwgMi42IDEwLjYgTCAwIDEwLjYgTCAwIDEzLjMgWiAgTSAwIDIuNiBMIDIuNiAyLjYgTCAyLjYgMCBMIDAgMCBMIDAgMi42IFogIE0gNS4zIDggTCAyNCA4IEwgMjQgNS4zIEwgNS4zIDUuMyBMIDUuMyA4IFogIE0gNS4zIDEzLjMgTCAyNCAxMy4zIEwgMjQgMTAuNiBMIDUuMyAxMC42IEwgNS4zIDEzLjMgWiAgTSA1LjMgMCBMIDUuMyAyLjYgTCAyNCAyLjYgTCAyNCAwIEwgNS4zIDAgWlwiXG4gICAgIGZpbGwtcnVsZT1cImV2ZW5vZGRcIiBmaWxsPVwicmdiKDAsMCwwKVwiIHN0cm9rZS13aWR0aD1cIjEuNVwiIHN0cm9rZT1cInJnYmEoMCwwLDAsMClcIiBzdHJva2UtbGluZWNhcD1cImJ1dHRcIi8+XG4gICAgPHBhdGggZD1cIiBNIDAgMCBMIDM2IDAgTCAzNiAzNiBMIDAgMzYgTCAwIDAgWiBcIiBmaWxsPVwicmdiYSgwLDAsMCwwKVwiIHN0cm9rZS13aWR0aD1cIjEuNVwiIHN0cm9rZT1cInJnYmEoMCwwLDAsMClcIiBzdHJva2UtbGluZWNhcD1cImJ1dHRcIi8+XG4gIDwvc3ZnPmAsXG4gIGVkaXQ6IGA8c3ZnIGNsYXNzPVwiai1pY29uLWVkaXRcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgeG1sbnM6eGxpbms9XCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rXCIgc3R5bGU9XCJpc29sYXRpb246aXNvbGF0ZVwiIHdpZHRoPVwiMjRcIiBoZWlnaHQ9XCIyNFwiPlxuICAgIDxwYXRoIGQ9XCIgTSAtNC40NDA4IDE5LjAwMDYgTCAtNC40NDA4IDI0IEwgNC45OTkzIDI0IEwgMTkuNzQzOSA5LjI1NTMgTCAxNC43NDQ2IDQuMjU2MCBMIC00LjQ0MDggMTkuMDAwNiBaICBNIDIzLjYxIDUuMzg5MiBDIDI0LjEyOTkgNC44NjkzIDI0LjEyOTkgNC4wMjk0IDIzLjYxIDMuNTA5NSBMIDIwLjQ5IDAuMzg5OSBDIDE5Ljk3MDUgLTAuMTI5OSAxOS4xMzA2IC0wLjEyOTkgMTguNjEwNyAwLjM4OTkgTCAxNi4xNzEgMi44Mjk2IEwgMjEuMTcwMyA3LjgyODkgTCAyMy42MSA1LjM4OTIgWlwiXG4gICAgICBmaWxsLXJ1bGU9XCJldmVub2RkXCIgZmlsbD1cInJnYigwLDAsMClcIiBzdHJva2Utd2lkdGg9XCIxLjUwXCIgc3Ryb2tlPVwicmdiYSgwLDAsMCwwKVwiIHN0cm9rZS1saW5lY2FwPVwiYnV0dFwiLz5cbiAgICA8cGF0aCBkPVwiIE0gMCAwIEwgMzUgMCBMIDM1IDM1IEwgMCAzNSBMIDAgMCBaIFwiIGZpbGw9XCJyZ2JhKDAsMCwwLDApXCIgc3Ryb2tlLXdpZHRoPVwiMS41XCIgc3Ryb2tlPVwicmdiYSgwLDAsMCwwKVwiIHN0cm9rZS1saW5lY2FwPVwiYnV0dFwiLz5cbiAgPC9zdmc+YCxcbiAgLy8gZWRpdExpbmU6IGA8c3ZnIGNsYXNzPVwiai1pY29uLWVkaXQtbGluZVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB4bWxuczp4bGluaz1cImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmtcIiBzdHlsZT1cImlzb2xhdGlvbjppc29sYXRlXCIgd2lkdGg9XCIzNlwiIGhlaWdodD1cIjM2XCI+PHBhdGggZD1cIiBNIDI2LjYyIDEwLjUwIEwgMjEgNC44NyBMIDYgMTkuODcgTCA2IDI1LjUwIEwgMTEuNjIgMjUuNSBMIDI2LjYgMTAuNSBaICBNIDMxLjA2IDYuMDYgQyAzMS42NSA1LjQ3IDMxLjY1IDQuNTMzNzUgMzEuMDY1IDMuOTQgTCAyNy41NTUgMC40MyBDIDI2Ljk3IC0wLjE0IDI2LjAyMiAtMC4xNCAyNS40NCAwLjQzIEwgMjIuNSAzLjM3IEwgMjguMTI1IDkgTCAzMS4wNjUgNi4wNiBaIFwiIGZpbGwtcnVsZT1cImV2ZW5vZGRcIiBmaWxsPVwicmdiKDAsMCwwKVwiIHN0cm9rZS13aWR0aD1cIjEuNVwiIHN0cm9rZT1cInJnYmEoMCwwLDAsMClcIiBzdHJva2UtbGluZWNhcD1cImJ1dHRcIi8+PHBhdGggZD1cIiBNIDAgMCBMIDM2IDAgTCAzNiAzNiBMIDAgMzYgTCAwIDAuMDAzNzQ5OTk5OTk5OTk5OTIgWiBcIiBmaWxsPVwicmdiYSgwLDAsMCwwKVwiIHN0cm9rZS13aWR0aD1cIjEuNVwiIHN0cm9rZT1cInJnYmEoMCwwLDAsMClcIiBzdHJva2UtbGluZWNhcD1cImJ1dHRcIi8+PHBhdGggZD1cIiBNIDAgMzAgTCAzNiAzMCBMIDM2IDM2IEwgMCAzNiBMIDAgMzAgWiBcIiBmaWxsPVwicmdiKDAsMCwwKVwiIGZpbGwtb3BhY2l0eT1cIjAuNFwiIHN0cm9rZS13aWR0aD1cIjEuNVwiIHN0cm9rZT1cInJnYmEoMCwwLDAsMClcIiBzdHJva2UtbGluZWNhcD1cImJ1dHRcIi8+PC9zdmc+YCxcbn1cbi8vIGpzY3M6ZW5hYmxlIG1heGltdW1MaW5lTGVuZ3RoXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9zdmctaWNvbnMuanNcbiAqKi8iLCJleHBvcnQge0N1c3RvbUV2ZW50fTtcblxuZnVuY3Rpb24gQ3VzdG9tRXZlbnQoZXZlbnQsIHBhcmFtcyA9IHsgYnViYmxlczogZmFsc2UsIGNhbmNlbGFibGU6IGZhbHNlLCBkZXRhaWw6IHVuZGVmaW5lZCB9KSB7XG4gIHZhciBldnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnQ3VzdG9tRXZlbnQnKTtcbiAgZXZ0LmluaXRDdXN0b21FdmVudChldmVudCwgcGFyYW1zLmJ1YmJsZXMsIHBhcmFtcy5jYW5jZWxhYmxlLCBwYXJhbXMuZGV0YWlsKTtcbiAgcmV0dXJuIGV2dDtcbn1cblxuaWYgKHdpbmRvdyAmJiB0eXBlb2Ygd2luZG93LkN1c3RvbUV2ZW50ICE9PSAnZnVuY3Rpb24nKSB7XG4gIHdpbmRvdy5DdXN0b21FdmVudCA9IEN1c3RvbUV2ZW50O1xuICBDdXN0b21FdmVudC5wcm90b3R5cGUgPSB3aW5kb3cuRXZlbnQucHJvdG90eXBlO1xufVxuXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9jdXN0b20tZXZlbnQuanNcbiAqKi8iLCJpbXBvcnQgeyBjcmVhdGVFbGVtLCBjbG9zZXN0LCByZW1vdmVBbGwsIHJlbW92ZU5vZGUsIHRvQm9vbCB9IGZyb20gJy4vdXRpbCdcblxuZXhwb3J0IGZ1bmN0aW9uIEZpZWxkRWRpdG9yKHsga2V5LCBub2RlLCBlbGVtLCBwYXJlbnQgPSBudWxsLCBwYXRoID0gW10sIHR5cGUgPSAnc3RyaW5nJywgZGVwdGggPSAwIH0pIHtcblxuICBjb25zdCBnZXRBcnJheUJ1dHRvbnMgPSAoe2lkeCA9IC0xfSkgPT4gY3JlYXRlRWxlbShgPGRpdiBjbGFzcz1cImotYXJyYXktYnV0dG9uc1wiPlxuICAgIDxidXR0b24gYWN0aW9uPVwiYWRkXCIgaWR4PVwiJHtpZHh9XCI+KzwvYnV0dG9uPlxuICAgIDxidXR0b24gYWN0aW9uPVwicmVtb3ZlXCIgaWR4PVwiJHtpZHh9XCI+LTwvYnV0dG9uPlxuICA8L2Rpdj5gKVxuICBjb25zdCBmb3JtID0gY3JlYXRlRWxlbShgPHNlY3Rpb24gY2xhc3M9XCJqLWVkaXQgai1zaWRlIHRleHQtbGVmdFwiIGtleT1cIiR7a2V5fVwiIHR5cGU9XCIke3R5cGV9XCIgZGVwdGg9XCIke2RlcHRofVwiIHBhdGg9XCIke0FycmF5LmlzQXJyYXkocGF0aCkgPyBwYXRoLmpvaW4oJzo6JykgOiBwYXRofVwiPlxuICAgIDxmb3JtIGNsYXNzPVwiZmllbGQtZWRpdG9yXCI+XG4gICAgICA8ZmllbGRzZXQ+XG4gICAgICAgIDxsYWJlbD5OYW1lPC9sYWJlbD5cbiAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cIm5hbWVcIiBjbGFzcz1cIm5hbWVcIiB2YWx1ZT1cIiR7a2V5fVwiIC8+XG4gICAgICA8L2ZpZWxkc2V0PlxuICAgICAgPGZpZWxkc2V0PlxuICAgICAgICA8bGFiZWw+VHlwZTwvbGFiZWw+XG4gICAgICAgIDxzZWxlY3Qgcm93cz1cIjFcIiBuYW1lPVwidHlwZVwiPlxuICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJzdHJpbmdcIj50ZXh0PC9vcHRpb24+XG4gICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cImJvb2xlYW5cIj55ZXMvbm88L29wdGlvbj5cbiAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwibnVtYmVyXCI+bnVtYmVyPC9vcHRpb24+XG4gICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIm9iamVjdFwiPm9iamVjdC9oYXNoL21hcC9rZXktdmFsPC9vcHRpb24+XG4gICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cImFycmF5XCI+bGlzdDwvb3B0aW9uPlxuICAgICAgICA8L3NlbGVjdD5cbiAgICAgIDwvZmllbGRzZXQ+XG4gICAgICA8ZmllbGRzZXQ+XG4gICAgICAgIDxsYWJlbD5WYWx1ZTwvbGFiZWw+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ2YWx1ZUVkaXRvclBsYWNlaG9sZGVyXCI+PC9kaXY+XG4gICAgICAgIDwhLS0gQXJyYXkgYnV0dG9ucyBnbyBoZXJlIC0tPlxuICAgICAgPC9maWVsZHNldD5cbiAgICAgIDxmaWVsZHNldD5cbiAgICAgICAgPGJ1dHRvbiB0eXBlPVwic3VibWl0XCI+U2F2ZTwvYnV0dG9uPlxuICAgICAgICA8YnV0dG9uIHR5cGU9XCJyZXNldFwiPkNhbmNlbDwvYnV0dG9uPlxuICAgICAgICA8c3Ryb25nPjwvc3Ryb25nPlxuICAgICAgPC9maWVsZHNldD5cbiAgICA8L2Zvcm0+XG4gIDwvc2VjdGlvbj5gKVxuXG4gIHZhciB2YWx1ZSAgICAgICAgID0gbm9kZVtrZXldXG4gIGNvbnN0IHByZXZWYWxzICAgID0ge31cbiAgY29uc3QgZ2V0VmFsdWUgICAgPSAoKSA9PiBnZXRWYWx1ZUZsZCgpLnZhbHVlXG4gIGNvbnN0IGdldFZhbHVlRmxkID0gKCkgPT4gZm9ybS5xdWVyeVNlbGVjdG9yKCcuZmllbGQtdmFsdWUnKSB8fCB7IHZhbHVlOiBmYWxzZSB9XG4gIGNvbnN0IGdldFR5cGUgICAgID0gKCkgPT4gZmxkVHlwZS52YWx1ZVxuICBjb25zdCBmbGROYW1lICAgICA9IGZvcm0ucXVlcnlTZWxlY3RvcignaW5wdXRbbmFtZT1cIm5hbWVcIl0nKVxuICBjb25zdCBmbGRUeXBlICAgICA9IGZvcm0ucXVlcnlTZWxlY3Rvcignc2VsZWN0W25hbWU9XCJ0eXBlXCJdJylcbiAgY29uc3QgcGxhY2Vob2xkZXIgPSBmb3JtLnF1ZXJ5U2VsZWN0b3IoJy52YWx1ZUVkaXRvclBsYWNlaG9sZGVyJylcblxuICAvLyBpbml0aWFsaXplIHZhbHVlIHRyYWNrZXIgKGZvciBsb2NhbCAndHlwZScgY2hhbmdlcylcbiAgcHJldlZhbHNbdHlwZV0gICAgPSB2YWx1ZVxuXG4gIC8vIHNldCB2YWx1ZSB3LyBkZWZhdWx0XG4gIGZsZFR5cGUudmFsdWUgICAgID0gdHlwZVxuXG4gIC8vIGRlZmluZSBoZWxwZXJzLCBlLmcuIGJ1aWxkIGZpZWxkLCB0cmFuc2l0aW9uIHN0YXRlIChha2EgY29udmVydClcbiAgY29uc3QgYmFzaWNUeXBlcyA9IFsnc3RyaW5nJywgJ251bWJlcicsICdib29sZWFuJ11cblxuICBjb25zdCBnZXRUeXBlTmFtZSA9ICh4KSA9PiBBcnJheS5pc0FycmF5KHgpID8gJ2FycmF5JyA6IHR5cGVvZiB4XG5cbiAgY29uc3QgZ2V0VmFsdWVGaWVsZEVsZW0gPSAoX3ZhbHVlID0gZ2V0VmFsdWUoKSwgcmVuZGVyQXJyYXlzID0gdHJ1ZSkgPT4ge1xuICAgIGNvbnN0IHR5cGVOYW1lID0gZ2V0VHlwZU5hbWUoX3ZhbHVlKVxuICAgIGNvbnNvbGUudHJhY2UoJyAgIFxcdEdlbkZpZWxkKCcsIGtleSwgJywgJywgX3ZhbHVlLCAnKScsIHR5cGVOYW1lKVxuXG4gICAgaWYgKHR5cGVOYW1lID09PSAnc3RyaW5nJykge1xuICAgICAgcmV0dXJuIGNyZWF0ZUVsZW0oYDxpbnB1dCB0eXBlPSd0ZXh0JyBqcy10eXBlPScke3R5cGVOYW1lfScgY2xhc3M9J2ZpZWxkLXZhbHVlJyBuYW1lPSdmaWVsZC12YWx1ZScgdmFsdWU9JyR7X3ZhbHVlfScgLz5gKVxuICAgIH0gZWxzZSBpZiAodHlwZU5hbWUgPT09ICdudW1iZXInKSB7XG4gICAgICByZXR1cm4gY3JlYXRlRWxlbShgPGlucHV0IHR5cGU9J251bWJlcicganMtdHlwZT0nJHt0eXBlTmFtZX0nIGNsYXNzPSdmaWVsZC12YWx1ZScgbmFtZT0nZmllbGQtdmFsdWUnIHZhbHVlPScke192YWx1ZX0nIC8+YClcbiAgICB9IGVsc2UgaWYgKHR5cGVOYW1lID09PSAnYm9vbGVhbicpIHtcbiAgICAgIHJldHVybiBjcmVhdGVFbGVtKGA8aW5wdXQgdHlwZT0nY2hlY2tib3gnIGpzLXR5cGU9JyR7dHlwZU5hbWV9JyBjbGFzcz0nZmllbGQtdmFsdWUnIG5hbWU9J2ZpZWxkLXZhbHVlJyB2YWx1ZT0nY2hlY2tlZCcke192YWx1ZSA/ICcgY2hlY2tlZCcgOiAnJ30nIC8+YClcbiAgICB9IGVsc2UgaWYgKHR5cGVOYW1lID09PSAnYXJyYXknICYmIHJlbmRlckFycmF5cykge1xuICAgICAgcmV0dXJuIF92YWx1ZS5yZWR1Y2UoKGVsZW0sIHZhbCwgaWR4KSA9PiB7XG4gICAgICAgIGxldCBsaSA9IGNyZWF0ZUVsZW0oYDxsaSBpZHg9XCIke2lkeH1cIj4ke3R5cGVvZiB2YWwgPT09ICdzdHJpbmcnID8gdmFsKyc6ICcgOiAnJ308L2xpPmApXG4gICAgICAgIC8vIHNlZSBpZiB0eXBlIG9mIGFycmF5IGl0ZW1zIGlzIHNpbXBsZSBlbm91Z2ggdG8gc2hvdyB2YWx1ZS9pbnB1dCBmaWVsZFxuICAgICAgICBpZiAoYmFzaWNUeXBlcy5pbmRleE9mKHR5cGVvZiB2YWwpIDw9IC0xKSB7XG4gICAgICAgICAgbGkuYXBwZW5kQ2hpbGQoY3JlYXRlRWxlbShgPHRleHRhcmVhIGpzLXR5cGU9JyR7dHlwZU5hbWV9JyBwYXRoPScke2lkeH0nIGNsYXNzPSdmaWVsZC12YWx1ZSBqc29uLXZhbHVlJyByb3dzPSc3Jz4ke0pTT04uc3RyaW5naWZ5KHZhbCwgbnVsbCwgMil9PC90ZXh0YXJlYT5gKSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBsaS5hcHBlbmRDaGlsZChnZXRWYWx1ZUZpZWxkRWxlbSh2YWwsIGZhbHNlKSlcbiAgICAgICAgfVxuICAgICAgICBlbGVtLmFwcGVuZENoaWxkKGxpKVxuICAgICAgICByZXR1cm4gZWxlbVxuICAgICAgfSwgZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKSlcbiAgICAgIC8vIHJldHVybiBjcmVhdGVFbGVtKGA8aW5wdXQgdHlwZT0nY2hlY2tib3gnIGpzLXR5cGU9JyR7dHlwZU5hbWV9JyBjbGFzcz0nZmllbGQtdmFsdWUnIG5hbWU9J2ZpZWxkLXZhbHVlJyB2YWx1ZT0nY2hlY2tlZCcke192YWx1ZSA/ICcgY2hlY2tlZCcgOiAnJ30nIC8+YClcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGNyZWF0ZUVsZW0oYDxzcGFuIGNsYXNzPVwiaGFzLWVycm9yXCI+PGlucHV0IHR5cGU9J3RleHQnIGpzLXR5cGU9JyR7dHlwZU5hbWV9JyBjbGFzcz0nZmllbGQtdmFsdWUnIG5hbWU9J2ZpZWxkLXZhbHVlJyB2YWx1ZT0nJHtKU09OLnN0cmluZ2lmeShfdmFsdWUsIG51bGwsIDIpfScgLz48L3NwYW4+YClcbiAgICB9XG4gIH1cblxuICBjb25zdCBjb252ZXJ0ID0gKHsgdmFsdWUsIHR5cGUgfSkgPT4ge1xuICAgIGNvbnN0IGpzb25QYXR0ZXJuID0gL15cXHMqKFxce3xcXFspLiooXFxdfFxcfSlcXHMqJC9nO1xuICAgIGNvbnN0IGlzSnNvbiA9IHMgPT4ganNvblBhdHRlcm4udGVzdChzKVxuICAgIGNvbnN0IGN1cnJUeXBlID0gZ2V0VHlwZU5hbWUodmFsdWUpXG4gICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICBjYXNlICdzdHJpbmcnOlxuICAgICAgICBzd2l0Y2ggKGN1cnJUeXBlKSB7XG4gICAgICAgICAgY2FzZSAnc3RyaW5nJzogIHJldHVybiB2YWx1ZVxuICAgICAgICAgIGNhc2UgJ2Jvb2xlYW4nOiByZXR1cm4gdmFsdWVcbiAgICAgICAgICBjYXNlICdhcnJheSc6ICAgcmV0dXJuIHR5cGVvZiB2YWx1ZVswXSA9PT0gJ3N0cmluZycgPyB2YWx1ZS5qb2luKCdcXHQnKSA6IEpTT04uc3RyaW5naWZ5KHZhbHVlKVxuICAgICAgICAgIGNhc2UgJ29iamVjdCc6ICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodmFsdWUpXG4gICAgICAgICAgZGVmYXVsdDogICAgICAgIHJldHVybiB2YWx1ZVxuICAgICAgICB9XG4gICAgICBjYXNlICdudW1iZXInOlxuICAgICAgICBzd2l0Y2ggKGN1cnJUeXBlKSB7XG4gICAgICAgICAgY2FzZSAnc3RyaW5nJzogcmV0dXJuIHBhcnNlRmxvYXQodmFsdWUpXG4gICAgICAgICAgY2FzZSAnYm9vbGVhbic6IHJldHVybiB2YWx1ZSA/IDEgOiAwXG4gICAgICAgICAgY2FzZSAnYXJyYXknOiByZXR1cm4gLTFcbiAgICAgICAgICBjYXNlICdvYmplY3QnOiByZXR1cm4gLTFcbiAgICAgICAgICBkZWZhdWx0OiAgICAgICByZXR1cm4gLTk5XG4gICAgICAgIH1cbiAgICAgIGNhc2UgJ2Jvb2xlYW4nOlxuICAgICAgICByZXR1cm4gdG9Cb29sKHZhbHVlKVxuICAgICAgY2FzZSAnYXJyYXknOlxuICAgICAgICBzd2l0Y2ggKGN1cnJUeXBlKSB7XG4gICAgICAgICAgY2FzZSAnc3RyaW5nJzogcmV0dXJuIGlzSnNvbih2YWx1ZSkgPyBKU09OLnBhcnNlKHZhbHVlKSA6IHZhbHVlLnNwbGl0KC9cXHMrLylcbiAgICAgICAgICBjYXNlICdib29sZWFuJzogcmV0dXJuIFt2YWx1ZV1cbiAgICAgICAgICBjYXNlICdhcnJheSc6IHJldHVybiB2YWx1ZVxuICAgICAgICAgIGNhc2UgJ29iamVjdCc6IHJldHVybiBbdmFsdWVdXG4gICAgICAgICAgZGVmYXVsdDogICAgICAgcmV0dXJuIFtdXG4gICAgICAgIH1cbiAgICAgIGNhc2UgJ29iamVjdCc6XG4gICAgICAgIHN3aXRjaCAoY3VyclR5cGUpIHtcbiAgICAgICAgICBjYXNlICdzdHJpbmcnOiByZXR1cm4gaXNKc29uKHZhbHVlKSA/IEpTT04ucGFyc2UodmFsdWUpIDoge3ZhbHVlfVxuICAgICAgICAgIGNhc2UgJ2Jvb2xlYW4nOiByZXR1cm4ge3ZhbHVlfVxuICAgICAgICAgIGNhc2UgJ2FycmF5JzogcmV0dXJuIHt2YWx1ZX1cbiAgICAgICAgICBjYXNlICdvYmplY3QnOiByZXR1cm4gdmFsdWVcbiAgICAgICAgICBkZWZhdWx0OiAgICAgICByZXR1cm4ge31cbiAgICAgICAgfVxuICAgIH1cbiAgICBjb25zb2xlLmVycm9yKCdGYWlsZWQgdG8gTWF0Y2ggVHlwZTogJywgdHlwZSwgY3VyclR5cGUsIHZhbHVlKTtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cblxuICBjb25zdCB1cGRhdGVWYWx1ZUZpZWxkID0gKHYpID0+IHtcbiAgICBjb25zdCBuZXdUeXBlID0gZmxkVHlwZS52YWx1ZVxuICAgIGNvbnN0IG5ld1ZhbCAgPSBjb252ZXJ0KHsgdmFsdWU6IHYgfHwgZ2V0Q3VycmVudFZhbHVlKCksIHR5cGU6IG5ld1R5cGUgfSlcbiAgICBjb25zdCBuZXdGbGQgID0gZ2V0VmFsdWVGaWVsZEVsZW0obmV3VmFsKVxuICAgIHJlbW92ZUFsbChwbGFjZWhvbGRlci5jaGlsZHJlbilcbiAgICAvLyBjb25zb2xlLmVycm9yKCd1cGRhdGVWYWx1ZUZpZWxkIFZhbHVlOicsIGdldFZhbHVlKCkpXG4gICAgY29uc29sZS5lcnJvcigndXBkYXRlVmFsdWVGaWVsZCcsIGdldFZhbHVlKCksIGdldEN1cnJlbnRWYWx1ZSgpKVxuICAgIHBsYWNlaG9sZGVyLmFwcGVuZENoaWxkKG5ld0ZsZClcbiAgICByZXR1cm4gbmV3RmxkXG4gIH1cblxuICAvLyBkZWZpbmUgZXZlbnRzLCBvblR5cGVDaGFuZ2VkLCBvblNhdmUsIG9uQ2FuY2VsXG4gIGNvbnN0IG9uVHlwZUNoYW5nZWQgPSAoeyB0YXJnZXQgfSkgPT4ge1xuICAgIGNvbnNvbGUud2FybignVHlwZSBDaGFuZ2VkISEnLCBhcmd1bWVudHMpXG4gICAgY29uc3QgbmV3VHlwZSA9IGZsZFR5cGUudmFsdWVcbiAgICBjb25zdCBvbGRWYWwgID0gZ2V0Q3VycmVudFZhbHVlKClcbiAgICB1cGRhdGVWYWx1ZUZpZWxkKClcbiAgfVxuXG4gIGNvbnN0IGdldEN1cnJlbnRWYWx1ZSA9ICgpID0+IHtcbiAgICBsZXQgZmllbGRzICA9IHBsYWNlaG9sZGVyLnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0LCB0ZXh0YXJlYScpXG5cbiAgICBsZXQgcmVzdWx0cyA9IEFycmF5LmZyb20oZmllbGRzKS5tYXAoKGYsIGksIGEpID0+IHtcbiAgICAgIHZhciB2ID0gZi52YWx1ZTtcbiAgICAgIGxldCBqc1R5cGUgPSBmLmdldEF0dHJpYnV0ZSgnanMtdHlwZScpXG4gICAgICB0cnkge1xuICAgICAgICBpZiAoZi5jbGFzc0xpc3QuY29udGFpbnMoJ2pzb24tdmFsdWUnKSkge1xuICAgICAgICAgIHJldHVybiBKU09OLnBhcnNlKHYpXG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKGUpIHsgY29uc29sZS5lcnJvcignRkFJTEVEIFRPIENPTlZFUlQgSlNPTjonLCBlKSB9XG4gICAgICBjb25zb2xlLndhcm4oJ2dldEN1cnJlbnRWYWx1ZTonLCBqc1R5cGUsIHYpXG4gICAgICB2ID0gY29udmVydCh7dmFsdWU6IHYsIHR5cGU6IGpzVHlwZX0pXG4gICAgICBjb25zb2xlLndhcm4oJ1Y6JywgdilcbiAgICAgIHJldHVybiB2XG4gICAgfSlcblxuICAgIHJldHVybiB0eXBlICE9PSAnYXJyYXknID8gcmVzdWx0c1swXSA6IHJlc3VsdHNcbiAgfVxuXG4gIGNvbnN0IG9uU2F2ZSA9IChlKSA9PiB7XG4gICAgLy8gY29uc3QgeyB0YXJnZXQsIGRldGFpbCwgcHJldmVudERlZmF1bHQgfSA9IGU7XG4gICAgY29uc3Qgb2xkTmFtZSA9IGtleSxcbiAgICAgICAgICBuZXdOYW1lID0gZmxkTmFtZS52YWx1ZSxcbiAgICAgICAgICBvbGRUeXBlID0gdHlwZSxcbiAgICAgICAgICBuZXdUeXBlID0gZmxkVHlwZS52YWx1ZSxcbiAgICAgICAgICBvbGRWYWx1ZSA9IHZhbHVlLFxuICAgICAgICAgIG5ld1ZhbHVlID0gZ2V0VmFsdWUoKVxuICAgIGNvbnN0IG5hbWVDaGFuZ2VkICA9IG9sZE5hbWUgICE9PSBuZXdOYW1lLFxuICAgICAgICAgIHR5cGVDaGFuZ2VkICA9IG9sZFR5cGUgICE9PSBuZXdUeXBlLFxuICAgICAgICAgIHZhbHVlQ2hhbmdlZCA9IG9sZFZhbHVlICE9PSBuZXdWYWx1ZVxuICAgIGNvbnN0IGNoYW5nZWQgPSBuYW1lQ2hhbmdlZCB8fCB0eXBlQ2hhbmdlZCB8fCB2YWx1ZUNoYW5nZWRcblxuICAgIGUucHJldmVudERlZmF1bHQoKVxuXG4gICAgaWYgKGNoYW5nZWQpIHtcbiAgICAgIGNvbnNvbGUud2FybihgQ0hBTkdFRCEgUEFUSD0ke3BhdGh9IFZhbHVlPWAsIGdldEN1cnJlbnRWYWx1ZSgpKVxuICAgICAgY29uc29sZS53YXJuKGBTYXZpbmcgY2hhbmdlcy4uLiAoJHtvbGROYW1lfToke29sZFZhbHVlfSA9PiAke25ld05hbWV9OiR7bmV3VmFsdWV9KSBuYW1lQ2hhbmdlZD0ke25hbWVDaGFuZ2VkfSB0eXBlQ2hhbmdlZD0ke3R5cGVDaGFuZ2VkfSB2YWx1ZUNoYW5nZWQ9JHt2YWx1ZUNoYW5nZWR9IFxcbkFyZ3M9XFxuYCwgYXJndW1lbnRzKVxuICAgICAgaWYgKG5hbWVDaGFuZ2VkKSB7XG4gICAgICAgIG5vZGVbbmV3TmFtZV0gPSBuZXdWYWx1ZVxuICAgICAgICBkZWxldGUgbm9kZVtvbGROYW1lXVxuICAgICAgfSBlbHNlIGlmICh2YWx1ZUNoYW5nZWQpIHtcbiAgICAgICAgbm9kZVtrZXldID0gZ2V0Q3VycmVudFZhbHVlKClcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS53YXJuKGBOb3RoaW5nIGNoYW5nZWRgKVxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IG9uQ2FuY2VsID0gKHsgdGFyZ2V0IH0pID0+IHtcbiAgICBjb25zb2xlLndhcm4oJ0NhbmNlbGxlZCEhJywgYXJndW1lbnRzKVxuICB9XG5cbiAgY29uc3Qgc2V0dXAgPSAoKSA9PiB7XG4gICAgLy8gU2V0dXAgZXZlbnRzXG4gICAgZm9ybS5xdWVyeVNlbGVjdG9yKCdidXR0b25bdHlwZT1cInN1Ym1pdFwiXScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb25TYXZlKVxuICAgIGZvcm0ucXVlcnlTZWxlY3RvcignYnV0dG9uW3R5cGU9XCJyZXNldFwiXScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb25DYW5jZWwpXG4gICAgZmxkVHlwZS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBvblR5cGVDaGFuZ2VkKVxuICAgIHBsYWNlaG9sZGVyLnBhcmVudE5vZGUuYXBwZW5kQ2hpbGQoZ2V0QXJyYXlCdXR0b25zKHtpbmRleDogLTF9KSlcbiAgfVxuXG4gIGNvbnN0IGRlc3Ryb3kgPSAoKSA9PiB7XG4gICAgZm9ybS5xdWVyeVNlbGVjdG9yKCdidXR0b25bdHlwZT1cInN1Ym1pdFwiXScpLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb25TYXZlKVxuICAgIGZvcm0ucXVlcnlTZWxlY3RvcignYnV0dG9uW3R5cGU9XCJyZXNldFwiXScpLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb25DYW5jZWwpXG4gICAgZmxkVHlwZS5yZW1vdmVFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBvblR5cGVDaGFuZ2VkKVxuICAgIHJlbW92ZU5vZGUoZm9ybSlcbiAgfVxuXG4gIHNldHVwKClcblxuICAvLyBpbml0IFVJXG4gIHVwZGF0ZVZhbHVlRmllbGQodmFsdWUpXG5cbiAgcmV0dXJuIE9iamVjdC5hc3NpZ24oZm9ybSwgeyBkZXN0cm95IH0pXG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9maWVsZC1lZGl0b3IuanNcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9