const _ = require('lodash');
const {MissingColumnsError} = require('../Util');
const {guessType, JS_ENUM_TYPE, JS_DEFAULT_TYPE, TYPE_COMPLEXITY_ORDER, isDate} = require('./SchemaTypes');
const _default = {
  opts: {
    rows: 200,
    cols: 200,
    uniques: 1000,
    enableEnumMinRows: 50, // min size of src rows b4 enums are detected
    enumSize: 8,
    enumStringSize: 32,
    minFieldTypeCount: 50,
  }
};

export function buildSchema(data, opts = _default.opts) {
  opts = Object.assign({}, _default.opts, opts);
  const schemaLevels = data.reduce(_evaluateSchemaLevel, opts);
  const enumFields   = _findEnumTypes.call(opts, schemaLevels);
  console.warn('\n\n enumFields:', enumFields, '\n\n');
  const schema       = _filterTypesByProbability.call(opts, schemaLevels);
  const {sizes}      = schemaLevels;
  Object.assign(schema, {sizes});
  // console.warn('\n\nenumFields', enumFields, '\n\n');
  enumFields.forEach(enumFld => {
    // console.warn(`\nenumFld: ${enumFld && enumFld.name}`, enumFld);
    // override field on schema with enum props
    schema[enumFld.name] = Object.assign(schema[enumFld.name] || {}, enumFld);
  });
  return schema;
}

export function _evaluateSchemaLevel(schema, obj) {
  const opts = Object.assign({}, _default.opts, this || {});
  schema = Object.assign({sumTypes: {}, uniques: {}, sizes: {}, fieldCount: 0, columnCount: 0}, schema || {});
  schema._fieldCount = schema._fieldCount === undefined ? 0 : schema._fieldCount;
  Object.keys(obj)
  .forEach((key, colIdx) => {
    if (colIdx > opts.cols) { return; }
    let val = obj[key];
    const t = guessType(val, {type: 'null'});
    schema.sumTypes[key] = schema.sumTypes[key] || {};
    schema.uniques[key]  = schema.uniques[key]  || {};
    schema.sizes[key]    = schema.sizes[key]    || {};
    // count the type
    schema.sumTypes[key][t.type] = !schema.sumTypes[key][t.type] ? 1 : ++schema.sumTypes[key][t.type];
    if (['string', 'number', 'date'].indexOf(t.type) > -1) {
      // Detect Sizes & data type dimensions
      schema.sizes[key][t.type]    = schema.sizes[key][t.type] ? schema.sizes[key][t.type] : {min: Infinity, max: -Infinity};
      // for enum detection -- add value to unique list - upto opts.uniques
      if (t.type === 'number' && _.isFinite(val)) {
        schema.sizes[key][t.type].min = _.min([schema.sizes[key][t.type].min, parseFloat(val)]);
        schema.sizes[key][t.type].max = _.max([schema.sizes[key][t.type].max, parseFloat(val)]);
      }
      if (t.type === 'date' && isDate(val)) {
        val = isDate(val);
        schema.sizes[key][t.type].min = _.min([schema.sizes[key][t.type].min, val]);
        schema.sizes[key][t.type].max = _.max([schema.sizes[key][t.type].max, val]);
      }
      if (t.type === 'string' && typeof val !== 'undefined') {
        schema.sizes[key][t.type].min = _.min([schema.sizes[key][t.type].min, val.length]);
        schema.sizes[key][t.type].max = _.max([schema.sizes[key][t.type].max, val.length]);
      }
    }
    // Detect Enums
    if ((typeof val === 'string' && val.length <= opts.enumStringSize) || _.isFinite(val)) {
      val = typeof val === 'string' ? val.toLowerCase() : val;
      if (Object.keys(schema.uniques[key]).length <= opts.uniques) {
        schema.uniques[key][val] = !schema.uniques[key][val] ? 1 : ++schema.uniques[key][val];
      }
    }
    // console.warn(`schema.sumTypes[${key}]`, schema.sumTypes[key]);
    schema.fieldCount += 1;
    // schema[key] = _checkUpgradeType({schema, currentType: schema[key], currentValue: obj[key], key: key});
  })
  return schema;
}
/*
{ sumTypes:
  { id: { null: 9 },
    name: { boolean: 1, null: 4, string: 4 },
    email: { null: 1, string: 8 },
    active: { boolean: 8, null: 1 },
    signup: { date: 9 },
    cancelled: { date: 1, null: 6 },
    nullVal: { null: 1 },
    undefVal: { null: 1 } },
uniques:
  { id:
    { '1': 1,
      '2': 1,
      '3': 1,
      '4': 1,
      '5': 1,
      '6': 1,
      '7': 1,
      '8': 1,
      '9': 1 },
    name: { John: 1, null: 4, Bob: 1, Alice: 1, Eve: 1, Bond: 1 },
    email: { undefined: 1, 'a@a.com': 8 },
    active: { y: 5, n: 1, null: 1, yes: 1, YES: 1 },
    signup: { '2016-12-31T07:00:00.000Z': 9 },
    cancelled: { '2017-01-01T07:00:00.000Z': 1, null: 6 },
    nullVal: { null: 1 },
    undefVal: { undefined: 1 }
 },
_fieldCount: 54 }
 */

