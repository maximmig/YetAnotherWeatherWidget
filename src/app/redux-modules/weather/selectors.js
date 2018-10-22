import {createSelector} from 'reselect';

import {isSameDay} from '../../helpers';

import {FORECAST_FILTERS} from '../../constants';

export const DAILY_FORECAST_COUNT = 8; // 24h / 3h = 8 3-hour entries a day

// since state is recomputed every time we cannot rely on its (in)equality,
// that's why we don't just use state which could have been passed from mapStateToProps
// TODO: create custom selector creator
const getForecastList = (forecastList, forecastFilter, today) => forecastList; // eslint-disable-line no-unused-vars
const getForecastFilter = (forecastList, forecastFilter, today) => forecastFilter; // eslint-disable-line no-unused-vars
const getForecastDay = (forecastList, forecastFilter, today) => today; // eslint-disable-line no-unused-vars

export const getFilteredForecasts = createSelector(
  [getForecastList, getForecastFilter, getForecastDay],
  (forecastList, forecastFilter, today) => {
    if (forecastFilter === FORECAST_FILTERS.FIVE_DAYS) {
      return forecastList;
    }
    if (forecastFilter === FORECAST_FILTERS.TWENTY_FOUR_HOURS) {
      return forecastList.slice(0, DAILY_FORECAST_COUNT);
    }
    const tomorrowForecasts = [];
    for (let i = 0, count = 0; i < forecastList.length; i++) {
      const f = forecastList[i];
      if (isSameDay(today, f.dt)) {
        continue;
      }
      if (++count > DAILY_FORECAST_COUNT) {
        break;
      }
      tomorrowForecasts.push(f);
    }
    return tomorrowForecasts;
  }
);
