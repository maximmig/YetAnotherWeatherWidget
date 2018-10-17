import * as types from './types';

export const readConfigSucceeded = (selectedLocation, selectedUnits) => ({
  type: types.READ_CONFIG_SUCCEEDED,
  payload: {
    selectedLocation,
    selectedUnits,
  },
});

export const editConfigStarted = () => ({
  type: types.EDIT_CONFIG_STARTED,
});

export const editConfigSucceeded = (selectedLocation, selectedUnits) => ({
  type: types.EDIT_CONFIG_SUCCEEDED,
  payload: {
    selectedLocation,
    selectedUnits,
  },
});

export const editConfigCanceled = () => ({
  type: types.EDIT_CONFIG_CANCELED,
});
