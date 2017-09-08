import React, { Component } from "react";
import { Link } from "react-router-dom"
import PropTypes from "prop-types";

class Header extends Component {
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

            <a href={loggedIn ? "#" : "auth/twitter"} className="nav-log-in-btn">
              {loggedIn ? "Log out" : "Log in"}
            </a>
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