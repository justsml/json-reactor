import {createElem, closest, removeAll, removeNode, toBool} from './util'
  
export function FieldEditor({key, node, parent, path, elem, type = 'string', depth = 0}) {

  const form = createElem(`<section class="j-edit j-side" key="${key}" type="${type}" depth="${depth}" path="${Array.isArray(path) ? path.join('::') : path }">
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
  const getValueFld = () => form.querySelector('.field-value') || {value: false}
  const fldName     = form.querySelector('input[name="name"]')
  const fldType     = form.querySelector('select[name="type"]')
  const placeholder = form.querySelector('.valueEditorPlaceholder')
// initialize value tracker (for local 'type' changes)
  prevVals[type]    = value

// set value w/ default
  fldType.value     = type

// define helpers, e.g. build field, transition state (aka convert)
  const getValueFieldElem = (_value = getValue()) => {
    console.trace('   \tGenField(', key, ', ', _value, ')')
    if (fldType.value === 'string') {
      return createElem(`<input type='text' class='field-value' name='field-value' value='${_value}' />`)
    } else if (fldType.value === 'number') {
      return createElem(`<input type='number' class='field-value' name='field-value' value='${_value}' />`)
    } else if (fldType.value === 'boolean') {
      return createElem(`<input type='checkbox' class='field-value' name='field-value' value='checked'${_value ? " checked" : ""}' />`)
    } else {
      return createElem(`<span class="has-error"><input type='text' class='field-value' name='field-value' value='${_value}' /></span>`)
    }
  }

  const convert = ({value, type}) => {
    const currType = Array.isArray(value) ? 'array' : typeof value
    switch (type) {
      case 'string': return value.toString()
      // default: return value.toString()
      case 'number':
        switch (currType) {
          case 'string': return parseFloat(value)
          case 'boolean': return value ? 1 : 0
          case 'array': return -1
          case 'object': return -1
          default:       return -99
        }
        break
      case 'boolean':
        return toBool(value)
            
    // } else if (type === 'number') {
    // } else if (type === 'array') {
    // } else if (type === 'object') {
    }
  }
  const updateValueField = (v) => {
    const newType = fldType.value
    const newVal  = convert({value: v || getValue(), type: newType})
    const newFld  = getValueFieldElem(newVal)
    removeAll(placeholder.childNodes)
    placeholder.appendChild(newFld)
    return newFld
  }

// define events, onTypeChanged, onSave, onCancel
  const onTypeChanged = ({target}) => {
    console.warn('Type Changed!!', arguments)
    const newType = fldType.value
    const oldVal  = getValue()
    updateValueField()
  }
  const onSave = (e) => {
    const {target, detail, preventDefault} = e;
    console.warn('Saved!!', arguments)
    preventDefault()

  }
  const onCancel = ({target}) => {
    console.warn('Cancelled!!', arguments)

  }

  const setup = () => {
    // Setup events
    form.querySelector('button[type="submit"]').addEventListener('click', onSave)
    form.querySelector('button[type="reset"]').addEventListener('click', onCancel)
    fldType.addEventListener('change', onTypeChanged)
  }

  const destroy = () => {
    form.querySelector('button[type="submit"]').removeEventListener('click', onSave)
    form.querySelector('button[type="reset"]').removeEventListener('click', onCancel)
    fldType.removeEventListener('change', onTypeChanged)

  }

  setup()
  
  // init UI
  updateValueField(value)

  return Object.assign(form, {destroy})
}
