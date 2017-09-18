import React, { Component } from "react";
import { Link } from "react-router-dom";
import AddPinDropDown from '../components/AddPinDropDown';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import { getCookieValue } from '../handlers/helpers'
import * as authActions from '../actions/authActions';
import { getUserPins, getAllPins, addPin } from '../actions/pinActions';

class Header extends Component {
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

    this.state = {
      addPinDropDownIsHidden: true,
      mobileMenuIsHidden: true
    };

    this.handleLogOutClick = this.handleLogOutClick.bind(this);
    this.toggleAddPinDropDown = this.toggleAddPinDropDown.bind(this);
    this.getUserPins = this.getUserPins.bind(this);
    this.handleNavHome = this.handleNavHome.bind(this);

    this.handleMobileMenu = this.handleMobileMenu.bind(this);
  }

  handleMobileMenu() {
    this.setState({
      mobileMenuIsHidden: !this.state.mobileMenuIsHidden,
      addPinDropDownIsHidden: true
    })
  }

  async handleLogOutClick() {
    if (this.props.auth.loggedIn) {
      const logOutSuccess = await this.props.logOut();
      
      if (logOutSuccess) {
        this.props.history.push('/');
      }
    }
  }

  async handleNavHome(e) {
    e.preventDefault();

    const pins = await this.props.getAllPins();

    if (pins) {
      this.props.history.push('/');
    }
  }

  async getUserPins(id) {
    const userPins = await this.props.getUserPins(id);

    if (userPins) {
      // Showing an ID isn't really optimal.. much better would be an actual profile account. This is fine for now as only social auth is implemented at the moment.
      this.props.history.push(`/profile/${id}`);    
    }
  }

  toggleAddPinDropDown() {
    this.setState({
      addPinDropDownIsHidden: !this.state.addPinDropDownIsHidden,
      mobileMenuIsHidden: true
    });
  }

  renderLoggedInButtons() {
    return (
      <div className="nav-logged-in-btn-container">
        <button onClick={ this.toggleAddPinDropDown } className="add-pin-btn nav-btn" />

        <AddPinDropDown pinAddRequested={this.props.pinAddRequested} isHidden={ this.state.addPinDropDownIsHidden } handleAddPin={this.props.addPin} />

        <button onClick={ () => this.getUserPins(this.props.auth.user.id) } className="user-profile-btn nav-btn" />
      </div>
    );
  }

  render() {
    const { loggedIn } = this.props.auth;

    return (
      <header className="app-header">
        <nav className="header-nav">
          <div className="nav-logo">
            <h4>
              <Link onClick={this.handleNavHome} to="/">
                Culturest
              </Link>
            </h4>
          </div>

        <div className="header-right">
          { loggedIn ? this.renderLoggedInButtons() : '' }

          { !loggedIn ? (
            <a href="auth/twitter" className="nav-cta-btn nav-btn nav-login-btn">
              Log In
            </a>) : (
            <button onClick={this.handleLogOutClick} className="nav-cta-btn nav-btn nav-logout-btn">
              Log Out
            </button>) }

             { loggedIn
             ? <button className="nav-btn nav-mobile-menu-btn" onClick={this.handleMobileMenu}></button>
             : ''} 
           
            { loggedIn 
              ? <ul className="mobile-menu" style={{display: this.state.mobileMenuIsHidden ? 'none' : 'block'}} >
                  <li className="mobile-menu-item" onClick={() => this.getUserPins(this.props.auth.user.id)}>Profile</li>
                  <li className="mobile-menu-item" onClick={this.handleLogOutClick}>Log Out</li>
                </ul> 
              : ''
            }

        </div>
        </nav>
      </header>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    pinAddRequested: state.pin.pinAddRequested
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({...authActions, getAllPins, getUserPins, addPin}, dispatch);
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));