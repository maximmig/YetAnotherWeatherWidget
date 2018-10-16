import React from 'react';
import PropTypes from 'prop-types';

import styles from './WindDirection.css';

const WindDirection = ({deg}) => {
  if (deg == null) {
    return null;
  }

  const windDirectionStyles = {transform: `rotate(${deg}deg)`};

  return (
    <span className={styles.windDirection} style={windDirectionStyles}>{'⇓'}</span>
  );
};

WindDirection.propTypes = {
  deg: PropTypes.number,
};

export default WindDirection;
