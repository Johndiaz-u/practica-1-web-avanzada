import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addUser } from '../../actions/action';
import RegisterComponent from '../../components/register/RegisterComponent';

class RegisterContainer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user: {

            }
        }
    }

    onChangeRegister = (e) => {
        e.preventDefault();

        this.setState({
            user: {
                ...this.state.user,
                [e.target.name]: e.target.value
            }
        })
    }

    onSubmitAddUser = (e) => {
        e.preventDefault();

        this.props.addUser(this.state.user)
    }

    render() {
        return (
            <RegisterComponent onChangeRegister={this.onChangeRegister} onSubmitAddUser={this.onSubmitAddUser} />
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addUser: (user) => dispatch(addUser(user)),
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.users.users,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterContainer)