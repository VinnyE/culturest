import React, { Component } from "react";
import { Link } from "react-router-dom"
import PropTypes from "prop-types";

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

            { !loggedIn ? (
              <a href="auth/twitter" className="nav-log-in-btn">
                Log In
              </a>) : (
              <button onClick={this.handleClick} className="nav-log-in-btn">
                Log Out
              </button>) }
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