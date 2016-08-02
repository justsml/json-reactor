import {KeyList}      from './src/key-list'
import {FieldEditor}  from './src/field-editor'
import {Styles}       from './src/util'

export function create(elem, config) {
  if (!elem)   { throw new Error('JsonEditor instance requires 1st param `elem`') }
  if (!config) { throw new Error('JsonEditor instance requires 2nd param `config`') }
  
  Styles.add()

  const destroy = () => {
    const currForm = elem.querySelector('section.j-edit')
    if (currForm && typeof currForm.destroy === 'function') {
      currForm.destroy()
    }
    if (keyList && typeof keyList.destroy === 'function') {
      keyList.destroy()
    }
  }

  const _handleSelect = ({target, detail}) => {
    console.warn('SELECT', detail, target)
    const currForm = elem.querySelector('section.j-edit')
    const opts = {
      depth:  target.depth || null,
      elem:   target, 
      key:    target.key, 
      node:   target.node, 
      parent: target.parent, 
      path:   target.path, 
      type:   target.type || 'string', 
    }
    const editor = FieldEditor(opts)
    if (currForm && currForm.parentNode) {
      currForm.parentNode.removeChild(currForm)
    }
    elem.appendChild(editor)
  }
  const treeSection = document.createElement('section')
  const keyList = KeyList({data: config})
  keyList.addEventListener('selected', _handleSelect)
  treeSection.appendChild(keyList)
  treeSection.classList.add('j-side')
  elem.appendChild(treeSection)
  elem.classList.add('json-editor')
  return {destroy};
}
