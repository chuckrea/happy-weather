import React from 'react';

import ReactAnimatedWeather from 'react-animated-weather';
import { formatTimeInHours } from '../utilities';

function HourlyForecast(props) {
  const { icon, summary } = props;

  // ReactAnimatedWeather needs an icon string to be formatted
  // with underscores instead of dashes
  const formattedIcon = icon.replace(/-/g, '_').toUpperCase();
  const formattedTime = formatTimeInHours(props.time);

  return (
    <div className="hourly-item">
      <div>
        <ReactAnimatedWeather icon={formattedIcon} size={30} animate={false} />
      </div>
      <p>
        {formattedTime} {summary}
      </p>
    </div>
  );
}

export default HourlyForecast;
