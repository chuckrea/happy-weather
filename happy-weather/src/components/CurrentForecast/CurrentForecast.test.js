import React from 'react';
import ReactDOM from 'react-dom';
import 'jest-canvas-mock';

import CurrentForecast from './CurrentForecast';

describe('CurrentForecast Component', () => {
  let mockProps = {};

  beforeEach(() => {
    mockProps = {
      icon: 'rain',
      time: 1557201600,
      location: 'New York, NY',
      hourly: [],
      temperature: 56.25,
      temperatureHigh: 68.3,
      temperatureHighTime: 1557201600,
      temperatureLow: 53.89,
      temperatureLowTime: 1557201600,
      precipIntensityMaxTime: 1557201600,
      precipProbability: 0.86,
      precipType: 'rain',
      summary: 'Rainy',
      windGust: 4.6,
      windGustTime: 1557201600,
      windSpeed: 3.2,
    };
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');

    ReactDOM.render(<CurrentForecast {...mockProps} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
