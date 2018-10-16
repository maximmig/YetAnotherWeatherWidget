import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import {TIME_ZONES, UNITS} from '../../constants';
import {formatTime} from '../../helpers';

import WeatherIcon from './WeatherIcon';
import WindDirection from './WindDirection';
import TemperatureRange from './TemperatureRange';

import styles from './CurrentConditions.css';

const Weather = ({weather, selectedUnits, className}) => {
  const units = UNITS[selectedUnits];
  const selectedTimezone = TIME_ZONES[weather.id];
  const currentWeather = weather.weather[0];
  const sunriseTime = formatTime(weather.sys.sunrise, units.timeFormatTz, selectedTimezone);
  const sunsetTime = formatTime(weather.sys.sunset, units.timeFormatTz, selectedTimezone);

  return (
    <div className={classnames(styles.currentConditions, className)}>
      <div className={styles.mainConditions}>
        <div className={styles.mainConditionsIcon}>
          <WeatherIcon
            id={currentWeather.icon}
            alt={currentWeather.main}
          />
        </div>
        <div className={styles.mainConditionsTemp}>
          <TemperatureRange
            selectedUnits={selectedUnits}
            minTemp={weather.main.temp_min}
            temp={weather.main.temp}
            maxTemp={weather.main.temp_max}
          />
        </div>
      </div>
      <div className={styles.conditionsDescription}>
        {`${currentWeather.main} (${currentWeather.description})`}
      </div>
      <div className={styles.conditionsOther}>
        {`wind ${weather.wind.speed} ${units.wind}`} {weather.wind.deg != null &&
          <WindDirection deg={weather.wind.deg}/>}
      </div>
      <div className={styles.conditionsOther}>
        {`☼↑ ${sunriseTime} - ☼↓ ${sunsetTime}`}
      </div>
    </div>
  );
};

Weather.propTypes = {
  weather: PropTypes.object.isRequired,
  selectedUnits: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default Weather;
