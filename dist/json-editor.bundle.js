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
	
	  var _handleSelect = function _handleSelect(_ref) {
	    var target = _ref.target;
	    var detail = _ref.detail;
	
	    console.warn('SELECT', detail, target);
	  };
	
	  var keyList = (0, _keyList.KeyList)({ data: config });
	  keyList.addEventListener('selected', _handleSelect);
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
	
	
	  var form = (0, _util.createElem)('<section class="j-edit" depth="' + depth + '" path="' + (Array.isArray(path) ? path.join('') : path) + '">\n    <form class="field-editor">\n      <fieldset>\n        <label>Name</label>\n        <input type="text" name="name" class="name" value="' + key + '" />\n      </fieldset>\n      <fieldset>\n        <label>Type</label>\n        <select rows="1" name="type">\n          <option value="string">text</option>\n          <option value="boolean">yes/no</option>\n          <option value="number">number</option>\n          <option value="object">object/hash/map/key-val</option>\n          <option value="array">list</option>\n        </select>\n      </fieldset>\n      <fieldset>\n        <label>Value</label>\n        <div class="valueEditorPlaceholder">placeholder for real values</div>\n      </fieldset>\n      <fieldset>\n        <button type="submit">Save</button>\n        <button type="reset">Cancel</button>\n        <strong></strong>\n      </fieldset>\n    </form>\n  </section>');
	
	  var value = node[key];
	  var prevVals = {};
	  var getValue = function getValue() {
	    return getValueFld().value;
	  };
	  var getValueFld = function getValueFld() {
	    return form.querySelector('.field-value');
	  };
	  var fldName = form.querySelector('input[name="name"]');
	  var fldType = form.querySelector('select[name="type"]');
	  var placehold = form.querySelector('.valueEditorPlaceholder');
	  // initialize value tracker (for local 'type' changes)
	  prevVals[type] = value;
	
	  // set value w/ default
	  fldType.value = type;
	
	  // define helpers, e.g. build field, transition state
	  var getValueFieldElem = function getValueFieldElem() {
	    var _value = getValue();
	    if (fldType.value === 'string') {
	      return (0, _util.createElem)('<input type=\'text\' class=\'field-value\' name=\'field-value\' value=\'' + _value + '\' />');
	    } else if (fldType.value === 'number') {
	      return (0, _util.createElem)('<input type=\'number\' class=\'field-value\' name=\'field-value\' value=\'' + _value + '\' />');
	    } else if (fldType.value === 'boolean') {
	      return (0, _util.createElem)('<input type=\'checkbox\' class=\'field-value\' name=\'field-value\' value=\'checked\'' + (_value ? " checked" : "") + '\' />');
	    } else {
	      return (0, _util.createElem)('<span class="has-error"><input type=\'text\' class=\'field-value\' name=\'field-value\' value=\'' + _value + '\' /></span>');
	    }
	  };
	
	  var convert = function convert(_ref2) {
	    var value = _ref2.value;
	    var type = _ref2.type;
	
	    var currType = Array.isArray(value) ? 'array' : typeof value === 'undefined' ? 'undefined' : _typeof(value);
	    switch (type) {
	      case 'string':
	        return value.toString();
	      // default: return value.toString()
	      case 'number':
	        switch (currType) {
	          case 'string':
	            return parseFloat(value);
	          case 'string':
	            return parseFloat(value);
	          case 'string':
	            return parseFloat(value);
	          case 'string':
	            return parseFloat(value);
	          default:
	            return value;
	        }
	        break;
	      case 'boolean':
	        return (0, _util.toBool)(value);
	
	      // } else if (type === 'number') {
	      // } else if (type === 'array') {
	      // } else if (type === 'object') {
	    }
	  };
	
	  // define events, onTypeChanged, onSave, onCancel
	  var onTypeChanged = function onTypeChanged(_ref3) {
	    var target = _ref3.target;
	
	    console.warn('Saved!!', _arguments);
	    var newType = target.value;
	  };
	  var onSave = function onSave(_ref4) {
	    var target = _ref4.target;
	    var detail = _ref4.detail;
	    var preventDefault = _ref4.preventDefault;
	
	    console.warn('Saved!!', _arguments);
	    preventDefault();
	  };
	  var onCancel = function onCancel(_ref5) {
	    var target = _ref5.target;
	
	    console.warn('Cancelled!!', _arguments);
	  };
	
	  form.querySelector('button[type="submit"]').addEventListener('click', onSave);
	  form.querySelector('button[type="reset"]').addEventListener('click', onCancel);
	  fldType.addEventListener('change', onTypeChanged);
	
	  return form;
	}

