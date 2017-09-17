import React, { Component } from 'react';
import Grid from '../components/Grid';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getUserPins, getAllPins } from '../actions/pinActions';
import { withRouter } from 'react-router-dom';

import loader from '../images/Spinner.gif';

class Home extends Component {
  constructor(props) {
    super(props);

    this.getUserPins = this.getUserPins.bind(this);
  }

  componentDidMount() {
    const { pinGetError, pinGetRequested, pins } = this.props;

    if(!pins && !pinGetError && !pinGetRequested) {
      this.props.getAllPins()    
    }
  }

  async getUserPins(id) {
    const userPins = await this.props.getUserPins(id);

    if (userPins) {
      // Showing an ID isn't really optimal.. much better would be an actual profile account. This is fine for now as only social auth is implemented at the moment.
      this.props.history.push(`/profile/${id}`);    
    } // else could render a NotFound component
  }

  render() {
    const { pins, pinGetRequested} = this.props;

    return (
      <div>
        {
          pinGetRequested 
          ? (<img src={loader} className="loader-icon" alt='Loader' /> )
          : (<Grid
              getUserPins={this.getUserPins}
              pins={pins}
            />)
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    pins: state.pin.pins,
    // pinGetSuccess: state.pin.pinGetSuccess,
    pinGetError: state.pin.pinGetError,
    pinGetRequested: state.pin.pinGetRequested
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({getUserPins, getAllPins}, dispatch);
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));

