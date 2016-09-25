const test   = require('tape');
const {isDate, isNumber, isBoolean, guessType} = require('./schema-types');

test('fuzzy date checker', t => {
  //Valid Dates
  t.assert(isDate('2000-12-31T07:00:00.000Z'))
  t.assert(isDate('12/31/2000'))
  t.assert(isDate('2000-12-31'))
  t.assert(isDate('12-31-2000'))
  t.assert(isDate('Dec 31, 2000'))
  t.assert(isDate('December 31, 2000'))
  // Bad Dates
  t.false(isDate('Hi 12-31 Hi! 07:00:00.000'))
  t.false(isDate('20:12'))
  t.false(isDate('31/31/31'))
  t.end();
})

test('fuzzy number checker', t => {
  t.assert(isNumber('999,999,999,000.99'))
  t.assert(isNumber('10000'))
  t.assert(isNumber(10000))
  t.assert(isNumber(0.0))
  t.assert(isNumber(0))
  t.false(isNumber('2000-12-31'))
  t.false(isNumber({}))
  t.false(isNumber([]))
  t.false(isNumber(Infinity))
  t.false(isNumber('Infinity'))
  t.end();
})

test('fuzzy boolean checker', t => {
  //Valid Booleans
  t.assert(isBoolean(true))
  t.assert(isBoolean(false))
  t.assert(isBoolean('yes'))
  t.assert(isBoolean('y'))
  t.assert(isBoolean('true'))
  t.assert(isBoolean('false'))
  t.assert(isBoolean('1'))
  t.assert(isBoolean('0'))
  t.assert(isBoolean(1))
  t.assert(isBoolean(0))
  t.false(isBoolean([]));
  t.false(isBoolean(2));
  t.false(isBoolean({}));
  t.false(isBoolean(new Set()));
  t.end();
})

