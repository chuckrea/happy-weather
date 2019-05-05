import React from 'react';

import './HappyWeather.css';

import CurrentForecast from '../CurrentForecast/CurrentForecast';
import FavoriteLocations from '../FavoriteLocations/FavoriteLocations';
import ForecastList from '../ForecastList/ForecastList';
import Geocoder from '../Geocoder/Geocoder';

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

  /**
   * function getFavorites
   * Get favorites from localStorage and set them to state
   *
   * @memberof HappyWeather
   */
  getFavorites = () => {
    const favorites = localStorage.getItem('weatherBotFavorites');

    this.setState({
      favorites: JSON.parse(favorites) || [],
    });
  };

  /**
   * function setFavorite
   * Sets a new favorite on localStorage if favorites already exist,
   * or creates a new favorites array on localStorage if it's the first time
   *
   * @memberof HappyWeather
   */
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
    } else {
      // If all else fails, make a new array
      favorites = [favoriteObject];
    }

    // Put the new favorites in local storage
    localStorage.setItem('weatherBotFavorites', JSON.stringify(favorites));

    // Let's set state so the user can see their new faves
    this.setState({
      favorites,
    });
  };

  /**
   * function removeFavorite
   * removes a favorite location from localStorage
   *
   * @memberof HappyWeather
   */
  removeFavorite = favoriteObject => {
    const favorites = JSON.parse(localStorage.getItem('weatherBotFavorites'));

    // Filter out the favorite we don't want
    const newFavorites = favorites.filter(
      favorite => favorite.zip !== favoriteObject.zip
    );

    // If we've removed the last favorite, delete the whole thing from localStorage
    if (!newFavorites.length) {
      localStorage.removeItem('weatherBotFavorites');
    } else {
      // Otherwise return the new, filtered array to localStorage
      localStorage.setItem('weatherBotFavorites', JSON.stringify(newFavorites));
    }

    // Update!
    this.setState({
      favorites: newFavorites,
    });
  };

  /**
   * function setZipCode
   * updates zipCode in state
   *
   * @memberof HappyWeather
   */
  setZipCode = zipCode => {
    this.setState({ zipCode: zipCode });
  };

  /**
   * function setCoordinates
   * Gets coordinates from Geocoder component
   * Adds them to the local state
   * And calls the DarkSky API with the new coords
   * to get updated weather data
   *
   * @memberof HappyWeather
   */
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

    // Let's get this weather party started!
    this.getForecast();
  };

  /**
   * function setCurrentForecastDisplay
   * Updates local state to display full forecast data
   *
   * @memberof HappyWeather
   */
  setCurrentForecastDisplay = forecastData => {
    const updatedState = {
      currentForecast: forecastData,
    };

    this.setState(updatedState);
  };

  /**
   * function resetCurrentForecast
   * Resets current forecast to the actual, CURRENT forecast
   * (as opposed to a future day forecast)
   *
   * @memberof HappyWeather
   */
  resetCurrentForecast = () => {
    this.setCurrentForecastDisplay(this.state.todayForecast);
  };

  /**
   * function clearForecasts
   * Blanks out all forecast displays
   *
   * @memberof HappyWeather
   */
  clearForecasts = () => {
    this.setState({
      currentForecast: {},
      forecasts: [],
    });
  };

  /**
   * function isLocationFavorite
   * Determines if the current location is in
   * the user's favorites
   *
   * @returns boolean
   * @memberof HappyWeather
   */
  isLocationFavorite() {
    return !!this.state.favorites.find(
      favorite => this.state.zipCode === favorite.zip
    );
  }

  /**
   * function getForecast
   *
   * Gets latitude and longitude from local state
   * and calls the DarkSky API to get weather data.
   * Updates state with new weather data
   *
   * @memberof HappyWeather
   */
  getForecast() {
    const {
      coordinates: { lat: latitude, lng: longitude },
    } = this.state;

    // TODO: Add error handling
    fetch(`/api/darksky/?lat=${latitude}&long=${longitude}`)
      .then(res => res.json())
      .then(forecast => {
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
