// import {JS_TYPES, SIMPLE_TYPES} from '../schema/SchemaTypes'
import React, { Component, PropTypes } from 'react'
import SortableTree, { toggleExpandedForAll } from 'react-sortable-tree'
// import './style.less'
import styles from './style.less'
import {EditField, getArrayIndex3D, getTreeValue} from './EditField'
import {FieldRenderer} from './renderer/FieldRenderer'

export class Tree extends Component {
  constructor(props) {
    super(props)
    this.updateTreeData = this.updateTreeData.bind(this)
    this.expandAll      = this.expandAll.bind(this)
    this.collapseAll    = this.collapseAll.bind(this)
    this.applySchema    = this.applySchema.bind(this)
    this.onChange       = this.onChange.bind(this)
    this.saveChanges    = this.saveChanges.bind(this)


    // const renderDepthTitle = ({ path }) => `Depth: ${path.length}`

    this.state = {
      searchString:     '',
      searchFocusIndex: 0,
      searchFoundCount: null,
      draggable:        props.draggable || false,
      treeData:         this.applySchema(props.data),
    }
  }

  componentWillMount() {
  }

  saveChanges(e) {
    const {nativeEvent, target, type} = e
    console.warn('Tree.saveChanges', type, '\nthis', this, '\nnativeEvent', nativeEvent, '\ntarget', target)

  }

  onChange(e) {
    const {nativeEvent, target, node, path, value, key} = e
    const {treeData} = this.state
    let fld = getArrayIndex3D(treeData, path)
    fld.value = value
    console.warn('onChange.JSON:', e)
    const jsonText = document.querySelector('textarea.json-result')
    if (jsonText) {
      jsonText.value = JSON.stringify(getTreeValue(treeData), null, 2)
    }
    this.setState({treeData})
  }

  applySchema(treeData) {
    // const isEditableType     = fld => (fld.key || fld.title) && JS_TYPES.some(t => fld.type === t.type)
    // const isSubtitleTemplate = fld => typeof fld.subtitle === 'function'
    // const isTitleString      = fld => typeof fld.type === 'string'
    const getChildren        = fld => fld && fld.children && fld.children.length >= 1 ? fld.children : false

    const fixTreeLevel = (treeData, path = []) => {
      console.warn('fixTreeLevel', treeData)
      return treeData.map((fld, idx) => {
        const c = getChildren(fld)
        const p = [].slice.call(path)
        p.push(idx)
        fld.path = p// fld.path || p
        fld.subtitle = EditField(Object.assign({onChange: this.onChange}, fld))
        // || fld.subtitle || <span></span>
        console.warn('fixTreeLevel.subtitle', p, 'TreeLevel.children', c)
        if (c) {
          fld.children = fixTreeLevel(c, p)
        }
        return fld
      })
    }
    treeData = fixTreeLevel(treeData)
    return treeData
  }

  updateTreeData(treeData) {
    console.warn('updateTreeData', treeData)
    this.setState({ treeData })
  }

  expand(expanded) {
    this.setState({
      treeData: toggleExpandedForAll({
        treeData: this.state.treeData,
        expanded,
      }),
    })
  }

  expandAll() {
    this.expand(true)
  }

  collapseAll() {
    this.expand(false)
  }

  render() {
    let {
      treeData,
      searchString,
      searchFocusIndex,
      searchFoundCount,
    } = this.state
    // treeData = this.applySchema(treeData)

    // const alertNodeInfo = ({
    //   node,
    //   path,
    //   treeIndex,
    //   // lowerSiblingCounts: _lowerSiblingCounts,
    // }) => {
    //   const objectString = Object.keys(node)
    //     .map(k => (k === 'children' ? 'children: Array' : `${k}: '${node[k]}'`))
    //     .join(`,\n   `)

    //   alert( // eslint-disable-line no-alert
    //     `Info passed to the button generator:\n\n` +
    //     `node: {\n   ${objectString}\n},\n` +
    //     `path: ${path.join(', ')},\n` +
    //     `treeIndex: ${treeIndex}`
    //   )
    // }

    const selectPrevMatch = () => this.setState({
      searchFocusIndex: searchFocusIndex !== null ?
        ((searchFoundCount + searchFocusIndex - 1) % searchFoundCount) : searchFoundCount - 1,
    })

    const selectNextMatch = () => this.setState({
      searchFocusIndex: searchFocusIndex !== null ? ((searchFocusIndex + 1) % searchFoundCount) : 0,
    })

    return (
      <div className='jsonReactor jrTree'>
        <section className={styles['main-content']}>
          <div style={{ height: 650 }}>
            <button onClick={this.expandAll}>Expand All</button>
            <button onClick={this.collapseAll}>Collapse All</button>

            <fieldset style={{ display: 'inline-block' }}>
              <label htmlFor='find-box'>
                Search
                <input id={'find-box'} type={'text'} value={searchString}
                  onChange={event => this.setState({ searchString: event.target.value })} />
              </label>

              <button className='navLeft'
                type='button'
                disabled={!searchFoundCount}
                onClick={selectPrevMatch}>&lt;</button>

              <button className='navRight'
                type='submit'
                disabled={!searchFoundCount}
                onClick={selectNextMatch}>&gt;</button>

              <span>{searchFoundCount > 0 ? (searchFocusIndex + 1) : 0}</span>
              <span>{searchFoundCount || 0}</span>
            </fieldset>

            <SortableTree
              treeData={treeData}
              onChange={this.onChange}
              maxDepth={5}
              searchQuery={searchString}
              searchFocusOffset={searchFocusIndex}
              nodeContentRenderer={FieldRenderer}
              searchFinishCallback={matches =>
                this.setState({
                  searchFoundCount: matches.length,
                  searchFocusIndex: matches.length > 0 ? searchFocusIndex % matches.length : 0,
                })
              } />
          </div>
        </section>
      </div>
    )
  }
}

Tree.propTypes = {
  data:       PropTypes.array.isRequired,
  draggable:  PropTypes.bool,
}
