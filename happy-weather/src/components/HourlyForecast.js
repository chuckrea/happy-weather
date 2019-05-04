import React from 'react';

import ReactAnimatedWeather from 'react-animated-weather';

class HourlyForecast extends React.Component {
  getHourFromTime() {
    const time = new Date(this.props.time * 1000);
    const timeArray = time.toLocaleTimeString().split(' ');
    const timeWithoutSeconds = timeArray[0].split(':').shift();

    return `${timeWithoutSeconds} ${timeArray.pop()}`;
  }

  render() {
    const { icon, summary } = this.props;

    const formattedIcon = icon.replace(/-/g, '_').toUpperCase();
    const formattedTime = this.getHourFromTime();

    return (
      <div className="hourly-item">
        <div>
          <ReactAnimatedWeather
            icon={formattedIcon}
            size={30}
            animate={false}
          />
        </div>
        <p>
          {formattedTime} {summary}
        </p>
      </div>
    );
  }
}

export default HourlyForecast;
