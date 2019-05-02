import React from 'react';

class Geocoder extends React.Component {
    constructor(props) {
        super(props);

        const geoKey = 'AIzaSyB1ZS3vrgm7k_fuTyuBMsVSkIeXJXhtZio';

        this.mapsApi = `https://maps.googleapis.com/maps/api/geocode/json?key=${geoKey}`;

        this.handleInput = this.handleInput.bind(this);
    }

    handleInput(event) {
        this.props.setZipCode(event.target.value);

        if (event.target.value.length < 5) {
            return;
        }

        const fullApiCall = `${this.mapsApi}&address=${event.target.value}`;

        fetch(fullApiCall)
            .then(res => res.json())
            .then((response) => {
                console.log(response.results[0]);

                const { geometry: { location = {} } = {} } = response.results[0] || {};
                console.log(location);
                this.props.setCoordinates(location);
            });
    }

    render() {
        const { zip } = this.props;

        return (
            <input type="text" value={zip} onChange={this.handleInput}></input>
        )
    } 
}

export default Geocoder;