import React from 'react';

import Geocoder from './Geocoder.js';

class HappyWeather extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            zip: '',
            coordinates: {}
        };

        this.darkSkyApi = 'https://api.darksky.net/forecast/b20ed2cf518265035a434036f7522627/';

        this.setZipCode = this.setZipCode.bind(this);
        this.setCoordinates = this.setCoordinates.bind(this);
    }

    setZipCode(zipCode) {
        this.setState({zip: zipCode});
    }

    setCoordinates({lat = '', lng = ''}) {
        this.setState({
            coordinates: {
                lat,
                lng
            }
        });
    }

    render() {
        return (
            <Geocoder setZipCode={this.setZipCode} setCoordinates={this.setCoordinates} zipCode={this.state.zip}></Geocoder>
        )
    } 
}

export default HappyWeather;