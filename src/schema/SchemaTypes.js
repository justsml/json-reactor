const _ = require('lodash');
const moment = require('moment');

const JS_DEFAULT_TYPE     = { 'type': 'object', default: null };
const JS_BOOLEAN_TYPE     = { 'type': 'boolean', default: null };
const JS_NUMBER_TYPE      = { 'type': 'number',  default: null, min: -Infinity, max: Infinity };
const JS_STRING_TYPE      = { 'type': 'string',  default: null, min: 0, max: Infinity };
const JS_ENUM_TYPE        = { 'type': 'string',  default: null, enum: [] };
const JS_ARRAY_TYPE       = { 'type': 'array',   default: null };
const JS_OBJECT_TYPE      = { 'type': 'object',  default: null };
const JS_DATE_TYPE        = { 'type': 'date',    default: null };
const TYPE_COMPLEXITY_ORDER  = [
  JS_BOOLEAN_TYPE,
  JS_NUMBER_TYPE,
  JS_STRING_TYPE,
  JS_ARRAY_TYPE,
  JS_OBJECT_TYPE,
  JS_DATE_TYPE,
  JS_ENUM_TYPE];
const JS_TYPES = TYPE_COMPLEXITY_ORDER;

const patterns = {
  // date: [/^[0-3]?[0-9]\/[0-3]?[0-9]\/(?:[0-9]{2})?[0-9]{2}$/],
  boolean: [/^(true|false)$/i, /^(yes|no)$/i, /^(Y|N)$/i, /^(1|0)$/i],
  number: [/^[$€¢£¥₪₩₽฿₫₴₹]?\s?[\.,\d]*$/]
}
const isBoolean = str => typeof str !== 'object' && (str === true || str === false || patterns.boolean.some(p => p.test(String(str))));
const isNumber  = str => typeof str !== 'object' && (_.isFinite(str) || patterns.number.some(p => p.test(String(str))));
const isDate    = str => {
  if (typeof str === 'object' && str.toISOString)  { return true;  }
  if (str && (str.length < 6 || str.length >= 30)) { return false; }
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
  return moment.isDate(date) ? date : false;
}

function guessType(value, defaultValue = JS_DEFAULT_TYPE) {
  if (_.isEmpty(value)) {
    return defaultValue;
  } else if (isBoolean(value)) {
    return JS_BOOLEAN_TYPE;
  } else if (isNumber(value)) {
    return JS_NUMBER_TYPE;
  } else if (isDate(value)) {
    return JS_DATE_TYPE;
  } else if (typeof(value) === 'string') {
    return JS_STRING_TYPE;
  } else if (_.isArrayLikeObject(value)) {
    return JS_ARRAY_TYPE;
  } else if (typeof(value) === 'object') {
    return JS_OBJECT_TYPE;
  } else if (typeof(value) === 'string') {
    return JS_STRING_TYPE;
  }
}

module.exports = {
  JS_DEFAULT_TYPE,
  JS_BOOLEAN_TYPE,
  JS_NUMBER_TYPE,
  JS_STRING_TYPE,
  JS_ENUM_TYPE,
  JS_ARRAY_TYPE,
  JS_OBJECT_TYPE,
  JS_DATE_TYPE,
  TYPE_COMPLEXITY_ORDER,
  JS_TYPES,
  isBoolean,
  isNumber,
  isDate,
  guessType,
};
