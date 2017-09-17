import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GridItem from './GridItem'
import Masonry from 'masonry-layout';
import imagesLoaded from 'imagesloaded';
import brokenImage from '../images/brokenimage.png';

class Grid extends Component {
  componentDidMount() {
    const msnry = new Masonry(this.grid, {
      itemSelector: '.grid-item',
      columnWidth: 0,
    });

    imagesLoaded(this.grid).on('progress', (instance, image) => {
      const result = image.isLoaded ? 'loaded' : 'broken';

      if (result === 'broken') {
        image.img.src = brokenImage;
      }

      msnry.layout();
    });
  }

  render() {
    const { user, pins, getUserPins, deletePost } = this.props;
    return (
      <div ref={(ref) => { this.grid = ref }} className="grid">
       {pins
        ? pins.map((pin, idx) => {
            return (
              <GridItem 
                key={idx}
                url={ pin.imgURL }
                description={ pin.description } 
                getUserPins={ getUserPins }
                avatar={ pin.user.twitter.avatar }
                username={ pin.user.twitter.username }
                id={ pin.user._id }
                deletePost={ deletePost }
                user={user}
              />
            )
          })
         : ''}
      </div>
    );
  }
}

Grid.propTypes = {
  pins: PropTypes.array
};

export default Grid;