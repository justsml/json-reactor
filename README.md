# Json Reactor

Edit any JSON object - schema-bound or free-form!!!

[![Build Status](https://travis-ci.org/justsml/json-reactor.svg?branch=master)](https://travis-ci.org/justsml/json-reactor)
[![GitHub stars](https://img.shields.io/github/stars/justsml/json-reactor.svg)](https://github.com/justsml/json-reactor/stargazers)
[![Github Releases](https://img.shields.io/github/downloads/justsml/json-reactor/latest/total.svg?maxAge=1592000)]()

> JSON Object Editor
**Pure Javascript.**
*That uncut sh*t.*

## Preview

![image](https://cloud.githubusercontent.com/assets/397632/19552223/2e0ff820-966c-11e6-91e4-73028c95ab07.png)

**Size** (gzipped+minified): **~100-150kB** (plus ReactJS v15+ ~40kB)

**Full Lib w/ Schema and UI bits**

## Summary

Edit JSON using a friendly Web GUI!

## Commands

```sh
npm install
npm run build
npm start
```

### Example

## See `spec/index.html`


Demo/example:

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
  editor = JsonReactor.create(document.querySelector('.results-view'), config)
}

```

