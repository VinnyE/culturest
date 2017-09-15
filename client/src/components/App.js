import React, { Component } from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import { getCookieValue } from '../handlers/helpers'

// import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as authActions from '../actions/authActions';
import * as pinActions from '../actions/pinActions';

import Header from './Header';
import Home from './Home';
// import Authorize from './Authorize';
import Loading from './Loading';

class App extends Component {
  constructor(props) {
    super(props);
    const authToken = getCookieValue('token');
 
    if (authToken) {
      let decodedUser = jwt_decode(authToken);
      const dateNow = new Date();

      if ((decodedUser.exp * 1000) > dateNow.getTime()) {
        this.props.isAuthenticated();
      }
    }
  }

  componentDidMount() {
    this.props.getAllPins()
  }

  render() {
    const { pin, addPin, auth, logInToSocialMedia, logOut, history } = this.props;

    return (
      <div className="app">
        <Header history={history} logOut={logOut} loggedIn={auth.loggedIn} handleAddPin={addPin}/>
        
        <main>
          <Route exact path="/" component={() => <Home pins={pin.pins} />} />
          <Route exact path="/me" component={() => 
            (auth.loggedIn ? (
              <Redirect to="/" />
            ) : (
               <Loading auth={auth} logInToSocialMedia={logInToSocialMedia}/>
            )
          )} />
        </main>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    pin: state.pin,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({...authActions, ...pinActions}, dispatch);
};

App.propTypes = {
  auth: PropTypes.object.isRequired,
  pin: PropTypes.object,
  openLogInModal: PropTypes.func,
  closeLogInModal: PropTypes.func
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
