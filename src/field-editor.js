import {createElem, closest, removeAll} from './util'
  
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

  const fldName   = form.querySelector('input[name="name"]')
  const fldType   = form.querySelector('select[name="type"]')
  const fldValue  = form.querySelector('.field-value')

// set values w/ defaults
  if () {

  }

// define events, onTypeChanged, onSave, onCancel
  const getValueFieldElem = () => {
    if (fldType.value === 'string') {
      return createElem(``)
    }
  }

}
