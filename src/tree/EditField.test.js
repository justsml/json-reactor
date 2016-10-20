require('babel-register');
const test = require('tape');
const {getFieldByPath} = require('./EditField');

const testData = [ 0, [ 1, 2, [ 3, 4, [ 5 ] ] ] ];

test('getFieldByPath can access value at array index 1-D', t => {
  t.equals(getFieldByPath(testData, [0]), 0);
  t.equals(getFieldByPath(testData, [1, 0]), 1);
  t.equals(getFieldByPath(testData, [1, 2, 0]), 3);
  t.equals(getFieldByPath(testData, [1, 2, 1]), 4);
  t.equals(getFieldByPath(testData, [1, 2, 2, 0]), 5);
  t.end();
})

