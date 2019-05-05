import React from 'react';

class FavoriteLocations extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: props.zipCode,
    };
  }

  // TODO: This lifecycle hook will be deprecated with React v17
  // Refactor with static getDerivedStateFromProps(props, state)
  componentWillReceiveProps(props) {
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

  /**
   * function handleChange
   * Event listener callback for location <select> element
   *
   * @memberof FavoriteLocations
   */
  handleChange = event => {
    this.setState({
      value: event.target.value,
    });

    this.props.clearForecasts();
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
