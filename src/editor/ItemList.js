import React, {PropTypes} from 'react'

export const ItemList = React.createClass({
  getInitialState() {
    return {
      items: this.props.items || [],
      onChange: this.props.onChange || (() => null),
    }
  },

  setItemValue(index, value) {
    this.setState((state) => {
      const {items} = state
      if (items.length <= index) {
        items[index] = value
      }
      return Object.assign({}, state, {items});
    })
  },

  startEditMode(index = -1, value) {
    this.setState((state, props) => {
      return Object.assign({}, state, {editIndex: index, editValue: value});
    })
  },

  render() {
    const getEditModeView = (item, idx) => {
      const v = item;// && item.value ? item.value : item;
      return <div className='edit-mode'>
        <input type='text' value={v} onChange={e => {
          this.setState(state => {
            const {value} = e.target  || {}
            const {items} = state     || {}
            if (idx < items.length) items.splice(idx, 1, [value])
            return Object.assign({}, state, {items})
          })
        }} />
        <button className='item-edit save' onClick={e => {
          this.setState(state => Object.assign({}, state, {editIndex: null, editValue: null}))
        }}>Save</button>
        <button className='item-edit cancel' onClick={e => {
          this.setState(state => {
            const {items, editValue} = state || {}
            if (idx < items.length) items.splice(idx, 1, [editValue])
            return Object.assign({}, state, {items, editIndex: null, editValue: null})
          })
        }}>Cancel</button>
      </div>
    }
    const getItem = (item, idx) => {
      const v = item;// && item.value ? item.value : item;
      return <li>
        {v}
        <button onClick={() => this.startEditMode(idx, item)}>Edit</button>
        <button onClick={() => this.setState(state => {
          const {items} = state
          const deleted = items.splice(idx, 1)
          if (deleted !== v) { throw new Error(`Deleted Wrong Item items[${idx}]!==${v} --- Deleted: ${deleted}`) }
          return Object.assign({}, state, {items})
        })}>Delete</button>
      </li>
    }

    const {items, editIndex, editValue} = this.state || {}
    if (editIndex !== null && editIndex >= 0) {
      return getEditModeView(editValue, editIndex);
    }
    return (<ul className='item-list'>
      {items
        ? items.map(getItem)
        : <li className='no-items'>No items</li>}
    </ul>)
  }

})

ItemList.propTypes = {
  items:    PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
}

