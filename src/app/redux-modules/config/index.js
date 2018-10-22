import * as types from './types';

const initialState = {
  isConfiguring: false,
  selectedLocation: null,
  selectedUnits: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.READ_CONFIG_SUCCEEDED:
      return {
        ...state,
        selectedLocation: action.payload.selectedLocation,
        selectedUnits: action.payload.selectedUnits,
      };
    case types.EDIT_CONFIG_STARTED:
      return {
        ...state,
        isConfiguring: true,
      };
    case types.EDIT_CONFIG_SUCCEEDED:
      return {
        ...state,
        isConfiguring: false,
        selectedLocation: action.payload.selectedLocation,
        selectedUnits: action.payload.selectedUnits,
      };
    case types.EDIT_CONFIG_CANCELED:
      return {
        ...state,
        isConfiguring: false,
      };
    default:
      return state;
  }
};
