import React, { PropTypes } from 'react';
import { getIEVersion } from 'react-sortable-tree/utils/browser-utils';
import baseStyles from './base.scss';
import { isDescendant } from 'react-sortable-tree/utils/tree-data-utils';

let styles = baseStyles;
// Add extra classes in browsers that don't support flex
if (getIEVersion < 10) {
    styles = {
        ...baseStyles,
        row:         `${styles.row} ${styles.row_NoFlex}`,
        rowContents: `${styles.rowContents} ${styles.rowContents_NoFlex}`,
        rowLabel:    `${styles.rowLabel} ${styles.rowLabel_NoFlex}`,
        rowToolbar:  `${styles.rowToolbar} ${styles.rowToolbar_NoFlex}`,
    };
}

const BaseRenderer = ({
    canDrag,
    buttonFactory,
    rowFactory,
    scaffoldBlockPxWidth,
    toggleChildrenVisibility,
    connectDragPreview,
    connectDragSource,
    isDragging,
    isOver,
    canDrop,
    node,
    draggedNode,
    path,
    treeIndex,
    isSearchMatch,
    isSearchFocus,
    buttons,
    className,
    style = {},
}) => {
    let handle;
    if (typeof node.children === 'function' && node.expanded) {
        // Show a loading symbol on the handle when the children are expanded
        //  and yet still defined by a function (a callback to fetch the children)
        handle = (
            <div className={styles.loadingHandle}>
                <div className={styles.loadingCircle}>
                    <div className={styles.loadingCirclePoint} />
                    <div className={styles.loadingCirclePoint} />
                    <div className={styles.loadingCirclePoint} />
                    <div className={styles.loadingCirclePoint} />
                    <div className={styles.loadingCirclePoint} />
                    <div className={styles.loadingCirclePoint} />
                    <div className={styles.loadingCirclePoint} />
                    <div className={styles.loadingCirclePoint} />
                    <div className={styles.loadingCirclePoint} />
                    <div className={styles.loadingCirclePoint} />
                    <div className={styles.loadingCirclePoint} />
                    <div className={styles.loadingCirclePoint} />
                </div>
            </div>
        );
    } else {
        // Show the handle used to initiate a drag-and-drop
        handle = connectDragSource((
            <div className={styles.moveHandle} />
        ), { dropEffect: 'copy' });
    }

    const isDraggedDescendant = draggedNode && isDescendant(draggedNode, node);

    return (
        <div style={{ height: '100%' }}>
            {toggleChildrenVisibility && node.children && node.children.length > 0 && (
                <div>
                    <div
                        className={node.expanded ? styles.collapseButton : styles.expandButton}
                        style={{ left: -0.5 * scaffoldBlockPxWidth }}
                        onClick={() => toggleChildrenVisibility({node, path, treeIndex})}
                    />

                    {node.expanded && !isDragging &&
                        <div
                            style={{ width: scaffoldBlockPxWidth }}
                            className={styles.lineChildren}
                        />
                    }
                </div>
            )}

            <div className={styles.rowWrapper}>
                {/* Set the row preview to be used during drag and drop */}
                {connectDragPreview(
                    <div
                        className={styles.row +
                            (isDragging && isOver ? ` ${styles.rowLandingPad}` : '') +
                            (isDragging && !isOver && canDrop ? ` ${styles.rowCancelPad}` : '') +
                            (isSearchMatch ? ` ${styles.rowSearchMatch}` : '') +
                            (isSearchFocus ? ` ${styles.rowSearchFocus}` : '') +
                            (className ? ` ${className}` : '')
                        }
                        style={{
                            opacity: isDraggedDescendant ? 0.5 : 1,
                            ...style,
                        }}
                    >
                        {canDrag === true || canDrag({node, path, treeIndex}) ? handle : ''}
                        <div className={styles.rowContents}>
                            {rowFactory({styles, node, path, treeIndex})}
                            {buttonFactory({styles, buttons})}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

BaseRenderer.propTypes = {
    node:          PropTypes.object.isRequired,
    path:          PropTypes.arrayOf(PropTypes.oneOfType([ PropTypes.string, PropTypes.number ])).isRequired,
    treeIndex:     PropTypes.number.isRequired,
    isSearchMatch: PropTypes.bool,
    isSearchFocus: PropTypes.bool,

    scaffoldBlockPxWidth:     PropTypes.number.isRequired,
    toggleChildrenVisibility: PropTypes.func,
    buttons:                  PropTypes.arrayOf(PropTypes.node),
    className:                PropTypes.string,
    style:                    PropTypes.object,

    // Drag and drop API functions
    // Drag source
    connectDragPreview: PropTypes.func.isRequired,
    connectDragSource:  PropTypes.func.isRequired,
    isDragging:         PropTypes.bool.isRequired,
    draggedNode:        PropTypes.object,
    // Drop target
    isOver:  PropTypes.bool.isRequired,
    canDrop: PropTypes.bool.isRequired,

    canDrag:        PropTypes.oneOfType([ PropTypes.func, PropTypes.bool ]).isRequired,
    rowFactory:     PropTypes.func,
    buttonFactory:  PropTypes.func,

};

export default BaseRenderer;
