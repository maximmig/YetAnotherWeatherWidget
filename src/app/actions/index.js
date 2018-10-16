import {loadWeatherAndForecast, now} from '../helpers';

const UPDATE_INTERVAL = 3600000; // 1 hour

let fetchWeatherTimeoutId = null;

const readConfigSucceeded = (selectedLocation, selectedUnits) => ({
  type: 'READ_CONFIG_SUCCEEDED',
  payload: {
    selectedLocation,
    selectedUnits,
  },
});

const editConfigStarted = () => ({
  type: 'EDIT_CONFIG_STARTED',
});

const editConfigSucceeded = (selectedLocation, selectedUnits) => ({
  type: 'EDIT_CONFIG_SUCCEEDED',
  payload: {
    selectedLocation,
    selectedUnits,
  },
});

const editConfigCanceled = () => ({
  type: 'EDIT_CONFIG_CANCELED',
});

const fetchWeatherSucceeded = (weather, forecast, lastUpdateTime) => ({
  type: 'FETCH_WEATHER_SUCCEEDED',
  payload: {
    weather,
    forecast,
    lastUpdateTime,
  },
});

const fetchWeatherFailed = error => ({
  type: 'FETCH_WEATHER_FAILED',
  payload: {
    error,
  },
});

const fetchWeatherStarted = () => ({
  type: 'FETCH_WEATHER_STARTED',
});

const fetchWeather = (selectedLocation, selectedUnits) => dispatch => {
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

const filterForecast = filter => ({
  type: 'FILTER_FORECAST',
  payload: {
    filter,
  },
});

const stopAutoRefresh = () => {
  window.clearTimeout(fetchWeatherTimeoutId);
  return {
    type: 'STOP_AUTO_REFRESH',
  };
};

export {
  readConfigSucceeded,
  editConfigStarted,
  editConfigSucceeded,
  editConfigCanceled,
  fetchWeather,
  filterForecast,
  stopAutoRefresh,
};
