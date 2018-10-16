import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import {isSameDay} from '../../helpers';

import HourlyForecast from './HourlyForecast';

import styles from './DailyForecast.css';

const DailyForecast = ({forecastList, selectedUnits, today, className}) => (
  <div className={classnames(styles.dailyForecast, className)}>
    {forecastList.map(f => {
      const hourlyClassName = classnames(styles.hourlyForecast, {
        [styles.futureForecast]: today && !isSameDay(today, f.dt),
      });
      return (
        <HourlyForecast
          key={f.dt}
          forecast={f}
          selectedUnits={selectedUnits}
          className={hourlyClassName}
        />
      );
    })}
  </div>
);

DailyForecast.propTypes = {
  forecastList: PropTypes.array.isRequired,
  selectedUnits: PropTypes.string.isRequired,
  today: PropTypes.number,
  className: PropTypes.string,
};

export default DailyForecast;
