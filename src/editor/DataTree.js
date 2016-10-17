import React from 'react';
import SortableTree, { toggleExpandedForAll } from 'react-sortable-tree';

export const DataTreeFactory = ({ schema, maxDepth = 0, canAdd = true }) => {
  const DataTree = React.createClass({

    // updateTreeData(treeData) {
    //   this.setState({ treeData });
    // },

    // expand(expanded) {
    //   this.setState({
    //     treeData: toggleExpandedForAll({
    //       treeData: this.state.treeData,
    //       expanded,
    //     }),
    //   });
    // },

    // expandAll() {
    //   this.expand(true);
    // },

    // collapseAll() {
    //   this.expand(false);
    // },

    // render() {
    //   const projectName = 'React Sortable Tree';
    //   const authorName = 'Chris Fritz';
    //   const authorUrl = 'https://github.com/fritz-c';
    //   const githubUrl = 'https://github.com/fritz-c/react-sortable-tree';

    //   const {
    //     treeData,
    //     searchString,
    //     searchFocusIndex,
    //     searchFoundCount,
    //   } = this.state;

    //   const alertNodeInfo = ({
    //     node,
    //     path,
    //     treeIndex,
    //     lowerSiblingCounts: _lowerSiblingCounts,
    //   }) => {
    //     const objectString = Object.keys(node)
    //       .map(k => (k === 'children' ? 'children: Array' : `${k}: '${node[k]}'`))
    //       .join(`,\n   `);

    //     alert( // eslint-disable-line no-alert
    //       `Info passed to the button generator:\n\n` +
    //       `node: {\n   ${objectString}\n},\n` +
    //       `path: ${path.join(', ')},\n` +
    //       `treeIndex: ${treeIndex}`
    //     );
    //   };

    //   const selectPrevMatch = () => this.setState({
    //     searchFocusIndex: searchFocusIndex !== null ?
    //       ((searchFoundCount + searchFocusIndex - 1) % searchFoundCount) :
    //       searchFoundCount - 1,
    //   });

    //   const selectNextMatch = () => this.setState({
    //     searchFocusIndex: searchFocusIndex !== null ?
    //       ((searchFocusIndex + 1) % searchFoundCount) :
    //       0,
    //   });

    //   return (
    //     <div>
    //       <section className={styles['page-header']}>
    //         <h1 className={styles['project-name']}>{projectName}</h1>

    //         <h2 className={styles['project-tagline']}>
    //           Drag-and-drop sortable representation of hierarchical data
    //                 </h2>
    //       </section>

    //       <section className={styles['main-content']}>
    //         <h3>Demo</h3>

    //         <div style={{ height: 450 }}>
    //           <button onClick={this.expandAll}>
    //             Expand All
    //                     </button>

    //           <button onClick={this.collapseAll}>
    //             Collapse All
    //                     </button>

    //           &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    //                     <form
    //             style={{ display: 'inline-block' }}
    //             onSubmit={(event) => {
    //               event.preventDefault();
    //             } }
    //             >
    //             <label htmlFor="find-box">
    //               Search:&nbsp;

    //                             <input
    //                 id="find-box"
    //                 type="text"
    //                 value={searchString}
    //                 onChange={event => this.setState({ searchString: event.target.value })}
    //                 />
    //             </label>

    //             <button
    //               type="button"
    //               disabled={!searchFoundCount}
    //               onClick={selectPrevMatch}
    //               >&lt;</button>

    //             <button
    //               type="submit"
    //               disabled={!searchFoundCount}
    //               onClick={selectNextMatch}
    //               >&gt;</button>

    //             <span>
    //               &nbsp;
    //                             {searchFoundCount > 0 ? (searchFocusIndex + 1) : 0}
    //               &nbsp;/&nbsp;
    //                             {searchFoundCount || 0}
    //             </span>
    //           </form>

    //           <SortableTree
    //             treeData={treeData}
    //             onChange={this.updateTreeData}
    //             maxDepth={5}
    //             searchQuery={searchString}
    //             searchFocusOffset={searchFocusIndex}
    //             searchFinishCallback={matches =>
    //               this.setState({
    //                 searchFoundCount: matches.length,
    //                 searchFocusIndex: matches.length > 0 ? searchFocusIndex % matches.length : 0,
    //               })
    //             }
    //             generateNodeProps={rowInfo => ({
    //               buttons: [
    //                 <button
    //                   style={{
    //                     verticalAlign: 'middle',
    //                   }}
    //                   onClick={() => alertNodeInfo(rowInfo)}
    //                   >ℹ</button>,
    //               ],
    //             })}
    //             />
    //         </div>

    //         <h3>Features</h3>
    //         <ul>
    //           <li>Works right out of the box, but is highly customizable</li>
    //         </ul>

    //         <a href={githubUrl}>Documentation on Github</a>

    //         <footer className={styles['site-footer']}>
    //           <span className={styles['site-footer-owner']}>
    //             <a href={githubUrl}>{projectName}</a> is maintained by <a href={authorUrl}>{authorName}</a>.
    //                     </span>

    //           <span className={styles['site-footer-credits']}>
    //             This page was generated by <a href="https://pages.github.com">GitHub Pages</a> using the <a href="https://github.com/jasonlong/cayman-theme">Cayman theme</a> by <a href="https://twitter.com/jasonlong">Jason Long</a>.
    //                     </span>
    //         </footer>
    //       </section>

    //       <a href={githubUrl}>
    //         GitHub
    //       </a>
    //     </div>
    //   );
    // },

    getInitialState: function _getInitialState() {
      return {
        searchString: '',
        searchFocusIndex: 0,
        searchFoundCount: null,
        treeData: _schemaToTree(schema),
        editObjectJson: this.props.editObjectJson !== false,
        enforceSchema: this.props.enforceSchema || false,
      }
    },
    render() {
      return (<SortableTree
        treeData={this.state.treeData}
        onChange={treeData => this.setState({ treeData })}
        />);
    }

  });
  return DataTree;
};

export const _schemaToTree = (schema) => {
  return Object.keys(schema)
  .map(key => {
    let typeDef = schema[key];

    // 'type': 'object'
  })
}
