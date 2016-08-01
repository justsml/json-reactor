# Json Editor

> JSON Object Editor
**Pure Javascript.**
*That uncut sh*t.*

## Vitals

**Size** (gzipped/minified): **4Kb**/12Kb


## Summary



## Commands

```sh
npm install
npm run build

```

#### Example


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
  editor = JsonEditor.create(document.querySelector('.results-view'), config)
}

```

