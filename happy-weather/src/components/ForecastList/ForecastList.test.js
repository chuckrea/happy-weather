import React from 'react';
import ReactDOM from 'react-dom';
import 'jest-canvas-mock';

import ForecastList from './ForecastList';

describe('ForecastList Component', () => {
  let mockProps = {};

  beforeEach(() => {
    mockProps = {
      forecasts: [],
      displayFullForecast: () => {},
      activeForecast: 1557201600,
    };
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');

    ReactDOM.render(<ForecastList {...mockProps} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
