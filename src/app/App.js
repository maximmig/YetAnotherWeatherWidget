import DashboardAddons from 'hub-dashboard-addons';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {render} from 'react-dom';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import {Provider, connect} from 'react-redux';
import thunk from 'redux-thunk';
import classnames from 'classnames';

import {Tabs, Tab} from '@jetbrains/ring-ui/components/tabs/tabs';
import {H3} from '@jetbrains/ring-ui/components/heading/heading';

import {ErrorStatus, InfoStatus} from './components/status';
import {
  Config,
  Header,
  Footer,
} from './components/widget';
import {
  DailyForecast,
  ExtendedHourlyForecast,
  CurrentConditions,
} from './components/weather';

import weatherReducer from './redux-modules/weather';
import configReducer from './redux-modules/config';
import * as weatherActions from './redux-modules/weather/actions';
import * as configActions from './redux-modules/config/actions';
import {getFilteredForecasts} from './redux-modules/weather/selectors';

import {UNITS, FORECAST_FILTERS} from './constants';
import {
  formatTime,
  isSameDay,
} from './helpers';

import 'file-loader?name=[name].[ext]!../../manifest.json'; // eslint-disable-line import/no-unresolved
import styles from './App.css';

class Widget extends Component {
  static propTypes = {
    dashboardApi: PropTypes.object.isRequired,
    registerWidgetApi: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
    isConfiguring: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    forecastFilter: PropTypes.oneOf(Object.values(FORECAST_FILTERS)).isRequired,
    error: PropTypes.string,
    selectedLocation: PropTypes.string,
    selectedUnits: PropTypes.oneOf(Object.keys(UNITS)),
    weather: PropTypes.object,
    forecastList: PropTypes.array,
    lastUpdateTime: PropTypes.number,
  };

  static defaultProps = {
    error: null,
    selectedLocation: null,
    selectedUnits: null,
    weather: null,
    forecastList: [],
    lastUpdateTime: null,
  };

  constructor(props) {
    super(props);

    props.registerWidgetApi({
      onConfigure: () => {
        this.props.dispatch(configActions.editConfigStarted());
      },
    });
  }

  componentDidMount() {
    this.props.dashboardApi.readConfig().then(config => {
      if (config == null) {
        return;
      }

      const {
        selectedLocation,
        selectedUnits,
      } = config;
      this.props.dispatch(configActions.readConfigSucceeded(selectedLocation, selectedUnits));
      this.props.dispatch(weatherActions.fetchWeather(selectedLocation, selectedUnits));
    });
  }

  componentWillUnmount() {
    this.props.dispatch(weatherActions.stopAutoRefresh());
  }

  handleSaveConfig = (selectedLocation, selectedUnits) => {
    this.props.dispatch(configActions.editConfigSucceeded(selectedLocation, selectedUnits));
    this.props.dispatch(weatherActions.fetchWeather(selectedLocation, selectedUnits));
    this.props.dashboardApi.storeConfig({selectedLocation, selectedUnits})
      .catch(error => {
        console.warn('Failed to store config: %o', error);
      });
  };

  handleCancelConfig = () => {
    this.props.dispatch(configActions.editConfigCanceled());
    this.props.dashboardApi.exitConfigMode();
  };

  handleSelectTab = selectedTab => {
    this.props.dispatch(weatherActions.filterForecasts(selectedTab));
  }

  handleRefresh = () => {
    const {
      selectedLocation,
      selectedUnits,
    } = this.props;

    this.props.dispatch(weatherActions.fetchWeather(selectedLocation, selectedUnits));
  }

  renderConfig() {
    const {
      selectedLocation,
      selectedUnits,
    } = this.props;

    return (
      <Config
        selectedLocation={selectedLocation}
        selectedUnits={selectedUnits}
        onSave={this.handleSaveConfig}
        onCancel={this.handleCancelConfig}
      />
    );
  }

  renderNoDataStatus() {
    const {
      isLoading,
      error,
    } = this.props;

    if (isLoading) {
      return (
        <InfoStatus message={'Loading, please wait'}/>
      );
    }
    if (error != null) {
      return (
        <ErrorStatus message={error}/>
      );
    }
    return (
      <InfoStatus message={'Select "Edit..." option in widget dropdown to configure it'}/>
    );
  }

