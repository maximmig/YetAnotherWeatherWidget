import {loadWeatherAndForecast, now} from '../../helpers';

import * as types from './types';

export const UPDATE_INTERVAL = 3600000; // 1 hour

let fetchWeatherIntervalId = null;

export const fetchWeatherSucceeded = (weather, forecast, lastUpdateTime) => ({
  type: types.FETCH_WEATHER_SUCCEEDED,
  payload: {
    weather,
    forecast,
    lastUpdateTime,
  },
});

export const fetchWeatherFailed = error => ({
  type: types.FETCH_WEATHER_FAILED,
  payload: {
    error,
  },
});

export const fetchWeatherStarted = () => ({
  type: types.FETCH_WEATHER_STARTED,
});

export const fetchWeather = (selectedLocation, selectedUnits) => dispatch => {
  dispatch(fetchWeatherStarted());
  return loadWeatherAndForecast(selectedLocation, selectedUnits)
    .then(([weather, forecast]) => {
      dispatch(fetchWeatherSucceeded(weather, forecast, now()));
    }).catch(error => {
      dispatch(fetchWeatherFailed(error));
    });
};

export const filterForecasts = filter => ({
  type: types.FORECASTS_FILTER,
  payload: {
    filter,
  },
});

export const startAutoRefresh = (selectedLocation, selectedUnits) => {
  fetchWeatherIntervalId = window.setInterval(() => {
    fetchWeather(selectedLocation, selectedUnits);
  }, UPDATE_INTERVAL);
  return {
    type: types.AUTO_REFRESH_START,
  };
};

export const stopAutoRefresh = () => {
  window.clearInterval(fetchWeatherIntervalId);
  return {
    type: types.AUTO_REFRESH_STOP,
  };
};
