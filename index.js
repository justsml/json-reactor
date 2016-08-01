import {KeyList}      from './src/key-list'
import {FieldEditor}  from './src/field-editor'
import {Styles}       from './src/util'



export function create(elem, config) {
  if (!elem)   { throw new Error('JsonEditor instance requires 1st param `elem`') }
  if (!config) { throw new Error('JsonEditor instance requires 2nd param `config`') }
  Styles.add()

  const _handleSelect = ({target, detail}) => {
    console.warn('SELECT', detail, target)
    
  }

  let keyList = KeyList({data: config})
  keyList.addEventListener('selected', _handleSelect)
  elem.appendChild(keyList)
  return keyList;
}
