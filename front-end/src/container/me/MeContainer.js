import React, { Component } from 'react'
import MeComponent from '../../components/me/MeComponent';
import { connect } from 'react-redux';
import { meUser } from '../../actions/action';

class MeContainer extends Component {

  componentDidMount() {
    // console.log(this.props, 'meContainer');
    this.props.meUser();
  }

  goToEdit = () => {
    this.props.history.push('/me/edit');
  }

  render() {
    const { me, language } = this.props;
    return (
      <MeComponent me={me} language={language} goToEdit={this.goToEdit} />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    me: state.users.userLogin
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    meUser: () => dispatch(meUser()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MeContainer)

