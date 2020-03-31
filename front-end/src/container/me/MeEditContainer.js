import React, { Component } from 'react'
import { connect } from 'react-redux';
import MeEditComponent from '../../components/me/MeEditComponent';
import { uploadPhoto } from '../../actions/action';

class MeEditContainer extends Component {

  goToBack = () => {
    this.props.history.push('/me');
  }

  goUpload = (photo) => {
    this.props.uploadPhoto(photo);
    this.goToBack();
  }
  render() {

    return (
      <MeEditComponent {...this.props} goToBack={this.goToBack} goUpload={this.goUpload} />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    getUser: state.users.getUserLogged,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    uploadPhoto: (photo) => dispatch(uploadPhoto(photo)),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(MeEditContainer);
