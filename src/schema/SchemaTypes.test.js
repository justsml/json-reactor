require('babel-register');

const test   = require('tape');
const {guessType} = require('./SchemaTypes');

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
