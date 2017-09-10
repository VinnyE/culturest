import React, { Component } from "react";
import { Link } from "react-router-dom"
import PropTypes from "prop-types";

import userSvg from "../images/user.svg";
import plusSvg from "../images/plus.svg";

class Header extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  async handleClick() {
    if (this.props.loggedIn) {
      const logOutSuccess = await this.props.logOut();
      
      if (logOutSuccess) {
        this.props.history.push('/');
      }
    }
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
            { loggedIn ? (
                <button className="add-pin-btn header-btn">
                  <img src={plusSvg} alt="Add Pin" />
                </button>
              ) : ''
            }

            { loggedIn ? (
                <button className="user-profile-btn header-btn">
                  <img src={userSvg} alt="User Profile" />
                </button>
              ) : ''
            }

            { !loggedIn ? (
              <a href="auth/twitter" className="nav-log-in-btn header-btn">
                Log In
              </a>) : (
              <button onClick={this.handleClick} className="nav-log-in-btn header-btn">
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