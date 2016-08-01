import {KeyList}      from './src/key-list'
import {Styles}       from './util'

export function create(elem, config) {
  if (!elem)   { throw new Error('JsonEditor instance requires 1st param `elem`') }
  if (!config) { throw new Error('JsonEditor instance requires 2nd param `config`') }
  console.error('KeyList', KeyList)

  Styles.add()

  let keyList = KeyList({data: config})
  elem.appendChild(keyList)
  return keyList;
}
