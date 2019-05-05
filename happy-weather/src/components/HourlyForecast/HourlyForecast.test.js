import React from 'react';
import ReactDOM from 'react-dom';
import 'jest-canvas-mock';

import HourlyForecast from './HourlyForecast';

describe('HourlyForecast Component', () => {
  let mockProps = {};

  beforeEach(() => {
    mockProps = {
      icon: 'rain',
      summary: 'it is totally going to rain',
      key: 1,
    };
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');

    ReactDOM.render(<HourlyForecast {...mockProps} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
