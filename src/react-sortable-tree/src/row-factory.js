import React, { PropTypes } from 'react';

RowFactory.propTypes = {
    styles: PropTypes.object.isRequired,
    node:          PropTypes.object.isRequired,
    path:          PropTypes.arrayOf(PropTypes.oneOfType([ PropTypes.string, PropTypes.number ])).isRequired,
    treeIndex:     PropTypes.number.isRequired,
}
export function RowFactory({styles, node, path, treeIndex}) {
    return <div className={styles.rowLabel}>
        <span
            className={styles.rowTitle +
                (node.subtitle ? ` ${styles.rowTitleWithSubtitle}` : '')
            }
        >
            {typeof node.title === 'function' ?
                node.title({node, path, treeIndex }) :
                node.title
            }
        </span>

        {node.subtitle &&
            <span className={styles.rowSubtitle}>
                {typeof node.subtitle === 'function' ?
                    node.subtitle({node, path, treeIndex }) :
                    node.subtitle
                }
            </span>
        }
    </div>

}