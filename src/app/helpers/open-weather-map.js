const APPID = '58a567385bfc6787b44e632286d983a4';
const LANGUAGE = 'en';

const load = async (what, location, units) => {
  if (location == null) {
    console.warn('Missing location');
    throw new Error('Missing location');
  }
  const params = [`id=${location}`];
  if (units != null) {
    params.push(`units=${units}`);
  }
  params.push(`lang=${LANGUAGE}`);
  params.push(`APPID=${APPID}`);
  const search = params.join('&');
  const request = new Request(`http://api.openweathermap.org/data/2.5/${what}?${search}`);
  try {
    const response = await fetch(request);
    if (response.ok) {
      return await response.json();
    }
    throw new Error(`Failed to fetch ${what}: ${response.statusText}`);
  } catch (error) {
    console.warn(`Failed to fetch ${what}: %o`, error);
    throw error;
  }
};

const loadWeather = async (location, units) => await load('weather', location, units);

const loadForecast = async (location, units) => await load('forecast', location, units);

const loadWeatherAndForecast = (selectedLocation, selectedUnits) =>
  Promise.all([loadWeather(selectedLocation, selectedUnits), loadForecast(selectedLocation, selectedUnits)]);

export default loadWeatherAndForecast;
