import React from 'react';

import './HappyWeather.css';

import CurrentForecast from './CurrentForecast';
import ForecastList from './ForecastList';
import Geocoder from './Geocoder';

class HappyWeather extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      location: '',
      coordinates: {},
      currentForecast: {
        summary: '',
      },
      forecasts: [],
      zip: '',
    };

    this.setZipCode = this.setZipCode.bind(this);
    this.setCoordinates = this.setCoordinates.bind(this);
    this.setCurrentForecastDisplay = this.setCurrentForecastDisplay.bind(this);
    this.resetCurrentForecast = this.resetCurrentForecast.bind(this);
  }

  setZipCode(zipCode) {
    this.setState({ zip: zipCode });
  }

  setCoordinates({ lat = '', lng = '', prettyName = '' }) {
    this.setState({
      location: prettyName,
      coordinates: {
        lat,
        lng,
      },
    });

    this.getForecast();
  }

  setCurrentForecastDisplay(forecastData) {
    const updatedState = {
      currentForecast: forecastData,
    };

    this.setState(updatedState);
  }

  resetCurrentForecast() {
    this.setCurrentForecastDisplay(this.state.todayForecast);
  }

  getForecast() {
    const {
      coordinates: { lat: latitude, lng: longitude },
    } = this.state;

    fetch(`/api/darksky/?lat=${latitude}&long=${longitude}`)
      .then(res => res.json())
      .then(forecast => {
        console.log(forecast);

        // Dark sky returns 9 days of forecasts. Let's just get the 5 day, excluding today's forecast.
        const dailyForecasts = forecast.daily.data.slice(1, 6);

        // We have to merge these two to get the full data on today's weather
        const todaysForecast = {
          ...forecast.currently,
          ...forecast.daily.data[0],
        };

        this.setState({
          forecasts: dailyForecasts,
          currentForecast: todaysForecast,
          todayForecast: todaysForecast,
          hourlyData: forecast.hourly.data.slice(0, 5),
        });
      });
  }

  render() {
    const {
      currentForecast,
      forecasts,
      hourlyData,
      location,
      zip,
    } = this.state;

    return (
      <div>
        <Geocoder
          setZipCode={this.setZipCode}
          setCoordinates={this.setCoordinates}
          zipCode={zip}
        />
        <div className="forecast-body">
          {currentForecast.summary && (
            <CurrentForecast
              location={location}
              {...currentForecast}
              hourly={hourlyData}
              resetForecast={this.resetCurrentForecast}
            />
          )}
          {forecasts.length > 0 && (
            <ForecastList
              forecasts={forecasts}
              displayFullForecast={this.setCurrentForecastDisplay}
              activeForecast={this.state.currentForecast.time}
            />
          )}
        </div>
      </div>
    );
  }
}

export default HappyWeather;
