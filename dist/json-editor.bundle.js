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
	
	      var nextData = node[key];
	      var isObject = li.classList.contains('j-type-object');
	      var isArray = li.classList.contains('j-type-array');
	      console.warn('CANCELLED click for %s', key, 'isObject=', isObject, 'isArray=', isArray, 'elem=', li);
	      if (isObject || isArray) {
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
	      return (0, _util.createElem)('<input type=\'checkbox\' class=\'field-value\' name=\'field-value\' value=\'checked\'' + (_value ? ' checked' : '') + '\' />');
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
	    (0, _util.removeNode)(form);
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
	// jscs:disable maximumLineLength, requirePaddingNewLinesBeforeLineComments
	var arrows = exports.arrows = {
	  // up: `<svg class="j-icon-arrow j-icon-arrow-up" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="isolation:isolate" width="85" height="49"><path d="M 82 44.9999999999999 L 42.98741812244738 4.024153880563309 M 4 45 L 42.98741812244727 4" style="fill:none;stroke:#000000;stroke-width:4;stroke-linecap:round;stroke-linejoin:bevel;stroke-miterlimit:3;"/></svg>`,
	  down: "<svg class=\"j-icon-arrow j-icon-arrow-down\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" style=\"isolation:isolate\" width=\"33\" height=\"22\">\n    <path d=\"M 28 4 L 15.99612865306074 16.99234145250431 M 4 4 L 15.996128653060683 17\" style=\"fill:none;stroke:#000000;stroke-width:8;stroke-linecap:round;stroke-linejoin:bevel;stroke-miterlimit:3;\"/>\n  </svg>"
	};
	
	var ux = exports.ux = {
	  list: "<svg class=\"j-icon-list\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" style=\"isolation:isolate\" width=\"24\" height=\"13.3\">\n    <path d=\" M 0 8 L 2.6 8 L 2.6 5.3 L 0 5.3 L 0 8 Z  M 0 13.3 L 2.6 13.3 L 2.6 10.6 L 0 10.6 L 0 13.3 Z  M 0 2.6 L 2.6 2.6 L 2.6 0 L 0 0 L 0 2.6 Z  M 5.3 8 L 24 8 L 24 5.3 L 5.3 5.3 L 5.3 8 Z  M 5.3 13.3 L 24 13.3 L 24 10.6 L 5.3 10.6 L 5.3 13.3 Z  M 5.3 0 L 5.3 2.6 L 24 2.6 L 24 0 L 5.3 0 Z\"\n     fill-rule=\"evenodd\" fill=\"rgb(0,0,0)\" stroke-width=\"1.5\" stroke=\"rgba(0,0,0,0)\" stroke-linecap=\"butt\"/>\n    <path d=\" M 0 0 L 36 0 L 36 36 L 0 36 L 0 0 Z \" fill=\"rgba(0,0,0,0)\" stroke-width=\"1.5\" stroke=\"rgba(0,0,0,0)\" stroke-linecap=\"butt\"/>\n  </svg>",
	  edit: "<svg class=\"j-icon-edit\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" style=\"isolation:isolate\" width=\"24\" height=\"24\">\n    <path d=\" M -4.4408 19.0006 L -4.4408 24 L 4.9993 24 L 19.7439 9.2553 L 14.7446 4.2560 L -4.4408 19.0006 Z  M 23.61 5.3892 C 24.1299 4.8693 24.1299 4.0294 23.61 3.5095 L 20.49 0.3899 C 19.9705 -0.1299 19.1306 -0.1299 18.6107 0.3899 L 16.171 2.8296 L 21.1703 7.8289 L 23.61 5.3892 Z\"\n      fill-rule=\"evenodd\" fill=\"rgb(0,0,0)\" stroke-width=\"1.50\" stroke=\"rgba(0,0,0,0)\" stroke-linecap=\"butt\"/>\n    <path d=\" M 0 0 L 35 0 L 35 35 L 0 35 L 0 0 Z \" fill=\"rgba(0,0,0,0)\" stroke-width=\"1.5\" stroke=\"rgba(0,0,0,0)\" stroke-linecap=\"butt\"/>\n  </svg>"
	};

/***/ },
/* 9 */
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

