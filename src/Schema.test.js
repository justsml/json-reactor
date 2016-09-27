require('babel-register');

const test   = require('tape');
const {buildSchema}               = require('./Schema');
const {_findEnumTypes}            = require('./Schema');
const {_filterTypesByProbability} = require('./Schema');

const sample1 = [
  {id:1,name:'John',email:undefined,active:'y',signup:'2016-12-31T07:00:00.000Z',cancelled:'2017-01-01T07:00:00.000Z'},
]
const sample2 = [
  {id:1,name:'John',email:undefined,active:'y',signup:'2016-12-31T07:00:00.000Z',cancelled:'2017-01-01T07:00:00.000Z'},
  {id:2,name: null, email:'a@a.com',active:'n',signup:'2016-12-31T07:00:00.000Z',cancelled:null},
  {id:3,name: null, email:'a@a.com',active:null,signup:'2016-12-31T07:00:00.000Z',cancelled:null},
  {id:4,name: null, email:'a@a.com',active:'yes',signup:'2016-12-31T07:00:00.000Z',cancelled:null},
  {id:5,name: null, email:'a@a.com',active:'YES',signup:'2016-12-31T07:00:00.000Z',cancelled:null},
  {id:6,name:'Bob', email:'a@a.com',active:'y',signup:'2016-12-31T07:00:00.000Z',cancelled:null},
  {id:7,name:'Alice', email:'a@a.com',active:'y',signup:'2016-12-31T07:00:00.000Z',cancelled:null},
  {id:8,name:'Eve', email:'a@a.com',active:'y',signup:'2016-12-31T07:00:00.000Z'},
  {id:9,name:'Bond',email:'a@a.com',active:'y',signup:'2016-12-31T07:00:00.000Z',nullVal:null,undefVal:undefined},
]

test('schema: auto-detect from sample array #1', t => {
  const schema = buildSchema(sample1);
  console.warn('SCHEMAAAAAH:', schema);
  t.end();
})

test('schema: auto-detect from sample array #2', t => {
  const schema = buildSchema(sample2);
  console.warn('SCHEMAAAAAH:', schema)
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
    id: { number: 9 },
    name: { boolean: 1, null: 4, string: 4 },
    email: { null: 1, string: 8 },
    active: { boolean: 8, null: 1 },
    signup: { date: 9 },
    cancelled: { date: 1, null: 6 },
    nullVal: { null: 1 },
    undefVal: { null: 1 } }
  const fields = _filterTypesByProbability({sumTypes}, 90);

  console.warn('\n_filterTypesByProbability', fields, '\n');
  t.equals(fields.id.type, 'number');
  t.equals(fields.email.type, 'string');

  t.end();
})
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

