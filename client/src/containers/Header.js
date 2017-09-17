import React, { Component } from "react";
import { Link } from "react-router-dom";
import AddPinDropDown from '../components/AddPinDropDown';
import PropTypes from "prop-types";

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { withRouter } from 'react-router-dom';

import * as authActions from '../actions/authActions';
import { getUserPins } from '../actions/pinActions';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      addPinDropDownIsHidden: true
    };

    this.handleLogOutClick = this.handleLogOutClick.bind(this);
    this.toggleAddPinDropDown = this.toggleAddPinDropDown.bind(this);
    this.getUserPins = this.getUserPins.bind(this);
  }

  async handleLogOutClick() {
    if (this.props.auth.loggedIn) {
      const logOutSuccess = await this.props.logOut();
      
      if (logOutSuccess) {
        this.props.history.push('/');
      }
    }
  }

  async getUserPins(id) {
    id = id ? id : '59bd77e17765f53c8e9105cf'; 

    const userPins = await this.props.getUserPins(/*this.props.auth.user.id ||*/id);

    if (userPins) {
      // Showing an ID isn't really optimal.. much better would be an actual profile account. This is fine for now as only social auth is implemented at the moment.
      this.props.history.push(`/profile/${id}`);    
    }
  }

  toggleAddPinDropDown() {
    this.setState({
      addPinDropDownIsHidden: !this.state.addPinDropDownIsHidden
    });
  }

  renderLoggedInButtons() {
    return (
      <div className="nav-logged-in-btn-container">
        <button onClick={ this.toggleAddPinDropDown } className="add-pin-btn nav-btn" />

        <AddPinDropDown isHidden={ this.state.addPinDropDownIsHidden } handleAddPin={this.props.addPin} />

        <button onClick={ () => this.getUserPins() } className="user-profile-btn nav-btn" />
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
              <Link to="/">
                Culturest
              </Link>
            </h4>
          </div>

        <div className="header-right">
          { loggedIn ? this.renderLoggedInButtons() : '' }

          { !loggedIn ? (
            <a href="auth/twitter" className="nav-cta-btn nav-btn">
              Log In
            </a>) : (
            <button onClick={this.handleLogOutClick} className="nav-cta-btn nav-btn">
              Log Out
            </button>) }
        </div>
        </nav>
      </header>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({...authActions, getUserPins}, dispatch);
};

// Header.propTypes = {
//   loggedIn: PropTypes.bool.isRequired
// }

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));