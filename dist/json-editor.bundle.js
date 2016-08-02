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
	
	var _fieldEditor = __webpack_require__(3);
	
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
	
	var _config = __webpack_require__(7);
	
	var _util = __webpack_require__(4);
	
	var _svgIcons = __webpack_require__(8);
	
	var _customEvent = __webpack_require__(9);
	
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
	
	      // const key       = li.getAttribute('key')
	
	      var nextData = node[key];
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
	  };
	  var destroy = function destroy() {
	    list.removeEventListener('click', _clickHandler);
	  };
	  if (!parent) {
	    // add only at top of tree, maybe move out of here up a 'layer'
	    list.addEventListener('click', _clickHandler);
	  }
	  return Object.assign(list, { destroy: destroy });
	}

/***/ },
/* 3 */
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
	
	
	  var form = (0, _util.createElem)('<section class="j-edit j-side" key="' + key + '" type="' + type + '" depth="' + depth + '" path="' + (Array.isArray(path) ? path.join('::') : path) + '">\n    <form class="field-editor">\n      <fieldset>\n        <label>Name</label>\n        <input type="text" name="name" class="name" value="' + key + '" />\n      </fieldset>\n      <fieldset>\n        <label>Type</label>\n        <select rows="1" name="type">\n          <option value="string">text</option>\n          <option value="boolean">yes/no</option>\n          <option value="number">number</option>\n          <option value="object">object/hash/map/key-val</option>\n          <option value="array">list</option>\n        </select>\n      </fieldset>\n      <fieldset>\n        <label>Value</label>\n        <div class="valueEditorPlaceholder"></div>\n      </fieldset>\n      <fieldset>\n        <button type="submit">Save</button>\n        <button type="reset">Cancel</button>\n        <strong></strong>\n      </fieldset>\n    </form>\n  </section>');
	
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
	  var getValueFieldElem = function getValueFieldElem() {
	    var _value = arguments.length <= 0 || arguments[0] === undefined ? getValue() : arguments[0];
	
	    console.trace('   \tGenField(', key, ', ', _value, ')');
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
	          case 'boolean':
	            return value ? 1 : 0;
	          case 'array':
	            return -1;
	          case 'object':
	            return -1;
	          default:
	            return -99;
	        }
	        break;
	      case 'boolean':
	        return (0, _util.toBool)(value);
	
	      // } else if (type === 'number') {
	      // } else if (type === 'array') {
	      // } else if (type === 'object') {
	    }
	  };
	  var updateValueField = function updateValueField(v) {
	    var newType = fldType.value;
	    var newVal = convert({ value: v || getValue(), type: newType });
	    var newFld = getValueFieldElem(newVal);
	    (0, _util.removeAll)(placeholder.childNodes);
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
	  var onSave = function onSave(e) {
	    var target = e.target;
	    var detail = e.detail;
	    var preventDefault = e.preventDefault;
	
	    console.warn('Saved!!', _arguments);
	    preventDefault();
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
	  };
	
	  setup();
	
	  // init UI
	  updateValueField(value);
	
	  return Object.assign(form, { destroy: destroy });
	}

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
	exports.push([module.id, ".unselectable {\n  user-select: none;\n  -moz-user-select: none;\n  -webkit-user-select: none;\n  -ms-user-select: none;\n}\n.j-xs-1,\n.j-xs-2,\n.j-xs-3,\n.j-xs-4,\n.j-xs-5,\n.j-xs-6,\n.j-xs-7,\n.j-xs-8,\n.j-xs-9,\n.j-xs-10,\n.j-xs-11,\n.j-xs-12 {\n  display: inline-block;\n  box-sizing: border-box;\n}\n.j-xs-1 {\n  width: 8.3333%;\n}\n.j-xs-2 {\n  width: 16.6666%;\n}\n.j-xs-3 {\n  width: 24.9999%;\n}\n.j-xs-4 {\n  width: 33.3332%;\n}\n.j-xs-5 {\n  width: 41.6665%;\n}\n.j-xs-6 {\n  width: 49.9998%;\n}\n.j-xs-7 {\n  width: 58.3331%;\n}\n.j-xs-8 {\n  width: 66.6664%;\n}\n.j-xs-9 {\n  width: 74.9997%;\n}\n.j-xs-10 {\n  width: 83.3331%;\n}\n.j-xs-11 {\n  width: 91.6663%;\n}\n.j-xs-12 {\n  width: 99.9996%;\n}\nul.j-keys {\n  width: 250px;\n  list-style: none;\n  display: inline-block;\n  user-select: none;\n  -moz-user-select: none;\n  -webkit-user-select: none;\n  -ms-user-select: none;\n}\nul.j-keys li {\n  display: block;\n  min-width: 250px;\n  min-height: 22px;\n  text-align: left;\n  padding-left: 10px;\n  margin-left: -30px;\n}\nul.j-keys .j-icon-edit,\nul.j-keys .j-icon-list,\nul.j-keys .j-icon-arrow-down {\n  zoom: 40%;\n}\nul.j-keys li:not(.j-closed) > .j-icon-arrow-down {\n  transform: rotate(-90deg) !important;\n}\nul.j-keys .j-closed > ul {\n  display: none;\n}\nul.j-keys .j-closed:before {\n  content: ' ' !important;\n}\nul.j-keys .j-closed > .j-icon-arrow-down {\n  transform: rotate(0deg) !important;\n}\nul.j-keys .j-icon-plus:before {\n  content: ' ';\n}\nul.j-keys .j-icon-list:before {\n  content: ' ';\n}\nul.j-keys .j-icon-text:before {\n  content: '\\2139   ' !important;\n}\nul.j-keys .j-icon-default:before {\n  content: '\\1F524   \\FE0F' !important;\n}\n", ""]);
	
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
	var config = exports.config = {
	  debug: false
	};

