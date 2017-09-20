import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GridItem from './GridItem'
import Masonry from 'react-masonry-component';
import imagesLoaded from 'imagesloaded';
import brokenImage from '../images/brokenimage.png';

const masonryOptions = {
  itemSelector: '.grid-item',
  columnWidth: 0,
};

class Grid extends Component {
  render() {
    const { user, pins, getUserPins, deletePin } = this.props;
    let childElements;
    
    {pins
      ? childElements = pins.map((pin, idx) => {
          return (
            <GridItem 
              key={idx}
              url={pin.imgURL}
              description={pin.description} 
              getUserPins={getUserPins}
              avatar={pin.user.twitter.avatar ? pin.user.twitter.avatar: ''}
              username={pin.user.twitter.username}
              pinUserId={pin.user._id}
              pinId={pin._id}
              deletePin={deletePin}
              user={user}
            />
          )
        })
       : ''}
    
    return (
      <Masonry
        className="grid"
        options={masonryOptions}
        disableImagesLoaded={false}
        ref={ref => this.masonry = this.masonry || ref.masonry }
        >
        {childElements}
        </Masonry>
    );
  }
}

Grid.propTypes = {
  pins: PropTypes.array,
  user: PropTypes.object,
  getUserPins: PropTypes.func,
  deletePin: PropTypes.func
};

export default Grid;