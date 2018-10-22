import {FORECAST_FILTERS} from '../../constants';

import * as types from './types';

export const initialState = {
  isLoading: false,
  error: null,
  weather: null,
  forecastList: [],
  forecastFilter: FORECAST_FILTERS.TWENTY_FOUR_HOURS,
  lastUpdateTime: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_WEATHER_STARTED:
      return {
        ...state,
        isLoading: true,
      };
    case types.FETCH_WEATHER_SUCCEEDED:
      return {
        ...state,
        isLoading: false,
        error: null,
        weather: action.payload.weather,
        forecastList: action.payload.forecast.list,
        lastUpdateTime: action.payload.lastUpdateTime,
      };
    case types.FETCH_WEATHER_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error.message,
      };
    case types.FORECASTS_FILTER:
      return {
        ...state,
        forecastFilter: action.payload.filter,
      };
    default:
      return state;
  }
};

