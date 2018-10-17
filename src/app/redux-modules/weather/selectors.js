import {createSelector} from 'reselect';

import {isSameDay} from '../../helpers';

import {FORECAST_FILTERS} from '../../constants';

// since state is recomputed every time we cannot rely on its (in)equality,
// that's why we don't just use state which could have been passed from mapStateToProps
// TODO: create custom selector creator
const getForecastList = (forecastList, forecastFilter, today) => forecastList; // eslint-disable-line no-unused-vars
const getForecatsFilter = (forecastList, forecastFilter, today) => forecastFilter; // eslint-disable-line no-unused-vars

export const getFilteredForecasts = createSelector(
  [getForecastList, getForecatsFilter],
  (forecastList, forecastFilter, today) => {
    const dailyForecastCount = 8; // 24h / 3h = 8 3-hour entries a day
    if (forecastFilter === FORECAST_FILTERS.FIVE_DAYS) {
      return forecastList;
    }
    if (forecastFilter === FORECAST_FILTERS.TWENTY_FOUR_HOURS) {
      return forecastList.slice(0, dailyForecastCount);
    }

    const tomorrowForecasts = [];
    for (let i = 0, count = 0; i < forecastList.length; i++) {
      const f = forecastList[i];
      if (isSameDay(today, f.dt)) {
        continue;
      }
      if (++count > dailyForecastCount) {
        break;
      }
      tomorrowForecasts.push(f);
    }
    return tomorrowForecasts;
  }
);
