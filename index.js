import React                from 'react';
import {render}             from 'react-dom';

// import {Styles}             from './src/Util'
// // Old:
// import {KeyList}            from './src/editor/KeyList'
// import {FieldEditor}        from './src/editor/FieldEditor'
// import {KeyValueEditor}     from './src/editor/KeyValueEditor'
//New
// import {DataTreeFactory, mountTree} from './src/tree/DataTree'
import {Tree}                 from './src/tree'
import {Branch, schemaToTree} from './src/tree/Branch';
import {buildSchema, Schema, buildSimpleSchema}  from './src/schema/Schema'

export {Tree,
  // exposed for testing debuggin
  Schema, buildSchema, Branch, schemaToTree, buildSimpleSchema};

export const loadTreeApp = ({data, draggable}) => {
  return render(
    <Tree data={data} draggable={draggable} />,
    document.getElementById('app'))
}

// export function create(elem, config) {
//   if (!elem)   { throw new Error('JsonReactor instance requires 1st param `elem`') }
//   if (!config) { throw new Error('JsonReactor instance requires 2nd param `config`') }

//   const destroy = () => {
//     Styles.remove()

//     const currForm = elem.querySelector('section.j-edit')
//     if (currForm && typeof currForm.destroy === 'function') {
//       currForm.destroy()
//     }
//     if (keyList && typeof keyList.destroy === 'function') {
//       keyList.destroy()
//     }
//   }

//   const _handleSelect = ({target, detail}) => {
//     console.warn('SELECT', detail, target)
//     const currForm = elem.querySelector('section.j-edit')
//     if (currForm && currForm.parentNode) {
//       currForm.parentNode.removeChild(currForm)
//     }
//     let fieldCreator = config.schema ? KeyValueEditor : FieldEditor;
//     elem.appendChild(fieldCreator({
//       depth:  target.depth || 1,
//       elem:   target,
//       key:    target.key,
//       node:   target.node,
//       parent: target.parent || target.parentNode,
//       path:   target.path,
//       type:   target.type || 'string',
//     }))
//   }

//   const treeSection = document.createElement('section')
//   const keyList = KeyList({data: config})

//   keyList.addEventListener('selected', _handleSelect)
//   treeSection.appendChild(keyList)
//   treeSection.classList.add('j-side')
//   elem.appendChild(treeSection)
//   elem.classList.add('json-reactor')

//   Styles.add()

//   return {destroy};
// }
