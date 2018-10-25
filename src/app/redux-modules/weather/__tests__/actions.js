import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import * as types from '../types';

import {
  fetchWeatherSucceeded,
  fetchWeather,
  startAutoRefresh,
  stopAutoRefresh,
  UPDATE_INTERVAL,
} from '../actions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const mockWeather = {weather: 'weather'};
const mockForecast = {forecast: 'forecast'};
const mockLastUpdateTime = 1000;

jest.mock('../../../helpers', () => ({
  loadWeatherAndForecast: jest.fn(() =>
    new Promise((resolve, reject) => resolve([mockWeather, mockForecast]))), // eslint-disable-line no-unused-vars
  now: jest.fn(() => mockLastUpdateTime),
}));
import * as helpers from '../../../helpers'; //eslint-disable-line import/first

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

describe('auto refresh', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  it('can start', () => {
    const expectedActions = [{type: types.AUTO_REFRESH_START}];
    const initialState = {};
    const store = mockStore(initialState);
    store.dispatch(startAutoRefresh());
    expect(store.getActions()).toEqual(expectedActions);
    expect(setInterval).toHaveBeenCalledTimes(1);
    expect(setInterval).toHaveBeenLastCalledWith(expect.any(Function), UPDATE_INTERVAL);
  });

  it('can stop', () => {
    const expectedActions = [{type: types.AUTO_REFRESH_STOP}];
    const initialState = {};
    const store = mockStore(initialState);
    store.dispatch(stopAutoRefresh());
    expect(store.getActions()).toEqual(expectedActions);
    expect(clearInterval).toHaveBeenCalledTimes(1);
    expect(clearInterval).toHaveBeenLastCalledWith(expect.any(Number));
  });
});
