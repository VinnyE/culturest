import React, { Component } from 'react';

class Loading extends Component {
  componentWillMount() {
    if (!this.props.auth.loggedIn && !this.props.auth.loggingIn) {
      this.props.logInToSocialMedia()
    }
  }

  render() {
    return (
      <div>
        Loading..
      </div>
    );
  }
}

export default Loading;