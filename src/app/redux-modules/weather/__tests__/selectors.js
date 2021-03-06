import {FORECAST_FILTERS} from '../../../constants';

import {getFilteredForecasts, DAILY_FORECAST_COUNT} from '../selectors';

describe('forecasts selector', () => {
  const forecastList = [
    {dt: 1540242000}, // Tue Oct 23 2018 00:00:00 GMT+0300 (Moscow Standard Time)
    {dt: 1540252800}, // 3:00
    {dt: 1540263600}, // 6:00
    {dt: 1540274400}, // 9:00
    {dt: 1540285200}, // 12:00
    {dt: 1540296000}, // 15:00
    {dt: 1540306800}, // 18:00
    {dt: 1540317600}, // 21:00
    {dt: 1540328400}, // Wed Oct 24 2018 00:00:00 GMT+0300 (Moscow Standard Time)
    {dt: 1540339200}, // 3:00
    {dt: 1540350000}, // 6:00
    {dt: 1540360800}, // 9:00
    {dt: 1540371600}, // 12:00
    {dt: 1540382400}, // 15:00
    {dt: 1540393200}, // 18:00
    {dt: 1540404000}, // 21:00
    {dt: 1540414800}, // Thu Oct 25 2018 00:00:00 GMT+0300 (Moscow Standard Time) and so on
    {dt: 1540425600},
    {dt: 1540436400},
    {dt: 1540447200},
    {dt: 1540458000},
    {dt: 1540468800},
    {dt: 1540479600},
    {dt: 1540490400},
    {dt: 1540501200},
    {dt: 1540512000},
    {dt: 1540522800},
    {dt: 1540533600},
    {dt: 1540544400},
    {dt: 1540555200},
    {dt: 1540566000},
    {dt: 1540576800},
    {dt: 1540587600},
    {dt: 1540598400},
    {dt: 1540609200},
    {dt: 1540620000},
    {dt: 1540630800},
    {dt: 1540641600},
    {dt: 1540652400},
    {dt: 1540663200},
    {dt: 1540674000},
  ];

  afterEach(() => {
    getFilteredForecasts.resetRecomputations();
  });

  it('should be able to get 5 day forecasts', () => {
    const expectedForecasts = forecastList.slice(0);
    expect(getFilteredForecasts(forecastList, FORECAST_FILTERS.FIVE_DAYS, forecastList[0].dt))
      .toEqual(expectedForecasts);
  });

  it('should be able to get 24 hours forecasts', () => {
    const expectedForecasts = forecastList.slice(0, DAILY_FORECAST_COUNT);
    expect(getFilteredForecasts(forecastList, FORECAST_FILTERS.TWENTY_FOUR_HOURS, forecastList[0].dt))
      .toEqual(expectedForecasts);
  });

  it('should be able to get tomorrow forecasts', () => {
    const expectedForecasts =
      forecastList.slice(DAILY_FORECAST_COUNT, DAILY_FORECAST_COUNT + DAILY_FORECAST_COUNT);
    expect(getFilteredForecasts(forecastList, FORECAST_FILTERS.TOMORROW, forecastList[0].dt))
      .toEqual(expectedForecasts);
  });

  it('should memoize filter results and not recompute them when called with previous filters', () => {
    const uniqueFilters = [{
      forecastList,
      forecastFilter: FORECAST_FILTERS.FIVE_DAYS,
      today: forecastList[0].dt,
    }, {
      forecastList,
      forecastFilter: FORECAST_FILTERS.FIVE_DAYS,
      today: forecastList[1].dt,
    }, {
      forecastList,
      forecastFilter: FORECAST_FILTERS.TOMORROW,
      today: forecastList[0].dt,
    }, {
      forecastList,
      forecastFilter: FORECAST_FILTERS.TWENTY_FOUR_HOURS,
      today: forecastList[0].dt,
    }, {
      forecastList: forecastList.slice(0),
      forecastFilter: FORECAST_FILTERS.TWENTY_FOUR_HOURS,
      today: forecastList[0].dt,
    }];
    for (let i = 0; i < uniqueFilters.length; i++) {
      const filter = uniqueFilters[i];
      const computationCount = i + 1;
      getFilteredForecasts(filter.forecastList, filter.forecastFilter, filter.today);
      expect(getFilteredForecasts.recomputations()).toEqual(computationCount);
      // should not increase recomputation count
      getFilteredForecasts(filter.forecastList, filter.forecastFilter, filter.today);
      expect(getFilteredForecasts.recomputations()).toEqual(computationCount);
    }
  });
});
