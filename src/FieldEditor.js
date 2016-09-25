/*eslint no-unused-vars: 1*/
import { createElem, closest, removeAll, removeNode, toBool } from './Util'

export function FieldEditor({ key, node, elem, parent = null, path = [], type = 'string', depth = 0 }) {

  const getArrayButtons = ({idx = -1}) => createElem(`<div class="j-array-buttons">
    <button action="add" idx="${idx}">+</button>
    <button action="remove" idx="${idx}">-</button>
  </div>`)
  const form = createElem(`<section class="j-edit j-side text-left" key="${key}" type="${type}" depth="${depth}" path="${Array.isArray(path) ? path.join('::') : path}">
    <form class="field-editor">
      <fieldset>
        <label>Name</label>
        <input type="text" name="name" class="name" value="${key}" />
      </fieldset>
      <fieldset>
        <label>Type</label>
        <select rows="1" name="type">
          <option value="string">text</option>
          <option value="boolean">yes/no</option>
          <option value="number">number</option>
          <option value="object">object/hash/map/key-val</option>
          <option value="array">list</option>
        </select>
      </fieldset>
      <fieldset>
        <label>Value</label>
        <div class="valueEditorPlaceholder"></div>
        <!-- Array buttons go here -->
      </fieldset>
      <fieldset>
        <button type="submit">Save</button>
        <button type="reset">Cancel</button>
        <strong></strong>
      </fieldset>
    </form>
  </section>`)

  var value         = node[key]
  const prevVals    = {}
  const getValue    = () => getValueFld().value
  const getValueFld = () => form.querySelector('.field-value') || { value: false }
  const getType     = () => fldType.value
  const fldName     = form.querySelector('input[name="name"]')
  const fldType     = form.querySelector('select[name="type"]')
  const placeholder = form.querySelector('.valueEditorPlaceholder')

  // initialize value tracker (for local 'type' changes)
  prevVals[type]    = value

  // set value w/ default
  fldType.value     = type

  // define helpers, e.g. build field, transition state (aka convert)
  const basicTypes = ['string', 'number', 'boolean']

  const getTypeName = (x) => Array.isArray(x) ? 'array' : typeof x

  const getValueFieldElem = (_value = getValue(), renderArrays = true) => {
    const typeName = getTypeName(_value)
    console.trace('   \tGenField(', key, ', ', _value, ')', typeName)

    if (typeName === 'string') {
      return createElem(`<input type='text' js-type='${typeName}' class='field-value' name='field-value' value='${_value}' />`)
    } else if (typeName === 'number') {
      return createElem(`<input type='number' js-type='${typeName}' class='field-value' name='field-value' value='${_value}' />`)
    } else if (typeName === 'boolean') {
      return createElem(`<input type='checkbox' js-type='${typeName}' class='field-value' name='field-value' value='checked'${_value ? ' checked' : ''}' />`)
    } else if (typeName === 'array' && renderArrays) {
      return _value.reduce((elem, val, idx) => {
        let li = createElem(`<li idx="${idx}">${typeof val === 'string' ? val+': ' : ''}</li>`)
        // see if type of array items is simple enough to show value/input field
        if (basicTypes.indexOf(getTypeName(val)) <= -1) {
          li.appendChild(createElem(`<textarea js-type='${typeName}' path='${idx}' class='field-value json-value' rows='7'>${JSON.stringify(val, null, 2)}</textarea>`))
        } else {
          li.appendChild(getValueFieldElem(val, false))
        }
        elem.appendChild(li)
        return elem
      }, document.createElement('ul'))
      // return createElem(`<input type='checkbox' js-type='${typeName}' class='field-value' name='field-value' value='checked'${_value ? ' checked' : ''}' />`)
    } else {
      return createElem(`<span class="has-error"><input type='text' js-type='${typeName}' class='field-value' name='field-value' value='${JSON.stringify(_value, null, 2)}' /></span>`)
    }
  }

  const convert = ({ value, type }) => {
    const jsonPattern = /^\s*(\{|\[).*(\]|\})\s*$/g;
    const isJson = s => jsonPattern.test(s)
    const currType = getTypeName(value)
    switch (type) {
      case 'string':
        switch (currType) {
          case 'string':  return value
          case 'boolean': return value
          case 'array':   return typeof value[0] === 'string' ? value.join('\t') : JSON.stringify(value)
          case 'object':  return JSON.stringify(value)
          default:        return value
        }
      case 'number':
        switch (currType) {
          case 'string': return parseFloat(value)
          case 'boolean': return value ? 1 : 0
          case 'array': return -1
          case 'object': return -1
          default:       return -99
        }
      case 'boolean':
        return toBool(value)
      case 'array':
        switch (currType) {
          case 'string': return isJson(value) ? JSON.parse(value) : value.split(/\s+/)
          case 'boolean': return [value]
          case 'array': return value
          case 'object': return [value]
          default:       return []
        }
      case 'object':
        switch (currType) {
          case 'string': return isJson(value) ? JSON.parse(value) : {value}
          case 'boolean': return {value}
          case 'array': return {value}
          case 'object': return value
          default:       return {}
        }
    }
    console.error('Failed to Match Type: ', type, currType, value)
    return value;
  }

  const updateValueField = (v) => {
    const newType = fldType.value
    const newVal  = convert({ value: v || getCurrentValue(), type: newType })
    const newFld  = getValueFieldElem(newVal)
    removeAll(placeholder.children)
    console.error('placeholder empty?', placeholder.children)
    console.error('updateValueField', getValue(), getCurrentValue())
    placeholder.appendChild(newFld)
    return newFld
  }

  // define events, onTypeChanged, onSave, onCancel
  const onTypeChanged = ({ target }) => {
    const newType = fldType.value
    const oldVal  = getCurrentValue()
    removeAll(placeholder.children)
    console.warn(`Type Changed!! OriginalType=${type} Val=${oldVal} `, arguments)
    updateValueField()
  }

  const getCurrentValue = () => {
    let fields  = placeholder.querySelectorAll('input, textarea')

    let results = Array.from(fields).map((f, i, a) => {
      var v = f.value;
      let jsType = f.getAttribute('js-type')
      try {
        if (f.classList.contains('json-value')) {
          return JSON.parse(v)
        }
      } catch (e) { console.error('FAILED TO CONVERT JSON:', e) }
      console.warn('getCurrentValue:', jsType, v)
      v = convert({value: v, type: jsType})
      console.warn('V:', v)
      return v
    })

    return type !== 'array' ? results[0] : results
  }

  const onSave = (e) => {
    // const { target, detail, preventDefault } = e;
    const oldName = key,
          newName = fldName.value,
          oldType = type,
          newType = fldType.value,
          oldValue = value,
          newValue = getValue()
    const nameChanged  = oldName  !== newName,
          typeChanged  = oldType  !== newType,
          valueChanged = oldValue !== newValue
    const changed = nameChanged || typeChanged || valueChanged

    e.preventDefault()

    if (changed) {
      console.warn(`CHANGED! PATH=${path} Value=`, getCurrentValue())
      console.warn(`Saving changes... (${oldName}:${oldValue} => ${newName}:${newValue}) nameChanged=${nameChanged} typeChanged=${typeChanged} valueChanged=${valueChanged} \nArgs=\n`, arguments)
      if (nameChanged) {
        node[newName] = newValue
        delete node[oldName]
      } else if (valueChanged) {
        node[key] = getCurrentValue()
      }
    } else {
      console.warn(`Nothing changed`)
    }
  }

  const onCancel = ({ target }) => {
    console.warn('Cancelled!!', arguments)
  }

  const setup = () => {
    // Setup events
    form.querySelector('button[type="submit"]').addEventListener('click', onSave)
    form.querySelector('button[type="reset"]').addEventListener('click', onCancel)
    fldType.addEventListener('change', onTypeChanged)
    placeholder.parentNode.appendChild(getArrayButtons({index: -1}))
  }

  const destroy = () => {
    form.querySelector('button[type="submit"]').removeEventListener('click', onSave)
    form.querySelector('button[type="reset"]').removeEventListener('click', onCancel)
    fldType.removeEventListener('change', onTypeChanged)
    removeNode(form)
  }

  setup()

  // init UI
  updateValueField(value)

  return Object.assign(form, { destroy })
}
