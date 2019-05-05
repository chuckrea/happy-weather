// Maps Dark Sky weather summaries to hex colors for
// display of animated icons
const iconColorMap = {
  CLEAR_DAY: '#edf202',
  CLEAR_NIGHT: '#000',
  CLOUDY: '#82827c',
  FOG: '#737373',
  RAIN: '#043f9e',
  PARTLY_CLOUDY_DAY: '#c6c047',
  PARTLY_CLOUDY_NIGHT: '#000',
  SLEET: '#055987',
  SNOW: '#088ad1',
  WIND: '#969694',
};

/**
 * function capitalizeString
 *
 * @param {string} string
 * @returns {string} capitalized string, e.g. 'Tatooine'
 */
function capitalizeString(string) {
  return `${string[0].toUpperCase()}${string.slice(1)}`;
}

/**
 * formatTimeInHours
 *
 * Takes in Date from DarkSky API and returns formatted string
 * representing the hour
 *
 * @param {Date} date
 * @returns {string} Hour and meridian, e.g. '1 AM'
 */
function formatTimeInHours(date) {
  // DarkSky date is returned in seconds, instead of milliseconds
  const time = new Date(date * 1000);
  const timeArray = time.toLocaleTimeString().split(' ');
  const hour = timeArray[0].split(':').shift();

  return `${hour} ${timeArray.pop()}`;
}

export { capitalizeString, formatTimeInHours, iconColorMap };
