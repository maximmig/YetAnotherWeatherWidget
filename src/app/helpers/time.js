import moment from 'moment-timezone';

const toLocalTime = (unixTime, timezone = null) => {
  const unixTimeUtc = moment.unix(unixTime).local();
  return timezone == null ? unixTimeUtc : unixTimeUtc.tz(timezone);
};

const formatTime = (unixTime, format, timezone = null) =>
  toLocalTime(unixTime, timezone).format(format);

const isSameDay = (unixTime1, unixTime2) =>
  moment.unix(unixTime1).isSame(moment.unix(unixTime2), 'day');

const now = () => moment().unix();

export {
  formatTime,
  isSameDay,
  now,
};
