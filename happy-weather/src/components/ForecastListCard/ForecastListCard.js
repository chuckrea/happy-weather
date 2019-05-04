import React from 'react';

import './ForecastListCard.css';

import iconColorMap from '../../IconColorMap';
import ReactAnimatedWeather from 'react-animated-weather';

const dayMap = {
  0: 'Sunday',
  1: 'Monday',
  2: 'Tuesday',
  3: 'Wednesday',
  4: 'Thursday',
  5: 'Friday',
  6: 'Saturday',
};

class ForecastListCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gifSrc: '',
      day: this.formatDay(this.props.forecast.time),
      active: props.activeForecast === props.forecast.time,
    };
  }

  componentWillReceiveProps(props) {
    this.setState({
      active: props.activeForecast === this.props.forecast.time,
    });
  }

  formatDay(time) {
    const date = new Date(time * 1000);

    return dayMap[date.getDay()];
  }

  activateCardForecast = () => {
    this.props.displayFullForecast({
      ...this.props.forecast,
      futureDay: this.state.day,
    });
  };

  render() {
    const {
      icon,
      summary,
      temperatureHigh,
      temperatureLow,
    } = this.props.forecast;

    const formattedIcon = icon.replace(/-/g, '_').toUpperCase();

    return (
      <div
        className={`forecast-card ${this.state.active ? 'active' : ''}`}
        onClick={this.activateCardForecast}
      >
        <h4>{this.state.day}</h4>
        <div>
          <ReactAnimatedWeather
            icon={formattedIcon}
            animate={true}
            size={85}
            color={iconColorMap[formattedIcon]}
          />
        </div>
        <p>{summary}</p>
        <div>High: {Math.round(temperatureHigh)}&deg; F</div>
        <div>Low: {Math.round(temperatureLow)}&deg; F</div>
      </div>
    );
  }
}

export default ForecastListCard;
