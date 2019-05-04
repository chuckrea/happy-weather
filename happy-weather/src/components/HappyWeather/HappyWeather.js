import React from 'react';

import './HappyWeather.css';

import CurrentForecast from '../CurrentForecast/CurrentForecast';
import FavoriteLocations from '../FavoriteLocations';
import ForecastList from '../ForecastList/ForecastList';
import Geocoder from '../Geocoder';

class HappyWeather extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      location: '',
      coordinates: {},
      currentForecast: {},
      favorites: [],
      forecasts: [],
      showError: false,
      zipCode: '',
    };
  }

  componentWillMount() {
    this.getFavorites();
  }

  getFavorites = () => {
    const favorites = localStorage.getItem('weatherBotFavorites');

    this.setState({
      favorites: JSON.parse(favorites) || [],
    });
  };

  setFavorite = favoriteObject => {
    let favorites = JSON.parse(localStorage.getItem('weatherBotFavorites'));

    // if this location is already in favorites, let's bail
    if (
      favorites &&
      favorites.find(favorite => favorite.zip === favoriteObject.zip)
    ) {
      return;
    } else if (favorites) {
      // Otherwise if favorites exist on local storage, add this one
      favorites.push(favoriteObject);
      localStorage.setItem('weatherBotFavorites', JSON.stringify(favorites));
    } else {
      // If all else fails, make a new array and add it to local storage
      favorites = [favoriteObject];
      localStorage.setItem('weatherBotFavorites', JSON.stringify(favorites));
    }

    // Let's set state so the user can see their new faves
    this.setState({
      favorites,
    });
  };

  removeFavorite = favoriteObject => {
    const favorites = JSON.parse(localStorage.getItem('weatherBotFavorites'));

    const newFavorites = favorites.filter(
      favorite => favorite.zip !== favoriteObject.zip
    );

    if (!newFavorites.length) {
      localStorage.removeItem('weatherBotFavorites');
    } else {
      localStorage.setItem('weatherBotFavorites', JSON.stringify(newFavorites));
    }

    this.setState({
      favorites: newFavorites,
    });
  };

  setZipCode = zipCode => {
    this.setState({ zipCode: zipCode });
  };

  setCoordinates = ({ lat = '', lng = '', prettyName = '' }) => {
    if (!lat && !lng) {
      this.setState({
        showError: true,
        currentForecast: {},
        forecasts: [],
      });

      return;
    }

    this.setState({
      location: prettyName,
      coordinates: {
        lat,
        lng,
      },
      showError: false,
    });

    this.getForecast();
  };

  setCurrentForecastDisplay = forecastData => {
    const updatedState = {
      currentForecast: forecastData,
    };

    this.setState(updatedState);
  };

  resetCurrentForecast = () => {
    this.setCurrentForecastDisplay(this.state.todayForecast);
  };

  clearForecasts = () => {
    this.setState({
      currentForecast: {},
      forecasts: [],
    });
  };

  isLocationFavorite() {
    return this.state.favorites.find(
      favorite => this.state.zipCode === favorite.zip
    );
  }

  getForecast() {
    const {
      coordinates: { lat: latitude, lng: longitude },
    } = this.state;

    fetch(`/api/darksky/?lat=${latitude}&long=${longitude}`)
      .then(res => res.json())
      .then(forecast => {
        console.log(forecast);

        // Dark sky returns 9 days of forecasts. Let's just get the 5 day, excluding today's forecast.
        const dailyForecasts = forecast.daily.data.slice(1, 6);

        // We have to merge these two to get the full data on today's weather
        const todaysForecast = {
          ...forecast.currently,
          ...forecast.daily.data[0],
        };

        this.setState({
          forecasts: dailyForecasts,
          currentForecast: todaysForecast,
          todayForecast: todaysForecast,
          hourlyData: forecast.hourly.data.slice(0, 5),
        });
      });
  }

  render() {
    const {
      currentForecast,
      favorites,
      forecasts,
      hourlyData,
      location,
      showError,
      zipCode,
    } = this.state;

    const hasFavorites = favorites.length > 0;

    return (
      <div>
        <header>
          <h1>SuperHappyWeatherBot 90210</h1>
        </header>
        <div className="inputs">
          <Geocoder
            clearForecasts={this.clearForecasts}
            setZipCode={this.setZipCode}
            setCoordinates={this.setCoordinates}
            zipCode={zipCode}
          />

          {hasFavorites && (
            <FavoriteLocations
              favorites={favorites}
              zipCode={zipCode}
              setZipCode={this.setZipCode}
              clearForecasts={this.clearForecasts}
            />
          )}
        </div>

        {showError && <p>Seriously, use a valid zip code</p>}
        <div className="forecast-body">
          {zipCode.length === 5 && currentForecast.summary && (
            <CurrentForecast
              location={location}
              zipCode={zipCode}
              isFavorite={this.isLocationFavorite()}
              setFavorite={this.setFavorite}
              removeFavorite={this.removeFavorite}
              {...currentForecast}
              hourly={hourlyData}
              resetForecast={this.resetCurrentForecast}
            />
          )}
          {zipCode.length === 5 && forecasts.length > 0 && (
            <ForecastList
              forecasts={forecasts}
              displayFullForecast={this.setCurrentForecastDisplay}
              activeForecast={this.state.currentForecast.time}
            />
          )}
        </div>
      </div>
    );
  }
}

export default HappyWeather;
