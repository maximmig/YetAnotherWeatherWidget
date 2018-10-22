import * as types from './types';

import weatherReducer, {initialState} from './';

describe('weather reducer', () => {
  it('should return initial state', () => {
    expect(weatherReducer(undefined, {})).toEqual(initialState);
  });

  it(`should handle ${types.FETCH_WEATHER_STARTED} action`, () => {
    const action = {type: types.FETCH_WEATHER_STARTED};
    const expectedState = {
      ...initialState,
      isLoading: true,
    };
    expect(weatherReducer(initialState, action)).toEqual(expectedState);
  });

  it(`should handle ${types.FETCH_WEATHER_SUCCEEDED} action`, () => {
    const action = {
      type: types.FETCH_WEATHER_SUCCEEDED,
      payload: {
        weather: 'weather',
        forecast: {
          list: ['forecasts'],
        },
        lastUpdateTime: 1000,
      },
    };
    const expectedState = {
      ...initialState,
      isLoading: false,
      error: null,
      weather: action.payload.weather,
      forecastList: action.payload.forecast.list,
      lastUpdateTime: action.payload.lastUpdateTime,
    };
    expect(weatherReducer(initialState, action)).toEqual(expectedState);
  });

  it(`should handle ${types.FETCH_WEATHER_FAILED} action`, () => {
    const action = {
      type: types.FETCH_WEATHER_FAILED,
      payload: {
        error: {message: 'Failed to fetch weather'},
      },
    };
    const expectedState = {
      ...initialState,
      isLoading: false,
      error: action.payload.error.message,
    };
    expect(weatherReducer(initialState, action)).toEqual(expectedState);
  });
});
