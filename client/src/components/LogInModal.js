import React, { Component } from 'react';
import PropTypes from 'prop-types';
import twitterIcon from '../images/twitterIcon.svg';

class LogInModal extends Component {
  render() {
    const { closeLogInModal, logInToSocialMedia } = this.props;
    return (
      <div className="log-in-modal log-in-modal-overlay">

        <div className="log-in-container">
          <img className="twitter-logo" src={twitterIcon} alt="Twitter logo." />
          {/* <button className="log-in-container-twitter-btn"> */}
            <a href="auth/twitter">
              Log in with Twitter
            </a>
          {/* </button> */}

          <div className="log-in-modal-close-btn" onClick={closeLogInModal} >
            &times;
          </div>
        </div>
        
      </div>
    );
  }
}

LogInModal.propTypes = {
  closeLogInModal: PropTypes.func,
  logInToSocialMedia: PropTypes.func
}

export default LogInModal;