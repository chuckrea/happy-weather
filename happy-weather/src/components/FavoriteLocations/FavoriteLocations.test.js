import React from 'react';
import ReactDOM from 'react-dom';
import 'jest-canvas-mock';

import FavoriteLocations from './FavoriteLocations';

describe('FavoriteLocations Component', () => {
  let mockProps = {};

  beforeEach(() => {
    mockProps = {
      clearForecasts: () => {},
      setZipCode: () => {},
      zipCode: 10010,
      favorites: [],
    };
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');

    ReactDOM.render(<FavoriteLocations {...mockProps} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
