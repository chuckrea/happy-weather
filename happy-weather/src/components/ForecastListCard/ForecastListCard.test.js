import React from 'react';
import ReactDOM from 'react-dom';
import 'jest-canvas-mock';

import ForecastListCard from './ForecastListCard';

describe('ForecastListCard Component', () => {
  let mockProps = {};

  beforeEach(() => {
    mockProps = {
      key: 1,
      forecast: {
        icon: 'rain',
        summary: 'it will rain',
        temperatureHigh: 56.44,
        temperatureLow: 10.3,
      },
      displayFullForecast: () => {},
      activeForecast: 1557201600,
    };
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');

    ReactDOM.render(<ForecastListCard {...mockProps} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
