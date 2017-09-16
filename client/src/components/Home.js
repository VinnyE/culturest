import React, { Component } from 'react';
import Grid from './Grid';

class Home extends Component {
  render() {
    const { pins, getUserPins } = this.props;
    return (
      <div>
        <Grid
        getUserPins={getUserPins}
        pins={pins}
        />
      </div>
    );
  }
}

export default Home;

