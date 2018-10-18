const UNITS = {
  metric: {
    name: 'metric',
    temp: '°C',
    wind: 'm/s',
    dateTimeFormat: 'dddd, MMMM DD, H:mm',
    dateFormat: 'dddd, MMMM DD',
    timeFormat: 'H:mm',
    timeFormatTz: 'H:mm (z)',
  },
  imperial: {
    name: 'imperial',
    temp: '°F',
    wind: 'mph',
    dateTimeFormat: 'dddd, MMMM DD, h:mm A',
    dateFormat: 'dddd, MMMM DD',
    timeFormat: 'h A',
    timeFormatTz: 'h:mm A (z)',
  },
};

const TIME_ZONES = {
  4930956: 'America/New_York',
  5350159: 'America/Los_Angeles',
  4502911: 'America/New_York',
  5128581: 'America/New_York',
  2867714: 'Europe/Berlin',
  3067696: 'Europe/Prague',
  524901: 'Europe/Moscow',
  1496747: 'Asia/Novosibirsk',
  498817: 'Europe/Moscow',
};

const FORECAST_FILTERS = {
  TWENTY_FOUR_HOURS: '24 hours',
  TOMORROW: 'tomorrow',
  FIVE_DAYS: '5 days',
};

export {
  UNITS,
  TIME_ZONES,
  FORECAST_FILTERS,
};
