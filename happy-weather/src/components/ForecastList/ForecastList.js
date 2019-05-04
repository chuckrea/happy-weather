import React from 'react';

import './ForecastList.css';

import ForecastListCard from '../ForecastListCard/ForecastListCard';

function ForecastList(props) {
  const { forecasts } = props;
  const items = forecasts.map((forecast, index) => (
    <ForecastListCard
      forecast={forecast}
      key={index}
      activeForecast={props.activeForecast}
      displayFullForecast={props.displayFullForecast}
    />
  ));

  return <div className="forecasts">{items}</div>;
}

export default ForecastList;
