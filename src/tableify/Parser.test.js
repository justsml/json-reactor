require('babel-register');
const csv1 = `_id|name|email|signup|addr1|city|zip|latLon|parentId|notes|balance|externalId|pin|company
D531134C-E460-66A0-6FEA-CC210C923CCF|Sara|dictum@Praesent.net|2009-07-29T14:30:43-07:00|4083 Conubia St.|San Pietro al Tanagro|2233|-51.71799, 49.09599|F3434036-FCF0-52DE-55BD-80CEA48F9D96|non, cursus non, egestas a, dui. Cras pellentesque. Sed dictum. Proin eget odio. Aliquam vulputate ullamcorper|$18746.51|AZO37XVP2LV|2639|Sed Consulting
26FF5180-C5B2-D464-7DC5-48661DAC6E87|Ingrid|rutrum.urna.nec@musAenean.co.uk|2014-05-08T09:00:50-07:00|P.O. Box 195, 6244 Non, Av.|Bottrop|306265|89.8073, -10.26469|A80568BD-F1A1-A55C-4E37-158E92D89207|mollis lectus pede et risus. Quisque libero lacus, varius et, euismod et, commodo at, libero. Morbi|$16290.23|GMM92CVG9LH|3065|Non Ltd
16A99026-5567-240C-AB95-B4653E45E3D9|George|convallis.ante@Sedcongue.net|2010-10-24T07:18:57-07:00|3469 Ante Avenue|Bellevue|4150|34.87509, -80.69019|DC150CBF-9D06-1AE3-793C-DD5D14F20E67|sodales nisi magna sed dui. Fusce aliquam, enim nec tempus scelerisque, lorem ipsum sodales purus, in|$26613.80|ZBP39EJD9YT|1467|Facilisis Limited`;

const multilineCols = ['id', 'first', 'last', 'addr', 'job'];
const multilineRows = [{
  desc: '2-line csv, extra line-break',
  rows: `100,John,Doe,666 Heck Hwy,Cat Herder
101,John,Doe,123 Main St.
Denver CO 80123,Acme`.trim().split(/\n/),
  colDelimiter: ',',
  expects: {rows: 2}
}, {
  desc: 'Quoted 2-line csv, extra line-break',
  rows: `
"100","John","Doe","666 Heck Hwy, Kansas City","Cat Herder"
"101","John","Doe","123 Main St.
Denver, CO 80123","Acme"`.trim().split(/\n/),
  colDelimiter: '","',
  expects: {rows: 2}
}, {
  desc: '2 extra line-breaks',
  rows: `101,John,Doe,Attn: Delivery
123 Main St.
Denver CO 80123,Acme`.trim().split(/\n/),
  colDelimiter: ',',
  expects: {rows: 1}
}, {
  desc: '3 extra line-breaks',
  rows: `101,John,Doe,Attn: Delivery
123 Main St.

Denver CO 80123,Acme`.trim().split(/\n/),
  colDelimiter: ',',
  expects: {rows: 1}
}, {
  desc: 'Unclear field ending w/ + line break',
  rows: `"100","John","Doe","ATTN: Anon,
666 Heck Hwy, Kansas City","Cat Herder"
"101","John","Doe","123 Main St.
Denver, CO 80123","Acme"`.trim().split(/\n/),
  colDelimiter: '","',
  expects: {rows: 2}
}
];


const test   = require('tape');
const {Parser, _rowReducer} = require('./Parser');

test('test CSV parser on Pipe Delimited Data', t => {
  //Valid Dates
  const {rows, cols} = Parser({data: csv1})

  t.equals(cols.length, 14, 'has 14 cols')
  t.equals(rows.length, 3, 'has 3 rows')
  t.true(cols.includes('_id'), 'col _id required')
  t.true(cols.includes('name'), 'col name required')
  t.true(cols.includes('email'), 'col email required')
  t.true(cols.includes('signup'), 'col signup required')
  t.true(cols.includes('addr1'), 'col addr1 required')
  t.true(cols.includes('city'), 'col city required')
  t.end()
})


test('test CSV parser on Broken Data', t => {
  //Valid Dates
  const {rows, cols} = Parser({data: csv1})

  t.equals(cols.length, 14, 'has 14 cols')
  t.equals(rows.length, 3, 'has 3 rows')
  t.true(cols.includes('_id'), 'col _id required')
  t.true(cols.includes('name'), 'col name required')
  t.true(cols.includes('email'), 'col email required')
  t.true(cols.includes('signup'), 'col signup required')
  t.true(cols.includes('addr1'), 'col addr1 required')
  t.true(cols.includes('city'), 'col city required')
  t.end()
})

test('can parse line-breaks', t => {
  const colSize = multilineCols.length;
  multilineRows.forEach(({desc, rows, colDelimiter, expects}) => {
    t.test(desc, t => {
      let data = _rowReducer({rows, colDelimiter, cols: multilineCols});
      t.true(data[0].length === colSize, 'row must have expected columns');
      t.equal(data.length, expects.rows, `row len as expected? ${Array.isArray(data) ? JSON.stringify(data) : 'notArray'}`);
      t.end();
    });
  })
  t.end();
});
