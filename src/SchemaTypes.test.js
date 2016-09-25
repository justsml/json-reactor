require('babel-register');

const test   = require('tape');
const {isDate, isNumber, isBoolean, guessType} = require('./SchemaTypes');

test('fuzzy date checker', t => {
  //Valid Dates
  t.true(isDate('2000-12-31T07:00:00.000Z'))
  t.true(isDate('12/31/2000'))
  t.true(isDate('2000-12-31'))
  t.true(isDate('12-31-2000'))
  t.true(isDate('Dec 31, 2000'))
  t.true(isDate('December 31, 2000'))
  // Bad Dates
  t.false(isDate('Hi 12-31 Hi! 07:00:00.000'))
  t.false(isDate('20:12'))
  t.false(isDate('31/31/31'))
  t.end();
})

test('fuzzy number checker', t => {
  t.true(isNumber('999,999,999,000.99'))
  t.true(isNumber('10000'))
  t.true(isNumber(10000))
  t.true(isNumber(0.0))
  t.true(isNumber(0))
  t.false(isNumber('2000-12-31'))
  t.false(isNumber({}))
  t.false(isNumber([]))
  t.false(isNumber(Infinity))
  t.false(isNumber('Infinity'))
  t.end();
})

test('fuzzy boolean checker', t => {
  //Valid Booleans
  t.true(isBoolean(true))
  t.true(isBoolean(false))
  t.true(isBoolean('yes'))
  t.true(isBoolean('y'))
  t.true(isBoolean('true'))
  t.true(isBoolean('false'))
  t.true(isBoolean('1'))
  t.true(isBoolean('0'))
  t.true(isBoolean(1))
  t.true(isBoolean(0))
  t.false(isBoolean([]));
  t.false(isBoolean(2));
  t.false(isBoolean({}));
  t.false(isBoolean(new Set()));
  t.end();
})

test('guessType type checker', t => {
  t.equal(guessType(new Set()).type, 'object')
  t.equal(guessType(Array(1)).type, 'array')
  t.equal(guessType('[]').type, 'string')
  t.equal(guessType('["test"]').type, 'string')
  t.equal(guessType({}).type, 'object')
  t.equal(guessType('{}').type, 'string')
  t.equal(guessType('{"foo":"bar"}').type, 'string')
  t.equal(guessType('true').type, 'boolean')
  t.equal(guessType('YES').type, 'boolean')
  t.end();
})
