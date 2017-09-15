import React, { Component } from 'react';
import Grid from './Grid';

class Home extends Component {
  render() {
    const { pins } = this.props
    return (
      <div>
        <Grid pins={pins} />
      </div>
    );
  }
}

export default Home;

