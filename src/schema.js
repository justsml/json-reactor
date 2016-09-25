const {guessType, JS_ENUM_TYPE, TYPE_COMPLEXITY_ORDER} = require('./schema-types');

export function buildSchema(data) {
  const schemaLevels = data.reduce(_evaluateSchemaLevel, {'_uniques': {}, '_totalRecords': 0});
  return schemaLevels;
  // return _condenseSchemaLevel(schemaLevels);
}

export function _evaluateSchemaLevel(schema, obj) {
  schema = schema || {};
  schema._uniques = schema._uniques || {};
  schema._totalRecords = schema._totalRecords === undefined ? 0 : schema._totalRecords;
  Object.keys(obj)
  .forEach(key => {
    schema._uniques[key] = schema._uniques[key] || new Set();
    schema._uniques[key].add(obj[key]);
    schema._totalRecords += 1;
    schema[key] = _checkUpgradeType({schema, currentType: schema[key], currentValue: obj[key], key: key});
  })
  return schema;
}

export function _condenseSchemaLevel(schema) {
  // cleanup the schema
  Object.keys(schema._uniques)
  .map(k => {
    //TODO: Add null counter to prevent false-positive enum detections
    let setToEnumLimit = (schema._totalRecords * 0.5);// 5% default
    if (['number', 'string'].indexOf(schema[k].type) > -1 && schema._uniques[k].size <= setToEnumLimit) {
      schema[k] = JS_ENUM_TYPE;
      schema[k].enum = Array.from(schema._uniques[k]).sort();
      console.log(`Enumified ${k}=${schema[k].enum.join(', ')}`);
    } else {
      schema._uniques[k] = null;//Array.from(schema._uniques[k]).sort().join(', '); //temp for debugging// set to null or remove later
    }
  })
  return schema;
}

export function _checkUpgradeType({currentType, currentValue, key, schema}) {
  var typeGuess = guessType({currentType, currentValue});
  // console.log(`Guessed type for ${key}=${typeGuess.type}`);
  if (typeof(currentValue) === 'object' && currentValue.toString() === '[object Object]' && Object.keys(currentValue).length >= 2) {
    return _evaluateSchemaLevel(schema[key], currentValue)
  }
  if (TYPE_COMPLEXITY_ORDER.indexOf(typeGuess) >= TYPE_COMPLEXITY_ORDER.indexOf(currentType)) {
    return typeGuess;
  } else {
    return currentType;
  }

}

