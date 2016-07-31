import {config}              from './config'
import {createElem, closest, removeAll, Styles} from './util'

export function KeyList({data, parent, depth = 0}) {
  const list = createElem('<ul class="j-keys" depth="' + depth + '"></ul>')
  // console.warn('list', list)
  Styles.add()
  Object
    .keys(data)
    .forEach((key, idx, arr) => {
      const valueType   = Array.isArray(data[key]) ? 'array' : typeof data[key]
      const icon        = valueType === 'object' ? 
                      'plus' : valueType === 'array' ?
                      'list' : valueType === 'string' ? 
                      'text' : 'default'
      const expandable  = valueType === 'object' ? 'j-expandable' : ''
      const row = createElem(['<li class="j-closed ', expandable, ' j-icon-', icon, ' j-type-', valueType, '" key="', key, '">', key, '</li>'].join(''))
      console.warn('row', row, valueType, icon)
      list.appendChild(row)
    })
  list.addEventListener('click', event => {
    const li = closest(event.target, 'li')
    console.warn('_clicked', li)
    if (li) {
      event.preventDefault()
      const key       = li.getAttribute('key')
      const nextData  = data[key]
      // console.warn('_clicked.on', key, li)
      if (!li.querySelector('ul')) {
        console.warn('_clicked - needs list', li)
        // do recursion, on demand
        li.appendChild(KeyList({data: nextData, parent: li, depth: depth + 1}))
        return li.classList.toggle('j-closed')
      }
      // toggle click state
      li.classList.toggle('j-closed')
      console.warn('_clicked.toggled', key, li)
    }
  })
  return list
}
