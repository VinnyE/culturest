import React, { Component } from 'react';
import PropTypes from 'prop-types';

class GridItem extends Component {
  render() {
    const { url, description, avatar, username, id, getUserPins } = this.props;

    return (
      <div className="grid-item">
        <img src={ url } alt={ description } className="grid-item-image" />
        <div className="grid-item-description">
          <p>{ description }</p>
        </div>
        <div className="grid-item-author-info">
          <img className="grid-item-avatar" src={avatar} alt={username} />
          <a onClick={() => this.props.getUserPins(id) }className="grid-item-username">
            {username}
          </a>
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