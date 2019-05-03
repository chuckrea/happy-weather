import React from 'react';

import './ForecastListCard.css';

import iconColorMap from './IconColorMap';
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
    this.activateCardForecast = this.activateCardForecast.bind(this);
    console.log(props);
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

  activateCardForecast() {
    // this.setState({
    //   active: true
    // });

    this.props.displayFullForecast({
      ...this.props.forecast,
      futureDay: this.state.day,
    });
  }

  getGiphy() {
    fetch(`/api/giphy/?search=${this.props.icon}`)
      .then(res => res.json())
      .then(giphy => {
        console.log(giphy);
        this.setState({
          gifSrc: giphy.data[0].images.fixed_height.webp,
        });
      });
  }

  render() {
    const {
      time,
      icon,
      summary,
      precipProbability,
      precipType,
      temperatureHigh,
      temperatureLow,
    } = this.props.forecast;

    const formattedIcon = icon.replace(/-/g, '_').toUpperCase();

    return (
      <div
        className={`forecast-card ${this.state.active ? 'active' : ''}`}
        onClick={this.activateCardForecast}
      >
        <h5>{this.state.day}</h5>
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
