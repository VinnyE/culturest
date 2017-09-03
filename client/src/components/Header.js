import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { openLogInModal } = this.props;

    return (
      <div>
        <header className="app-header">
          <nav className="header-nav">
            <div className="nav-logo">
              <h4>
                <Link to='/'>
                  Culturest
                </Link>
              </h4>
            </div>

            <button className="nav-log-in-btn" onClick={openLogInModal}>
              Log In
            </button>
          </nav>
        </header>
      </div>
    );
  }
}

Header.propTypes = {
  openLogInModal: PropTypes.func.isRequired,
}

export default Header;