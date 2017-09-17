import React, { Component } from 'react';
import PropTypes from 'prop-types';

class GridItem extends Component {
  render() {
    const { deletePin, user, url, description, avatar, username, pinUserId, pinId } = this.props;
    return (
      <div className="grid-item">
        <img src={ url } alt={ description } className="grid-item-image" />
        <div className="grid-item-description">
          <p>{ description }</p>
        </div>
        <div className="grid-item-author-info">
          <img className="grid-item-avatar" src={avatar} alt={username} />
          <a onClick={() => this.props.getUserPins(pinUserId) }className="grid-item-username">
            {username}
          </a>
        </div>
        {user && (user.id === pinUserId)
        ? <span onClick={() => deletePin(pinId) } className="grid-item-delete">Delete</span>
        : ''}
      </div>
    );
  }
}

GridItem.propTypes = {
  url: PropTypes.string.isRequired,
  description: PropTypes.string,
  deletePin: PropTypes.func,
  user: PropTypes.object,
  avatar: PropTypes.string,
  username: PropTypes.string,
  pinUserId: PropTypes.string,
  pinId: PropTypes.string,
  getUserPins: PropTypes.func
};

export default GridItem;