import {config}                         from './config'
import {createElem, closest, removeAll} from './util'
import {arrows, ux}                     from './svg-icons'
import {CustomEvent as _CustomEvent}    from './custom-event'
// _CustomEvent should auto-attach the object to the window... if not make init function


export function KeyList({data, parent, depth = 0}) {
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
      const row = createElem(['<li depth="', depth+1, '" class="j-closed ', expandable, ' j-type-', valueType, '" key="', key, '">', icon, ' ', key, '</li>'].join(''))
      console.warn('row', row, valueType, icon)
      list.appendChild(row)
    })
  list.addEventListener('click', event => {
    const li = closest(event.target, 'li', 2)
    if (li) {
      event.preventDefault()
      const key       = li.getAttribute('key')
      const nextData  = data[key]
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
  })
  return list
}
