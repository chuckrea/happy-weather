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

  describe('parseLocation', () => {
    let addressArray = [];

    it('should return correct city/state information', () => {
      addressArray = [
        {
          long_name: 'Manhattan',
          short_name: 'Manhattan',
          types: ['political', 'sublocality', 'sublocality_level_1'],
        },
        {
          long_name: 'New York',
          short_name: 'New York',
          types: ['locality', 'political'],
        },
        {
          long_name: 'New York',
          short_name: 'NY',
          types: ['administrative_area_level_1', 'political'],
        },
      ];
      const expectedResult = {
        city: 'New York',
        state: 'NY',
      };
      const result = Geocoder.prototype.parseLocation(addressArray);

      expect(result).toEqual(expectedResult);
    });

    it('should return an empty object if there is no city/state info', () => {
      addressArray = [
        {
          long_name: 'Manhattan',
          short_name: 'Manhattan',
          types: ['political', 'sublocality', 'sublocality_level_1'],
        },
      ];

      const result = Geocoder.prototype.parseLocation(addressArray);
      expect(result).toEqual({});
    });
  });

  describe('validateZipCode', () => {
    it('should return true for a 5 digit zip code', () => {
      const zipCode = 10040;
      const result = Geocoder.prototype.validateZipCode(zipCode);
      expect(result).toBe(true);
    });

    it('should return false for anything else', () => {
      const zipCode = 1004;
      const result = Geocoder.prototype.validateZipCode(zipCode);
      expect(result).toBe(false);
    });
  });
});
