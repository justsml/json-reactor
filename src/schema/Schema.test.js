require('babel-register');

const test   = require('tape');
const _      = require('lodash');
const {buildSchema}               = require('./Schema');
const {_findEnumTypes}            = require('./Schema');
const {_filterTypesByProbability} = require('./Schema');

const sampleIncomplete = [
  {id:1,name:'John',email:undefined,active:'y',signup:'2016-12-31T07:00:00.000Z',cancelled:'2017-01-01T07:00:00.000Z'},
]
const sample1 = fixColArrayData(require('../test/sample-data-1.json'));
const sampleUsers  = require('../test/sample-users.json');

// console.warn('sample1.signup: ', _.map(_.take(sample1, 10), 'signup'));
test('schema: auto-detect from sample array #1', t => {
  const schema = buildSchema(sampleIncomplete);
  let count = Object.keys(schema)
    .filter(key => key.indexOf('__') === -1)
    .length;
  t.equals(count, 0);
  t.end();
})

test('schema: auto-detect from sample array #2', t => {
  const schema = buildSchema(sample1);

  console.warn('SCHEMAAAAAH:', schema)
  t.equals(schema.balance.type, 'number');
  t.equals(schema.latLon.type, 'string');
  t.equals(schema.notes.type, 'string');
  t.equals(schema.externalId.type, 'string');
  t.equals(schema.pin.type, 'number');
  t.equals(schema.company.type, 'string');
  t.equals(schema.signup.type, 'date');
  t.end();
})


test('schema: auto-detect from sample array #2', t => {
  const schema = buildSchema(sampleUsers);

  console.warn('SCHEMAAAAAH:', schema)
  t.true(schema.name, 'has name');
  // t.equals(schema.latLon.type, 'string');
  // t.equals(schema.notes.type, 'string');
  // t.equals(schema.externalId.type, 'string');
  // t.equals(schema.pin.type, 'number');
  // t.equals(schema.company.type, 'string');
  // t.equals(schema.signup.type, 'date');
  t.end();
})

test('schema: enum detection', t => {
  const uniques = { id: { '1': 1, '2': 1, '3': 1, '4': 1, '5': 1, '6': 1, '7': 1, '8': 1, '9': 1 },
    name: { John: 1, null: 4, Bob: 1, Alice: 1, Eve: 1, Bond: 1 },
    email: { undefined: 1, 'a@a.com': 8 },
    active: { y: 5, n: 1, null: 1, yes: 1, YES: 1 },
    status: { active: 500, disabled: 99, pending: 777, expired: 981, ERronEOus_values: 2 },
    signup: { '2016-12-31T07:00:00.000Z': 9 },
    cancelled: { '2017-01-01T07:00:00.000Z': 1, null: 6 },
    nullVal: { null: 1 },
    undefVal: { undefined: 1 }
  };
  let enums = _findEnumTypes({uniques});
  t.equals(enums.length, 1);
  t.assert(enums[0].enum, 'has a status enum');
  t.equals(enums[0].enum.length, 4);
  t.equal(enums[0].name, 'status');
  t.end();
})

test('schema: _filterTypesByProbability', t => {
  const sumTypes = {
    id: { number: 90 },
    name: { boolean: 1, null: 4, string: 400 },
    email: { null: 1, string: 80 },
    active: { boolean: 88, null: 1 },
    signup: { date: 99 },
    cancelled: { date: 1, null: 69 },
    nullVal: { null: 1 },
    undefVal: { null: 1 } }
  const fields = _filterTypesByProbability({sumTypes}, 90);

  // console.warn('\n_filterTypesByProbability', fields, '\n');
  t.equals(fields.id.type, 'number');
  t.equals(fields.email.type, 'string');
  t.equals(fields.active.type, 'boolean');
  t.equals(fields.signup.type, 'date');
  t.end();
})




function fixColArrayData({cols, data}) {
  return data.map(arr => _.zipObject(cols, arr));
}


// export function (data) {
//   const schemaLevels = data.reduce(_evaluateSchemaLevel, {'_uniques': {}, '_totalRecords': 0});
//   return schemaLevels;
//   // return _condenseSchemaLevel(schemaLevels);
// }

// export function _evaluateSchemaLevel(schema, obj) {
//   schema = schema || {};
//   schema._uniques = schema._uniques || {};
//   schema._totalRecords = schema._totalRecords === undefined ? 0 : schema._totalRecords;
//   Object.keys(obj)
//   .forEach(key => {
//     schema._uniques[key] = schema._uniques[key] || new Set();
//     schema._uniques[key].add(obj[key]);
//     schema._totalRecords += 1;
//     schema[key] = _checkUpgradeType({schema, currentType: schema[key], currentValue: obj[key], key: key});
//   })
//   return schema;
// }

// export function _condenseSchemaLevel(schema) {
//   // cleanup the schema
//   Object.keys(schema._uniques)
//   .map(k => {
//     //TODO: Add null counter to prevent false-positive enum detections
//     let setToEnumLimit = (schema._totalRecords * 0.5);// 5% default
//     if (['number', 'string'].indexOf(schema[k].type) > -1 && schema._uniques[k].size <= setToEnumLimit) {
//       schema[k] = JS_ENUM_TYPE;
//       schema[k].enum = Array.from(schema._uniques[k]).sort();
//       console.log(`Enumified ${k}=${schema[k].enum.join(', ')}`);
//     } else {
//       schema._uniques[k] = null;//Array.from(schema._uniques[k]).sort().join(', '); //temp for debugging// set to null or remove later
//     }
//   })
//   return schema;
// }

// export function _checkUpgradeType({currentType, currentValue, key, schema}) {
//   var typeGuess = guessType({currentType, currentValue});
//   // console.log(`Guessed type for ${key}=${typeGuess.type}`);
//   if (typeof(currentValue) === 'object' && currentValue.toString() === '[object Object]' && Object.keys(currentValue).length >= 2) {
//     return _evaluateSchemaLevel(schema[key], currentValue)
//   }
//   if (TYPE_COMPLEXITY_ORDER.indexOf(typeGuess) >= TYPE_COMPLEXITY_ORDER.indexOf(currentType)) {
//     return typeGuess;
//   } else {
//     return currentType;
//   }

// }

