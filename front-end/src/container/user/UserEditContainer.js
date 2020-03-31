import React, { Component } from 'react'
import { connect } from 'react-redux';
import UserEditComponent from '../../components/users/UserEditComponent';
import { editUser, fetchUser } from '../../actions/action';

class UserEditContainer extends Component {

  constructor(props) {
    super(props);

    this.state = {
      userEdit: {
        ...props.location.state.userEdit
      }
    }
  }

  onChangeUserEdit = (e) => {
    e.preventDefault();

    this.setState({
      userEdit: {
        ...this.state.userEdit,
        id: this.props.location.state.userEdit.id,
        [e.target.name]: e.target.value,
      }
    })
  }

  onChangeRoles = (data) => {
    this.setState({
      userEdit: {
        ...this.state.userEdit,
        roles: data,
        id: this.props.location.state.userEdit.id
      }
    })
  }

  onSubmitUserEdit = () => {
    this.props.userEdit(this.state.userEdit);
    this.props.history.goBack();
  }

  render() {
    // console.log(this.props.location.state, 'jajajajajja');
    const { userEdit } = this.props.location.state;
    const { user } = this.props;
    return (
      <UserEditComponent
        user={user}
        userEdit={userEdit}
        userEditState={this.state.userEdit}
        onChangeUserEdit={this.onChangeUserEdit}
        onChangeRoles={this.onChangeRoles}
        onSubmitUserEdit={this.onSubmitUserEdit}
      />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userEdit: state.users.userEdit,
    user: state.users.getUser,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    userEdit: (data) => dispatch(editUser(data)),
    getUser: (id) => dispatch(fetchUser(id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserEditContainer)
