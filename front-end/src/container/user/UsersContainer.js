import React, { Component } from 'react'
import { connect } from 'react-redux';
import UsersComponent from '../../components/users/UsersComponent';
import { fetchUsers } from '../../actions/action';



class UsersContainer extends Component {

  componentDidMount() {
    this.props.getUsers();
    // this.getUser(1);
  }

  getUser = (id) => {
    this.props.history.push({
      'pathname': `/users/${id}`
    })
  }

  render() {

    return (
      <UsersComponent language={this.props.language} users={this.props.users}
        getUser={this.getUser}
      />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.users.getAllUsers,
  }
}

const mapDispatchtoProps = (dispatch) => {
  return {
    getUsers: () => dispatch(fetchUsers())
  }
}


export default connect(mapStateToProps, mapDispatchtoProps)(UsersContainer);
