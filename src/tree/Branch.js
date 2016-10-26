const _ = require('lodash');

const hasKeyVal = (k, v) => v && k;

/**
 * Tree 'Branch' Node.
 * Initially for https://github.com/fritz-c/react-sortable-tree
 *
 * @param {any} {
 *   // react-sortable-tree Keys:
 *   title,
 *   children,
 *   subtitle,
 *   expanded,
 *   // key, type & value - Schema Vals
 *   key,
 *   type,
 *   value,
 * }
 * @returns
 */
function Branch({
  // react-sortable-tree Keys:
  title,
  headline,
  children,
  subtitle,
  expanded,
  selected,
  // key, type & value - Schema Vals
  key,
  type,
  value = undefined,  // set value to undefined if not set
  min = undefined, max = undefined,
  pattern = undefined
}) {
  let opts = arguments[0] || {};
  title = title || headline || key;

  if (!key)   { throw new Error(`Tree.Branch(${JSON.stringify(opts)}) Param Required: key`); }
  if (!type)  { throw new Error(`Tree.Branch(${JSON.stringify(opts)}) Param Required: type`); }
  if (!title) { throw new Error(`Tree.Branch(${JSON.stringify(opts)}) Param Required: title`); }

  return _.pickBy({
    title,
    children,
    subtitle,
    expanded,
    selected,
    metadata: _.pickBy({
      key: key || title,
      type,
      value,
      enum: opts.enum,
      min, max, pattern,
      default: opts.default
    }, hasKeyVal)
  }, hasKeyVal);
}

/**
 *
 * @example
 *
 *  const ConfigSchema = {
 *    appName: {type: 'string', title: 'App Name'},
 *    flags: {
 *      payments: {
 *        provider: {type: 'string', enum: ['stripe', 'paypal', 'authorize.net']},
 *        enabled:  {type: 'boolean', default: true}
 *      }
 *    }
 *  }
 *  const ConfigTree = [
 *    {key: 'appName', type: 'string', title: 'App Name'},
 *    {key: 'flags', type: 'object', title: 'Flags',
 *      children: [
 *        {key: 'payments', type: 'object', title: 'Payments',
 *          children: [
 *            {key: 'provider', title: 'provider', type: 'string',  enum: ['stripe', 'paypal', 'authorize.net']},
 *            {key: 'enabled',  title: 'enabled',  type: 'boolean', default: true}
 *          ]
 *        }
 *      ]
 *    }
 *  ]
 *
 * @param {any} schema
 * @returns
 */
const schemaToTree = (schema) => {
  return Object.keys(schema)
  .map(key => {
    let fld  = schema[key];
    let type = fld && isValidField(fld) ? fld.type : null;
    type = type === null && typeof fld === 'object' ? 'object' : 'null';
    let children = fld && typeof fld === 'object' && !['object'].includes(fld.type)
      ? schemaToTree(fld) : undefined;
    return Branch(Object.assign({key, children, type}, fld))
  })
}

const isValidField = ({key, type, title}) => key && type && title;

export {Branch,
  schemaToTree,
  isValidField,
};
