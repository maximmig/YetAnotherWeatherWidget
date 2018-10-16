const initialState = {
  isConfiguring: false,
  selectedLocation: null,
  selectedUnits: null,
};

const config = (state = initialState, action) => {
  switch (action.type) {
    case 'READ_CONFIG_SUCCEEDED':
      return Object.assign({}, state, action.payload);
    case 'EDIT_CONFIG_STARTED':
      return Object.assign({}, state, {isConfiguring: true});
    case 'EDIT_CONFIG_SUCCEEDED':
      return Object.assign({}, state, action.payload, {isConfiguring: false});
    case 'EDIT_CONFIG_CANCELED':
      return Object.assign({}, state, {isConfiguring: false});
    default:
      return state;
  }
};

export default config;
