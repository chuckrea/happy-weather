import React from 'react';

class Geocoder extends React.Component {
  constructor(props) {
    super(props);

    this.handleInput = this.handleInput.bind(this);
  }

  handleInput(event) {
    this.props.setZipCode(event.target.value);

    if (event.target.value.length < 5) {
      return;
    }

    // TODO: Add more validation here
    fetch(`/api/googlemaps/geocode/?address=${event.target.value}`)
      .then(res => res.json())
      .then(response => {
        console.log(response);
        console.log(response.results[0]);

        const { geometry: { location = {} } = {} } = response.results[0] || {};
        console.log(location);
        this.props.setCoordinates(location);
      });
  }

  render() {
    const { zip } = this.props;

    return <input type="text" value={zip} onChange={this.handleInput} />;
  }
}

export default Geocoder;
