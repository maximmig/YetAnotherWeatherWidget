import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import {UNITS} from '../../constants';

import Temperature from './Temperature';

import styles from './TemperatureRange.css';

const TemperatureRange = ({selectedUnits, temp, minTemp, maxTemp}) => (
  minTemp !== maxTemp
    ? (
      <div className={styles.tempRange}>
        <Temperature
          className={classnames(styles.tempEdge, styles.minTemp)}
          selectedUnits={selectedUnits}
          temp={minTemp}
        />
        <Temperature
          selectedUnits={selectedUnits}
          temp={temp}
        />
        <Temperature
          className={classnames(styles.tempEdge, styles.maxTemp)}
          selectedUnits={selectedUnits}
          temp={maxTemp}
        />
      </div>
    )
    : (
      <div className={styles.tempRange}>
        <Temperature selectedUnits={selectedUnits} temp={temp}/>
      </div>
    )
);

TemperatureRange.propTypes = {
  selectedUnits: PropTypes.oneOf(Object.keys(UNITS)).isRequired,
  temp: PropTypes.number.isRequired,
  minTemp: PropTypes.number,
  maxTemp: PropTypes.number,
};

export default TemperatureRange;
