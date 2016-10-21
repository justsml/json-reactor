//require('babel-register');

const test   = require('tape');
const {schemaToTree} = require('./Branch');

// const {schemaToTree} = require('./DataTree');

const ConfigSchema = {
  appName: {type: 'string', title: 'App Name'},
  flags: {
    payments: {
      provider: {type: 'string', enum: ['stripe', 'paypal', 'authorize.net']},
      enabled:  {type: 'boolean', default: true}
    }
  }
}
// const ConfigTree = [
//   {key: 'appName', type: 'string', title: 'App Name'},
//   {key: 'flags', type: 'object', title: 'Flags',
//     children: [
//       {key: 'payments', type: 'object', title: 'Payments',
//         children: [
//           {key: 'provider', title: 'provider', type: 'string',  enum: ['stripe', 'paypal', 'authorize.net']},
//           {key: 'enabled',  title: 'enabled',  type: 'boolean', default: true}
//         ]
//       }
//     ]
//   }
// ]


test('transform schema into tree "Branch" array', t => {
  const treeData = schemaToTree(ConfigSchema)
  // console.warn('treeData', JSON.stringify(treeData, null, 2));
  t.equals(treeData.length, 2)
  t.equals(treeData[0].metadata.key, 'appName')
  t.equals(treeData[1].metadata.key, 'flags')
  t.equals(treeData[1].children.length, 1)
  t.equals(treeData[1].children[0].children.length, 2)
  t.end()
})





