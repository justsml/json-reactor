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
	    var icon = valueType === 'object' ? 'plus' : valueType === 'array' ? 'list' : valueType === 'string' ? 'text' : 'default';
	    var expandable = valueType === 'object' ? 'j-expandable' : '';
	    var row = (0, _util.createElem)(['<li class="j-closed ', expandable, ' j-icon-', icon, ' j-type-', valueType, '" key="', key, '">', key, '</li>'].join(''));
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
	exports.push([module.id, ".unselectable {\n  user-select: none;\n  -moz-user-select: none;\n  -webkit-user-select: none;\n  -ms-user-select: none;\n}\n.j-xs-1,\n.j-xs-2,\n.j-xs-3,\n.j-xs-4,\n.j-xs-5,\n.j-xs-6,\n.j-xs-7,\n.j-xs-8,\n.j-xs-9,\n.j-xs-10,\n.j-xs-11,\n.j-xs-12 {\n  display: inline-block;\n  box-sizing: border-box;\n}\n.j-xs-1 {\n  width: 8.3333%;\n}\n.j-xs-2 {\n  width: 16.6666%;\n}\n.j-xs-3 {\n  width: 24.9999%;\n}\n.j-xs-4 {\n  width: 33.3332%;\n}\n.j-xs-5 {\n  width: 41.6665%;\n}\n.j-xs-6 {\n  width: 49.9998%;\n}\n.j-xs-7 {\n  width: 58.3331%;\n}\n.j-xs-8 {\n  width: 66.6664%;\n}\n.j-xs-9 {\n  width: 74.9997%;\n}\n.j-xs-10 {\n  width: 83.3331%;\n}\n.j-xs-11 {\n  width: 91.6663%;\n}\n.j-xs-12 {\n  width: 99.9996%;\n}\nul.j-keys {\n  max-width: 250px;\n  list-style: none;\n}\nul.j-keys li {\n  display: block;\n  min-width: 250px;\n  min-height: 22px;\n  text-align: left;\n  padding-left: 10px;\n  margin-left: -30px;\n}\nul.j-keys .j-closed > ul {\n  display: none;\n}\nul.j-keys .j-closed:before {\n  content: '\\25B6   ' !important;\n}\nul.j-keys .j-icon-plus:before {\n  content: '\\1F53D   ';\n}\nul.j-keys .j-icon-list:before {\n  content: '\\1F53D   ';\n}\nul.j-keys .j-icon-text:before {\n  content: '\\2139   ' !important;\n}\nul.j-keys .j-icon-default:before {\n  content: '\\1F524   \\FE0F' !important;\n}\n", ""]);
	
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


