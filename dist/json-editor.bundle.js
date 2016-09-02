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
	
	  var destroy = function destroy() {
	    _util.Styles.remove();
	
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
	    if (currForm && currForm.parentNode) {
	      currForm.parentNode.removeChild(currForm);
	    }
	    elem.appendChild((0, _fieldEditor.FieldEditor)({
	      depth: target.depth || 1,
	      elem: target,
	      key: target.key,
	      node: target.node,
	      parent: target.parent || target.parentNode,
	      path: target.path,
	      type: target.type || 'string'
	    }));
	  };
	
	  var treeSection = document.createElement('section');
	  var keyList = (0, _keyList.KeyList)({ data: config });
	
	  keyList.addEventListener('selected', _handleSelect);
	  treeSection.appendChild(keyList);
	  treeSection.classList.add('j-side');
	  elem.appendChild(treeSection);
	  elem.classList.add('json-editor');
	
	  _util.Styles.add();
	
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
	  var _ref$canAdd = _ref.canAdd;
	  var canAdd = _ref$canAdd === undefined ? true : _ref$canAdd;
	
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
	    // check for last row
	    if (arr.length - 1 === idx) {
	      if (canAdd) {
	        var addElem = (0, _util.createElem)('<li class=\'j-create j-type-string\' key=\'[key name]\'></li>');
	        Object.assign(addElem, { node: data, key: '[key]', type: 'string', path: rowPath, value: '', innerHTML: ' [new] ' });
	        list.appendChild(addElem);
	      }
	    }
	  });
	
	  var _clickHandler = function _clickHandler(e) {
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
	exports.push([module.id, ".unselectable {\n  user-select: none;\n  -moz-user-select: none;\n  -webkit-user-select: none;\n  -ms-user-select: none;\n}\n.j-xs-1,\n.j-xs-2,\n.j-xs-3,\n.j-xs-4,\n.j-xs-5,\n.j-xs-6,\n.j-xs-7,\n.j-xs-8,\n.j-xs-9,\n.j-xs-10,\n.j-xs-11,\n.j-xs-12 {\n  display: inline-block;\n  box-sizing: border-box;\n}\n.j-xs-1 {\n  width: 8.3333%;\n}\n.j-xs-2 {\n  width: 16.6666%;\n}\n.j-xs-3 {\n  width: 24.9999%;\n}\n.j-xs-4 {\n  width: 33.3332%;\n}\n.j-xs-5 {\n  width: 41.6665%;\n}\n.j-xs-6 {\n  width: 49.9998%;\n}\n.j-xs-7 {\n  width: 58.3331%;\n}\n.j-xs-8 {\n  width: 66.6664%;\n}\n.j-xs-9 {\n  width: 74.9997%;\n}\n.j-xs-10 {\n  width: 83.3331%;\n}\n.j-xs-11 {\n  width: 91.6663%;\n}\n.j-xs-12 {\n  width: 99.9996%;\n}\nul.j-keys {\n  width: 250px;\n  list-style: none;\n  display: inline-block;\n  user-select: none;\n  -moz-user-select: none;\n  -webkit-user-select: none;\n  -ms-user-select: none;\n}\nul.j-keys li {\n  display: block;\n  min-width: 250px;\n  min-height: 22px;\n  text-align: left;\n  padding-left: 10px;\n  margin-left: -30px;\n}\nul.j-keys .j-icon-edit,\nul.j-keys .j-icon-list,\nul.j-keys .j-icon-arrow-down {\n  zoom: 40%;\n}\nul.j-keys li:not(.j-closed) > .j-icon-arrow-down {\n  transform: rotate(0deg) !important;\n}\nul.j-keys .j-closed > ul {\n  display: none;\n}\nul.j-keys .j-closed:before {\n  content: ' ' !important;\n}\nul.j-keys .j-closed > .j-icon-arrow-down {\n  transform: rotate(-90deg) !important;\n}\nul.j-keys .j-icon-plus:before {\n  content: ' ';\n}\nul.j-keys .j-icon-list:before {\n  content: ' ';\n}\nul.j-keys .j-icon-text:before {\n  content: '\\2139   ' !important;\n}\nul.j-keys .j-icon-default:before {\n  content: '\\1F524   \\FE0F' !important;\n}\nul.j-keys .j-create {\n  font-style: italic;\n}\n.field-editor ul {\n  list-style: none;\n}\n.field-editor fieldset {\n  width: 100%;\n}\n", ""]);
	
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
	        if (basicTypes.indexOf(getTypeName(val)) <= -1) {
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
	    console.error('placeholder empty?', placeholder.children);
	    console.error('updateValueField', getValue(), getCurrentValue());
	    placeholder.appendChild(newFld);
	    return newFld;
	  };
	
	  // define events, onTypeChanged, onSave, onCancel
	  var onTypeChanged = function onTypeChanged(_ref4) {
	    var target = _ref4.target;
	
	    var newType = fldType.value;
	    var oldVal = getCurrentValue();
	    (0, _util.removeAll)(placeholder.children);
	    console.warn('Type Changed!! OriginalType=' + type + ' Val=' + oldVal + ' ', _arguments);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCAzNjQ3MWI1N2Q3Yjg3N2FkYjIwOCIsIndlYnBhY2s6Ly8vLi9pbmRleC5qcz80YzA4Iiwid2VicGFjazovLy8uL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9rZXktbGlzdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29uZmlnLmpzIiwid2VicGFjazovLy8uL3NyYy91dGlsLmpzIiwid2VicGFjazovLy8uL3NyYy9zdHlsZS5sZXNzIiwid2VicGFjazovLy8uL34vY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N2Zy1pY29ucy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY3VzdG9tLWV2ZW50LmpzIiwid2VicGFjazovLy8uL3NyYy9maWVsZC1lZGl0b3IuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7O0FDdENBLDRHQUFrSixFOzs7Ozs7Ozs7Ozs7U0NJbEksTSxHQUFBLE07O0FBSmhCOztBQUNBOztBQUNBOztBQUVPLFVBQVMsTUFBVCxDQUFnQixJQUFoQixFQUFzQixNQUF0QixFQUE4QjtBQUNuQyxPQUFJLENBQUMsSUFBTCxFQUFhO0FBQUUsV0FBTSxJQUFJLEtBQUosQ0FBVSwrQ0FBVixDQUFOO0FBQWtFO0FBQ2pGLE9BQUksQ0FBQyxNQUFMLEVBQWE7QUFBRSxXQUFNLElB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Q0FBeUIsUUFBekIsRUFBbUMsYUFBbkM7QUFDQSxpQkFBWSxVQUFaLENBQXVCLFdBQXZCLENBQW1DLGdCQUFnQixFQUFDLE9BQU8sQ0FBQyxDQUFULEVBQWhCLENBQW5DO0FBQ0QsSUFORDs7QUFRQSxPQUFNLFVBQVUsU0FBVixPQUFVLEdBQU07QUFDcEIsVUFBSyxhQUFMLENBQW1CLHVCQUFuQixFQUE0QyxtQkFBNUMsQ0FBZ0UsT0FBaEUsRUFBeUUsTUFBekU7QUFDQSxVQUFLLGFBQUwsQ0FBbUIsc0JBQW5CLEVBQTJDLG1CQUEzQyxDQUErRCxPQUEvRCxFQUF3RSxRQUF4RTtBQUNBLGFBQVEsbUJBQVIsQ0FBNEIsUUFBNUIsRUFBc0MsYUFBdEM7QUFDQSwyQkFBVyxJQUFYO0FBQ0QsSUFMRDs7QUFPQTs7QUFFQTtBQUNBLG9CQUFpQixLQUFqQjs7QUFFQSxVQUFPLE9BQU8sTUFBUCxDQUFjLElBQWQsRUFBb0IsRUFBRSxnQkFBRixFQUFwQixDQUFQO0FBQ0QsRSIsImZpbGUiOiJqc29uLWVkaXRvci5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJKc29uRWRpdG9yXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcIkpzb25FZGl0b3JcIl0gPSBmYWN0b3J5KCk7XG59KSh0aGlzLCBmdW5jdGlvbigpIHtcbnJldHVybiBcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb25cbiAqKi8iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIDM2NDcxYjU3ZDdiODc3YWRiMjA4XG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBnbG9iYWxbXCJKc29uRWRpdG9yXCJdID0gcmVxdWlyZShcIi0hL1VzZXJzL2RsZXZ5L2NvZGUvb3NzL2pzb24tZWRpdG9yL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvaW5kZXguanM/e1xcXCJwcmVzZXRzXFxcIjpbXFxcImVzMjAxNVxcXCJdfSEvVXNlcnMvZGxldnkvY29kZS9vc3MvanNvbi1lZGl0b3IvaW5kZXguanNcIik7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL2luZGV4LmpzXG4gKiogbW9kdWxlIGlkID0gMFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiaW1wb3J0IHtLZXlMaXN0fSAgICAgIGZyb20gJy4vc3JjL2tleS1saXN0J1xuaW1wb3J0IHtGaWVsZEVkaXRvcn0gIGZyb20gJy4vc3JjL2ZpZWxkLWVkaXRvcidcbmltcG9ydCB7U3R5bGVzfSAgICAgICBmcm9tICcuL3NyYy91dGlsJ1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlKGVsZW0sIGNvbmZpZykge1xuICBpZiAoIWVsZW0pICAgeyB0aHJvdyBuZXcgRXJyb3IoJ0pzb25FZGl0b3IgaW5zdGFuY2UgcmVxdWlyZXMgMXN0IHBhcmFtIGBlbGVtYCcpIH1cbiAgaWYgKCFjb25maWcpIHsgdGhyb3cgbmV3IEVycm9yKCdKc29uRWRpdG9yIGluc3RhbmNlIHJlcXVpcmVzIDJuZCBwYXJhbSBgY29uZmlnYCcpIH1cblxuICBjb25zdCBkZXN0cm95ID0gKCkgPT4ge1xuICAgIFN0eWxlcy5yZW1vdmUoKVxuXG4gICAgY29uc3QgY3VyckZvcm0gPSBlbGVtLnF1ZXJ5U2VsZWN0b3IoJ3NlY3Rpb24uai1lZGl0JylcbiAgICBpZiAoY3VyckZvcm0gJiYgdHlwZW9mIGN1cnJGb3JtLmRlc3Ryb3kgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGN1cnJGb3JtLmRlc3Ryb3koKVxuICAgIH1cbiAgICBpZiAoa2V5TGlzdCAmJiB0eXBlb2Yga2V5TGlzdC5kZXN0cm95ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBrZXlMaXN0LmRlc3Ryb3koKVxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IF9oYW5kbGVTZWxlY3QgPSAoe3RhcmdldCwgZGV0YWlsfSkgPT4ge1xuICAgIGNvbnNvbGUud2FybignU0VMRUNUJywgZGV0YWlsLCB0YXJnZXQpXG4gICAgY29uc3QgY3VyckZvcm0gPSBlbGVtLnF1ZXJ5U2VsZWN0b3IoJ3NlY3Rpb24uai1lZGl0JylcbiAgICBpZiAoY3VyckZvcm0gJiYgY3VyckZvcm0ucGFyZW50Tm9kZSkge1xuICAgICAgY3VyckZvcm0ucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChjdXJyRm9ybSlcbiAgICB9XG4gICAgZWxlbS5hcHBlbmRDaGlsZChGaWVsZEVkaXRvcih7XG4gICAgICBkZXB0aDogIHRhcmdldC5kZXB0aCB8fCAxLFxuICAgICAgZWxlbTogICB0YXJnZXQsXG4gICAgICBrZXk6ICAgIHRhcmdldC5rZXksXG4gICAgICBub2RlOiAgIHRhcmdldC5ub2RlLFxuICAgICAgcGFyZW50OiB0YXJnZXQucGFyZW50IHx8IHRhcmdldC5wYXJlbnROb2RlLFxuICAgICAgcGF0aDogICB0YXJnZXQucGF0aCxcbiAgICAgIHR5cGU6ICAgdGFyZ2V0LnR5cGUgfHwgJ3N0cmluZycsXG4gICAgfSkpXG4gIH1cblxuICBjb25zdCB0cmVlU2VjdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NlY3Rpb24nKVxuICBjb25zdCBrZXlMaXN0ID0gS2V5TGlzdCh7ZGF0YTogY29uZmlnfSlcblxuICBrZXlMaXN0LmFkZEV2ZW50TGlzdGVuZXIoJ3NlbGVjdGVkJywgX2hhbmRsZVNlbGVjdClcbiAgdHJlZVNlY3Rpb24uYXBwZW5kQ2hpbGQoa2V5TGlzdClcbiAgdHJlZVNlY3Rpb24uY2xhc3NMaXN0LmFkZCgnai1zaWRlJylcbiAgZWxlbS5hcHBlbmRDaGlsZCh0cmVlU2VjdGlvbilcbiAgZWxlbS5jbGFzc0xpc3QuYWRkKCdqc29uLWVkaXRvcicpXG5cbiAgU3R5bGVzLmFkZCgpXG5cbiAgcmV0dXJuIHtkZXN0cm95fTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vaW5kZXguanNcbiAqKi8iLCJpbXBvcnQgeyBjb25maWcgfSAgICAgICAgICAgICAgICAgICAgICAgICBmcm9tICcuL2NvbmZpZydcbmltcG9ydCB7IGNyZWF0ZUVsZW0sIGNsb3Nlc3QsXG4gICAgICAgICAgcmVtb3ZlQWxsLCByZW1vdmVOb2RlIH0gZnJvbSAnLi91dGlsJ1xuaW1wb3J0IHsgYXJyb3dzLCB1eCB9ICAgICAgICAgICAgICAgICAgICAgZnJvbSAnLi9zdmctaWNvbnMnXG5pbXBvcnQgeyBDdXN0b21FdmVudCBhcyBfQ3VzdG9tRXZlbnQgfSAgICBmcm9tICcuL2N1c3RvbS1ldmVudCdcbi8vIF9DdXN0b21FdmVudCBzaG91bGQgYXV0by1hdHRhY2ggdGhlIG9iamVjdCB0byB0aGUgd2luZG93Li4uIGlmIG5vdCBtYWtlIGluaXQgZnVuY3Rpb25cblxuZXhwb3J0IGZ1bmN0aW9uIEtleUxpc3QoeyBkYXRhLCBwYXJlbnQsIHBhdGggPSBbXSwgZGVwdGggPSAwLCBjYW5BZGQgPSB0cnVlIH0pIHtcbiAgY29uc3QgbGlzdCA9IGNyZWF0ZUVsZW0oJzx1bCBjbGFzcz1cImota2V5c1wiIGRlcHRoPVwiJyArIGRlcHRoICsgJ1wiPjwvdWw+JylcbiAgT2JqZWN0XG4gICAgLmtleXMoZGF0YSlcbiAgICAuZm9yRWFjaCgoa2V5LCBpZHgsIGFycikgPT4ge1xuICAgICAgY29uc3QgdmFsdWVUeXBlICAgPSBBcnJheS5pc0FycmF5KGRhdGFba2V5XSkgPyAnYXJyYXknIDogdHlwZW9mIGRhdGFba2V5XVxuICAgICAgY29uc3QgaWNvbiAgICAgICAgPSAgICAgICAgICAgIHZhbHVlVHlwZSA9PT0gJ29iamVjdCcgP1xuICAgICAgICAgICAgICAgICAgICAgIGFycm93cy5kb3duICA6IHZhbHVlVHlwZSA9PT0gJ2FycmF5JyA/XG4gICAgICAgICAgICAgICAgICAgICAgdXgubGlzdCAgICAgIDogdmFsdWVUeXBlID09PSAnc3RyaW5nJyA/XG4gICAgICAgICAgICAgICAgICAgICAgdXguZWRpdCAgICAgIDogdXguZWRpdFxuICAgICAgY29uc3QgZXhwYW5kYWJsZSAgPSB2YWx1ZVR5cGUgPT09ICdvYmplY3QnID8gJ2otZXhwYW5kYWJsZScgOiAnJ1xuICAgICAgbGV0IHJvd1BhdGggPSBbXS5zbGljZS5jYWxsKHBhdGgpLnB1c2goa2V5ICsgKHZhbHVlVHlwZSA9PT0gJ2FycmF5JyA/ICdbJyA6IHZhbHVlVHlwZSA9PT0gJ29iamVjdCcgPyAnLicgOiAnJykpXG4gICAgICBjb25zdCByb3cgPSBjcmVhdGVFbGVtKFsnPGxpIGRlcHRoPVwiJywgZGVwdGggKyAxLCAnXCIgY2xhc3M9XCJqLWNsb3NlZCAnLCBleHBhbmRhYmxlLCAnIGotdHlwZS0nLCB2YWx1ZVR5cGUsICdcIiBrZXk9XCInLCBrZXksICdcIj4nLCBpY29uLCAnICcsIGtleSwgJzwvbGk+J10uam9pbignJykpXG4gICAgICBPYmplY3QuYXNzaWduKHJvdywgeyBub2RlOiBkYXRhLCBrZXk6IGtleSwgdHlwZTogdmFsdWVUeXBlLCBwYXRoOiByb3dQYXRoLCB2YWx1ZTogZGF0YVtrZXldIH0pXG4gICAgICAvLyBjb25zb2xlLndhcm4oJ3JvdycsIHJvdywgdmFsdWVUeXBlLCBpY29uKVxuICAgICAgbGlzdC5hcHBlbmRDaGlsZChyb3cpXG4gICAgICAvLyBjaGVjayBmb3IgbGFzdCByb3dcbiAgICAgIGlmICgoYXJyLmxlbmd0aCAtIDEpID09PSBpZHgpIHtcbiAgICAgICAgaWYgKGNhbkFkZCkge1xuICAgICAgICAgIGNvbnN0IGFkZEVsZW0gPSBjcmVhdGVFbGVtKGA8bGkgY2xhc3M9J2otY3JlYXRlIGotdHlwZS1zdHJpbmcnIGtleT0nW2tleSBuYW1lXSc+PC9saT5gKVxuICAgICAgICAgIE9iamVjdC5hc3NpZ24oYWRkRWxlbSwge25vZGU6IGRhdGEsIGtleTogJ1trZXldJywgdHlwZTogJ3N0cmluZycsIHBhdGg6IHJvd1BhdGgsIHZhbHVlOiAnJywgaW5uZXJIVE1MOiAnIFtuZXddICd9KVxuICAgICAgICAgIGxpc3QuYXBwZW5kQ2hpbGQoYWRkRWxlbSlcbiAgICAgICAgfVxuXG4gICAgICB9XG4gICAgfSlcblxuXG4gIGNvbnN0IF9jbGlja0hhbmRsZXIgPSAoZSkgPT4ge1xuICAgIGNvbnN0IHt0YXJnZXR9ID0gZVxuICAgIGNvbnN0IGxpID0gY2xvc2VzdCh0YXJnZXQsICdsaScsIDIpXG4gICAgaWYgKGxpKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgIGNvbnN0IHsgbm9kZSwga2V5LCB0eXBlLCBwYXRoLCB2YWx1ZSB9ID0gbGlcbiAgICAgIGNvbnN0IG5leHREYXRhICA9IG5vZGVba2V5XVxuICAgICAgY29uc3QgaXNPYmplY3QgPSBsaS5jbGFzc0xpc3QuY29udGFpbnMoJ2otdHlwZS1vYmplY3QnKVxuICAgICAgY29uc3QgaXNBcnJheSAgPSBsaS5jbGFzc0xpc3QuY29udGFpbnMoJ2otdHlwZS1hcnJheScpXG4gICAgICBjb25zb2xlLndhcm4oJ0NBTkNFTExFRCBjbGljayBmb3IgJXMnLCBrZXksICdpc09iamVjdD0nLCBpc09iamVjdCwgJ2lzQXJyYXk9JywgaXNBcnJheSwgJ2VsZW09JywgbGkpXG4gICAgICBpZiAoaXNPYmplY3QpIHtcbiAgICAgICAgaWYgKCFsaS5xdWVyeVNlbGVjdG9yKCd1bCcpKSB7XG4gICAgICAgICAgLy8gZG8gcmVjdXJzaW9uLCBvbiBkZW1hbmRcbiAgICAgICAgICBsaS5hcHBlbmRDaGlsZChLZXlMaXN0KHsgZGF0YTogbmV4dERhdGEsIHBhcmVudDogbGksIGRlcHRoOiBkZXB0aCArIDEgfSkpXG4gICAgICAgIH1cblxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IGxpLmNsYXNzTGlzdC50b2dnbGUoJ2otY2xvc2VkJyksIDMzMylcbiAgICAgICAgcmV0dXJuIG51bGxcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGV2ZW50Tm9kZVNlbGVjdGVkID0gbmV3IEN1c3RvbUV2ZW50KCdzZWxlY3RlZCcsIHtcbiAgICAgICAgICBidWJibGVzOiB0cnVlLCBjYW5jZWxhYmxlOiBmYWxzZSxcbiAgICAgICAgICBkZXRhaWw6IHsga2V5OiBrZXksIGRhdGE6IG5leHREYXRhLCBlbGVtZW50OiBsaSwgZGVwdGg6IGRlcHRoICsgMSwgaXNPYmplY3QsIGlzQXJyYXkgfSxcbiAgICAgICAgfSlcbiAgICAgICAgbGkuZGlzcGF0Y2hFdmVudChldmVudE5vZGVTZWxlY3RlZClcbiAgICAgICAgY29uc29sZS53YXJuKCdGaXJlZCBDdXN0b20gRXZlbnQ6ICcsIGV2ZW50Tm9kZVNlbGVjdGVkKVxuICAgICAgfVxuXG4gICAgICBjb25zb2xlLmluZm8oJ19jbGlja2VkLnRvZ2dsZWQnLCBrZXksIGxpKVxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IGRlc3Ryb3kgPSAoKSA9PiB7XG4gICAgbGlzdC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIF9jbGlja0hhbmRsZXIpXG4gICAgcmVtb3ZlTm9kZShsaXN0LnBhcmVudE5vZGUgPyBsaXN0LnBhcmVudE5vZGUgOiBsaXN0KVxuICB9XG5cbiAgaWYgKCFwYXJlbnQpIHtcbiAgICAvLyBhZGQgb25seSBhdCB0b3Agb2YgdHJlZSwgbWF5YmUgbW92ZSBvdXQgb2YgaGVyZSB1cCBhICdsYXllcidcbiAgICBsaXN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgX2NsaWNrSGFuZGxlcilcbiAgfVxuXG4gIHJldHVybiBPYmplY3QuYXNzaWduKGxpc3QsIHsgZGVzdHJveSB9KVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMva2V5LWxpc3QuanNcbiAqKi8iLCJleHBvcnQgY29uc3QgY29uZmlnID0ge1xuICBkZWJ1ZzogZmFsc2UsXG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9jb25maWcuanNcbiAqKi8iLCIvLyBqc2NzOmRpc2FibGUgc2FmZUNvbnRleHRLZXl3b3JkXG5cbi8qKlxuICogVXRpbGl0eSBhcnJheWlmeSBtZXRob2RcbiAqIEFkZCB0byAucHJvdG90eXBlIG9mIEl0ZXJhdG9ycywgQXJyYXlCdWZmZXIsIEFyZ3VtZW50cywgTm9kZUxpc3QsIFNldC9XZWFrU2V0LCB3aGF0ZXZlciAjWU9MT1xuICpcbiAqIC4uLiBPciBqdXN0IHVzZSBhcyB1dGlsLCBhcyBuZWVkZWQsICNKdXN0RG9JdFxuICpcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRvQXJyYXkobGlzdCkge1xuICBsaXN0ID0gQXJyYXkuaXNBcnJheShsaXN0KSA/IGxpc3QgOiB0aGlzXG4gIGxpc3QgPSAhbGlzdCA/IFtdIDogbGlzdFxuICByZXR1cm4gQXJyYXkuZnJvbSAmJiBBcnJheS5mcm9tKGxpc3QpIHx8IFsndXBncmFkZSB5b3VyIGJyb3dzZXIsIHBmZnQnXVxufVxuXG4vKipcbiAqIEdldCBgQXJyYXkuc29ydGAgZnVuY3Rpb24gZm9yIGtleSBuYW1lIGNvbXBhcmlzb25zIChzdXBwb3J0cyByZXZlcnNlKVxuICpcbiAqIFdoZW4gbmFtZSA9PT0gJ2VtYWlsICAgLS0tIFNvcnQgZW1haWwgYXNjZW5kaW5nLlxuICpcbiAqIFdoZW4gbmFtZSA9PT0gJy1lbWFpbCAgLS0tIFNvcnQgZW1haWwgZGVzY2VuZGluZ1xuICpcbiAqIEByZXR1cm5zIFtmdW5jdGlvbl0gY29tcGFyZXIgdXNlZCBpbiBgQXJyYXkuc29ydCgpYFxuICpcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFNvcnRlcihrZXkpIHtcbiAgY29uc3QgX2VuZ2xpc2hTb3J0ICAgICAgICAgPSAoYSwgYikgPT4gKGFba2V5XSA8IGJba2V5XSA/IC0xIDogKGFba2V5XSA+IGJba2V5XSA/IDEgOiAwKSlcbiAgY29uc3QgX2VuZ2xpc2hTb3J0UmV2ZXJzZWQgPSAoYSwgYikgPT4gKGFba2V5XSA+PSBiW2tleV0gPyAtMSA6IChhW2tleV0gPCBiW2tleV0gPyAxIDogMCkpXG5cbiAgaWYgKGtleVswXSA9PT0gJy0nKSB7XG4gICAga2V5ID0ga2V5LnN1YnN0cigxKTtcbiAgICByZXR1cm4gX2VuZ2xpc2hTb3J0UmV2ZXJzZWQ7XG4gIH1cblxuICByZXR1cm4gX2VuZ2xpc2hTb3J0O1xufVxuXG4vKipcbiAqXG4gKi9cbmV4cG9ydCBjb25zdCBTdHlsZXMgPSB7XG4gIGFkZDogKCkgPT4ge1xuICAgIGxldCBjc3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdzdHlsZSNqc29uLWVkaXRvcicpXG4gICAgaWYgKCFjc3MpIHtcbiAgICAgIGNvbnN0IHN0eWxlcyAgPSByZXF1aXJlKCchY3NzIWxlc3MhLi9zdHlsZS5sZXNzJylcbiAgICAgIGNzcyAgICAgICAgICAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpXG4gICAgICBjc3MuaWQgICAgICAgID0gJ2pzb24tZWRpdG9yJ1xuICAgICAgY3NzLmlubmVySFRNTCA9IHN0eWxlc1xuICAgICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChjc3MpXG4gICAgfVxuICB9LFxuXG4gIHJlbW92ZTogKCkgPT4ge1xuICAgIGxldCBjc3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdzdHlsZSNqc29uLWVkaXRvcicpXG4gICAgaWYgKGNzcyAmJiBjc3MucGFyZW50Tm9kZSkgeyBjc3MucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChjc3MpIH1cbiAgfSxcbn1cblxuLyoqXG4gKiBBY2NlcHRzIGVsZW1lbnRzIGZyb20gYGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGxgXG4gKlxuICogUmVtb3ZlcyBhbGwgY2hpbGRyZW4gb2YgQG5vZGVcbiAqXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVBbGwobm9kZSkge1xuICBpZiAodGhpcyBpbnN0YW5jZW9mIE5vZGVMaXN0KSB7IG5vZGUgPSB0aGlzOyB9XG5cbiAgdG9BcnJheShub2RlKVxuICAgIC5mb3JFYWNoKGVsID0+IGVsLnBhcmVudE5vZGUgJiYgZWwucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChlbCkpXG4gIHJldHVybiBub2RlXG59XG5cbi8qKlxuICogQWNjZXB0cyBFbGVtZW50IC8gTm9kZSBpc2ggb2JqZWN0cyAoaS5lLiBmcm9tIGBkb2N1bWVudC5xdWVyeVNlbGVjdG9yYClcbiAqXG4gKiBPbmx5IHJlbW92ZXMgQG5vZGUgKippZiBpdCBoYXMgYSB2YWxpZCBgcGFyZW50Tm9kZWAgY29udGV4dCoqXG4gKlxuICogQWx0ZXJuYXRlIHVzYWdlLCBwcm90b3R5cGUgb2YgTm9kZTpcbiAqIGBOb2RlLnByb3RvdHlwZS5yZW1vdmVOb2RlID0gcmVtb3ZlTm9kZTtgXG4gKlxuICovXG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlTm9kZShub2RlKSB7XG4gIGlmICh0aGlzIGluc3RhbmNlb2YgTm9kZSkgeyBub2RlID0gdGhpczsgfVxuXG4gIGlmIChub2RlLnBhcmVudE5vZGUgJiYgbm9kZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKSB7XG4gICAgbm9kZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKG5vZGUpXG4gIH1cblxuICByZXR1cm4gbm9kZVxufVxuXG4vKipcbiAqIFRvdGVzIG9idmlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldElkKHsgaWQsIF9pZCwga2V5IH0pIHsgcmV0dXJuIGlkIHx8IF9pZCB8fCBrZXk7IH1cblxuLyoqXG4gKlxuICovXG5leHBvcnQgY29uc3QgY2xvc2VzdCA9IChlbGVtLCBzZWxlY3RvciwgbGltaXQgPSBudWxsKSA9PiB7XG4gIGlmIChsaW1pdCAhPT0gbnVsbCAmJiBsaW1pdCA8PSAwKSB7IHJldHVybiBmYWxzZSB9XG5cbiAgcmV0dXJuICFlbGVtID8gbnVsbFxuICAgICAgICAgOiBlbGVtLm1hdGNoZXMgJiYgZWxlbS5tYXRjaGVzKHNlbGVjdG9yKVxuICAgICAgICAgPyBlbGVtIDogZWxlbS5jbGFzc0xpc3QgJiYgZWxlbS5jbGFzc0xpc3QuY29udGFpbnMoc2VsZWN0b3IpXG4gICAgICAgICA/IGVsZW0gOiBjbG9zZXN0KGVsZW0ucGFyZW50Tm9kZSwgc2VsZWN0b3IsIChsaW1pdCAhPT0gbnVsbCA/IGxpbWl0IC0gMSA6IGxpbWl0KSlcbn1cblxuLyoqXG4gKiB0b0Jvb2wgY29udmVydHMgYW55dGhpbmcgdG8gYSBib29sZWFuIC0gc2VlIGNvZGUgZm9yIGRldGFpbHNcbiAqL1xuZXhwb3J0IGNvbnN0IHRvQm9vbCA9IChzdHIpID0+IHtcbiAgaWYgKHR5cGVvZiBzdHIgPT09ICdib29sZWFuJykge1xuICAgIHJldHVybiBzdHJcbiAgfVxuXG4gIGlmICh0eXBlb2Ygc3RyID09PSAnc3RyaW5nJykge1xuICAgIHN0ciA9IChzdHIubGVuZ3RoID49IDEgPyBzdHIudG9VcHBlckNhc2UoKVswXSA6IHN0cilcbiAgICByZXR1cm4gWydZJywgJzEnLCAnVCddLmluZGV4T2Yoc3RyKSA9PT0gMFxuICB9XG5cbiAgcmV0dXJuIHN0ciA/IHRydWUgOiBmYWxzZVxufVxuXG4vKipcbiAqIFdhcm5pbmc6IFByaXZhdGUvbG9jYWwgdXNlIG9ubHkuIERvIG5vdCBob2lzdC5cbiAqICoqKiBVbnNhZmUgSFRNTC9zdHJpbmcgaGFuZGxpbmcgKioqXG4gKi9cbmV4cG9ydCBjb25zdCBjcmVhdGVFbGVtID0gaHRtbCA9PiB7XG4gIC8vIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKVxuICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICBkaXYuaW5uZXJIVE1MID0gaHRtbCAvLyBQb3RlbnRpYWwgU2VjdXJpdHkgRXhwbG9pdCBWZWN0b3IhISEhISFcbiAgcmV0dXJuIGRpdi5jaGlsZHJlbi5sZW5ndGggPT09IDEgPyBkaXYuY2hpbGRyZW5bMF0gOiBkaXZcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3V0aWwuanNcbiAqKi8iLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikoKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIi51bnNlbGVjdGFibGUge1xcbiAgdXNlci1zZWxlY3Q6IG5vbmU7XFxuICAtbW96LXVzZXItc2VsZWN0OiBub25lO1xcbiAgLXdlYmtpdC11c2VyLXNlbGVjdDogbm9uZTtcXG4gIC1tcy11c2VyLXNlbGVjdDogbm9uZTtcXG59XFxuLmoteHMtMSxcXG4uai14cy0yLFxcbi5qLXhzLTMsXFxuLmoteHMtNCxcXG4uai14cy01LFxcbi5qLXhzLTYsXFxuLmoteHMtNyxcXG4uai14cy04LFxcbi5qLXhzLTksXFxuLmoteHMtMTAsXFxuLmoteHMtMTEsXFxuLmoteHMtMTIge1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG59XFxuLmoteHMtMSB7XFxuICB3aWR0aDogOC4zMzMzJTtcXG59XFxuLmoteHMtMiB7XFxuICB3aWR0aDogMTYuNjY2NiU7XFxufVxcbi5qLXhzLTMge1xcbiAgd2lkdGg6IDI0Ljk5OTklO1xcbn1cXG4uai14cy00IHtcXG4gIHdpZHRoOiAzMy4zMzMyJTtcXG59XFxuLmoteHMtNSB7XFxuICB3aWR0aDogNDEuNjY2NSU7XFxufVxcbi5qLXhzLTYge1xcbiAgd2lkdGg6IDQ5Ljk5OTglO1xcbn1cXG4uai14cy03IHtcXG4gIHdpZHRoOiA1OC4zMzMxJTtcXG59XFxuLmoteHMtOCB7XFxuICB3aWR0aDogNjYuNjY2NCU7XFxufVxcbi5qLXhzLTkge1xcbiAgd2lkdGg6IDc0Ljk5OTclO1xcbn1cXG4uai14cy0xMCB7XFxuICB3aWR0aDogODMuMzMzMSU7XFxufVxcbi5qLXhzLTExIHtcXG4gIHdpZHRoOiA5MS42NjYzJTtcXG59XFxuLmoteHMtMTIge1xcbiAgd2lkdGg6IDk5Ljk5OTYlO1xcbn1cXG51bC5qLWtleXMge1xcbiAgd2lkdGg6IDI1MHB4O1xcbiAgbGlzdC1zdHlsZTogbm9uZTtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIHVzZXItc2VsZWN0OiBub25lO1xcbiAgLW1vei11c2VyLXNlbGVjdDogbm9uZTtcXG4gIC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7XFxuICAtbXMtdXNlci1zZWxlY3Q6IG5vbmU7XFxufVxcbnVsLmota2V5cyBsaSB7XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIG1pbi13aWR0aDogMjUwcHg7XFxuICBtaW4taGVpZ2h0OiAyMnB4O1xcbiAgdGV4dC1hbGlnbjogbGVmdDtcXG4gIHBhZGRpbmctbGVmdDogMTBweDtcXG4gIG1hcmdpbi1sZWZ0OiAtMzBweDtcXG59XFxudWwuai1rZXlzIC5qLWljb24tZWRpdCxcXG51bC5qLWtleXMgLmotaWNvbi1saXN0LFxcbnVsLmota2V5cyAuai1pY29uLWFycm93LWRvd24ge1xcbiAgem9vbTogNDAlO1xcbn1cXG51bC5qLWtleXMgbGk6bm90KC5qLWNsb3NlZCkgPiAuai1pY29uLWFycm93LWRvd24ge1xcbiAgdHJhbnNmb3JtOiByb3RhdGUoMGRlZykgIWltcG9ydGFudDtcXG59XFxudWwuai1rZXlzIC5qLWNsb3NlZCA+IHVsIHtcXG4gIGRpc3BsYXk6IG5vbmU7XFxufVxcbnVsLmota2V5cyAuai1jbG9zZWQ6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6ICcgJyAhaW1wb3J0YW50O1xcbn1cXG51bC5qLWtleXMgLmotY2xvc2VkID4gLmotaWNvbi1hcnJvdy1kb3duIHtcXG4gIHRyYW5zZm9ybTogcm90YXRlKC05MGRlZykgIWltcG9ydGFudDtcXG59XFxudWwuai1rZXlzIC5qLWljb24tcGx1czpiZWZvcmUge1xcbiAgY29udGVudDogJyAnO1xcbn1cXG51bC5qLWtleXMgLmotaWNvbi1saXN0OmJlZm9yZSB7XFxuICBjb250ZW50OiAnICc7XFxufVxcbnVsLmota2V5cyAuai1pY29uLXRleHQ6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6ICdcXFxcMjEzOSAgICcgIWltcG9ydGFudDtcXG59XFxudWwuai1rZXlzIC5qLWljb24tZGVmYXVsdDpiZWZvcmUge1xcbiAgY29udGVudDogJ1xcXFwxRjUyNCAgIFxcXFxGRTBGJyAhaW1wb3J0YW50O1xcbn1cXG51bC5qLWtleXMgLmotY3JlYXRlIHtcXG4gIGZvbnQtc3R5bGU6IGl0YWxpYztcXG59XFxuLmZpZWxkLWVkaXRvciB1bCB7XFxuICBsaXN0LXN0eWxlOiBub25lO1xcbn1cXG4uZmllbGQtZWRpdG9yIGZpZWxkc2V0IHtcXG4gIHdpZHRoOiAxMDAlO1xcbn1cXG5cIiwgXCJcIl0pO1xuXG4vLyBleHBvcnRzXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9jc3MtbG9hZGVyIS4vfi9sZXNzLWxvYWRlciEuL3NyYy9zdHlsZS5sZXNzXG4gKiogbW9kdWxlIGlkID0gNVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLypcclxuXHRNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxyXG5cdEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcclxuKi9cclxuLy8gY3NzIGJhc2UgY29kZSwgaW5qZWN0ZWQgYnkgdGhlIGNzcy1sb2FkZXJcclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcclxuXHR2YXIgbGlzdCA9IFtdO1xyXG5cclxuXHQvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXHJcblx0bGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xyXG5cdFx0dmFyIHJlc3VsdCA9IFtdO1xyXG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0dmFyIGl0ZW0gPSB0aGlzW2ldO1xyXG5cdFx0XHRpZihpdGVtWzJdKSB7XHJcblx0XHRcdFx0cmVzdWx0LnB1c2goXCJAbWVkaWEgXCIgKyBpdGVtWzJdICsgXCJ7XCIgKyBpdGVtWzFdICsgXCJ9XCIpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHJlc3VsdC5wdXNoKGl0ZW1bMV0pO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gcmVzdWx0LmpvaW4oXCJcIik7XHJcblx0fTtcclxuXHJcblx0Ly8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcclxuXHRsaXN0LmkgPSBmdW5jdGlvbihtb2R1bGVzLCBtZWRpYVF1ZXJ5KSB7XHJcblx0XHRpZih0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIilcclxuXHRcdFx0bW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgXCJcIl1dO1xyXG5cdFx0dmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcclxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciBpZCA9IHRoaXNbaV1bMF07XHJcblx0XHRcdGlmKHR5cGVvZiBpZCA9PT0gXCJudW1iZXJcIilcclxuXHRcdFx0XHRhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XHJcblx0XHR9XHJcblx0XHRmb3IoaSA9IDA7IGkgPCBtb2R1bGVzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciBpdGVtID0gbW9kdWxlc1tpXTtcclxuXHRcdFx0Ly8gc2tpcCBhbHJlYWR5IGltcG9ydGVkIG1vZHVsZVxyXG5cdFx0XHQvLyB0aGlzIGltcGxlbWVudGF0aW9uIGlzIG5vdCAxMDAlIHBlcmZlY3QgZm9yIHdlaXJkIG1lZGlhIHF1ZXJ5IGNvbWJpbmF0aW9uc1xyXG5cdFx0XHQvLyAgd2hlbiBhIG1vZHVsZSBpcyBpbXBvcnRlZCBtdWx0aXBsZSB0aW1lcyB3aXRoIGRpZmZlcmVudCBtZWRpYSBxdWVyaWVzLlxyXG5cdFx0XHQvLyAgSSBob3BlIHRoaXMgd2lsbCBuZXZlciBvY2N1ciAoSGV5IHRoaXMgd2F5IHdlIGhhdmUgc21hbGxlciBidW5kbGVzKVxyXG5cdFx0XHRpZih0eXBlb2YgaXRlbVswXSAhPT0gXCJudW1iZXJcIiB8fCAhYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xyXG5cdFx0XHRcdGlmKG1lZGlhUXVlcnkgJiYgIWl0ZW1bMl0pIHtcclxuXHRcdFx0XHRcdGl0ZW1bMl0gPSBtZWRpYVF1ZXJ5O1xyXG5cdFx0XHRcdH0gZWxzZSBpZihtZWRpYVF1ZXJ5KSB7XHJcblx0XHRcdFx0XHRpdGVtWzJdID0gXCIoXCIgKyBpdGVtWzJdICsgXCIpIGFuZCAoXCIgKyBtZWRpYVF1ZXJ5ICsgXCIpXCI7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGxpc3QucHVzaChpdGVtKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH07XHJcblx0cmV0dXJuIGxpc3Q7XHJcbn07XHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXG4gKiogbW9kdWxlIGlkID0gNlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLy8ganNjczpkaXNhYmxlIG1heGltdW1MaW5lTGVuZ3RoLCByZXF1aXJlUGFkZGluZ05ld0xpbmVzQmVmb3JlTGluZUNvbW1lbnRzXG5leHBvcnQgY29uc3QgYXJyb3dzID0ge1xuICAvLyB1cDogYDxzdmcgY2xhc3M9XCJqLWljb24tYXJyb3cgai1pY29uLWFycm93LXVwXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHhtbG5zOnhsaW5rPVwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGlua1wiIHN0eWxlPVwiaXNvbGF0aW9uOmlzb2xhdGVcIiB3aWR0aD1cIjg1XCIgaGVpZ2h0PVwiNDlcIj48cGF0aCBkPVwiTSA4MiA0NC45OTk5OTk5OTk5OTk5IEwgNDIuOTg3NDE4MTIyNDQ3MzggNC4wMjQxNTM4ODA1NjMzMDkgTSA0IDQ1IEwgNDIuOTg3NDE4MTIyNDQ3MjcgNFwiIHN0eWxlPVwiZmlsbDpub25lO3N0cm9rZTojMDAwMDAwO3N0cm9rZS13aWR0aDo0O3N0cm9rZS1saW5lY2FwOnJvdW5kO3N0cm9rZS1saW5lam9pbjpiZXZlbDtzdHJva2UtbWl0ZXJsaW1pdDozO1wiLz48L3N2Zz5gLFxuICBkb3duOiBgPHN2ZyBjbGFzcz1cImotaWNvbi1hcnJvdyBqLWljb24tYXJyb3ctZG93blwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB4bWxuczp4bGluaz1cImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmtcIiBzdHlsZT1cImlzb2xhdGlvbjppc29sYXRlXCIgd2lkdGg9XCIzM1wiIGhlaWdodD1cIjIyXCI+XG4gICAgPHBhdGggZD1cIk0gMjggNCBMIDE1Ljk5NjEyODY1MzA2MDc0IDE2Ljk5MjM0MTQ1MjUwNDMxIE0gNCA0IEwgMTUuOTk2MTI4NjUzMDYwNjgzIDE3XCIgc3R5bGU9XCJmaWxsOm5vbmU7c3Ryb2tlOiMwMDAwMDA7c3Ryb2tlLXdpZHRoOjg7c3Ryb2tlLWxpbmVjYXA6cm91bmQ7c3Ryb2tlLWxpbmVqb2luOmJldmVsO3N0cm9rZS1taXRlcmxpbWl0OjM7XCIvPlxuICA8L3N2Zz5gLFxuICAvLyByaWdodDogYDxzdmcgY2xhc3M9XCJqLWljb24tYXJyb3cgai1pY29uLWFycm93LXJpZ2h0XCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHhtbG5zOnhsaW5rPVwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGlua1wiIHN0eWxlPVwiaXNvbGF0aW9uOmlzb2xhdGVcIiB3aWR0aD1cIjUwXCIgaGVpZ2h0PVwiODRcIj48cGF0aCBkPVwiTSA0LjAwMDAwMDAwMDAwMDEyOCA4MCBMIDQ2IDQxLjQ5OTg5NjIwNDI2Nzc3IE0gNCAzIEwgNDUuOTk5OTk5OTk5OTk5ODQ0IDQxLjQ5OTg5NjIwNDI2NzczNVwiIHN0eWxlPVwiZmlsbDpub25lO3N0cm9rZTojMDAwMDAwO3N0cm9rZS13aWR0aDo0O3N0cm9rZS1saW5lY2FwOnJvdW5kO3N0cm9rZS1saW5lam9pbjpiZXZlbDtzdHJva2UtbWl0ZXJsaW1pdDozO1wiLz48L3N2Zz5gLFxuICAvLyBsZWZ0OiBgPHN2ZyBjbGFzcz1cImotaWNvbi1hcnJvdyBqLWljb24tYXJyb3ctbGVmdFwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB4bWxuczp4bGluaz1cImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmtcIiBzdHlsZT1cImlzb2xhdGlvbjppc29sYXRlXCIgd2lkdGg9XCI0OVwiIGhlaWdodD1cIjg2XCI+PHBhdGggZD1cIk0gNDQuOTk5OTk5OTk5OTk5ODkgODIgTCA0LjAyNDE1Mzg4MDU2MzMwOTUgNDIuOTg3NDE4MTIyNDQ3MzUgTSA0NSA0IEwgNCA0Mi45ODc0MTgxMjI0NDcyNDVcIiBzdHlsZT1cImZpbGw6bm9uZTtzdHJva2U6IzAwMDAwMDtzdHJva2Utd2lkdGg6NDtzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbGluZWpvaW46YmV2ZWw7c3Ryb2tlLW1pdGVybGltaXQ6MztcIi8+PC9zdmc+YCxcbn1cblxuZXhwb3J0IGNvbnN0IHV4ID0ge1xuICBhZGQ6IGA8c3ZnIHN0eWxlPVwiaXNvbGF0aW9uOmlzb2xhdGVcIiB3aWR0aD1cIjIwXCIgaGVpZ2h0PVwiMjBcIj5cbiAgICA8cGF0aCBkPVwiIE0gMCAwIEwgMjAgMCBMIDIwIDIwIEwgMCAyMCBMIDAgMCBaIFwiIGZpbGw9XCJyZ2JhKDAsMCwwLDApXCIgc3Ryb2tlLXdpZHRoPVwiMVwiIHN0cm9rZT1cInJnYmEoMCwwLDAsMClcIiBzdHJva2UtbGluZWNhcD1cImJ1dHRcIi8+XG4gICAgPHBhdGggZD1cIiBNIDExIDUgTCA5IDUgTCA5IDkgTCA1IDkgTCA1IDExIEwgOSAxMSBMIDkgMTUgTCAxMSAxNSBMIDExIDExIEwgMTUgMTEgTCAxNSA5IEwgMTEgOSBMIDExIDUgWiAgTSAxMCAwIEMgNC40OCAwIDAgNC40OCAwIDEwIEMgMCAxNS41MiA0LjQ4IDIwIDEwIDIwIEMgMTUuNTIgMjAgMjAgMTUuNTIgMjAgMTAgQyAyMCA0LjQ4IDE1LjUyIDAgMTAgMCBaICBNIDEwIDE4IEMgNS41OSAxOCAyIDE0LjQxIDIgMTAgQyAyIDUuNTkgNS41OSAyIDEwIDIgQyAxNC40MSAyIDE4IDUuNTkgMTggMTAgQyAxOCAxNC40MSAxNC40MSAxOCAxMCAxOCBaIFwiIGZpbGwtcnVsZT1cImV2ZW5vZGRcIiBmaWxsPVwicmdiKDAsMCwwKVwiIHN0cm9rZS13aWR0aD1cIjAuNVwiIHN0cm9rZT1cInJnYmEoMCwwLDAsMClcIiBzdHJva2UtbGluZWNhcD1cImJ1dHRcIi8+XG4gIDwvc3ZnPmAsXG4gIHBsdXM6IGA8c3ZnIGZpbGw9XCIjMDAwMDAwXCIgaGVpZ2h0PVwiMjRcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgd2lkdGg9XCIyNFwiPlxuICAgIDxwYXRoIGQ9XCJNMCAwaDI0djI0SDB6XCIgZmlsbD1cIm5vbmVcIi8+XG4gICAgPHBhdGggZD1cIk0xMyA3aC0ydjRIN3YyaDR2NGgydi00aDR2LTJoLTRWN3ptLTEtNUM2LjQ4IDIgMiA2LjQ4IDIgMTJzNC40OCAxMCAxMCAxMCAxMC00LjQ4IDEwLTEwUzE3LjUyIDIgMTIgMnptMCAxOGMtNC40MSAwLTgtMy41OS04LThzMy41OS04IDgtOCA4IDMuNTkgOCA4LTMuNTkgOC04IDh6XCIvPlxuICA8L3N2Zz5gLFxuICBjaGVjazogYDxzdmcgc3R5bGU9XCJpc29sYXRpb246aXNvbGF0ZVwiIHdpZHRoPVwiMjRcIiBoZWlnaHQ9XCIxOVwiPlxuICAgIDxwYXRoIGQ9XCIgTSAwIDAuMjUgTCAyNCAwLjI1IEwgMjQgMjQuMjUgTCAwIDI0LjI1IEwgMCAwLjI1IFogXCIgZmlsbD1cInJnYmEoMCwwLDAsMClcIiBzdHJva2Utd2lkdGg9XCIxXCIgc3Ryb2tlPVwicmdiYSgwLDAsMCwwKVwiIHN0cm9rZS1saW5lY2FwPVwiYnV0dFwiLz5cbiAgICA8cGF0aCBkPVwiIE0gNy42MjcwNjA4MzAwMTcwNTUgMTQuNjg1NDc0NzAxNTM0OTY0IEwgMS45Mzc0NjQ0Njg0NDc5ODIgOC45OTU4NzgzMzk5NjU4ODggTCAwIDEwLjkxOTY5ODY5MjQzODg4NSBMIDcuNjI3MDYwODMwMDE3MDU1IDE4LjU0Njc1OTUyMjQ1NTk0IEwgMjQgMi4xNzM4MjAzNTI0NzI5OTU4IEwgMjIuMDc2MTc5NjQ3NTI3MDAyIDAuMjUgTCA3LjYyNzA2MDgzMDAxNzA1NSAxNC42ODU0NzQ3MDE1MzQ5NjQgWiBcIiBmaWxsPVwicmdiKDAsMCwwKVwiIHN0cm9rZS13aWR0aD1cIjFcIiBzdHJva2U9XCJyZ2JhKDAsMCwwLDApXCIgc3Ryb2tlLWxpbmVjYXA9XCJidXR0XCIvPlxuICA8L3N2Zz5gLFxuICBsaXN0OiBgPHN2ZyBjbGFzcz1cImotaWNvbi1saXN0XCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHhtbG5zOnhsaW5rPVwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGlua1wiIHN0eWxlPVwiaXNvbGF0aW9uOmlzb2xhdGVcIiB3aWR0aD1cIjI0XCIgaGVpZ2h0PVwiMTMuM1wiPlxuICAgIDxwYXRoIGQ9XCIgTSAwIDggTCAyLjYgOCBMIDIuNiA1LjMgTCAwIDUuMyBMIDAgOCBaICBNIDAgMTMuMyBMIDIuNiAxMy4zIEwgMi42IDEwLjYgTCAwIDEwLjYgTCAwIDEzLjMgWiAgTSAwIDIuNiBMIDIuNiAyLjYgTCAyLjYgMCBMIDAgMCBMIDAgMi42IFogIE0gNS4zIDggTCAyNCA4IEwgMjQgNS4zIEwgNS4zIDUuMyBMIDUuMyA4IFogIE0gNS4zIDEzLjMgTCAyNCAxMy4zIEwgMjQgMTAuNiBMIDUuMyAxMC42IEwgNS4zIDEzLjMgWiAgTSA1LjMgMCBMIDUuMyAyLjYgTCAyNCAyLjYgTCAyNCAwIEwgNS4zIDAgWlwiXG4gICAgIGZpbGwtcnVsZT1cImV2ZW5vZGRcIiBmaWxsPVwicmdiKDAsMCwwKVwiIHN0cm9rZS13aWR0aD1cIjEuNVwiIHN0cm9rZT1cInJnYmEoMCwwLDAsMClcIiBzdHJva2UtbGluZWNhcD1cImJ1dHRcIi8+XG4gICAgPHBhdGggZD1cIiBNIDAgMCBMIDM2IDAgTCAzNiAzNiBMIDAgMzYgTCAwIDAgWiBcIiBmaWxsPVwicmdiYSgwLDAsMCwwKVwiIHN0cm9rZS13aWR0aD1cIjEuNVwiIHN0cm9rZT1cInJnYmEoMCwwLDAsMClcIiBzdHJva2UtbGluZWNhcD1cImJ1dHRcIi8+XG4gIDwvc3ZnPmAsXG4gIGVkaXQ6IGA8c3ZnIGNsYXNzPVwiai1pY29uLWVkaXRcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgeG1sbnM6eGxpbms9XCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rXCIgc3R5bGU9XCJpc29sYXRpb246aXNvbGF0ZVwiIHdpZHRoPVwiMjRcIiBoZWlnaHQ9XCIyNFwiPlxuICAgIDxwYXRoIGQ9XCIgTSAtNC40NDA4IDE5LjAwMDYgTCAtNC40NDA4IDI0IEwgNC45OTkzIDI0IEwgMTkuNzQzOSA5LjI1NTMgTCAxNC43NDQ2IDQuMjU2MCBMIC00LjQ0MDggMTkuMDAwNiBaICBNIDIzLjYxIDUuMzg5MiBDIDI0LjEyOTkgNC44NjkzIDI0LjEyOTkgNC4wMjk0IDIzLjYxIDMuNTA5NSBMIDIwLjQ5IDAuMzg5OSBDIDE5Ljk3MDUgLTAuMTI5OSAxOS4xMzA2IC0wLjEyOTkgMTguNjEwNyAwLjM4OTkgTCAxNi4xNzEgMi44Mjk2IEwgMjEuMTcwMyA3LjgyODkgTCAyMy42MSA1LjM4OTIgWlwiXG4gICAgICBmaWxsLXJ1bGU9XCJldmVub2RkXCIgZmlsbD1cInJnYigwLDAsMClcIiBzdHJva2Utd2lkdGg9XCIxLjUwXCIgc3Ryb2tlPVwicmdiYSgwLDAsMCwwKVwiIHN0cm9rZS1saW5lY2FwPVwiYnV0dFwiLz5cbiAgICA8cGF0aCBkPVwiIE0gMCAwIEwgMzUgMCBMIDM1IDM1IEwgMCAzNSBMIDAgMCBaIFwiIGZpbGw9XCJyZ2JhKDAsMCwwLDApXCIgc3Ryb2tlLXdpZHRoPVwiMS41XCIgc3Ryb2tlPVwicmdiYSgwLDAsMCwwKVwiIHN0cm9rZS1saW5lY2FwPVwiYnV0dFwiLz5cbiAgPC9zdmc+YCxcbiAgLy8gZWRpdExpbmU6IGA8c3ZnIGNsYXNzPVwiai1pY29uLWVkaXQtbGluZVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB4bWxuczp4bGluaz1cImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmtcIiBzdHlsZT1cImlzb2xhdGlvbjppc29sYXRlXCIgd2lkdGg9XCIzNlwiIGhlaWdodD1cIjM2XCI+PHBhdGggZD1cIiBNIDI2LjYyIDEwLjUwIEwgMjEgNC44NyBMIDYgMTkuODcgTCA2IDI1LjUwIEwgMTEuNjIgMjUuNSBMIDI2LjYgMTAuNSBaICBNIDMxLjA2IDYuMDYgQyAzMS42NSA1LjQ3IDMxLjY1IDQuNTMzNzUgMzEuMDY1IDMuOTQgTCAyNy41NTUgMC40MyBDIDI2Ljk3IC0wLjE0IDI2LjAyMiAtMC4xNCAyNS40NCAwLjQzIEwgMjIuNSAzLjM3IEwgMjguMTI1IDkgTCAzMS4wNjUgNi4wNiBaIFwiIGZpbGwtcnVsZT1cImV2ZW5vZGRcIiBmaWxsPVwicmdiKDAsMCwwKVwiIHN0cm9rZS13aWR0aD1cIjEuNVwiIHN0cm9rZT1cInJnYmEoMCwwLDAsMClcIiBzdHJva2UtbGluZWNhcD1cImJ1dHRcIi8+PHBhdGggZD1cIiBNIDAgMCBMIDM2IDAgTCAzNiAzNiBMIDAgMzYgTCAwIDAuMDAzNzQ5OTk5OTk5OTk5OTIgWiBcIiBmaWxsPVwicmdiYSgwLDAsMCwwKVwiIHN0cm9rZS13aWR0aD1cIjEuNVwiIHN0cm9rZT1cInJnYmEoMCwwLDAsMClcIiBzdHJva2UtbGluZWNhcD1cImJ1dHRcIi8+PHBhdGggZD1cIiBNIDAgMzAgTCAzNiAzMCBMIDM2IDM2IEwgMCAzNiBMIDAgMzAgWiBcIiBmaWxsPVwicmdiKDAsMCwwKVwiIGZpbGwtb3BhY2l0eT1cIjAuNFwiIHN0cm9rZS13aWR0aD1cIjEuNVwiIHN0cm9rZT1cInJnYmEoMCwwLDAsMClcIiBzdHJva2UtbGluZWNhcD1cImJ1dHRcIi8+PC9zdmc+YCxcbn1cbi8vIGpzY3M6ZW5hYmxlIG1heGltdW1MaW5lTGVuZ3RoXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9zdmctaWNvbnMuanNcbiAqKi8iLCJleHBvcnQge0N1c3RvbUV2ZW50fTtcblxuZnVuY3Rpb24gQ3VzdG9tRXZlbnQoZXZlbnQsIHBhcmFtcyA9IHsgYnViYmxlczogZmFsc2UsIGNhbmNlbGFibGU6IGZhbHNlLCBkZXRhaWw6IHVuZGVmaW5lZCB9KSB7XG4gIHZhciBldnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnQ3VzdG9tRXZlbnQnKTtcbiAgZXZ0LmluaXRDdXN0b21FdmVudChldmVudCwgcGFyYW1zLmJ1YmJsZXMsIHBhcmFtcy5jYW5jZWxhYmxlLCBwYXJhbXMuZGV0YWlsKTtcbiAgcmV0dXJuIGV2dDtcbn1cblxuaWYgKHdpbmRvdyAmJiB0eXBlb2Ygd2luZG93LkN1c3RvbUV2ZW50ICE9PSAnZnVuY3Rpb24nKSB7XG4gIHdpbmRvdy5DdXN0b21FdmVudCA9IEN1c3RvbUV2ZW50O1xuICBDdXN0b21FdmVudC5wcm90b3R5cGUgPSB3aW5kb3cuRXZlbnQucHJvdG90eXBlO1xufVxuXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9jdXN0b20tZXZlbnQuanNcbiAqKi8iLCJpbXBvcnQgeyBjcmVhdGVFbGVtLCBjbG9zZXN0LCByZW1vdmVBbGwsIHJlbW92ZU5vZGUsIHRvQm9vbCB9IGZyb20gJy4vdXRpbCdcblxuZXhwb3J0IGZ1bmN0aW9uIEZpZWxkRWRpdG9yKHsga2V5LCBub2RlLCBlbGVtLCBwYXJlbnQgPSBudWxsLCBwYXRoID0gW10sIHR5cGUgPSAnc3RyaW5nJywgZGVwdGggPSAwIH0pIHtcblxuICBjb25zdCBnZXRBcnJheUJ1dHRvbnMgPSAoe2lkeCA9IC0xfSkgPT4gY3JlYXRlRWxlbShgPGRpdiBjbGFzcz1cImotYXJyYXktYnV0dG9uc1wiPlxuICAgIDxidXR0b24gYWN0aW9uPVwiYWRkXCIgaWR4PVwiJHtpZHh9XCI+KzwvYnV0dG9uPlxuICAgIDxidXR0b24gYWN0aW9uPVwicmVtb3ZlXCIgaWR4PVwiJHtpZHh9XCI+LTwvYnV0dG9uPlxuICA8L2Rpdj5gKVxuICBjb25zdCBmb3JtID0gY3JlYXRlRWxlbShgPHNlY3Rpb24gY2xhc3M9XCJqLWVkaXQgai1zaWRlIHRleHQtbGVmdFwiIGtleT1cIiR7a2V5fVwiIHR5cGU9XCIke3R5cGV9XCIgZGVwdGg9XCIke2RlcHRofVwiIHBhdGg9XCIke0FycmF5LmlzQXJyYXkocGF0aCkgPyBwYXRoLmpvaW4oJzo6JykgOiBwYXRofVwiPlxuICAgIDxmb3JtIGNsYXNzPVwiZmllbGQtZWRpdG9yXCI+XG4gICAgICA8ZmllbGRzZXQ+XG4gICAgICAgIDxsYWJlbD5OYW1lPC9sYWJlbD5cbiAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cIm5hbWVcIiBjbGFzcz1cIm5hbWVcIiB2YWx1ZT1cIiR7a2V5fVwiIC8+XG4gICAgICA8L2ZpZWxkc2V0PlxuICAgICAgPGZpZWxkc2V0PlxuICAgICAgICA8bGFiZWw+VHlwZTwvbGFiZWw+XG4gICAgICAgIDxzZWxlY3Qgcm93cz1cIjFcIiBuYW1lPVwidHlwZVwiPlxuICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJzdHJpbmdcIj50ZXh0PC9vcHRpb24+XG4gICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cImJvb2xlYW5cIj55ZXMvbm88L29wdGlvbj5cbiAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwibnVtYmVyXCI+bnVtYmVyPC9vcHRpb24+XG4gICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIm9iamVjdFwiPm9iamVjdC9oYXNoL21hcC9rZXktdmFsPC9vcHRpb24+XG4gICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cImFycmF5XCI+bGlzdDwvb3B0aW9uPlxuICAgICAgICA8L3NlbGVjdD5cbiAgICAgIDwvZmllbGRzZXQ+XG4gICAgICA8ZmllbGRzZXQ+XG4gICAgICAgIDxsYWJlbD5WYWx1ZTwvbGFiZWw+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ2YWx1ZUVkaXRvclBsYWNlaG9sZGVyXCI+PC9kaXY+XG4gICAgICAgIDwhLS0gQXJyYXkgYnV0dG9ucyBnbyBoZXJlIC0tPlxuICAgICAgPC9maWVsZHNldD5cbiAgICAgIDxmaWVsZHNldD5cbiAgICAgICAgPGJ1dHRvbiB0eXBlPVwic3VibWl0XCI+U2F2ZTwvYnV0dG9uPlxuICAgICAgICA8YnV0dG9uIHR5cGU9XCJyZXNldFwiPkNhbmNlbDwvYnV0dG9uPlxuICAgICAgICA8c3Ryb25nPjwvc3Ryb25nPlxuICAgICAgPC9maWVsZHNldD5cbiAgICA8L2Zvcm0+XG4gIDwvc2VjdGlvbj5gKVxuXG4gIHZhciB2YWx1ZSAgICAgICAgID0gbm9kZVtrZXldXG4gIGNvbnN0IHByZXZWYWxzICAgID0ge31cbiAgY29uc3QgZ2V0VmFsdWUgICAgPSAoKSA9PiBnZXRWYWx1ZUZsZCgpLnZhbHVlXG4gIGNvbnN0IGdldFZhbHVlRmxkID0gKCkgPT4gZm9ybS5xdWVyeVNlbGVjdG9yKCcuZmllbGQtdmFsdWUnKSB8fCB7IHZhbHVlOiBmYWxzZSB9XG4gIGNvbnN0IGdldFR5cGUgICAgID0gKCkgPT4gZmxkVHlwZS52YWx1ZVxuICBjb25zdCBmbGROYW1lICAgICA9IGZvcm0ucXVlcnlTZWxlY3RvcignaW5wdXRbbmFtZT1cIm5hbWVcIl0nKVxuICBjb25zdCBmbGRUeXBlICAgICA9IGZvcm0ucXVlcnlTZWxlY3Rvcignc2VsZWN0W25hbWU9XCJ0eXBlXCJdJylcbiAgY29uc3QgcGxhY2Vob2xkZXIgPSBmb3JtLnF1ZXJ5U2VsZWN0b3IoJy52YWx1ZUVkaXRvclBsYWNlaG9sZGVyJylcblxuICAvLyBpbml0aWFsaXplIHZhbHVlIHRyYWNrZXIgKGZvciBsb2NhbCAndHlwZScgY2hhbmdlcylcbiAgcHJldlZhbHNbdHlwZV0gICAgPSB2YWx1ZVxuXG4gIC8vIHNldCB2YWx1ZSB3LyBkZWZhdWx0XG4gIGZsZFR5cGUudmFsdWUgICAgID0gdHlwZVxuXG4gIC8vIGRlZmluZSBoZWxwZXJzLCBlLmcuIGJ1aWxkIGZpZWxkLCB0cmFuc2l0aW9uIHN0YXRlIChha2EgY29udmVydClcbiAgY29uc3QgYmFzaWNUeXBlcyA9IFsnc3RyaW5nJywgJ251bWJlcicsICdib29sZWFuJ11cblxuICBjb25zdCBnZXRUeXBlTmFtZSA9ICh4KSA9PiBBcnJheS5pc0FycmF5KHgpID8gJ2FycmF5JyA6IHR5cGVvZiB4XG5cbiAgY29uc3QgZ2V0VmFsdWVGaWVsZEVsZW0gPSAoX3ZhbHVlID0gZ2V0VmFsdWUoKSwgcmVuZGVyQXJyYXlzID0gdHJ1ZSkgPT4ge1xuICAgIGNvbnN0IHR5cGVOYW1lID0gZ2V0VHlwZU5hbWUoX3ZhbHVlKVxuICAgIGNvbnNvbGUudHJhY2UoJyAgIFxcdEdlbkZpZWxkKCcsIGtleSwgJywgJywgX3ZhbHVlLCAnKScsIHR5cGVOYW1lKVxuXG4gICAgaWYgKHR5cGVOYW1lID09PSAnc3RyaW5nJykge1xuICAgICAgcmV0dXJuIGNyZWF0ZUVsZW0oYDxpbnB1dCB0eXBlPSd0ZXh0JyBqcy10eXBlPScke3R5cGVOYW1lfScgY2xhc3M9J2ZpZWxkLXZhbHVlJyBuYW1lPSdmaWVsZC12YWx1ZScgdmFsdWU9JyR7X3ZhbHVlfScgLz5gKVxuICAgIH0gZWxzZSBpZiAodHlwZU5hbWUgPT09ICdudW1iZXInKSB7XG4gICAgICByZXR1cm4gY3JlYXRlRWxlbShgPGlucHV0IHR5cGU9J251bWJlcicganMtdHlwZT0nJHt0eXBlTmFtZX0nIGNsYXNzPSdmaWVsZC12YWx1ZScgbmFtZT0nZmllbGQtdmFsdWUnIHZhbHVlPScke192YWx1ZX0nIC8+YClcbiAgICB9IGVsc2UgaWYgKHR5cGVOYW1lID09PSAnYm9vbGVhbicpIHtcbiAgICAgIHJldHVybiBjcmVhdGVFbGVtKGA8aW5wdXQgdHlwZT0nY2hlY2tib3gnIGpzLXR5cGU9JyR7dHlwZU5hbWV9JyBjbGFzcz0nZmllbGQtdmFsdWUnIG5hbWU9J2ZpZWxkLXZhbHVlJyB2YWx1ZT0nY2hlY2tlZCcke192YWx1ZSA/ICcgY2hlY2tlZCcgOiAnJ30nIC8+YClcbiAgICB9IGVsc2UgaWYgKHR5cGVOYW1lID09PSAnYXJyYXknICYmIHJlbmRlckFycmF5cykge1xuICAgICAgcmV0dXJuIF92YWx1ZS5yZWR1Y2UoKGVsZW0sIHZhbCwgaWR4KSA9PiB7XG4gICAgICAgIGxldCBsaSA9IGNyZWF0ZUVsZW0oYDxsaSBpZHg9XCIke2lkeH1cIj4ke3R5cGVvZiB2YWwgPT09ICdzdHJpbmcnID8gdmFsKyc6ICcgOiAnJ308L2xpPmApXG4gICAgICAgIC8vIHNlZSBpZiB0eXBlIG9mIGFycmF5IGl0ZW1zIGlzIHNpbXBsZSBlbm91Z2ggdG8gc2hvdyB2YWx1ZS9pbnB1dCBmaWVsZFxuICAgICAgICBpZiAoYmFzaWNUeXBlcy5pbmRleE9mKGdldFR5cGVOYW1lKHZhbCkpIDw9IC0xKSB7XG4gICAgICAgICAgbGkuYXBwZW5kQ2hpbGQoY3JlYXRlRWxlbShgPHRleHRhcmVhIGpzLXR5cGU9JyR7dHlwZU5hbWV9JyBwYXRoPScke2lkeH0nIGNsYXNzPSdmaWVsZC12YWx1ZSBqc29uLXZhbHVlJyByb3dzPSc3Jz4ke0pTT04uc3RyaW5naWZ5KHZhbCwgbnVsbCwgMil9PC90ZXh0YXJlYT5gKSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBsaS5hcHBlbmRDaGlsZChnZXRWYWx1ZUZpZWxkRWxlbSh2YWwsIGZhbHNlKSlcbiAgICAgICAgfVxuICAgICAgICBlbGVtLmFwcGVuZENoaWxkKGxpKVxuICAgICAgICByZXR1cm4gZWxlbVxuICAgICAgfSwgZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKSlcbiAgICAgIC8vIHJldHVybiBjcmVhdGVFbGVtKGA8aW5wdXQgdHlwZT0nY2hlY2tib3gnIGpzLXR5cGU9JyR7dHlwZU5hbWV9JyBjbGFzcz0nZmllbGQtdmFsdWUnIG5hbWU9J2ZpZWxkLXZhbHVlJyB2YWx1ZT0nY2hlY2tlZCcke192YWx1ZSA/ICcgY2hlY2tlZCcgOiAnJ30nIC8+YClcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGNyZWF0ZUVsZW0oYDxzcGFuIGNsYXNzPVwiaGFzLWVycm9yXCI+PGlucHV0IHR5cGU9J3RleHQnIGpzLXR5cGU9JyR7dHlwZU5hbWV9JyBjbGFzcz0nZmllbGQtdmFsdWUnIG5hbWU9J2ZpZWxkLXZhbHVlJyB2YWx1ZT0nJHtKU09OLnN0cmluZ2lmeShfdmFsdWUsIG51bGwsIDIpfScgLz48L3NwYW4+YClcbiAgICB9XG4gIH1cblxuICBjb25zdCBjb252ZXJ0ID0gKHsgdmFsdWUsIHR5cGUgfSkgPT4ge1xuICAgIGNvbnN0IGpzb25QYXR0ZXJuID0gL15cXHMqKFxce3xcXFspLiooXFxdfFxcfSlcXHMqJC9nO1xuICAgIGNvbnN0IGlzSnNvbiA9IHMgPT4ganNvblBhdHRlcm4udGVzdChzKVxuICAgIGNvbnN0IGN1cnJUeXBlID0gZ2V0VHlwZU5hbWUodmFsdWUpXG4gICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICBjYXNlICdzdHJpbmcnOlxuICAgICAgICBzd2l0Y2ggKGN1cnJUeXBlKSB7XG4gICAgICAgICAgY2FzZSAnc3RyaW5nJzogIHJldHVybiB2YWx1ZVxuICAgICAgICAgIGNhc2UgJ2Jvb2xlYW4nOiByZXR1cm4gdmFsdWVcbiAgICAgICAgICBjYXNlICdhcnJheSc6ICAgcmV0dXJuIHR5cGVvZiB2YWx1ZVswXSA9PT0gJ3N0cmluZycgPyB2YWx1ZS5qb2luKCdcXHQnKSA6IEpTT04uc3RyaW5naWZ5KHZhbHVlKVxuICAgICAgICAgIGNhc2UgJ29iamVjdCc6ICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodmFsdWUpXG4gICAgICAgICAgZGVmYXVsdDogICAgICAgIHJldHVybiB2YWx1ZVxuICAgICAgICB9XG4gICAgICBjYXNlICdudW1iZXInOlxuICAgICAgICBzd2l0Y2ggKGN1cnJUeXBlKSB7XG4gICAgICAgICAgY2FzZSAnc3RyaW5nJzogcmV0dXJuIHBhcnNlRmxvYXQodmFsdWUpXG4gICAgICAgICAgY2FzZSAnYm9vbGVhbic6IHJldHVybiB2YWx1ZSA/IDEgOiAwXG4gICAgICAgICAgY2FzZSAnYXJyYXknOiByZXR1cm4gLTFcbiAgICAgICAgICBjYXNlICdvYmplY3QnOiByZXR1cm4gLTFcbiAgICAgICAgICBkZWZhdWx0OiAgICAgICByZXR1cm4gLTk5XG4gICAgICAgIH1cbiAgICAgIGNhc2UgJ2Jvb2xlYW4nOlxuICAgICAgICByZXR1cm4gdG9Cb29sKHZhbHVlKVxuICAgICAgY2FzZSAnYXJyYXknOlxuICAgICAgICBzd2l0Y2ggKGN1cnJUeXBlKSB7XG4gICAgICAgICAgY2FzZSAnc3RyaW5nJzogcmV0dXJuIGlzSnNvbih2YWx1ZSkgPyBKU09OLnBhcnNlKHZhbHVlKSA6IHZhbHVlLnNwbGl0KC9cXHMrLylcbiAgICAgICAgICBjYXNlICdib29sZWFuJzogcmV0dXJuIFt2YWx1ZV1cbiAgICAgICAgICBjYXNlICdhcnJheSc6IHJldHVybiB2YWx1ZVxuICAgICAgICAgIGNhc2UgJ29iamVjdCc6IHJldHVybiBbdmFsdWVdXG4gICAgICAgICAgZGVmYXVsdDogICAgICAgcmV0dXJuIFtdXG4gICAgICAgIH1cbiAgICAgIGNhc2UgJ29iamVjdCc6XG4gICAgICAgIHN3aXRjaCAoY3VyclR5cGUpIHtcbiAgICAgICAgICBjYXNlICdzdHJpbmcnOiByZXR1cm4gaXNKc29uKHZhbHVlKSA/IEpTT04ucGFyc2UodmFsdWUpIDoge3ZhbHVlfVxuICAgICAgICAgIGNhc2UgJ2Jvb2xlYW4nOiByZXR1cm4ge3ZhbHVlfVxuICAgICAgICAgIGNhc2UgJ2FycmF5JzogcmV0dXJuIHt2YWx1ZX1cbiAgICAgICAgICBjYXNlICdvYmplY3QnOiByZXR1cm4gdmFsdWVcbiAgICAgICAgICBkZWZhdWx0OiAgICAgICByZXR1cm4ge31cbiAgICAgICAgfVxuICAgIH1cbiAgICBjb25zb2xlLmVycm9yKCdGYWlsZWQgdG8gTWF0Y2ggVHlwZTogJywgdHlwZSwgY3VyclR5cGUsIHZhbHVlKVxuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuXG4gIGNvbnN0IHVwZGF0ZVZhbHVlRmllbGQgPSAodikgPT4ge1xuICAgIGNvbnN0IG5ld1R5cGUgPSBmbGRUeXBlLnZhbHVlXG4gICAgY29uc3QgbmV3VmFsICA9IGNvbnZlcnQoeyB2YWx1ZTogdiB8fCBnZXRDdXJyZW50VmFsdWUoKSwgdHlwZTogbmV3VHlwZSB9KVxuICAgIGNvbnN0IG5ld0ZsZCAgPSBnZXRWYWx1ZUZpZWxkRWxlbShuZXdWYWwpXG4gICAgcmVtb3ZlQWxsKHBsYWNlaG9sZGVyLmNoaWxkcmVuKVxuICAgIGNvbnNvbGUuZXJyb3IoJ3BsYWNlaG9sZGVyIGVtcHR5PycsIHBsYWNlaG9sZGVyLmNoaWxkcmVuKVxuICAgIGNvbnNvbGUuZXJyb3IoJ3VwZGF0ZVZhbHVlRmllbGQnLCBnZXRWYWx1ZSgpLCBnZXRDdXJyZW50VmFsdWUoKSlcbiAgICBwbGFjZWhvbGRlci5hcHBlbmRDaGlsZChuZXdGbGQpXG4gICAgcmV0dXJuIG5ld0ZsZFxuICB9XG5cbiAgLy8gZGVmaW5lIGV2ZW50cywgb25UeXBlQ2hhbmdlZCwgb25TYXZlLCBvbkNhbmNlbFxuICBjb25zdCBvblR5cGVDaGFuZ2VkID0gKHsgdGFyZ2V0IH0pID0+IHtcbiAgICBjb25zdCBuZXdUeXBlID0gZmxkVHlwZS52YWx1ZVxuICAgIGNvbnN0IG9sZFZhbCAgPSBnZXRDdXJyZW50VmFsdWUoKVxuICAgIHJlbW92ZUFsbChwbGFjZWhvbGRlci5jaGlsZHJlbilcbiAgICBjb25zb2xlLndhcm4oYFR5cGUgQ2hhbmdlZCEhIE9yaWdpbmFsVHlwZT0ke3R5cGV9IFZhbD0ke29sZFZhbH0gYCwgYXJndW1lbnRzKVxuICAgIHVwZGF0ZVZhbHVlRmllbGQoKVxuICB9XG5cbiAgY29uc3QgZ2V0Q3VycmVudFZhbHVlID0gKCkgPT4ge1xuICAgIGxldCBmaWVsZHMgID0gcGxhY2Vob2xkZXIucXVlcnlTZWxlY3RvckFsbCgnaW5wdXQsIHRleHRhcmVhJylcblxuICAgIGxldCByZXN1bHRzID0gQXJyYXkuZnJvbShmaWVsZHMpLm1hcCgoZiwgaSwgYSkgPT4ge1xuICAgICAgdmFyIHYgPSBmLnZhbHVlO1xuICAgICAgbGV0IGpzVHlwZSA9IGYuZ2V0QXR0cmlidXRlKCdqcy10eXBlJylcbiAgICAgIHRyeSB7XG4gICAgICAgIGlmIChmLmNsYXNzTGlzdC5jb250YWlucygnanNvbi12YWx1ZScpKSB7XG4gICAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UodilcbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZSkgeyBjb25zb2xlLmVycm9yKCdGQUlMRUQgVE8gQ09OVkVSVCBKU09OOicsIGUpIH1cbiAgICAgIGNvbnNvbGUud2FybignZ2V0Q3VycmVudFZhbHVlOicsIGpzVHlwZSwgdilcbiAgICAgIHYgPSBjb252ZXJ0KHt2YWx1ZTogdiwgdHlwZToganNUeXBlfSlcbiAgICAgIGNvbnNvbGUud2FybignVjonLCB2KVxuICAgICAgcmV0dXJuIHZcbiAgICB9KVxuXG4gICAgcmV0dXJuIHR5cGUgIT09ICdhcnJheScgPyByZXN1bHRzWzBdIDogcmVzdWx0c1xuICB9XG5cbiAgY29uc3Qgb25TYXZlID0gKGUpID0+IHtcbiAgICAvLyBjb25zdCB7IHRhcmdldCwgZGV0YWlsLCBwcmV2ZW50RGVmYXVsdCB9ID0gZTtcbiAgICBjb25zdCBvbGROYW1lID0ga2V5LFxuICAgICAgICAgIG5ld05hbWUgPSBmbGROYW1lLnZhbHVlLFxuICAgICAgICAgIG9sZFR5cGUgPSB0eXBlLFxuICAgICAgICAgIG5ld1R5cGUgPSBmbGRUeXBlLnZhbHVlLFxuICAgICAgICAgIG9sZFZhbHVlID0gdmFsdWUsXG4gICAgICAgICAgbmV3VmFsdWUgPSBnZXRWYWx1ZSgpXG4gICAgY29uc3QgbmFtZUNoYW5nZWQgID0gb2xkTmFtZSAgIT09IG5ld05hbWUsXG4gICAgICAgICAgdHlwZUNoYW5nZWQgID0gb2xkVHlwZSAgIT09IG5ld1R5cGUsXG4gICAgICAgICAgdmFsdWVDaGFuZ2VkID0gb2xkVmFsdWUgIT09IG5ld1ZhbHVlXG4gICAgY29uc3QgY2hhbmdlZCA9IG5hbWVDaGFuZ2VkIHx8IHR5cGVDaGFuZ2VkIHx8IHZhbHVlQ2hhbmdlZFxuXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpXG5cbiAgICBpZiAoY2hhbmdlZCkge1xuICAgICAgY29uc29sZS53YXJuKGBDSEFOR0VEISBQQVRIPSR7cGF0aH0gVmFsdWU9YCwgZ2V0Q3VycmVudFZhbHVlKCkpXG4gICAgICBjb25zb2xlLndhcm4oYFNhdmluZyBjaGFuZ2VzLi4uICgke29sZE5hbWV9OiR7b2xkVmFsdWV9ID0+ICR7bmV3TmFtZX06JHtuZXdWYWx1ZX0pIG5hbWVDaGFuZ2VkPSR7bmFtZUNoYW5nZWR9IHR5cGVDaGFuZ2VkPSR7dHlwZUNoYW5nZWR9IHZhbHVlQ2hhbmdlZD0ke3ZhbHVlQ2hhbmdlZH0gXFxuQXJncz1cXG5gLCBhcmd1bWVudHMpXG4gICAgICBpZiAobmFtZUNoYW5nZWQpIHtcbiAgICAgICAgbm9kZVtuZXdOYW1lXSA9IG5ld1ZhbHVlXG4gICAgICAgIGRlbGV0ZSBub2RlW29sZE5hbWVdXG4gICAgICB9IGVsc2UgaWYgKHZhbHVlQ2hhbmdlZCkge1xuICAgICAgICBub2RlW2tleV0gPSBnZXRDdXJyZW50VmFsdWUoKVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLndhcm4oYE5vdGhpbmcgY2hhbmdlZGApXG4gICAgfVxuICB9XG5cbiAgY29uc3Qgb25DYW5jZWwgPSAoeyB0YXJnZXQgfSkgPT4ge1xuICAgIGNvbnNvbGUud2FybignQ2FuY2VsbGVkISEnLCBhcmd1bWVudHMpXG4gIH1cblxuICBjb25zdCBzZXR1cCA9ICgpID0+IHtcbiAgICAvLyBTZXR1cCBldmVudHNcbiAgICBmb3JtLnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvblt0eXBlPVwic3VibWl0XCJdJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBvblNhdmUpXG4gICAgZm9ybS5xdWVyeVNlbGVjdG9yKCdidXR0b25bdHlwZT1cInJlc2V0XCJdJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBvbkNhbmNlbClcbiAgICBmbGRUeXBlLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIG9uVHlwZUNoYW5nZWQpXG4gICAgcGxhY2Vob2xkZXIucGFyZW50Tm9kZS5hcHBlbmRDaGlsZChnZXRBcnJheUJ1dHRvbnMoe2luZGV4OiAtMX0pKVxuICB9XG5cbiAgY29uc3QgZGVzdHJveSA9ICgpID0+IHtcbiAgICBmb3JtLnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvblt0eXBlPVwic3VibWl0XCJdJykucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBvblNhdmUpXG4gICAgZm9ybS5xdWVyeVNlbGVjdG9yKCdidXR0b25bdHlwZT1cInJlc2V0XCJdJykucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBvbkNhbmNlbClcbiAgICBmbGRUeXBlLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIG9uVHlwZUNoYW5nZWQpXG4gICAgcmVtb3ZlTm9kZShmb3JtKVxuICB9XG5cbiAgc2V0dXAoKVxuXG4gIC8vIGluaXQgVUlcbiAgdXBkYXRlVmFsdWVGaWVsZCh2YWx1ZSlcblxuICByZXR1cm4gT2JqZWN0LmFzc2lnbihmb3JtLCB7IGRlc3Ryb3kgfSlcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2ZpZWxkLWVkaXRvci5qc1xuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=