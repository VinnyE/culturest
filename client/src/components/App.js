import React, { Component } from 'react';
import { Route } from 'react-router-dom'
// import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';

import * as authActions from '../actions/authActions';

import Header from './Header';
import LogInModal from './LogInModal';
import Home from './Home';
import Authorize from './Authorize'

class App extends Component {
  render() {
    const { auth, openLogInModal, closeLogInModal, logInToSocialMedia } = this.props;

    return (
      <div className="app">
        <Header openLogInModal={openLogInModal} />
        
        <main>
          <Route exact path="/" component={Home} />
          <Route exact path="/me" component={Authorize} />
        </main>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(authActions, dispatch);
};

App.propTypes = {
  auth: PropTypes.object.isRequired,
  openLogInModal: PropTypes.func,
  closeLogInModal: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
