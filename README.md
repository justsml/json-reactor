# power-table

> Table Grid Component/Widget in ES6.
**Pure Javascript.**
*That uncut sh*t.*

## Vitals

**Size** (gzipped/minified): **4Kb**/12Kb


## Summary

1. Table Grid Component/Widget.
  * Scrollable
  * Sortable
  * Selectable
1. Universal Javascript
1. Universal Module - UMD/AMD/CJS
1. With core css embedded
1. Easy to style (more examples will be added)
1. Small, performant and extensible (see plugins folder)


## Commands

```sh
npm install
npm run build

```


## Examples



### Built in plugins

> 2 features are implemented with a plugin interface:

1. Selection
1. Sortable

#### Selection

Selection is enabled by setting the following option `{selection: true}`

Rows become selectable, add a checkbox column where to the columns like this:

```js
const config = {
  columns: [
    {selection: true, multiple: true, toggleAll: true, classes: ['text-center', 'tbl-xs-2']},
    {title: 'Name',   render: 'name', cols: 4}
  ]
}
```

#### Sortable

Sortable is enabled by setting the following option `{sortable: true}`

Rows become selectable, add a checkbox column where to the columns like this:

```js
const config = {
  columns: [
    {selection: true, multiple: true, toggleAll: true, classes: ['text-center', 'tbl-xs-2']},
    {title: 'Name',   render: 'name', cols: 4}
  ]
}
```







```js
const config = {
  selectable: true,
  sortable: true,
  defaultSort: 'name',
  columns: [
    {selection: true, multiple: true, toggleAll: true, classes: ['text-center', 'tbl-xs-2']},
    {title: 'Name',   render: 'name', cols: 4},
    {title: 'Number', render: 'number'},
    {title: 'Region', render: 'region'},
    {title: 'Type', sort: 'type', render: ({row}) => row.type && row.type.toLowerCase() || 'N/A'},
  ],
  data: Promise.resolve(data)
};

function init() {
  powerTable = PowerTable.Table(document.querySelector('.results-view'), config)
}

```

