import React from 'react';

class FavoriteLocations extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: props.zipCode,
    };
  }

  componentWillReceiveProps(props) {
    console.log('favorite props', props);
    console.log('favorite state', this.state);

    if (!props.zipCode) {
      this.setState({
        value: '',
      });
    } else if (!this.state.value && props.zipCode.length === 5) {
      this.setState({
        value: props.zipCode,
      });
    }
  }

  handleChange = event => {
    this.setState({
      value: event.target.value,
    });

    this.props.setZipCode(event.target.value);
  };

  render() {
    const { favorites } = this.props;

    const options = favorites.map((favorite, index) => {
      return (
        <option key={index} value={favorite.zip}>
          {favorite.name}
        </option>
      );
    });
    return (
      <select value={this.state.value} onChange={this.handleChange}>
        <option value="">Favorites</option>
        {options}
      </select>
    );
  }
}

export default FavoriteLocations;
