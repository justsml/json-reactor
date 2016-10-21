import React, { PropTypes } from 'react';

ButtonFactory.propTypes = {
    styles:     PropTypes.object.isRequired,
    buttons:    PropTypes.arrayOf(PropTypes.node),
}
export function ButtonFactory({styles, buttons}) {
  return <div className={styles.rowToolbar}>
      {buttons && buttons.map((btn, index) => (
          <div key={index} className={styles.toolbarButton}>
              {btn}
          </div>
      ))}
  </div>
}

