import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import {UNITS} from '../../constants';

import styles from './Temperature.css';

const Temperature = ({selectedUnits, temp, className}) => {
  const classes = classnames(styles.temp, className);
  const roundedTemp = Math.round(temp);
  const tempUnit = UNITS[selectedUnits].temp;

  return (
    <span className={classes}>
      {roundedTemp}<span className={styles.tempUnit}>{tempUnit}</span>
    </span>
  );
};

Temperature.propTypes = {
  selectedUnits: PropTypes.oneOf(Object.keys(UNITS)).isRequired,
  temp: PropTypes.number.isRequired,
  className: PropTypes.string,
};

export default Temperature;
