import React, { Component } from 'react';

class Loading extends Component {
  constructor(props) {
    super(props)
  }

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