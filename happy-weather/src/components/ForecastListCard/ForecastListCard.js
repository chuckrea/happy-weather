import React from 'react';

import './ForecastListCard.css';

import { iconColorMap } from '../../utilities';
import ReactAnimatedWeather from 'react-animated-weather';

// Date.getDay() returns numbers for days so.... =)
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
      day: this.formatDay(this.props.forecast.time),
      active: props.activeForecast === props.forecast.time,
    };
  }

  // TODO: This lifecycle hook will be deprecated with React v17
  // Refactor with static getDerivedStateFromProps(props, state)
  componentWillReceiveProps(props) {
    this.setState({
      active: props.activeForecast === this.props.forecast.time,
    });
  }

  /**
   * function formatDay
   *
   * Takes in a Date from DarkSky and returns
   * the name of the day
   *
   * @param {Date} time
   * @returns {string} Name of day, e.g. 'Tuesday'
   * @memberof ForecastListCard
   */
  formatDay(time) {
    // DarkSky time is returned in seconds, instead of milliseconds
    const date = new Date(time * 1000);
    return dayMap[date.getDay()];
  }

  /**
   * function activateCardForecast
   * Sets a daily forecast's active state
   *
   * @memberof ForecastListCard
   */
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
