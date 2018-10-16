import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import {UNITS} from '../../constants';
import {formatTime} from '../../helpers';

import WeatherIcon from './WeatherIcon';
import Temperature from './Temperature';

import styles from './HourlyForecast.css';

const HourlyForecast = ({forecast, selectedUnits, className}) => {
  const weather = forecast.weather[0];
  const units = UNITS[selectedUnits];
  const time = formatTime(forecast.dt, units.timeFormat);

  return (
    <div className={classnames(styles.forecast, className)}>
      <Temperature
        selectedUnits={selectedUnits}
        temp={forecast.main.temp}
      />
      <WeatherIcon
        id={weather.icon}
        alt={weather.main}
        title={weather.description}
        className={styles.forecastIcon}
      />
      <div className={styles.forecastTime}>{time}</div>
    </div>
  );
};

HourlyForecast.propTypes = {
  forecast: PropTypes.object.isRequired,
  selectedUnits: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default HourlyForecast;
