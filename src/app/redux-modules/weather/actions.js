import {loadWeatherAndForecast, now} from '../../helpers';

import * as types from './types';

const UPDATE_INTERVAL = 3600000; // 1 hour

let fetchWeatherTimeoutId = null;

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
  window.clearTimeout(fetchWeatherTimeoutId);
  fetchWeatherTimeoutId = window.setTimeout(() => {
    fetchWeather(selectedLocation, selectedUnits);
  }, UPDATE_INTERVAL);

  dispatch(fetchWeatherStarted());
  loadWeatherAndForecast(selectedLocation, selectedUnits)
    .then(([weather, forecasts]) => {
      dispatch(fetchWeatherSucceeded(weather, forecasts, now()));
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

export const stopAutoRefresh = () => {
  window.clearTimeout(fetchWeatherTimeoutId);
  return {
    type: types.AUTO_REFRESH_STOP,
  };
};
