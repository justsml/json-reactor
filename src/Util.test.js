require('babel-register');

const test   = require('tape');
const {isDate, toDate, isNumber, isBoolean} = require('./Util');

test('fuzzy date checker', t => {
  //Valid Dates
  t.true(isDate('2000-12-31T07:00:00.000Z'))
  t.true(isDate('12/31/2000'))
  t.true(isDate('2000-12-31'))
  t.true(isDate('12-31-2000'))
  t.true(isDate('Dec 31, 2000'))
  t.true(isDate('December 31, 2000'))
  t.true(isDate('2012-04-23T16:11:31-07:00'))
  // Bad Dates
  t.false(isDate('Hi 12-31 Hi! 07:00:00.000'))
  t.false(isDate('20:12'))
  t.false(isDate('31/31/31'))
  t.end();
})

test('fuzzy date checker', t => {
  //Valid Dates
  t.equal(toDate('2000-12-31T07:00:00.000Z').getFullYear(), 2000)
  t.equal(toDate('12/31/2000').getFullYear(), 2000)
  t.equal(toDate('2000-12-31').getFullYear(), 2000)
  t.equal(toDate('12-31-2000').getFullYear(), 2000)
  t.equal(toDate('Dec 31, 2000').getFullYear(), 2000)
  t.equal(toDate('December 31, 2000').getFullYear(), 2000)
  t.equal(toDate('2012-04-23T16:11:31-07:00').getFullYear(), 2012)
  t.not(toDate('Hi 12-31 Hi! 07:00:00.000'))
  t.not(toDate('20:12'))
  t.not(toDate('31/31/31'))
  t.end();
})

test('fuzzy number checker', t => {
  t.true(isNumber('999,999,999,000.99'))
  t.true(isNumber('$10000'))
  t.true(isNumber('$10,000.99'))
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