/***/ }
/******/ ])
});
;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBjMTUzZTc3MjRiODNiZDMxMjZhZiIsIndlYnBhY2s6Ly8vLi9pbmRleC5qcz80YzA4Iiwid2VicGFjazovLy8uL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9rZXktbGlzdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZmllbGQtZWRpdG9yLmpzIiwid2VicGFjazovLy8uL3NyYy91dGlsLmpzIiwid2VicGFjazovLy8uL3NyYy9zdHlsZS5sZXNzIiwid2VicGFjazovLy8uL34vY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbmZpZy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc3ZnLWljb25zLmpzIiwid2VicGFjazovLy8uL3NyYy9jdXN0b20tZXZlbnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7O0FDdENBLDRHQUFrSixFOzs7Ozs7Ozs7Ozs7U0NJbEksTSxHQUFBLE07O0FBSmhCOztBQUNBOztBQUNBOztBQUVPLFVBQVMsTUFBVCxDQUFnQixJQUFoQixFQUFzQixNQUF0QixFQUE4QjtBQUNuQyxPQUFJLENBQUMsSUFBTCxFQUFhO0FBQUUsV0FBTSxJQUFJLEtBQUosQ0FBVSwrQ0FBVixDQUFOO0FBQWtFO0FBQ2pGLE9BQUksQ0FBQyxNQUFMLEVBQWE7QUFBRSxXQUFNLElB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QUFyQixFQUErRjtBQUFBLE9BQW5FLE1BQW1FLHlEQUExRCxFQUFFLFNBQVMsS0FBWCxFQUFrQixZQUFZLEtBQTlCLEVBQXFDLFFBQVEsU0FBN0MsRUFBMEQ7O0FBQzdGLE9BQUksTUFBTSxTQUFTLFdBQVQsQ0FBcUIsYUFBckIsQ0FBVjtBQUNBLE9BQUksZUFBSixDQUFvQixLQUFwQixFQUEyQixPQUFPLE9BQWxDLEVBQTJDLE9BQU8sVUFBbEQsRUFBOEQsT0FBTyxNQUFyRTtBQUNBLFVBQU8sR0FBUDtBQUNEOztBQUVELEtBQUksVUFBVSxPQUFPLE9BQU8sV0FBZCxLQUE4QixVQUE1QyxFQUF3RDtBQUN0RCxVQUFPLFdBQVAsR0FBcUIsV0FBckI7QUFDQSxlQUFZLFNBQVosR0FBd0IsT0FBTyxLQUFQLENBQWEsU0FBckM7QUFDRCxFIiwiZmlsZSI6Impzb24tZWRpdG9yLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcIkpzb25FZGl0b3JcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wiSnNvbkVkaXRvclwiXSA9IGZhY3RvcnkoKTtcbn0pKHRoaXMsIGZ1bmN0aW9uKCkge1xucmV0dXJuIFxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvblxuICoqLyIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgYzE1M2U3NzI0YjgzYmQzMTI2YWZcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IGdsb2JhbFtcIkpzb25FZGl0b3JcIl0gPSByZXF1aXJlKFwiLSEvVXNlcnMvZGxldnkvY29kZS9vc3MvanNvbi1lZGl0b3Ivbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9pbmRleC5qcz97XFxcInByZXNldHNcXFwiOltcXFwiZXMyMDE1XFxcIl19IS9Vc2Vycy9kbGV2eS9jb2RlL29zcy9qc29uLWVkaXRvci9pbmRleC5qc1wiKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vaW5kZXguanNcbiAqKiBtb2R1bGUgaWQgPSAwXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJpbXBvcnQge0tleUxpc3R9ICAgICAgZnJvbSAnLi9zcmMva2V5LWxpc3QnXG5pbXBvcnQge0ZpZWxkRWRpdG9yfSAgZnJvbSAnLi9zcmMvZmllbGQtZWRpdG9yJ1xuaW1wb3J0IHtTdHlsZXN9ICAgICAgIGZyb20gJy4vc3JjL3V0aWwnXG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGUoZWxlbSwgY29uZmlnKSB7XG4gIGlmICghZWxlbSkgICB7IHRocm93IG5ldyBFcnJvcignSnNvbkVkaXRvciBpbnN0YW5jZSByZXF1aXJlcyAxc3QgcGFyYW0gYGVsZW1gJykgfVxuICBpZiAoIWNvbmZpZykgeyB0aHJvdyBuZXcgRXJyb3IoJ0pzb25FZGl0b3IgaW5zdGFuY2UgcmVxdWlyZXMgMm5kIHBhcmFtIGBjb25maWdgJykgfVxuICBcbiAgU3R5bGVzLmFkZCgpXG5cbiAgY29uc3QgZGVzdHJveSA9ICgpID0+IHtcbiAgICBjb25zdCBjdXJyRm9ybSA9IGVsZW0ucXVlcnlTZWxlY3Rvcignc2VjdGlvbi5qLWVkaXQnKVxuICAgIGlmIChjdXJyRm9ybSAmJiB0eXBlb2YgY3VyckZvcm0uZGVzdHJveSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgY3VyckZvcm0uZGVzdHJveSgpXG4gICAgfVxuICAgIGlmIChrZXlMaXN0ICYmIHR5cGVvZiBrZXlMaXN0LmRlc3Ryb3kgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGtleUxpc3QuZGVzdHJveSgpXG4gICAgfVxuICB9XG5cbiAgY29uc3QgX2hhbmRsZVNlbGVjdCA9ICh7dGFyZ2V0LCBkZXRhaWx9KSA9PiB7XG4gICAgY29uc29sZS53YXJuKCdTRUxFQ1QnLCBkZXRhaWwsIHRhcmdldClcbiAgICBjb25zdCBjdXJyRm9ybSA9IGVsZW0ucXVlcnlTZWxlY3Rvcignc2VjdGlvbi5qLWVkaXQnKVxuICAgIGNvbnN0IG9wdHMgPSB7XG4gICAgICBkZXB0aDogIHRhcmdldC5kZXB0aCB8fCBudWxsLFxuICAgICAgZWxlbTogICB0YXJnZXQsIFxuICAgICAga2V5OiAgICB0YXJnZXQua2V5LCBcbiAgICAgIG5vZGU6ICAgdGFyZ2V0Lm5vZGUsIFxuICAgICAgcGFyZW50OiB0YXJnZXQucGFyZW50LCBcbiAgICAgIHBhdGg6ICAgdGFyZ2V0LnBhdGgsIFxuICAgICAgdHlwZTogICB0YXJnZXQudHlwZSB8fCAnc3RyaW5nJywgXG4gICAgfVxuICAgIGNvbnN0IGVkaXRvciA9IEZpZWxkRWRpdG9yKG9wdHMpXG4gICAgaWYgKGN1cnJGb3JtICYmIGN1cnJGb3JtLnBhcmVudE5vZGUpIHtcbiAgICAgIGN1cnJGb3JtLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoY3VyckZvcm0pXG4gICAgfVxuICAgIGVsZW0uYXBwZW5kQ2hpbGQoZWRpdG9yKVxuICB9XG4gIGNvbnN0IHRyZWVTZWN0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2VjdGlvbicpXG4gIGNvbnN0IGtleUxpc3QgPSBLZXlMaXN0KHtkYXRhOiBjb25maWd9KVxuICBrZXlMaXN0LmFkZEV2ZW50TGlzdGVuZXIoJ3NlbGVjdGVkJywgX2hhbmRsZVNlbGVjdClcbiAgdHJlZVNlY3Rpb24uYXBwZW5kQ2hpbGQoa2V5TGlzdClcbiAgdHJlZVNlY3Rpb24uY2xhc3NMaXN0LmFkZCgnai1zaWRlJylcbiAgZWxlbS5hcHBlbmRDaGlsZCh0cmVlU2VjdGlvbilcbiAgZWxlbS5jbGFzc0xpc3QuYWRkKCdqc29uLWVkaXRvcicpXG4gIHJldHVybiB7ZGVzdHJveX07XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2luZGV4LmpzXG4gKiovIiwiaW1wb3J0IHsgY29uZmlnIH0gICAgICAgICAgICAgICAgICAgICAgICAgZnJvbSAnLi9jb25maWcnXG5pbXBvcnQgeyBjcmVhdGVFbGVtLCBjbG9zZXN0LCBcbiAgICAgICAgICByZW1vdmVBbGwsIHJlbW92ZU5vZGUgfSBmcm9tICcuL3V0aWwnXG5pbXBvcnQgeyBhcnJvd3MsIHV4IH0gICAgICAgICAgICAgICAgICAgICBmcm9tICcuL3N2Zy1pY29ucydcbmltcG9ydCB7IEN1c3RvbUV2ZW50IGFzIF9DdXN0b21FdmVudCB9ICAgIGZyb20gJy4vY3VzdG9tLWV2ZW50J1xuLy8gX0N1c3RvbUV2ZW50IHNob3VsZCBhdXRvLWF0dGFjaCB0aGUgb2JqZWN0IHRvIHRoZSB3aW5kb3cuLi4gaWYgbm90IG1ha2UgaW5pdCBmdW5jdGlvblxuXG5leHBvcnQgZnVuY3Rpb24gS2V5TGlzdCh7IGRhdGEsIHBhcmVudCwgcGF0aCA9IFtdLCBkZXB0aCA9IDAgfSkge1xuICBjb25zdCBsaXN0ID0gY3JlYXRlRWxlbSgnPHVsIGNsYXNzPVwiai1rZXlzXCIgZGVwdGg9XCInICsgZGVwdGggKyAnXCI+PC91bD4nKVxuICBPYmplY3RcbiAgICAua2V5cyhkYXRhKVxuICAgIC5mb3JFYWNoKChrZXksIGlkeCwgYXJyKSA9PiB7XG4gICAgICBjb25zdCB2YWx1ZVR5cGUgICA9IEFycmF5LmlzQXJyYXkoZGF0YVtrZXldKSA/ICdhcnJheScgOiB0eXBlb2YgZGF0YVtrZXldXG4gICAgICBjb25zdCBpY29uICAgICAgICA9ICAgICAgICAgICAgdmFsdWVUeXBlID09PSAnb2JqZWN0JyA/XG4gICAgICAgICAgICAgICAgICAgICAgYXJyb3dzLmRvd24gIDogdmFsdWVUeXBlID09PSAnYXJyYXknID9cbiAgICAgICAgICAgICAgICAgICAgICB1eC5saXN0ICAgICAgOiB2YWx1ZVR5cGUgPT09ICdzdHJpbmcnID9cbiAgICAgICAgICAgICAgICAgICAgICB1eC5lZGl0ICAgICAgOiB1eC5lZGl0XG4gICAgICBjb25zdCBleHBhbmRhYmxlICA9IHZhbHVlVHlwZSA9PT0gJ29iamVjdCcgPyAnai1leHBhbmRhYmxlJyA6ICcnXG4gICAgICBsZXQgcm93UGF0aCA9IFtdLnNsaWNlLmNhbGwocGF0aCkucHVzaChrZXkgKyAodmFsdWVUeXBlID09PSAnYXJyYXknID8gJ1snIDogdmFsdWVUeXBlID09PSAnb2JqZWN0JyA/ICcuJyA6ICcnKSlcbiAgICAgIGNvbnN0IHJvdyA9IGNyZWF0ZUVsZW0oWyc8bGkgZGVwdGg9XCInLCBkZXB0aCArIDEsICdcIiBjbGFzcz1cImotY2xvc2VkICcsIGV4cGFuZGFibGUsICcgai10eXBlLScsIHZhbHVlVHlwZSwgJ1wiIGtleT1cIicsIGtleSwgJ1wiPicsIGljb24sICcgJywga2V5LCAnPC9saT4nXS5qb2luKCcnKSlcbiAgICAgIE9iamVjdC5hc3NpZ24ocm93LCB7IG5vZGU6IGRhdGEsIGtleToga2V5LCB0eXBlOiB2YWx1ZVR5cGUsIHBhdGg6IHJvd1BhdGgsIHZhbHVlOiBkYXRhW2tleV0gfSlcbiAgICAgIC8vIGNvbnNvbGUud2Fybigncm93Jywgcm93LCB2YWx1ZVR5cGUsIGljb24pXG4gICAgICBsaXN0LmFwcGVuZENoaWxkKHJvdylcbiAgICB9KVxuICBjb25zdCBfY2xpY2tIYW5kbGVyID0gKGUpID0+IHtcbiAgICBjb25zdCB7IHByZXZlbnREZWZhdWx0LCB0YXJnZXQgfSA9IGVcbiAgICBjb25zdCBsaSA9IGNsb3Nlc3QodGFyZ2V0LCAnbGknLCAyKVxuICAgIGlmIChsaSkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICBjb25zdCB7IG5vZGUsIGtleSwgdHlwZSwgcGF0aCwgdmFsdWUgfSA9IGxpXG4gICAgICBjb25zdCBuZXh0RGF0YSAgPSBub2RlW2tleV1cbiAgICAgIGNvbnN0IGlzT2JqZWN0ID0gbGkuY2xhc3NMaXN0LmNvbnRhaW5zKCdqLXR5cGUtb2JqZWN0JylcbiAgICAgIGNvbnN0IGlzQXJyYXkgID0gbGkuY2xhc3NMaXN0LmNvbnRhaW5zKCdqLXR5cGUtYXJyYXknKVxuICAgICAgY29uc29sZS53YXJuKCdDQU5DRUxMRUQgY2xpY2sgZm9yICVzJywga2V5LCAnaXNPYmplY3Q9JywgaXNPYmplY3QsICdpc0FycmF5PScsIGlzQXJyYXksICdlbGVtPScsIGxpKVxuICAgICAgaWYgKGlzT2JqZWN0IHx8IGlzQXJyYXkpIHtcbiAgICAgICAgaWYgKCFsaS5xdWVyeVNlbGVjdG9yKCd1bCcpKSB7XG4gICAgICAgICAgLy8gZG8gcmVjdXJzaW9uLCBvbiBkZW1hbmRcbiAgICAgICAgICBsaS5hcHBlbmRDaGlsZChLZXlMaXN0KHsgZGF0YTogbmV4dERhdGEsIHBhcmVudDogbGksIGRlcHRoOiBkZXB0aCArIDEgfSkpXG4gICAgICAgIH1cblxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IGxpLmNsYXNzTGlzdC50b2dnbGUoJ2otY2xvc2VkJyksIDMzMylcbiAgICAgICAgcmV0dXJuIG51bGxcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGV2ZW50Tm9kZVNlbGVjdGVkID0gbmV3IEN1c3RvbUV2ZW50KCdzZWxlY3RlZCcsIHtcbiAgICAgICAgICBidWJibGVzOiB0cnVlLCBjYW5jZWxhYmxlOiBmYWxzZSxcbiAgICAgICAgICBkZXRhaWw6IHsga2V5OiBrZXksIGRhdGE6IG5leHREYXRhLCBlbGVtZW50OiBsaSwgZGVwdGg6IGRlcHRoICsgMSwgaXNPYmplY3QsIGlzQXJyYXkgfSxcbiAgICAgICAgfSlcbiAgICAgICAgbGkuZGlzcGF0Y2hFdmVudChldmVudE5vZGVTZWxlY3RlZClcbiAgICAgICAgY29uc29sZS53YXJuKCdGaXJlZCBDdXN0b20gRXZlbnQ6ICcsIGV2ZW50Tm9kZVNlbGVjdGVkKVxuICAgICAgfVxuXG4gICAgICBjb25zb2xlLmluZm8oJ19jbGlja2VkLnRvZ2dsZWQnLCBrZXksIGxpKVxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IGRlc3Ryb3kgPSAoKSA9PiB7XG4gICAgbGlzdC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIF9jbGlja0hhbmRsZXIpXG4gICAgcmVtb3ZlTm9kZShsaXN0LnBhcmVudE5vZGUgPyBsaXN0LnBhcmVudE5vZGUgOiBsaXN0KVxuICB9XG5cbiAgaWYgKCFwYXJlbnQpIHtcbiAgICAvLyBhZGQgb25seSBhdCB0b3Agb2YgdHJlZSwgbWF5YmUgbW92ZSBvdXQgb2YgaGVyZSB1cCBhICdsYXllcidcbiAgICBsaXN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgX2NsaWNrSGFuZGxlcilcbiAgfVxuXG4gIHJldHVybiBPYmplY3QuYXNzaWduKGxpc3QsIHsgZGVzdHJveSB9KVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMva2V5LWxpc3QuanNcbiAqKi8iLCJpbXBvcnQgeyBjcmVhdGVFbGVtLCBjbG9zZXN0LCByZW1vdmVBbGwsIHJlbW92ZU5vZGUsIHRvQm9vbCB9IGZyb20gJy4vdXRpbCdcblxuZXhwb3J0IGZ1bmN0aW9uIEZpZWxkRWRpdG9yKHsga2V5LCBub2RlLCBwYXJlbnQsIHBhdGgsIGVsZW0sIHR5cGUgPSAnc3RyaW5nJywgZGVwdGggPSAwIH0pIHtcblxuICBjb25zdCBmb3JtID0gY3JlYXRlRWxlbShgPHNlY3Rpb24gY2xhc3M9XCJqLWVkaXQgai1zaWRlXCIga2V5PVwiJHtrZXl9XCIgdHlwZT1cIiR7dHlwZX1cIiBkZXB0aD1cIiR7ZGVwdGh9XCIgcGF0aD1cIiR7QXJyYXkuaXNBcnJheShwYXRoKSA/IHBhdGguam9pbignOjonKSA6IHBhdGh9XCI+XG4gICAgPGZvcm0gY2xhc3M9XCJmaWVsZC1lZGl0b3JcIj5cbiAgICAgIDxmaWVsZHNldD5cbiAgICAgICAgPGxhYmVsPk5hbWU8L2xhYmVsPlxuICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwibmFtZVwiIGNsYXNzPVwibmFtZVwiIHZhbHVlPVwiJHtrZXl9XCIgLz5cbiAgICAgIDwvZmllbGRzZXQ+XG4gICAgICA8ZmllbGRzZXQ+XG4gICAgICAgIDxsYWJlbD5UeXBlPC9sYWJlbD5cbiAgICAgICAgPHNlbGVjdCByb3dzPVwiMVwiIG5hbWU9XCJ0eXBlXCI+XG4gICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cInN0cmluZ1wiPnRleHQ8L29wdGlvbj5cbiAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiYm9vbGVhblwiPnllcy9ubzwvb3B0aW9uPlxuICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJudW1iZXJcIj5udW1iZXI8L29wdGlvbj5cbiAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwib2JqZWN0XCI+b2JqZWN0L2hhc2gvbWFwL2tleS12YWw8L29wdGlvbj5cbiAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiYXJyYXlcIj5saXN0PC9vcHRpb24+XG4gICAgICAgIDwvc2VsZWN0PlxuICAgICAgPC9maWVsZHNldD5cbiAgICAgIDxmaWVsZHNldD5cbiAgICAgICAgPGxhYmVsPlZhbHVlPC9sYWJlbD5cbiAgICAgICAgPGRpdiBjbGFzcz1cInZhbHVlRWRpdG9yUGxhY2Vob2xkZXJcIj48L2Rpdj5cbiAgICAgIDwvZmllbGRzZXQ+XG4gICAgICA8ZmllbGRzZXQ+XG4gICAgICAgIDxidXR0b24gdHlwZT1cInN1Ym1pdFwiPlNhdmU8L2J1dHRvbj5cbiAgICAgICAgPGJ1dHRvbiB0eXBlPVwicmVzZXRcIj5DYW5jZWw8L2J1dHRvbj5cbiAgICAgICAgPHN0cm9uZz48L3N0cm9uZz5cbiAgICAgIDwvZmllbGRzZXQ+XG4gICAgPC9mb3JtPlxuICA8L3NlY3Rpb24+YClcblxuICB2YXIgdmFsdWUgICAgICAgICA9IG5vZGVba2V5XVxuICBjb25zdCBwcmV2VmFscyAgICA9IHt9XG4gIGNvbnN0IGdldFZhbHVlICAgID0gKCkgPT4gZ2V0VmFsdWVGbGQoKS52YWx1ZVxuICBjb25zdCBnZXRWYWx1ZUZsZCA9ICgpID0+IGZvcm0ucXVlcnlTZWxlY3RvcignLmZpZWxkLXZhbHVlJykgfHwgeyB2YWx1ZTogZmFsc2UgfVxuICBjb25zdCBmbGROYW1lICAgICA9IGZvcm0ucXVlcnlTZWxlY3RvcignaW5wdXRbbmFtZT1cIm5hbWVcIl0nKVxuICBjb25zdCBmbGRUeXBlICAgICA9IGZvcm0ucXVlcnlTZWxlY3Rvcignc2VsZWN0W25hbWU9XCJ0eXBlXCJdJylcbiAgY29uc3QgcGxhY2Vob2xkZXIgPSBmb3JtLnF1ZXJ5U2VsZWN0b3IoJy52YWx1ZUVkaXRvclBsYWNlaG9sZGVyJylcbiAgLy8gaW5pdGlhbGl6ZSB2YWx1ZSB0cmFja2VyIChmb3IgbG9jYWwgJ3R5cGUnIGNoYW5nZXMpXG4gIHByZXZWYWxzW3R5cGVdICAgID0gdmFsdWVcblxuICAvLyBzZXQgdmFsdWUgdy8gZGVmYXVsdFxuICBmbGRUeXBlLnZhbHVlICAgICA9IHR5cGVcblxuICAvLyBkZWZpbmUgaGVscGVycywgZS5nLiBidWlsZCBmaWVsZCwgdHJhbnNpdGlvbiBzdGF0ZSAoYWthIGNvbnZlcnQpXG4gIGNvbnN0IGdldFZhbHVlRmllbGRFbGVtID0gKF92YWx1ZSA9IGdldFZhbHVlKCkpID0+IHtcbiAgICBjb25zb2xlLnRyYWNlKCcgICBcXHRHZW5GaWVsZCgnLCBrZXksICcsICcsIF92YWx1ZSwgJyknKVxuICAgIGlmIChmbGRUeXBlLnZhbHVlID09PSAnc3RyaW5nJykge1xuICAgICAgcmV0dXJuIGNyZWF0ZUVsZW0oYDxpbnB1dCB0eXBlPSd0ZXh0JyBjbGFzcz0nZmllbGQtdmFsdWUnIG5hbWU9J2ZpZWxkLXZhbHVlJyB2YWx1ZT0nJHtfdmFsdWV9JyAvPmApXG4gICAgfSBlbHNlIGlmIChmbGRUeXBlLnZhbHVlID09PSAnbnVtYmVyJykge1xuICAgICAgcmV0dXJuIGNyZWF0ZUVsZW0oYDxpbnB1dCB0eXBlPSdudW1iZXInIGNsYXNzPSdmaWVsZC12YWx1ZScgbmFtZT0nZmllbGQtdmFsdWUnIHZhbHVlPScke192YWx1ZX0nIC8+YClcbiAgICB9IGVsc2UgaWYgKGZsZFR5cGUudmFsdWUgPT09ICdib29sZWFuJykge1xuICAgICAgcmV0dXJuIGNyZWF0ZUVsZW0oYDxpbnB1dCB0eXBlPSdjaGVja2JveCcgY2xhc3M9J2ZpZWxkLXZhbHVlJyBuYW1lPSdmaWVsZC12YWx1ZScgdmFsdWU9J2NoZWNrZWQnJHtfdmFsdWUgPyAnIGNoZWNrZWQnIDogJyd9JyAvPmApXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBjcmVhdGVFbGVtKGA8c3BhbiBjbGFzcz1cImhhcy1lcnJvclwiPjxpbnB1dCB0eXBlPSd0ZXh0JyBjbGFzcz0nZmllbGQtdmFsdWUnIG5hbWU9J2ZpZWxkLXZhbHVlJyB2YWx1ZT0nJHtfdmFsdWV9JyAvPjwvc3Bhbj5gKVxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IGNvbnZlcnQgPSAoeyB2YWx1ZSwgdHlwZSB9KSA9PiB7XG4gICAgY29uc3QgY3VyclR5cGUgPSBBcnJheS5pc0FycmF5KHZhbHVlKSA/ICdhcnJheScgOiB0eXBlb2YgdmFsdWVcbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgIGNhc2UgJ3N0cmluZyc6IHJldHVybiB2YWx1ZS50b1N0cmluZygpXG4gICAgICAvLyBkZWZhdWx0OiByZXR1cm4gdmFsdWUudG9TdHJpbmcoKVxuICAgICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgICAgc3dpdGNoIChjdXJyVHlwZSkge1xuICAgICAgICAgIGNhc2UgJ3N0cmluZyc6IHJldHVybiBwYXJzZUZsb2F0KHZhbHVlKVxuICAgICAgICAgIGNhc2UgJ2Jvb2xlYW4nOiByZXR1cm4gdmFsdWUgPyAxIDogMFxuICAgICAgICAgIGNhc2UgJ2FycmF5JzogcmV0dXJuIC0xXG4gICAgICAgICAgY2FzZSAnb2JqZWN0JzogcmV0dXJuIC0xXG4gICAgICAgICAgZGVmYXVsdDogICAgICAgcmV0dXJuIC05OVxuICAgICAgICB9XG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlICdib29sZWFuJzpcbiAgICAgICAgcmV0dXJuIHRvQm9vbCh2YWx1ZSlcblxuICAgICAgLy8gfSBlbHNlIGlmICh0eXBlID09PSAnbnVtYmVyJykge1xuICAgICAgLy8gfSBlbHNlIGlmICh0eXBlID09PSAnYXJyYXknKSB7XG4gICAgICAvLyB9IGVsc2UgaWYgKHR5cGUgPT09ICdvYmplY3QnKSB7XG4gICAgfVxuICB9XG5cbiAgY29uc3QgdXBkYXRlVmFsdWVGaWVsZCA9ICh2KSA9PiB7XG4gICAgY29uc3QgbmV3VHlwZSA9IGZsZFR5cGUudmFsdWVcbiAgICBjb25zdCBuZXdWYWwgID0gY29udmVydCh7IHZhbHVlOiB2IHx8IGdldFZhbHVlKCksIHR5cGU6IG5ld1R5cGUgfSlcbiAgICBjb25zdCBuZXdGbGQgID0gZ2V0VmFsdWVGaWVsZEVsZW0obmV3VmFsKVxuICAgIHJlbW92ZUFsbChwbGFjZWhvbGRlci5jaGlsZE5vZGVzKVxuICAgIHBsYWNlaG9sZGVyLmFwcGVuZENoaWxkKG5ld0ZsZClcbiAgICByZXR1cm4gbmV3RmxkXG4gIH1cblxuICAvLyBkZWZpbmUgZXZlbnRzLCBvblR5cGVDaGFuZ2VkLCBvblNhdmUsIG9uQ2FuY2VsXG4gIGNvbnN0IG9uVHlwZUNoYW5nZWQgPSAoeyB0YXJnZXQgfSkgPT4ge1xuICAgIGNvbnNvbGUud2FybignVHlwZSBDaGFuZ2VkISEnLCBhcmd1bWVudHMpXG4gICAgY29uc3QgbmV3VHlwZSA9IGZsZFR5cGUudmFsdWVcbiAgICBjb25zdCBvbGRWYWwgID0gZ2V0VmFsdWUoKVxuICAgIHVwZGF0ZVZhbHVlRmllbGQoKVxuICB9XG5cbiAgY29uc3Qgb25TYXZlID0gKGUpID0+IHtcbiAgICBjb25zdCB7IHRhcmdldCwgZGV0YWlsLCBwcmV2ZW50RGVmYXVsdCB9ID0gZTtcbiAgICBjb25zb2xlLndhcm4oJ1NhdmVkISEnLCBhcmd1bWVudHMpXG4gICAgcHJldmVudERlZmF1bHQoKVxuXG4gIH1cblxuICBjb25zdCBvbkNhbmNlbCA9ICh7IHRhcmdldCB9KSA9PiB7XG4gICAgY29uc29sZS53YXJuKCdDYW5jZWxsZWQhIScsIGFyZ3VtZW50cylcblxuICB9XG5cbiAgY29uc3Qgc2V0dXAgPSAoKSA9PiB7XG4gICAgLy8gU2V0dXAgZXZlbnRzXG4gICAgZm9ybS5xdWVyeVNlbGVjdG9yKCdidXR0b25bdHlwZT1cInN1Ym1pdFwiXScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb25TYXZlKVxuICAgIGZvcm0ucXVlcnlTZWxlY3RvcignYnV0dG9uW3R5cGU9XCJyZXNldFwiXScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb25DYW5jZWwpXG4gICAgZmxkVHlwZS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBvblR5cGVDaGFuZ2VkKVxuICB9XG5cbiAgY29uc3QgZGVzdHJveSA9ICgpID0+IHtcbiAgICBmb3JtLnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvblt0eXBlPVwic3VibWl0XCJdJykucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBvblNhdmUpXG4gICAgZm9ybS5xdWVyeVNlbGVjdG9yKCdidXR0b25bdHlwZT1cInJlc2V0XCJdJykucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBvbkNhbmNlbClcbiAgICBmbGRUeXBlLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIG9uVHlwZUNoYW5nZWQpXG4gICAgcmVtb3ZlTm9kZShmb3JtKVxuXG4gIH1cblxuICBzZXR1cCgpXG5cbiAgLy8gaW5pdCBVSVxuICB1cGRhdGVWYWx1ZUZpZWxkKHZhbHVlKVxuXG4gIHJldHVybiBPYmplY3QuYXNzaWduKGZvcm0sIHsgZGVzdHJveSB9KVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvZmllbGQtZWRpdG9yLmpzXG4gKiovIiwiLy8ganNjczpkaXNhYmxlIHNhZmVDb250ZXh0S2V5d29yZFxuXG4vKipcbiAqIFV0aWxpdHkgYXJyYXlpZnkgbWV0aG9kXG4gKiBBZGQgdG8gLnByb3RvdHlwZSBvZiBJdGVyYXRvcnMsIEFycmF5QnVmZmVyLCBBcmd1bWVudHMsIE5vZGVMaXN0LCBTZXQvV2Vha1NldCwgd2hhdGV2ZXIgI1lPTE9cbiAqXG4gKiAuLi4gT3IganVzdCB1c2UgYXMgdXRpbCwgYXMgbmVlZGVkLCAjSnVzdERvSXRcbiAqXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0b0FycmF5KGxpc3QpIHtcbiAgbGlzdCA9IEFycmF5LmlzQXJyYXkobGlzdCkgPyBsaXN0IDogdGhpc1xuICBsaXN0ID0gIWxpc3QgPyBbXSA6IGxpc3RcbiAgcmV0dXJuIEFycmF5LmZyb20gJiYgQXJyYXkuZnJvbShsaXN0KSB8fCBbJ3VwZ3JhZGUgeW91ciBicm93c2VyLCBwZmZ0J11cbn1cblxuLyoqXG4gKiBHZXQgYEFycmF5LnNvcnRgIGZ1bmN0aW9uIGZvciBrZXkgbmFtZSBjb21wYXJpc29ucyAoc3VwcG9ydHMgcmV2ZXJzZSlcbiAqXG4gKiBXaGVuIG5hbWUgPT09ICdlbWFpbCAgIC0tLSBTb3J0IGVtYWlsIGFzY2VuZGluZy5cbiAqXG4gKiBXaGVuIG5hbWUgPT09ICctZW1haWwgIC0tLSBTb3J0IGVtYWlsIGRlc2NlbmRpbmdcbiAqXG4gKiBAcmV0dXJucyBbZnVuY3Rpb25dIGNvbXBhcmVyIHVzZWQgaW4gYEFycmF5LnNvcnQoKWBcbiAqXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRTb3J0ZXIoa2V5KSB7XG4gIGNvbnN0IF9lbmdsaXNoU29ydCAgICAgICAgID0gKGEsIGIpID0+IChhW2tleV0gPCBiW2tleV0gPyAtMSA6IChhW2tleV0gPiBiW2tleV0gPyAxIDogMCkpXG4gIGNvbnN0IF9lbmdsaXNoU29ydFJldmVyc2VkID0gKGEsIGIpID0+IChhW2tleV0gPj0gYltrZXldID8gLTEgOiAoYVtrZXldIDwgYltrZXldID8gMSA6IDApKVxuXG4gIGlmIChrZXlbMF0gPT09ICctJykge1xuICAgIGtleSA9IGtleS5zdWJzdHIoMSk7XG4gICAgcmV0dXJuIF9lbmdsaXNoU29ydFJldmVyc2VkO1xuICB9XG5cbiAgcmV0dXJuIF9lbmdsaXNoU29ydDtcbn1cblxuLyoqXG4gKlxuICovXG5leHBvcnQgY29uc3QgU3R5bGVzID0ge1xuICBhZGQ6ICgpID0+IHtcbiAgICBsZXQgY3NzID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcignc3R5bGUjanNvbi1lZGl0b3InKVxuICAgIGlmICghY3NzKSB7XG4gICAgICBjb25zdCBzdHlsZXMgID0gcmVxdWlyZSgnIWNzcyFsZXNzIS4vc3R5bGUubGVzcycpXG4gICAgICBjc3MgICAgICAgICAgID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKVxuICAgICAgY3NzLmlkICAgICAgICA9ICdqc29uLWVkaXRvcidcbiAgICAgIGNzcy5pbm5lckhUTUwgPSBzdHlsZXNcbiAgICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoY3NzKVxuICAgIH1cbiAgfSxcblxuICByZW1vdmU6ICgpID0+IHtcbiAgICBsZXQgY3NzID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcignc3R5bGUjanNvbi1lZGl0b3InKVxuICAgIGlmIChjc3MgJiYgY3NzLnBhcmVudE5vZGUpIHsgY3NzLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoY3NzKSB9XG4gIH0sXG59XG5cbi8qKlxuICogQWNjZXB0cyBlbGVtZW50cyBmcm9tIGBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsYFxuICpcbiAqIFJlbW92ZXMgYWxsIGNoaWxkcmVuIG9mIEBub2RlXG4gKlxuICovXG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlQWxsKG5vZGUpIHtcbiAgaWYgKHRoaXMgaW5zdGFuY2VvZiBOb2RlTGlzdCkgeyBub2RlID0gdGhpczsgfVxuXG4gIHRvQXJyYXkobm9kZSlcbiAgICAuZm9yRWFjaChlbCA9PiBlbC5wYXJlbnROb2RlICYmIGVsLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZWwpKVxuICByZXR1cm4gbm9kZVxufVxuXG4vKipcbiAqIEFjY2VwdHMgRWxlbWVudCAvIE5vZGUgaXNoIG9iamVjdHMgKGkuZS4gZnJvbSBgZG9jdW1lbnQucXVlcnlTZWxlY3RvcmApXG4gKlxuICogT25seSByZW1vdmVzIEBub2RlICoqaWYgaXQgaGFzIGEgdmFsaWQgYHBhcmVudE5vZGVgIGNvbnRleHQqKlxuICpcbiAqIEFsdGVybmF0ZSB1c2FnZSwgcHJvdG90eXBlIG9mIE5vZGU6XG4gKiBgTm9kZS5wcm90b3R5cGUucmVtb3ZlTm9kZSA9IHJlbW92ZU5vZGU7YFxuICpcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZU5vZGUobm9kZSkge1xuICBpZiAodGhpcyBpbnN0YW5jZW9mIE5vZGUpIHsgbm9kZSA9IHRoaXM7IH1cblxuICBpZiAobm9kZS5wYXJlbnROb2RlICYmIG5vZGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCkge1xuICAgIG5vZGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChub2RlKVxuICB9XG5cbiAgcmV0dXJuIG5vZGVcbn1cblxuLyoqXG4gKiBUb3RlcyBvYnZpXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRJZCh7IGlkLCBfaWQsIGtleSB9KSB7IHJldHVybiBpZCB8fCBfaWQgfHwga2V5OyB9XG5cbi8qKlxuICpcbiAqL1xuZXhwb3J0IGNvbnN0IGNsb3Nlc3QgPSAoZWxlbSwgc2VsZWN0b3IsIGxpbWl0ID0gbnVsbCkgPT4ge1xuICBpZiAobGltaXQgIT09IG51bGwgJiYgbGltaXQgPD0gMCkgeyByZXR1cm4gZmFsc2UgfVxuXG4gIHJldHVybiAhZWxlbSA/IG51bGxcbiAgICAgICAgIDogZWxlbS5tYXRjaGVzICYmIGVsZW0ubWF0Y2hlcyhzZWxlY3RvcilcbiAgICAgICAgID8gZWxlbSA6IGVsZW0uY2xhc3NMaXN0ICYmIGVsZW0uY2xhc3NMaXN0LmNvbnRhaW5zKHNlbGVjdG9yKVxuICAgICAgICAgPyBlbGVtIDogY2xvc2VzdChlbGVtLnBhcmVudE5vZGUsIHNlbGVjdG9yLCAobGltaXQgIT09IG51bGwgPyBsaW1pdCAtIDEgOiBsaW1pdCkpXG59XG5cbi8qKlxuICogdG9Cb29sIGNvbnZlcnRzIGFueXRoaW5nIHRvIGEgYm9vbGVhbiAtIHNlZSBjb2RlIGZvciBkZXRhaWxzXG4gKi9cbmV4cG9ydCBjb25zdCB0b0Jvb2wgPSAoc3RyKSA9PiB7XG4gIGlmICh0eXBlb2Ygc3RyID09PSAnYm9vbGVhbicpIHtcbiAgICByZXR1cm4gc3RyXG4gIH1cblxuICBpZiAodHlwZW9mIHN0ciA9PT0gJ3N0cmluZycpIHtcbiAgICBzdHIgPSAoc3RyLmxlbmd0aCA+PSAxID8gc3RyLnRvVXBwZXJDYXNlKClbMF0gOiBzdHIpXG4gICAgcmV0dXJuIFsnWScsICcxJywgJ1QnXS5pbmRleE9mKHN0cikgPT09IDBcbiAgfVxuXG4gIHJldHVybiBzdHIgPyB0cnVlIDogZmFsc2Vcbn1cblxuLyoqXG4gKiBXYXJuaW5nOiBQcml2YXRlL2xvY2FsIHVzZSBvbmx5LiBEbyBub3QgaG9pc3QuXG4gKiAqKiogVW5zYWZlIEhUTUwvc3RyaW5nIGhhbmRsaW5nICoqKlxuICovXG5leHBvcnQgY29uc3QgY3JlYXRlRWxlbSA9IGh0bWwgPT4ge1xuICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KClcbiAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgZGl2LmlubmVySFRNTCA9IGh0bWwgLy8gUG90ZW50aWFsIFNlY3VyaXR5IEV4cGxvaXQgVmVjdG9yISEhISEhXG4gIHJldHVybiBkaXYuY2hpbGROb2Rlcy5sZW5ndGggPT09IDEgPyBkaXYuY2hpbGROb2Rlc1swXSA6IGRpdlxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdXRpbC5qc1xuICoqLyIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKSgpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiLnVuc2VsZWN0YWJsZSB7XFxuICB1c2VyLXNlbGVjdDogbm9uZTtcXG4gIC1tb3otdXNlci1zZWxlY3Q6IG5vbmU7XFxuICAtd2Via2l0LXVzZXItc2VsZWN0OiBub25lO1xcbiAgLW1zLXVzZXItc2VsZWN0OiBub25lO1xcbn1cXG4uai14cy0xLFxcbi5qLXhzLTIsXFxuLmoteHMtMyxcXG4uai14cy00LFxcbi5qLXhzLTUsXFxuLmoteHMtNixcXG4uai14cy03LFxcbi5qLXhzLTgsXFxuLmoteHMtOSxcXG4uai14cy0xMCxcXG4uai14cy0xMSxcXG4uai14cy0xMiB7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbn1cXG4uai14cy0xIHtcXG4gIHdpZHRoOiA4LjMzMzMlO1xcbn1cXG4uai14cy0yIHtcXG4gIHdpZHRoOiAxNi42NjY2JTtcXG59XFxuLmoteHMtMyB7XFxuICB3aWR0aDogMjQuOTk5OSU7XFxufVxcbi5qLXhzLTQge1xcbiAgd2lkdGg6IDMzLjMzMzIlO1xcbn1cXG4uai14cy01IHtcXG4gIHdpZHRoOiA0MS42NjY1JTtcXG59XFxuLmoteHMtNiB7XFxuICB3aWR0aDogNDkuOTk5OCU7XFxufVxcbi5qLXhzLTcge1xcbiAgd2lkdGg6IDU4LjMzMzElO1xcbn1cXG4uai14cy04IHtcXG4gIHdpZHRoOiA2Ni42NjY0JTtcXG59XFxuLmoteHMtOSB7XFxuICB3aWR0aDogNzQuOTk5NyU7XFxufVxcbi5qLXhzLTEwIHtcXG4gIHdpZHRoOiA4My4zMzMxJTtcXG59XFxuLmoteHMtMTEge1xcbiAgd2lkdGg6IDkxLjY2NjMlO1xcbn1cXG4uai14cy0xMiB7XFxuICB3aWR0aDogOTkuOTk5NiU7XFxufVxcbnVsLmota2V5cyB7XFxuICB3aWR0aDogMjUwcHg7XFxuICBsaXN0LXN0eWxlOiBub25lO1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgdXNlci1zZWxlY3Q6IG5vbmU7XFxuICAtbW96LXVzZXItc2VsZWN0OiBub25lO1xcbiAgLXdlYmtpdC11c2VyLXNlbGVjdDogbm9uZTtcXG4gIC1tcy11c2VyLXNlbGVjdDogbm9uZTtcXG59XFxudWwuai1rZXlzIGxpIHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbiAgbWluLXdpZHRoOiAyNTBweDtcXG4gIG1pbi1oZWlnaHQ6IDIycHg7XFxuICB0ZXh0LWFsaWduOiBsZWZ0O1xcbiAgcGFkZGluZy1sZWZ0OiAxMHB4O1xcbiAgbWFyZ2luLWxlZnQ6IC0zMHB4O1xcbn1cXG51bC5qLWtleXMgLmotaWNvbi1lZGl0LFxcbnVsLmota2V5cyAuai1pY29uLWxpc3QsXFxudWwuai1rZXlzIC5qLWljb24tYXJyb3ctZG93biB7XFxuICB6b29tOiA0MCU7XFxufVxcbnVsLmota2V5cyBsaTpub3QoLmotY2xvc2VkKSA+IC5qLWljb24tYXJyb3ctZG93biB7XFxuICB0cmFuc2Zvcm06IHJvdGF0ZSgtOTBkZWcpICFpbXBvcnRhbnQ7XFxufVxcbnVsLmota2V5cyAuai1jbG9zZWQgPiB1bCB7XFxuICBkaXNwbGF5OiBub25lO1xcbn1cXG51bC5qLWtleXMgLmotY2xvc2VkOmJlZm9yZSB7XFxuICBjb250ZW50OiAnICcgIWltcG9ydGFudDtcXG59XFxudWwuai1rZXlzIC5qLWNsb3NlZCA+IC5qLWljb24tYXJyb3ctZG93biB7XFxuICB0cmFuc2Zvcm06IHJvdGF0ZSgwZGVnKSAhaW1wb3J0YW50O1xcbn1cXG51bC5qLWtleXMgLmotaWNvbi1wbHVzOmJlZm9yZSB7XFxuICBjb250ZW50OiAnICc7XFxufVxcbnVsLmota2V5cyAuai1pY29uLWxpc3Q6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6ICcgJztcXG59XFxudWwuai1rZXlzIC5qLWljb24tdGV4dDpiZWZvcmUge1xcbiAgY29udGVudDogJ1xcXFwyMTM5ICAgJyAhaW1wb3J0YW50O1xcbn1cXG51bC5qLWtleXMgLmotaWNvbi1kZWZhdWx0OmJlZm9yZSB7XFxuICBjb250ZW50OiAnXFxcXDFGNTI0ICAgXFxcXEZFMEYnICFpbXBvcnRhbnQ7XFxufVxcblwiLCBcIlwiXSk7XG5cbi8vIGV4cG9ydHNcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2Nzcy1sb2FkZXIhLi9+L2xlc3MtbG9hZGVyIS4vc3JjL3N0eWxlLmxlc3NcbiAqKiBtb2R1bGUgaWQgPSA1XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKlxyXG5cdE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXHJcblx0QXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxyXG4qL1xyXG4vLyBjc3MgYmFzZSBjb2RlLCBpbmplY3RlZCBieSB0aGUgY3NzLWxvYWRlclxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xyXG5cdHZhciBsaXN0ID0gW107XHJcblxyXG5cdC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcclxuXHRsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XHJcblx0XHR2YXIgcmVzdWx0ID0gW107XHJcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHR2YXIgaXRlbSA9IHRoaXNbaV07XHJcblx0XHRcdGlmKGl0ZW1bMl0pIHtcclxuXHRcdFx0XHRyZXN1bHQucHVzaChcIkBtZWRpYSBcIiArIGl0ZW1bMl0gKyBcIntcIiArIGl0ZW1bMV0gKyBcIn1cIik7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0cmVzdWx0LnB1c2goaXRlbVsxXSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdHJldHVybiByZXN1bHQuam9pbihcIlwiKTtcclxuXHR9O1xyXG5cclxuXHQvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxyXG5cdGxpc3QuaSA9IGZ1bmN0aW9uKG1vZHVsZXMsIG1lZGlhUXVlcnkpIHtcclxuXHRcdGlmKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKVxyXG5cdFx0XHRtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCBcIlwiXV07XHJcblx0XHR2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xyXG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0dmFyIGlkID0gdGhpc1tpXVswXTtcclxuXHRcdFx0aWYodHlwZW9mIGlkID09PSBcIm51bWJlclwiKVxyXG5cdFx0XHRcdGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcclxuXHRcdH1cclxuXHRcdGZvcihpID0gMDsgaSA8IG1vZHVsZXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0dmFyIGl0ZW0gPSBtb2R1bGVzW2ldO1xyXG5cdFx0XHQvLyBza2lwIGFscmVhZHkgaW1wb3J0ZWQgbW9kdWxlXHJcblx0XHRcdC8vIHRoaXMgaW1wbGVtZW50YXRpb24gaXMgbm90IDEwMCUgcGVyZmVjdCBmb3Igd2VpcmQgbWVkaWEgcXVlcnkgY29tYmluYXRpb25zXHJcblx0XHRcdC8vICB3aGVuIGEgbW9kdWxlIGlzIGltcG9ydGVkIG11bHRpcGxlIHRpbWVzIHdpdGggZGlmZmVyZW50IG1lZGlhIHF1ZXJpZXMuXHJcblx0XHRcdC8vICBJIGhvcGUgdGhpcyB3aWxsIG5ldmVyIG9jY3VyIChIZXkgdGhpcyB3YXkgd2UgaGF2ZSBzbWFsbGVyIGJ1bmRsZXMpXHJcblx0XHRcdGlmKHR5cGVvZiBpdGVtWzBdICE9PSBcIm51bWJlclwiIHx8ICFhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XHJcblx0XHRcdFx0aWYobWVkaWFRdWVyeSAmJiAhaXRlbVsyXSkge1xyXG5cdFx0XHRcdFx0aXRlbVsyXSA9IG1lZGlhUXVlcnk7XHJcblx0XHRcdFx0fSBlbHNlIGlmKG1lZGlhUXVlcnkpIHtcclxuXHRcdFx0XHRcdGl0ZW1bMl0gPSBcIihcIiArIGl0ZW1bMl0gKyBcIikgYW5kIChcIiArIG1lZGlhUXVlcnkgKyBcIilcIjtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0bGlzdC5wdXNoKGl0ZW0pO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fTtcclxuXHRyZXR1cm4gbGlzdDtcclxufTtcclxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcbiAqKiBtb2R1bGUgaWQgPSA2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJleHBvcnQgY29uc3QgY29uZmlnID0ge1xuICBkZWJ1ZzogZmFsc2UsXG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9jb25maWcuanNcbiAqKi8iLCIvLyBqc2NzOmRpc2FibGUgbWF4aW11bUxpbmVMZW5ndGgsIHJlcXVpcmVQYWRkaW5nTmV3TGluZXNCZWZvcmVMaW5lQ29tbWVudHNcbmV4cG9ydCBjb25zdCBhcnJvd3MgPSB7XG4gIC8vIHVwOiBgPHN2ZyBjbGFzcz1cImotaWNvbi1hcnJvdyBqLWljb24tYXJyb3ctdXBcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgeG1sbnM6eGxpbms9XCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rXCIgc3R5bGU9XCJpc29sYXRpb246aXNvbGF0ZVwiIHdpZHRoPVwiODVcIiBoZWlnaHQ9XCI0OVwiPjxwYXRoIGQ9XCJNIDgyIDQ0Ljk5OTk5OTk5OTk5OTkgTCA0Mi45ODc0MTgxMjI0NDczOCA0LjAyNDE1Mzg4MDU2MzMwOSBNIDQgNDUgTCA0Mi45ODc0MTgxMjI0NDcyNyA0XCIgc3R5bGU9XCJmaWxsOm5vbmU7c3Ryb2tlOiMwMDAwMDA7c3Ryb2tlLXdpZHRoOjQ7c3Ryb2tlLWxpbmVjYXA6cm91bmQ7c3Ryb2tlLWxpbmVqb2luOmJldmVsO3N0cm9rZS1taXRlcmxpbWl0OjM7XCIvPjwvc3ZnPmAsXG4gIGRvd246IGA8c3ZnIGNsYXNzPVwiai1pY29uLWFycm93IGotaWNvbi1hcnJvdy1kb3duXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHhtbG5zOnhsaW5rPVwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGlua1wiIHN0eWxlPVwiaXNvbGF0aW9uOmlzb2xhdGVcIiB3aWR0aD1cIjMzXCIgaGVpZ2h0PVwiMjJcIj5cbiAgICA8cGF0aCBkPVwiTSAyOCA0IEwgMTUuOTk2MTI4NjUzMDYwNzQgMTYuOTkyMzQxNDUyNTA0MzEgTSA0IDQgTCAxNS45OTYxMjg2NTMwNjA2ODMgMTdcIiBzdHlsZT1cImZpbGw6bm9uZTtzdHJva2U6IzAwMDAwMDtzdHJva2Utd2lkdGg6ODtzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbGluZWpvaW46YmV2ZWw7c3Ryb2tlLW1pdGVybGltaXQ6MztcIi8+XG4gIDwvc3ZnPmAsXG4gIC8vIHJpZ2h0OiBgPHN2ZyBjbGFzcz1cImotaWNvbi1hcnJvdyBqLWljb24tYXJyb3ctcmlnaHRcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgeG1sbnM6eGxpbms9XCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rXCIgc3R5bGU9XCJpc29sYXRpb246aXNvbGF0ZVwiIHdpZHRoPVwiNTBcIiBoZWlnaHQ9XCI4NFwiPjxwYXRoIGQ9XCJNIDQuMDAwMDAwMDAwMDAwMTI4IDgwIEwgNDYgNDEuNDk5ODk2MjA0MjY3NzcgTSA0IDMgTCA0NS45OTk5OTk5OTk5OTk4NDQgNDEuNDk5ODk2MjA0MjY3NzM1XCIgc3R5bGU9XCJmaWxsOm5vbmU7c3Ryb2tlOiMwMDAwMDA7c3Ryb2tlLXdpZHRoOjQ7c3Ryb2tlLWxpbmVjYXA6cm91bmQ7c3Ryb2tlLWxpbmVqb2luOmJldmVsO3N0cm9rZS1taXRlcmxpbWl0OjM7XCIvPjwvc3ZnPmAsXG4gIC8vIGxlZnQ6IGA8c3ZnIGNsYXNzPVwiai1pY29uLWFycm93IGotaWNvbi1hcnJvdy1sZWZ0XCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHhtbG5zOnhsaW5rPVwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGlua1wiIHN0eWxlPVwiaXNvbGF0aW9uOmlzb2xhdGVcIiB3aWR0aD1cIjQ5XCIgaGVpZ2h0PVwiODZcIj48cGF0aCBkPVwiTSA0NC45OTk5OTk5OTk5OTk4OSA4MiBMIDQuMDI0MTUzODgwNTYzMzA5NSA0Mi45ODc0MTgxMjI0NDczNSBNIDQ1IDQgTCA0IDQyLjk4NzQxODEyMjQ0NzI0NVwiIHN0eWxlPVwiZmlsbDpub25lO3N0cm9rZTojMDAwMDAwO3N0cm9rZS13aWR0aDo0O3N0cm9rZS1saW5lY2FwOnJvdW5kO3N0cm9rZS1saW5lam9pbjpiZXZlbDtzdHJva2UtbWl0ZXJsaW1pdDozO1wiLz48L3N2Zz5gLFxufVxuXG5leHBvcnQgY29uc3QgdXggPSB7XG4gIGxpc3Q6IGA8c3ZnIGNsYXNzPVwiai1pY29uLWxpc3RcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgeG1sbnM6eGxpbms9XCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rXCIgc3R5bGU9XCJpc29sYXRpb246aXNvbGF0ZVwiIHdpZHRoPVwiMjRcIiBoZWlnaHQ9XCIxMy4zXCI+XG4gICAgPHBhdGggZD1cIiBNIDAgOCBMIDIuNiA4IEwgMi42IDUuMyBMIDAgNS4zIEwgMCA4IFogIE0gMCAxMy4zIEwgMi42IDEzLjMgTCAyLjYgMTAuNiBMIDAgMTAuNiBMIDAgMTMuMyBaICBNIDAgMi42IEwgMi42IDIuNiBMIDIuNiAwIEwgMCAwIEwgMCAyLjYgWiAgTSA1LjMgOCBMIDI0IDggTCAyNCA1LjMgTCA1LjMgNS4zIEwgNS4zIDggWiAgTSA1LjMgMTMuMyBMIDI0IDEzLjMgTCAyNCAxMC42IEwgNS4zIDEwLjYgTCA1LjMgMTMuMyBaICBNIDUuMyAwIEwgNS4zIDIuNiBMIDI0IDIuNiBMIDI0IDAgTCA1LjMgMCBaXCJcbiAgICAgZmlsbC1ydWxlPVwiZXZlbm9kZFwiIGZpbGw9XCJyZ2IoMCwwLDApXCIgc3Ryb2tlLXdpZHRoPVwiMS41XCIgc3Ryb2tlPVwicmdiYSgwLDAsMCwwKVwiIHN0cm9rZS1saW5lY2FwPVwiYnV0dFwiLz5cbiAgICA8cGF0aCBkPVwiIE0gMCAwIEwgMzYgMCBMIDM2IDM2IEwgMCAzNiBMIDAgMCBaIFwiIGZpbGw9XCJyZ2JhKDAsMCwwLDApXCIgc3Ryb2tlLXdpZHRoPVwiMS41XCIgc3Ryb2tlPVwicmdiYSgwLDAsMCwwKVwiIHN0cm9rZS1saW5lY2FwPVwiYnV0dFwiLz5cbiAgPC9zdmc+YCxcbiAgZWRpdDogYDxzdmcgY2xhc3M9XCJqLWljb24tZWRpdFwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB4bWxuczp4bGluaz1cImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmtcIiBzdHlsZT1cImlzb2xhdGlvbjppc29sYXRlXCIgd2lkdGg9XCIyNFwiIGhlaWdodD1cIjI0XCI+XG4gICAgPHBhdGggZD1cIiBNIC00LjQ0MDggMTkuMDAwNiBMIC00LjQ0MDggMjQgTCA0Ljk5OTMgMjQgTCAxOS43NDM5IDkuMjU1MyBMIDE0Ljc0NDYgNC4yNTYwIEwgLTQuNDQwOCAxOS4wMDA2IFogIE0gMjMuNjEgNS4zODkyIEMgMjQuMTI5OSA0Ljg2OTMgMjQuMTI5OSA0LjAyOTQgMjMuNjEgMy41MDk1IEwgMjAuNDkgMC4zODk5IEMgMTkuOTcwNSAtMC4xMjk5IDE5LjEzMDYgLTAuMTI5OSAxOC42MTA3IDAuMzg5OSBMIDE2LjE3MSAyLjgyOTYgTCAyMS4xNzAzIDcuODI4OSBMIDIzLjYxIDUuMzg5MiBaXCJcbiAgICAgIGZpbGwtcnVsZT1cImV2ZW5vZGRcIiBmaWxsPVwicmdiKDAsMCwwKVwiIHN0cm9rZS13aWR0aD1cIjEuNTBcIiBzdHJva2U9XCJyZ2JhKDAsMCwwLDApXCIgc3Ryb2tlLWxpbmVjYXA9XCJidXR0XCIvPlxuICAgIDxwYXRoIGQ9XCIgTSAwIDAgTCAzNSAwIEwgMzUgMzUgTCAwIDM1IEwgMCAwIFogXCIgZmlsbD1cInJnYmEoMCwwLDAsMClcIiBzdHJva2Utd2lkdGg9XCIxLjVcIiBzdHJva2U9XCJyZ2JhKDAsMCwwLDApXCIgc3Ryb2tlLWxpbmVjYXA9XCJidXR0XCIvPlxuICA8L3N2Zz5gLFxuICAvLyBlZGl0TGluZTogYDxzdmcgY2xhc3M9XCJqLWljb24tZWRpdC1saW5lXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHhtbG5zOnhsaW5rPVwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGlua1wiIHN0eWxlPVwiaXNvbGF0aW9uOmlzb2xhdGVcIiB3aWR0aD1cIjM2XCIgaGVpZ2h0PVwiMzZcIj48cGF0aCBkPVwiIE0gMjYuNjIgMTAuNTAgTCAyMSA0Ljg3IEwgNiAxOS44NyBMIDYgMjUuNTAgTCAxMS42MiAyNS41IEwgMjYuNiAxMC41IFogIE0gMzEuMDYgNi4wNiBDIDMxLjY1IDUuNDcgMzEuNjUgNC41MzM3NSAzMS4wNjUgMy45NCBMIDI3LjU1NSAwLjQzIEMgMjYuOTcgLTAuMTQgMjYuMDIyIC0wLjE0IDI1LjQ0IDAuNDMgTCAyMi41IDMuMzcgTCAyOC4xMjUgOSBMIDMxLjA2NSA2LjA2IFogXCIgZmlsbC1ydWxlPVwiZXZlbm9kZFwiIGZpbGw9XCJyZ2IoMCwwLDApXCIgc3Ryb2tlLXdpZHRoPVwiMS41XCIgc3Ryb2tlPVwicmdiYSgwLDAsMCwwKVwiIHN0cm9rZS1saW5lY2FwPVwiYnV0dFwiLz48cGF0aCBkPVwiIE0gMCAwIEwgMzYgMCBMIDM2IDM2IEwgMCAzNiBMIDAgMC4wMDM3NDk5OTk5OTk5OTk5MiBaIFwiIGZpbGw9XCJyZ2JhKDAsMCwwLDApXCIgc3Ryb2tlLXdpZHRoPVwiMS41XCIgc3Ryb2tlPVwicmdiYSgwLDAsMCwwKVwiIHN0cm9rZS1saW5lY2FwPVwiYnV0dFwiLz48cGF0aCBkPVwiIE0gMCAzMCBMIDM2IDMwIEwgMzYgMzYgTCAwIDM2IEwgMCAzMCBaIFwiIGZpbGw9XCJyZ2IoMCwwLDApXCIgZmlsbC1vcGFjaXR5PVwiMC40XCIgc3Ryb2tlLXdpZHRoPVwiMS41XCIgc3Ryb2tlPVwicmdiYSgwLDAsMCwwKVwiIHN0cm9rZS1saW5lY2FwPVwiYnV0dFwiLz48L3N2Zz5gLFxufVxuLy8ganNjczplbmFibGUgbWF4aW11bUxpbmVMZW5ndGhcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3N2Zy1pY29ucy5qc1xuICoqLyIsImV4cG9ydCB7Q3VzdG9tRXZlbnR9O1xuXG5mdW5jdGlvbiBDdXN0b21FdmVudChldmVudCwgcGFyYW1zID0geyBidWJibGVzOiBmYWxzZSwgY2FuY2VsYWJsZTogZmFsc2UsIGRldGFpbDogdW5kZWZpbmVkIH0pIHtcbiAgdmFyIGV2dCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdDdXN0b21FdmVudCcpO1xuICBldnQuaW5pdEN1c3RvbUV2ZW50KGV2ZW50LCBwYXJhbXMuYnViYmxlcywgcGFyYW1zLmNhbmNlbGFibGUsIHBhcmFtcy5kZXRhaWwpO1xuICByZXR1cm4gZXZ0O1xufVxuXG5pZiAod2luZG93ICYmIHR5cGVvZiB3aW5kb3cuQ3VzdG9tRXZlbnQgIT09ICdmdW5jdGlvbicpIHtcbiAgd2luZG93LkN1c3RvbUV2ZW50ID0gQ3VzdG9tRXZlbnQ7XG4gIEN1c3RvbUV2ZW50LnByb3RvdHlwZSA9IHdpbmRvdy5FdmVudC5wcm90b3R5cGU7XG59XG5cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2N1c3RvbS1ldmVudC5qc1xuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=