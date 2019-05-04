import React from 'react';

import './CurrentForecast.css';

import HourlyForecast from './HourlyForecast';
import iconColorMap from './IconColorMap';
import ReactAnimatedWeather from 'react-animated-weather';

class CurrentForecast extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isFavorite: props.isFavorite,
    };
  }

  componentWillReceiveProps(props) {
    if (props.isFavorite !== this.state.isFavorite) {
      this.setState({
        isFavorite: props.isFavorite,
      });
    }
  }

  formatTimeInHours(date, returnFullTime) {
    const time = new Date(date * 1000);
    const timeArray = time.toLocaleTimeString().split(' ');
    const hourArray = timeArray[0].split(':');
    const hour = returnFullTime
      ? hourArray.slice(0, 2).join(':')
      : hourArray.shift();

    return `${hour} ${timeArray.pop()}`;
  }

  capitalizeString(string) {
    return `${string[0].toUpperCase()}${string.slice(1)}`;
  }

  toggleFavorite = () => {
    const { isFavorite } = this.state;
    const favoriteObject = {
      name: this.props.location,
      zip: this.props.zipCode,
    };

    if (isFavorite) {
      this.props.removeFavorite(favoriteObject);
    } else {
      this.props.setFavorite(favoriteObject);
    }

    this.setState({
      isFavorite: !isFavorite,
    });
  };

  render() {
    console.log('current', this.props);
    const {
      icon,
      futureDay,
      location,
      hourly,
      temperature,
      temperatureHigh,
      temperatureHighTime,
      temperatureLow,
      temperatureLowTime,
      precipIntensityMaxTime,
      precipProbability,
      precipType,
      summary,
      windGust,
      windGustTime,
      windSpeed,
    } = this.props;

    const formattedIcon = icon.replace(/-/g, '_').toUpperCase();
    const formattedMaxPrecipTime = this.formatTimeInHours(
      precipIntensityMaxTime,
      true
    );
    const formattedHighTempTime = this.formatTimeInHours(temperatureHighTime);
    const formattedLowTempTime = this.formatTimeInHours(temperatureLowTime);
    const formattedMaxGustsTime = this.formatTimeInHours(windGustTime);
    const precipPercentage = Math.round(precipProbability * 100);

    const hourlyForecasts = hourly.map((forecast, index) => (
      <HourlyForecast key={index} {...forecast} />
    ));

    return (
      <div className="current-forecast">
        {futureDay && (
          <div
            className="current-forecast--back-button"
            onClick={this.props.resetForecast}
          >
            &larr; Back to today's forecast
          </div>
        )}
        <div className="current-forecast--icon-info">
          <div className="centered-flex-column">
            <ReactAnimatedWeather
              icon={formattedIcon}
              size={150}
              color={iconColorMap[formattedIcon]}
            />
          </div>
          <div className="centered-flex-column">
            <h3>
              {futureDay ? futureDay : 'Currently'} in {location}{' '}
              <span onClick={this.toggleFavorite} className="favorite">
                <span className={`${this.state.isFavorite ? 'hidden' : ''}`}>
                  &#9825;
                </span>
                <span className={`${!this.state.isFavorite ? 'hidden' : ''}`}>
                  &#9829;
                </span>
              </span>
            </h3>
            {temperature && (
              <div className="current-forecast--temp">
                {Math.round(temperature)}&deg;
              </div>
            )}
            <div className="current-forecast--summary">{summary}</div>
            <div className="current-forecast--temp-range">
              <p>
                <span>High {Math.round(temperatureHigh)}&deg;</span> (
                {formattedHighTempTime})
              </p>
              <p>
                <span>Low {Math.round(temperatureLow)}&deg;</span> (
                {formattedLowTempTime})
              </p>
            </div>
          </div>
        </div>

        <div className="centered-flex-column">
          {precipPercentage > 0 && (
            <div>
              <div>
                <p>
                  Chance of {precipType} {precipPercentage}%
                </p>
              </div>
              <div>
                {this.capitalizeString(precipType)} will peak around{' '}
                {formattedMaxPrecipTime}
              </div>
            </div>
          )}
          <div>
            <p>Wind speed {Math.round(windSpeed)} MPH</p>
            <p>
              Max gusts {Math.round(windGust)} MPH ({formattedMaxGustsTime})
            </p>
          </div>
        </div>
        {!futureDay && (
          <div className="centered-flex-column">
            <p>Next 5 hours:</p>
            {hourlyForecasts}
          </div>
        )}
      </div>
    );
  }
}

export default CurrentForecast;
