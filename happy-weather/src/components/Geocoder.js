import React from 'react';

class Geocoder extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      zipCode: props.zipCode,
    };
  }

  // TODO: This lifecycle hook will be deprecated with React v17
  // Refactor with static getDerivedStateFromProps(props, state)
  componentWillReceiveProps(props) {
    if (props.zipCode === this.state.zipCode) {
      return;
    }

    this.setState({
      zipCode: props.zipCode,
    });

    if (props.zipCode && props.zipCode.length === 5) {
      this.getLocationData(props.zipCode);
    }
  }

  /**
   * function parseLocation
   * Takes in GoogleMaps API data
   * and returns an object with city/state
   *
   * @param {Array} addressData
   * @returns {Object} {city: {String}, state: {String}}
   * @memberof Geocoder
   */
  parseLocation(addressData) {
    return addressData.reduce((newObj, currentData) => {
      if (currentData.types.indexOf('locality') > -1) {
        newObj.city = currentData.long_name;
      } else if (
        currentData.types.indexOf('administrative_area_level_1') > -1
      ) {
        newObj.state = currentData.short_name;
      }

      return newObj;
    }, {});
  }

  /**
   * function validateZipCode
   * Validates zip code
   *
   * @param {number | string} zipCode
   * @returns boolean
   * @memberof Geocoder
   */
  validateZipCode(zipCode) {
    return /^[0-9]{5}(?:-[0-9]{4})?$/.test(zipCode);
  }

  /**
   * function getLocationData
   * Calls GoogleMaps Geocoder API and
   * passes coordinate information back
   * to parent component
   *
   * @memberof Geocoder
   */
  getLocationData = zipCode => {
    // TODO: Add more validation here
    fetch(`/api/googlemaps/geocode/?address=${zipCode}`)
      .then(res => res.json())
      .then(response => {
        if (response.status === 'ZERO_RESULTS') {
          this.props.setCoordinates({});
          return;
        }

        const { geometry: { location: locationData = {} } = {} } =
          response.results[0] || {};

        const cityState = this.parseLocation(
          response.results[0].address_components
        );

        this.props.setCoordinates({
          ...locationData,
          prettyName: `${cityState.city}, ${cityState.state}`,
        });
      });
  };

  /**
   * function handleInput
   * Event listener callback for zipcode input
   *
   * @memberof Geocoder
   */
  handleInput = event => {
    if (!event.target.value.length) {
      this.props.clearForecasts();
    }

    this.props.setZipCode(event.target.value);
  };

  // TODO: Make a button do the submit??
  render() {
    const { zipCode } = this.state;

    return (
      <div>
        <input
          type="text"
          maxLength="5"
          placeholder="enter zip code..."
          value={zipCode}
          onChange={this.handleInput}
        />
      </div>
    );
  }
}

export default Geocoder;
