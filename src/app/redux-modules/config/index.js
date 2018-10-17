import * as types from './types';

const initialState = {
  isConfiguring: false,
  selectedLocation: null,
  selectedUnits: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.READ_CONFIG_SUCCEEDED:
      return Object.assign({}, state, action.payload);
    case types.EDIT_CONFIG_STARTED:
      return Object.assign({}, state, {isConfiguring: true});
    case types.EDIT_CONFIG_SUCCEEDED:
      return Object.assign({}, state, action.payload, {isConfiguring: false});
    case types.EDIT_CONFIG_CANCELED:
      return Object.assign({}, state, {isConfiguring: false});
    default:
      return state;
  }
};
