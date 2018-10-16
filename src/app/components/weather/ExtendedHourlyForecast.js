import React from 'react';
import PropTypes from 'prop-types';

import {UNITS} from '../../constants';

import {formatTime} from '../../helpers';

import WeatherIcon from './WeatherIcon';
import WindDirection from './WindDirection';
import Temperature from './Temperature';

import styles from './ExtendedHourlyForecast.css';

const ExtendedHourlyForecast = ({forecast, selectedUnits}) => {
  const weather = forecast.weather[0];
  const {wind} = forecast;
  const units = UNITS[selectedUnits];
  const time = formatTime(forecast.dt, units.timeFormat);

  return (
    <div className={styles.extendedForecast}>
      <div className={styles.extendedForecastDescription}>
        <div className={styles.extendedForecastTimeDescription}>{time}</div>
        <div>{weather.description}</div>
      </div>
      <div className={styles.extendedForecastIcon}>
        <WeatherIcon
          id={weather.icon}
          alt={weather.main}
        />
      </div>
      <div className={styles.extendedForecastTemp}>
        <Temperature
          selectedUnits={selectedUnits}
          temp={forecast.main.temp}
        />
      </div>
      <div className={styles.extendedForecastWind}>
        <div className={styles.extendedForecastWindSpeed}><WindDirection deg={wind.deg}/> {wind.speed.toFixed(1)}</div>
        <div>{units.wind}</div>
      </div>
    </div>
  );
};

ExtendedHourlyForecast.propTypes = {
  forecast: PropTypes.object.isRequired,
  selectedUnits: PropTypes.string.isRequired,
};

export default ExtendedHourlyForecast;
