import React, {PropTypes} from 'react';

EditField.propTypes = {
  key: PropTypes.string.isRequired,
  node: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  path: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  subtype: PropTypes.string,
  value: PropTypes.object,
};

/**
 * getArrayIndex3D finds a value by index.
 * Supports nested arrays via array of array indcies
 */
export const getArrayIndex3D = (treeData, path = []) => {
  const originalPath = [].slice.call(path);
  return path.reduce((data, i) => {
    if (!data) { throw new Error('Failed to get array index: ' + i + '\n originalPath: ' + JSON.stringify(originalPath)); }
    data = Array.isArray(data) ? data : data && data.children ? data.children : data;
    if (i && i < data.length) {
      return data[i];
    }
    return data[0];
    // return data[0] && data[0].children ? data[0].children : data[0];
  }, treeData);
}

/**
 * getTreeValue
 * Extracts the `value` keys out to render the final JSON result
 */
export const getTreeValue = (arr, mode = 'object') => {
  arr = Array.isArray(arr) ? arr : arr ? Array.from(arr) : null;
  return arr && arr.reduce((tree, fld, i) => {
    if (!fld) { throw new Error('Invalid field: ' + i + '\n array: ' + JSON.stringify(arr)); }
    const currTypeMode = ['object', 'array'].includes(fld.type) ? fld.type : undefined;
    const v = fld.value ? fld.value :
      fld.children && fld.children.length >= 1 ? getTreeValue(fld.children, currTypeMode) : null;
    if (tree && tree.push) {
      tree.push(v);
    } else {
      tree[fld.key] = v;
    }
    return tree;
  }, mode === 'object' ? {} : []);
}

