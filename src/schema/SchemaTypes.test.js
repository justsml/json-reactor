require('babel-register');

const test   = require('tape');
const {guessType} = require('./SchemaTypes');

test('guessType type checker', t => {
  t.equal(guessType(new Set()).___type, 'object')
  t.equal(guessType(Array(1)).___type, 'array')
  t.equal(guessType('[]').___type, 'string')
  t.equal(guessType('["test"]').___type, 'string')
  t.equal(guessType({}).___type, 'object')
  t.equal(guessType('{}').___type, 'string')
  t.equal(guessType('{"foo":"bar"}').___type, 'string')
  t.equal(guessType('true').___type, 'boolean')
  t.equal(guessType('YES').___type, 'boolean')
  t.end();
})
