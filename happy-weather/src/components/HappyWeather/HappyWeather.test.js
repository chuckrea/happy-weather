import React from 'react';
import ReactDOM from 'react-dom';

import HappyWeather from './HappyWeather';

describe('HappyWeather Component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');

    ReactDOM.render(<HappyWeather />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
