const {isBoolean, isNumber, isDate} = require('../Util');
const _                             = require('lodash');

export const JS_DEFAULT_TYPE     = { ___type: 'object',  ___default: null };
export const JS_BOOLEAN_TYPE     = { ___type: 'boolean', ___default: null };
export const JS_NUMBER_TYPE      = { ___type: 'number',  ___default: null, ___min: -Infinity, ___max: Infinity };
export const JS_STRING_TYPE      = { ___type: 'string',  ___default: null, ___min: 0,         ___max: Infinity };
export const JS_ENUM_TYPE        = { ___type: 'string',  ___default: null, ___enum: [] };
export const JS_ARRAY_TYPE       = { ___type: 'array',   ___default: null };
export const JS_OBJECT_TYPE      = { ___type: 'object',  ___default: null };
export const JS_DATE_TYPE        = { ___type: 'date',    ___default: null };
export const TYPE_COMPLEXITY_ORDER  = [
  JS_BOOLEAN_TYPE,
  JS_NUMBER_TYPE,
  JS_STRING_TYPE,
  JS_ARRAY_TYPE,
  JS_OBJECT_TYPE,
  JS_DATE_TYPE,
  JS_ENUM_TYPE];
export const JS_TYPES = TYPE_COMPLEXITY_ORDER;

// const patterns = {
//   boolean: [/^(true|false)$/i, /^(yes|no)$/i, /^(Y|N)$/i, /^(1|0)$/i],
//   number: [/^\$?[\.,\d]*$/]
// }
// export const isBoolean = str => typeof str !== 'object' && (str === true || str === false || patterns.boolean.some(p => p.test(String(str))));
// export const isNumber  = str => typeof str !== 'object' && (_.isFinite(str) || patterns.number.some(p => p.test(String(str))));
// export const isDate    = str => toDate(str) ? true : false;
// export const toDate    = str => {
//   if (typeof str === 'object' && str.toISOString)  { return true;  }
//   if (str && (str.length < 5 || str.length >= 30)) { return false; }
//   let date, validPatterns = ['MMM DD, YYYY', 'MMMM DD, YYYY',
//     'MM-DD-YYYY', 'YYYY-MM-DD', 'MM/DD/YYYY', 'MM/DD/YY'];
//   try {
//     date = new Date(Date.parse(str));
//     if (date && date.toISOString()) {
//       return date;
//     }
//   } catch (e) {
//     // nada
//   }
//   // not native date able -- try moment & validPatterns
//   date = moment(str, validPatterns);
//   return moment.isDate(date) ? date : null;
// }

export function guessType(value, defaultValue = JS_DEFAULT_TYPE) {
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
