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
import Profile from './Profile';
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

        this.props.isAuthenticated({
          username: decodedUser.username,
          id: decodedUser._id
        });
      }
    }

    this.getUserPins = this.getUserPins.bind(this);
    this.deletePost = this.deletePost.bind(this);
  }

  componentDidMount() {
    this.props.getAllPins()
  }

  async getUserPins(id) {
    id = id ? id : '59bd77e17765f53c8e9105cf'; 

    const userPins = await this.props.getUserPins(/*this.props.auth.user.id ||*/id);

    if (userPins) {
      // Showing an ID isn't really optimal.. much better would be an actual profile account. This is fine for now as only social auth is implemented at the moment.
      this.props.history.push(`/profile/${id}`);    
    }
  }

  async deletePost(id) {

  }

  render() {
    const { pin, addPin, getAllPins, auth, logInToSocialMedia, logOut, history } = this.props;

    return (
      <div className="app">
        <Header 
          getUserPins={this.getUserPins} 
          history={history} 
          logOut={logOut} 
          loggedIn={auth.loggedIn} 
          handleAddPin={addPin}
        />
        
        <main>
          <Route exact path="/" component={() => <Home 
          pins={pin.pins} 
          getUserPins={this.getUserPins} />} />
          <Route path="/profile/:id" component={() => <Profile 
          getUserPins={this.getUserPins}
          pins={pin.userPins}
          deletePost={this.deletePost}
          user={auth.user}
          />} />
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
