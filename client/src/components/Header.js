import React, { Component } from "react";
import { Link } from "react-router-dom";
import AddPinDropDown from './AddPinDropDown';
import PropTypes from "prop-types";

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      addPinDropDownIsHidden: true
    };

    this.handleLogOutClick = this.handleLogOutClick.bind(this);
    this.toggleAddPinDropDown = this.toggleAddPinDropDown.bind(this);
  }

  async handleLogOutClick() {
    if (this.props.loggedIn) {
      const logOutSuccess = await this.props.logOut();
      
      if (logOutSuccess) {
        this.props.history.push('/');
      }
    }
  }

  toggleAddPinDropDown() {
    this.setState({
      addPinDropDownIsHidden: !this.state.addPinDropDownIsHidden
    });
  }

  renderLoggedInButtons() {
    const { getUserPins } = this.props;
    return (
      <div className="nav-logged-in-btn-container">
        <button onClick={ this.toggleAddPinDropDown } className="add-pin-btn nav-btn" />

        <AddPinDropDown isHidden={ this.state.addPinDropDownIsHidden } handleAddPin={this.props.handleAddPin} />

        <button onClick={ getUserPins } className="user-profile-btn nav-btn" />
      </div>
    );
  }

  render() {
    const { loggedIn } = this.props;

    return (
      <div>
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
      </div>
    );
  }
}

Header.propTypes = {
  loggedIn: PropTypes.bool.isRequired
}

export default Header;