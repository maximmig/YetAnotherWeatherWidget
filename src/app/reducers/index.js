import {combineReducers} from 'redux';

import weather, {getFilteredForecasts} from './weather';
import config from './config';

export default combineReducers({
  weather,
  config,
});

export {getFilteredForecasts};
