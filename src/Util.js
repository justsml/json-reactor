// jscs:disable safeContextKeyword
const moment = require('moment');
const _ = require('lodash');

export function getType(value) {
  return value && Object.prototype.toString.call(value).replace('[object ', '').replace(']', '').toLowerCase();
}

/**
 * Utility arrayify method
 * Add to .prototype of Iterators, ArrayBuffer, Arguments, NodeList, Set/WeakSet, whatever #YOLO
 *
 * ... Or just use as util, as needed, #JustDoIt
 *
 */
export function toArray(list) {
  list = Array.isArray(list) ? list : this
  list = !list ? [] : list
  return Array.from && Array.from(list) || ['upgrade your browser, pfft']
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
export function getSorter(key) {
  const _englishSort         = (a, b) => (a[key] < b[key] ? -1 : (a[key] > b[key] ? 1 : 0))
  const _englishSortReversed = (a, b) => (a[key] >= b[key] ? -1 : (a[key] < b[key] ? 1 : 0))

  if (key[0] === '-') {
    key = key.substr(1);
    return _englishSortReversed;
  }

  return _englishSort;
}

/**
 *
 */
export const Styles = {
  add: () => {
    let css = document.querySelector('style#json-reactor')
    if (!css) {
      const styles  = require('!css!less!./Style.less')
      css           = document.createElement('style')
      css.id        = 'json-reactor'
      css.innerHTML = styles
      document.head.appendChild(css)
    }
  },

  remove: () => {
    let css = document.querySelector('style#json-reactor')
    if (css && css.parentNode) { css.parentNode.removeChild(css) }
  },
}

/**
 * Accepts elements from `document.querySelectorAll`
 *
 * Removes all children of @node
 *
 */
export function removeAll(node) {
  if (this instanceof NodeList) { node = this; }

  toArray(node)
    .forEach(el => el.parentNode && el.parentNode.removeChild(el))
  return node
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
export function removeNode(node) {
  if (this instanceof Node) { node = this; }

  if (node.parentNode && node.parentNode.removeChild) {
    node.parentNode.removeChild(node)
  }

  return node
}

/**
 * Totes obvi
 */
export function getId({ id, _id, key }) { return id || _id || key; }

/**
 *
 */
export const closest = (elem, selector, limit = null) => {
  if (limit !== null && limit <= 0) { return false }

  return !elem ? null
         : elem.matches && elem.matches(selector)
         ? elem : elem.classList && elem.classList.contains(selector)
         ? elem : closest(elem.parentNode, selector, (limit !== null ? limit - 1 : limit))
}

/**
 * toBool converts anything to a boolean - see code for details
 */
export const toBool = (str) => {
  if (typeof str === 'boolean') {
    return str
  }

  if (typeof str === 'string') {
    str = (str.length >= 1 ? str.toUpperCase()[0] : str)
    return ['Y', '1', 'T'].indexOf(str) === 0
  }

  return str ? true : false
}

/**
 * Warning: Private/local use only. Do not hoist.
 * *** Unsafe HTML/string handling ***
 */
export const createElem = html => {
  // const container = document.createDocumentFragment()
  const div = document.createElement('div')
  div.innerHTML = html // Potential Security Exploit Vector!!!!!!
  return div.children.length === 1 ? div.children[0] : div
}

const patterns = {
  boolean: [/^(true|false)$/i, /^(yes|no)$/i, /^(Y|N)$/i, /^(1|0)$/i],
  number: [/^\$?[\.,\d]*$/]
}
export const isBoolean = str => typeof str !== 'object' && (str === true || str === false || patterns.boolean.some(p => p.test(String(str))));
export const isNumber  = str => typeof str !== 'object' && (_.isFinite(str) || patterns.number.some(p => p.test(String(str))));
export const isDate    = str => toDate(str) ? true : false;
export const toDate    = str => {
  if (typeof str === 'object' && str.toISOString)  { return true;  }
  if (str && (str.length < 5 || str.length >= 30)) { return false; }
  let date, validPatterns = ['MMM DD, YYYY', 'MMMM DD, YYYY',
    'MM-DD-YYYY', 'YYYY-MM-DD', 'MM/DD/YYYY', 'MM/DD/YY'];
  try {
    date = new Date(Date.parse(str));
    if (date && date.toISOString()) {
      return date;
    }
  } catch (e) {
    // nada
  }
  // not native date able -- try moment & validPatterns
  date = moment(str, validPatterns);
  return moment.isDate(date) ? date : null;
}
