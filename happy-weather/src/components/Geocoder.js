import React from 'react';

class Geocoder extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      zipCode: props.zipCode,
    };
  }

  componentWillReceiveProps(props) {
    if (props.zipCode === this.state.zipCode) {
      return;
    }

    this.setState({
      zipCode: props.zipCode,
    });

    if (props.zipCode && props.zipCode.length === 5) {
      console.log('getting location data in will recieve props');
      this.getLocationData(props.zipCode);
    }
  }

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

  validateZipCode(zipCode) {
    return /^[0-9]{5}(?:-[0-9]{4})?$/.test(zipCode);
  }

  getLocationData = zipCode => {
    // TODO: Add more validation here
    fetch(`/api/googlemaps/geocode/?address=${zipCode}`)
      .then(res => res.json())
      .then(response => {
        console.log(response);
        console.log(response.results[0]);

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

  handleInput = event => {
    if (!event.target.value.length) {
      this.props.clearForecasts();
    }

    this.props.setZipCode(event.target.value);
  };

  // TODO: Make the button do the submit??
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
        {/* <button>Get me my weather!</button> */}
      </div>
    );
  }
}

export default Geocoder;
