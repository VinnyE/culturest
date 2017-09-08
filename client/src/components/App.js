import React, { Component } from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';

import * as authActions from '../actions/authActions';

import Header from './Header';
import Home from './Home';
// import Authorize from './Authorize';
import Loading from './Loading';

class App extends Component {
  render() {
    const { auth } = this.props;

    return (
      <div className="app">
        <Header loggedIn={auth.loggedIn} />
        
        <main>
          <Route exact path="/" component={Home} />
          <Route exact path="/me" component={() => (            auth.loggedIn ? (
              <Redirect to="/" />
            ) : (
              <Loading />
            )
          )} />
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
