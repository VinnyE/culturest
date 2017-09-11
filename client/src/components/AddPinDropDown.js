import React, { Component } from 'react';

class AddPinDropDown extends Component {
  render() {
    const { isHidden } = this.props; 
    const dropdownStyle = {
      // display: isHidden ? 'none' : 'block',
      height: isHidden ? 0 : '178px',
      opacity: isHidden ? 0 : 1,
    };

    const inputStyle = {
      opacity: isHidden ? 0 : 1
    };

    return (
      <div style={dropdownStyle} className="add-pin-dropdown">
        <input style={inputStyle}  placeholder="Add URL" type="text" className="image-url-input" />
        <input style={inputStyle} placeholder="Description.." type="text" className="description-input" />

        <button style={inputStyle} className="submit-pin-btn nav-cta-btn nav-btn">
          Add Pin!
        </button>
      </div>
    );
  }
}

export default AddPinDropDown;