  renderTodayTabContent() {
    const {
      selectedUnits,
      weather,
      forecastList,
    } = this.props;

    const units = UNITS[selectedUnits];

    return (
      <React.Fragment>
        <H3 className={styles.todayTabTime}>
          {formatTime(weather.dt, units.dateFormat)}
          <span className={styles.todayTabCurrentConditionsTime}>
            {`, ${formatTime(weather.dt, units.timeFormat)}`}
          </span>
        </H3>
        <CurrentConditions
          weather={weather}
          selectedUnits={selectedUnits}
          className={styles.todayTabCurrentConditions}
        />
        <DailyForecast
          forecastList={forecastList}
          selectedUnits={selectedUnits}
          today={weather.dt}
          className={styles.todayTabDailyForecast}
        />
      </React.Fragment>
    );
  }

  renderTomorrowTabContent() {
    const {
      selectedUnits,
      forecastList,
    } = this.props;
    const units = UNITS[selectedUnits];

    return (
      <React.Fragment>
        <H3 className={styles.tomorrowTabTime}>{formatTime(forecastList[0].dt, units.dateFormat)}</H3>
        {
          forecastList.map(f => (
            <ExtendedHourlyForecast
              key={f.dt}
              forecast={f}
              selectedUnits={selectedUnits}
            />
          ))
        }
      </React.Fragment>
    );
  }

  renderFiveDaysTabContent() {
    const {
      selectedUnits,
      forecastList,
    } = this.props;
    const units = UNITS[selectedUnits];

    let prevDate = null;
    let dailyForecast = null;
    return forecastList.reduce((acc, f) => {
      if (prevDate === null || !isSameDay(prevDate, f.dt)) {
        prevDate = f.dt;
        acc.push(<H3 className={styles.fiveDaysTabTime} key={`heading_${prevDate}`}>{formatTime(f.dt, units.dateFormat)}</H3>);
        dailyForecast = (
          <DailyForecast
            key={`forecast_${prevDate}`}
            selectedUnits={selectedUnits}
            forecastList={[]}
          />
        );
        acc.push(dailyForecast);
      }
      dailyForecast.props.forecastList.push(f);
      return acc;
    }, []);
  }

  render() {
    const {
      isLoading,
      isConfiguring,
      error,
      selectedUnits,
      weather,
      forecastFilter,
      lastUpdateTime,
    } = this.props;

    if (isConfiguring) {
      return this.renderConfig();
    }

    if (weather == null) {
      return this.renderNoDataStatus();
    }

    return (
      <div className={classnames(styles.widget, styles.widgetStructure)}>
        <Header city={weather.name} className={styles.locationHeader}/>
        <Tabs selected={forecastFilter} onSelect={this.handleSelectTab} className={styles.widgetTabs}>
          <Tab id={FORECAST_FILTERS.TWENTY_FOUR_HOURS} title="Today" className={styles.todayTab}>
            {forecastFilter === FORECAST_FILTERS.TWENTY_FOUR_HOURS && this.renderTodayTabContent()}
          </Tab>
          <Tab id={FORECAST_FILTERS.TOMORROW} title="Tomorrow">
            {forecastFilter === FORECAST_FILTERS.TOMORROW && this.renderTomorrowTabContent()}
          </Tab>
          <Tab id={FORECAST_FILTERS.FIVE_DAYS} title="5 days">
            {forecastFilter === FORECAST_FILTERS.FIVE_DAYS && this.renderFiveDaysTabContent()}
          </Tab>
        </Tabs>
        <Footer
          isLoading={isLoading}
          lastUpdateTime={lastUpdateTime}
          selectedUnits={selectedUnits}
          error={error}
          onRefresh={this.handleRefresh}
        />
      </div>
    );
  }
}

const combinedReducer = combineReducers({
  weather: weatherReducer,
  config: configReducer,
});

DashboardAddons.registerWidget((dashboardApi, registerWidgetApi) => {
  const store = createStore(combinedReducer, applyMiddleware(thunk));
  const mapStateToProps = state => ({
    isLoading: state.weather.isLoading,
    error: state.weather.error,
    weather: state.weather.weather,
    forecastFilter: state.weather.forecastFilter,
    lastUpdateTime: state.weather.lastUpdateTime,
    forecastList: getFilteredForecasts(state.weather.forecastList, state.weather.forecastFilter, state.weather.dt),
    ...state.config,
  });
  const ConnectedWidget = connect(mapStateToProps)(Widget);

  render(
    <Provider store={store}>
      <ConnectedWidget
        dashboardApi={dashboardApi}
        registerWidgetApi={registerWidgetApi}
      />
    </Provider>,
    document.getElementById('app-container'),
  );
});
