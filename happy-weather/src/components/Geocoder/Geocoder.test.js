import React from 'react';
import ReactDOM from 'react-dom';
import 'jest-canvas-mock';

import Geocoder from './Geocoder';

describe('Geocoder Component', () => {
  let mockProps = {};

  beforeEach(() => {
    mockProps = {
      clearForecasts: () => {},
      setZipCode: () => {},
      setCoordinates: () => {},
      zipCode: 10010,
    };
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');

    ReactDOM.render(<Geocoder {...mockProps} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
