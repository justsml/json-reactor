import {config}                         from './config'
import {createElem, closest, removeAll} from './util'
import {arrows, ux}                     from './svg-icons'
import {CustomEvent as _CustomEvent}    from './custom-event'
// _CustomEvent should auto-attach the object to the window... if not make init function


export function KeyList({data, parent, path = [], depth = 0}) {
  const list = createElem('<ul class="j-keys" depth="' + depth + '"></ul>')
  Object
    .keys(data)
    .forEach((key, idx, arr) => {
      const valueType   = Array.isArray(data[key]) ? 'array' : typeof data[key]
      const icon        =            valueType === 'object' ? 
                      arrows.down  : valueType === 'array' ?
                      ux.list      : valueType === 'string' ? 
                      ux.edit      : ux.edit
      const expandable  = valueType === 'object' ? 'j-expandable' : ''
      let rowPath = [].slice.call(path).push(key + (valueType === 'array' ? '[' : valueType === 'object' ? '.' : ''))
      const row = createElem(['<li depth="', depth+1, '" class="j-closed ', expandable, ' j-type-', valueType, '" key="', key, '">', icon, ' ', key, '</li>'].join(''))
      Object.assign(row, {node: data, key: key, type: valueType, path: rowPath, value: data[key]})
      // console.warn('row', row, valueType, icon)
      list.appendChild(row)
    })
  const _clickHandler = (e) => {
    const {preventDefault, target} = e
    const li = closest(target, 'li', 2)
    if (li) {
      e.preventDefault()
      const {node, key, type, path, value} = li

      // const key       = li.getAttribute('key')
      const nextData  = node[key]
      console.warn('CANCELLED click for %s', key, li)
      const isObject = li.classList.contains('j-type-object')
      const isArray  = li.classList.contains('j-type-array')
      if (isObject || isArray) {
        // console.warn('_clicked.on', key, li)
        if (!li.querySelector('ul')) {
          // console.warn('_clicked - needs list', li)
          // do recursion, on demand
          li.appendChild(KeyList({data: nextData, parent: li, depth: depth + 1}))
          // li.classList.toggle('j-closed')
        }
        setTimeout(() => li.classList.toggle('j-closed'), 333)
        return null
      } else {
        const event_nodeSelected = new CustomEvent('selected', {
          bubbles: true, cancelable: false, 
          detail: {key: key, data: nextData, element: li, depth: depth + 1, isObject, isArray}
        })
        li.dispatchEvent(event_nodeSelected)
        console.warn('Fired Custom Event: ', event_nodeSelected)
      }

      console.info('_clicked.toggled', key, li)
    }
  }
  const destroy = () => {
    list.removeEventListener('click', _clickHandler)
  }
  if (!parent) {
    // add only at top of tree, maybe move out of here up a 'layer'
    list.addEventListener('click', _clickHandler)
  }
  return Object.assign(list, {destroy})
}
