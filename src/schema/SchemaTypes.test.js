// require('babel-register');

const test   = require('ava');
const {guessType} = require('./SchemaTypes');

test('guessType type checker', t => {
  t.is(guessType(new Set()).type, 'object')
  t.is(guessType(Array(1)).type, 'array')
  t.is(guessType('[]').type, 'string')
  t.is(guessType('["test"]').type, 'string')
  t.is(guessType({}).type, 'object')
  t.is(guessType('{}').type, 'string')
  t.is(guessType('{"foo":"bar"}').type, 'string')
  t.is(guessType('true').type, 'boolean')
  t.is(guessType('YES').type, 'boolean')
  t.is(guessType(30).type, 'number')
  t.end();
})
