const UNITS = {
  metric: {
    name: 'metric',
    temp: '°C',
    wind: 'm/s',
    dateFormat: 'dddd, MMMM DD',
    timeFormat: 'H:mm',
    timeFormatTz: 'H:mm (z)',
    shortTimeFormat: 'H:mm',
    shortestTimeFormat: 'H',
  },
  imperial: {
    name: 'imperial',
    temp: '°F',
    wind: 'mph',
    dateFormat: 'dddd, MMMM DD',
    timeFormat: 'h:mm A',
    timeFormatTz: 'h:mm A (z)',
    shortTimeFormat: 'h A',
    shortestTimeFormat: 'h',
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
