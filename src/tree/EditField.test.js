require('babel-register');
const test = require('tape');
const {getArrayIndex3D} = require('./EditField');

const testData = [ 0, [ 1, 2, [ 3, 4, [ 5 ] ] ] ];
const testTree = [
  {key: 'appName', type: 'string', title: 'App Name'},
  {key: 'flags', type: 'object', title: 'Flags',
    children: [
      {key: 'payments', type: 'object', title: 'Payments',
        children: [
          {key: 'provider', title: 'provider', type: 'string',  enum: ['stripe', 'paypal', 'authorize.net']},
          {key: 'enabled',  title: 'enabled',  type: 'boolean', default: true}
        ]
      }
    ]
  }
];

test('getArrayIndex3D can access value at array index in 4-D', t => {
  t.equals(getArrayIndex3D(testData, [0]), 0);
  t.equals(getArrayIndex3D(testData, [1, 0]), 1);
  t.equals(getArrayIndex3D(testData, [1, 2, 0]), 3);
  t.equals(getArrayIndex3D(testData, [1, 2, 1]), 4);
  t.equals(getArrayIndex3D(testData, [1, 2, 2, 0]), 5);
  t.end();
})


test('getArrayIndex3D can access tree heirarchy w/ `children` array', t => {
  t.equals(getArrayIndex3D(testTree, [0]).key, 'appName');
  t.equals(getArrayIndex3D(testTree, [1, 0]).key, 'payments');
  t.equals(getArrayIndex3D(testTree, [1, 0, 0]).key, 'provider');
  t.equals(getArrayIndex3D(testTree, [1, 0]).children.length, 2);
  t.end();
})

