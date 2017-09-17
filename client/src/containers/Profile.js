import React, { Component } from 'react';
import Grid from '../components/Grid';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getUserPins } from '../actions/pinActions';
import { withRouter } from 'react-router-dom';

class Profile extends Component {
  constructor(props) {
    super(props);

    this.getUserPins = this.getUserPins.bind(this);
    this.deletePost = this.deletePost.bind(this);
  }

  componentDidMount() {
    const { userPins, pinGetSuccess, pinGetError, pinGetRequested } = this.props.pin;
    
    if(!userPins && !pinGetError && !pinGetRequested) {
      this.props.getUserPins(this.props.match.params.id);    
    }
  }

  async deletePost(id) {
    console.log(id)
  }

  async getUserPins(id) {
    id = id ? id : '59bd77e17765f53c8e9105cf'; 

    const userPins = await this.props.getUserPins(/*this.props.auth.user.id ||*/id);

    if (userPins) {
      // Showing an ID isn't really optimal.. much better would be an actual profile account. This is fine for now as only social auth is implemented at the moment.
      this.props.history.push(`/profile/${id}`);    
    } // else could render a NotFound component
  }

  render() {
    const { pin, auth } = this.props;

    return (
      <div>
       <Grid 
        pins={pin.userPins}
        deletePost={this.deletePost}
        getUserPins={this.getUserPins}
        user={auth.user}
      />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    pin: state.pin,
    auth: state.auth
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({getUserPins}, dispatch);
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Profile));