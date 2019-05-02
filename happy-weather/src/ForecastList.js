import React from 'react';

import ForecastCard from './ForecastCard.js';

class ForecastList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { forecasts } = this.props;
    const items = forecasts.map((forecast, index) => (
      <ForecastCard key={index} />
    ));
    return <div>{items}</div>;
  }
}

export default ForecastList;