/***/ }
/******/ ])
});
;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA0YzBhOTBhOWU0NmExY2JiMjE2YyIsIndlYnBhY2s6Ly8vLi9pbmRleC5qcz80YzA4Iiwid2VicGFjazovLy8uL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9rZXktbGlzdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29uZmlnLmpzIiwid2VicGFjazovLy8uL3NyYy91dGlsLmpzIiwid2VicGFjazovLy8uL3NyYy9zdHlsZS5sZXNzIiwid2VicGFjazovLy8uL34vY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7O0FDdENBLDRHQUFrSixFOzs7Ozs7Ozs7Ozs7U0NFbEksTSxHQUFBLE07O0FBRmhCOztBQUVPLFVBQVMsTUFBVCxDQUFnQixJQUFoQixFQUFzQixNQUF0QixFQUE4QjtBQUNuQyxPQUFJLENBQUMsSUFBTCxFQUFhO0FBQUUsV0FBTSxJQUFJLEtBQUosQ0FBVSwrQ0FBVixDQUFOO0FBQWtFO0FBQ2pGLE9BQUksQ0FBQyxNQUFMLEVBQWE7QUFBRSxXQUFNLElBQUksS0FBSixDQUFVLGlEQUFWLENBQU47QUFBb0U7QUFDbkYsV0FBUSxLQUFSLENBQWMsU0FBZDs7QUFFQSxPQUFJLFVBQVUsc0JBQVEsRUFBQyxNQUFNLE1BQVAsRUFBUixDQUFkO0FBQ0EsUUFBSyxX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b250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcIkpzb25FZGl0b3JcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wiSnNvbkVkaXRvclwiXSA9IGZhY3RvcnkoKTtcbn0pKHRoaXMsIGZ1bmN0aW9uKCkge1xucmV0dXJuIFxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvblxuICoqLyIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgNGMwYTkwYTllNDZhMWNiYjIxNmNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IGdsb2JhbFtcIkpzb25FZGl0b3JcIl0gPSByZXF1aXJlKFwiLSEvVXNlcnMvZGxldnkvY29kZS9vc3MvanNvbi1lZGl0b3Ivbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9pbmRleC5qcz97XFxcInByZXNldHNcXFwiOltcXFwiZXMyMDE1XFxcIl19IS9Vc2Vycy9kbGV2eS9jb2RlL29zcy9qc29uLWVkaXRvci9pbmRleC5qc1wiKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vaW5kZXguanNcbiAqKiBtb2R1bGUgaWQgPSAwXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJpbXBvcnQge0tleUxpc3R9ICAgIGZyb20gJy4vc3JjL2tleS1saXN0J1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlKGVsZW0sIGNvbmZpZykge1xuICBpZiAoIWVsZW0pICAgeyB0aHJvdyBuZXcgRXJyb3IoJ0pzb25FZGl0b3IgaW5zdGFuY2UgcmVxdWlyZXMgMXN0IHBhcmFtIGBlbGVtYCcpIH1cbiAgaWYgKCFjb25maWcpIHsgdGhyb3cgbmV3IEVycm9yKCdKc29uRWRpdG9yIGluc3RhbmNlIHJlcXVpcmVzIDJuZCBwYXJhbSBgY29uZmlnYCcpIH1cbiAgY29uc29sZS5lcnJvcignS2V5TGlzdCcsIEtleUxpc3QpXG5cbiAgbGV0IGtleUxpc3QgPSBLZXlMaXN0KHtkYXRhOiBjb25maWd9KVxuICBlbGVtLmFwcGVuZENoaWxkKGtleUxpc3QpXG4gIHJldHVybiBrZXlMaXN0O1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9pbmRleC5qc1xuICoqLyIsImltcG9ydCB7Y29uZmlnfSAgICAgICAgICAgICAgZnJvbSAnLi9jb25maWcnXG5pbXBvcnQge2NyZWF0ZUVsZW0sIGNsb3Nlc3QsIHJlbW92ZUFsbCwgU3R5bGVzfSBmcm9tICcuL3V0aWwnXG5cbmV4cG9ydCBmdW5jdGlvbiBLZXlMaXN0KHtkYXRhLCBwYXJlbnQsIGRlcHRoID0gMH0pIHtcbiAgY29uc3QgbGlzdCA9IGNyZWF0ZUVsZW0oJzx1bCBjbGFzcz1cImota2V5c1wiIGRlcHRoPVwiJyArIGRlcHRoICsgJ1wiPjwvdWw+JylcbiAgLy8gY29uc29sZS53YXJuKCdsaXN0JywgbGlzdClcbiAgU3R5bGVzLmFkZCgpXG4gIE9iamVjdFxuICAgIC5rZXlzKGRhdGEpXG4gICAgLmZvckVhY2goKGtleSwgaWR4LCBhcnIpID0+IHtcbiAgICAgIGNvbnN0IHZhbHVlVHlwZSAgID0gQXJyYXkuaXNBcnJheShkYXRhW2tleV0pID8gJ2FycmF5JyA6IHR5cGVvZiBkYXRhW2tleV1cbiAgICAgIGNvbnN0IGljb24gICAgICAgID0gdmFsdWVUeXBlID09PSAnb2JqZWN0JyA/IFxuICAgICAgICAgICAgICAgICAgICAgICdwbHVzJyA6IHZhbHVlVHlwZSA9PT0gJ2FycmF5JyA/XG4gICAgICAgICAgICAgICAgICAgICAgJ2xpc3QnIDogdmFsdWVUeXBlID09PSAnc3RyaW5nJyA/IFxuICAgICAgICAgICAgICAgICAgICAgICd0ZXh0JyA6ICdkZWZhdWx0J1xuICAgICAgY29uc3QgZXhwYW5kYWJsZSAgPSB2YWx1ZVR5cGUgPT09ICdvYmplY3QnID8gJ2otZXhwYW5kYWJsZScgOiAnJ1xuICAgICAgY29uc3Qgcm93ID0gY3JlYXRlRWxlbShbJzxsaSBjbGFzcz1cImotY2xvc2VkICcsIGV4cGFuZGFibGUsICcgai1pY29uLScsIGljb24sICcgai10eXBlLScsIHZhbHVlVHlwZSwgJ1wiIGtleT1cIicsIGtleSwgJ1wiPicsIGtleSwgJzwvbGk+J10uam9pbignJykpXG4gICAgICBjb25zb2xlLndhcm4oJ3JvdycsIHJvdywgdmFsdWVUeXBlLCBpY29uKVxuICAgICAgbGlzdC5hcHBlbmRDaGlsZChyb3cpXG4gICAgfSlcbiAgbGlzdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGV2ZW50ID0+IHtcbiAgICBjb25zdCBsaSA9IGNsb3Nlc3QoZXZlbnQudGFyZ2V0LCAnbGknKVxuICAgIGNvbnNvbGUud2FybignX2NsaWNrZWQnLCBsaSlcbiAgICBpZiAobGkpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgICAgIGNvbnN0IGtleSAgICAgICA9IGxpLmdldEF0dHJpYnV0ZSgna2V5JylcbiAgICAgIGNvbnN0IG5leHREYXRhICA9IGRhdGFba2V5XVxuICAgICAgLy8gY29uc29sZS53YXJuKCdfY2xpY2tlZC5vbicsIGtleSwgbGkpXG4gICAgICBpZiAoIWxpLnF1ZXJ5U2VsZWN0b3IoJ3VsJykpIHtcbiAgICAgICAgY29uc29sZS53YXJuKCdfY2xpY2tlZCAtIG5lZWRzIGxpc3QnLCBsaSlcbiAgICAgICAgLy8gZG8gcmVjdXJzaW9uLCBvbiBkZW1hbmRcbiAgICAgICAgbGkuYXBwZW5kQ2hpbGQoS2V5TGlzdCh7ZGF0YTogbmV4dERhdGEsIHBhcmVudDogbGksIGRlcHRoOiBkZXB0aCArIDF9KSlcbiAgICAgICAgcmV0dXJuIGxpLmNsYXNzTGlzdC50b2dnbGUoJ2otY2xvc2VkJylcbiAgICAgIH1cbiAgICAgIC8vIHRvZ2dsZSBjbGljayBzdGF0ZVxuICAgICAgbGkuY2xhc3NMaXN0LnRvZ2dsZSgnai1jbG9zZWQnKVxuICAgICAgY29uc29sZS53YXJuKCdfY2xpY2tlZC50b2dnbGVkJywga2V5LCBsaSlcbiAgICB9XG4gIH0pXG4gIHJldHVybiBsaXN0XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9rZXktbGlzdC5qc1xuICoqLyIsImV4cG9ydCBjb25zdCBjb25maWcgPSB7XG4gIGRlYnVnOiBmYWxzZVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvY29uZmlnLmpzXG4gKiovIiwiXG4vKipcbiAqIFV0aWxpdHkgYXJyYXlpZnkgbWV0aG9kXG4gKiBBZGQgdG8gLnByb3RvdHlwZSBvZiBJdGVyYXRvcnMsIEFycmF5QnVmZmVyLCBBcmd1bWVudHMsIE5vZGVMaXN0LCBTZXQvV2Vha1NldCwgd2hhdGV2ZXIgI1lPTE9cbiAqXG4gKiAuLi4gT3IganVzdCB1c2UgYXMgdXRpbCwgYXMgbmVlZGVkLCAjSnVzdERvSXRcbiAqXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0b0FycmF5KGxpc3QpIHtcbiAgbGlzdCA9IEFycmF5LmlzQXJyYXkobGlzdCkgPyBsaXN0IDogdGhpc1xuICBsaXN0ID0gIWxpc3QgPyBbXSA6IGxpc3RcbiAgcmV0dXJuIEFycmF5LmZyb20gJiYgQXJyYXkuZnJvbShsaXN0KSB8fCBbJ3VwZ3JhZGUgeW91ciBicm93c2VyLCBwZmZ0J11cbn1cblxuLyoqXG4gKiBHZXQgYEFycmF5LnNvcnRgIGZ1bmN0aW9uIGZvciBrZXkgbmFtZSBjb21wYXJpc29ucyAoc3VwcG9ydHMgcmV2ZXJzZSlcbiAqXG4gKiBXaGVuIG5hbWUgPT09ICdlbWFpbCAgIC0tLSBTb3J0IGVtYWlsIGFzY2VuZGluZy5cbiAqXG4gKiBXaGVuIG5hbWUgPT09ICctZW1haWwgIC0tLSBTb3J0IGVtYWlsIGRlc2NlbmRpbmdcbiAqXG4gKiBAcmV0dXJucyBbZnVuY3Rpb25dIGNvbXBhcmVyIHVzZWQgaW4gYEFycmF5LnNvcnQoKWBcbiAqXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRTb3J0ZXIoa2V5KSB7XG4gIGNvbnN0IF9lbmdsaXNoU29ydCAgICAgICAgID0gKGEsIGIpID0+IChhW2tleV0gPCBiW2tleV0gPyAtMSA6IChhW2tleV0gPiBiW2tleV0gPyAxIDogMCkpXG4gIGNvbnN0IF9lbmdsaXNoU29ydFJldmVyc2VkID0gKGEsIGIpID0+IChhW2tleV0gPj0gYltrZXldID8gLTEgOiAoYVtrZXldIDwgYltrZXldID8gMSA6IDApKVxuXG4gIGlmIChrZXlbMF0gPT09ICctJykge1xuICAgIGtleSA9IGtleS5zdWJzdHIoMSk7XG4gICAgcmV0dXJuIF9lbmdsaXNoU29ydFJldmVyc2VkO1xuICB9XG4gIHJldHVybiBfZW5nbGlzaFNvcnQ7XG59XG5cbi8qKlxuICpcbiAqL1xuZXhwb3J0IGNvbnN0IFN0eWxlcyA9IHtcbiAgYWRkOiAoKSA9PiB7XG4gICAgbGV0IGNzcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ3N0eWxlI2pzb24tZWRpdG9yJylcbiAgICBpZiAoIWNzcykge1xuICAgICAgY29uc3Qgc3R5bGVzICA9IHJlcXVpcmUoJyFjc3MhbGVzcyEuL3N0eWxlLmxlc3MnKVxuICAgICAgY3NzICAgICAgICAgICA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJylcbiAgICAgIGNzcy5pZCAgICAgICAgPSAnanNvbi1lZGl0b3InXG4gICAgICBjc3MuaW5uZXJIVE1MID0gc3R5bGVzXG4gICAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKGNzcylcbiAgICB9XG4gIH0sXG4gIHJlbW92ZTogKCkgPT4ge1xuICAgIGxldCBjc3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdzdHlsZSNqc29uLWVkaXRvcicpXG4gICAgaWYgKGNzcyAmJiBjc3MucGFyZW50Tm9kZSkgeyBjc3MucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChjc3MpIH1cbiAgfVxufVxuXG4vKipcbiAqIEFjY2VwdHMgZWxlbWVudHMgZnJvbSBgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbGBcbiAqXG4gKiBSZW1vdmVzIGFsbCBjaGlsZHJlbiBvZiBAbm9kZVxuICpcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZUFsbChub2RlKSB7XG4gIGlmICh0aGlzIGluc3RhbmNlb2YgTm9kZUxpc3QpIHsgbm9kZSA9IHRoaXM7IH1cblxuICB0b0FycmF5KG5vZGUpXG4gICAgLmZvckVhY2goZWwgPT4gZWwucGFyZW50Tm9kZSAmJiBlbC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGVsKSlcbiAgcmV0dXJuIG5vZGVcbn1cblxuLyoqXG4gKiBUb3RlcyBvYnZpXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRJZCh7aWQsIF9pZCwga2V5fSkgeyByZXR1cm4gaWQgfHwgX2lkIHx8IGtleTsgfVxuXG4vKipcbiAqIFxuICovXG5leHBvcnQgY29uc3QgY2xvc2VzdCA9IChlbGVtLCBzZWxlY3RvcikgPT4ge1xuICByZXR1cm4gIWVsZW0gPyBudWxsXG4gICAgICAgICA6IGVsZW0ubWF0Y2hlcyAmJiBlbGVtLm1hdGNoZXMoc2VsZWN0b3IpIFxuICAgICAgICAgPyBlbGVtIDogZWxlbS5jbGFzc0xpc3QgJiYgZWxlbS5jbGFzc0xpc3QuY29udGFpbnMoc2VsZWN0b3IpXG4gICAgICAgICA/IGVsZW0gOiBjbG9zZXN0KGVsZW0ucGFyZW50Tm9kZSwgc2VsZWN0b3IpXG59XG5cbi8qKlxuICogV2FybmluZzogUHJpdmF0ZS9sb2NhbCB1c2Ugb25seS4gRG8gbm90IGhvaXN0LlxuICogKioqIFVuc2FmZSBIVE1ML3N0cmluZyBoYW5kbGluZyAqKipcbiAqL1xuZXhwb3J0IGNvbnN0IGNyZWF0ZUVsZW0gPSBodG1sID0+IHtcbiAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpXG4gIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gIGRpdi5pbm5lckhUTUwgPSBodG1sIC8vIFBvdGVudGlhbCBTZWN1cml0eSBFeHBsb2l0IFZlY3RvciEhISEhIVxuICByZXR1cm4gZGl2LmNoaWxkTm9kZXMubGVuZ3RoID09PSAxID8gZGl2LmNoaWxkTm9kZXNbMF0gOiBkaXZcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3V0aWwuanNcbiAqKi8iLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikoKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIi51bnNlbGVjdGFibGUge1xcbiAgdXNlci1zZWxlY3Q6IG5vbmU7XFxuICAtbW96LXVzZXItc2VsZWN0OiBub25lO1xcbiAgLXdlYmtpdC11c2VyLXNlbGVjdDogbm9uZTtcXG4gIC1tcy11c2VyLXNlbGVjdDogbm9uZTtcXG59XFxuLmoteHMtMSxcXG4uai14cy0yLFxcbi5qLXhzLTMsXFxuLmoteHMtNCxcXG4uai14cy01LFxcbi5qLXhzLTYsXFxuLmoteHMtNyxcXG4uai14cy04LFxcbi5qLXhzLTksXFxuLmoteHMtMTAsXFxuLmoteHMtMTEsXFxuLmoteHMtMTIge1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG59XFxuLmoteHMtMSB7XFxuICB3aWR0aDogOC4zMzMzJTtcXG59XFxuLmoteHMtMiB7XFxuICB3aWR0aDogMTYuNjY2NiU7XFxufVxcbi5qLXhzLTMge1xcbiAgd2lkdGg6IDI0Ljk5OTklO1xcbn1cXG4uai14cy00IHtcXG4gIHdpZHRoOiAzMy4zMzMyJTtcXG59XFxuLmoteHMtNSB7XFxuICB3aWR0aDogNDEuNjY2NSU7XFxufVxcbi5qLXhzLTYge1xcbiAgd2lkdGg6IDQ5Ljk5OTglO1xcbn1cXG4uai14cy03IHtcXG4gIHdpZHRoOiA1OC4zMzMxJTtcXG59XFxuLmoteHMtOCB7XFxuICB3aWR0aDogNjYuNjY2NCU7XFxufVxcbi5qLXhzLTkge1xcbiAgd2lkdGg6IDc0Ljk5OTclO1xcbn1cXG4uai14cy0xMCB7XFxuICB3aWR0aDogODMuMzMzMSU7XFxufVxcbi5qLXhzLTExIHtcXG4gIHdpZHRoOiA5MS42NjYzJTtcXG59XFxuLmoteHMtMTIge1xcbiAgd2lkdGg6IDk5Ljk5OTYlO1xcbn1cXG51bC5qLWtleXMge1xcbiAgbWF4LXdpZHRoOiAyNTBweDtcXG4gIGxpc3Qtc3R5bGU6IG5vbmU7XFxufVxcbnVsLmota2V5cyBsaSB7XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIG1pbi13aWR0aDogMjUwcHg7XFxuICBtaW4taGVpZ2h0OiAyMnB4O1xcbiAgdGV4dC1hbGlnbjogbGVmdDtcXG4gIHBhZGRpbmctbGVmdDogMTBweDtcXG4gIG1hcmdpbi1sZWZ0OiAtMzBweDtcXG59XFxudWwuai1rZXlzIC5qLWNsb3NlZCA+IHVsIHtcXG4gIGRpc3BsYXk6IG5vbmU7XFxufVxcbnVsLmota2V5cyAuai1jbG9zZWQ6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6ICdcXFxcMjVCNiAgICcgIWltcG9ydGFudDtcXG59XFxudWwuai1rZXlzIC5qLWljb24tcGx1czpiZWZvcmUge1xcbiAgY29udGVudDogJ1xcXFwxRjUzRCAgICc7XFxufVxcbnVsLmota2V5cyAuai1pY29uLWxpc3Q6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6ICdcXFxcMUY1M0QgICAnO1xcbn1cXG51bC5qLWtleXMgLmotaWNvbi10ZXh0OmJlZm9yZSB7XFxuICBjb250ZW50OiAnXFxcXDIxMzkgICAnICFpbXBvcnRhbnQ7XFxufVxcbnVsLmota2V5cyAuai1pY29uLWRlZmF1bHQ6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6ICdcXFxcMUY1MjQgICBcXFxcRkUwRicgIWltcG9ydGFudDtcXG59XFxuXCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vY3NzLWxvYWRlciEuL34vbGVzcy1sb2FkZXIhLi9zcmMvc3R5bGUubGVzc1xuICoqIG1vZHVsZSBpZCA9IDVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qXHJcblx0TUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcclxuXHRBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXHJcbiovXHJcbi8vIGNzcyBiYXNlIGNvZGUsIGluamVjdGVkIGJ5IHRoZSBjc3MtbG9hZGVyXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XHJcblx0dmFyIGxpc3QgPSBbXTtcclxuXHJcblx0Ly8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xyXG5cdGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcclxuXHRcdHZhciByZXN1bHQgPSBbXTtcclxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciBpdGVtID0gdGhpc1tpXTtcclxuXHRcdFx0aWYoaXRlbVsyXSkge1xyXG5cdFx0XHRcdHJlc3VsdC5wdXNoKFwiQG1lZGlhIFwiICsgaXRlbVsyXSArIFwie1wiICsgaXRlbVsxXSArIFwifVwiKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRyZXN1bHQucHVzaChpdGVtWzFdKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHJlc3VsdC5qb2luKFwiXCIpO1xyXG5cdH07XHJcblxyXG5cdC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XHJcblx0bGlzdC5pID0gZnVuY3Rpb24obW9kdWxlcywgbWVkaWFRdWVyeSkge1xyXG5cdFx0aWYodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpXHJcblx0XHRcdG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIFwiXCJdXTtcclxuXHRcdHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XHJcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHR2YXIgaWQgPSB0aGlzW2ldWzBdO1xyXG5cdFx0XHRpZih0eXBlb2YgaWQgPT09IFwibnVtYmVyXCIpXHJcblx0XHRcdFx0YWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xyXG5cdFx0fVxyXG5cdFx0Zm9yKGkgPSAwOyBpIDwgbW9kdWxlcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHR2YXIgaXRlbSA9IG1vZHVsZXNbaV07XHJcblx0XHRcdC8vIHNraXAgYWxyZWFkeSBpbXBvcnRlZCBtb2R1bGVcclxuXHRcdFx0Ly8gdGhpcyBpbXBsZW1lbnRhdGlvbiBpcyBub3QgMTAwJSBwZXJmZWN0IGZvciB3ZWlyZCBtZWRpYSBxdWVyeSBjb21iaW5hdGlvbnNcclxuXHRcdFx0Ly8gIHdoZW4gYSBtb2R1bGUgaXMgaW1wb3J0ZWQgbXVsdGlwbGUgdGltZXMgd2l0aCBkaWZmZXJlbnQgbWVkaWEgcXVlcmllcy5cclxuXHRcdFx0Ly8gIEkgaG9wZSB0aGlzIHdpbGwgbmV2ZXIgb2NjdXIgKEhleSB0aGlzIHdheSB3ZSBoYXZlIHNtYWxsZXIgYnVuZGxlcylcclxuXHRcdFx0aWYodHlwZW9mIGl0ZW1bMF0gIT09IFwibnVtYmVyXCIgfHwgIWFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcclxuXHRcdFx0XHRpZihtZWRpYVF1ZXJ5ICYmICFpdGVtWzJdKSB7XHJcblx0XHRcdFx0XHRpdGVtWzJdID0gbWVkaWFRdWVyeTtcclxuXHRcdFx0XHR9IGVsc2UgaWYobWVkaWFRdWVyeSkge1xyXG5cdFx0XHRcdFx0aXRlbVsyXSA9IFwiKFwiICsgaXRlbVsyXSArIFwiKSBhbmQgKFwiICsgbWVkaWFRdWVyeSArIFwiKVwiO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRsaXN0LnB1c2goaXRlbSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9O1xyXG5cdHJldHVybiBsaXN0O1xyXG59O1xyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1xuICoqIG1vZHVsZSBpZCA9IDZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=