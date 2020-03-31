import React, { Component } from 'react'
import RegisterComponent from '../../components/register/RegisterComponent';
import { addUser, fetchLanguage } from '../../actions/action';
import { connect } from 'react-redux';

class RegisterContainer extends Component {

  constructor(props) {
    super(props);

    this.state = {
      addUser: {}
    }
  }

  componentWillMount() {
    this.props.getLanguage();
  }

  onChangeRegister = (e) => {
    e.preventDefault();

    this.setState({
      addUser: {
        ...this.state.addUser,
        [e.target.name]: e.target.value,
      }
    })
  }

  onSubmitAddUser = () => {
    this.props.addUser(this.state.addUser)
  }

  render() {
    return (
      <RegisterComponent language={this.props.language} onChangeRegister={this.onChangeRegister} onSubmitAddUser={this.onSubmitAddUser} />
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  var userLang = navigator.language || navigator.userLanguage;
  return {
    addUser: (user) => dispatch(addUser(user)),
    getLanguage: () => dispatch(fetchLanguage(userLang))
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.language.getAllTexts,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterContainer)
