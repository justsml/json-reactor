const _ = require('lodash');
const moment = require('moment');

export const JS_DEFAULT_TYPE     = { 'type': 'object', default: null };
export const JS_BOOLEAN_TYPE     = { 'type': 'boolean', default: null };
export const JS_NUMBER_TYPE      = { 'type': 'number',  default: null, min: -Infinity, max: Infinity };
export const JS_STRING_TYPE      = { 'type': 'string',  default: null };
export const JS_ENUM_TYPE        = { 'type': 'string',  default: null, enum: [] };
export const JS_ARRAY_TYPE       = { 'type': 'array',   default: null };
export const JS_OBJECT_TYPE      = { 'type': 'object',  default: null };
export const JS_DATE_TYPE        = { 'type': 'date',    default: null };
export const TYPE_COMPLEXITY_ORDER  = [JS_BOOLEAN_TYPE, JS_NUMBER_TYPE, JS_STRING_TYPE,
    JS_ARRAY_TYPE, JS_OBJECT_TYPE, JS_DATE_TYPE, JS_ENUM_TYPE];
export const JS_TYPES            = TYPE_COMPLEXITY_ORDER;

const patterns = {
  boolean: [/^true|false$/i, /^yes|no$/i, /^Y|N$/i, /^1|0$/i],
  date: [/^[0-3]?[0-9]\/[0-3]?[0-9]\/(?:[0-9]{2})?[0-9]{2}$/],
  number: [/^[\.,\d]*$/]
}
const isBoolean = str => patterns.boolean.every(p => p.test(String(str)));
const isNumber  = str => patterns.number.every(p => p.test(String(str)));
const isDate    = str => {
  if (typeof str === 'object' && str.toISOString)  { return true;  }
  if (str && (str.length < 6 || str.length >= 30)) { return false; }
  let date, validPatterns = ['MMM DD, YYYY', 'MMMM DD, YYYY',
    'MM-DD-YYYY', 'YYYY-MM-DD', 'MM/DD/YYYY', 'MM/DD/YY'];
  try {
    date = new Date(str);
    return date && true;
  } catch (e) {
    // not native date able -- try moment & validPatterns
    return moment(str, validPatterns).isDate();
  }
}

export function guessType({currentType, currentValue}) {
  if (_.isEmpty(currentValue)) {
    return currentType || JS_DEFAULT_TYPE;
  } else if (isBoolean(currentValue)) {
    return JS_BOOLEAN_TYPE;
  } else if (isNumber(currentValue)) {
    return JS_NUMBER_TYPE;
  } else if (isDate(currentValue)) {
    return JS_DATE_TYPE;
  } else if (typeof(currentValue) === 'string') {
    // double check if it's really number-ish
    if (isNumber(currentValue).toString() === currentValue) { return JS_NUMBER_TYPE; }
    return JS_STRING_TYPE;
  } else if (Array.isArray(currentValue)) {
    return JS_ARRAY_TYPE;
  } else if (typeof(currentValue) === 'object') {
    return JS_OBJECT_TYPE;
  } else if (typeof(currentValue) === 'string') {
    return JS_STRING_TYPE;
  }
}

