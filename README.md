# Json Editor

[![Build Status](https://travis-ci.org/justsml/json-editor.svg?branch=master)](https://travis-ci.org/justsml/json-editor)
[![GitHub stars](https://img.shields.io/github/stars/justsml/json-editor.svg)](https://github.com/justsml/json-editor/stargazers)
[![Github Releases](https://img.shields.io/github/downloads/justsml/json-editor/latest/total.svg?maxAge=1592000)]()

> JSON Object Editor
**Pure Javascript.**
*That uncut sh*t.*

## Vitals


**Size** (gzipped/minified): **100Kb**/200Kb
**Full Lib w/ Schema and UI bits**

## Summary

Edit JSON using a friendly Web GUI!
Freeform or schema-bound modes.

## Commands

```sh
npm install
npm run build

```

### Example

#### See `spec/index.html`

Short example:

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

