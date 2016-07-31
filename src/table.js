/* Object Factories */
import {config}       from './config'


/**
 * Table class - start here.
 *
 * ```js
 * let jsonEditor = Table(document.querySelector('#user-table'), {
 *   columns: [
 *     {title: 'Col #1', render: 'column_1', sort: 'column_1', cols: 3},
 *     {title: 'Col #2', render: 'column_2', sort: 'column_2', cols: 3},
 *   ],
 *   data: [
 *     {column_1: 'row 1 - col 1', column_2: 'row 1 - col 2'},
 *     {column_1: 'row 2 - col 1', column_2: 'row 2 - col 2'},
 *     {column_1: 'row 3 - col 1', column_2: 'row 3 - col 2'},
 *   ],
 *   plugins: null,
 *   debug: false
 * })
 * // Added a JsonEditor to `document.querySelector('#user-table')`
 * ```
 *
 * @param  {Element} el - Wrapper/root element
 * @param  {object} config - Define plugins in here, see tests/examples
 */
export function Table(el, config) {
  let table, css, hooks
  const ctx = { destroy } // Plain object `ctx` will be returned - use Object.assign to extend

  config = Config(config)
  Object.assign(ctx, config)

  function _resetLayout() {
    table = document.createElement('table')
    table.classList.add('json-editor')
    Object.assign(ctx, {table})
    el.innerHTML = '' // empty contents
    el.appendChild(table)
    return table
  }
  function _loadPlugins() {
    // run plugins - 'unpacks' their interfaces
    const plugins = config.plugins ? config.plugins.map(p => p(ctx)) : []
    // extend ctx with plugin.mixins methods
    plugins.map(p => {
      if (p.name) {
        ctx[p.name] = ctx[p.name] ? ctx[p.name] : {}
      } else {
        throw new Error('Plugin must have a `name` property')
      }

      if (typeof p.mixins === 'object') {
        Object.assign(ctx[p.name], p.mixins)
      }

      return p
    })
    // ;; // Add `hooks` && `plugins` to return object
    Object.assign(ctx, {plugins, 'hooks': PluginHooks({plugins})})
    hooks = ctx.hooks
  }

  function _render() {
    hooks.preRender(Object.assign({'elem': table}, ctx))

    renderTableHead(ctx)
      .then(thead => {
        table.appendChild(thead)
        console.trace('TABLE.postHeader', thead)
        hooks.postHeader({'elem': thead})
      })

    renderTableBody(ctx)
      .then(tbody => {
        table.appendChild(tbody)
        hooks.postRender({'elem': table})
      })
  }
  function _customEvents() {
    table.addEventListener(events.createSortedEvent.eventName, ({detail}) => {
      console.trace('TABLE.EVENTS.SORTED', detail)
    })

    table.addEventListener(events.createRenderEvent.eventName, e => {
      console.group('render')
      console.warn(`Table CustEvent Fired: ${events.createRenderEvent.eventName}`, e.detail)
      let {data} = e.detail;
      console.warn(`Table CustEvent render: BEFORE ${events.createRenderEvent.eventName}`, data)
      console.warn(`Table CustEvent render: CURRENT DATA ${events.createRenderEvent.eventName}`, ctx.data)
      if (data) {
        ctx.data = data;
      }
      console.warn(`Table CustEvent render: AFTER ${events.createRenderEvent.eventName}`, ctx.data)
      destroy()
      init()
      console.groupEnd('render')
    })
  }
  function init() {
    _injectStyles()
    _resetLayout()
    _customEvents()
    _loadPlugins()
    _render()
    return ctx
  }
  function destroy() {
    hooks.destroy(Object.assign({'elem': table}, ctx))
    if (css && css.parentNode)     { css.parentNode.removeChild(css) }
    if (table && table.parentNode) { table.parentNode.removeChild(table) }
    return ctx
  }

  return init()
}