/**
 * Finds if columns meet criteria for enums, restricted lists of string (or int) values
 *
 * @export
 * @param {any} {uniques = {}}
 * @returns
 */
export function _findEnumTypes({uniques = {}}) {
  const opts = Object.assign({}, _default.opts, this || {});
  return Object.keys(uniques)
    .map(field => {
      let fieldValCounts = uniques[field];
      let fieldValList = Object.keys(fieldValCounts)
        // min # of occurances for individual token/value must exceed this opts.enableEnumMinRows setting -
        //TODO: might need to change this to filter before we even get into this `.map` closure or maybe using something like colSum below - i.e. total # of values between range of hits.
        .filter(commonValue => fieldValCounts[commonValue] >= opts.enableEnumMinRows);
      let colSum = fieldValList
        .reduce((sum, valIdx) => {
          return sum + fieldValCounts[valIdx];
        }, 0);
      if (colSum <= opts.enableEnumMinRows) { return null; }
      if (fieldValList.length <= opts.enumSize) {
        // we have enum - maybe!!!
        return {name: field, type: 'string', enum: fieldValList.sort(), __commonFieldTotal: colSum};
      }
      // console.warn(`${field}: colSum`, colSum);
      // return {name: field, columnTotal: colSum}
    })
    .filter(f => f && f.enum);
}
/**
 *
 * @export
 * @param {any} {sumTypes = {}}
 * @param {number} [percentMin=10]
 * @returns
 */
export function _filterTypesByProbability({sumTypes = {}}, percentMin = 50) {
  const opts = Object.assign({}, _default.opts, this || {});
  const __improbableKeys = [];
  return Object.keys(sumTypes)
    .map(field => {
      let fieldTypeCounts = sumTypes[field];
      let fieldTypeList = Object.keys(fieldTypeCounts)
        .filter(type => ['undefined', 'null'].indexOf(type) === -1)
        .sort((a, b) => {
          return fieldTypeCounts[a] > fieldTypeCounts[b];
        });
      let colSum = fieldTypeList
        .reduce((sum, valIdx) => {
          return sum + fieldTypeCounts[valIdx];
        }, 0);
      if (colSum < opts.minFieldTypeCount) {
        __improbableKeys.push(field);
        return null;
      }
      percentMin = percentMin > 1 ? percentMin / 100.0 : percentMin;
      const pctColSum = type => {
        return fieldTypeCounts[type] > opts.minFieldTypeCount
               && fieldTypeCounts[type] > (colSum * percentMin);
      };

      fieldTypeList = fieldTypeList.filter(pctColSum);
      // console.warn(`${field}: colSum`, colSum, fieldTypeList);
      if (fieldTypeList && fieldTypeList.length >= 1) {
        return {
          name: field,
          type: fieldTypeList[0],
          __lastType: fieldTypeList[fieldTypeList.length - 1],
          __fieldTypes: fieldTypeList,
          __sumTypes: colSum,
        };
      }
      return {
        name: field,
        type: 'object',// default type
        undefined: true, // not determinable
        __sumTypes: colSum,
      }
    })
    .reduce((schema, fieldData) => {
      if (!fieldData) { return schema; }
      let {name} = fieldData;
      // console.warn(`REDUCING=${Object.keys(schema).length} Name=${name}`);
      schema[name] = fieldData;
      return schema;
    }, {__improbableKeys});
}

export function _condenseSchemaLevel(schema) {
  const opts = Object.assign({}, _default.opts, this || {});
  // cleanup the schema
  Object.keys(schema.sumTypes)
  .map(k => {
    //TODO: Add null counter to prevent false-positive enum detections
    let setToEnumLimit = (schema._fieldCount * 0.5);// 5% default
    if (['number', 'string'].indexOf(schema[k].type) > -1 && schema.sumTypes[k].size <= setToEnumLimit) {
      schema[k] = JS_ENUM_TYPE;
      schema[k].enum = Array.from(schema.sumTypes[k]).sort();
      // console.log(`Enumified ${k}=${schema[k].enum.join(', ')}`);
    } else {
      schema.sumTypes[k] = null;//Array.from(schema.sumTypes[k]).sort().join(', '); //temp for debugging// set to null or remove later
    }
  })
  return schema;
}

export function _checkUpgradeType({currentType, currentValue, key, schema}) {
  const opts = Object.assign({}, _default.opts, this || {});
  var typeGuess = guessType(currentValue, currentType);
  // console.log(`Guessed type for ${key}=${typeGuess.type}`);
  if (currentValue && typeof(currentValue) === 'object' && Object.keys(currentValue).length >= 2) {
    return _evaluateSchemaLevel(schema[key], currentValue)
  }
  if (typeGuess === JS_DEFAULT_TYPE && TYPE_COMPLEXITY_ORDER.indexOf(typeGuess) >= TYPE_COMPLEXITY_ORDER.indexOf(currentType)) {
    return typeGuess;
  } else {
    return currentType;
  }
}
