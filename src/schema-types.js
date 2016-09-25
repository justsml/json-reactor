const _ = require('lodash');
const moment = require('moment');

const JS_DEFAULT_TYPE = module.exports.JS_DEFAULT_TYPE     = { 'type': 'object', default: null };
const JS_BOOLEAN_TYPE = module.exports.JS_BOOLEAN_TYPE     = { 'type': 'boolean', default: null };
const JS_NUMBER_TYPE  = module.exports.JS_NUMBER_TYPE      = { 'type': 'number',  default: null, min: -Infinity, max: Infinity };
const JS_STRING_TYPE  = module.exports.JS_STRING_TYPE      = { 'type': 'string',  default: null };
const JS_ENUM_TYPE    = module.exports.JS_ENUM_TYPE        = { 'type': 'string',  default: null, enum: [] };
const JS_ARRAY_TYPE   = module.exports.JS_ARRAY_TYPE       = { 'type': 'array',   default: null };
const JS_OBJECT_TYPE  = module.exports.JS_OBJECT_TYPE      = { 'type': 'object',  default: null };
const JS_DATE_TYPE    = module.exports.JS_DATE_TYPE        = { 'type': 'date',    default: null };
const TYPE_COMPLEXITY_ORDER = module.exports.TYPE_COMPLEXITY_ORDER  = [
  JS_BOOLEAN_TYPE,
  JS_NUMBER_TYPE,
  JS_STRING_TYPE,
  JS_ARRAY_TYPE,
  JS_OBJECT_TYPE,
  JS_DATE_TYPE,
  JS_ENUM_TYPE];
module.exports.JS_TYPES = TYPE_COMPLEXITY_ORDER;

const patterns = {
  boolean: [/^true|false$/i, /^yes|no$/i, /^Y|N$/i, /^1|0$/i],
  // date: [/^[0-3]?[0-9]\/[0-3]?[0-9]\/(?:[0-9]{2})?[0-9]{2}$/],
  number: [/^[\.,\d]*$/]
}
const isBoolean = str => typeof str !== 'object' && (str === true || str === false || patterns.boolean.some(p => p.test(String(str))));
const isNumber  = str => typeof str !== 'object' && (Number.isInteger(str) || patterns.number.some(p => p.test(String(str))));
const isDate    = str => {
  if (typeof str === 'object' && str.toISOString)  { return true;  }
  if (str && (str.length < 6 || str.length >= 30)) { return false; }
  let date, validPatterns = ['MMM DD, YYYY', 'MMMM DD, YYYY',
    'MM-DD-YYYY', 'YYYY-MM-DD', 'MM/DD/YYYY', 'MM/DD/YY'];
  try {
    date = new Date(Date.parse(str));
    console.warn('DATE.CTORD=', date);
    if (date && date.getFullYear() !== 1970) {
      return true;
    }
  } catch (e) {
    // nada
  }
  // not native date able -- try moment & validPatterns
  return moment.isDate(moment(str, validPatterns));
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
    // double check if it's really number-ish
    if (isNumber(value).toString() === value) { return JS_NUMBER_TYPE; }
    return JS_STRING_TYPE;
  } else if (Array.isArray(value)) {
    return JS_ARRAY_TYPE;
  } else if (typeof(value) === 'object') {
    return JS_OBJECT_TYPE;
  } else if (typeof(value) === 'string') {
    return JS_STRING_TYPE;
  }
}




module.exports.isDate     = isDate;
module.exports.isBoolean  = isBoolean;
module.exports.isNumber   = isNumber;
module.exports.guessType  = guessType;


