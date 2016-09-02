import {KeyList}      from './src/key-list'
import {FieldEditor}  from './src/field-editor'
import {Styles}       from './src/util'

export function create(elem, config) {
  if (!elem)   { throw new Error('JsonEditor instance requires 1st param `elem`') }
  if (!config) { throw new Error('JsonEditor instance requires 2nd param `config`') }

  const destroy = () => {
    Styles.remove()

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
    if (currForm && currForm.parentNode) {
      currForm.parentNode.removeChild(currForm)
    }
    elem.appendChild(FieldEditor({
      depth:  target.depth || 1,
      elem:   target,
      key:    target.key,
      node:   target.node,
      parent: target.parent || target.parentNode,
      path:   target.path,
      type:   target.type || 'string',
    }))
  }

  const treeSection = document.createElement('section')
  const keyList = KeyList({data: config})

  keyList.addEventListener('selected', _handleSelect)
  treeSection.appendChild(keyList)
  treeSection.classList.add('j-side')
  elem.appendChild(treeSection)
  elem.classList.add('json-editor')

  Styles.add()

  return {destroy};
}
