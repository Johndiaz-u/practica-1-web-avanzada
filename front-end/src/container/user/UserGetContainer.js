import React, { Component } from 'react'
import { connect } from 'react-redux';
import { fetchUser } from '../../actions/action';
import UserGetComponent from '../../components/users/UserGetComponent';

class UserGetContainer extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { match } = this.props;
    const userId = match.params.id;
    this.props.getUser(userId);
  }

  render() {

    const { user, history } = this.props;
    // console.log(user, 'user');

    return (
      <UserGetComponent user={user} history={history} />
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUser: (id) => dispatch(fetchUser(id)),
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.users.getUser,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserGetContainer);
