import React, { Component } from 'react';
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
    return (
      <div ref={(ref) => { this.grid = ref }} className="grid">
        <div className="grid-item">
          <img src="http://lorempixel.com/output/fashion-q-c-640-480-7.jpg" alt="grid item" className="grid-item-image" />
          <div className="grid-item-description">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Grid;