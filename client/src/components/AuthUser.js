import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export default (ChildComponent) => {
  class AuthUser extends Component {
    static propTypes = {
      loggedIn: PropTypes.bool.isRequired
    };

    render () {
      const { loggedIn } = this.props
      return (loggedIn
        ? <ChildComponent {...this.props} />
        : <SignIn />
      )
    }
  }

  const mapStateToProps = ({session}) => (session)

  return connect(mapStateToProps)(AuthUser)
}