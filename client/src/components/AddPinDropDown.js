import React, { Component } from 'react';
import PropTypes from 'prop-types';

import smallLoader from '../images/spinner-small.gif';

class AddPinDropDown extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    
    const formData = {
      url: this.input.value,
      description: this.textarea.value
    }

    this.input.value = '';
    this.textarea.value = '';
    
    this.props.handleAddPin(formData);
  }

  render() {
    const { isHidden, pinAddRequested } = this.props; 
    const dropdownStyle = {
      height: isHidden ? 0 : '225px',
      opacity: isHidden ? 0 : 1,
    };

    const inputStyle = {
      opacity: isHidden ? 0 : 1
    };

    return (
      <div style={dropdownStyle} className="add-pin-dropdown">
        <form onSubmit={ this.handleSubmit }>
          <input ref={(ref) => {this.input = ref}} style={inputStyle}  placeholder="Add URL" type="text" className="image-url-input" />

          <textarea ref={(ref) => {this.textarea = ref}} style={inputStyle} placeholder="Description.." type="text" className="description-input" />

          <button type="submit" style={inputStyle} className="submit-pin-btn nav-cta-btn nav-btn">
           {
             pinAddRequested
             ? (<img src={smallLoader} alt="Loader" className="loader-icon" />)
             : 'Add Pin!'
           }
          </button>
        </form>

      </div>
    );
  }
}

AddPinDropDown.propTypes = {
  pinAddRequested: PropTypes.bool,
  isHidden: PropTypes.bool
};

export default AddPinDropDown;