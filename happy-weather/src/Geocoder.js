import React from 'react';

class Geocoder extends React.Component {
  constructor(props) {
    super(props);

    this.handleInput = this.handleInput.bind(this);
    this.validateZipCode = this.validateZipCode.bind(this);
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

  handleInput(event) {
    this.props.setZipCode(event.target.value);

    if (
      event.target.value.length < 5 ||
      !this.validateZipCode(event.target.value)
    ) {
      return;
    }

    // TODO: Add more validation here
    fetch(`/api/googlemaps/geocode/?address=${event.target.value}`)
      .then(res => res.json())
      .then(response => {
        console.log(response);
        console.log(response.results[0]);

        const { geometry: { location: locationData = {} } = {} } =
          response.results[0] || {};
        const cityState = this.parseLocation(
          response.results[0].address_components
        );
        locationData.prettyName = `${cityState.city}, ${cityState.state}`;
        this.props.setCoordinates(locationData);
      });
  }

  render() {
    const { zip } = this.props;

    return (
      <div>
        <header>Happy Weather</header>
        <input type="text" value={zip} onChange={this.handleInput} />
      </div>
    );
  }
}

export default Geocoder;
