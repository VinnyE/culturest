import React, { Component } from 'react';
import Grid from './Grid';

class Profile extends Component {
  render() {
    const { pins } = this.props;
    return (
      <div>
        This is a profile page.
       <Grid pins={pins} />
      </div>
    );
  }
}

export default Profile;