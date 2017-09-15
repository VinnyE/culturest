import React, { Component } from 'react';
import PropTypes from 'prop-types';

class GridItem extends Component {
  render() {
    const { url, description } = this.props;

    return (
      <div className="grid-item">
        <img src={ url } alt={ description } className="grid-item-image" />
        <div className="grid-item-description">
          <p>{ description }</p>
        </div>
      </div>
    );
  }
}

GridItem.propTypes = {
  url: PropTypes.string.isRequired,
  description: PropTypes.string
};

export default GridItem;