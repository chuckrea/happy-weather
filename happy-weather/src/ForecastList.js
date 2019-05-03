import React from 'react';

import './ForecastList.css';

import ForecastListCard from './ForecastListCard';

class ForecastList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { forecasts } = this.props;
    const items = forecasts.map((forecast, index) => (
      <ForecastListCard
        forecast={forecast}
        key={index}
        activeForecast={this.props.activeForecast}
        displayFullForecast={this.props.displayFullForecast}
      />
    ));

    return <div className="forecasts">{items}</div>;
  }
}

export default ForecastList;
