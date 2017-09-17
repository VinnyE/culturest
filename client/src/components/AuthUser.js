import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Home from '../containers/Home';

export default (ChildComponent) => {
  class AuthUser extends Component {
    render () {
      const { loggedIn } = this.props.auth
      return (loggedIn
        ? <ChildComponent {...this.props} />
        : <Redirect to="/" />
      )
    }
  }

  const mapStateToProps = (state) => {
    return {
      auth: state.auth
    }
  }

  return connect(mapStateToProps)(AuthUser)
}