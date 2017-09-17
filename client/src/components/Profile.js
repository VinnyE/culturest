import React, { Component } from 'react';
import Grid from './Grid';
import { withRouter } from 'react-router-dom';

class Profile extends Component {
  componentDidMount() {
    if(!this.props.pins) {
      // this.props.getUserPins(this.props.match.params.id)
    }
  }

  render() {
    const { user, pins, getUserPins, deletePost } = this.props;
    return (
      <div>
        This is a profile page.
       <Grid 
        pins={pins}
        deletePost={deletePost}
        getUserPins={getUserPins}
        user={user}
      />
      </div>
    );
  }
}

export default withRouter(Profile);