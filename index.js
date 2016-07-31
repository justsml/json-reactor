import {KeyList}    from './src/key-list'

export function create(elem, config) {
  if (!elem)   { throw new Error('JsonEditor instance requires 1st param `elem`') }
  if (!config) { throw new Error('JsonEditor instance requires 2nd param `config`') }
  console.error('KeyList', KeyList)

  let keyList = KeyList({data: config})
  elem.appendChild(keyList)
  return keyList;
}
