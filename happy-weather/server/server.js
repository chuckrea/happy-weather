/**
 * This is a simple express server to proxy API calls in development.
 */
const express = require('express');
const bodyParser = require('body-parser');
require('es6-promise').polyfill();
require('isomorphic-fetch');
const port = 3001;

// Configure app to use bodyParser to parse json data
const app = express();
const server = require('http').createServer(app);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// API Keys
const GOOGLE_MAPS_API_KEY = 'AIzaSyB1ZS3vrgm7k_fuTyuBMsVSkIeXJXhtZio';
const DARKSKY_API_KEY = 'b20ed2cf518265035a434036f7522627';
const GIPHY_API_KEY = 'OfFsCQOsrM5PxmV26uW4qGaD3fZQi82M';

// Formatted API Calls
const darkSkyApiUrl = `https://api.darksky.net/forecast/${DARKSKY_API_KEY}/`;
const googleMapsApiUrl = `https://maps.googleapis.com/maps/api/geocode/json?key=${GOOGLE_MAPS_API_KEY}`;
const giphyApiUrl = `https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}`;

// Dark Sky API proxy for weather forecast info
app.get('/api/darksky', function(req, res) {
  try {
    // Grab location coordinates (latitude and longitude) from query params
    const coordinates = `${req.query.lat},${req.query.long}`;
    const url = `${darkSkyApiUrl}${coordinates}/?exclude=alerts,flags`;

    console.log('Fetching:', url);

    fetch(url)
      .then(function(response) {
        if (response.status != 200) {
          res.status(response.status).json({
            message: `Status: ${
              response.status
            } Bad response from Dark Sky server`,
          });
        }
        return response.json();
      })
      .then(function(payload) {
        res.status(200).json(payload);
      });
  } catch (err) {
    console.log('Error requesting Dark Sky API', err);
    res
      .status(500)
      .json({ message: 'Errors occurs requesting Dark Sky API', details: err });
  }
});

// Google Maps API proxy for latitude/longitude
app.get('/api/googlemaps/geocode', function(req, res) {
  try {
    // Use address information passed from query params
    const address = `&address=${req.query.address}`;
    const url = `${googleMapsApiUrl}${address}`;

    console.log('Fetching:', url);

    fetch(url)
      .then(function(response) {
        if (response.status != 200) {
          res.status(response.status).json({
            message: `Status: ${
              response.status
            } 'Bad response from Google Maps server`,
          });
        }
        return response.json();
      })
      .then(function(payload) {
        res.status(200).json(payload);
      });
  } catch (err) {
    console.log('Errors occurs requesting Google Maps Geocode API', err);
    res.status(500).json({
      message: 'Errors occurs requesting Google Maps Geocode API',
      details: err,
    });
  }
});

// Google Maps API proxy for latitude/longitude
app.get('/api/giphy', function(req, res) {
  try {
    // Use address information passed from query params
    const searchQuery = `&q=${req.query.search}`;
    const url = `${giphyApiUrl}${searchQuery}`;

    console.log('Fetching:', url);

    fetch(url)
      .then(function(response) {
        if (response.status != 200) {
          res.status(response.status).json({
            message: `Status: ${
              response.status
            } 'Bad response from Giphy server`,
          });
        }
        return response.json();
      })
      .then(function(payload) {
        res.status(200).json(payload);
      });
  } catch (err) {
    console.log('Errors occurs requesting Giphy API', err);
    res.status(500).json({
      message: 'Errors occurs requesting Giphy API',
      details: err,
    });
  }
});

// Start the server
server.listen(port);
console.log('Server is listening on port ' + port);
