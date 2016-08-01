import {createElem, closest, removeAll, toBool} from './util'
  
export function FieldEditor({key, node, parent, path, elem, type = 'string', depth = 0}) {

  const form = createElem(`<section class="j-edit" depth="${depth}" path="${Array.isArray(path) ? path.join('') : path }">
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
        <div class="valueEditorPlaceholder">placeholder for real values</div>
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
  const getValueFld = () => form.querySelector('.field-value')
  const fldName     = form.querySelector('input[name="name"]')
  const fldType     = form.querySelector('select[name="type"]')
  const placehold   = form.querySelector('.valueEditorPlaceholder')
// initialize value tracker (for local 'type' changes)
  prevVals[type]    = value

// set value w/ default
  fldType.value     = type

// define helpers, e.g. build field, transition state
  const getValueFieldElem = () => {
    let _value = getValue()
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
          case 'string': return parseFloat(value)
          case 'string': return parseFloat(value)
          case 'string': return parseFloat(value)
          default:       return value
        }
        break
      case 'boolean':
        return toBool(value)
            
    // } else if (type === 'number') {
    // } else if (type === 'array') {
    // } else if (type === 'object') {
    }
  }

// define events, onTypeChanged, onSave, onCancel
  const onTypeChanged = ({target}) => {
    console.warn('Saved!!', arguments)
    const newType = target.value
    
  }
  const onSave = ({target, detail, preventDefault}) => {
    console.warn('Saved!!', arguments)
    preventDefault()

  }
  const onCancel = ({target}) => {
    console.warn('Cancelled!!', arguments)
  }

  form.querySelector('button[type="submit"]').addEventListener('click', onSave)
  form.querySelector('button[type="reset"]').addEventListener('click', onCancel)
  fldType.addEventListener('change', onTypeChanged)
  
  return form
}