export function EditField({ key, title, type, subtype, value, onChange, path, inputState }) {
  // const {addingType, deleteConfirm} = inputState;
  let el;
  const fld = arguments[0];
  const isEditableJson = () => !fld.children && ['array', 'object'].includes(type)
  // var value         = node[key]
  // define helpers, e.g. build field, transition state (aka convert)
  // const basicTypes = ['string', 'number', 'boolean']
  // const getTypeName = (x) => Array.isArray(x) ? 'array' : typeof x
  // console.error('EditField Failed ', 'type=', type, 'node=', node);
  const isNothing = x => typeof x === 'undefined' || x === null;
  const isCsvType = () => type === 'array' && (!subtype || ['string', 'number'].includes(subtype))
  const _onChange = e => {
    var {target, nativeEvent} = e;
    var value;
    if (!target) {
      target = nativeEvent.target;
    }
    value = target ? target.value : null;
    if (isCsvType()) {
      //  minLength={fld.min ? fld.min : -Infinity} maxLength={fld.max ? fld.max : Infinity}
      value = value ? value.trim().split(/\r?\n/) : [];
    }
    onChange({path, key, value, fld});
  }
  if (type === 'string' && fld.enum) {
    el = <select onChange={_onChange} title={title} className='field-value' name={key} value={value}>
      {fld.enum.map(opt => <option value={opt} key={opt}>{opt}</option>)}
    </select>
  } else if (isCsvType()) {
    el = <div className='csv-field'>
      <textarea onChange={_onChange} title={`1-line per item: ${title}`} rows='2' className='field-value' name={key} value={Array.isArray(value) ? value.join('\n') : JSON.stringify(value)}>
      </textarea>
      <span>Count: <b>{value ? value.length : 'n/a'}</b></span>
    </div>
  } else if (type === 'string') {
    el = <input type='text' onChange={_onChange} placeholder={title} title={title} className='field-value' name={key} value={value} minLength={fld.min ? fld.min : -Infinity} maxLength={fld.max ? fld.max : Infinity} />
  } else if (type === 'number') {
    el = <input type='number' onChange={_onChange} placeholder={title} title={title} className='field-value' name={key} value={value} min={fld.min ? fld.min : -Infinity} max={fld.max ? fld.max : Infinity} step={fld.step ? fld.step : 1} />
  } else if (type === 'boolean') {
    el = <input type='checkbox' onChange={_onChange} onClick={_onChange} placeholder={title} title={title} className='field-value' name={key} value='checked' />
  } else if (isEditableJson()) {
    el = <textarea onChange={_onChange} placeholder={title} title={title} className='field-value json-value' rows='7' value={JSON.stringify(value, null, 2)}></textarea>
  } else if (fld.children && fld.children.length >= 0) {
    return (<label># of keys: {fld.children.length}</label>)
  } else {
    return <em>{key}: {type} - unknown state</em>
  }
  // el.path = path;
  return (<label className={`field field-${isNothing(value) ? 'undefined' : 'defined'} field-${type} ${fld.error ? 'field-error' : ''}`}>
    <span>{fld.label || ''}</span>
    &#160;
    {el}
    {fld.error ? <div className='alert alert-danger'>{fld.error}</div> : ''}
  </label>)
}

  // const convert = ({ value, type }) => {
  //   const jsonPattern = /^\s*(\{|\[).*(\]|\})\s*$/g;
  //   const isJson = s => jsonPattern.test(s)
  //   const currType = getTypeName(value)
  //   switch (type) {
  //     case 'string':
  //       switch (currType) {
  //         case 'string':  return value
  //         case 'boolean': return value
  //         case 'array':   return typeof value[0] === 'string' ? value.join('\t') : JSON.stringify(value)
  //         case 'object':  return JSON.stringify(value)
  //         default:        return value
  //       }
  //     case 'number':
  //       switch (currType) {
  //         case 'string': return parseFloat(value)
  //         case 'boolean': return value ? 1 : 0
  //         case 'array': return -1
  //         case 'object': return -1
  //         default:       return -99
  //       }
  //     case 'boolean':
  //       return toBool(value)
  //     case 'array':
  //       switch (currType) {
  //         case 'string': return isJson(value) ? JSON.parse(value) : value.split(/\s+/)
  //         case 'boolean': return [value]
  //         case 'array': return value
  //         case 'object': return [value]
  //         default:       return []
  //       }
  //     case 'object':
  //       switch (currType) {
  //         case 'string': return isJson(value) ? JSON.parse(value) : {value}
  //         case 'boolean': return {value}
  //         case 'array': return {value}
  //         case 'object': return value
  //         default:       return {}
  //       }
  //   }
  //   console.error('Failed to Match Type: ', type, currType, value)
  //   return value;
  // }

  // const updateValueField = (v) => {
  //   const newType = fldType.value
  //   const newVal  = convert({ value: v || getCurrentValue(), type: newType })
  //   const newFld  = getValueFieldElem(newVal)
  //   removeAll(placeholder.children)
  //   console.error('placeholder empty?', placeholder.children)
  //   console.error('updateValueField', getValue(), getCurrentValue())
  //   placeholder.appendChild(newFld)
  //   return newFld
  // }

  // // define events, onTypeChanged, onSave, onCancel
  // const onTypeChanged = ({ target }) => {
  //   const newType = fldType.value
  //   const oldVal  = getCurrentValue()
  //   removeAll(placeholder.children)
  //   console.warn(`Type Changed!! OriginalType=${type} Val=${oldVal} `, arguments)
  //   updateValueField()
  // }

  // const getCurrentValue = () => {
  //   let fields  = placeholder.querySelectorAll('input, textarea')

  //   let results = Array.from(fields).map((f, i, a) => {
  //     var v = f.value;
  //     let jsType = f.getAttribute('jsType')
  //     try {
  //       if (f.classList.contains('json-value')) {
  //         return JSON.parse(v)
  //       }
  //     } catch (e) { console.error('FAILED TO CONVERT JSON:', e) }
  //     console.warn('getCurrentValue:', jsType, v)
  //     v = convert({value: v, type: jsType})
  //     console.warn('V:', v)
  //     return v
  //   })

  //   return type !== 'array' ? results[0] : results
  // }

  // const onSave = (e) => {
  //   // const { target, detail, preventDefault } = e;
  //   const oldName = key,
  //         newName = fldName.value,
  //         oldType = type,
  //         newType = fldType.value,
  //         oldValue = value,
  //         newValue = getValue()
  //   const nameChanged  = oldName  !== newName,
  //         typeChanged  = oldType  !== newType,
  //         valueChanged = oldValue !== newValue
  //   const changed = nameChanged || typeChanged || valueChanged

  //   e.preventDefault()

  //   if (changed) {
  //     console.warn(`CHANGED! PATH=${path} Value=`, getCurrentValue())
  //     console.warn(`Saving changes... (${oldName}:${oldValue} => ${newName}:${newValue}) nameChanged=${nameChanged} typeChanged=${typeChanged} valueChanged=${valueChanged} \nArgs=\n`, arguments)
  //     if (nameChanged) {
  //       node[newName] = newValue
  //       delete node[oldName]
  //     } else if (valueChanged) {
  //       node[key] = getCurrentValue()
  //     }
  //   } else {
  //     console.warn(`Nothing changed`)
  //   }
  // }

  // const onCancel = ({ target }) => {
  //   console.warn('Cancelled!!', arguments)
  // }

  // const setup = () => {
  //   // Setup events
  //   form.querySelector('button[type="submit"]').addEventListener('click', onSave)
  //   form.querySelector('button[type="reset"]').addEventListener('click', onCancel)
  //   fldType.addEventListener('change', onTypeChanged)
  //   placeholder.parentNode.appendChild(getArrayButtons({index: -1}))
  // }

  // const destroy = () => {
  //   form.querySelector('button[type="submit"]').removeEventListener('click', onSave)
  //   form.querySelector('button[type="reset"]').removeEventListener('click', onCancel)
  //   fldType.removeEventListener('change', onTypeChanged)
  //   removeNode(form)
  // }

  // setup()

  // // init UI
  // updateValueField(value)

  // return Object.assign(form, { destroy })