/***/ }
/******/ ])
});
;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA2ZTljYWEyY2UxYmNhOTI5YTNmNSIsIndlYnBhY2s6Ly8vLi9pbmRleC5qcz80YzA4Iiwid2VicGFjazovLy8uL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9rZXktbGlzdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29uZmlnLmpzIiwid2VicGFjazovLy8uL3NyYy91dGlsLmpzIiwid2VicGFjazovLy8uL3NyYy9zdHlsZS5sZXNzIiwid2VicGFjazovLy8uL34vY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N2Zy1pY29ucy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY3VzdG9tLWV2ZW50LmpzIiwid2VicGFjazovLy8uL3NyYy9maWVsZC1lZGl0b3IuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7O0FDdENBLDRHQUFrSixFOzs7Ozs7Ozs7Ozs7U0NNbEksTSxHQUFBLE07O0FBTmhCOztBQUNBOztBQUNBOztBQUlPLFVBQVMsTUFBVCxDQUFnQixJQUFoQixFQUFzQixNQUF0QixFQUE4QjtBQUNuQyxPQUFJLENBQUMsSUFBTCxFQUFhO0FBQUUsV0FBTSxJQUFJLEtBQUosQ0FBVSwrQ0FBVixDQUFOO0FBQWtFO0FBQ2pGLE9BQUksQ0FBQyxNQUFMLEVBQWE7QUFBRSxXQUFNLElB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SUFBUixDQUFhLFNBQWI7QUFDQSxTQUFNLFVBQVUsT0FBTyxLQUF2QjtBQUVELElBSkQ7QUFLQSxPQUFNLFNBQVMsU0FBVCxNQUFTLFFBQXNDO0FBQUEsU0FBcEMsTUFBb0MsU0FBcEMsTUFBb0M7QUFBQSxTQUE1QixNQUE0QixTQUE1QixNQUE0QjtBQUFBLFNBQXBCLGNBQW9CLFNBQXBCLGNBQW9COztBQUNuRCxhQUFRLElBQVIsQ0FBYSxTQUFiO0FBQ0E7QUFFRCxJQUpEO0FBS0EsT0FBTSxXQUFXLFNBQVgsUUFBVyxRQUFjO0FBQUEsU0FBWixNQUFZLFNBQVosTUFBWTs7QUFDN0IsYUFBUSxJQUFSLENBQWEsYUFBYjtBQUNELElBRkQ7O0FBSUEsUUFBSyxhQUFMLENBQW1CLHVCQUFuQixFQUE0QyxnQkFBNUMsQ0FBNkQsT0FBN0QsRUFBc0UsTUFBdEU7QUFDQSxRQUFLLGFBQUwsQ0FBbUIsc0JBQW5CLEVBQTJDLGdCQUEzQyxDQUE0RCxPQUE1RCxFQUFxRSxRQUFyRTtBQUNBLFdBQVEsZ0JBQVIsQ0FBeUIsUUFBekIsRUFBbUMsYUFBbkM7O0FBRUEsVUFBTyxJQUFQO0FBQ0QsRSIsImZpbGUiOiJqc29uLWVkaXRvci5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJKc29uRWRpdG9yXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcIkpzb25FZGl0b3JcIl0gPSBmYWN0b3J5KCk7XG59KSh0aGlzLCBmdW5jdGlvbigpIHtcbnJldHVybiBcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb25cbiAqKi8iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIDZlOWNhYTJjZTFiY2E5MjlhM2Y1XG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBnbG9iYWxbXCJKc29uRWRpdG9yXCJdID0gcmVxdWlyZShcIi0hL1VzZXJzL2RsZXZ5L2NvZGUvb3NzL2pzb24tZWRpdG9yL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvaW5kZXguanM/e1xcXCJwcmVzZXRzXFxcIjpbXFxcImVzMjAxNVxcXCJdfSEvVXNlcnMvZGxldnkvY29kZS9vc3MvanNvbi1lZGl0b3IvaW5kZXguanNcIik7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL2luZGV4LmpzXG4gKiogbW9kdWxlIGlkID0gMFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiaW1wb3J0IHtLZXlMaXN0fSAgICAgIGZyb20gJy4vc3JjL2tleS1saXN0J1xuaW1wb3J0IHtGaWVsZEVkaXRvcn0gIGZyb20gJy4vc3JjL2ZpZWxkLWVkaXRvcidcbmltcG9ydCB7U3R5bGVzfSAgICAgICBmcm9tICcuL3NyYy91dGlsJ1xuXG5cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZShlbGVtLCBjb25maWcpIHtcbiAgaWYgKCFlbGVtKSAgIHsgdGhyb3cgbmV3IEVycm9yKCdKc29uRWRpdG9yIGluc3RhbmNlIHJlcXVpcmVzIDFzdCBwYXJhbSBgZWxlbWAnKSB9XG4gIGlmICghY29uZmlnKSB7IHRocm93IG5ldyBFcnJvcignSnNvbkVkaXRvciBpbnN0YW5jZSByZXF1aXJlcyAybmQgcGFyYW0gYGNvbmZpZ2AnKSB9XG4gIFN0eWxlcy5hZGQoKVxuXG4gIGNvbnN0IF9oYW5kbGVTZWxlY3QgPSAoe3RhcmdldCwgZGV0YWlsfSkgPT4ge1xuICAgIGNvbnNvbGUud2FybignU0VMRUNUJywgZGV0YWlsLCB0YXJnZXQpXG4gICAgXG4gIH1cblxuICBsZXQga2V5TGlzdCA9IEtleUxpc3Qoe2RhdGE6IGNvbmZpZ30pXG4gIGtleUxpc3QuYWRkRXZlbnRMaXN0ZW5lcignc2VsZWN0ZWQnLCBfaGFuZGxlU2VsZWN0KVxuICBlbGVtLmFwcGVuZENoaWxkKGtleUxpc3QpXG4gIHJldHVybiBrZXlMaXN0O1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9pbmRleC5qc1xuICoqLyIsImltcG9ydCB7Y29uZmlnfSAgICAgICAgICAgICAgICAgICAgICAgICBmcm9tICcuL2NvbmZpZydcbmltcG9ydCB7Y3JlYXRlRWxlbSwgY2xvc2VzdCwgcmVtb3ZlQWxsfSBmcm9tICcuL3V0aWwnXG5pbXBvcnQge2Fycm93cywgdXh9ICAgICAgICAgICAgICAgICAgICAgZnJvbSAnLi9zdmctaWNvbnMnXG5pbXBvcnQge0N1c3RvbUV2ZW50IGFzIF9DdXN0b21FdmVudH0gICAgZnJvbSAnLi9jdXN0b20tZXZlbnQnXG4vLyBfQ3VzdG9tRXZlbnQgc2hvdWxkIGF1dG8tYXR0YWNoIHRoZSBvYmplY3QgdG8gdGhlIHdpbmRvdy4uLiBpZiBub3QgbWFrZSBpbml0IGZ1bmN0aW9uXG5cblxuZXhwb3J0IGZ1bmN0aW9uIEtleUxpc3Qoe2RhdGEsIHBhcmVudCwgZGVwdGggPSAwfSkge1xuICBjb25zdCBsaXN0ID0gY3JlYXRlRWxlbSgnPHVsIGNsYXNzPVwiai1rZXlzXCIgZGVwdGg9XCInICsgZGVwdGggKyAnXCI+PC91bD4nKVxuICBPYmplY3RcbiAgICAua2V5cyhkYXRhKVxuICAgIC5mb3JFYWNoKChrZXksIGlkeCwgYXJyKSA9PiB7XG4gICAgICBjb25zdCB2YWx1ZVR5cGUgICA9IEFycmF5LmlzQXJyYXkoZGF0YVtrZXldKSA/ICdhcnJheScgOiB0eXBlb2YgZGF0YVtrZXldXG4gICAgICBjb25zdCBpY29uICAgICAgICA9ICAgICAgICAgICAgdmFsdWVUeXBlID09PSAnb2JqZWN0JyA/IFxuICAgICAgICAgICAgICAgICAgICAgIGFycm93cy5kb3duICA6IHZhbHVlVHlwZSA9PT0gJ2FycmF5JyA/XG4gICAgICAgICAgICAgICAgICAgICAgdXgubGlzdCAgICAgIDogdmFsdWVUeXBlID09PSAnc3RyaW5nJyA/IFxuICAgICAgICAgICAgICAgICAgICAgIHV4LmVkaXQgICAgICA6IHV4LmVkaXRcbiAgICAgIGNvbnN0IGV4cGFuZGFibGUgID0gdmFsdWVUeXBlID09PSAnb2JqZWN0JyA/ICdqLWV4cGFuZGFibGUnIDogJydcbiAgICAgIGNvbnN0IHJvdyA9IGNyZWF0ZUVsZW0oWyc8bGkgZGVwdGg9XCInLCBkZXB0aCsxLCAnXCIgY2xhc3M9XCJqLWNsb3NlZCAnLCBleHBhbmRhYmxlLCAnIGotdHlwZS0nLCB2YWx1ZVR5cGUsICdcIiBrZXk9XCInLCBrZXksICdcIj4nLCBpY29uLCAnICcsIGtleSwgJzwvbGk+J10uam9pbignJykpXG4gICAgICBjb25zb2xlLndhcm4oJ3JvdycsIHJvdywgdmFsdWVUeXBlLCBpY29uKVxuICAgICAgbGlzdC5hcHBlbmRDaGlsZChyb3cpXG4gICAgfSlcbiAgbGlzdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGV2ZW50ID0+IHtcbiAgICBjb25zdCBsaSA9IGNsb3Nlc3QoZXZlbnQudGFyZ2V0LCAnbGknLCAyKVxuICAgIGlmIChsaSkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgICAgY29uc3Qga2V5ICAgICAgID0gbGkuZ2V0QXR0cmlidXRlKCdrZXknKVxuICAgICAgY29uc3QgbmV4dERhdGEgID0gZGF0YVtrZXldXG4gICAgICBjb25zb2xlLndhcm4oJ0NBTkNFTExFRCBjbGljayBmb3IgJXMnLCBrZXksIGxpKVxuICAgICAgY29uc3QgaXNPYmplY3QgPSBsaS5jbGFzc0xpc3QuY29udGFpbnMoJ2otdHlwZS1vYmplY3QnKVxuICAgICAgY29uc3QgaXNBcnJheSAgPSBsaS5jbGFzc0xpc3QuY29udGFpbnMoJ2otdHlwZS1hcnJheScpXG4gICAgICBpZiAoaXNPYmplY3QgfHwgaXNBcnJheSkge1xuICAgICAgICAvLyBjb25zb2xlLndhcm4oJ19jbGlja2VkLm9uJywga2V5LCBsaSlcbiAgICAgICAgaWYgKCFsaS5xdWVyeVNlbGVjdG9yKCd1bCcpKSB7XG4gICAgICAgICAgLy8gY29uc29sZS53YXJuKCdfY2xpY2tlZCAtIG5lZWRzIGxpc3QnLCBsaSlcbiAgICAgICAgICAvLyBkbyByZWN1cnNpb24sIG9uIGRlbWFuZFxuICAgICAgICAgIGxpLmFwcGVuZENoaWxkKEtleUxpc3Qoe2RhdGE6IG5leHREYXRhLCBwYXJlbnQ6IGxpLCBkZXB0aDogZGVwdGggKyAxfSkpXG4gICAgICAgICAgLy8gbGkuY2xhc3NMaXN0LnRvZ2dsZSgnai1jbG9zZWQnKVxuICAgICAgICB9XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4gbGkuY2xhc3NMaXN0LnRvZ2dsZSgnai1jbG9zZWQnKSwgMzMzKVxuICAgICAgICByZXR1cm4gbnVsbFxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgZXZlbnRfbm9kZVNlbGVjdGVkID0gbmV3IEN1c3RvbUV2ZW50KCdzZWxlY3RlZCcsIHtcbiAgICAgICAgICBidWJibGVzOiB0cnVlLCBjYW5jZWxhYmxlOiBmYWxzZSwgXG4gICAgICAgICAgZGV0YWlsOiB7a2V5OiBrZXksIGRhdGE6IG5leHREYXRhLCBlbGVtZW50OiBsaSwgZGVwdGg6IGRlcHRoICsgMSwgaXNPYmplY3QsIGlzQXJyYXl9XG4gICAgICAgIH0pXG4gICAgICAgIGxpLmRpc3BhdGNoRXZlbnQoZXZlbnRfbm9kZVNlbGVjdGVkKVxuICAgICAgICBjb25zb2xlLndhcm4oJ0ZpcmVkIEN1c3RvbSBFdmVudDogJywgZXZlbnRfbm9kZVNlbGVjdGVkKVxuICAgICAgfVxuXG4gICAgICBjb25zb2xlLmluZm8oJ19jbGlja2VkLnRvZ2dsZWQnLCBrZXksIGxpKVxuICAgIH1cbiAgfSlcbiAgcmV0dXJuIGxpc3Rcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2tleS1saXN0LmpzXG4gKiovIiwiZXhwb3J0IGNvbnN0IGNvbmZpZyA9IHtcbiAgZGVidWc6IGZhbHNlXG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9jb25maWcuanNcbiAqKi8iLCJcbi8qKlxuICogVXRpbGl0eSBhcnJheWlmeSBtZXRob2RcbiAqIEFkZCB0byAucHJvdG90eXBlIG9mIEl0ZXJhdG9ycywgQXJyYXlCdWZmZXIsIEFyZ3VtZW50cywgTm9kZUxpc3QsIFNldC9XZWFrU2V0LCB3aGF0ZXZlciAjWU9MT1xuICpcbiAqIC4uLiBPciBqdXN0IHVzZSBhcyB1dGlsLCBhcyBuZWVkZWQsICNKdXN0RG9JdFxuICpcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRvQXJyYXkobGlzdCkge1xuICBsaXN0ID0gQXJyYXkuaXNBcnJheShsaXN0KSA/IGxpc3QgOiB0aGlzXG4gIGxpc3QgPSAhbGlzdCA/IFtdIDogbGlzdFxuICByZXR1cm4gQXJyYXkuZnJvbSAmJiBBcnJheS5mcm9tKGxpc3QpIHx8IFsndXBncmFkZSB5b3VyIGJyb3dzZXIsIHBmZnQnXVxufVxuXG4vKipcbiAqIEdldCBgQXJyYXkuc29ydGAgZnVuY3Rpb24gZm9yIGtleSBuYW1lIGNvbXBhcmlzb25zIChzdXBwb3J0cyByZXZlcnNlKVxuICpcbiAqIFdoZW4gbmFtZSA9PT0gJ2VtYWlsICAgLS0tIFNvcnQgZW1haWwgYXNjZW5kaW5nLlxuICpcbiAqIFdoZW4gbmFtZSA9PT0gJy1lbWFpbCAgLS0tIFNvcnQgZW1haWwgZGVzY2VuZGluZ1xuICpcbiAqIEByZXR1cm5zIFtmdW5jdGlvbl0gY29tcGFyZXIgdXNlZCBpbiBgQXJyYXkuc29ydCgpYFxuICpcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFNvcnRlcihrZXkpIHtcbiAgY29uc3QgX2VuZ2xpc2hTb3J0ICAgICAgICAgPSAoYSwgYikgPT4gKGFba2V5XSA8IGJba2V5XSA/IC0xIDogKGFba2V5XSA+IGJba2V5XSA/IDEgOiAwKSlcbiAgY29uc3QgX2VuZ2xpc2hTb3J0UmV2ZXJzZWQgPSAoYSwgYikgPT4gKGFba2V5XSA+PSBiW2tleV0gPyAtMSA6IChhW2tleV0gPCBiW2tleV0gPyAxIDogMCkpXG5cbiAgaWYgKGtleVswXSA9PT0gJy0nKSB7XG4gICAga2V5ID0ga2V5LnN1YnN0cigxKTtcbiAgICByZXR1cm4gX2VuZ2xpc2hTb3J0UmV2ZXJzZWQ7XG4gIH1cbiAgcmV0dXJuIF9lbmdsaXNoU29ydDtcbn1cblxuLyoqXG4gKlxuICovXG5leHBvcnQgY29uc3QgU3R5bGVzID0ge1xuICBhZGQ6ICgpID0+IHtcbiAgICBsZXQgY3NzID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcignc3R5bGUjanNvbi1lZGl0b3InKVxuICAgIGlmICghY3NzKSB7XG4gICAgICBjb25zdCBzdHlsZXMgID0gcmVxdWlyZSgnIWNzcyFsZXNzIS4vc3R5bGUubGVzcycpXG4gICAgICBjc3MgICAgICAgICAgID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKVxuICAgICAgY3NzLmlkICAgICAgICA9ICdqc29uLWVkaXRvcidcbiAgICAgIGNzcy5pbm5lckhUTUwgPSBzdHlsZXNcbiAgICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoY3NzKVxuICAgIH1cbiAgfSxcbiAgcmVtb3ZlOiAoKSA9PiB7XG4gICAgbGV0IGNzcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ3N0eWxlI2pzb24tZWRpdG9yJylcbiAgICBpZiAoY3NzICYmIGNzcy5wYXJlbnROb2RlKSB7IGNzcy5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGNzcykgfVxuICB9XG59XG5cbi8qKlxuICogQWNjZXB0cyBlbGVtZW50cyBmcm9tIGBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsYFxuICpcbiAqIFJlbW92ZXMgYWxsIGNoaWxkcmVuIG9mIEBub2RlXG4gKlxuICovXG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlQWxsKG5vZGUpIHtcbiAgaWYgKHRoaXMgaW5zdGFuY2VvZiBOb2RlTGlzdCkgeyBub2RlID0gdGhpczsgfVxuXG4gIHRvQXJyYXkobm9kZSlcbiAgICAuZm9yRWFjaChlbCA9PiBlbC5wYXJlbnROb2RlICYmIGVsLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZWwpKVxuICByZXR1cm4gbm9kZVxufVxuXG4vKipcbiAqIFRvdGVzIG9idmlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldElkKHtpZCwgX2lkLCBrZXl9KSB7IHJldHVybiBpZCB8fCBfaWQgfHwga2V5OyB9XG5cbi8qKlxuICogXG4gKi9cbmV4cG9ydCBjb25zdCBjbG9zZXN0ID0gKGVsZW0sIHNlbGVjdG9yLCBsaW1pdCA9IG51bGwpID0+IHtcbiAgaWYgKGxpbWl0ICE9PSBudWxsICYmIGxpbWl0IDw9IDApIHsgcmV0dXJuIGZhbHNlIH1cblxuICByZXR1cm4gIWVsZW0gPyBudWxsXG4gICAgICAgICA6IGVsZW0ubWF0Y2hlcyAmJiBlbGVtLm1hdGNoZXMoc2VsZWN0b3IpIFxuICAgICAgICAgPyBlbGVtIDogZWxlbS5jbGFzc0xpc3QgJiYgZWxlbS5jbGFzc0xpc3QuY29udGFpbnMoc2VsZWN0b3IpXG4gICAgICAgICA/IGVsZW0gOiBjbG9zZXN0KGVsZW0ucGFyZW50Tm9kZSwgc2VsZWN0b3IsIChsaW1pdCAhPT0gbnVsbCA/IGxpbWl0IC0gMSA6IGxpbWl0KSlcbn1cblxuLyoqXG4gKiB0b0Jvb2wgY29udmVydHMgYW55dGhpbmcgdG8gYSBib29sZWFuIC0gc2VlIGNvZGUgZm9yIGRldGFpbHNcbiAqL1xuZXhwb3J0IGNvbnN0IHRvQm9vbCA9IChzdHIpID0+IHtcbiAgaWYgKHR5cGVvZiBzdHIgPT09ICdib29sZWFuJykge1xuICAgIHJldHVybiBzdHJcbiAgfVxuXG4gIGlmICh0eXBlb2Ygc3RyID09PSAnc3RyaW5nJykge1xuICAgIHN0ciA9IChzdHIubGVuZ3RoID49IDEgPyBzdHIudG9VcHBlckNhc2UoKVswXSA6IHN0cilcbiAgICByZXR1cm4gWydZJywgJzEnLCAnVCddLmluZGV4T2Yoc3RyKSA9PT0gMFxuICB9XG5cbiAgcmV0dXJuIHN0ciA/IHRydWUgOiBmYWxzZVxufVxuXG4vKipcbiAqIFdhcm5pbmc6IFByaXZhdGUvbG9jYWwgdXNlIG9ubHkuIERvIG5vdCBob2lzdC5cbiAqICoqKiBVbnNhZmUgSFRNTC9zdHJpbmcgaGFuZGxpbmcgKioqXG4gKi9cbmV4cG9ydCBjb25zdCBjcmVhdGVFbGVtID0gaHRtbCA9PiB7XG4gIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKVxuICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICBkaXYuaW5uZXJIVE1MID0gaHRtbCAvLyBQb3RlbnRpYWwgU2VjdXJpdHkgRXhwbG9pdCBWZWN0b3IhISEhISFcbiAgcmV0dXJuIGRpdi5jaGlsZE5vZGVzLmxlbmd0aCA9PT0gMSA/IGRpdi5jaGlsZE5vZGVzWzBdIDogZGl2XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy91dGlsLmpzXG4gKiovIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKCk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIudW5zZWxlY3RhYmxlIHtcXG4gIHVzZXItc2VsZWN0OiBub25lO1xcbiAgLW1vei11c2VyLXNlbGVjdDogbm9uZTtcXG4gIC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7XFxuICAtbXMtdXNlci1zZWxlY3Q6IG5vbmU7XFxufVxcbi5qLXhzLTEsXFxuLmoteHMtMixcXG4uai14cy0zLFxcbi5qLXhzLTQsXFxuLmoteHMtNSxcXG4uai14cy02LFxcbi5qLXhzLTcsXFxuLmoteHMtOCxcXG4uai14cy05LFxcbi5qLXhzLTEwLFxcbi5qLXhzLTExLFxcbi5qLXhzLTEyIHtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxufVxcbi5qLXhzLTEge1xcbiAgd2lkdGg6IDguMzMzMyU7XFxufVxcbi5qLXhzLTIge1xcbiAgd2lkdGg6IDE2LjY2NjYlO1xcbn1cXG4uai14cy0zIHtcXG4gIHdpZHRoOiAyNC45OTk5JTtcXG59XFxuLmoteHMtNCB7XFxuICB3aWR0aDogMzMuMzMzMiU7XFxufVxcbi5qLXhzLTUge1xcbiAgd2lkdGg6IDQxLjY2NjUlO1xcbn1cXG4uai14cy02IHtcXG4gIHdpZHRoOiA0OS45OTk4JTtcXG59XFxuLmoteHMtNyB7XFxuICB3aWR0aDogNTguMzMzMSU7XFxufVxcbi5qLXhzLTgge1xcbiAgd2lkdGg6IDY2LjY2NjQlO1xcbn1cXG4uai14cy05IHtcXG4gIHdpZHRoOiA3NC45OTk3JTtcXG59XFxuLmoteHMtMTAge1xcbiAgd2lkdGg6IDgzLjMzMzElO1xcbn1cXG4uai14cy0xMSB7XFxuICB3aWR0aDogOTEuNjY2MyU7XFxufVxcbi5qLXhzLTEyIHtcXG4gIHdpZHRoOiA5OS45OTk2JTtcXG59XFxudWwuai1rZXlzIHtcXG4gIHdpZHRoOiAyNTBweDtcXG4gIGxpc3Qtc3R5bGU6IG5vbmU7XFxuICB1c2VyLXNlbGVjdDogbm9uZTtcXG4gIC1tb3otdXNlci1zZWxlY3Q6IG5vbmU7XFxuICAtd2Via2l0LXVzZXItc2VsZWN0OiBub25lO1xcbiAgLW1zLXVzZXItc2VsZWN0OiBub25lO1xcbn1cXG51bC5qLWtleXMgbGkge1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICBtaW4td2lkdGg6IDI1MHB4O1xcbiAgbWluLWhlaWdodDogMjJweDtcXG4gIHRleHQtYWxpZ246IGxlZnQ7XFxuICBwYWRkaW5nLWxlZnQ6IDEwcHg7XFxuICBtYXJnaW4tbGVmdDogLTMwcHg7XFxufVxcbnVsLmota2V5cyAuai1pY29uLWVkaXQsXFxudWwuai1rZXlzIC5qLWljb24tbGlzdCxcXG51bC5qLWtleXMgLmotaWNvbi1hcnJvdy1kb3duIHtcXG4gIHpvb206IDQwJTtcXG59XFxudWwuai1rZXlzIGxpOm5vdCguai1jbG9zZWQpID4gLmotaWNvbi1hcnJvdy1kb3duIHtcXG4gIHRyYW5zZm9ybTogcm90YXRlKC05MGRlZykgIWltcG9ydGFudDtcXG59XFxudWwuai1rZXlzIC5qLWNsb3NlZCA+IHVsIHtcXG4gIGRpc3BsYXk6IG5vbmU7XFxufVxcbnVsLmota2V5cyAuai1jbG9zZWQ6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6ICcgJyAhaW1wb3J0YW50O1xcbn1cXG51bC5qLWtleXMgLmotY2xvc2VkID4gLmotaWNvbi1hcnJvdy1kb3duIHtcXG4gIHRyYW5zZm9ybTogcm90YXRlKDBkZWcpICFpbXBvcnRhbnQ7XFxufVxcbnVsLmota2V5cyAuai1pY29uLXBsdXM6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6ICcgJztcXG59XFxudWwuai1rZXlzIC5qLWljb24tbGlzdDpiZWZvcmUge1xcbiAgY29udGVudDogJyAnO1xcbn1cXG51bC5qLWtleXMgLmotaWNvbi10ZXh0OmJlZm9yZSB7XFxuICBjb250ZW50OiAnXFxcXDIxMzkgICAnICFpbXBvcnRhbnQ7XFxufVxcbnVsLmota2V5cyAuai1pY29uLWRlZmF1bHQ6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6ICdcXFxcMUY1MjQgICBcXFxcRkUwRicgIWltcG9ydGFudDtcXG59XFxuXCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vY3NzLWxvYWRlciEuL34vbGVzcy1sb2FkZXIhLi9zcmMvc3R5bGUubGVzc1xuICoqIG1vZHVsZSBpZCA9IDVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qXHJcblx0TUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcclxuXHRBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXHJcbiovXHJcbi8vIGNzcyBiYXNlIGNvZGUsIGluamVjdGVkIGJ5IHRoZSBjc3MtbG9hZGVyXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XHJcblx0dmFyIGxpc3QgPSBbXTtcclxuXHJcblx0Ly8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xyXG5cdGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcclxuXHRcdHZhciByZXN1bHQgPSBbXTtcclxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciBpdGVtID0gdGhpc1tpXTtcclxuXHRcdFx0aWYoaXRlbVsyXSkge1xyXG5cdFx0XHRcdHJlc3VsdC5wdXNoKFwiQG1lZGlhIFwiICsgaXRlbVsyXSArIFwie1wiICsgaXRlbVsxXSArIFwifVwiKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRyZXN1bHQucHVzaChpdGVtWzFdKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHJlc3VsdC5qb2luKFwiXCIpO1xyXG5cdH07XHJcblxyXG5cdC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XHJcblx0bGlzdC5pID0gZnVuY3Rpb24obW9kdWxlcywgbWVkaWFRdWVyeSkge1xyXG5cdFx0aWYodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpXHJcblx0XHRcdG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIFwiXCJdXTtcclxuXHRcdHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XHJcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHR2YXIgaWQgPSB0aGlzW2ldWzBdO1xyXG5cdFx0XHRpZih0eXBlb2YgaWQgPT09IFwibnVtYmVyXCIpXHJcblx0XHRcdFx0YWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xyXG5cdFx0fVxyXG5cdFx0Zm9yKGkgPSAwOyBpIDwgbW9kdWxlcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHR2YXIgaXRlbSA9IG1vZHVsZXNbaV07XHJcblx0XHRcdC8vIHNraXAgYWxyZWFkeSBpbXBvcnRlZCBtb2R1bGVcclxuXHRcdFx0Ly8gdGhpcyBpbXBsZW1lbnRhdGlvbiBpcyBub3QgMTAwJSBwZXJmZWN0IGZvciB3ZWlyZCBtZWRpYSBxdWVyeSBjb21iaW5hdGlvbnNcclxuXHRcdFx0Ly8gIHdoZW4gYSBtb2R1bGUgaXMgaW1wb3J0ZWQgbXVsdGlwbGUgdGltZXMgd2l0aCBkaWZmZXJlbnQgbWVkaWEgcXVlcmllcy5cclxuXHRcdFx0Ly8gIEkgaG9wZSB0aGlzIHdpbGwgbmV2ZXIgb2NjdXIgKEhleSB0aGlzIHdheSB3ZSBoYXZlIHNtYWxsZXIgYnVuZGxlcylcclxuXHRcdFx0aWYodHlwZW9mIGl0ZW1bMF0gIT09IFwibnVtYmVyXCIgfHwgIWFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcclxuXHRcdFx0XHRpZihtZWRpYVF1ZXJ5ICYmICFpdGVtWzJdKSB7XHJcblx0XHRcdFx0XHRpdGVtWzJdID0gbWVkaWFRdWVyeTtcclxuXHRcdFx0XHR9IGVsc2UgaWYobWVkaWFRdWVyeSkge1xyXG5cdFx0XHRcdFx0aXRlbVsyXSA9IFwiKFwiICsgaXRlbVsyXSArIFwiKSBhbmQgKFwiICsgbWVkaWFRdWVyeSArIFwiKVwiO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRsaXN0LnB1c2goaXRlbSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9O1xyXG5cdHJldHVybiBsaXN0O1xyXG59O1xyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1xuICoqIG1vZHVsZSBpZCA9IDZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIlxuZXhwb3J0IGNvbnN0IGFycm93cyA9IHtcbiAgLy8gdXA6IGA8c3ZnIGNsYXNzPVwiai1pY29uLWFycm93IGotaWNvbi1hcnJvdy11cFwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB4bWxuczp4bGluaz1cImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmtcIiBzdHlsZT1cImlzb2xhdGlvbjppc29sYXRlXCIgd2lkdGg9XCI4NVwiIGhlaWdodD1cIjQ5XCI+PHBhdGggZD1cIk0gODIgNDQuOTk5OTk5OTk5OTk5OSBMIDQyLjk4NzQxODEyMjQ0NzM4IDQuMDI0MTUzODgwNTYzMzA5IE0gNCA0NSBMIDQyLjk4NzQxODEyMjQ0NzI3IDRcIiBzdHlsZT1cImZpbGw6bm9uZTtzdHJva2U6IzAwMDAwMDtzdHJva2Utd2lkdGg6NDtzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbGluZWpvaW46YmV2ZWw7c3Ryb2tlLW1pdGVybGltaXQ6MztcIi8+PC9zdmc+YCxcbiAgZG93bjogYDxzdmcgY2xhc3M9XCJqLWljb24tYXJyb3cgai1pY29uLWFycm93LWRvd25cIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgeG1sbnM6eGxpbms9XCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rXCIgc3R5bGU9XCJpc29sYXRpb246aXNvbGF0ZVwiIHdpZHRoPVwiMzNcIiBoZWlnaHQ9XCIyMlwiPjxwYXRoIGQ9XCJNIDI4IDQgTCAxNS45OTYxMjg2NTMwNjA3NCAxNi45OTIzNDE0NTI1MDQzMSBNIDQgNCBMIDE1Ljk5NjEyODY1MzA2MDY4MyAxN1wiIHN0eWxlPVwiZmlsbDpub25lO3N0cm9rZTojMDAwMDAwO3N0cm9rZS13aWR0aDo4O3N0cm9rZS1saW5lY2FwOnJvdW5kO3N0cm9rZS1saW5lam9pbjpiZXZlbDtzdHJva2UtbWl0ZXJsaW1pdDozO1wiLz48L3N2Zz5gLFxuICAvLyByaWdodDogYDxzdmcgY2xhc3M9XCJqLWljb24tYXJyb3cgai1pY29uLWFycm93LXJpZ2h0XCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHhtbG5zOnhsaW5rPVwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGlua1wiIHN0eWxlPVwiaXNvbGF0aW9uOmlzb2xhdGVcIiB3aWR0aD1cIjUwXCIgaGVpZ2h0PVwiODRcIj48cGF0aCBkPVwiTSA0LjAwMDAwMDAwMDAwMDEyOCA4MCBMIDQ2IDQxLjQ5OTg5NjIwNDI2Nzc3IE0gNCAzIEwgNDUuOTk5OTk5OTk5OTk5ODQ0IDQxLjQ5OTg5NjIwNDI2NzczNVwiIHN0eWxlPVwiZmlsbDpub25lO3N0cm9rZTojMDAwMDAwO3N0cm9rZS13aWR0aDo0O3N0cm9rZS1saW5lY2FwOnJvdW5kO3N0cm9rZS1saW5lam9pbjpiZXZlbDtzdHJva2UtbWl0ZXJsaW1pdDozO1wiLz48L3N2Zz5gLFxuICAvLyBsZWZ0OiBgPHN2ZyBjbGFzcz1cImotaWNvbi1hcnJvdyBqLWljb24tYXJyb3ctbGVmdFwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB4bWxuczp4bGluaz1cImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmtcIiBzdHlsZT1cImlzb2xhdGlvbjppc29sYXRlXCIgd2lkdGg9XCI0OVwiIGhlaWdodD1cIjg2XCI+PHBhdGggZD1cIk0gNDQuOTk5OTk5OTk5OTk5ODkgODIgTCA0LjAyNDE1Mzg4MDU2MzMwOTUgNDIuOTg3NDE4MTIyNDQ3MzUgTSA0NSA0IEwgNCA0Mi45ODc0MTgxMjI0NDcyNDVcIiBzdHlsZT1cImZpbGw6bm9uZTtzdHJva2U6IzAwMDAwMDtzdHJva2Utd2lkdGg6NDtzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbGluZWpvaW46YmV2ZWw7c3Ryb2tlLW1pdGVybGltaXQ6MztcIi8+PC9zdmc+YCxcbn1cblxuZXhwb3J0IGNvbnN0IHV4ID0ge1xuICBsaXN0OiBgPHN2ZyBjbGFzcz1cImotaWNvbi1saXN0XCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHhtbG5zOnhsaW5rPVwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGlua1wiIHN0eWxlPVwiaXNvbGF0aW9uOmlzb2xhdGVcIiB3aWR0aD1cIjI0XCIgaGVpZ2h0PVwiMTMuM1wiPjxwYXRoIGQ9XCIgTSAwIDggTCAyLjYgOCBMIDIuNiA1LjMgTCAwIDUuMyBMIDAgOCBaICBNIDAgMTMuMyBMIDIuNiAxMy4zIEwgMi42IDEwLjYgTCAwIDEwLjYgTCAwIDEzLjMgWiAgTSAwIDIuNiBMIDIuNiAyLjYgTCAyLjYgMCBMIDAgMCBMIDAgMi42IFogIE0gNS4zIDggTCAyNCA4IEwgMjQgNS4zIEwgNS4zIDUuMyBMIDUuMyA4IFogIE0gNS4zIDEzLjMgTCAyNCAxMy4zIEwgMjQgMTAuNiBMIDUuMyAxMC42IEwgNS4zIDEzLjMgWiAgTSA1LjMgMCBMIDUuMyAyLjYgTCAyNCAyLjYgTCAyNCAwIEwgNS4zIDAgWiBcIiBmaWxsLXJ1bGU9XCJldmVub2RkXCIgZmlsbD1cInJnYigwLDAsMClcIiBzdHJva2Utd2lkdGg9XCIxLjVcIiBzdHJva2U9XCJyZ2JhKDAsMCwwLDApXCIgc3Ryb2tlLWxpbmVjYXA9XCJidXR0XCIvPjxwYXRoIGQ9XCIgTSAwIDAgTCAzNiAwIEwgMzYgMzYgTCAwIDM2IEwgMCAwIFogXCIgZmlsbD1cInJnYmEoMCwwLDAsMClcIiBzdHJva2Utd2lkdGg9XCIxLjVcIiBzdHJva2U9XCJyZ2JhKDAsMCwwLDApXCIgc3Ryb2tlLWxpbmVjYXA9XCJidXR0XCIvPjwvc3ZnPmAsXG4gIGVkaXQ6IGA8c3ZnIGNsYXNzPVwiai1pY29uLWVkaXRcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgeG1sbnM6eGxpbms9XCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rXCIgc3R5bGU9XCJpc29sYXRpb246aXNvbGF0ZVwiIHdpZHRoPVwiMjRcIiBoZWlnaHQ9XCIyNFwiPjxwYXRoIGQ9XCIgTSAtNC40NDA4IDE5LjAwMDYgTCAtNC40NDA4IDI0IEwgNC45OTkzIDI0IEwgMTkuNzQzOSA5LjI1NTMgTCAxNC43NDQ2IDQuMjU2MCBMIC00LjQ0MDggMTkuMDAwNiBaICBNIDIzLjYxIDUuMzg5MiBDIDI0LjEyOTkgNC44NjkzIDI0LjEyOTkgNC4wMjk0IDIzLjYxIDMuNTA5NSBMIDIwLjQ5IDAuMzg5OSBDIDE5Ljk3MDUgLTAuMTI5OSAxOS4xMzA2IC0wLjEyOTkgMTguNjEwNyAwLjM4OTkgTCAxNi4xNzEgMi44Mjk2IEwgMjEuMTcwMyA3LjgyODkgTCAyMy42MSA1LjM4OTIgWiBcIiBmaWxsLXJ1bGU9XCJldmVub2RkXCIgZmlsbD1cInJnYigwLDAsMClcIiBzdHJva2Utd2lkdGg9XCIxLjUwXCIgc3Ryb2tlPVwicmdiYSgwLDAsMCwwKVwiIHN0cm9rZS1saW5lY2FwPVwiYnV0dFwiLz48cGF0aCBkPVwiIE0gMCAwIEwgMzUgMCBMIDM1IDM1IEwgMCAzNSBMIDAgMCBaIFwiIGZpbGw9XCJyZ2JhKDAsMCwwLDApXCIgc3Ryb2tlLXdpZHRoPVwiMS41XCIgc3Ryb2tlPVwicmdiYSgwLDAsMCwwKVwiIHN0cm9rZS1saW5lY2FwPVwiYnV0dFwiLz48L3N2Zz5gLFxuICAvLyBlZGl0TGluZTogYDxzdmcgY2xhc3M9XCJqLWljb24tZWRpdC1saW5lXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHhtbG5zOnhsaW5rPVwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGlua1wiIHN0eWxlPVwiaXNvbGF0aW9uOmlzb2xhdGVcIiB3aWR0aD1cIjM2XCIgaGVpZ2h0PVwiMzZcIj48cGF0aCBkPVwiIE0gMjYuNjIgMTAuNTAgTCAyMSA0Ljg3IEwgNiAxOS44NyBMIDYgMjUuNTAgTCAxMS42MiAyNS41IEwgMjYuNiAxMC41IFogIE0gMzEuMDYgNi4wNiBDIDMxLjY1IDUuNDcgMzEuNjUgNC41MzM3NSAzMS4wNjUgMy45NCBMIDI3LjU1NSAwLjQzIEMgMjYuOTcgLTAuMTQgMjYuMDIyIC0wLjE0IDI1LjQ0IDAuNDMgTCAyMi41IDMuMzcgTCAyOC4xMjUgOSBMIDMxLjA2NSA2LjA2IFogXCIgZmlsbC1ydWxlPVwiZXZlbm9kZFwiIGZpbGw9XCJyZ2IoMCwwLDApXCIgc3Ryb2tlLXdpZHRoPVwiMS41XCIgc3Ryb2tlPVwicmdiYSgwLDAsMCwwKVwiIHN0cm9rZS1saW5lY2FwPVwiYnV0dFwiLz48cGF0aCBkPVwiIE0gMCAwIEwgMzYgMCBMIDM2IDM2IEwgMCAzNiBMIDAgMC4wMDM3NDk5OTk5OTk5OTk5MiBaIFwiIGZpbGw9XCJyZ2JhKDAsMCwwLDApXCIgc3Ryb2tlLXdpZHRoPVwiMS41XCIgc3Ryb2tlPVwicmdiYSgwLDAsMCwwKVwiIHN0cm9rZS1saW5lY2FwPVwiYnV0dFwiLz48cGF0aCBkPVwiIE0gMCAzMCBMIDM2IDMwIEwgMzYgMzYgTCAwIDM2IEwgMCAzMCBaIFwiIGZpbGw9XCJyZ2IoMCwwLDApXCIgZmlsbC1vcGFjaXR5PVwiMC40XCIgc3Ryb2tlLXdpZHRoPVwiMS41XCIgc3Ryb2tlPVwicmdiYSgwLDAsMCwwKVwiIHN0cm9rZS1saW5lY2FwPVwiYnV0dFwiLz48L3N2Zz5gLFxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvc3ZnLWljb25zLmpzXG4gKiovIiwiZXhwb3J0IHtDdXN0b21FdmVudH07XG5cbmZ1bmN0aW9uIEN1c3RvbUV2ZW50KGV2ZW50LCBwYXJhbXMgPSB7YnViYmxlczogZmFsc2UsIGNhbmNlbGFibGU6IGZhbHNlLCBkZXRhaWw6IHVuZGVmaW5lZH0pIHtcbiAgdmFyIGV2dCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCAnQ3VzdG9tRXZlbnQnICk7XG4gIGV2dC5pbml0Q3VzdG9tRXZlbnQoIGV2ZW50LCBwYXJhbXMuYnViYmxlcywgcGFyYW1zLmNhbmNlbGFibGUsIHBhcmFtcy5kZXRhaWwgKTtcbiAgcmV0dXJuIGV2dDtcbn1cblxuaWYgKHdpbmRvdyAmJiB0eXBlb2Ygd2luZG93LkN1c3RvbUV2ZW50ID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgLy8gbm8gbmVlZCB0byBwb2x5ZmlsbFxufSBlbHNlIHtcbiAgd2luZG93LkN1c3RvbUV2ZW50ID0gQ3VzdG9tRXZlbnQ7XG4gIEN1c3RvbUV2ZW50LnByb3RvdHlwZSA9IHdpbmRvdy5FdmVudC5wcm90b3R5cGU7XG59XG5cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2N1c3RvbS1ldmVudC5qc1xuICoqLyIsImltcG9ydCB7Y3JlYXRlRWxlbSwgY2xvc2VzdCwgcmVtb3ZlQWxsLCB0b0Jvb2x9IGZyb20gJy4vdXRpbCdcbiAgXG5leHBvcnQgZnVuY3Rpb24gRmllbGRFZGl0b3Ioe2tleSwgbm9kZSwgcGFyZW50LCBwYXRoLCBlbGVtLCB0eXBlID0gJ3N0cmluZycsIGRlcHRoID0gMH0pIHtcblxuICBjb25zdCBmb3JtID0gY3JlYXRlRWxlbShgPHNlY3Rpb24gY2xhc3M9XCJqLWVkaXRcIiBkZXB0aD1cIiR7ZGVwdGh9XCIgcGF0aD1cIiR7QXJyYXkuaXNBcnJheShwYXRoKSA/IHBhdGguam9pbignJykgOiBwYXRoIH1cIj5cbiAgICA8Zm9ybSBjbGFzcz1cImZpZWxkLWVkaXRvclwiPlxuICAgICAgPGZpZWxkc2V0PlxuICAgICAgICA8bGFiZWw+TmFtZTwvbGFiZWw+XG4gICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJuYW1lXCIgY2xhc3M9XCJuYW1lXCIgdmFsdWU9XCIke2tleX1cIiAvPlxuICAgICAgPC9maWVsZHNldD5cbiAgICAgIDxmaWVsZHNldD5cbiAgICAgICAgPGxhYmVsPlR5cGU8L2xhYmVsPlxuICAgICAgICA8c2VsZWN0IHJvd3M9XCIxXCIgbmFtZT1cInR5cGVcIj5cbiAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwic3RyaW5nXCI+dGV4dDwvb3B0aW9uPlxuICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJib29sZWFuXCI+eWVzL25vPC9vcHRpb24+XG4gICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIm51bWJlclwiPm51bWJlcjwvb3B0aW9uPlxuICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJvYmplY3RcIj5vYmplY3QvaGFzaC9tYXAva2V5LXZhbDwvb3B0aW9uPlxuICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJhcnJheVwiPmxpc3Q8L29wdGlvbj5cbiAgICAgICAgPC9zZWxlY3Q+XG4gICAgICA8L2ZpZWxkc2V0PlxuICAgICAgPGZpZWxkc2V0PlxuICAgICAgICA8bGFiZWw+VmFsdWU8L2xhYmVsPlxuICAgICAgICA8ZGl2IGNsYXNzPVwidmFsdWVFZGl0b3JQbGFjZWhvbGRlclwiPnBsYWNlaG9sZGVyIGZvciByZWFsIHZhbHVlczwvZGl2PlxuICAgICAgPC9maWVsZHNldD5cbiAgICAgIDxmaWVsZHNldD5cbiAgICAgICAgPGJ1dHRvbiB0eXBlPVwic3VibWl0XCI+U2F2ZTwvYnV0dG9uPlxuICAgICAgICA8YnV0dG9uIHR5cGU9XCJyZXNldFwiPkNhbmNlbDwvYnV0dG9uPlxuICAgICAgICA8c3Ryb25nPjwvc3Ryb25nPlxuICAgICAgPC9maWVsZHNldD5cbiAgICA8L2Zvcm0+XG4gIDwvc2VjdGlvbj5gKVxuXG4gIHZhciB2YWx1ZSAgICAgICAgID0gbm9kZVtrZXldXG4gIGNvbnN0IHByZXZWYWxzICAgID0ge31cbiAgY29uc3QgZ2V0VmFsdWUgICAgPSAoKSA9PiBnZXRWYWx1ZUZsZCgpLnZhbHVlXG4gIGNvbnN0IGdldFZhbHVlRmxkID0gKCkgPT4gZm9ybS5xdWVyeVNlbGVjdG9yKCcuZmllbGQtdmFsdWUnKVxuICBjb25zdCBmbGROYW1lICAgICA9IGZvcm0ucXVlcnlTZWxlY3RvcignaW5wdXRbbmFtZT1cIm5hbWVcIl0nKVxuICBjb25zdCBmbGRUeXBlICAgICA9IGZvcm0ucXVlcnlTZWxlY3Rvcignc2VsZWN0W25hbWU9XCJ0eXBlXCJdJylcbiAgY29uc3QgcGxhY2Vob2xkICAgPSBmb3JtLnF1ZXJ5U2VsZWN0b3IoJy52YWx1ZUVkaXRvclBsYWNlaG9sZGVyJylcbi8vIGluaXRpYWxpemUgdmFsdWUgdHJhY2tlciAoZm9yIGxvY2FsICd0eXBlJyBjaGFuZ2VzKVxuICBwcmV2VmFsc1t0eXBlXSAgICA9IHZhbHVlXG5cbi8vIHNldCB2YWx1ZSB3LyBkZWZhdWx0XG4gIGZsZFR5cGUudmFsdWUgICAgID0gdHlwZVxuXG4vLyBkZWZpbmUgaGVscGVycywgZS5nLiBidWlsZCBmaWVsZCwgdHJhbnNpdGlvbiBzdGF0ZVxuICBjb25zdCBnZXRWYWx1ZUZpZWxkRWxlbSA9ICgpID0+IHtcbiAgICBsZXQgX3ZhbHVlID0gZ2V0VmFsdWUoKVxuICAgIGlmIChmbGRUeXBlLnZhbHVlID09PSAnc3RyaW5nJykge1xuICAgICAgcmV0dXJuIGNyZWF0ZUVsZW0oYDxpbnB1dCB0eXBlPSd0ZXh0JyBjbGFzcz0nZmllbGQtdmFsdWUnIG5hbWU9J2ZpZWxkLXZhbHVlJyB2YWx1ZT0nJHtfdmFsdWV9JyAvPmApXG4gICAgfSBlbHNlIGlmIChmbGRUeXBlLnZhbHVlID09PSAnbnVtYmVyJykge1xuICAgICAgcmV0dXJuIGNyZWF0ZUVsZW0oYDxpbnB1dCB0eXBlPSdudW1iZXInIGNsYXNzPSdmaWVsZC12YWx1ZScgbmFtZT0nZmllbGQtdmFsdWUnIHZhbHVlPScke192YWx1ZX0nIC8+YClcbiAgICB9IGVsc2UgaWYgKGZsZFR5cGUudmFsdWUgPT09ICdib29sZWFuJykge1xuICAgICAgcmV0dXJuIGNyZWF0ZUVsZW0oYDxpbnB1dCB0eXBlPSdjaGVja2JveCcgY2xhc3M9J2ZpZWxkLXZhbHVlJyBuYW1lPSdmaWVsZC12YWx1ZScgdmFsdWU9J2NoZWNrZWQnJHtfdmFsdWUgPyBcIiBjaGVja2VkXCIgOiBcIlwifScgLz5gKVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gY3JlYXRlRWxlbShgPHNwYW4gY2xhc3M9XCJoYXMtZXJyb3JcIj48aW5wdXQgdHlwZT0ndGV4dCcgY2xhc3M9J2ZpZWxkLXZhbHVlJyBuYW1lPSdmaWVsZC12YWx1ZScgdmFsdWU9JyR7X3ZhbHVlfScgLz48L3NwYW4+YClcbiAgICB9XG4gIH1cblxuICBjb25zdCBjb252ZXJ0ID0gKHt2YWx1ZSwgdHlwZX0pID0+IHtcbiAgICBjb25zdCBjdXJyVHlwZSA9IEFycmF5LmlzQXJyYXkodmFsdWUpID8gJ2FycmF5JyA6IHR5cGVvZiB2YWx1ZVxuICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgY2FzZSAnc3RyaW5nJzogcmV0dXJuIHZhbHVlLnRvU3RyaW5nKClcbiAgICAgIC8vIGRlZmF1bHQ6IHJldHVybiB2YWx1ZS50b1N0cmluZygpXG4gICAgICBjYXNlICdudW1iZXInOlxuICAgICAgICBzd2l0Y2ggKGN1cnJUeXBlKSB7XG4gICAgICAgICAgY2FzZSAnc3RyaW5nJzogcmV0dXJuIHBhcnNlRmxvYXQodmFsdWUpXG4gICAgICAgICAgY2FzZSAnc3RyaW5nJzogcmV0dXJuIHBhcnNlRmxvYXQodmFsdWUpXG4gICAgICAgICAgY2FzZSAnc3RyaW5nJzogcmV0dXJuIHBhcnNlRmxvYXQodmFsdWUpXG4gICAgICAgICAgY2FzZSAnc3RyaW5nJzogcmV0dXJuIHBhcnNlRmxvYXQodmFsdWUpXG4gICAgICAgICAgZGVmYXVsdDogICAgICAgcmV0dXJuIHZhbHVlXG4gICAgICAgIH1cbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgJ2Jvb2xlYW4nOlxuICAgICAgICByZXR1cm4gdG9Cb29sKHZhbHVlKVxuICAgICAgICAgICAgXG4gICAgLy8gfSBlbHNlIGlmICh0eXBlID09PSAnbnVtYmVyJykge1xuICAgIC8vIH0gZWxzZSBpZiAodHlwZSA9PT0gJ2FycmF5Jykge1xuICAgIC8vIH0gZWxzZSBpZiAodHlwZSA9PT0gJ29iamVjdCcpIHtcbiAgICB9XG4gIH1cblxuLy8gZGVmaW5lIGV2ZW50cywgb25UeXBlQ2hhbmdlZCwgb25TYXZlLCBvbkNhbmNlbFxuICBjb25zdCBvblR5cGVDaGFuZ2VkID0gKHt0YXJnZXR9KSA9PiB7XG4gICAgY29uc29sZS53YXJuKCdTYXZlZCEhJywgYXJndW1lbnRzKVxuICAgIGNvbnN0IG5ld1R5cGUgPSB0YXJnZXQudmFsdWVcbiAgICBcbiAgfVxuICBjb25zdCBvblNhdmUgPSAoe3RhcmdldCwgZGV0YWlsLCBwcmV2ZW50RGVmYXVsdH0pID0+IHtcbiAgICBjb25zb2xlLndhcm4oJ1NhdmVkISEnLCBhcmd1bWVudHMpXG4gICAgcHJldmVudERlZmF1bHQoKVxuXG4gIH1cbiAgY29uc3Qgb25DYW5jZWwgPSAoe3RhcmdldH0pID0+IHtcbiAgICBjb25zb2xlLndhcm4oJ0NhbmNlbGxlZCEhJywgYXJndW1lbnRzKVxuICB9XG5cbiAgZm9ybS5xdWVyeVNlbGVjdG9yKCdidXR0b25bdHlwZT1cInN1Ym1pdFwiXScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb25TYXZlKVxuICBmb3JtLnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvblt0eXBlPVwicmVzZXRcIl0nKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIG9uQ2FuY2VsKVxuICBmbGRUeXBlLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIG9uVHlwZUNoYW5nZWQpXG4gIFxuICByZXR1cm4gZm9ybVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvZmllbGQtZWRpdG9yLmpzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==