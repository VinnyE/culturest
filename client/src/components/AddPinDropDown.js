import React, { Component } from 'react';

class AddPinDropDown extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  render() {
    const { isHidden } = this.props; 
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
          <input style={inputStyle}  placeholder="Add URL" type="text" className="image-url-input" />

          <textarea style={inputStyle} placeholder="Description.." type="text" className="description-input" />

          <button type="submit" style={inputStyle} className="submit-pin-btn nav-cta-btn nav-btn">
            Add Pin!
          </button>
        </form>

      </div>
    );
  }
}

export default AddPinDropDown;