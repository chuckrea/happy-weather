import React from 'react';

import Geocoder from './Geocoder.js';
import ForecastList from './ForecastList.js';

class HappyWeather extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      zip: '',
      coordinates: {},
      forecasts: [],
    };

    this.setZipCode = this.setZipCode.bind(this);
    this.setCoordinates = this.setCoordinates.bind(this);
  }

  setZipCode(zipCode) {
    this.setState({ zip: zipCode });
  }

  setCoordinates({ lat = '', lng = '' }) {
    this.setState({
      coordinates: {
        lat,
        lng,
      },
    });

    this.getForecast();
  }

  getForecast() {
    const {
      coordinates: { lat: latitude, lng: longitude },
    } = this.state;

    fetch(`/api/darksky/?lat=${latitude}&long=${longitude}`)
      .then(res => res.json())
      .then(forecast => {
        console.log(forecast);
        const dailyForecasts = forecast.daily.data.splice(0, 5);
        this.setState({
          forecasts: dailyForecasts,
        });
      });
  }

  render() {
    const { forecasts, zip } = this.state;

    return (
      <div>
        <Geocoder
          setZipCode={this.setZipCode}
          setCoordinates={this.setCoordinates}
          zipCode={zip}
        />
        {this.state.forecasts.length > 0 && (
          <ForecastList forecasts={forecasts} />
        )}
      </div>
    );
  }
}

export default HappyWeather;