/***/ },
/* 8 */
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
/* 9 */
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA5N2Y3NjFmYjFlOWY2YmE5MjU2YiIsIndlYnBhY2s6Ly8vLi9pbmRleC5qcz80YzA4Iiwid2VicGFjazovLy8uL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9rZXktbGlzdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZmllbGQtZWRpdG9yLmpzIiwid2VicGFjazovLy8uL3NyYy91dGlsLmpzIiwid2VicGFjazovLy8uL3NyYy9zdHlsZS5sZXNzIiwid2VicGFjazovLy8uL34vY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbmZpZy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc3ZnLWljb25zLmpzIiwid2VicGFjazovLy8uL3NyYy9jdXN0b20tZXZlbnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7O0FDdENBLDRHQUFrSixFOzs7Ozs7Ozs7Ozs7U0NJbEksTSxHQUFBLE07O0FBSmhCOztBQUNBOztBQUNBOztBQUVPLFVBQVMsTUFBVCxDQUFnQixJQUFoQixFQUFzQixNQUF0QixFQUE4QjtBQUNuQyxPQUFJLENBQUMsSUFBTCxFQUFhO0FBQUUsV0FBTSxJQUFJLEtBQUosQ0FBVSwrQ0FBVixDQUFOO0FBQWtFO0FBQ2pGLE9BQUksQ0FBQyxNQUFMLEVBQWE7QUFBRSxXQUFNLElB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ckM7QUFDRCxFIiwiZmlsZSI6Impzb24tZWRpdG9yLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcIkpzb25FZGl0b3JcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wiSnNvbkVkaXRvclwiXSA9IGZhY3RvcnkoKTtcbn0pKHRoaXMsIGZ1bmN0aW9uKCkge1xucmV0dXJuIFxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvblxuICoqLyIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgOTdmNzYxZmIxZTlmNmJhOTI1NmJcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IGdsb2JhbFtcIkpzb25FZGl0b3JcIl0gPSByZXF1aXJlKFwiLSEvVXNlcnMvZGxldnkvY29kZS9vc3MvanNvbi1lZGl0b3Ivbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9pbmRleC5qcz97XFxcInByZXNldHNcXFwiOltcXFwiZXMyMDE1XFxcIl19IS9Vc2Vycy9kbGV2eS9jb2RlL29zcy9qc29uLWVkaXRvci9pbmRleC5qc1wiKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vaW5kZXguanNcbiAqKiBtb2R1bGUgaWQgPSAwXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJpbXBvcnQge0tleUxpc3R9ICAgICAgZnJvbSAnLi9zcmMva2V5LWxpc3QnXG5pbXBvcnQge0ZpZWxkRWRpdG9yfSAgZnJvbSAnLi9zcmMvZmllbGQtZWRpdG9yJ1xuaW1wb3J0IHtTdHlsZXN9ICAgICAgIGZyb20gJy4vc3JjL3V0aWwnXG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGUoZWxlbSwgY29uZmlnKSB7XG4gIGlmICghZWxlbSkgICB7IHRocm93IG5ldyBFcnJvcignSnNvbkVkaXRvciBpbnN0YW5jZSByZXF1aXJlcyAxc3QgcGFyYW0gYGVsZW1gJykgfVxuICBpZiAoIWNvbmZpZykgeyB0aHJvdyBuZXcgRXJyb3IoJ0pzb25FZGl0b3IgaW5zdGFuY2UgcmVxdWlyZXMgMm5kIHBhcmFtIGBjb25maWdgJykgfVxuICBcbiAgU3R5bGVzLmFkZCgpXG5cbiAgY29uc3QgX2hhbmRsZVNlbGVjdCA9ICh7dGFyZ2V0LCBkZXRhaWx9KSA9PiB7XG4gICAgY29uc29sZS53YXJuKCdTRUxFQ1QnLCBkZXRhaWwsIHRhcmdldClcbiAgICBjb25zdCBjdXJyRm9ybSA9IGVsZW0ucXVlcnlTZWxlY3Rvcignc2VjdGlvbi5qLWVkaXQnKVxuICAgIGNvbnN0IG9wdHMgPSB7XG4gICAgICBkZXB0aDogIHRhcmdldC5kZXB0aCB8fCBudWxsLFxuICAgICAgZWxlbTogICB0YXJnZXQsIFxuICAgICAga2V5OiAgICB0YXJnZXQua2V5LCBcbiAgICAgIG5vZGU6ICAgdGFyZ2V0Lm5vZGUsIFxuICAgICAgcGFyZW50OiB0YXJnZXQucGFyZW50LCBcbiAgICAgIHBhdGg6ICAgdGFyZ2V0LnBhdGgsIFxuICAgICAgdHlwZTogICB0YXJnZXQudHlwZSB8fCAnc3RyaW5nJywgXG4gICAgfVxuICAgIGNvbnN0IGVkaXRvciA9IEZpZWxkRWRpdG9yKG9wdHMpXG4gICAgaWYgKGN1cnJGb3JtICYmIGN1cnJGb3JtLnBhcmVudE5vZGUpIHtcbiAgICAgIGN1cnJGb3JtLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoY3VyckZvcm0pXG4gICAgfVxuICAgIGVsZW0uYXBwZW5kQ2hpbGQoZWRpdG9yKVxuICB9XG4gIGxldCB0cmVlU2VjdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NlY3Rpb24nKVxuICBsZXQga2V5TGlzdCA9IEtleUxpc3Qoe2RhdGE6IGNvbmZpZ30pXG4gIGtleUxpc3QuYWRkRXZlbnRMaXN0ZW5lcignc2VsZWN0ZWQnLCBfaGFuZGxlU2VsZWN0KVxuICB0cmVlU2VjdGlvbi5hcHBlbmRDaGlsZChrZXlMaXN0KVxuICB0cmVlU2VjdGlvbi5jbGFzc0xpc3QuYWRkKCdqLXNpZGUnKVxuICBlbGVtLmFwcGVuZENoaWxkKHRyZWVTZWN0aW9uKVxuICBlbGVtLmNsYXNzTGlzdC5hZGQoJ2pzb24tZWRpdG9yJylcbiAgcmV0dXJuIGtleUxpc3Q7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2luZGV4LmpzXG4gKiovIiwiaW1wb3J0IHtjb25maWd9ICAgICAgICAgICAgICAgICAgICAgICAgIGZyb20gJy4vY29uZmlnJ1xuaW1wb3J0IHtjcmVhdGVFbGVtLCBjbG9zZXN0LCByZW1vdmVBbGx9IGZyb20gJy4vdXRpbCdcbmltcG9ydCB7YXJyb3dzLCB1eH0gICAgICAgICAgICAgICAgICAgICBmcm9tICcuL3N2Zy1pY29ucydcbmltcG9ydCB7Q3VzdG9tRXZlbnQgYXMgX0N1c3RvbUV2ZW50fSAgICBmcm9tICcuL2N1c3RvbS1ldmVudCdcbi8vIF9DdXN0b21FdmVudCBzaG91bGQgYXV0by1hdHRhY2ggdGhlIG9iamVjdCB0byB0aGUgd2luZG93Li4uIGlmIG5vdCBtYWtlIGluaXQgZnVuY3Rpb25cblxuXG5leHBvcnQgZnVuY3Rpb24gS2V5TGlzdCh7ZGF0YSwgcGFyZW50LCBwYXRoID0gW10sIGRlcHRoID0gMH0pIHtcbiAgY29uc3QgbGlzdCA9IGNyZWF0ZUVsZW0oJzx1bCBjbGFzcz1cImota2V5c1wiIGRlcHRoPVwiJyArIGRlcHRoICsgJ1wiPjwvdWw+JylcbiAgT2JqZWN0XG4gICAgLmtleXMoZGF0YSlcbiAgICAuZm9yRWFjaCgoa2V5LCBpZHgsIGFycikgPT4ge1xuICAgICAgY29uc3QgdmFsdWVUeXBlICAgPSBBcnJheS5pc0FycmF5KGRhdGFba2V5XSkgPyAnYXJyYXknIDogdHlwZW9mIGRhdGFba2V5XVxuICAgICAgY29uc3QgaWNvbiAgICAgICAgPSAgICAgICAgICAgIHZhbHVlVHlwZSA9PT0gJ29iamVjdCcgPyBcbiAgICAgICAgICAgICAgICAgICAgICBhcnJvd3MuZG93biAgOiB2YWx1ZVR5cGUgPT09ICdhcnJheScgP1xuICAgICAgICAgICAgICAgICAgICAgIHV4Lmxpc3QgICAgICA6IHZhbHVlVHlwZSA9PT0gJ3N0cmluZycgPyBcbiAgICAgICAgICAgICAgICAgICAgICB1eC5lZGl0ICAgICAgOiB1eC5lZGl0XG4gICAgICBjb25zdCBleHBhbmRhYmxlICA9IHZhbHVlVHlwZSA9PT0gJ29iamVjdCcgPyAnai1leHBhbmRhYmxlJyA6ICcnXG4gICAgICBsZXQgcm93UGF0aCA9IFtdLnNsaWNlLmNhbGwocGF0aCkucHVzaChrZXkgKyAodmFsdWVUeXBlID09PSAnYXJyYXknID8gJ1snIDogdmFsdWVUeXBlID09PSAnb2JqZWN0JyA/ICcuJyA6ICcnKSlcbiAgICAgIGNvbnN0IHJvdyA9IGNyZWF0ZUVsZW0oWyc8bGkgZGVwdGg9XCInLCBkZXB0aCsxLCAnXCIgY2xhc3M9XCJqLWNsb3NlZCAnLCBleHBhbmRhYmxlLCAnIGotdHlwZS0nLCB2YWx1ZVR5cGUsICdcIiBrZXk9XCInLCBrZXksICdcIj4nLCBpY29uLCAnICcsIGtleSwgJzwvbGk+J10uam9pbignJykpXG4gICAgICBPYmplY3QuYXNzaWduKHJvdywge25vZGU6IGRhdGEsIGtleToga2V5LCB0eXBlOiB2YWx1ZVR5cGUsIHBhdGg6IHJvd1BhdGgsIHZhbHVlOiBkYXRhW2tleV19KVxuICAgICAgLy8gY29uc29sZS53YXJuKCdyb3cnLCByb3csIHZhbHVlVHlwZSwgaWNvbilcbiAgICAgIGxpc3QuYXBwZW5kQ2hpbGQocm93KVxuICAgIH0pXG4gIGNvbnN0IF9jbGlja0hhbmRsZXIgPSAoZSkgPT4ge1xuICAgIGNvbnN0IHtwcmV2ZW50RGVmYXVsdCwgdGFyZ2V0fSA9IGVcbiAgICBjb25zdCBsaSA9IGNsb3Nlc3QodGFyZ2V0LCAnbGknLCAyKVxuICAgIGlmIChsaSkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICBjb25zdCB7bm9kZSwga2V5LCB0eXBlLCBwYXRoLCB2YWx1ZX0gPSBsaVxuXG4gICAgICAvLyBjb25zdCBrZXkgICAgICAgPSBsaS5nZXRBdHRyaWJ1dGUoJ2tleScpXG4gICAgICBjb25zdCBuZXh0RGF0YSAgPSBub2RlW2tleV1cbiAgICAgIGNvbnNvbGUud2FybignQ0FOQ0VMTEVEIGNsaWNrIGZvciAlcycsIGtleSwgbGkpXG4gICAgICBjb25zdCBpc09iamVjdCA9IGxpLmNsYXNzTGlzdC5jb250YWlucygnai10eXBlLW9iamVjdCcpXG4gICAgICBjb25zdCBpc0FycmF5ICA9IGxpLmNsYXNzTGlzdC5jb250YWlucygnai10eXBlLWFycmF5JylcbiAgICAgIGlmIChpc09iamVjdCB8fCBpc0FycmF5KSB7XG4gICAgICAgIC8vIGNvbnNvbGUud2FybignX2NsaWNrZWQub24nLCBrZXksIGxpKVxuICAgICAgICBpZiAoIWxpLnF1ZXJ5U2VsZWN0b3IoJ3VsJykpIHtcbiAgICAgICAgICAvLyBjb25zb2xlLndhcm4oJ19jbGlja2VkIC0gbmVlZHMgbGlzdCcsIGxpKVxuICAgICAgICAgIC8vIGRvIHJlY3Vyc2lvbiwgb24gZGVtYW5kXG4gICAgICAgICAgbGkuYXBwZW5kQ2hpbGQoS2V5TGlzdCh7ZGF0YTogbmV4dERhdGEsIHBhcmVudDogbGksIGRlcHRoOiBkZXB0aCArIDF9KSlcbiAgICAgICAgICAvLyBsaS5jbGFzc0xpc3QudG9nZ2xlKCdqLWNsb3NlZCcpXG4gICAgICAgIH1cbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiBsaS5jbGFzc0xpc3QudG9nZ2xlKCdqLWNsb3NlZCcpLCAzMzMpXG4gICAgICAgIHJldHVybiBudWxsXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBldmVudF9ub2RlU2VsZWN0ZWQgPSBuZXcgQ3VzdG9tRXZlbnQoJ3NlbGVjdGVkJywge1xuICAgICAgICAgIGJ1YmJsZXM6IHRydWUsIGNhbmNlbGFibGU6IGZhbHNlLCBcbiAgICAgICAgICBkZXRhaWw6IHtrZXk6IGtleSwgZGF0YTogbmV4dERhdGEsIGVsZW1lbnQ6IGxpLCBkZXB0aDogZGVwdGggKyAxLCBpc09iamVjdCwgaXNBcnJheX1cbiAgICAgICAgfSlcbiAgICAgICAgbGkuZGlzcGF0Y2hFdmVudChldmVudF9ub2RlU2VsZWN0ZWQpXG4gICAgICAgIGNvbnNvbGUud2FybignRmlyZWQgQ3VzdG9tIEV2ZW50OiAnLCBldmVudF9ub2RlU2VsZWN0ZWQpXG4gICAgICB9XG5cbiAgICAgIGNvbnNvbGUuaW5mbygnX2NsaWNrZWQudG9nZ2xlZCcsIGtleSwgbGkpXG4gICAgfVxuICB9XG4gIGNvbnN0IGRlc3Ryb3kgPSAoKSA9PiB7XG4gICAgbGlzdC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIF9jbGlja0hhbmRsZXIpXG4gIH1cbiAgaWYgKCFwYXJlbnQpIHtcbiAgICAvLyBhZGQgb25seSBhdCB0b3Agb2YgdHJlZSwgbWF5YmUgbW92ZSBvdXQgb2YgaGVyZSB1cCBhICdsYXllcidcbiAgICBsaXN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgX2NsaWNrSGFuZGxlcilcbiAgfVxuICByZXR1cm4gT2JqZWN0LmFzc2lnbihsaXN0LCB7ZGVzdHJveX0pXG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9rZXktbGlzdC5qc1xuICoqLyIsImltcG9ydCB7Y3JlYXRlRWxlbSwgY2xvc2VzdCwgcmVtb3ZlQWxsLCByZW1vdmVOb2RlLCB0b0Jvb2x9IGZyb20gJy4vdXRpbCdcbiAgXG5leHBvcnQgZnVuY3Rpb24gRmllbGRFZGl0b3Ioe2tleSwgbm9kZSwgcGFyZW50LCBwYXRoLCBlbGVtLCB0eXBlID0gJ3N0cmluZycsIGRlcHRoID0gMH0pIHtcblxuICBjb25zdCBmb3JtID0gY3JlYXRlRWxlbShgPHNlY3Rpb24gY2xhc3M9XCJqLWVkaXQgai1zaWRlXCIga2V5PVwiJHtrZXl9XCIgdHlwZT1cIiR7dHlwZX1cIiBkZXB0aD1cIiR7ZGVwdGh9XCIgcGF0aD1cIiR7QXJyYXkuaXNBcnJheShwYXRoKSA/IHBhdGguam9pbignOjonKSA6IHBhdGggfVwiPlxuICAgIDxmb3JtIGNsYXNzPVwiZmllbGQtZWRpdG9yXCI+XG4gICAgICA8ZmllbGRzZXQ+XG4gICAgICAgIDxsYWJlbD5OYW1lPC9sYWJlbD5cbiAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cIm5hbWVcIiBjbGFzcz1cIm5hbWVcIiB2YWx1ZT1cIiR7a2V5fVwiIC8+XG4gICAgICA8L2ZpZWxkc2V0PlxuICAgICAgPGZpZWxkc2V0PlxuICAgICAgICA8bGFiZWw+VHlwZTwvbGFiZWw+XG4gICAgICAgIDxzZWxlY3Qgcm93cz1cIjFcIiBuYW1lPVwidHlwZVwiPlxuICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJzdHJpbmdcIj50ZXh0PC9vcHRpb24+XG4gICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cImJvb2xlYW5cIj55ZXMvbm88L29wdGlvbj5cbiAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwibnVtYmVyXCI+bnVtYmVyPC9vcHRpb24+XG4gICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIm9iamVjdFwiPm9iamVjdC9oYXNoL21hcC9rZXktdmFsPC9vcHRpb24+XG4gICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cImFycmF5XCI+bGlzdDwvb3B0aW9uPlxuICAgICAgICA8L3NlbGVjdD5cbiAgICAgIDwvZmllbGRzZXQ+XG4gICAgICA8ZmllbGRzZXQ+XG4gICAgICAgIDxsYWJlbD5WYWx1ZTwvbGFiZWw+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ2YWx1ZUVkaXRvclBsYWNlaG9sZGVyXCI+PC9kaXY+XG4gICAgICA8L2ZpZWxkc2V0PlxuICAgICAgPGZpZWxkc2V0PlxuICAgICAgICA8YnV0dG9uIHR5cGU9XCJzdWJtaXRcIj5TYXZlPC9idXR0b24+XG4gICAgICAgIDxidXR0b24gdHlwZT1cInJlc2V0XCI+Q2FuY2VsPC9idXR0b24+XG4gICAgICAgIDxzdHJvbmc+PC9zdHJvbmc+XG4gICAgICA8L2ZpZWxkc2V0PlxuICAgIDwvZm9ybT5cbiAgPC9zZWN0aW9uPmApXG5cbiAgdmFyIHZhbHVlICAgICAgICAgPSBub2RlW2tleV1cbiAgY29uc3QgcHJldlZhbHMgICAgPSB7fVxuICBjb25zdCBnZXRWYWx1ZSAgICA9ICgpID0+IGdldFZhbHVlRmxkKCkudmFsdWVcbiAgY29uc3QgZ2V0VmFsdWVGbGQgPSAoKSA9PiBmb3JtLnF1ZXJ5U2VsZWN0b3IoJy5maWVsZC12YWx1ZScpIHx8IHt2YWx1ZTogZmFsc2V9XG4gIGNvbnN0IGZsZE5hbWUgICAgID0gZm9ybS5xdWVyeVNlbGVjdG9yKCdpbnB1dFtuYW1lPVwibmFtZVwiXScpXG4gIGNvbnN0IGZsZFR5cGUgICAgID0gZm9ybS5xdWVyeVNlbGVjdG9yKCdzZWxlY3RbbmFtZT1cInR5cGVcIl0nKVxuICBjb25zdCBwbGFjZWhvbGRlciA9IGZvcm0ucXVlcnlTZWxlY3RvcignLnZhbHVlRWRpdG9yUGxhY2Vob2xkZXInKVxuLy8gaW5pdGlhbGl6ZSB2YWx1ZSB0cmFja2VyIChmb3IgbG9jYWwgJ3R5cGUnIGNoYW5nZXMpXG4gIHByZXZWYWxzW3R5cGVdICAgID0gdmFsdWVcblxuLy8gc2V0IHZhbHVlIHcvIGRlZmF1bHRcbiAgZmxkVHlwZS52YWx1ZSAgICAgPSB0eXBlXG5cbi8vIGRlZmluZSBoZWxwZXJzLCBlLmcuIGJ1aWxkIGZpZWxkLCB0cmFuc2l0aW9uIHN0YXRlIChha2EgY29udmVydClcbiAgY29uc3QgZ2V0VmFsdWVGaWVsZEVsZW0gPSAoX3ZhbHVlID0gZ2V0VmFsdWUoKSkgPT4ge1xuICAgIGNvbnNvbGUudHJhY2UoJyAgIFxcdEdlbkZpZWxkKCcsIGtleSwgJywgJywgX3ZhbHVlLCAnKScpXG4gICAgaWYgKGZsZFR5cGUudmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICByZXR1cm4gY3JlYXRlRWxlbShgPGlucHV0IHR5cGU9J3RleHQnIGNsYXNzPSdmaWVsZC12YWx1ZScgbmFtZT0nZmllbGQtdmFsdWUnIHZhbHVlPScke192YWx1ZX0nIC8+YClcbiAgICB9IGVsc2UgaWYgKGZsZFR5cGUudmFsdWUgPT09ICdudW1iZXInKSB7XG4gICAgICByZXR1cm4gY3JlYXRlRWxlbShgPGlucHV0IHR5cGU9J251bWJlcicgY2xhc3M9J2ZpZWxkLXZhbHVlJyBuYW1lPSdmaWVsZC12YWx1ZScgdmFsdWU9JyR7X3ZhbHVlfScgLz5gKVxuICAgIH0gZWxzZSBpZiAoZmxkVHlwZS52YWx1ZSA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICByZXR1cm4gY3JlYXRlRWxlbShgPGlucHV0IHR5cGU9J2NoZWNrYm94JyBjbGFzcz0nZmllbGQtdmFsdWUnIG5hbWU9J2ZpZWxkLXZhbHVlJyB2YWx1ZT0nY2hlY2tlZCcke192YWx1ZSA/IFwiIGNoZWNrZWRcIiA6IFwiXCJ9JyAvPmApXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBjcmVhdGVFbGVtKGA8c3BhbiBjbGFzcz1cImhhcy1lcnJvclwiPjxpbnB1dCB0eXBlPSd0ZXh0JyBjbGFzcz0nZmllbGQtdmFsdWUnIG5hbWU9J2ZpZWxkLXZhbHVlJyB2YWx1ZT0nJHtfdmFsdWV9JyAvPjwvc3Bhbj5gKVxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IGNvbnZlcnQgPSAoe3ZhbHVlLCB0eXBlfSkgPT4ge1xuICAgIGNvbnN0IGN1cnJUeXBlID0gQXJyYXkuaXNBcnJheSh2YWx1ZSkgPyAnYXJyYXknIDogdHlwZW9mIHZhbHVlXG4gICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICBjYXNlICdzdHJpbmcnOiByZXR1cm4gdmFsdWUudG9TdHJpbmcoKVxuICAgICAgLy8gZGVmYXVsdDogcmV0dXJuIHZhbHVlLnRvU3RyaW5nKClcbiAgICAgIGNhc2UgJ251bWJlcic6XG4gICAgICAgIHN3aXRjaCAoY3VyclR5cGUpIHtcbiAgICAgICAgICBjYXNlICdzdHJpbmcnOiByZXR1cm4gcGFyc2VGbG9hdCh2YWx1ZSlcbiAgICAgICAgICBjYXNlICdib29sZWFuJzogcmV0dXJuIHZhbHVlID8gMSA6IDBcbiAgICAgICAgICBjYXNlICdhcnJheSc6IHJldHVybiAtMVxuICAgICAgICAgIGNhc2UgJ29iamVjdCc6IHJldHVybiAtMVxuICAgICAgICAgIGRlZmF1bHQ6ICAgICAgIHJldHVybiAtOTlcbiAgICAgICAgfVxuICAgICAgICBicmVha1xuICAgICAgY2FzZSAnYm9vbGVhbic6XG4gICAgICAgIHJldHVybiB0b0Jvb2wodmFsdWUpXG4gICAgICAgICAgICBcbiAgICAvLyB9IGVsc2UgaWYgKHR5cGUgPT09ICdudW1iZXInKSB7XG4gICAgLy8gfSBlbHNlIGlmICh0eXBlID09PSAnYXJyYXknKSB7XG4gICAgLy8gfSBlbHNlIGlmICh0eXBlID09PSAnb2JqZWN0Jykge1xuICAgIH1cbiAgfVxuICBjb25zdCB1cGRhdGVWYWx1ZUZpZWxkID0gKHYpID0+IHtcbiAgICBjb25zdCBuZXdUeXBlID0gZmxkVHlwZS52YWx1ZVxuICAgIGNvbnN0IG5ld1ZhbCAgPSBjb252ZXJ0KHt2YWx1ZTogdiB8fCBnZXRWYWx1ZSgpLCB0eXBlOiBuZXdUeXBlfSlcbiAgICBjb25zdCBuZXdGbGQgID0gZ2V0VmFsdWVGaWVsZEVsZW0obmV3VmFsKVxuICAgIHJlbW92ZUFsbChwbGFjZWhvbGRlci5jaGlsZE5vZGVzKVxuICAgIHBsYWNlaG9sZGVyLmFwcGVuZENoaWxkKG5ld0ZsZClcbiAgICByZXR1cm4gbmV3RmxkXG4gIH1cblxuLy8gZGVmaW5lIGV2ZW50cywgb25UeXBlQ2hhbmdlZCwgb25TYXZlLCBvbkNhbmNlbFxuICBjb25zdCBvblR5cGVDaGFuZ2VkID0gKHt0YXJnZXR9KSA9PiB7XG4gICAgY29uc29sZS53YXJuKCdUeXBlIENoYW5nZWQhIScsIGFyZ3VtZW50cylcbiAgICBjb25zdCBuZXdUeXBlID0gZmxkVHlwZS52YWx1ZVxuICAgIGNvbnN0IG9sZFZhbCAgPSBnZXRWYWx1ZSgpXG4gICAgdXBkYXRlVmFsdWVGaWVsZCgpXG4gIH1cbiAgY29uc3Qgb25TYXZlID0gKGUpID0+IHtcbiAgICBjb25zdCB7dGFyZ2V0LCBkZXRhaWwsIHByZXZlbnREZWZhdWx0fSA9IGU7XG4gICAgY29uc29sZS53YXJuKCdTYXZlZCEhJywgYXJndW1lbnRzKVxuICAgIHByZXZlbnREZWZhdWx0KClcblxuICB9XG4gIGNvbnN0IG9uQ2FuY2VsID0gKHt0YXJnZXR9KSA9PiB7XG4gICAgY29uc29sZS53YXJuKCdDYW5jZWxsZWQhIScsIGFyZ3VtZW50cylcblxuICB9XG5cbiAgY29uc3Qgc2V0dXAgPSAoKSA9PiB7XG4gICAgLy8gU2V0dXAgZXZlbnRzXG4gICAgZm9ybS5xdWVyeVNlbGVjdG9yKCdidXR0b25bdHlwZT1cInN1Ym1pdFwiXScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb25TYXZlKVxuICAgIGZvcm0ucXVlcnlTZWxlY3RvcignYnV0dG9uW3R5cGU9XCJyZXNldFwiXScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb25DYW5jZWwpXG4gICAgZmxkVHlwZS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBvblR5cGVDaGFuZ2VkKVxuICB9XG5cbiAgY29uc3QgZGVzdHJveSA9ICgpID0+IHtcbiAgICBmb3JtLnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvblt0eXBlPVwic3VibWl0XCJdJykucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBvblNhdmUpXG4gICAgZm9ybS5xdWVyeVNlbGVjdG9yKCdidXR0b25bdHlwZT1cInJlc2V0XCJdJykucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBvbkNhbmNlbClcbiAgICBmbGRUeXBlLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIG9uVHlwZUNoYW5nZWQpXG5cbiAgfVxuXG4gIHNldHVwKClcbiAgXG4gIC8vIGluaXQgVUlcbiAgdXBkYXRlVmFsdWVGaWVsZCh2YWx1ZSlcblxuICByZXR1cm4gT2JqZWN0LmFzc2lnbihmb3JtLCB7ZGVzdHJveX0pXG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9maWVsZC1lZGl0b3IuanNcbiAqKi8iLCJcbi8qKlxuICogVXRpbGl0eSBhcnJheWlmeSBtZXRob2RcbiAqIEFkZCB0byAucHJvdG90eXBlIG9mIEl0ZXJhdG9ycywgQXJyYXlCdWZmZXIsIEFyZ3VtZW50cywgTm9kZUxpc3QsIFNldC9XZWFrU2V0LCB3aGF0ZXZlciAjWU9MT1xuICpcbiAqIC4uLiBPciBqdXN0IHVzZSBhcyB1dGlsLCBhcyBuZWVkZWQsICNKdXN0RG9JdFxuICpcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRvQXJyYXkobGlzdCkge1xuICBsaXN0ID0gQXJyYXkuaXNBcnJheShsaXN0KSA/IGxpc3QgOiB0aGlzXG4gIGxpc3QgPSAhbGlzdCA/IFtdIDogbGlzdFxuICByZXR1cm4gQXJyYXkuZnJvbSAmJiBBcnJheS5mcm9tKGxpc3QpIHx8IFsndXBncmFkZSB5b3VyIGJyb3dzZXIsIHBmZnQnXVxufVxuXG4vKipcbiAqIEdldCBgQXJyYXkuc29ydGAgZnVuY3Rpb24gZm9yIGtleSBuYW1lIGNvbXBhcmlzb25zIChzdXBwb3J0cyByZXZlcnNlKVxuICpcbiAqIFdoZW4gbmFtZSA9PT0gJ2VtYWlsICAgLS0tIFNvcnQgZW1haWwgYXNjZW5kaW5nLlxuICpcbiAqIFdoZW4gbmFtZSA9PT0gJy1lbWFpbCAgLS0tIFNvcnQgZW1haWwgZGVzY2VuZGluZ1xuICpcbiAqIEByZXR1cm5zIFtmdW5jdGlvbl0gY29tcGFyZXIgdXNlZCBpbiBgQXJyYXkuc29ydCgpYFxuICpcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFNvcnRlcihrZXkpIHtcbiAgY29uc3QgX2VuZ2xpc2hTb3J0ICAgICAgICAgPSAoYSwgYikgPT4gKGFba2V5XSA8IGJba2V5XSA/IC0xIDogKGFba2V5XSA+IGJba2V5XSA/IDEgOiAwKSlcbiAgY29uc3QgX2VuZ2xpc2hTb3J0UmV2ZXJzZWQgPSAoYSwgYikgPT4gKGFba2V5XSA+PSBiW2tleV0gPyAtMSA6IChhW2tleV0gPCBiW2tleV0gPyAxIDogMCkpXG5cbiAgaWYgKGtleVswXSA9PT0gJy0nKSB7XG4gICAga2V5ID0ga2V5LnN1YnN0cigxKTtcbiAgICByZXR1cm4gX2VuZ2xpc2hTb3J0UmV2ZXJzZWQ7XG4gIH1cbiAgcmV0dXJuIF9lbmdsaXNoU29ydDtcbn1cblxuLyoqXG4gKlxuICovXG5leHBvcnQgY29uc3QgU3R5bGVzID0ge1xuICBhZGQ6ICgpID0+IHtcbiAgICBsZXQgY3NzID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcignc3R5bGUjanNvbi1lZGl0b3InKVxuICAgIGlmICghY3NzKSB7XG4gICAgICBjb25zdCBzdHlsZXMgID0gcmVxdWlyZSgnIWNzcyFsZXNzIS4vc3R5bGUubGVzcycpXG4gICAgICBjc3MgICAgICAgICAgID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKVxuICAgICAgY3NzLmlkICAgICAgICA9ICdqc29uLWVkaXRvcidcbiAgICAgIGNzcy5pbm5lckhUTUwgPSBzdHlsZXNcbiAgICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoY3NzKVxuICAgIH1cbiAgfSxcbiAgcmVtb3ZlOiAoKSA9PiB7XG4gICAgbGV0IGNzcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ3N0eWxlI2pzb24tZWRpdG9yJylcbiAgICBpZiAoY3NzICYmIGNzcy5wYXJlbnROb2RlKSB7IGNzcy5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGNzcykgfVxuICB9XG59XG5cbi8qKlxuICogQWNjZXB0cyBlbGVtZW50cyBmcm9tIGBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsYFxuICpcbiAqIFJlbW92ZXMgYWxsIGNoaWxkcmVuIG9mIEBub2RlXG4gKlxuICovXG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlQWxsKG5vZGUpIHtcbiAgaWYgKHRoaXMgaW5zdGFuY2VvZiBOb2RlTGlzdCkgeyBub2RlID0gdGhpczsgfVxuXG4gIHRvQXJyYXkobm9kZSlcbiAgICAuZm9yRWFjaChlbCA9PiBlbC5wYXJlbnROb2RlICYmIGVsLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZWwpKVxuICByZXR1cm4gbm9kZVxufVxuXG4vKipcbiAqIEFjY2VwdHMgRWxlbWVudCAvIE5vZGUgaXNoIG9iamVjdHMgKGkuZS4gZnJvbSBgZG9jdW1lbnQucXVlcnlTZWxlY3RvcmApXG4gKlxuICogT25seSByZW1vdmVzIEBub2RlICoqaWYgaXQgaGFzIGEgdmFsaWQgYHBhcmVudE5vZGVgIGNvbnRleHQqKlxuICpcbiAqIEFsdGVybmF0ZSB1c2FnZSwgcHJvdG90eXBlIG9mIE5vZGU6XG4gKiBgTm9kZS5wcm90b3R5cGUucmVtb3ZlTm9kZSA9IHJlbW92ZU5vZGU7YFxuICpcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZU5vZGUobm9kZSkge1xuICBpZiAodGhpcyBpbnN0YW5jZW9mIE5vZGUpIHsgbm9kZSA9IHRoaXM7IH1cblxuICBpZiAobm9kZS5wYXJlbnROb2RlICYmIG5vZGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCkge1xuICAgIG5vZGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChub2RlKVxuICB9XG4gIHJldHVybiBub2RlXG59XG5cbi8qKlxuICogVG90ZXMgb2J2aVxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0SWQoe2lkLCBfaWQsIGtleX0pIHsgcmV0dXJuIGlkIHx8IF9pZCB8fCBrZXk7IH1cblxuLyoqXG4gKiBcbiAqL1xuZXhwb3J0IGNvbnN0IGNsb3Nlc3QgPSAoZWxlbSwgc2VsZWN0b3IsIGxpbWl0ID0gbnVsbCkgPT4ge1xuICBpZiAobGltaXQgIT09IG51bGwgJiYgbGltaXQgPD0gMCkgeyByZXR1cm4gZmFsc2UgfVxuXG4gIHJldHVybiAhZWxlbSA/IG51bGxcbiAgICAgICAgIDogZWxlbS5tYXRjaGVzICYmIGVsZW0ubWF0Y2hlcyhzZWxlY3RvcikgXG4gICAgICAgICA/IGVsZW0gOiBlbGVtLmNsYXNzTGlzdCAmJiBlbGVtLmNsYXNzTGlzdC5jb250YWlucyhzZWxlY3RvcilcbiAgICAgICAgID8gZWxlbSA6IGNsb3Nlc3QoZWxlbS5wYXJlbnROb2RlLCBzZWxlY3RvciwgKGxpbWl0ICE9PSBudWxsID8gbGltaXQgLSAxIDogbGltaXQpKVxufVxuXG4vKipcbiAqIHRvQm9vbCBjb252ZXJ0cyBhbnl0aGluZyB0byBhIGJvb2xlYW4gLSBzZWUgY29kZSBmb3IgZGV0YWlsc1xuICovXG5leHBvcnQgY29uc3QgdG9Cb29sID0gKHN0cikgPT4ge1xuICBpZiAodHlwZW9mIHN0ciA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgcmV0dXJuIHN0clxuICB9XG5cbiAgaWYgKHR5cGVvZiBzdHIgPT09ICdzdHJpbmcnKSB7XG4gICAgc3RyID0gKHN0ci5sZW5ndGggPj0gMSA/IHN0ci50b1VwcGVyQ2FzZSgpWzBdIDogc3RyKVxuICAgIHJldHVybiBbJ1knLCAnMScsICdUJ10uaW5kZXhPZihzdHIpID09PSAwXG4gIH1cblxuICByZXR1cm4gc3RyID8gdHJ1ZSA6IGZhbHNlXG59XG5cbi8qKlxuICogV2FybmluZzogUHJpdmF0ZS9sb2NhbCB1c2Ugb25seS4gRG8gbm90IGhvaXN0LlxuICogKioqIFVuc2FmZSBIVE1ML3N0cmluZyBoYW5kbGluZyAqKipcbiAqL1xuZXhwb3J0IGNvbnN0IGNyZWF0ZUVsZW0gPSBodG1sID0+IHtcbiAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpXG4gIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gIGRpdi5pbm5lckhUTUwgPSBodG1sIC8vIFBvdGVudGlhbCBTZWN1cml0eSBFeHBsb2l0IFZlY3RvciEhISEhIVxuICByZXR1cm4gZGl2LmNoaWxkTm9kZXMubGVuZ3RoID09PSAxID8gZGl2LmNoaWxkTm9kZXNbMF0gOiBkaXZcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3V0aWwuanNcbiAqKi8iLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikoKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIi51bnNlbGVjdGFibGUge1xcbiAgdXNlci1zZWxlY3Q6IG5vbmU7XFxuICAtbW96LXVzZXItc2VsZWN0OiBub25lO1xcbiAgLXdlYmtpdC11c2VyLXNlbGVjdDogbm9uZTtcXG4gIC1tcy11c2VyLXNlbGVjdDogbm9uZTtcXG59XFxuLmoteHMtMSxcXG4uai14cy0yLFxcbi5qLXhzLTMsXFxuLmoteHMtNCxcXG4uai14cy01LFxcbi5qLXhzLTYsXFxuLmoteHMtNyxcXG4uai14cy04LFxcbi5qLXhzLTksXFxuLmoteHMtMTAsXFxuLmoteHMtMTEsXFxuLmoteHMtMTIge1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG59XFxuLmoteHMtMSB7XFxuICB3aWR0aDogOC4zMzMzJTtcXG59XFxuLmoteHMtMiB7XFxuICB3aWR0aDogMTYuNjY2NiU7XFxufVxcbi5qLXhzLTMge1xcbiAgd2lkdGg6IDI0Ljk5OTklO1xcbn1cXG4uai14cy00IHtcXG4gIHdpZHRoOiAzMy4zMzMyJTtcXG59XFxuLmoteHMtNSB7XFxuICB3aWR0aDogNDEuNjY2NSU7XFxufVxcbi5qLXhzLTYge1xcbiAgd2lkdGg6IDQ5Ljk5OTglO1xcbn1cXG4uai14cy03IHtcXG4gIHdpZHRoOiA1OC4zMzMxJTtcXG59XFxuLmoteHMtOCB7XFxuICB3aWR0aDogNjYuNjY2NCU7XFxufVxcbi5qLXhzLTkge1xcbiAgd2lkdGg6IDc0Ljk5OTclO1xcbn1cXG4uai14cy0xMCB7XFxuICB3aWR0aDogODMuMzMzMSU7XFxufVxcbi5qLXhzLTExIHtcXG4gIHdpZHRoOiA5MS42NjYzJTtcXG59XFxuLmoteHMtMTIge1xcbiAgd2lkdGg6IDk5Ljk5OTYlO1xcbn1cXG51bC5qLWtleXMge1xcbiAgd2lkdGg6IDI1MHB4O1xcbiAgbGlzdC1zdHlsZTogbm9uZTtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIHVzZXItc2VsZWN0OiBub25lO1xcbiAgLW1vei11c2VyLXNlbGVjdDogbm9uZTtcXG4gIC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7XFxuICAtbXMtdXNlci1zZWxlY3Q6IG5vbmU7XFxufVxcbnVsLmota2V5cyBsaSB7XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIG1pbi13aWR0aDogMjUwcHg7XFxuICBtaW4taGVpZ2h0OiAyMnB4O1xcbiAgdGV4dC1hbGlnbjogbGVmdDtcXG4gIHBhZGRpbmctbGVmdDogMTBweDtcXG4gIG1hcmdpbi1sZWZ0OiAtMzBweDtcXG59XFxudWwuai1rZXlzIC5qLWljb24tZWRpdCxcXG51bC5qLWtleXMgLmotaWNvbi1saXN0LFxcbnVsLmota2V5cyAuai1pY29uLWFycm93LWRvd24ge1xcbiAgem9vbTogNDAlO1xcbn1cXG51bC5qLWtleXMgbGk6bm90KC5qLWNsb3NlZCkgPiAuai1pY29uLWFycm93LWRvd24ge1xcbiAgdHJhbnNmb3JtOiByb3RhdGUoLTkwZGVnKSAhaW1wb3J0YW50O1xcbn1cXG51bC5qLWtleXMgLmotY2xvc2VkID4gdWwge1xcbiAgZGlzcGxheTogbm9uZTtcXG59XFxudWwuai1rZXlzIC5qLWNsb3NlZDpiZWZvcmUge1xcbiAgY29udGVudDogJyAnICFpbXBvcnRhbnQ7XFxufVxcbnVsLmota2V5cyAuai1jbG9zZWQgPiAuai1pY29uLWFycm93LWRvd24ge1xcbiAgdHJhbnNmb3JtOiByb3RhdGUoMGRlZykgIWltcG9ydGFudDtcXG59XFxudWwuai1rZXlzIC5qLWljb24tcGx1czpiZWZvcmUge1xcbiAgY29udGVudDogJyAnO1xcbn1cXG51bC5qLWtleXMgLmotaWNvbi1saXN0OmJlZm9yZSB7XFxuICBjb250ZW50OiAnICc7XFxufVxcbnVsLmota2V5cyAuai1pY29uLXRleHQ6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6ICdcXFxcMjEzOSAgICcgIWltcG9ydGFudDtcXG59XFxudWwuai1rZXlzIC5qLWljb24tZGVmYXVsdDpiZWZvcmUge1xcbiAgY29udGVudDogJ1xcXFwxRjUyNCAgIFxcXFxGRTBGJyAhaW1wb3J0YW50O1xcbn1cXG5cIiwgXCJcIl0pO1xuXG4vLyBleHBvcnRzXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9jc3MtbG9hZGVyIS4vfi9sZXNzLWxvYWRlciEuL3NyYy9zdHlsZS5sZXNzXG4gKiogbW9kdWxlIGlkID0gNVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLypcclxuXHRNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxyXG5cdEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcclxuKi9cclxuLy8gY3NzIGJhc2UgY29kZSwgaW5qZWN0ZWQgYnkgdGhlIGNzcy1sb2FkZXJcclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcclxuXHR2YXIgbGlzdCA9IFtdO1xyXG5cclxuXHQvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXHJcblx0bGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xyXG5cdFx0dmFyIHJlc3VsdCA9IFtdO1xyXG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0dmFyIGl0ZW0gPSB0aGlzW2ldO1xyXG5cdFx0XHRpZihpdGVtWzJdKSB7XHJcblx0XHRcdFx0cmVzdWx0LnB1c2goXCJAbWVkaWEgXCIgKyBpdGVtWzJdICsgXCJ7XCIgKyBpdGVtWzFdICsgXCJ9XCIpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHJlc3VsdC5wdXNoKGl0ZW1bMV0pO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gcmVzdWx0LmpvaW4oXCJcIik7XHJcblx0fTtcclxuXHJcblx0Ly8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcclxuXHRsaXN0LmkgPSBmdW5jdGlvbihtb2R1bGVzLCBtZWRpYVF1ZXJ5KSB7XHJcblx0XHRpZih0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIilcclxuXHRcdFx0bW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgXCJcIl1dO1xyXG5cdFx0dmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcclxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciBpZCA9IHRoaXNbaV1bMF07XHJcblx0XHRcdGlmKHR5cGVvZiBpZCA9PT0gXCJudW1iZXJcIilcclxuXHRcdFx0XHRhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XHJcblx0XHR9XHJcblx0XHRmb3IoaSA9IDA7IGkgPCBtb2R1bGVzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciBpdGVtID0gbW9kdWxlc1tpXTtcclxuXHRcdFx0Ly8gc2tpcCBhbHJlYWR5IGltcG9ydGVkIG1vZHVsZVxyXG5cdFx0XHQvLyB0aGlzIGltcGxlbWVudGF0aW9uIGlzIG5vdCAxMDAlIHBlcmZlY3QgZm9yIHdlaXJkIG1lZGlhIHF1ZXJ5IGNvbWJpbmF0aW9uc1xyXG5cdFx0XHQvLyAgd2hlbiBhIG1vZHVsZSBpcyBpbXBvcnRlZCBtdWx0aXBsZSB0aW1lcyB3aXRoIGRpZmZlcmVudCBtZWRpYSBxdWVyaWVzLlxyXG5cdFx0XHQvLyAgSSBob3BlIHRoaXMgd2lsbCBuZXZlciBvY2N1ciAoSGV5IHRoaXMgd2F5IHdlIGhhdmUgc21hbGxlciBidW5kbGVzKVxyXG5cdFx0XHRpZih0eXBlb2YgaXRlbVswXSAhPT0gXCJudW1iZXJcIiB8fCAhYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xyXG5cdFx0XHRcdGlmKG1lZGlhUXVlcnkgJiYgIWl0ZW1bMl0pIHtcclxuXHRcdFx0XHRcdGl0ZW1bMl0gPSBtZWRpYVF1ZXJ5O1xyXG5cdFx0XHRcdH0gZWxzZSBpZihtZWRpYVF1ZXJ5KSB7XHJcblx0XHRcdFx0XHRpdGVtWzJdID0gXCIoXCIgKyBpdGVtWzJdICsgXCIpIGFuZCAoXCIgKyBtZWRpYVF1ZXJ5ICsgXCIpXCI7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGxpc3QucHVzaChpdGVtKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH07XHJcblx0cmV0dXJuIGxpc3Q7XHJcbn07XHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXG4gKiogbW9kdWxlIGlkID0gNlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiZXhwb3J0IGNvbnN0IGNvbmZpZyA9IHtcbiAgZGVidWc6IGZhbHNlXG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9jb25maWcuanNcbiAqKi8iLCJcbmV4cG9ydCBjb25zdCBhcnJvd3MgPSB7XG4gIC8vIHVwOiBgPHN2ZyBjbGFzcz1cImotaWNvbi1hcnJvdyBqLWljb24tYXJyb3ctdXBcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgeG1sbnM6eGxpbms9XCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rXCIgc3R5bGU9XCJpc29sYXRpb246aXNvbGF0ZVwiIHdpZHRoPVwiODVcIiBoZWlnaHQ9XCI0OVwiPjxwYXRoIGQ9XCJNIDgyIDQ0Ljk5OTk5OTk5OTk5OTkgTCA0Mi45ODc0MTgxMjI0NDczOCA0LjAyNDE1Mzg4MDU2MzMwOSBNIDQgNDUgTCA0Mi45ODc0MTgxMjI0NDcyNyA0XCIgc3R5bGU9XCJmaWxsOm5vbmU7c3Ryb2tlOiMwMDAwMDA7c3Ryb2tlLXdpZHRoOjQ7c3Ryb2tlLWxpbmVjYXA6cm91bmQ7c3Ryb2tlLWxpbmVqb2luOmJldmVsO3N0cm9rZS1taXRlcmxpbWl0OjM7XCIvPjwvc3ZnPmAsXG4gIGRvd246IGA8c3ZnIGNsYXNzPVwiai1pY29uLWFycm93IGotaWNvbi1hcnJvdy1kb3duXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHhtbG5zOnhsaW5rPVwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGlua1wiIHN0eWxlPVwiaXNvbGF0aW9uOmlzb2xhdGVcIiB3aWR0aD1cIjMzXCIgaGVpZ2h0PVwiMjJcIj48cGF0aCBkPVwiTSAyOCA0IEwgMTUuOTk2MTI4NjUzMDYwNzQgMTYuOTkyMzQxNDUyNTA0MzEgTSA0IDQgTCAxNS45OTYxMjg2NTMwNjA2ODMgMTdcIiBzdHlsZT1cImZpbGw6bm9uZTtzdHJva2U6IzAwMDAwMDtzdHJva2Utd2lkdGg6ODtzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbGluZWpvaW46YmV2ZWw7c3Ryb2tlLW1pdGVybGltaXQ6MztcIi8+PC9zdmc+YCxcbiAgLy8gcmlnaHQ6IGA8c3ZnIGNsYXNzPVwiai1pY29uLWFycm93IGotaWNvbi1hcnJvdy1yaWdodFwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB4bWxuczp4bGluaz1cImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmtcIiBzdHlsZT1cImlzb2xhdGlvbjppc29sYXRlXCIgd2lkdGg9XCI1MFwiIGhlaWdodD1cIjg0XCI+PHBhdGggZD1cIk0gNC4wMDAwMDAwMDAwMDAxMjggODAgTCA0NiA0MS40OTk4OTYyMDQyNjc3NyBNIDQgMyBMIDQ1Ljk5OTk5OTk5OTk5OTg0NCA0MS40OTk4OTYyMDQyNjc3MzVcIiBzdHlsZT1cImZpbGw6bm9uZTtzdHJva2U6IzAwMDAwMDtzdHJva2Utd2lkdGg6NDtzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbGluZWpvaW46YmV2ZWw7c3Ryb2tlLW1pdGVybGltaXQ6MztcIi8+PC9zdmc+YCxcbiAgLy8gbGVmdDogYDxzdmcgY2xhc3M9XCJqLWljb24tYXJyb3cgai1pY29uLWFycm93LWxlZnRcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgeG1sbnM6eGxpbms9XCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rXCIgc3R5bGU9XCJpc29sYXRpb246aXNvbGF0ZVwiIHdpZHRoPVwiNDlcIiBoZWlnaHQ9XCI4NlwiPjxwYXRoIGQ9XCJNIDQ0Ljk5OTk5OTk5OTk5OTg5IDgyIEwgNC4wMjQxNTM4ODA1NjMzMDk1IDQyLjk4NzQxODEyMjQ0NzM1IE0gNDUgNCBMIDQgNDIuOTg3NDE4MTIyNDQ3MjQ1XCIgc3R5bGU9XCJmaWxsOm5vbmU7c3Ryb2tlOiMwMDAwMDA7c3Ryb2tlLXdpZHRoOjQ7c3Ryb2tlLWxpbmVjYXA6cm91bmQ7c3Ryb2tlLWxpbmVqb2luOmJldmVsO3N0cm9rZS1taXRlcmxpbWl0OjM7XCIvPjwvc3ZnPmAsXG59XG5cbmV4cG9ydCBjb25zdCB1eCA9IHtcbiAgbGlzdDogYDxzdmcgY2xhc3M9XCJqLWljb24tbGlzdFwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB4bWxuczp4bGluaz1cImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmtcIiBzdHlsZT1cImlzb2xhdGlvbjppc29sYXRlXCIgd2lkdGg9XCIyNFwiIGhlaWdodD1cIjEzLjNcIj48cGF0aCBkPVwiIE0gMCA4IEwgMi42IDggTCAyLjYgNS4zIEwgMCA1LjMgTCAwIDggWiAgTSAwIDEzLjMgTCAyLjYgMTMuMyBMIDIuNiAxMC42IEwgMCAxMC42IEwgMCAxMy4zIFogIE0gMCAyLjYgTCAyLjYgMi42IEwgMi42IDAgTCAwIDAgTCAwIDIuNiBaICBNIDUuMyA4IEwgMjQgOCBMIDI0IDUuMyBMIDUuMyA1LjMgTCA1LjMgOCBaICBNIDUuMyAxMy4zIEwgMjQgMTMuMyBMIDI0IDEwLjYgTCA1LjMgMTAuNiBMIDUuMyAxMy4zIFogIE0gNS4zIDAgTCA1LjMgMi42IEwgMjQgMi42IEwgMjQgMCBMIDUuMyAwIFogXCIgZmlsbC1ydWxlPVwiZXZlbm9kZFwiIGZpbGw9XCJyZ2IoMCwwLDApXCIgc3Ryb2tlLXdpZHRoPVwiMS41XCIgc3Ryb2tlPVwicmdiYSgwLDAsMCwwKVwiIHN0cm9rZS1saW5lY2FwPVwiYnV0dFwiLz48cGF0aCBkPVwiIE0gMCAwIEwgMzYgMCBMIDM2IDM2IEwgMCAzNiBMIDAgMCBaIFwiIGZpbGw9XCJyZ2JhKDAsMCwwLDApXCIgc3Ryb2tlLXdpZHRoPVwiMS41XCIgc3Ryb2tlPVwicmdiYSgwLDAsMCwwKVwiIHN0cm9rZS1saW5lY2FwPVwiYnV0dFwiLz48L3N2Zz5gLFxuICBlZGl0OiBgPHN2ZyBjbGFzcz1cImotaWNvbi1lZGl0XCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHhtbG5zOnhsaW5rPVwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGlua1wiIHN0eWxlPVwiaXNvbGF0aW9uOmlzb2xhdGVcIiB3aWR0aD1cIjI0XCIgaGVpZ2h0PVwiMjRcIj48cGF0aCBkPVwiIE0gLTQuNDQwOCAxOS4wMDA2IEwgLTQuNDQwOCAyNCBMIDQuOTk5MyAyNCBMIDE5Ljc0MzkgOS4yNTUzIEwgMTQuNzQ0NiA0LjI1NjAgTCAtNC40NDA4IDE5LjAwMDYgWiAgTSAyMy42MSA1LjM4OTIgQyAyNC4xMjk5IDQuODY5MyAyNC4xMjk5IDQuMDI5NCAyMy42MSAzLjUwOTUgTCAyMC40OSAwLjM4OTkgQyAxOS45NzA1IC0wLjEyOTkgMTkuMTMwNiAtMC4xMjk5IDE4LjYxMDcgMC4zODk5IEwgMTYuMTcxIDIuODI5NiBMIDIxLjE3MDMgNy44Mjg5IEwgMjMuNjEgNS4zODkyIFogXCIgZmlsbC1ydWxlPVwiZXZlbm9kZFwiIGZpbGw9XCJyZ2IoMCwwLDApXCIgc3Ryb2tlLXdpZHRoPVwiMS41MFwiIHN0cm9rZT1cInJnYmEoMCwwLDAsMClcIiBzdHJva2UtbGluZWNhcD1cImJ1dHRcIi8+PHBhdGggZD1cIiBNIDAgMCBMIDM1IDAgTCAzNSAzNSBMIDAgMzUgTCAwIDAgWiBcIiBmaWxsPVwicmdiYSgwLDAsMCwwKVwiIHN0cm9rZS13aWR0aD1cIjEuNVwiIHN0cm9rZT1cInJnYmEoMCwwLDAsMClcIiBzdHJva2UtbGluZWNhcD1cImJ1dHRcIi8+PC9zdmc+YCxcbiAgLy8gZWRpdExpbmU6IGA8c3ZnIGNsYXNzPVwiai1pY29uLWVkaXQtbGluZVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB4bWxuczp4bGluaz1cImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmtcIiBzdHlsZT1cImlzb2xhdGlvbjppc29sYXRlXCIgd2lkdGg9XCIzNlwiIGhlaWdodD1cIjM2XCI+PHBhdGggZD1cIiBNIDI2LjYyIDEwLjUwIEwgMjEgNC44NyBMIDYgMTkuODcgTCA2IDI1LjUwIEwgMTEuNjIgMjUuNSBMIDI2LjYgMTAuNSBaICBNIDMxLjA2IDYuMDYgQyAzMS42NSA1LjQ3IDMxLjY1IDQuNTMzNzUgMzEuMDY1IDMuOTQgTCAyNy41NTUgMC40MyBDIDI2Ljk3IC0wLjE0IDI2LjAyMiAtMC4xNCAyNS40NCAwLjQzIEwgMjIuNSAzLjM3IEwgMjguMTI1IDkgTCAzMS4wNjUgNi4wNiBaIFwiIGZpbGwtcnVsZT1cImV2ZW5vZGRcIiBmaWxsPVwicmdiKDAsMCwwKVwiIHN0cm9rZS13aWR0aD1cIjEuNVwiIHN0cm9rZT1cInJnYmEoMCwwLDAsMClcIiBzdHJva2UtbGluZWNhcD1cImJ1dHRcIi8+PHBhdGggZD1cIiBNIDAgMCBMIDM2IDAgTCAzNiAzNiBMIDAgMzYgTCAwIDAuMDAzNzQ5OTk5OTk5OTk5OTIgWiBcIiBmaWxsPVwicmdiYSgwLDAsMCwwKVwiIHN0cm9rZS13aWR0aD1cIjEuNVwiIHN0cm9rZT1cInJnYmEoMCwwLDAsMClcIiBzdHJva2UtbGluZWNhcD1cImJ1dHRcIi8+PHBhdGggZD1cIiBNIDAgMzAgTCAzNiAzMCBMIDM2IDM2IEwgMCAzNiBMIDAgMzAgWiBcIiBmaWxsPVwicmdiKDAsMCwwKVwiIGZpbGwtb3BhY2l0eT1cIjAuNFwiIHN0cm9rZS13aWR0aD1cIjEuNVwiIHN0cm9rZT1cInJnYmEoMCwwLDAsMClcIiBzdHJva2UtbGluZWNhcD1cImJ1dHRcIi8+PC9zdmc+YCxcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3N2Zy1pY29ucy5qc1xuICoqLyIsImV4cG9ydCB7Q3VzdG9tRXZlbnR9O1xuXG5mdW5jdGlvbiBDdXN0b21FdmVudChldmVudCwgcGFyYW1zID0ge2J1YmJsZXM6IGZhbHNlLCBjYW5jZWxhYmxlOiBmYWxzZSwgZGV0YWlsOiB1bmRlZmluZWR9KSB7XG4gIHZhciBldnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCggJ0N1c3RvbUV2ZW50JyApO1xuICBldnQuaW5pdEN1c3RvbUV2ZW50KCBldmVudCwgcGFyYW1zLmJ1YmJsZXMsIHBhcmFtcy5jYW5jZWxhYmxlLCBwYXJhbXMuZGV0YWlsICk7XG4gIHJldHVybiBldnQ7XG59XG5cbmlmICh3aW5kb3cgJiYgdHlwZW9mIHdpbmRvdy5DdXN0b21FdmVudCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gIC8vIG5vIG5lZWQgdG8gcG9seWZpbGxcbn0gZWxzZSB7XG4gIHdpbmRvdy5DdXN0b21FdmVudCA9IEN1c3RvbUV2ZW50O1xuICBDdXN0b21FdmVudC5wcm90b3R5cGUgPSB3aW5kb3cuRXZlbnQucHJvdG90eXBlO1xufVxuXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9jdXN0b20tZXZlbnQuanNcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9