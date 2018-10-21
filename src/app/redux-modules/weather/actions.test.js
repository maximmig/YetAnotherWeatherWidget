import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import * as types from './types';

import {fetchWeatherSucceeded, fetchWeather} from './actions';

const mockStore = configureMockStore([thunk]);
const mockWeather = {weather: 'weather'};
const mockForecast = {forecast: 'forecast'};
const mockLastUpdateTime = 1000;

jest.mock('../../helpers', () => ({
  loadWeatherAndForecast: jest.fn(() => new Promise((resolve, reject) => resolve([mockWeather, mockForecast]))),
  now: jest.fn(() => mockLastUpdateTime),
}));
const helpers = require('../../helpers');

describe('fetchWeatherSucceeded', () => {
  it('works', () => {
    const expectedAction = {
      type: types.FETCH_WEATHER_SUCCEEDED,
      payload: {
        weather: mockWeather,
        forecast: mockForecast,
        lastUpdateTime: mockLastUpdateTime,
      },
    };

    expect(fetchWeatherSucceeded(mockWeather, mockForecast, mockLastUpdateTime)).toEqual(expectedAction);
  });
});

describe('fetchWeather', () => {
  it('works', () => {
    const expectedActions = [
      {type: types.FETCH_WEATHER_STARTED},
      {
        type: types.FETCH_WEATHER_SUCCEEDED,
        payload: {
          weather: mockWeather,
          forecast: mockForecast,
          lastUpdateTime: mockLastUpdateTime,
        },
      },
    ];
    const initialState = {};
    const store = mockStore(initialState);
    return store.dispatch(fetchWeather('selectedLocation', 'selectedUnits')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      expect(helpers.loadWeatherAndForecast).toHaveBeenCalled();
      expect(helpers.now).toHaveBeenCalled();
    });
  });
});
