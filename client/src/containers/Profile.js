import React, { Component } from 'react';
import Grid from '../components/Grid';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getUserPins, deletePin } from '../actions/pinActions';
import { withRouter } from 'react-router-dom';

class Profile extends Component {
  constructor(props) {
    super(props);

    this.getUserPins = this.getUserPins.bind(this);
    this.deletePin = this.deletePin.bind(this);
  }

  componentDidMount() {
    const { userPins, pinGetError, pinGetRequested } = this.props;
    
    if(!userPins && !pinGetError && !pinGetRequested) {
      this.props.getUserPins(this.props.match.params.id);    
    }
  }

  async deletePin(id) {
    this.props.deletePin(id)
  }

  async getUserPins(id) {
    const userPins = await this.props.getUserPins(id);

    if (userPins) {
      // Showing an ID isn't really optimal.. much better would be an actual profile account. This is fine for now as only social auth is implemented at the moment.
      this.props.history.push(`/profile/${id}`);    
    } // else could render a NotFound component
  }

  render() {
    const { userPins, auth } = this.props;

    return (
      <div>
       <Grid 
        pins={userPins}
        deletePin={this.deletePin}
        getUserPins={this.getUserPins}
        user={auth.user}
      />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userPins: state.pin.userPins,
    // pinGetSuccess: state.pin.pinGetSuccess,
    pinGetError: state.pin.pinGetError,
    pinGetRequested: state.pin.pinGetRequested,
    auth: state.auth
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({getUserPins, deletePin}, dispatch);
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Profile));