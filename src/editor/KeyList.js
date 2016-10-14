/*eslint no-unused-vars: 1*/
// import { config }                      from '../config'
import { createElem, closest,
          removeAll, removeNode }         from '../Util'
import { arrows, ux }                     from '../SvgIcons'
import { CustomEvent as _CustomEvent }    from '../CustomEvent'
// _CustomEvent should auto-attach the object to the window... if not make init function

export function KeyList({ data, parent, path = [], depth = 0, canAdd = true }) {
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
      const row = createElem(['<li depth="', depth + 1, '" class="j-closed ', expandable, ' j-type-', valueType, '" key="', key, '">', icon, ' ', key, '</li>'].join(''))
      Object.assign(row, { node: data, key: key, type: valueType, path: rowPath, value: data[key] })
      // console.warn('row', row, valueType, icon)
      list.appendChild(row)
      // check for last row
      if ((arr.length - 1) === idx) {
        if (canAdd) {
          const addElem = createElem(`<li class='j-create j-type-string' key='[key name]'></li>`)
          Object.assign(addElem, {node: data, key: '[key]', type: 'string', path: rowPath, value: '', innerHTML: ' [new] '})
          list.appendChild(addElem)
        }

      }
    })


  const _clickHandler = (e) => {
    const {target} = e
    const li = closest(target, 'li', 2)
    if (li) {
      e.preventDefault()
      const { node, key, type, path, value } = li
      const nextData  = node[key]
      const isObject = li.classList.contains('j-type-object')
      const isArray  = li.classList.contains('j-type-array')
      console.warn('CANCELLED click for %s', key, 'isObject=', isObject, 'isArray=', isArray, 'elem=', li)
      if (isObject) {
        if (!li.querySelector('ul')) {
          // do recursion, on demand
          li.appendChild(KeyList({ data: nextData, parent: li, depth: depth + 1 }))
        }

        setTimeout(() => li.classList.toggle('j-closed'), 333)
        return null
      } else {
        const eventNodeSelected = new CustomEvent('selected', {
          bubbles: true, cancelable: false,
          detail: { key: key, data: nextData, element: li, depth: depth + 1, isObject, isArray },
        })
        li.dispatchEvent(eventNodeSelected)
        console.warn('Fired Custom Event: ', eventNodeSelected)
      }

      console.info('_clicked.toggled', key, li)
    }
  }

  const destroy = () => {
    list.removeEventListener('click', _clickHandler)
    removeNode(list.parentNode ? list.parentNode : list)
  }

  if (!parent) {
    // add only at top of tree, maybe move out of here up a 'layer'
    list.addEventListener('click', _clickHandler)
  }

  return Object.assign(list, { destroy })
}
